import React from 'react';
import { StackNavigator } from 'react-navigation';
import NewsFeed from "../components/NewsFeed";

const HomePage = StackNavigator({

  Explore: {
    screen: NewsFeed,
  },
},

  {
    headerMode: '',
    gestureEnabled: false,
    initialRouteName: 'NewsFeed'
  }

);

export default HomePage;