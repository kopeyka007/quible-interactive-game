import Immutable from 'immutable';
import {
    SET_PAGE,
    SET_USER_SUCCESS,
} from 'actions/ActionTypes';
import config from 'config';

// const initialState = Immutable.fromJS(config.account);

export default function rootReducer(account = {type: "SET_PAGE"}, action = {}) {
    switch (action.type) {
        case SET_PAGE:
            return account;
        default:
            return account;
    }
}