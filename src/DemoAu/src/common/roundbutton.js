import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import css from '../common/styles';
class Roundbutton extends Component {
    render() {
        return (
          <TouchableOpacity activeOpacity={.5} style={css.roundbutton} onPress={() => this.props.onPress()}>
        
            <Text style={[css.buttonText,{color:'#6FC0E7'}]}>{this.props.title}</Text>
   
        </TouchableOpacity>
       );
     }
}

export default Roundbutton;