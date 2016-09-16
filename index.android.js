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
    function navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.title) {
      case 'Login':
        return (<Login navigator={navigator} routes={routes}/>);
      case 'Messages':
        return (<Messages navigator={navigator} routes={routes}/>);
      case 'Rooms':
        return (<Rooms navigator={navigator} routes={routes}/>);
      case 'Users':
        return (<Users navigator={navigator} routes={routes}/>);
    }
  }
    return (           
        <Navigator
          style = {{flex: 1}}
          initialRoute = {routes[0]}
          initialRouteStack = {routes}
          renderScene = {(route, navigator) => navigatorRenderScene(route, navigator)} />
    );
  }
   
}

AppRegistry.registerComponent('testReactNative', () => testReactNative);
