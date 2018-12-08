import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import css from './styles';
const headerBg = require("../images/headerImg.png");
const backIcon = require("../images/backIcon.png");
class Header extends Component {
    render() {
        return (
        <ImageBackground source={headerBg} style={css.gredient}>
            {Platform.OS === 'ios' ? <View style={css.statusBar}></View> : null}
            <View style={css.menuContainer}>
                <TouchableOpacity onPress={() => this.props.onPress()}  >
                    <View style={css.backBtnView}>
                        <Image source={backIcon} style={css.backBtn} />
                    </View>
                </TouchableOpacity>
                    <View style={css.textContainer}>
                        <Text style={css.headerText}>{this.props.HeaderText}</Text>
                    </View>
            </View>
          </ImageBackground>
       );
     }
}

export default Header;