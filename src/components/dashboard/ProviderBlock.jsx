import { Icon, Tag ,Button,Alert} from 'rsuite'
import React, { useState } from 'react'
import { auth } from '../../misc/firebase'
import firebase from 'firebase/compat/app'

const ProviderBlock = () => {

    const [isConnected,setIsConnected]=useState({
        'google.com':auth.currentUser.providerData.some((data)=>data.providerId==='google.com'),
        'facebook.com':auth.currentUser.providerData.some((data)=>data.providerId==='facebook.com')
    })

    const updateIsConnected=(providerId,value)=>{
        setIsConnected(p=>{
            return{

                ...p,
                [providerId]:value,
            }

        })
    }

    

    const unlink=async (providerId)=>{
        try {
            if(auth.currentUser.providerData.length===1){
                throw new Error(`you cannot disconnect from ${providerId}`,5000)
            }
            await auth.currentUser.unlink(providerId)
            updateIsConnected(providerId,false)
            Alert.info(`Disconnected from ${providerId}`)
        } catch (error) {
            Alert.error(error.message,5000)
        }
    }    

    const unlinkFacebook=()=>{
        unlink('facebook.com')
    }
    const unlinkGoogle=()=>{
        unlink('google.com')
    }

    const link=async (provider)=>{
        try {
           await auth.currentUser.linkWithPopup(provider)
           Alert.info(`Linked to ${provider.providerId}`,5000)
           updateIsConnected(provider.providerId,true)
        } catch (error) {
            Alert.error(error.message,5000)
        }
    }

    const linkFacebook=()=>{
        link(new firebase.auth.FacebookAuthProvider())
    }

    const linkGoogle=()=>{
        link(new firebase.auth.GoogleAuthProvider())
    }

  return (
    <div>
        {isConnected["google.com"] &&
        <Tag color='green' closable onClose={unlinkGoogle}>
        <Icon icon="google"/> connected
        </Tag>
        }
        {isConnected["facebook.com"]&&
        
        <Tag color="blue" closable onClose={unlinkFacebook}>
        <Icon icon="facebook"/> connected
        </Tag>
        }

        <div className='mt-2'>
            {!isConnected["google.com"] &&
            
        <Button block color='green' onClick={linkGoogle}>
            <Icon icon="google"/> Link to Google
        </Button>
            }
            {!isConnected["facebook.com"]&&
            
        <Button block color='blue' onClick={linkFacebook}>
            <Icon icon="facebook"/> Link to Facebook
        </Button>
            }
        </div>
    </div>
  )
}

export default ProviderBlock