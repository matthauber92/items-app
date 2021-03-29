
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './root-reducer';

export const history = createBrowserHistory();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer(history),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
    ),
  ),
);