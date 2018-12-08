import React from 'react';
import { Text, View, Image } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import HomeScreen from './stackNavigator/homeNav';
import EventsStack from './stackNavigator/eventsNav';
import ProfileStack from './stackNavigator/profileNav';
// import MessageStack from './stackNavigator/messagesNav';
import NotificationStack from './stackNavigator/notificationNav';
import { Platform } from 'react-native';
import Athletics from './components/athletics';
// import Ionicons from 'react-native-vector-icons/Ionicons';
//const image3 = require('./images/dev3.jpg');

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
// }

class EventsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Events!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}
class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification!</Text>
      </View>
    );
  }
}

const tabnav = TabNavigator({

  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Home",
      tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13 }}>Home</Text>,
      header: null,

    })
  },
  Events:
  {
    screen: EventsStack,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Events",
      tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13 }}>Events</Text>,
      header: null,
    })
  },
  Profile:
  {
    screen: ProfileStack,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13 }}>Profile</Text>,
      header: null,
    })
  },
  Notification:
  {
    screen: NotificationStack,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: <Text style={{ marginBottom: 5, textAlign: 'center', fontSize: 13 }}>Notifications</Text>,
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
          iconName = focused ? require('./images/home.png') : require('./images/home.png');
        } else if (routeName === 'Events') {
          iconName = focused ? require('./images/events.png') : require('./images/events.png');
        } else if (routeName === 'Profile') {
          iconName = focused ? require('./images/profile.png') : require('./images/profile.png');
        } else if (routeName === 'Notification') {
          iconName = focused ? require('./images/notification.png') : require('./images/notification.png');
        }
        const majorVersionIOS = parseInt(Platform.Version, 10);
      //  alert(majorVersionIOS)
        if (Platform.OS === 'android') {
          return <Image source={iconName} style={{ alignSelf: 'center', height: 20, width: 20 }} resizeMode='contain' />;
        } else {
          if (majorVersionIOS >= 11) {
            return <Image source={iconName} style={{ alignSelf: 'center', height: 20, width: 20, marginTop: -25 }} resizeMode='contain' />;
          } else {
            return <Image source={iconName} style={{ alignSelf: 'center', height: 20, width: 20 }} resizeMode='contain' />;
          }
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        // return <Image source={iconName} style={{ alignSelf: 'center', height: 20, width: 20, marginTop: -25 }} resizeMode='contain' />;
        // return <Image source={iconName} style={{ alignSelf: 'center', height: 20, width: 20 }} resizeMode='contain' />;
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
    tabBarOptions: {
      activeTintColor: '#C3363F',
      inactiveTintColor: 'gray',
      tabBarLabel: "",
      style: {
        backgroundColor: '#fff',
        // paddingTop: 4,
        // elevation: 4,
        //top:2,
        height: 55,
      }
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);



export default tabnav;