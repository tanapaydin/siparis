'use strict';

import type { Action } from '../actions/types';
import { globalNav } from '../AppNavigator';
import { PUSH_NEW_ROUTE, POP_ROUTE, POP_TO_ROUTE, REPLACE_ROUTE, REPLACE_OR_PUSH_ROUTE, RESET_ROUTE } from '../actions/route';
import { REHYDRATE } from 'redux-persist/constants';
import AppEventRegistery from '../components/utility/AppEventRegistery';


export type State = {
    routes: Array<string>
}

const initialState = {
    routes: ['login']
};

export default function (state:State = initialState, action:Action): State {
  
    if (action.type === PUSH_NEW_ROUTE) {
        AppEventRegistery.dispatchPageEvent({route: action.route});
        globalNav.navigator.push({id: action.route, passProps: action.passProps});
        return {
            routes: [...state.routes, action.route]
        };
    }

    if (action.type === RESET_ROUTE) {
        AppEventRegistery.dispatchPageEvent({route: 'login'});
        globalNav.navigator.resetTo({id: 'login'});
        return {
            routes: []
        }
    }

    if (action.type === REPLACE_ROUTE) {
        AppEventRegistery.dispatchPageEvent({route: action.route});
        globalNav.navigator.replaceWithAnimation({id: action.route, passProps: action.passProps});
        
        let routes = state.routes;
        routes.pop();
        
        return {
            routes: [...routes, action.route]
        };
    }

    // For sidebar navigation
    if (action.type === REPLACE_OR_PUSH_ROUTE) {
        AppEventRegistery.dispatchPageEvent({route: action.route});
        let routes = state.routes;

        if(routes[routes.length - 1] == 'home') {
            // If top route is home and user navigates to a route other than home, then push
            if(action.route != 'home')
                globalNav.navigator.push({id: action.route, passProps: action.passProps});

            // If top route is home and user navigates to home, do nothing
            else 
                routes = [];
        }

        else {
            if(action.route == 'home') {
                globalNav.navigator.resetTo({id: 'home', passProps: action.passProps});
                routes = [];
            }
            else {
                globalNav.navigator.replaceWithAnimation({id: action.route, passProps: action.passProps});
                routes.pop();
            }
        }

        return {
            routes: [...routes, action.route]
        };
    }

    if (action.type === POP_ROUTE) {
        AppEventRegistery.dispatchPageEvent({route: action.route});
        globalNav.navigator.pop({passProps: action.passProps});
        
        let routes = state.routes;
        routes.pop();
        
        return {
            routes: routes
        }
    }

    if (action.type === POP_TO_ROUTE) {
        AppEventRegistery.dispatchPageEvent({route: action.route});
        globalNav.navigator.popToRoute({id: action.route, passProps: action.passProps});
        
        let routes = state.routes;
        while (routes.pop() !== action.route) {}
        
        return {
            routes: [...routes, action.route]
        }
    }

    if (action.type === REHYDRATE) {
        AppEventRegistery.dispatchPageEvent({route: action.route});
        const savedData = action['payload']['route'] || state;
        return {
            ...savedData
        }
    }
    return state;
}