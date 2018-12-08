import React from 'react';
import { StackNavigator } from 'react-navigation';
import More from '../components/more';
import ReferProgram from '../components/refer-program';
import ChangePassword from '../components/changePassword';
import TermsCondition from '../components/terms-conditions';
import WorkProcess from '../components/work-process';
import YourDetails from '../components/your-details';
import ContactTab from '../components/contact-tab';

const MoreStack = StackNavigator({

  More: {
    screen: More,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })

  },
  ReferProgram: {
    screen: ReferProgram,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  TermsCondition: {
    screen: TermsCondition,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  WorkProcess: {
    screen: WorkProcess,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  YourDetails: {
    screen: YourDetails,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
  ContactTab: {
    screen: ContactTab,
    navigationOptions: ({ navigation }) => ({
      title: "More",
      headerTitleStyle: { color: "black", alignSelf: "center" },
      headerStyle: {
        backgroundColor: "white"
      },
    })
  },
},
  {

    gestureEnabled: false,
    initialRouteName: 'More'
  }

);

export default MoreStack;