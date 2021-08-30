/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-native-paper'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

import firebase from '@react-native-firebase/app';

const Stack = createStackNavigator()

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});

type Props = {};

const tag = "FIREBASE";
export default class App extends Component<Props> {
  state = {
    isLogin: false,
    authenticated: false
  }

  componentDidMount() {
    this.isTheUserAuthenticated();
  }

  isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser;
    if (user) {
      console.log(tag, user);

      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  };

  render() {
    return (
      <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {!firebase.apps.length && (
        <Text style={styles.instructions}>
          {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
        </Text>
      )}
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
