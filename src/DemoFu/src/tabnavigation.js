import React from 'react';
import { Text, View,Image } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
 import NewsFeed from './stackNavigator/exploreNav';
import SearchStack from './stackNavigator/searchNav';
import ProfileStack from './stackNavigator/profileNav';
import MessageStack from './stackNavigator/messagesNav';
import CreateStack from './stackNavigator/createNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
const image3 = require('./images/dev3.jpg');

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const tabnav = TabNavigator({
  
       Home: { 
            screen: NewsFeed,
            navigationOptions: ({ navigation }) => ({
              //tabBarLabel: "Home",
              tabBarLabel: <View/>,
              header: null,
        
            })
       },
      Center: 
          {
             screen: SearchStack,
             navigationOptions: ({ navigation }) => ({
              tabBarLabel: <View/>,
              header: null,
             })
       },
       Add: 
       {
          screen: CreateStack,
          navigationOptions: ({ navigation }) => ({
           tabBarLabel: <View/>,
           header: null,
          })
      },
      Video: 
      {
            screen: MessageStack,
            navigationOptions: ({ navigation }) => ({
              tabBarLabel: <View/>,
              header: null,
            })
      },
      Profile: 
      {
          screen: ProfileStack,
          navigationOptions: ({ navigation }) => ({
          tabBarLabel: <View/>,
          header: null,
          })
      },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? require('./images/home-selected.png') : require('./images/home-unselected.png');
        } else if (routeName === 'Center') {
          iconName = focused ? require('./images/feeds-selected.png') : require('./images/feeds-unselected.png');
        }else if (routeName === 'Add') {
          iconName = focused ? require('./images/create-selected.png') : require('./images/create-unselected.png');
        }else if (routeName === 'Video') {
          iconName = focused ? require('./images/favorite-selected.png') : require('./images/favorite-unselected.png');
        }else if (routeName === 'Profile') {
          iconName = focused ? require('./images/menu-selected.png') : require('./images/menu-unselected.png');
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Image source={iconName} style={{height:27, width:27}}/>;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#C3363F',
      inactiveTintColor: 'gray',
      tabBarLabel: "",
      style: {
      backgroundColor: '#fff',
      // paddingTop: 4,
      // elevation: 4,
      // top:2,
        height: 57,
    }
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);



export default tabnav;