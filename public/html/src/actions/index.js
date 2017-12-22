import Immutable from 'immutable';
import * as types from './ActionTypes';

export function setPage(value) {
    return {
        type: types.SET_PAGE,
        value
    }
}

const actions = {
    setPage,
};

export default actions;
