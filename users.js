import React, { Component, PropTypes  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export class Users extends Component {
   navRooms(){
    var routes = this.props.routes;
    this.props.navigator.push({
      index: routes[2]
    })
  }
  render() {
    return (
      <View>
        <Text>This is users page scene!</Text>
        <TouchableHighlight onPress={this.navRooms.bind(this)}>
          <Text>Go to Rooms Screen</Text>
        </TouchableHighlight>
      </View>
    )
  }
}