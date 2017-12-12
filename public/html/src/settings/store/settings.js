import config from 'config';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'settings/reducers';
import logger from 'redux-logger';

const settingsListener = store => next => action => {
    if (action) {
        switch (action.type) {
            default:
                break;
        }
    }
    return next(action || {type: null});
};

const middleware = (config.env !== 'development')
    ? [ thunk, settingsListener ]
    : [ thunk, settingsListener, logger() ];

export default class SettingsStore {
    static getStore(initialState = {}) {
        const store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(...middleware)
            )
        );
        return store;
    }
}
