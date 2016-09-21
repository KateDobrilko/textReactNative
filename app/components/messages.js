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


var messages = [];

export default class Messages extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state =
        {
            page: 0,
            messages: ds.cloneWithRows(messages)
        }
    }


    navUsers() {
        this.props.navigator.push(
            {
                id: "Users"
            }
        )
    }

    getMessages() {
        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
            console.log(this.props.data);
            var url = 'http://chat.exposit-ds.com/messages/room/' + this.props.data.roomId + '?page=' + this.state.page;
            console.log(url);
            fetch(url,
                {
                    method: 'GET',
                    headers: {
                        'X-AUTH-TOKEN': authToken
                    }
                }
            ).then((response) =>
                response.json()
            ).then((responseJson) => {
                console.log(responseJson['messages']);
                this.setState({
                    page: ++this.state.page,
                    messages: this.state.messages.cloneWithRows(responseJson['messages'])
                });
                console.log(this.state.users);
            })
                .catch((error) => {
                    console.error(error);
                })
        });
    }


    _renderRow(rowData) {
        return (
            <View
                style = {{flexDirection:'row', flexWrap:'wrap', height:120,borderBottomColor: '#ededed', borderBottomWidth:1, paddingLeft:10, paddingTop:10}}>
                <View style = {{justifyContent: 'center', paddingLeft: 20}}>
                    <Text style = {{fontSize:22}}>{rowData.date}</Text>
                    <Text style = {{color: '#666'}}>{rowData.content}</Text>
                </View>
            </View> )
    }

    render() {
        return (
            <View>
                <TouchableHighlight underlayColor = "#56a570" style = {[styles.goNextButton]}
                                    onPress = {this.navUsers.bind(this)}>
                    <Text style = {[styles.goNextButtonText]}>Go Back To Users ></Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = "#56a570" style = {[styles.signInButton]}
                                    onPress = {this.getMessages.bind(this)}>
                    <Text style = {[styles.signInButtonText]}>LOAD MESSAGES</Text>
                </TouchableHighlight>
                <ScrollView>
                    <ListView style = {{flex: 1, height: 500}}
                              dataSource = {this.state.messages}
                              renderRow = {this._renderRow.bind(this)}/>
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
});