import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import navReducer from './reducers/navReducer'

const middleware = [thunk];

const store = createStore(
  navReducer,
  undefined,
  compose(applyMiddleware(...middleware))
);

export default store;
