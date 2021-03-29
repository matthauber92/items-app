  
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import AppState from './reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  AppState,
});