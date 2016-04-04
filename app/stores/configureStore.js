import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducers from '../reducers/index'

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    return createStore(
        rootReducers,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}