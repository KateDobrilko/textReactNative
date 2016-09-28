import * as types from '../constants/actionTypes';


export function getAsyncValue(name, callback, ...parameters) {
    return dispatch => {
        dispatch(requestGetAsyncStorageValue(authToken));
        return AsyncStorage.getItem(name)
            .then(value => dispatch(receiveGetAsyncStorageValue(callback, ...parameters).bind(value)))
    }
}

export function setAsyncValue(name, value, callback, ...parameters) {
    return dispatch => {
        dispatch(requestSetAsyncStorageValue(name, value));
        AsyncStorage.setItem(name, value).then(value => dispatch(receiveSetAsyncStorageValue(callback, ...parameters)));
    }
}

function requestGetAsyncStorageValue(name) {
    return {
        type: types.ASYNC_STORAGE_ACTIONS.REQUEST_GET_VALUE,
        name
    }
}

function receiveGetAsyncStorageValue(value, callback, ...parameters) {
    return (dispatch) => {
        return dispatch(callback(value, ...parameters));
    }
}

function requestSetAsyncStorageValue(name, value) {
    return {
        type: types.ASYNC_STORAGE_ACTIONS.REQUEST_SET_VALUE,
        name,
        value
    }
}

function receiveSetAsyncStorageValue(callback, ...parameters) {
    return (dispatch) => {
        return dispatch(callback(...parameters));
    }
}








