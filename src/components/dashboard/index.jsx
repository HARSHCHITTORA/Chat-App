
import React from 'react';
import { Drawer, Button,Divider,Alert} from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import AvtarUploadBtn from './AvtarUploadBtn';
import EditableInput from './EditableInput';
import ProviderBlock from './ProviderBlock';

import { getUserUpdates } from '../../misc/helper';



const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  const onSave=async (newData)=>{
    // const userNicknameRef=database.ref(`/profiles/${profile.uid}`).child('name')
  
   try {
    const updates = await getUserUpdates(
      profile.uid,
      'name',
      newData,
      database
    );

    await database.ref().update(updates);

    // await userNicknameRef.set(newData)
    Alert.success('Nickname is updated',5000)
   } catch (error) {
    Alert.error(error.message,5000)
   }
  
  }

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock/>
        <Divider/>
        <EditableInput
        name="nickname"
        initialValue={profile.name}
        onSave={onSave}
        label={<h6 className='mb-2'>Nickname</h6>}
        />
        <AvtarUploadBtn/>
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;