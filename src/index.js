import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ReactDOM from 'react-dom';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
