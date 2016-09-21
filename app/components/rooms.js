import React, {Component, PropTypes} from 'react';
import {
    View,
    Navigator,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage,
    ListView,
    ScrollView,
    StyleSheet
} from 'react-native';
var gravatarApi = require('gravatar-api');

var rooms = [];
export default class Rooms extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state =
        {
            rooms: ds.cloneWithRows(rooms)
        }
    }

    navMessages(roomId) {
        this.props.navigator.push({
            id: 'Messages',
            data: {
                roomId: roomId
            }

        });
    }

    navUsers() {
        this.props.navigator.push({
            id: 'Users'
        });
    }

    getRooms() {
        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
            fetch('http://chat.exposit-ds.com/user/room/all',
                {
                    method: 'GET',
                    headers: {
                        'X-AUTH-TOKEN': authToken
                    }
                }
            ).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson['rooms']);
                this.setState({
                    rooms: this.state.rooms.cloneWithRows(responseJson['rooms'])
                });
                console.log(this.state.rooms);
            })
                .catch((error) => {
                    console.error(error);
                })
        });
    }

    _renderRow(rowData) {
        return (<TouchableOpacity onPress = {() => this.navMessages(rowData.id).bind(this)}
            style = {[styles.listRow]}>
            <View style = {{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                <Text ellipsizeMode = "tail"
                      style = {{flex:1, justifyContent: 'center', fontSize:18}}>{rowData.name}</Text>
            </View>
        </TouchableOpacity> )
    }

    render() {
        return (
            <View>
                <TouchableHighlight underlayColor = "#56a570" style = {[styles.goNextButton]}
                                    onPress = {this.navUsers.bind(this)}>
                    <Text style = {[styles.goNextButtonText]}>Go To Users ></Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = "#56a570" style = {[styles.signInButton]}
                                    onPress = {this.getRooms.bind(this)}>
                    <Text style = {[styles.signInButtonText]}>LOAD ROOMS</Text>
                </TouchableHighlight>
                <ScrollView>
                    <ListView style = {{flex: 1, height: 520, flexDirection: 'row'}}
                              dataSource = {this.state.rooms}
                              renderRow = {this._renderRow}/>
                </ScrollView>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    roundedProfileImage: {
        justifyContent: 'flex-start',
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50
    },
    signInButton: {
        backgroundColor: '#5fba7d',
        padding: 10
    },
    signInButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    goNextButton: {
        backgroundColor: '#ffd47c',
        padding: 10
    },
    goNextButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    listRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 50,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        padding: 10
    }
});
