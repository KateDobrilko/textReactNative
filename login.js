import React, { Component, PropTypes  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Login extends Component {  
   
  render() {
    return (
      <View>
        <Text>This is login page scene!</Text>
        <TouchableHighlight>
          <Text>Go to Users Screen</Text>
        </TouchableHighlight>
      </View>
    )
  }
}