import React from 'react'

let store;

export function registerStore(s) {
  store = s;
}

export default class GlobalStore {
  static getStore() {
    return store;
  }

  static getState() {
    return GlobalStore.getStore().getState();
  }

  static dispatch(action) {
    return GlobalStore.getStore().dispatch(action);
  }

  static dispatchAsync(action, timeout = 0) {
    return setTimeout(function(){
      GlobalStore.getStore().dispatch(action)
    }, timeout);
  }
}
