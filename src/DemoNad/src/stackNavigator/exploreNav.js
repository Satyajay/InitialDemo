import React from 'react';
import { StackNavigator } from 'react-navigation';
import Viewall from "../components/viewall";
import Explore from "../components/explore";
import Description from "../components/description"

const ExploreNav = StackNavigator({

  Explore: {
    screen: Explore,
    // navigationOptions: ({ navigation }) => ({
    //   title: "Explore",
    //   headerTitleStyle: { color: "black", alignSelf: "center" },
    //   headerStyle: {
    //     backgroundColor: "white"
    //   },

    // })
  },

  Viewall: {
    screen: Viewall,
    // navigationOptions: ({ navigation }) => ({
    //   title: "Signup",
    //   headerTitleStyle: { color: "black", alignSelf: "center" },
    //   headerStyle: {
    //     backgroundColor: "white"
    //   },
    // })
  },
  Description: {
    screen: Description,
    // navigationOptions: ({ navigation }) => ({
    //   title: "Signup",
    //   headerTitleStyle: { color: "black", alignSelf: "center" },
    //   headerStyle: {
    //     backgroundColor: "white"
    //   },
    // })
  },

},

  

  {
    headerMode: '',
    gestureEnabled: false,
    initialRouteName: 'Explore'
  }

);





export default ExploreNav;