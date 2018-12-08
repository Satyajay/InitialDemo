import React from 'react';
import { StackNavigator } from 'react-navigation';
import Notification from '../components/notifications';

const  NotificationStack =  StackNavigator({
    
  Notification: {
            screen: Notification,
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
          initialRouteName: 'Notification'
        }
      
      );

      export default NotificationStack;