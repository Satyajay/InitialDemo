
import React, { Component } from 'react';
import { DrawerView, StackNavigator, DrawerNavigator, addNavigationHelpers, } from 'react-navigation';
import { connect } from "react-redux";
import SignUp from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import MyProfile from "./components/myprofile";
import CreateProfile from "./components/createrProfile";
//import selectInterest from "../components/selectInterest";
import PropTypes from "prop-types";
import Tab from './tabnavigation';
import ResetPassowrd from "./components/resetPassword";
import SettingsScreen from "./components/Settings";
import AboutScreen from "./components/about";
import profileScreen from "./components/profile";
import salseforceChatScreen from "./components/saleforeChat";
import myMainView from "./components/MyMainView";
import SelectInterest from "./components/selectInterest";
import ChatDetails from "./components/chat_details";

const navigationOptions = {
  headerMode: "none",
  initialRouteName: "tutorialScreen",
  gesturesEnabled: false,
  //headerBackImage: image1,

};


export const AppNavigator = StackNavigator(
  {
    TutorialScreen: { screen: Login },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    MyProfile: { screen: MyProfile },
    myMainView: { screen: myMainView },
    SelectInterest: { screen: SelectInterest },
    salseforceChatScreen: { screen: salseforceChatScreen },
    AboutScreen: { screen: AboutScreen },
    profileScreen: { screen: profileScreen },
    ResetPassowrd: { screen: ResetPassowrd },
    Tab: { screen: Tab },
    SettingsScreen: { screen: SettingsScreen },
    CreateProfile: { screen: CreateProfile },
    ChatDetails: { screen: ChatDetails },

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




