/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {View, Navigator, AppRegistry, TouchableHighlight, Text} from 'react-native';

import Login from './login';
import Messages from './messages';
import Users from './users';
import Rooms from './rooms';


class testReactNative extends Component {

    render() {
        return (
            <Navigator
                initialRoute = {{id: 'Login', name: 'Login'}}
                renderScene = {this.renderScene.bind(this)}
                configureScene = {(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}/>
        );
    }

    renderScene(route, navigator) {
       var routeId = route.id;
        if (routeId === 'Login') {
            return (
                <Login
                    navigator = {navigator}/>
            );
        }
        if (routeId === 'Users') {
            return (
                <Users
                    navigator = {navigator}/>
            );
        }
        if (routeId === 'Rooms') {
            return (
                <Rooms
                    navigator = {navigator}/>
            );
        }
        if (routeId === 'Messages') {
            return (
                <Messages
                    navigator = {navigator}/>
            );
        }

        return this.noRoute(navigator);
    }

    noRoute(navigator) {
        return (
            <View style = {{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                  onPress = {() => navigator.pop()}>
                    <Text style = {{color: 'red', fontWeight: 'bold'}}>Default route</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

AppRegistry.registerComponent('testReactNative', () => testReactNative);
