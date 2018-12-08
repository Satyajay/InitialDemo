import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import css from '../common/styles';
class Smallbutton extends Component {
    render() {
        return (
          <TouchableOpacity activeOpacity={.5} style={css.smallbutton} onPress={() => this.props.onPress()}>
        
            <Text style={css.buttonText}>{this.props.title}</Text>
   
        </TouchableOpacity>
       );
     }
}

export default Smallbutton;