import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, TouchableHighlight, Alert, ImageBackground, Button
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Button1 from '../common/buttons';
import colors from '../common/colors';
const aussieLogo = require('../img/logo.png');
const minorImg = require('../img/minor_bg.png');
import Header from "../common/Header";
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const quImg = require('../img/miner-info.png');
import css from '../common/styles';

export default class Minor extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  });


  constructor(props) {
    super(props);
    this.state = {
      mintLabel: "Minor",
      leftText: "Forgot Password ? ",
      centerText: 'Click Here ',
      line1: '#D9DADC',
      line2: '#D9DADC',
      titleText: "WELCOME",
      bodyText: "Hello there,\nmake it simple.",
      quMark: quImg
    };
  }

  stopMining() {
    alert('Stop Mining')
  }
  earnCoins() {
    alert('Earn Coins')
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={minorImg}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Minor' />
        <View style={styles.textView}>
          <View style={styles.LeftContent}>
            <Text style={styles.textDecor}>Miner Status</Text>
            <Image source={this.state.quMark} style={styles.quIcon} />
          </View>
          <View style={styles.RightContent}>
            <Text style={styles.textDecor1}>Active</Text>
          </View>
        </View>
        <View style={[styles.textView, { marginTop: scaleHeight(0) }]}>
          <View style={styles.LeftContent}>
            <Text style={styles.textDecor}>Pending Balance</Text>
            <Image source={this.state.quMark} style={styles.quIcon} />
          </View>
          <View style={styles.RightContent}>
            <Text style={styles.textDecor1}>0 ETH</Text>
          </View>
        </View>
        <View style={[styles.textView, { marginTop: scaleHeight(0) }]}>
          <View style={styles.LeftContent}>
            <Text style={styles.textDecor}>Active Miners</Text>
            <Image source={this.state.quMark} style={styles.quIcon} />
          </View>
          <View style={styles.RightContent}>
            <Text style={styles.textDecor1}>1345.636</Text>
          </View>
        </View>
        <Button1 onPress={() => this.stopMining()} title='STOP MINING' />
        <TouchableOpacity style={styles.scanBtn} onPress={() => this.earnCoins()}>
          <Text style={styles.scanText}>EARN FREE COINS</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F6F8',
  },
  scanBtn: {
    width: '60%',
    alignSelf: 'center',
    height: scaleHeight(40),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '80%',
    marginTop: scaleHeight(15),
    backgroundColor: 'transparent',
    shadowOpacity: 0.8
  },
  scanText: {
    color: '#1B95CF',
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(12),
    fontWeight: 'bold'
  },
  textView: {
    flexDirection: 'row',
    height: scaleHeight(20),
    marginLeft: scaleWidth(10),
    marginRight: scaleWidth(10),
    marginTop: scaleHeight(270),
  },
  LeftContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '50%'
  },
  RightContent: {
    width: '50%'
  },
  textDecor: {
    color: '#FFF',
    textAlign: 'left',
    fontSize: normalizeFont(12),
  },
  textDecor1: {
    color: '#FFF',
    textAlign: 'right',
    fontSize: normalizeFont(12),
  },
  IconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  quIcon: {
    marginLeft: scaleWidth(5),
    height: scaleHeight(14),
    width: scaleWidth(14),
  }
})
