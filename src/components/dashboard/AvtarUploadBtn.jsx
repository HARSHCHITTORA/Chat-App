import React, { useState } from 'react'
import { useModalState } from '../../misc/custom-hooks'
import {Button,Modal,Alert} from 'rsuite'
import AvatarEditor from 'react-avatar-editor';

const AvtarUploadBtn = () => {
    const {isOpen,open,close}=useModalState();
    const fileInputTypes=".png,.jpeg,.jpg"
    const acceptedFileTypes=['image/png','image/jpeg','image/jpg','image/pjpeg']
    const isValidFile=(file)=>acceptedFileTypes.includes(file.type)

    const[img,setImg]=useState(null)
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
                    <Button block appearance='ghost'>
                        Upload new Avatar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
  )
}

export default AvtarUploadBtn