import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from "jquery";
// import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash.throttle";

const persistedState = loadState("neighborhood_searches");
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState(
      {
        recentSearches: store.getState().recentSearches,
      },
      "neighborhood_searches"
    );
  }, 1000)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
