import React from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from '../components/profile';
import MyFeeds from "../components/myFeeds";
import ContactUs from "../components/contactUs";
import Privacy from "../components/privacy";
import Terms from "../components/terms";
import MyProfile from "../components/myProfile";
import NewsDetail from "../components/NewsDetail";
import Editprofile from "../components/editProfile";
import Followers from "../components/followers";
import Following from "../components/following";

const ProfileStack = StackNavigator({

  Profile: {
    screen: Profile,
  },
  MyFeeds:{
    screen:MyFeeds
  },
  ContactUs:{
    screen:ContactUs
  },
  Privacy:{
    screen:Privacy
  },
  Terms:{
    screen:Terms
  },
  MyProfile:{
    screen:MyProfile
  },
   NewsDetail:{
    screen:NewsDetail,
     header:null
  },
  Editprofile:{
    screen:Editprofile
  },
  Followers:{
    screen:Followers
  },
  Following:{
    screen:Following
  }






},
  {
    gestureEnabled: false,
    initialRouteName: 'Profile'
  }

);

export default ProfileStack;