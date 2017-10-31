'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _localStorage = require('./localStorage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import createLogger from 'redux-logger'

var store = null;

var logger = function logger(store) {
    return function (next) {
        return function (action) {
            //console.log('dispatching', action)
            var result = next(action);
            //console.log('next state', store.getState())
            return result;
        };
    };
};

var getStore = function getStore(reducers, initialState) {
    var useLocalStore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (store === null) {

        store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default, logger /*, createLogger()*/)));

        if (useLocalStore) {
            (0, _localStorage.saveState)(store.getState());

            store.subscribe((0, _throttle2.default)(function () {
                (0, _localStorage.saveState)(store.getState());
            }, 1000));
        }

        return store;
    } else {
        return store;
    }
};

exports.default = getStore;