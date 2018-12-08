import React, { Component } from 'react';
import AppWithNavigationState, { AppNavigator } from './Router';
import { Provider } from 'react-redux';
import store from './store/configureStore'

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </Provider>

    );
  }
}