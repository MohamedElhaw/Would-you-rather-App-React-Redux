import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reducer from './reducers';
import middleware from './middlewares';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

//create store
const store=createStore(reducer,middleware);
//Wrap the App between the provider and have the access to the store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);