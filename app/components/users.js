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

var users = [];
export default class Users extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            usersDataSource: ds.cloneWithRows(users)
        }
    }

    componentDidMount() {
        console.log(this.props.connectWebsockets);
        this.props.connectWebsockets();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            usersDataSource: this.state.usersDataSource.cloneWithRows(nextProps.users)
        });
    }

    navMessages(roomId) {
        this.props.navigator.push({
            id: 'Messages',
            data: {
                roomId: roomId
            }
        });
    }

    navRooms() {
        this.props.navigator.push({
            id: 'Rooms'
        });
    }


    _renderRow(rowData) {
        return (<TouchableOpacity onPress = {() => {
                                  this.props.openChatRoom(rowData.privateRoomId);
                                  this.navMessages();}}
                                  style = {{flexDirection:'row', flexWrap:'wrap', height:120,borderBottomColor: '#ededed', borderBottomWidth:1, paddingLeft:10, paddingTop:10}}>
            <View style = {{justifyContent: 'flex-start'}}>
                <Image style = {[styles.roundedProfileImage]}
                       source = {{uri:gravatarApi.imageUrl({email:rowData.email})}}/>
            </View>
            <View style = {{justifyContent: 'center', paddingLeft: 20}}>
                <Text style = {{fontSize:22}}>{rowData.firstName}</Text>
                <Text style = {{color: '#666'}}>{rowData.lastName}</Text>
            </View>
        </TouchableOpacity> )
    }

    render() {
        console.log(this.props.users);
        return (
            <View>
                <TouchableHighlight underlayColor = "#56a570" style = {[styles.goNextButton]}
                                    onPress = {this.navRooms.bind(this)}>
                    <Text style = {[styles.goNextButtonText]}>Go To Rooms ></Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = "#56a570" style = {[styles.signInButton]}
                                    onPress = {this.props.loadUsers}>
                    <Text style = {[styles.signInButtonText]}>LOAD USERS</Text>
                </TouchableHighlight>
                <ScrollView>
                    <ListView style = {{flex: 1, height: 500}}
                              dataSource = {this.state.usersDataSource}
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
    }
});
