import pinch from 'react-native-pinch';
import GlobalStore from './GlobalStore';
import Utility from '../utility';

function wrap(promise, wrapper, errorFn, catchResult) {
  let result = {
    then: function(fn) {
      let newPromise = promise.then(fn);
      return wrap(newPromise, wrapper, errorFn, catchResult);
    },
    finally: function(fn) {
      let newPromise = promise.finally(fn);
      return wrap(newPromise, wrapper, errorFn, catchResult);
    },
    catch: function(fn) {
      wrapper.registeredErrorFn = fn;

      if ( wrapper.errorReceived ) {
        errorFn(wrapper.error);
      }

      return catchResult;
    }
  };

  return result;
}

function promiseWrapper(promise, errorAction) {
  let wrapper = {
    registeredErrorFn: null,
    errorReceived: false,
    error: null,
  };

  let errorFn = function(err) {
  	errorAction();
  	
    if ( wrapper.registeredErrorFn ) {
      wrapper.registeredErrorFn(err);
    }

    wrapper.error = err;
    wrapper.errorReceived = true;
  };

  let catchResult = promise.catch(errorFn);
  return wrap(catchResult, wrapper, errorFn, catchResult);
}

export default function pinchFetch(url, options) {

    if (!options) {
        //Eger options vermemissek, demekki GET icin cagirmisiz demektir.
        //DIKKAT: Bu durumda TOKEN gondermiyoruz!!!
        options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    }
    if (!options.headers) {
        options.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': GlobalStore.getState().user.token
        }
    }
    if (!options.sslPinning) {
        options.sslPinning = {
            cert: 'gd-class2-root'
        }
    }
    
    let errorAction = () => {
        Utility.hideLoader();
    };
    
    // Asil FETCH yaptigimiz yer burasi:
    let promise = pinch.fetch(url, options)
        .then((responseData) => {
            Utility.hideLoader();
            return responseData;
        });

    Utility.showLoader();

    return promiseWrapper(promise, errorAction);
}