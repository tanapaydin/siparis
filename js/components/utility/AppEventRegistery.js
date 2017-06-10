import React from 'react'

let eventListeners = [];

export default class AppEventRegistery {
  static addEventListener(listener) {
    eventListeners.push(listener);
  }

  static dispatchAjaxEvent( options ) {
    AppEventRegistery._dispatch( Object.assign({type: 'ajax'}, options || {}) );
  }

  static dispatchPageEvent( options ) {
    AppEventRegistery._dispatch( Object.assign({type: 'page'}, options || {}) );
  }
  
  static _dispatch(event) {
  	for(var i=0; i<eventListeners.length; i++) {
      eventListeners[i].onAppEvent(event);
    }
  }
}