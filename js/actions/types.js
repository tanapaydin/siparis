'use strict';

export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string, passProps:any }
    | { type: 'POP_ROUTE', passProps:any }
    | { type: 'RESET_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string, passProps:any }
    | { type: 'REPLACE_ROUTE', route: string, passProps:any }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string, passProps:any }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'LOGIN_USER'}
    | { type: 'LOGOUT_USER'}
    | { type: 'BUY_ITEM'}
    | { type: 'SHOW_LOADER'}
    | { type: 'HIDE_LOADER'}
    | { type: 'SET_DEVICE_TOKEN'}

export type Dispatch = (action:Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any;
export type PromiseAction = Promise<Action>;