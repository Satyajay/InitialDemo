import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, TouchableHighlight, Alert, ImageBackground, Linking
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Button from '../common/buttons';
import colors from '../common/colors';
const aussieLogo = require('../img/logo.png');
const landingbg = require('../img/landing_bg.png')

export default class Landing extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      mintLabel: "Landing Page",
      leftText: "Not Registered ? ",
      centerText: 'Sign Up ',
      rightText: 'Here Via Website',
      titleText: "WELCOME",
      bodyText: "Digital money\nfor a digital age."
    };
  }

  loginAction() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.wlcmStyle} source={landingbg}>
          <Image
            style={{ width: scaleWidth(120), height: scaleHeight(120), alignSelf: 'center', marginTop: scaleHeight(30) }}
            source={aussieLogo}
          />
          <Text style={styles.landingText} onPress={this.onPressTitle}>
            {this.state.titleText}
          </Text>
          <View style={{ height: scaleHeight(1.5), width: scaleWidth(25), marginLeft: scaleWidth(105), backgroundColor: '#565CAE', marginTop: scaleHeight(0) }}></View>
          <Text style={styles.bodyTextArea} numberOfLines={4}>
            {this.state.bodyText}
          </Text>
        </ImageBackground>
        <Text style={styles.paratext}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. </Text>
        <Button onPress={() => this.loginAction()} title='LOG IN' />
        {/* <View style={styles.container}>

        <View elevation={5} style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Shadow Applied</Text>
        </View>
      </View> */}
        <View style={[styles.termsView]}>
          <TouchableOpacity onPress={() => Linking.openURL('https://aussiedigital.io/')}>
            <Text style={styles.baseText}>
              <Text>
                {this.state.leftText}
              </Text>
              <Text style={styles.titleText}>
                {this.state.centerText}
              </Text>
              <Text>
                {this.state.rightText}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  wlcmStyle: {
    height: scaleHeight(320),
    width: '100%'
  },
  mintStyle: {
    justifyContent: "center", alignItems: "center", height: scaleHeight(60), width: (width - scaleWidth(25)), backgroundColor: "#2F5B94", marginTop: scaleHeight(30), borderRadius: 5
  },
  paratext: {
    justifyContent: "center",
    marginTop: scaleHeight(40),
    marginLeft: scaleWidth(30),
    marginRight: scaleWidth(30),
    fontSize: normalizeFont(14)
  },
  termsView: { top: 20, height: scaleHeight(20), flexDirection: 'row', justifyContent: 'center', marginTop: scaleHeight(18) },
  baseText: { marginLeft: scaleWidth(7), color: '#000', fontSize: normalizeFont(14) },
  titleText: { color: colors.buttonBg },
  landingText: {
    marginLeft: scaleWidth(30),
    marginTop: scaleHeight(30),
    color: '#FFFFFF',
    fontSize: normalizeFont(22),
    fontWeight: 'bold'
  },
  bodyTextArea: {
    marginLeft: scaleWidth(30),
    color: '#A2A3C7',
    fontSize: normalizeFont(22),
    marginTop: scaleHeight(27),
  },
  textStyle: {
    color: '#FFFFFF'
  },
})
