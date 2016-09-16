import React, { Component, PropTypes  } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export class Rooms extends Component {
    navMessages(){
    
    this.props.navigator.jumpTo(  
        routes[1]   
    )
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