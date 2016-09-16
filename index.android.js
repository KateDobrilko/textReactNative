/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes  } from 'react';
import { View, Navigator, AppRegistry, TouchableHighlight, Text} from 'react-native';

import Login from './login';
import Messages from './messages';
import Users from './users';
import Rooms from './rooms';


class testReactNative extends Component {
  render() {
    const routes = [
      {title: 'Login', index: 0},
      {title: 'Messages', index: 1},      
      {title: 'Rooms', index: 2},
      {title: 'Users', index: 3}
    ];
    return (           
        <Navigator
          style={{flex: 1}}
          initialRoute={{name: 'Login', index: 0}}
        
          renderScene={(route, navigator) => {         
            return <Login />            
         }} />
    );
  }
}

AppRegistry.registerComponent('testReactNative', () => testReactNative);
