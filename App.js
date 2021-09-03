
import React from 'react';
import 'react-native-gesture-handler';
import { 
  LogBox, 
  Dimensions, 
  Platform }
from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationContainer } from '@react-navigation/native';
import IndexFile from './src';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({
    $rem: entireScreenWidth / (Platform.OS == 'ios' ? 380 : 450),
});

export default class App extends React.Component {
  render() {
    // LogBox.ignoreAllLogs(true);
    return (
      <NavigationContainer>
        <IndexFile />
      </NavigationContainer>
    );
  }
}