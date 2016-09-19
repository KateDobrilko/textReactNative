import React, {Component, PropTypes} from 'react';
import {View, Navigator, Text, TouchableHighlight} from 'react-native';

export default class Users extends Component {

    navMessages(){
        this.props.navigator.push({
            id: 'Login',
            name: 'Login'
        });

    }

    render() {
        return (
            <View>
                <Text>This is rooms page scene!</Text>
                <TouchableHighlight onPress = {this.navMessages.bind(this)}>
                    <Text>Go to Users Screen</Text>
                </TouchableHighlight>
            </View>
        )

    }
}