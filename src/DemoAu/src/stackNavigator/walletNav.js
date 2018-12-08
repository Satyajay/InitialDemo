import React from 'react';
import { StackNavigator } from 'react-navigation';
import Wallet from '../components/wallet';
import WalletReceive from '../components/wallet-receive';
import WalletAddress from '../components/wallet-address';
import WalletSend from '../components/wallet-send';
import ResetPin from '../components/resetPin';

const WalletStack = StackNavigator({

  Wallet: {
    screen: Wallet,
    navigationOptions: ({ navigation }) => ({
      title: "Wallet",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })

  },

  WalletReceive: {
    screen: WalletReceive,
    navigationOptions: ({ navigation }) => ({
      title: "Receive",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  WalletAddress: {
    screen: WalletAddress,
    navigationOptions: ({ navigation }) => ({
      title: "Receive",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  WalletSend: {
    screen: WalletSend,
    navigationOptions: ({ navigation }) => ({
      title: "Receive",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  ResetPin: {
    screen: ResetPin,
    navigationOptions: ({ navigation }) => ({
      title: "Receive",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
},

  {

    gestureEnabled: false,
    initialRouteName: 'Wallet'
  }

);

export default WalletStack;