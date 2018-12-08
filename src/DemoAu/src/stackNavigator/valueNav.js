import React from 'react';
import { StackNavigator } from 'react-navigation';
import Value from '../components/value';


const ValueStack = StackNavigator({

  Value: {
    screen: Value,
  },
},
  {
    gestureEnabled: false,
    initialRouteName: 'Value'
  }

);

export default ValueStack;