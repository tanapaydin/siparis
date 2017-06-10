'use strict';

import type {Action} from '../actions/types';
import { LOGIN_USER, LOGOUT_USER, SET_DEVICE_TOKEN } from '../actions/user';

export type State = {
    isLoggedIn: boolean,
    userEmail: string,
    token: string,
    hashOfPin: string,
    privateKey: string,
    name: string,
    surname: string,
    avatarImage: string,

    deviceUuid: string,
    deviceToken: string,
    deviceOS: string,
}

const initialState = {
    isLoggedIn: false,
    userEmail: '',
    token: '',
    hashOfPin: '',
    privateKey: '',
    name: '',
    surname: '',
    avatarImage: '',

    deviceUuid: '',
    deviceToken: '',
    deviceOS: '',
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === LOGIN_USER) {
        return {
            ...state,
            isLoggedIn: true,
            userEmail: action.user.userEmail,
            token: action.user.token,
            hashOfPin: action.user.hashOfPin,
            privateKey: action.user.privateKey,
            name: action.user.name,
            surname: action.user.surname,
            avatarImage: action.user.avatarImage,
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            isLoggedIn: false
        };
    }

    if (action.type === SET_DEVICE_TOKEN) {
        // console.log('reducer, setDeviceToken, action:', action);
        return {
            ...state,
            deviceUuid: action.token.deviceUuid,
            deviceToken: action.token.deviceToken,
            deviceOS: action.token.deviceOS
        }
    }

    return state;
}