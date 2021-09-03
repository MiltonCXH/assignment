import React, { useEffect, useState } from 'react';
import { Drawer, Provider } from 'react-native-paper'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { theme } from './core/theme';
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    LogOutScreen, 
    HomeScreen,
    DetailsScreen,
    Cart
} from './screens';
import 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';

const Stack = createStackNavigator()


export default function AppFlow() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setUser(null)
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return (
            <></>
        )
    }

    return (
        <Provider theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false,
                }}
            >
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="LogOutScreen" component={LogOutScreen} />
                        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
                        <Stack.Screen name="Cart" component={Cart} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="StartScreen" component={StartScreen} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                    </>
                )}
            </Stack.Navigator>
        </Provider>
    );
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