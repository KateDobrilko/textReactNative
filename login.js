import React, {Component, PropTypes} from 'react';
import {View,  Navigator, Text, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <Navigator
                renderScene = {this.renderScene.bind(this)}
                navigationBar = {
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          }/>
        );
    }

    renderScene(route, navigator) {
        return (
            <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight
                    onPress = {this.gotoNext.bind(this)}>
                    <Text style = {{color: 'red'}}>Go to Next</Text>
                </TouchableHighlight>
            </View>
        );
    }

    gotoNext() {
        this.props.navigator.push({
            id: 'Users',
            name: 'Users'
        });
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return null;
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return (
            <TouchableOpacity style = {{flex: 1, justifyContent: 'center'}}>
                <Text style = {{color: 'white', margin: 10, fontSize: 16}}>
                    Title
                </Text>
            </TouchableOpacity>
        );
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
