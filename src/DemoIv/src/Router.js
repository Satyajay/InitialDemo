
import React, { Component } from 'react';
import { DrawerView, StackNavigator, DrawerNavigator, addNavigationHelpers, } from 'react-navigation';
import { connect } from "react-redux";
import SignUp from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import PropTypes from "prop-types";
import ResetPassowrd from "./components/resetPassword";
import TutorialScreen from "./components/tutorialScreen";
import SettingsScreen from "./components/Settings";
import AboutScreen from "./components/about";
import profileScreen from "./components/profile";
import MenuScreen from "./components/ControlPanel";
import salseforceChatScreen from "./components/saleforeChat";
import myMainView from "./components/MyMainView";

const navigationOptions = {
  headerMode: "none",
  initialRouteName: "tutorialScreen",
  gesturesEnabled: false,
  //headerBackImage: image1,
  
};


export const AppNavigator = StackNavigator(
  {
    TutorialScreen: { screen: TutorialScreen },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Home: { screen: Home },
    myMainView:{screen: myMainView},
    MenuScreen: { screen: MenuScreen },
    salseforceChatScreen:{screen: salseforceChatScreen},
    AboutScreen: { screen: AboutScreen },
    profileScreen: { screen: profileScreen },    
    ResetPassowrd: { screen: ResetPassowrd },
    SettingsScreen: { screen: SettingsScreen },
    //LanguageScreen: { screen: LanguageScreen },
   // Tab: { screen: Tab }
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




