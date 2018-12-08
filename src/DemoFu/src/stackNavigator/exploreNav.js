import React from 'react';
import { StackNavigator } from 'react-navigation';

import Explore from "../components/explore";
import ViewAll from "../components/viewall";
import Meme from "../components/memes";
import NewsDetail from "../components/NewsDetail";
const ExploreNav = StackNavigator({

  Explore: {
    screen: Explore,
    header:null
  },
   Meme: {
    screen: Meme,
     header:null
  },
  ViewAll:{
    screen:ViewAll,
     header:null
  },
  NewsDetail:{
    screen:NewsDetail,
     header:null
  }

},

  {
    headerMode: '',
    gestureEnabled: false,
    initialRouteName: 'Explore'
  }

);

export default ExploreNav;