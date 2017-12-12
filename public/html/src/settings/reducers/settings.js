import Immutable from 'immutable';
import {
    SET_PAGE,
    SET_USER_SUCCESS,
} from 'settings/actions/ActionTypes';
import config from 'config';

// const initialState = Immutable.fromJS(config.account);

export default function Settings(account = {type: "SET_PAGE"}, action = {}) {
    switch (action.type) {
        case SET_PAGE:
            return false;
        default:
            return account;
    }
}
