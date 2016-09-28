import * as actionTypes from '../constants/actionTypes';
import * as globalConstants from '../constants/globalConstants';

function requestRooms(authToken) {
    return {
        type: actionTypes.ROOM_ACTIONS.REQUEST_ROOMS,
        authToken
    }
}

function receiveRooms(rooms, callback, ...parameters) {
    if (callback) {
        callback(...parameters).bind(rooms);
    }
    return {
        type: actionTypes.ROOM_ACTIONS.RECEIVE_ROOMS,
        rooms: rooms
    }
}

function fetchRooms(authToken, callback, ...parameters) {
    return dispatch => {
        dispatch(requestRooms(authToken))
        return fetch('http://chat.exposit-ds.com/user/room/all',
            {
                method: 'GET',
                headers: {
                    [globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN]: authToken
                }
            })
            .then(response => response.json())
            .then(json => dispatch(receiveRooms(json['rooms'], callback, ...parameters)))
    }
}


function shouldFetchRooms(state) {
    const rooms = state.rooms
    if (!rooms) {
        return true
    } else if (rooms.isFetching) {
        return false
    } else {
        return rooms.didInvalidate
    }
}

export function selectRoom(room) {
    return {
        type: actionTypes.ROOM_ACTIONS.SELECT_ROOM,
        room
    }
}


export function invalidateRoomList() {
    return {
        type: actionTypes.ROOM_ACTIONS.INVALIDATE_ROOM_LIST
    }
}


export function fetchRoomsIfNeeded(authToken, callback, ...parameters) {
    return (dispatch, getState) => {
        if (shouldFetchRooms(getState(), authToken)) {
            return dispatch(fetchRooms(authToken, callback, ...parameters))
        }
    }
}






