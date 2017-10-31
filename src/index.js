import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import throttle from 'lodash/throttle'
import { /*loadState,*/ saveState } from './localStorage'

//import createLogger from 'redux-logger'

var store = null

const logger = store => next => action => {
    //console.log('dispatching', action)
    let result = next(action)
    //console.log('next state', store.getState())
    return result
}

const getStore = (reducers, initialState, useLocalStore=false) => {
    if (store === null) {

        store = createStore(
            combineReducers(reducers),
            initialState,
            composeWithDevTools(applyMiddleware(thunkMiddleware, logger/*, createLogger()*/)))

        if (useLocalStore) {
            saveState(store.getState())

            store.subscribe(throttle(() => {
                saveState(store.getState());
            }, 1000))
        }

        return store
    } else {
        return store
    }
}

export default getStore
