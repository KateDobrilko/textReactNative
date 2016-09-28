import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import websocketsMiddleware from '../middleware/websocketMiddleware'
