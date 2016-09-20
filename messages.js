import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class Messages extends Component {
    navLogin() {
        this.props.navigator.push(
            {
                id: "Login"
            }
        )
    }

    render() {
        return (
            <View>
                <Text>This is messages page scene!</Text>
                <TouchableHighlight onPress = {this.navLogin.bind(this)}>
                    <Text>Go to Login Screen</Text>
                </TouchableHighlight>
            </View>
        )
    }
}