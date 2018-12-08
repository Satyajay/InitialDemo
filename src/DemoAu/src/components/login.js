import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, TouchableHighlight, Alert,
  ImageBackground, Animated, Modal, ActivityIndicator, AsyncStorage,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Button from '../common/buttons';
import colors from '../common/colors';
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
const passinActive = require("../img/password.png");
const passActive = require("../img/password-hover.png");
const loginLogo = require("../img/login_bg.png");
const aussieLogo = require('../img/logo.png');
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const Apis = require('../utils/Api');

export default class Landing extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  });


  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      mintLabel: "Landing Page",
      leftText: "Forgot Password ? ",
      centerText: 'Click Here ',
      line1: '#D9DADC',
      line2: '#D9DADC',
      titleText: "WELCOME",
      bodyText: "Hello there,\nmake it simple.",
      mailColor: mailinActive,
      passColor: passinActive,
      email: null,
      isVisible: true,
      modalShown: false,
      modalVisible: false,
      animating: false,
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

  onPassBlur() {
    this.setState({
      passColor: passinActive,
      line2: "#D9DADC"
    })
  }

  onPassFocus() {
    this.setState({
      passColor: passActive,
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

  setModalVisible() {
    this.setState({ modalVisible: true });
  }

  loginAction() {
    const { email, password } = this.state;
    if (email == '' || email == null) {
      this.callToast('Please enter email id', 'error')
    }
    // else if (!email.match(emailRegex)) {
    //   this.callToast('Please enter valid email id', 'error')
    // } 
    else if (password == '' || password == null) {
      this.callToast('Please enter password', 'error')
    } else if (password.length < 6) {
      this.callToast('Password should be atleast 6 charecters', 'error')
    } else {
      var data = {
        email: this.state.email,
        password: this.state.password,
      };
      console.log(data)
      this.setState({ animating: true });
      Apis.postAPI('wslogin', data).then(response => {
        console.log("response-----" + JSON.stringify(response));
        if (response.status == 1 || response.status == "1") {
          this.setState({ animating: false });
          AsyncStorage.setItem('auth_key', JSON.stringify(response.user_details.user_id));
          this.callToast('You have logged in successfully', 'success')
          that = this;
          setTimeout(function () {
            that.props.navigation.navigate('DevAuth');
          }, 500);
        } else {
          this.setState({ animating: false });
          this.callToast(response.message, 'error')
        }
      })
    }
  }

  register() {
    this.props.navigation.navigate('ResetPassowrd');
  }

  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })

    return (
      <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          <Modal
            transparent={true}
            onRequestClose={() => null}
            visible={this.state.animating}>
            <View style={css.transaparentView}>
              <ActivityIndicator size="large" color={colors.bdMainRed} />
            </View>
          </Modal>
          <ImageBackground style={styles.wlcmStyle} source={loginLogo}>
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
          <Text style={styles.paratext}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum times daily stands. </Text>
          <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: 2, marginLeft: scaleWidth(30), marginRight: scaleWidth(30), backgroundColor: 'transparent' }]}>
            <Image source={this.state.mailColor} resizeMode='cover' style={css.mailIcon} />
            <TextInput
              style={css.input}
              auto-correction={false}
              placeholder="Enter Email Id"
              onBlur={() => this.onmailBlur()}
              onFocus={() => this.onmailFocus()}
              keyboardType={'email-address'}
              returnKeyType='next'
              onSubmitEditing={() => this.pass.focus()}
              onChangeText={value => this.setState({ email: value })}
              underlineColorAndroid="transparent"
            />
          </View>
          {/* <View style={ css.blueline}/> */}
          <View style={[css.bottomView, { borderBottomColor: this.state.line2, borderBottomWidth: 2, marginLeft: scaleHeight(30), marginRight: scaleWidth(30), }]}>
            <Image source={this.state.passColor} style={css.passIcon} />
            <TextInput
              style={css.input}
              placeholder="Enter Password"
              onBlur={() => this.onPassBlur()}
              onFocus={() => this.onPassFocus()}
              returnKeyType='done'
              onChangeText={value => this.setState({ password: value })}
              underlineColorAndroid="transparent"
              ref={(pass) => this.pass = pass}
              secureTextEntry={this.state.isVisible}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginAction()}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableOpacity>
          {/* <Button onPress={() => this.loginAction()} title='LOG IN' /> */}
          <View style={styles.termsView}>
            <TouchableOpacity onPress={() => this.register()}>
              <Text style={styles.baseText}>
                <Text>
                  {this.state.leftText}
                </Text>
                <Text style={styles.titleText}>
                  {this.state.centerText}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: scaleHeight(50), width: scaleWidth(200) }}>
          </View>
        </ScrollView>
        <Animated.View style={{ transform: [{ translateY: animation }], height: scaleHeight(67), backgroundColor: this.state.toastColor, position: 'absolute', left: scaleWidth(0), top: scaleHeight(0), right: scaleWidth(0), justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: normalizeFont(16), textAlign: 'center' }}>
            {this.state.message}
          </Text>
        </Animated.View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.transaparentView}>
            <View style={styles.centerView}>
              <ImageBackground resizeMode='cover' style={{ marginTop: scaleHeight(10), height: scaleHeight(90), width: scaleWidth(90), borderRadius: scaleWidth(0) }} source={aussieLogo}></ImageBackground>
              <Text style={styles.topText}>Verify email</Text>
              <Text style={styles.desc}>We have sent a reset code {'\n'} to your email.</Text>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
    marginTop: scaleHeight(20),
    marginLeft: scaleWidth(30),
    marginRight: scaleWidth(30),
    fontSize: normalizeFont(14)
  },
  loginBtn: {
    width: '82%',
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
  loginText: {
    color: colors.buttonText,
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(14),
  },
  termsView: { top: scaleHeight(8), height: scaleHeight(20), flexDirection: 'row', justifyContent: 'center', marginTop: scaleHeight(8) },
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
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  centerView: { height: scaleHeight(200), width: scaleWidth(300), borderRadius: scaleHeight(20), backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

  topText: { top: scaleHeight(10), textAlign: 'center', fontSize: normalizeFont(16), fontWeight: '700', color: '#000' },

  desc: { marginTop: scaleHeight(20), textAlign: 'center', fontSize: normalizeFont(14), color: '#000', opacity: 0.7, fontWeight: '400', marginBottom: scaleHeight(20) },
})
