import React, { setState } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import auth, { firebase } from "@react-native-firebase/auth"
import App from '../../App'

export default function Dashboard(props) {
  
  
  return (
    <Background>
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={async () => {
            await firebase.auth().signOut()
        }}
      >
        Logout
      </Button>
    </Background>
  )
}
