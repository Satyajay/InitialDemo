import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import ExploreStack from './stackNavigator/exploreNav';
import SearchStack from './stackNavigator/searchNav';
import ProfileStack from './stackNavigator/profileNav';
import MessageStack from './stackNavigator/messagesNav';
const image3 = require('./images/dev3.jpg');

const tabnav = TabNavigator({
  ExploreStack: {
    screen: ExploreStack,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Explore",
      header: null,

    })
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: () => ({
      tabBarLabel: "Search",
      header: null
    })
  },
  ProfileStack: {
    screen: ProfileStack,
    navigationOptions: () => ({
      tabBarLabel: "Profile",
      header: null,
    })
  },
  MessageStack: {
    screen: MessageStack,
    navigationOptions: () => ({
      tabBarLabel: "Messages",
      header: null
    })
  }
},
  {
    tabBarOptions: {
      activeTintColor: '#00ADDD',
      inactiveTintColor: '#9B9B9B',
      labelStyle: { fontSize: 17, marginBottom: 20 },
      style:{height:60}
    },

    tabBarComponent: (props) => {
      const { navigation, navigationState } = props;
      const _jumpToIndex = props.jumpToIndex; // Just in case 
      return (<TabBarBottom {...props} jumpToIndex={(index) => {
        // Do what you want here, I'm clearing the stack on each tab
        tab = navigationState.routes[index];
        tabRoute = tab.routeName;
        firstRoute = tab.routes[0].routeName; // navState is Tabs object
        const tabAction = NavigationActions.navigate({ routeName: tabRoute });
        const firstScreenAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: firstRoute })]
        });
        navigation.dispatch(tabAction);
        navigation.dispatch(firstScreenAction);
      }}
      />
      )
    },

    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,

  });

export default tabnav;