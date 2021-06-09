import React from 'react';
import ReactDOM from 'react-dom';
import promiseFinally from "promise.prototype.finally";

import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configure } from "mobx";
import { Provider } from "mobx-react";


// TODO: add stores import
import commonStore from "./stores/commonStore";
import authStore from "./stores/authStore";
import userStore from "./stores/userStore";

const stores = {
  commonStore,
  authStore,
  userStore,
}

// FOR easier debugging
window._____APP_STATE_____ = stores

// promise에서의 finally의 형태를 promise로 바꾸는 부분
promiseFinally.shim()

// mobx4에서 useStrict를 사용하기 위한 코드
configure({ enforceActions: "always" })

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
