import React from 'react'
import { Container, Grid, Row, Panel, Col, Button, Alert } from 'rsuite';
import { Icon } from 'rsuite';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/compat/app';

function Signin() {
const SigninWithProvider=async (provider)=>{
    try {
        const {additionalUserInfo,user}=await auth.signInWithPopup(provider)

        if(additionalUserInfo.isNewUser){
            await database.ref(`/profiles/${user.uid}`).set({
                name:user.displayName,
                createdAt:firebase.database.ServerValue.TIMESTAMP,
            })
        }

        Alert.success('signed in',5000)
    } catch (error) {
        Alert.error(error.message,5000)
    }


}

 const onFacebookSignin=()=>{
    SigninWithProvider(new firebase.auth.FacebookAuthProvider())
 };
 const onGoogleSignin=()=>{
    SigninWithProvider(new firebase.auth.GoogleAuthProvider())
 };


  return (
   <Container>
    <Grid className='mt-page'>
        <Row>
               <Col xs={24} md={12} mdOffset={6}>
                    <Panel>
                        <div>
                            <h2>
                                welcome to Chittox Chat App
                            </h2>
                            <p>Progressive chat application</p>
                        </div>
                        <div className='mt-3'>
                            <Button block color='blue' onClick={onFacebookSignin}>
                                <Icon icon="facebook" /> Continue with Facebook
                            </Button>
                            <Button block color="green" onClick={onGoogleSignin}>
                                <Icon icon="google"/>
                                continue with Google
                            </Button>
                        </div>
                    </Panel>
               </Col>
        </Row>
    </Grid>
   </Container>
  )
}

export default Signin