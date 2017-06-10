'use strict';

import type {Action} from '../actions/types';
import { SHOW_LOADER, HIDE_LOADER } from '../actions/loading';

export type State = {
    loaderVisible: boolean
}

const initialState = {
    loaderVisible: false,
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SHOW_LOADER) {
        return {
            ...state,
            loaderVisible: true
        };
    }

    if (action.type === HIDE_LOADER) {
        return {
            ...state,
            loaderVisible: false
        };
    }


    return state;
}