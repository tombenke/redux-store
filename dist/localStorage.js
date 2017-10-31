'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var loadState = exports.loadState = function loadState() {
    try {
        var serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return {};
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {};
    }
};

var saveState = exports.saveState = function saveState(state) {
    try {
        var serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};