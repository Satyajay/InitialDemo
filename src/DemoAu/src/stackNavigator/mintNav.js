import React from 'react';
import { StackNavigator } from 'react-navigation';
import Minor from "../components/minor";
import Mint from "../components/mint";
import MintHistory from '../components/minthistory';

const MintStack = StackNavigator({

  Mint: {
    screen: Mint,
    navigationOptions: ({ navigation }) => ({
      title: "Mint",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },

    })
  },

  Minor: {
    screen: Minor,
    navigationOptions: ({ navigation }) => ({
      title: "Signup",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  MintHistory: {
    screen: MintHistory,
    navigationOptions: ({ navigation }) => ({
      title: "Signup",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  // Description: {
  //   screen: Description,
  //   navigationOptions: ({ navigation }) => ({
  //     title: "Signup",
  //     headerTitleStyle: { color: "black", alignSelf: "center" },
  //     headerStyle: {
  //       backgroundColor: "white"
  //     },
  //   })
  // },

},

  

  {
    headerMode: '',
    gestureEnabled: false,
    initialRouteName: 'Mint'
  }

);





export default MintStack;