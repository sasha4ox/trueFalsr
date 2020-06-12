import React from "react";
import ReactDOM from "react-dom";
import "jquery/src/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./history";
import thunk from "redux-thunk";

import App from "./App";
import reducer from "./reducers";

import "./index.css";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const context = {
  store,
  history,
};

ReactDOM.render(
  <Provider store={context.store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
