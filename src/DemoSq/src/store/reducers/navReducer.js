

import { NavigationActions } from "react-navigation";
import { combineReducers } from "redux";
import { AppNavigator } from "../../Router";


const firstAction = AppNavigator.router.getActionForPathAndParams("TutorialScreen");

const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,

);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case "FETCHING_USER_SUCCESS":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case "LOGOUT":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Login" }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const appReducer = combineReducers({
  nav
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;