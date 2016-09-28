import * as actionTypes from '../constants/actionTypes';
import * as globalConstants from '../constants/globalConstants';

var messagesPage = 0;

function requestMessages(authToken, roomId) {
    return {
        type: actionTypes.ROOM_ACTIONS.REQUEST_MESSAGES,
        authToken,
        roomId
    }
}

export function receiveMessages(messages) {
    return {
        type: actionTypes.ROOM_ACTIONS.RECEIVE_MESSAGES,
        messages
    }
}

function fetchMessages(state, authToken) {
    return dispatch => {
        dispatch(requestMessages(authToken))
        return fetch('http://chat.exposit-ds.com/messages/room=' + state.currentRoomId + '?page=' + messagesPage,
            {
                method: 'GET',
                headers: {
                    [globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN]: authToken
                }
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveMessages(json['messages']));
                messagesPage++;
            })
    }
}


function shouldFetchMessages(state) {
    const messages = state.messages
    if (!messages) {
        return true
    } else if (messages.isFetching) {
        return false
    } else {
        return messages.didInvalidate
    }
}

export function invalidateMessageList() {
    return {
        type: actionTypes.MESSAGE_ACTIONS.INVALIDATE_MESSAGE_LIST
    }
}

export function fetchMessagesIfNeeded(authToken, roomId) {
    return (dispatch, getState) => {
        if (shouldFetchMessages(getState(), authToken, roomId)) {
            return dispatch(fetchMessages(getState(), authToken))
        }
    }
}





