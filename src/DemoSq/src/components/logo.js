import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import css from './styles';
const mark = require("../images/logo.png");// IVA logo
class Logo extends Component {
    render() {
        return (
          <View style={css.markWrap}>
          <Image source={mark} style={css.mark} />
        </View>
       );
     }
}

export default Logo;