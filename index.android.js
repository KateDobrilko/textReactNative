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
      <View style={{flex:1}}>
      
        <Navigator
          style={{flex: 1}}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
          if (route.index === 0) {
            return 
            <Login             
                navigator={navigator} routes={routes} />            
          }
          if (route.index === 1) {
            return 
            <Messages
              navigator={navigator}  routes={routes} />            
          } 
          if (route.index === 2) {
            return 
            <Rooms
              navigator={navigator} routes={routes} />            
          }
          if (route.index === 3){
            return 
            <Users
              navigator={navigator}  routes={routes}/>            
          }
      }}
      /></View>
    );
  }
}

AppRegistry.registerComponent('testReactNative', () => testReactNative);
