import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from "../components/home";
import selectInter from "../components/selectInterest";
 import Athletics from "../components/athletics";
 import GameList from "../components/gameList.js";
import CreateSquad from '../components/createSquad';
import Invites from '../components/invites';
// import CreateStory from "../components/createstory.js";
// import NewsDetail from "../components/NewsDetail";
// import Notifications from "../components/notifications.js";
const HomeNav = StackNavigator({

  Home: {
    screen: Home,
    header:null
  },
  selectInter: {
    screen: selectInter,
    header:null
  },
  CreateSquad: {
    screen: CreateSquad,
  },
  Athletics: {
    screen: Athletics,
    header:null
  },
  GameList: {
    screen: GameList,
    header:null
  },
  Invites: {
    screen: Invites,
  },
  

},

  {
    headerMode: '',
    gestureEnabled: false,
    initialRouteName: 'Home'
  }

);

export default HomeNav;