import React, { Component, PropTypes  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export class Rooms extends Component {
    navMessages(){
    var routes = this.props.routes;
    this.props.navigator.push({
      index: routes[3]
    })
  }
  render() {
    return (
      <View>
        <Text>This is rooms page scene!</Text>
        <TouchableHighlight onPress={this.navMessages.bind(this)}>
          <Text>Go to Messages Screen</Text>
        </TouchableHighlight>
      </View>
    )
  }
}