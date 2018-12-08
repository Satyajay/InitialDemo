
import React, { Component } from 'react';
import { DrawerView, StackNavigator, DrawerNavigator, addNavigationHelpers, } from 'react-navigation';
import { connect } from "react-redux";
import SignUp from "./components/signup";
import Login from "./components/login";
import Splash from "./components/splash";
// import Terms from "./components/terms";
import MyFavorites from "./components/myFavourite";
// import MyFeeds from "./components/myFeeds";
// import ContactUs from "./components/contactUs";
// import Privacy from "./components/privacy";
// import MyProfile from "./components/myProfile";
// import Followers from "./components/followers";
// import Following from "./components/following";
// import Editprofile from "./components/editProfile";
import PropTypes from "prop-types";
import ResetPassowrd from "./components/resetPassword";
import TutorialScreen from "./components/tutorialScreen";
import SettingsScreen from "./components/Settings";
// import FeedDetail from "./components/feedDetail";
import LanguageScreen from "./components/Language";
import EmailPopup from "./components/emailPopup";
import Tab from './tabnavigation';
//import NewsDetail from "./components/NewsDetail";
import CreateMeme from "./components/createMeme";
//import ViewAll from "./components/viewall";
const image1 = require('./images/menu_icon.png');



const navigationOptions = {
  headerMode: "none",
  initialRouteName: "tutorialScreen",
  gesturesEnabled: false,
  headerBackImage: image1,
};


export const AppNavigator = StackNavigator(
  {
    TutorialScreen: { screen: Splash },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    MyFavorites: { screen: MyFavorites },    
    //MyFeeds: { screen: MyFeeds },  
    // Editprofile:{screen:Editprofile},
    // ContactUs: { screen: ContactUs },   
   // Followers: { screen: Followers },   
    //Following: { screen: Following },   
    //FeedDetail: { screen: FeedDetail },   
    // Privacy: { screen: Privacy }, 
    CreateMeme: { screen: CreateMeme },
    Splash: { screen: Splash },  
    EmailPopup: { screen: EmailPopup },  
    //ViewAll: { screen: ViewAll },         
    ResetPassowrd: { screen: ResetPassowrd },
   // Terms: { screen: Terms },
    //MyProfile:{screen:MyProfile},
    SettingsScreen: { screen: SettingsScreen },
    LanguageScreen: { screen: LanguageScreen },
    Tab: { screen: Tab },
    //NewsDetail: { screen: NewsDetail }
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




