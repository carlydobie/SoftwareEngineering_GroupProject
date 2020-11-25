import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/index.js';
import { Provider } from 'react-redux';
import './index.css';

//create the redux store
const store = createStore(
  rootReducer
)

//App
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);