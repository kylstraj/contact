import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Users from './components/Users';
import registerServiceWorker from './registerServiceWorker';
import contactApp from './reducers/reducers';

const store = createStore(
  contactApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
export default store;
