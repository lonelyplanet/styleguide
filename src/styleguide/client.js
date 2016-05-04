import "rizzo-next/src/components/svg_icons";
import "./styleguide.scss";
import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Styleguide from "./components/styleguide";
import reducers from "./reducers";

// import rizzo from "rizzo-next";
// import GlobalHeader from "rizzo-next/src/components/header";
// import GlobalFooter from "rizzo-next/src/components/footer";
// rizzo.renderComponent(GlobalHeader, ".lp-global-header");
// rizzo.renderComponent(GlobalFooter, ".lp-global-footer");


// import { Router } from "react-router";
// import { routes } from "./routes";
// import { browserHistory } from "react-router";

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
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <Styleguide />
  </Provider>,
  document.getElementById("app")
);

document.querySelector(".page-container").className += " page-container--ready";

// <Router routes={routes} history={browserHistory} />
