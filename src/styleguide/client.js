import "./styleguide.scss";
import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
// import { Router } from "react-router";
// import { routes } from "./routes";
// import { browserHistory } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Styleguide from "./components/styleguide";
import reducers from "./reducers";

import "rizzo-next/dist/rizzo-next.css";
// Logging middleware
const logger = store => next => action => {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};

const store = window.$$store = createStore(
  reducers,
  window.__initialState,
  // applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <Styleguide />
  </Provider>,
  document.getElementById("app")
);

// <Router routes={routes} history={browserHistory} />
