import React, { Component, PropTypes  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Login extends Component {  
   navUsers(){
    var routes = this.props.routes;
    this.props.navigator.push({
      index: routes[1]
    })
  }
  render() {
    return (
      <View>
        <Text>This is login page scene!</Text>
        <TouchableHighlight onPress={this.navUsers.bind(this)}>
          <Text>Go to Users Screen</Text>
        </TouchableHighlight>
      </View>
    )
  }
}