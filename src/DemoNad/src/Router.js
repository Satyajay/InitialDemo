
import React, { Component } from 'react';
import { DrawerView, StackNavigator, DrawerNavigator, addNavigationHelpers, } from 'react-navigation';
import { connect } from "react-redux";
import SignUp from "./components/signup";
import Login from "./components/login";
import PropTypes from "prop-types";
import ResetPassowrd from "./components/resetPassword";
import TutorialScreen from "./components/tutorialScreen";
import SettingsScreen from "./components/Settings";
import LanguageScreen from "./components/Language";
import Tab from './tabnavigation';

const image1 = require('./images/menu_icon.png');



const navigationOptions = {
  headerMode: "none",
  initialRouteName: "tutorialScreen",
  gesturesEnabled: false,
  headerBackImage: image1,
};


export const AppNavigator = StackNavigator(
  {
    TutorialScreen: { screen: TutorialScreen },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ResetPassowrd: { screen: ResetPassowrd },
    SettingsScreen: { screen: SettingsScreen },
    LanguageScreen: { screen: LanguageScreen },
    Tab: { screen: Tab }
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




