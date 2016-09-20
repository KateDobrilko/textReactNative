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
                initialRoute = {{id: 'Login'}}
                renderScene = {this.renderScene.bind(this)}
            />
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
    }
}

AppRegistry.registerComponent('testReactNative', () => testReactNative);
