import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import css from './styles';
class subHeader extends Component {
    render() {
        return (
          <View style={css.signupHeaderWrapper}>
              <Text style={css.signupLbl}>{this.props.subHeader}</Text>
          </View>
       );
     }
}

export default subHeader;