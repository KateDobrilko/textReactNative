import * as actionTypes from '../constants/actionTypes';
import * as globalConstants from '../constants/globalConstants';

export function selectUser(user) {
    return {
        type: actionTypes.USER_ACTIONS.SELECT_USER,
        user
    }
}

export function invalidateUserList() {
    return {
        type: actionTypes.USER_ACTIONS.INVALIDATE_USER_LIST
    }
}


export function fetchUsersIfNeeded(authToken) {
    return (dispatch, getState) => {
        if (shouldFetchUsers(getState(), authToken)) {
            return dispatch(fetchUsers(authToken))
        }
    }
}

function requestUsers(authToken) {
    return {
        type: actionTypes.USER_ACTIONS.REQUEST_USERS,
        authToken
    }
}

function receiveUsers(users) {
    return {
        type: actionTypes.USER_ACTIONS.RECEIVE_USERS,
        users: users
    }
}

function fetchUsers(authToken) {
    return dispatch => {
        dispatch(requestUsers(authToken))
        return fetch('http://chat.exposit-ds.com/account/users',
            {
                method: 'GET',
                headers: {
                    [globalConstants.ASYNC_STORAGE_VALUES.AUTH_TOKEN]: authToken
                }
            }).then(response => response.json())
            .then(json => dispatch(receiveUsers(json['employers'])))
    }
}

function shouldFetchUsers(state) {
    const users = state.users
    if (!users) {
        return true
    } else if (users.isFetching) {
        return false
    } else {
        return users.didInvalidate
    }
}









