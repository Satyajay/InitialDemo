import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, TouchableHighlight, Alert, ImageBackground, AsyncStorage, Modal, Animated, ActivityIndicator
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Button from '../common/buttons';
import colors from '../common/colors';
const aussieLogo = require('../img/logo.png');
const landingbg = require('../img/landing_bg.png')
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
import css from '../common/styles';
const Apis = require('../utils/Api');


import Tabs from './topTab';
export default class Wallet extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  });


  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      mintLabel: "Landing Page",
      leftText: "Not Registered ? ",
      centerText: 'Sign Up ',
      ethValue:"",
      rightText: 'Here Via Website',
      titleText: "Wallet",
      bodyText: "Digital money\nfor a digital age.",
      tableData: [
        ['1', 'qwertyuiopwert', '0.5', 'Completed'],
        ['2', 'qwertyuiopwert', '0.5', 'Completed'],
        ['3', 'qwertyuiopwert', '0.5', 'Completed'],
        ['4', 'qwertyuiopwert', '0.5', 'Completed'],
        ['5', 'qwertyuiopwert', '0.5', 'Completed'],
        ['6', 'qwertyuiopwert', '0.5', 'Completed'],
        ['7', 'qwertyuiopwert', '0.5', 'Completed'],
        ['8', 'qwertyuiopwert', '0.5', 'Completed'],
        ['9', 'qwertyuiopwert', '0.5', 'Completed'],
        ['10', 'qwertyuiopwert', '0.5', 'Completed'],
      ],
      tableHead: ['S.No.', 'Address', 'Coins', 'Status'],
      widthArr: [40, 150, 60, 100],
      animating: false,
      modalShown: false,
      TransList: []
    };
  }
  callToast(message, type) {
    if (this.state.modalShown) return
    this.setToastType(message, type)
    this.setState({ modalShown: true })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }

  closeToast() {
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 350
        }).start()
    }, 2000)
  }

  callXToast() {
    Animated.timing(
      this.animatedXValue,
      {
        toValue: 0,
        duration: 350
      }).start(this.closeXToast())
  }

  closeXToast() {
    setTimeout(() => {
      Animated.timing(
        this.animatedXValue,
        {
          toValue: -windowWidth,
          duration: 350
        }).start()
    }, 2000)
  }

  setToastType(message = 'Success!', type = 'success') {
    let color
    if (type == 'error') color = '#cc0000'
    if (type == 'success') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = '#4FB449'
    this.setState({ toastColor: color, message: message })
  }

  sendWallet() {
    this.props.navigation.navigate('WalletSend', {
      user_wallet: this.state.user_wallet_id
    });
  }

  receiveWallet() {
    this.props.navigation.navigate('WalletReceive');
  }

  componentDidMount() {
    this.getProfile();
    this.transHistory();
  }

  getProfile() {
    AsyncStorage.getItem('auth_key').then((Auth_key) => {
      this.setState({ Auth_key: Auth_key });
      var profileInfo = {
        user_id: Auth_key,
      };
      console.log(profileInfo)
      //this.setState({ animating: true });
      Apis.postAPI('wsgetprofile', profileInfo).then(response => {
        if (response.status == 1 || response.status == "1") {
          console.log(response);
          //this.setState({ animating: false });
          this.setState({
            ethValue:100,
            user_wallet_id: response.details.wallet_id
          });
        } else {
          //this.setState({ animating: false });
          console.log(response.message);
        }
      })
    });
  }

  transHistory() {
    this.setState({ TransList: [] });
    AsyncStorage.getItem('auth_key').then((Auth_key) => {
      this.setState({ Auth_key: Auth_key });
      var profileInfo = {
        user_id: Auth_key,
      };
      console.log(profileInfo)
      this.setState({ animating: true });
      Apis.postAPI('wstransactions', profileInfo).then(response => {
        if (response.status == 1 || response.status == "1") {
          console.log(response);
          this.setState({ animating: false });
          this.setState({
            TransList: response.transactions
            // Trans_Address: response.transactions.txn_id,
            // Trans_Amount: response.transactions.amount,
            // Trans_Status: response.transactions.status,
            // Trans_Status_txt: response.transactions.status_text
          });
          console.log(this.state.TransList.txn_id)
          console.log(this.state.TransList.amount)
          console.log(this.state.TransList.status)
          console.log(this.state.TransList.status_text)
        } else {
          this.setState({ animating: false });
          console.log(response.message);
        }
      })
    });
  }


  render() {
    const state = this.state;
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.animating}>
          <View style={css.transaparentView}>
            <ActivityIndicator size="large" color={colors.bdMainRed} />
          </View>
        </Modal>
        <ImageBackground style={styles.wlcmStyle} source={landingbg}>
          <Text style={styles.landingText}>
            {this.state.titleText}
          </Text>
          <Text style={[styles.landingText, { marginTop: scaleHeight(20), fontSize: normalizeFont(19) }]}>
          {this.state.ethValue} ETH
        
        </Text>
          <Text style={[styles.landingText, { marginTop: scaleHeight(10), fontSize: normalizeFont(16), fontWeight: '500' }]}>
            AUD coin : 0 AUD
        </Text>
          <Text style={[styles.landingText, { marginTop: scaleHeight(5), fontSize: normalizeFont(16), fontWeight: '500' }]}>
            DIGI coin : 0 DIGI
        </Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.yesBtn} onPress={() => this.sendWallet()}>
              <Text style={styles.yesText}>SEND</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noBtn} onPress={() => this.receiveWallet()}>
              <Text style={styles.noText}>RECEIVE</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>

        <View style={[styles.termsView]}>
          <Text style={{ color: '#000', fontSize: normalizeFont(17), fontWeight: '400', alignSelf: 'center' }}>
            TRANSACTIONS
                    </Text>
        </View>

        <View style={{ marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(0), height: scaleHeight(300), backgroundColor: '#fff' }}>
          <Tabs>
            {/* First tab */}
            <ScrollView title="AUD" showsVerticalScrollIndicator={false} style={{ bottom: scaleHeight(0), width: '100%' }}>
              <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text1} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                  {
                    this.state.tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#FFFFFF' }]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </ScrollView>
            {/* Second tab */}
            <ScrollView title="DIGI" showsVerticalScrollIndicator={false} style={{ bottom: scaleHeight(0), width: '100%' }}>
              <View style={{ flex: 1, backgroundColor: 'green' }}></View>
            </ScrollView>
          </Tabs>
        </View>
        <Animated.View style={{ transform: [{ translateY: animation }], height: 67, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            {this.state.message}
          </Text>
        </Animated.View>
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
    height: scaleHeight(230),
    width: '100%',
    alignItems: 'center'
  },
  mintStyle: {
    justifyContent: "center", alignItems: "center", height: scaleHeight(60), width: (width - 30), backgroundColor: "#2F5B94", marginTop: scaleHeight(30), borderRadius: 5
  },

  termsView: { height: scaleHeight(50), flexDirection: 'row', justifyContent: 'center', marginTop: scaleHeight(0) },
  baseText: { marginLeft: scaleWidth(7), color: '#000', fontSize: normalizeFont(13) },
  titleText: { color: colors.buttonBg },

  landingText: {
    marginTop: scaleHeight(25),
    color: '#FFFFFF',
    fontSize: normalizeFont(20),
    fontWeight: 'bold'
  },

  buttonContainer: {
    backgroundColor: '#24BDFD',
    borderRadius: scaleHeight(10),
    padding: scaleHeight(10),
    shadowColor: '#24BDFD',
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 5,
    shadowOpacity: 0.8
  },
  btnWrapper: { position: 'absolute', left: scaleWidth(0), right: scaleWidth(0), bottom: scaleHeight(20), height: scaleHeight(35), flexDirection: 'row', justifyContent: 'space-around' },

  yesBtn: {
    height: scaleHeight(35), width: scaleWidth(100),
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: scaleHeight(18),

  },

  yesText: { textAlign: 'center', fontSize: normalizeFont(14), fontWeight: '500', color: '#FFFFFF' },

  noBtn: {
    height: scaleHeight(35),
    width: scaleWidth(100),
    backgroundColor: '#061DC1',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: scaleHeight(18),

  },

  noText: { textAlign: 'center', fontSize: normalizeFont(14), fontWeight: '500', color: '#FFFFFF' },
  mintWrap: {
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(100),
    height: scaleHeight(520),
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
  tableWrap: { marginLeft: scaleWidth(15), marginRight: scaleWidth(15), marginTop: scaleHeight(30) },
  header: { height: scaleHeight(40), backgroundColor: '#F5F6F8' },
  text: { textAlign: 'center', fontSize: normalizeFont(13), opacity: 0.8 },
  text1: { textAlign: 'center', fontWeight: 'bold', color: '#4E4E4E' },
  dataWrapper: { marginTop: scaleHeight(-1) },
  row: { height: scaleHeight(25), backgroundColor: '#FFFFFF' }

})
