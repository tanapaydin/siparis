'use strict';

import React, { Component } from 'React';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './configureStore';
import fetchIntercept from 'fetch-intercept';
import Utility from './components/utility';
import TimeoutEventListener from './TimeoutEventListener';  //Bunu sakin SiLMEYiN!!!
import AppEventRegistery from './components/utility/AppEventRegistery';
import {registerStore} from './components/utility/GlobalStore';

function setup():React.Component {

    class Root extends Component {

        constructor() {
            super();
            let store = configureStore(()=> this.setState({isLoading: false}));
            registerStore(store);
            this.state = {
                isLoading: false,
                store: store
            };
            
            setupFetchInterceptors(store);
        }

        render() {
            return (
                <Provider store={this.state.store}>
                    <App store={this.state.store} />
                </Provider>
            );
        }
    }
    return Root
}

// AppEventRegistery.dispatchAjaxEvent sayesinde event fire ediyoruz. Boylece kullanicinin inactive
// oldugu timer reset'leniyor. Yani her fetch yapildiginda 2 dakikalik timer resetleniyor.
function setupFetchInterceptors(store) {
	fetchIntercept.register({
		request: function (url, config) {
			// Modify the url or config here
            Utility.showLoader();
            AppEventRegistery.dispatchAjaxEvent({subType: 'request_start'});
			return [url, config];
		},

		requestError: function (error) {
			// Called when an error occured during another 'request' interceptor call
            Utility.hideLoader();
            AppEventRegistery.dispatchAjaxEvent({subType: 'request_error'});
            return Promise.reject(error);
		},

		response: function (response) {
			// Modify the reponse object
            Utility.hideLoader();
            AppEventRegistery.dispatchAjaxEvent({subType: 'response_success'});
            return response;
		},

		responseError: function (error) {
			// Handle an fetch error
            Utility.hideLoader();
            AppEventRegistery.dispatchAjaxEvent({subType: 'response_error'});
            return Promise.reject(error);
		}
	});
}

export default setup;