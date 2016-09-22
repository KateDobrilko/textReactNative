/**
 * Created by ekaterina.dobrilko on 9/22/2016.
 */
import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';
import * as websocketEventsConstants from '../constants/websocketEvents';
import {AsyncStorage} from 'react-native';

const initState = {
    ws: {},
    rooms: [],
    users: []
};

export default function RootReducer(state = initState, action = {}) {
    function joinRooms() {

    }

    switch (action.type) {
        case types.CONNECT_WEBSOCKETS:
        {
            state.ws = new WebSocket('ws://chat.exposit-ds.com:80/connection');
            state.ws.onopen = (e) => {
            };
            state.ws.onclose = (e) => {
                console.log(e.code, e.reason);
            };
            state.ws.onmessage = (e) => {
                console.log(e.data);
            };
            state.ws.onerror = (e) => {
                var data = e.message;
                switch (data.event) {
                    case websocketEventsConstants.SOCKET_INIT_MSG :
                    {
                        AsyncStorage.setItem('connectionToken', data['connectionToken']).then(this.joinRooms());
                    }
                    case websocketEventsConstants.USER_MESSAGE:
                    {

                    }
                }
                console.log(e.message);
            };
            return {
                ...state,
                ws: state.ws
            };
        }

        default:
            return state;
    }
}