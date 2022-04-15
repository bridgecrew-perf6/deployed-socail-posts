import {combineReducers} from 'redux';
import R_AUTH from './R_Auth';
import R_Posts from './R_Posts';

export const reducers=combineReducers({R_Posts,R_AUTH})