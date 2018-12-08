import React from 'react';
import { StackNavigator } from 'react-navigation';
import Search from '../components/allFeed';
//import FeedDetail from "../components/feedDetail";
import FeedDetail from "../components/NewsDetail";
import Likes from "../components/likes";
import Comments from "../components/comments";

const  SearchStack =  StackNavigator({
    
          Search: {
            screen: Search,
          },
           
            FeedDetail:{
              screen:FeedDetail
            },
            Likes:{
              screen:Likes
            },
            Comments:{
              screen:Comments
            },
        },
        {
    
          gestureEnabled: false,
          initialRouteName: 'Search'
        }
      
      );

      export default SearchStack;