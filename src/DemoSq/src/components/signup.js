// https://i.diawi.com/GQJnUA
import React, { Component } from 'react';
import {
  StyleSheet, Text, View,
  Dimensions, Image, Animated, Modal, AsyncStorage,
  TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, BackHandler
} from 'react-native';
import ActivityIndicator from '../common/activityIndicator'
const { width, height } = Dimensions.get('window');
const Apis = require('../utils/Api');
import Orientation from 'react-native-orientation';
import Button from '../common/buttons'
import css from '../common/styles';
import colors from '../resources/styles/colors';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex = /^[a-zA-Z ]+$/;
const logoImg = require('../images/slogo1.png');
const mailImg = require('../images/username.png');
const password = require('../images/password.png');
const fbIcon = require('../images/fb.png');
const gIcon = require('../images/google.png');
const closeIcon = require('../images/close.png');
//avs
export default class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });



  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-width)
    this.state = {
      email: null,
      password: null,
      modalVisible: false,
      cpassword: null,
      MobileNo: null,
      name: null,
      isVisible: true,
      userId: null,
      tf1: null,
      tf2: null,
      tf3: null,
      tf4: null,
      tf5: null,
      tf6: null,
      animating: false,
      modalShown: false,
      toastColor: 'green',
      message: 'Success!'

    };
  }

  componentDidMount() {
    Orientation.lockToPortrait();
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
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  }
  _onLogin() {
    const { name, email, password, cpassword } = this.state;
    if (email == '' || email == null) {
      this.callToast('Please enter phone no.', 'error')
    } else if (password == '' || password == null) {
      this.callToast('Please enter password', 'error')
      // alert("Please enter password.");
    } else if (password.length < 6) {
      // alert("Password should be atleast 6 charecters.");
      this.callToast('Password should be atleast 6 charecters', 'error')

    }
    else if (password != cpassword) {
      // alert("Password should be atleast 6 charecters.");
      this.callToast('Password does not match', 'error')

    } else {

      this.setState({ animating: true });
      var data = {
        registeredWith: 'Phone',
        username: "",
        firstName: "",
        lastName: "",
        mobileNo: this.state.email,
        password: this.state.password,
      };
      Apis.signUp(data, "user/register").then(response => {
        console.log("----------" + JSON.stringify(response))
        if (response.status == "success") {
          AsyncStorage.setItem('user_id', response.data.userId);
          this.setState({ animating: false, modalVisible: true, userId: response.data.userId });
        } else {
          this.callToast(response.error.message, 'error')
          //alert(response.error.message);
          this.setState({ animating: false });
        }

      })

    }
  }

  verifyOTP() {

    this.setState({ animating: true });
    var data = {
      userId: this.state.userId,
      otp: this.state.tf1 + this.state.tf2 + this.state.tf3 + this.state.tf4 + this.state.tf5 + this.state.tf6
    };
    console.log(JSON.stringify(data))
    Apis.signUp(data, "user/verify").then(response => {
      if (response.status == "success") {
        this.myProfile();
        this.setState({ animating: false, modalVisible: false });
      } else {
        this.callToast(response.error.message, 'error');
        this.setState({ animating: false });

      }

    })


  }

  resendOTP() {
    this.setState({ animating: true });
    var data = {
      mobileNo: this.state.MobileNo
    };
    console.log(JSON.stringify(data))
    Apis.signUp(data, "user/resend-otp").then(response => {
      if (response.status == "success") {
        this.callToast('OTP sent successfully', 'success');
        this.setState({ animating: false });
      } else {
        this.callToast(response.error.message, 'error');
        this.setState({ animating: false });

      }

    })


  }



  navgateTonext(tf, value) {
    if (value.trim().length == 1) {
      if (tf == 1) {
        this.setState({
          tf1: value
        });
        this.refs.tf2.focus()
      }
      if (tf == 2) {
        this.setState({
          tf2: value
        });
        this.refs.tf3.focus()
      }
      if (tf == 3) {
        this.setState({
          tf3: value
        });
        this.refs.tf4.focus()
      }
      if (tf == 4) {
        this.setState({
          tf4: value
        });
        this.refs.tf5.focus()
      }
      if (tf == 5) {
        this.setState({
          tf5: value
        });
        this.refs.tf6.focus()
      }
      if (tf == 6) {
        this.setState({
          tf6: value
        });
        this.refs.tf6.blur()
      }

    }


  }
  myProfile() {
    this.props.navigation.navigate('MyProfile', {
      mobile: this.state.MobileNo,
      screenType:"signup"
    });
    this.setState({
      modalVisible: false
    });
  }

  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })
    return (
      <KeyboardAvoidingView style={css.container} behavior="padding" enabled>
        <Animated.View style={{ transform: [{ translateY: animation }], height: 60, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center', zIndex: 2 }}>
          <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
            {this.state.message}
          </Text>
        </Animated.View>
        <Modal
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.animating}>
          <View style={css.transaparentView}>
            <ActivityIndicatorExample
              animating={this.state.animating} />
          </View>
        </Modal>

        <ScrollView>
          <Image style={css.logo} source={logoImg} resizeMode="contain" />
          <Text style={css.screenName}>Sign Up</Text>
          <View style={css.Loginwrapper}>

            <View style={[css.Tfwrapper, { marginTop: 30 }]}>
              <View style={css.topView}>
                <Image style={css.leftIcon} source={mailImg} resizeMode='contain' />
                <TextInput
                  style={[css.input, { width: width - 80 }]}
                  auto-correction={false}
                  placeholder="Phone No."
                  maxLength={10}
                  keyboardType={'phone-pad'}
                  returnKeyType='next'
                  placeholderTextColor={colors.txtWhite}
                  ref="email"
                  onSubmitEditing={() => this.refs.pass.focus()}
                  onChangeText={value => this.setState({ email: value, MobileNo: value })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={css.bottomLine}></View>
            </View>
            <View style={[css.Tfwrapper, { marginTop: 30 }]}>
              <View style={css.topView}>
                <Image style={css.leftIcon} source={password} resizeMode='contain' />
                <TextInput
                  style={[css.input, { width: width - 80 }]}
                  auto-correction={false}
                  placeholder="Password"
                  returnKeyType='next'
                  placeholderTextColor={colors.txtWhite}
                  ref="pass"
                  secureTextEntry={true}
                  onSubmitEditing={() => this.refs.cpass.focus()}
                  onChangeText={value => this.setState({ password: value })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={css.bottomLine}></View>
            </View>

            <View style={[css.Tfwrapper, { marginTop: 30 }]}>
              <View style={css.topView}>
                <Image style={css.leftIcon} source={password} resizeMode='contain' />
                <TextInput
                  style={[css.input, { width: width - 80 }]}
                  auto-correction={false}
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.txtWhite}
                  returnKeyType='done'
                  ref="cpass"
                  secureTextEntry={true}
                  onChangeText={value => this.setState({ cpassword: value })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={css.bottomLine}></View>
            </View>
            <View style={css.forgotView}>
            </View>
            <Button onPress={() => this._onLogin()} title='Sign Up' />
            <Text style={styles.loginText}>Sign Up With</Text>
            <View style={css.socialView}>
              <TouchableOpacity style={css.socialBtn}>
                <Image style={{ height: 25, width: 25 }} source={fbIcon} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity style={[css.socialBtn, { marginLeft: 20 }]}>
                <Image style={{ height: 25, width: 25 }} source={gIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={{ marginTop: 25, alignSelf: 'center', fontSize: 14, fontWeight: '500', color: colors.txtWhite }}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={css.tempView}></View> */}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert('Modal has been closed.');
          }}>
          <View style={styles.transaparentView}>
            <View style={styles.centerView}>
              {/* <Image style={{ marginTop: 20, height: 60, width: 60 }} source={tickImg} /> */}
              <View style={{ marginTop: 10, height: 20, marginLeft: 20, marginRight: 10, flexDirection: 'row' }}>
                <Text style={styles.topText}>Verification Code</Text>
                <TouchableOpacity style={{ height: 20, width: 30, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => this.setState({ modalVisible: false })}>
                  <Image style={{ width: 30, height: 30, alignSelf: 'center', right: 0 }} source={closeIcon} resizeMode="contain" />
                </TouchableOpacity>
              </View>
              <Text style={styles.desc}>Please enter the verification code sent to{"\n"}{this.state.email}</Text>
              <View style={styles.otpView}>
                <TextInput
                  style={styles.otpTf}
                  auto-correction={false}
                  placeholder=""
                  keyboardType="number-pad"
                  returnKeyType='next'
                  ref="tf1"
                  maxLength={1}
                  onChangeText={value => this.navgateTonext(1, value)}
                  underlineColorAndroid="transparent"
                />
                <TextInput
                  style={styles.otpTf}
                  auto-correction={false}
                  maxLength={1}
                  keyboardType="number-pad"
                  placeholder=""
                  returnKeyType='next'
                  ref="tf2"
                  onChangeText={value => this.navgateTonext(2, value)}
                  underlineColorAndroid="transparent"
                />
                <TextInput
                  style={styles.otpTf}
                  auto-correction={false}
                  keyboardType="number-pad"
                  maxLength={1}
                  placeholder=""
                  returnKeyType='next'
                  ref="tf3"
                  onChangeText={value => this.navgateTonext(3, value)}
                  underlineColorAndroid="transparent"
                />
                <TextInput
                  style={styles.otpTf}
                  auto-correction={false}
                  placeholder=""
                  maxLength={1}
                  keyboardType="number-pad"
                  returnKeyType='next'
                  ref="tf4"
                  onChangeText={value => this.navgateTonext(4, value)}
                  underlineColorAndroid="transparent"
                />
                <TextInput
                  style={styles.otpTf}
                  auto-correction={false}
                  keyboardType="number-pad"
                  placeholder=""
                  maxLength={1}
                  returnKeyType='done'
                  ref="tf5"
                  onChangeText={value => this.navgateTonext(5, value)}
                  underlineColorAndroid="transparent"
                />
                <TextInput
                  style={styles.otpTf}
                  keyboardType="number-pad"
                  auto-correction={false}
                  placeholder=""
                  keyboardType="number-pad"
                  maxLength={1}
                  returnKeyType='next'
                  ref="tf6"
                  onChangeText={value => this.navgateTonext(6, value)}
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity style={{ marginTop: 20, marginLeft: 20, height: 30 }} onPress={() => this.resendOTP()}>
                <Text style={{ textAlign: 'left', fontSize: 12, color: '#000', fontWeight: '400' }}>Resend Verification Code</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => this.verifyOTP()}>
                <Text style={[css.buttonTitle, { color: '#fff', fontSize: 14 }]}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  mark2: {
    width: 50,
    height: 50,
  },
  loginText: { marginTop: 20, alignSelf: 'center', fontSize: 14, fontWeight: '300', color: colors.txtWhite },

  Tfwrapper: {
    top: -20,
    height: 40,
    marginVertical: 10,
    width: '80%',
    marginLeft: '10%',

  },
  otpTf: { height: 40, width: 30, backgroundColor: '#f2f2f2', color: '#000', fontSize: 16, fontWeight: "600", textAlign: 'center' },
  otpView: { marginTop: 30, height: 40, marginLeft: 30, width: 220, flexDirection: 'row', justifyContent: 'space-between' },
  button: { left: 20, marginBottom: 20, width: 240, marginTop: 15, height: 35, borderRadius: 20, backgroundColor: "#4698DA", flexDirection: 'row', justifyContent: "center" },

  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  centerView: { height: 280, width: 280, backgroundColor: '#fff', alignSelf: 'center' },

  topText: { marginLeft: 0, flex: 1, textAlign: 'left', fontSize: 14, fontWeight: '500', color: '#000' },

  desc: { marginTop: 15, marginLeft: 20, width: 240, textAlign: 'center', fontSize: 12, color: '#000', fontWeight: '400' },


});