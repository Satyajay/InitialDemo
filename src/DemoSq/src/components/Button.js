import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import css from './styles';
export default class Button extends Component {
  render() {
    return(
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={() => {
          this.props.onPress();
        }}>
        <Text style={css.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )    
  }
}
