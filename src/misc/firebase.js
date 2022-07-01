import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'


const config= {
    apiKey: "AIzaSyBtCheb8FyI3dhITEup6fifj82VnBJlebk",
    authDomain: "chittox-chat-app.firebaseapp.com",
    projectId: "chittox-chat-app",
    storageBucket: "chittox-chat-app.appspot.com",
    messagingSenderId: "767434574817",
    appId: "1:767434574817:web:42215a182f4af1c57520a0"
  };
  
  const app=firebase.initializeApp(config) ;

  export const auth=app.auth();
  export const database=app.database()
  export const storage = app.storage();