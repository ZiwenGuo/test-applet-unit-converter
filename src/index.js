import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

(function () {
  var firstScript = document.getElementsByTagName("script")[0]
  if (document.getElementById("applet-js-sdk")) {
    return
  }
  var sdk = document.createElement("script")
  sdk.id = "applet-js-sdk"
  sdk.src = "https://connect.facebook.net/en_US/fbapplet.latest.js";
  sdk.onload = initializeApp;
  firstScript.parentNode.insertBefore(sdk, firstScript)
})();

function initializeApp() {
  console.log('sdk loaded')
  window.FBApplet.initializeAsync()
    .then(function() {
      console.log('initializeAsync resolved')
      window.FBApplet.startAppletAsync().then(function() {
        console.log('startAppletAsync resolved')
        startApp()
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

function startApp() {
  const store = createStore(reducer)
  ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
