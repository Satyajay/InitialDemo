import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Modal, ActivityIndicator, Animated, AsyncStorage
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton';
import Header from "../common/Header";
import { Dropdown } from 'react-native-material-dropdown';
const passActive = require("../img/password-hover.png");
import colors from '../common/colors';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const radioDisable = require('../img/radio-inactive.png');
const radioEnable = require('../img/radio-active.png');
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const Apis = require('../utils/Api');

export default class WalletSend extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,

  });


  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      codesent: false,
      enterEmailLabel: "Wallet Send",
      bodyLabel: "Enter the wallet address you want to send to",
      line1: '#D9DADC',
      mailColor: mailinActive,
      line2: '#D9DADC',
      line3: '#D9DADC',
      radioActive: radioEnable,
      radioinActive: radioDisable,
      animating: false,
      modalShown: false,
      isVisible: true,
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
    if (type == 'error') color = 'red'
    if (type == 'success') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }

  onmailBlur() {
    this.setState({
      mailColor: mailinActive,
      line1: "#D9DADC"
    })
  }

  onmailFocus() {
    this.setState({
      mailColor: mailActive,
      line1: "#ABBBE1"
    })
  }
  newPasslBlur() {
    this.setState({
      mailColor: mailinActive,
      line2: "#D9DADC"
    })
  }

  dropBlur() {
    this.setState({
      mailColor: mailinActive,
      line3: "red"
    })
  }

  dropFocus() {
    this.setState({
      mailColor: mailActive,
      line3: "green"
    })
  }

  newPassFocus() {
    this.setState({
      mailColor: mailActive,
      line2: "#ABBBE1"
    })
  }

  passVisible() {
    if (this.state.viewColor == '#797979') {
      this.setState({
        viewColor: colors.buttonBg
      })
      this.setState({
        isVisible: false
      })
    } else {
      this.setState({
        viewColor: colors.grayColor
      })
      this.setState({
        isVisible: true
      })
    }
  }

  componentDidMount() {
    const { state } = this.props.navigation;
    this.setState({
      user_wallet_id: state.params.user_wallet,
      WalletCode: state.params.scanCode
    });
  }

  sendSubmit() {
    const { address, quantity, password } = this.state;
    if (address == '' || address == null) {
      this.callToast('Please enter wallet address', 'error')
    } else if (quantity == '' || quantity == null) {
      this.callToast('Please select quantity', 'error')
    } else if (password == '' || password == null) {
      this.callToast('Please enter your password', 'error')
    } else {
      AsyncStorage.getItem('auth_key').then((Auth_key) => {
        this.setState({ Auth_key: Auth_key });
        var transfer = {
          user_id: Auth_key,
          password: password,
          token_type: 'AUD Coins',
          user_wallet: address,
          quantity: quantity,
          from_address: this.state.user_wallet_id
        };
        console.log(transfer)
        this.setState({ animating: true });
        Apis.postAPI('wscointransfer', transfer).then(response => {
          if (response.success == 1 || response.success == "1") {
            console.log("response-----" + JSON.stringify(response));
            this.callToast('Transaction successfully created.', 'success')
            that = this;
            setTimeout(function () {
              that.props.navigation.navigate('Wallet');
            }, 1500);
            this.setState({ animating: false });
          } else {
            this.setState({ animating: false });
            this.callToast(response.message, 'error')
          }
        })
      });
    }
  }

  resetPass() {
    this.props.navigation.navigate('ChangePassword');
    this.refs.email.blur();
  }

  scanCode() {
    this.props.navigation.navigate('Scanner');
  }

  forgotPin() {
    this.props.navigation.navigate('ForgotPin')
  }
  selectDigi() {
    this.setState({
      radioActive: radioDisable,
      radioinActive: radioEnable
    });
  }

  selectAud() {
    this.setState({
      radioinActive: radioDisable,
      radioActive: radioEnable
    });

  }
  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })
    let data = [{
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }];
    var radio_props = [
      { label: 'AOD Coins', value: 0 },
      { label: 'DIGI Coins', value: 1 }
    ];
    return (
      <View style={styles.container}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Send' />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          <Modal
            transparent={true}
            onRequestClose={() => null}
            visible={this.state.animating}>
            <View style={css.transaparentView}>
              <ActivityIndicator size="large" color={colors.bdMainRed} />
            </View>
          </Modal>
          <Text style={styles.bodyTitle}> {this.state.bodyLabel} </Text>
          <View style={styles.walletWrap}>
            <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(15), marginRight: scaleWidth(15) }]}>
              <TextInput
                style={css.inputNext}
                auto-correction={false}
                placeholder="Enter Wallet Address"
                // onBlur={ () => this.onmailBlur() }
                // onFocus={ () => this.onmailFocus() }
                returnKeyType='next'
                onSubmitEditing={() => this.refs.cpass.focus()}
                onChangeText={value => this.setState({ address: value })}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.radioBox}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                <Text style={{ color: 'grey', marginLeft: scaleWidth(15), marginRight: scaleWidth(15), fontSize: normalizeFont(13), }}>Select Coins:</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: scaleWidth(15), marginRight: scaleWidth(15), }} onPress={() => this.selectAud()}>
                <Text style={{ color: 'grey', fontSize: normalizeFont(13) }}>AUD Coins</Text>
                <Image source={this.state.radioActive} style={styles.radioIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: scaleWidth(15), marginRight: scaleWidth(15), }} onPress={() => this.selectDigi()} >
                <Text style={{ color: 'grey', fontSize: normalizeFont(13) }}>DIGI Coins</Text>
                <Image source={this.state.radioinActive} style={styles.radioIcon} />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: scaleWidth(15), marginRight: scaleWidth(15), }}>
              <Dropdown
                ref="cpass"
                textColor='#B6B6B6'
                baseColor="#D9DADC"
                value='Enter Quantity'
                onChangeText={value => this.setState({ quantity: value })}
                blur={() => this.dropBlur()}
                focus={() => this.dropFocus()}
                data={data} />
            </View>
            <View style={[css.topView, { borderBottomColor: this.state.line2, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(15), marginRight: scaleWidth(15), }]}>
              <TextInput
                style={css.inputNext}
                auto-correction={false}
                placeholder="Enter Password"
                // onBlur={ () => this.newPasslBlur() }
                // onFocus={ () => this.newPassFocus() }
                returnKeyType='done'
                secureTextEntry={this.state.isVisible}
                onChangeText={value => this.setState({ password: value })}
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity onPress={() => this.forgotPin()}>
              <Text style={styles.pinBox}>Forgot PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={() => this.sendSubmit()}>
              <Text style={styles.scanText}>SUBMIT</Text>
            </TouchableOpacity>
            <Text style={styles.orStyle}>Or</Text>
            <TouchableOpacity style={styles.scanBtn} onPress={() => this.scanCode()}>
              <Text style={styles.scanText}>SCAN WALLET QR CODE</Text>
            </TouchableOpacity>
            <View style={{ height: scaleHeight(50) }}>
            </View>
          </View>
        </ScrollView>
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
  walletWrap: {
    marginLeft: scaleWidth(20),
    marginRight: scaleWidth(20),
    borderRadius: scaleHeight(10),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
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
  bodyTitle: {
    marginTop: scaleHeight(25),
    textAlign: 'center',
    fontSize: normalizeFont(15),
    color: '#5A5A5B',
    marginLeft: scaleWidth(70),
    marginRight: scaleWidth(70),
  },
  orStyle: {
    textAlign: 'center',
    marginBottom: scaleHeight(20),
    marginTop: scaleHeight(20),
    color: 'black'
  },
  scanBtn: {
    width: '75%',
    alignSelf: 'center',
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(5),
    backgroundColor: '#04188B',
    shadowColor: '#04188B',
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
  pinBox: {
    textAlign: 'right',
    marginTop: scaleHeight(10),
    color: '#04188B',
    marginRight: scaleWidth(30),
  },
  submitBtn: {
    paddingVertical: scaleHeight(20),
    width: scaleWidth(120),
    alignSelf: 'center',
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(22),
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
  radioBox: {
    flexDirection: 'row',
    marginTop: scaleHeight(30),
    justifyContent: 'center',
    marginLeft: scaleWidth(18),
    marginRight: scaleWidth(18),
  },
  radioIcon: {
    marginLeft: scaleWidth(4),
    height: scaleHeight(15),
    width: scaleWidth(15),
  }

})
