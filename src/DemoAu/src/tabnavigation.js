import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import {
  TabNavigator,
  TabBarBottom,
  StackNavigator,
  NavigationActions,
} from 'react-navigation'
import MintStack from './stackNavigator/mintNav';
import WalletStack from './stackNavigator/walletNav';
import ValueStack from './stackNavigator/valueNav';
import MoreStack from './stackNavigator/moreNav';
const image3 = require('./images/dev3.jpg');
import { scaleHeight, scaleWidth, normalizeFont } from "./utils/responsive";

const tabnav = TabNavigator({
  MintStack: {
    screen: MintStack,
    navigationOptions: ({
      navigation
    }) => ({
      tabBarLabel: "Mint",
      header: null,

    })
  },
  WalletStack: {
    screen: WalletStack,
    navigationOptions: () => ({
      tabBarLabel: "Wallet",
      header: null,
    })
  },
  ValueStack: {
    screen: ValueStack,
    navigationOptions: () => ({
      tabBarLabel: "Value",
      header: null,
    })
  },
  MoreStack: {
    screen: MoreStack,
    navigationOptions: () => ({
      tabBarLabel: "More",
      header: null
    })
  }
}, {
    navigationOptions: ({
      navigation
    }) => ({
      tabBarIcon: ({
        focused,
        tintColor
      }) => {
        const {
          routeName
        } = navigation.state;
        let iconName;
        if (routeName === 'MintStack') {
          iconName = focused ? require('./img/mint-hover.png') : require('./img/mint.png');
        } else if (routeName === 'WalletStack') {
          iconName = focused ? require('./img/wallet-hover.png') : require('./img/wallet.png');
        } else if (routeName === 'ValueStack') {
          iconName = focused ? require('./img/value-hover.png') : require('./img/value.png');
        } else if (routeName === 'MoreStack') {
          iconName = focused ? require('./img/more-hover.png') : require('./img/more.png');
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Image source={
          iconName
        }
          style={
            {
              height: 25,
              width: 25
            }
          }
        />;
      },
    }),
    // tabBarComponent: TabBarBottom,
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
    // tabBarOptions: {
    //   activeTintColor: '#00ADDD',
    //   inactiveTintColor: '#9B9B9B',
    //   labelStyle: { fontSize: 17, marginBottom: 20 },
    //   style: { height: 60 }
    // },
    tabBarOptions: {
      activeTintColor: '#24329D',
      inactiveTintColor: 'gray',
      tabBarLabel: "",
      labelStyle: { fontSize: normalizeFont(14), marginBottom: 5 },
      style: {
        backgroundColor: '#fff',
        // paddingTop: 4,
        // elevation: 4,
        top: 0,
        height: 60,

      },
      tabBarSelectedItemStyle: {
        borderBottomWidth: scaleWidth(2),
        borderBottomColor: 'red',
      },
    },
    animationEnabled: false,
    swipeEnabled: false,
  });

export default tabnav;