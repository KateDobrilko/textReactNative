import * as types from '../actions/actionTypes';
import * as actions from '../actions/actions';

const initState = {
    captured: false
};

export function RootReducer(state = initState, action = {}) {
    switch (action.type) {
        case types.OPEN_CHAT_ROOM:  {
                console.log(action.firstName);
                return {
                    ...state
                } ;
            }


        default:
            return state;
    }
}