import React from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from '../components/profile';
import MyProfile from "../components/myprofile";

const ProfileStack = StackNavigator({

  Profile: {
    screen: MyProfile,
  },
 






},
  {
    gestureEnabled: false,
    initialRouteName: 'Profile'
  }

);

export default ProfileStack;