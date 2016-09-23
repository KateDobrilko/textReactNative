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
    messagesPage: 0,
    currentUserId: ''

};
export default function RootReducer(state = initState, action = {}) {
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

                state.ws.send(JSON.stringify(data));
            });
        });
    }

    switch (action.type) {
        case types.OPEN_CHAT_ROOM:
        {
            return {
                ...state,
                currentRoomId: action.roomId
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
                        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
                            fetch('http://chat.exposit-ds.com/user/room/all',
                                {
                                    method: 'GET',
                                    headers: {
                                        'X-AUTH-TOKEN': authToken
                                    }
                                }
                            ).then((response) => response.json()).then((responseJson) => {
                                AsyncStorage.setItem("connectionToken", data["connectionToken"]).then(joinRooms());
                                return {
                                    ...state,
                                    rooms: state.rooms.push.apply(state.rooms, responseJson['rooms'])
                                };

                            }).catch((error) => {
                                console.error(error);
                            })
                        });
                    }
                    case websocketEventsConstants.USER_MESSAGE:
                    {
                    }
                    case websocketEventsConstants.JOIN_ROOMS:
                    {
                        console.log("This is join rooms input!");
                        console.log(data);
                        var newData = {
                            event: websocketEventsConstants.REQUEST_USERS_ONLINE,
                            userId: data["userId"]
                        };
                        AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
                            data['authToken'] = authToken;
                            AsyncStorage.getItem('connectionToken').then((connectionToken) => {
                                newData['connectionToken'] = connectionToken;
                                state.ws.send(JSON.stringify(newData));
                            });
                        });
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
            AsyncStorage.getItem('X-AUTH-TOKEN').then((authToken) => {
                fetch('http://chat.exposit-ds.com/user/room/all',
                    {
                        method: 'GET',
                        headers: {
                            'X-AUTH-TOKEN': authToken
                        }
                    }
                ).then((response) => response.json()).then((responseJson) => {
                    return {
                        ...state,
                        rooms: state.rooms.push.apply(state.rooms, responseJson['rooms'])
                    };

                }).catch((error) => {
                    console.error(error);
                })
            });
            return {
                ...state
            };
        }
        case types.LOAD_USERS:
        {
            console.log("function load users started!");
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
                var url = 'http://chat.exposit-ds.com/messages/room/' + state.currentRoomId + '?page=' + state.messagesPage;
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
                    state.messagesPage = state.messagesPage++;
                    return {
                        ...state,
                        messages: state.messages.push.apply(state.messages, responseJson['messages']),
                        messagesPage: ++state.messagesPage
                    };
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