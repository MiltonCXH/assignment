import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import monitors from '../consts/monitors';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Header from '../components/Header'


  export default function Cart({ navigation }) {
    let cartJSON ={id: 1, numberOfItems: 2};

    const storeCartItems = async (value) => {
      try{
        let cartJSON = await AsyncStorage.getItem('cartItems'); //Check if CartJSON has value or not
  
        if(cartJSON)
        {
          cartJSON = JSON.parse(cartJSON);
          let newCartJSON = [...cartJSON , value];
          console.log(newCartJSON);
          await AsyncStorage.setItem('cartItems', JSON.stringify(newCartJSON));
        }
        else
        {
          await AsyncStorage.setItem('cartItems',JSON.stringify([value]));
        }
        
        
      }
      catch(e)
      {
        console.log(e);
      }
    }
    //STORE
    //WHEN OPENING THE CART ITEMS PAGE, IT WILL TAKE item AS id, TO FIND THE ITEMS WITHIN CONST MONITOR, 
    
    const getCartItems = async(value) =>{
      try{
        let cartJSON = await AsyncStorage.getItem('cartItems');
        console.log(JSON.parse(cartJSON));
        return JSON.parse(cartJSON);
      }
      catch(e)
      {
        console.log(e);
      }
    }
  
    const clearCart = async () =>{
      try{
        await AsyncStorage.removeItem('cartItems');
      }
      catch(e)
      {
        console.log(e);
      }
    }

    getCartItems();

    return (
      <Background>
        <BackButton goBack={navigation.goBack} />
        <Header>CART</Header>
        <View>
        <Image
              source={monitors.img}
              style={{flex: 1, resizeMode: 'contain'}}
        />
        </View>
      </Background>
    )
  }