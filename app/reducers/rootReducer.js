/**
 * Created by ekaterina.dobrilko on 9/22/2016.
 */
import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';
import * as websocketEventsConstants from '../constants/websocketEvents';
import {AsyncStorage, ListView} from 'react-native';


const initState = {
    ws: {},
    rooms: [],
    users: [],
    messages: [],
    currentRoomId: '',
    messagesPage: 0
};
export default function RootReducer(state = initState, action = {}) {
    function loadRooms() {
        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
            fetch('http://chat.exposit-ds.com/user/room/all',
                {
                    method: 'GET',
                    headers: {
                        'X-AUTH-TOKEN': authToken
                    }
                }
            ).then((response) => response.json()).then((responseJson) => {

                state.rooms = responseJson['rooms'];
                return {
                    ...state
                };
            }).catch((error) => {
                console.error(error);
            })
        });
    }

    function joinRooms() {
        var data = {
            event: websocketEventsConstants.JOIN_ROOMS,
            userId: null
        };
        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
            data['authToken'] = authToken;
            AsyncStorage.getItem('connectionToken').then((connectionToken) => {
                data['connectionToken'] = connectionToken;
                let roomIds = [];
                state.rooms.forEach(room => {
                    roomIds.push(room.id);
                });
                data['roomIds'] = roomIds;
                console.log(data);
                state.ws.send(JSON.stringify(data));
            });
        });
    }

    switch (action.type) {
        case types.OPEN_CHAT_ROOM:
        {
            state.currentRoomId = action.roomId;
            return {
                ...state
            };
        }
        case types.CONNECT_WEBSOCKETS:
        {
            state.ws = new WebSocket('ws://chat.exposit-ds.com:80/connection');
            state.ws.onopen = (e) => {
            };
            state.ws.onclose = (e) => {
                console.log(e.code, e.reason);
            };
            state.ws.onmessage = (e) => {
                var data = JSON.parse(e.data);
                switch (data["event"]) {
                    case websocketEventsConstants.SOCKET_INIT_MSG :
                    {
                        console.log(data);
                        console.log("SOCKET_INIT_MSG Arrived!");
                        AsyncStorage.setItem("connectionToken", data["connectionToken"]).then(joinRooms());
                    }
                    case websocketEventsConstants.USER_MESSAGE:
                    {

                    }
                }
            };
            state.ws.onerror = (e) => {

                console.log(e.message);
            };
            return {
                ...state
            };
        }
        case types.LOAD_ROOMS:
        {
            loadRooms().then((response) => response.json()).then((responseJson) => {

                state.rooms = responseJson['rooms'];
                return {
                    ...state
                };
            }).catch((error) => {
                console.error(error);
            });
        }
        case types.LOAD_USERS:
        {
            AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
                fetch('http://chat.exposit-ds.com/account/users',
                    {
                        method: 'GET',
                        headers: {
                            'X-AUTH-TOKEN': authToken
                        }
                    }
                ).then((response) => response.json()).then((responseJson) => {
                    return {
                        ...state,
                        users: state.users.push.apply(state.users, responseJson['employers'])
                    };

                }).catch((error) => {
                    console.error(error);
                })
            });
            return {
                ...state
            };
        }
        case types.LOAD_MESSAGES:
        {
            AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
                console.log(this.props.data);
                var url = 'http://chat.exposit-ds.com/messages/room/' + state.currentRoomId + '?page=' + state.messagesPage;
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
                    state.messagesPage = ++state.messagesPage.page;
                    state.messages = responseJson['messages'];
                }).catch((error) => {
                    console.error(error);
                })
            });
            return {
                ...state
            };
        }
        case types.LOGIN:
        {
            return {
                ...state
            };
        }

        default:
            return state;
    }
}