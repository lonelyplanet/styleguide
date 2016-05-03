import { combineReducers } from "redux";

function styleguide(state = window.__initialState, action) {
  if (action.type === "UPDATE_STYLES") {
    const component = state.components.filter((c) => c.name === action.data.name)[0];

    if (!component) {
      return state;
    }

    // component.styles = { ...action.data.styles };

    return { ...state };
  }
  return state;
}

export default combineReducers({
  styleguide,
});
