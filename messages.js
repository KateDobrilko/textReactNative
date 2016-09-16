import React, { Component, PropTypes  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export  class Messages extends Component {
  navLogin(){
    var routes = this.props.routes;
    this.props.navigator.push({
      index: routes[0]
    })
  }
  render() {
    return (
      <View>
        <Text>This is messages page scene!</Text>
        <TouchableHighlight onPress={this.navLogin.bind(this)}>
          <Text>Go to Login Screen</Text>
        </TouchableHighlight>
       
      </View>
    )
  }
}