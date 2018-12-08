import React from 'react';
import { StackNavigator } from 'react-navigation';
import Messages from '../components/messages';


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
        
       
        },
        {
    
          gestureEnabled: false,
          initialRouteName: 'Messages'
        }
      
      );

      export default MessageStack;