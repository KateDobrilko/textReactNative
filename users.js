import React, {Component, PropTypes} from 'react';
import {View, Navigator, Text, TouchableHighlight, AsyncStorage, ListView, ScrollView, StyleSheet} from 'react-native';
import {Gravatar, GravatarApi} from 'react-native-gravatar';

var users = [];
export default class Users extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state =
        {
            users: ds.cloneWithRows(users)

        }
    }

    navMessages() {
        this.props.navigator.push({
            id: 'Rooms'
        });

    }

    getUsers() {
        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
            fetch('http://chat.exposit-ds.com/account/users',
                {
                    method: 'GET',
                    headers: {
                        'X-AUTH-TOKEN': authToken
                    }
                }
            ).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson['employers']);
                this.setState({
                    users: this.state.users.cloneWithRows(responseJson['employers'])
                });
                console.log(this.state.users);
            })
                .catch((error) => {
                    console.error(error);
                })
        });
    }

    _renderRow(rowData) {
        console.log('render row working');
        return (<View
            style = {{height:100,borderBottomColor: '#ededed', borderBottomWidth:1, paddingLeft:10, paddingTop:10}}>
            <View>
                
            </View>
            <View>
                <Text style = {{fontSize:22}}>{rowData.firstName}</Text>
                <Text style = {{color: '#666'}}>{rowData.lastName}</Text>
            </View>
        </View> )
    }

    render() {
        return (
            <View>
                <Text>This is users page scene!</Text>
                <TouchableHighlight onPress = {this.getUsers.bind(this)}>
                    <Text>Go to Rooms Screen</Text>
                </TouchableHighlight>
                <ScrollView>
                    <ListView style = {{flex: 1, height: 578}}
                              dataSource = {this.state.users}
                              renderRow = {this._renderRow}/>
                </ScrollView>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    roundedProfileImage: {
        width: 100, height: 100, borderWidth: 3,
        borderColor: 'white', borderRadius: 50
    }
});
