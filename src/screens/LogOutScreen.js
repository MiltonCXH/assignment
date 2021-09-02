import React, { setState } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { firebase } from "@react-native-firebase/auth"

export default function LogOutScreen({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>LOG OUT</Header>
      <Paragraph>
        Thank you for visiting our app. Please feel free to come back again.
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