
import React, { Component } from 'react';
import { DrawerView, StackNavigator, DrawerNavigator, addNavigationHelpers, } from 'react-navigation';
import { connect } from "react-redux";
import Login from "./components/login";
import PropTypes from "prop-types";
import ResetPassowrd from "./components/resetPassword";
import Tab from './tabnavigation';
import Landing from './components/landing';
import CreatePin from './components/createPin';
import DevAuth from './components/devAuth';
import ForgotPin from './components/forgot-pin';
import Contact from './components/contact';
import Scanner from './components/scanner';


const image1 = require('./images/menu_icon.png');



const navigationOptions = {
  headerMode: "none",
  initialRouteName: "Landing",
  gesturesEnabled: false,
  headerBackImage: image1,
};


export const AppNavigator = StackNavigator(
  {
    TutorialScreen: { screen: Landing },
    Login: { screen: Login },
    ResetPassowrd: { screen: ResetPassowrd },
    Tab: { screen: Tab },
    Landing: { screen: Landing },
    CreatePin: { screen: CreatePin },
    DevAuth: { screen: DevAuth },
    ForgotPin: { screen: ForgotPin },
    Contact: { screen: Contact },
    Scanner: { screen: Scanner },
  },
  {
    gesturesEnabled: false
  },

);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)


AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});


export default connect(mapStateToProps)(AppWithNavigationState);




