import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import css from './styles';
class ActiveButton extends Component {
    render() {
        return (
          <TouchableOpacity activeOpacity={.5} onPress={() => this.props.onPress()}>
          <View style={css.signupbuttonView}>
            <Text style={css.otherButton}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
       );
     }
}

export default ActiveButton;