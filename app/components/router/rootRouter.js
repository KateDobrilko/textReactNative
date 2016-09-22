import React, {Component, PropTypes} from 'react';
import {View, Navigator, TouchableHighlight, Text} from 'react-native';

import Login from '../login';
import Messages from '../messages';
import Users from '../users';
import Rooms from '../rooms';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/actions';


class RootRouter extends Component {
    render() {
        return (
            <Navigator
                initialRoute = {{id: 'Login'}}
                renderScene = {this.renderScene.bind(this)}/>
        );
    }

    renderScene(route, navigator) {
        const {state, actions} = this.props;
        var routeId = route.id;
        if (routeId === 'Login') {
            return (
                <Login state = {state}
                       navigator = {navigator}  {...actions}/>
            );
        }
        if (routeId === 'Users') {
            return (
                <Users state = {state}
                       navigator = {navigator}  {...actions}/>
            );
        }
        if (routeId === 'Rooms') {
            return (
                <Rooms state = {state}
                       navigator = {navigator}  {...actions} />
            );
        }
        if (routeId === 'Messages') {
            return (
                <Messages state = {state}
                          navigator = {navigator}  {...actions} data = {route.data}/>
            );
        }
    }
}

export default connect(state => ({
        state: state
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(RootRouter);