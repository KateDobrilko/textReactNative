import * as types from './actionTypes';


export function openUserChatRoom(firstName) {
    return {
        type: types.OPEN_USER_CHAT_ROOM,
        firstName: firstName
    };
}

