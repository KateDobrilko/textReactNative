import * as actionTypes from '../constants/actionTypes';


export function selectedChatRoom(state = {
    currentRoomId: ''
}, action) {
    switch (action.type) {
        case actionTypes.ROOM_ACTIONS.SELECT_ROOM:
            return {
                ...state,
                currentRoomId: action.roomId
            };
        case actionTypes.USER_ACTIONS.SELECT_USER:
            return {
                ...state,
                currentRoomId: action.roomId
            };
        default:
            return {...state}
    }
}

export function websocket(state = {}, action) {
    switch (action.type) {
        case actionTypes.WEBSOCKET_ACTIONS.SEND_MESSAGE_UI:
            return {
                ...state
            };

        default:
            return {...state}
    }
}


export function users(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {

    switch (action.type) {
        case actionTypes.USER_ACTIONS.INVALIDATE_USER_LIST:
            return {
                ...state,
                didInvalidate: true
            };
        case actionTypes.USER_ACTIONS.REQUEST_USERS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case actionTypes.USER_ACTIONS.RECEIVE_USERS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.users
            };

        default:
            return state
    }
}

export function rooms(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case actionTypes.ROOM_ACTIONS.INVALIDATE_ROOM_LIST:
            return {
                ...state,
                didInvalidate: true
            };
        case actionTypes.ROOM_ACTIONS.REQUEST_ROOMS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case actionTypes.ROOM_ACTIONS.RECEIVE_ROOMS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.rooms
            };

        default:
            return state
    }
}

export function messages(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case actionTypes.MESSAGE_ACTIONS.INVALIDATE_MESSAGE_LIST:
            return {
                ...state,
                didInvalidate: true
            };

        case actionTypes.MESSAGE_ACTIONS.REQUEST_MESSAGES:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };

        case actionTypes.MESSAGE_ACTIONS.RECEIVE_MESSAGES:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.messages
            };

        default:
            return {
                ...state
            };
    }
}



