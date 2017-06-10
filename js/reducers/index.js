'use strict';

import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import user from './user';
import market from './market';
import loading from './loading';

export default combineReducers({
	
	drawer,
	route,
	user,
	market,
	loading
  	
})



