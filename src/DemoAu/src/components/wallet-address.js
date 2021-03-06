import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Button
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button1 from '../common/buttons';
import Header from "../common/Header";
import colors from '../common/colors';
const qrImg = require('../img/qr_code.jpg');

export default class WalletAddress extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,

  });


  constructor(props) {
    super(props);
    this.state = {
      bodyLabel: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been Lorem Ipsum.",
      recTitle: "Your Public Wallet Address",
      line1: '#D9DADC',
      mailColor: mailinActive,
      addressCode: '1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck1KFzzGtDdnq5hrwxXGjwVnKzR'

    };
  }

  receiveWallet() {
    this.props.navigation.navigate('WalletReceive')
  }

  copyLink() {
    alert('link Copy')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Receive' />

        <View style={styles.walletWrap}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
            <Text style={styles.walletTitle}>
              {this.state.recTitle}
            </Text>
            <View style={styles.qrArea}>
              <Text style={styles.textDecor}>{this.state.addressCode}</Text>
            </View>
            <TouchableOpacity onPress={() => this.copyLink()}>
              <Text style={styles.copyBox}>COPY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanBtn} onPress={() => this.receiveWallet()}>
              <Text style={styles.scanText}>SCAN WALLET</Text>
            </TouchableOpacity>
            <Text style={styles.bodyTitle}> {this.state.bodyLabel} </Text>
          </ScrollView>
        </View>

        {/* <View style={{ height: 50, width: 200}}>
               </View> */}

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  walletWrap: {
    marginLeft: scaleWidth(20),
    marginRight: scaleWidth(20),
    borderRadius: scaleHeight(10),
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(25),
    borderColor: 'red',
    height: "80%",
    elevation: 3,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#A9A9A9',
    backgroundColor: '#FFFFFF',

  },
  walletTitle: {
    marginLeft: scaleWidth(30),
    marginRight: scaleWidth(30),
    marginTop: scaleHeight(30),
    color: '#4850C4',
    fontSize: normalizeFont(18),
    textAlign: 'center',
  },
  qrArea: {
    marginLeft: scaleWidth(20),
    marginRight: scaleWidth(20),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(25),
    borderRadius: scaleHeight(1),
    borderWidth: scaleWidth(1.5),
    borderColor: '#d6d7da',
    borderStyle: 'dashed',
  },
  textDecor: {
    marginLeft: scaleWidth(20),
    marginRight: scaleWidth(20),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
    textAlign: 'justify',
    fontSize: normalizeFont(12)
  },
  scanBtn: {
    width: '65%',
    alignSelf: 'center',
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(20),
    backgroundColor: colors.buttonBg,
    shadowColor: '#24BDFD',
    elevation: 2,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 5,
    shadowOpacity: 0.8
  },
  scanText: {
    color: colors.buttonText,
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(14),
  },
  bodyTitle: {
    marginTop: scaleHeight(24),
    textAlign: 'justify',
    fontSize: normalizeFont(14),
    color: '#878788',
    marginLeft: scaleWidth(30),
    marginRight: scaleWidth(30),
    marginBottom: scaleHeight(30),
  },
  qrImag: {
    width: scaleWidth(160),
    height: scaleHeight(160),
    alignSelf: 'center',
    marginTop: scaleHeight(20),
  },
  copyBox: {
    textAlign: 'right',
    marginTop: scaleHeight(0),
    color: '#04188B',
    marginRight: scaleWidth(20),
  },
})
