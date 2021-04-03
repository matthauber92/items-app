import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { history, store } from './store';
import rootReducer from './root-reducer';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function testConsole(message) {
  console.log(`this HIT THE JS FILE${message}`);
}

render();
testConsole('NOT IN MODULE HOT');

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    testConsole('IN MODULE HOT');
    render();
  });

  // Reload reducers
  module.hot.accept('./root-reducer', () => {
    store.replaceReducer(rootReducer(history));
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
