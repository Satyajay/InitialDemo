import React from 'react';
import { StackNavigator } from 'react-navigation';
import Profile from '../components/profile';


const ProfileStack = StackNavigator({

  Profile: {
    screen: Profile,
  },
},
  {
    gestureEnabled: false,
    initialRouteName: 'Profile'
  }

);

export default ProfileStack;