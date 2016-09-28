import * as types from '../constants/actionTypes';
import * as asyncStorageActions from './asyncStorageActions';
import * as globalConstants from '../constants/globalConstants';
import * as messageActions from './messageActions';
import * as roomActions from './roomActions';

var md5 = require('md5');
var PushNotification = require('react-native-push-notification');

PushNotification.configure({
    onNotification: function (notification) {
    }
});

export function disconnected() {

}

export function connected() {

}

export function receiveWebsocketMessage(message, socket) {
    return (dispatch, getState) => {
        switch (message.event) {
            case globalConstants.WEBSOCKET_EVENTS.JOIN_ROOMS:
            {
                let joinRoomsParameters = [message, socket];
                let getConnectionTokenParameters =
                    [globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN,
                        onJoinRooms,
                        ...joinRoomsParameters];
                let getAuthTokenParameters = [
                    globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN,
                    asyncStorageActions.getAsyncValue,
                    ...getConnectionTokenParameters
                ];
                dispatch(asyncStorageActions.getAsyncValue
                (...getAuthTokenParameters));
                break;
            }
            case globalConstants.WEBSOCKET_EVENTS.SOCKET_INIT_MSG:
            {
                let onSocketInitMessageParameters = [message, socket];
                let setConnectionTokenParameters =
                    [
                        globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN,
                        message[globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN],
                        onSocketInitMessage,
                        ...onSocketInitMessageParameters
                    ];
                let getAuthTokenParameters = [
                    globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN,
                    asyncStorageActions.setAsyncValue,
                    ...setConnectionTokenParameters
                ];
                dispatch(asyncStorageActions.getAsyncValue
                (...getAuthTokenParameters));
                break;
            }
            case globalConstants.WEBSOCKET_EVENTS.USER_MESSAGE:
            {
                let onChatMessageParameters = [getState(), message, socket];
                let setConnectionTokenParameters =
                    [
                        globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN,
                        message[globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN],
                        onChatMessage,
                        ...onChatMessageParameters
                    ];
                let setAuthTokenParameters = [
                    globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN,
                    message[globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN],
                    asyncStorageActions.setAsyncValue,
                    ...setConnectionTokenParameters
                ];
                dispatch(asyncStorageActions.setAsyncValue
                (...setAuthTokenParameters));
                break;
            }
        }
    }
}

function onJoinRooms(message, socket) {
    var newData = {
        event: globalConstants.WEBSOCKET_EVENTS.REQUEST_USERS_ONLINE,
        userId: message["userId"],
        authToken: this[globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN],
        connectionToken: this[globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN]
    };

    socket.send(JSON.stringify(newData));
}

function onSocketInitMessage(socket) {
    let joinRoomsParameters = [
        this[globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN],
        this[globalConstants.ASYNC_STORAGE_VALUES.CONNECTION_TOKEN],
        socket
    ];
    return dispatch => {
        dispatch(roomActions.fetchRoomsIfNeeded
            (
                this[globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN],
                joinRooms,
                ...joinRoomsParameters)
        );
    };
}

function joinRooms(authToken, connectionToken, socket) {
    var data = {
        event: globalConstants.WEBSOCKET_EVENTS.JOIN_ROOMS,
        userId: null,
        connectionToken,
        authToken
    };
    let roomIds = [];
    this.rooms.forEach(room => {
        roomIds.push(room.id);
    });
    data['roomIds'] = roomIds;
    socket.send(JSON.stringify(data));
}

function onChatMessage(state, message) {
    PushNotification.localNotification({
        vibrate: true, // (optional) default: true
        vibration: 300,
        title: "My Notification Title",
        message: "New Message Income",
        playSound: true,
        soundName: 'default',
        number: '1'
    });
    var messages = state.messages.push(message);

    return dispatch => {
        dispatch(messageActions.receiveMessages(messages))
    };
}


export function connectWebsockets() {
    return {
        type: types.WEBSOCKET_ACTIONS.CONNECT_WEBSOCKETS
    };
}


export function processSendMessage(messageText, authToken, connectionToken, socket) {

    var message = {
        content: messageText,
        date: '',
        event: globalConstants.MESSAGE_TYPES.USER_MESSAGE,
        firstName: '',
        hash: md5(messageText),
        lastName: '',
        roomId: state.currentRoomId,
        type: globalConstants.MESSAGE_TYPES.TEXT_TYPE,
        authToken,
        connectionToken
    };


    state.ws.send(JSON.stringify(message));

}





