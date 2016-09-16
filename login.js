import React, { Component, PropTypes  } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

export default class Login extends Component {  
   navUsers(){  
    var routes = this.props.routes; 
    this.props.navigator.jumpTo(      
       this.props.routes[3]
    )
  }
  render() {
    return (
      <View> 
       <Text style={styles.titleText}>Login page</Text>
        <Text>Login</Text>
       <TextInput></TextInput>       
        <Text>Password</Text>
        <TextInput></TextInput>     
      
        <TouchableHighlight style={styles.goToButton} onPress={this.navUsers.bind(this)}>
          <Text>Go to Users Screen</Text>
        </TouchableHighlight>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
  },  
  goToButton: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 25
  }
});
