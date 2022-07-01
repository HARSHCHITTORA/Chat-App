import React, { useState,useRef } from 'react'
import { useModalState } from '../../misc/custom-hooks'
import {Button,Modal,Alert} from 'rsuite'
import AvatarEditor from 'react-avatar-editor';
import {storage, database } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';

const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File process error'));
        }
      });
    });
  };

const AvtarUploadBtn = () => {
    const {isOpen,open,close}=useModalState();
    const fileInputTypes=".png,.jpeg,.jpg"
    const acceptedFileTypes=['image/png','image/jpeg','image/jpg','image/pjpeg']
    const isValidFile=(file)=>acceptedFileTypes.includes(file.type)

    const { profile } = useProfile();
    const[img,setImg]=useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const avatarEditorRef = useRef();

    const onFileInputChange=(ev)=>{

        const currFiles=ev.target.files

        if(currFiles.length===1){
         const file=currFiles[0]
         if(isValidFile(file)){

            setImg(file);
            open();
         }else{
            Alert.warning(`Wrong File type ${file.type}`,5000)
         }

        }
    }
    const onUploadClick = async () => {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    
        setIsLoading(true);
        try {
          const blob = await getBlob(canvas);
    
          const avatarFileRef = storage
            .ref(`/profile/${profile.uid}`)
            .child('avatar');
    
          const uploadAvatarResult = await avatarFileRef.put(blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
    
          const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
    
          const userAvatarRef = database
            .ref(`/profiles/${profile.uid}`)
            .child('avatar');
    
          userAvatarRef.set(downloadUrl);
    
          setIsLoading(false);
          Alert.info('Avatar has been uploaded', 5000);
        } catch (err) {
          setIsLoading(false);
          Alert.error(err.message, 5000);
        }
      };
    

  return (
    <div className='mt-3 text-center'>

        <div>
            <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
                select new avatar
                <input id="avatar-upload" type="file" className="d-none" accept={fileInputTypes} onChange={onFileInputChange}/>
            </label>

            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        Adjust and upload new avatar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance='ghost' onClick={onUploadClick}
              disabled={isLoading}>
                        Upload new Avatar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
  )
}

export default AvtarUploadBtn