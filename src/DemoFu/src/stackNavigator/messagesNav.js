import React from 'react';
import { StackNavigator } from 'react-navigation';
import Messages from '../components/myFavourite';
import FeedDetail from "../components/NewsDetail";

const  MessageStack =  StackNavigator({
    
    Messages: {
            screen: Messages,
            navigationOptions: ({ navigation }) => ({
              title: "Messages",
              headerTitleStyle: { color: "black",alignSelf:"center" },
              headerStyle: {
                backgroundColor: "white"
            },
            })
            
          },
          FeedDetail:{
            screen:FeedDetail
          }
        
       
        },
        {
    
          gestureEnabled: false,
          initialRouteName: 'Messages'
        }
      
      );

      export default MessageStack;