import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Animated, Modal, ActivityIndicator, AsyncStorage
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/buttons';
import Header from "../common/Header";
import colors from '../common/colors';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const Apis = require('../utils/Api');

export default class DevAuth extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,

  });


  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      codesent: false,
      textLabel: "ENTER THE CODE",
      bodyLabel: "We have sent 6-digit code to your Email Id. Please check your Email.",
      resendCodeMessage: "We've sent you an email to info@example.com.Click the link in the email to reset your password.",
      resendMessage1: "If you don't see the email, check other places like you junk,spam,social or other folders in your email client.",
      resetButton: "Reset Password ",
      resendMailButton: "Resend",
      line1: '#D9DADC',
      mailColor: mailinActive,
      leftText: "Having Trouble? ",
      centerText: 'Please Contact Us ',
      modalShown: false,
      modalVisible: false,
      animating: false,
      modalVisible: false,
    };

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
  next(tf, value) {
    if (tf == 1 && value.length == 1) {
      this.refs.tf2.focus()
    }
    if (tf == 2 && value.length == 1) {
      this.refs.tf3.focus()
    }

    if (tf == 3 && value.length == 1) {
      this.refs.tf4.focus()
    }
    if (tf == 4 && value.length == 0) {
      this.refs.tf3.focus()
    }
    if (tf == 3 && value.length == 0) {
      this.refs.tf2.focus()
    }
    if (tf == 2 && value.length == 0) {
      this.refs.tf1.focus()
    }
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


  resetPass() {
    this.props.navigation.navigate('ChangePassword');
  }

  componentDidMount() {
    this.getProfile();
    AsyncStorage.getItem('auth_key').then((Auth_key) => {
      Auth_key = Auth_key;
      if (Auth_key != null) {
        this.setState({ Auth_key: Auth_key });
        this.getProfile();
      }
    });
  }

  getProfile() {
    AsyncStorage.getItem('auth_key').then((Auth_key) => {
      this.setState({ Auth_key: Auth_key });
      var profileInfo = {
        user_id: Auth_key,
      };
      console.log(profileInfo)
      this.setState({ animating: true });
      Apis.postAPI('wsgetprofile', profileInfo).then(response => {
        if (response.status == 1 || response.status == "1") {
          console.log(response);
          this.setState({ animating: false });
          this.setState({
            user_secure_pin: response.details.secure_pin,
          });
        } else {
          this.setState({ animating: false });
          console.log(response.message);
        }
      })
    });
  }

  verfyDevice() {
    // this.setState({ animating: false });
    // const { val1, val2, val3, val4, val5, val6 } = this.state;
    // if (val1 == '' || val1 == null || val2 == '' || val2 == null || val3 == '' || val3 == null || val4 == '' || val4 == null || val5 == '' || val5 == null || val6 == '' || val6 == null) {
    //   this.callToast('Please enter code', 'error');
    // } else {

    // if (this.state.user_secure_pin == '' || this.state.user_secure_pin == null) {
    this.props.navigation.navigate('CreatePin')
    this.refs.tf6.blur();
    // } else {
    //   this.props.navigation.navigate('Tab')
    //   this.refs.tf6.blur();
    // }

    // AsyncStorage.getItem('auth_key').then((Auth_key) => {
    //   this.setState({ Auth_key: Auth_key });
    //   var data = {
    //     user_id: Auth_key,
    //     login_verification_code: val1 + val2 + val3 + val4 + val5 + val6
    //   };
    //   console.log(data)
    //   this.setState({ animating: true });
    //   Apis.postAPI('wsloginverify', data).then(response => {
    //     if (response.status == 1 || response.status == "1") {
    //       console.log("response-----" + JSON.stringify(response));
    //       this.setState({ animating: false });
    //       this.props.navigation.navigate('CreatePin')
    //       this.refs.tf6.blur();
    //     } else {
    //       this.setState({ animating: false });
    //       this.callToast(response.message, 'error')
    //     }
    //   })
    // });
    // }
  }

  contactLink() {
    this.props.navigation.navigate('Contact');
  }


  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })

    return (
      <View style={styles.container}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Device Authentication' />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          <Modal
            transparent={true}
            onRequestClose={() => null}
            visible={this.state.animating}>
            <View style={css.transaparentView}>
              <ActivityIndicator size="large" color={colors.bdMainRed} />
            </View>
          </Modal>
          <Text style={styles.textTitle}> {this.state.textLabel} </Text>
          <Text style={styles.bodyTitle}> {this.state.bodyLabel} </Text>
          <View style={styles.textBox}>
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next(1, value)}
              onChangeText={value => this.setState({ val1: value })}
              underlineColorAndroid="transparent"
              ref="tf1"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next(2, value)}
              onChangeText={value => this.setState({ val2: value })}
              ref="tf2"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next(3, value)}
              onChangeText={value => this.setState({ val3: value })}
              ref="tf3"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next(4, value)}
              onChangeText={value => this.setState({ val4: value })}
              ref="tf4"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next(5, value)}
              onChangeText={value => this.setState({ val5: value })}
              ref="tf5"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next(6, value)}
              onChangeText={value => this.setState({ val6: value })}
              ref="tf6"
              underlineColorAndroid="transparent"
            />
          </View>
          <Button onPress={() => this.verfyDevice()} title='VERIFY' />
          <View style={[styles.termsView]}>
            <TouchableOpacity onPress={() => this.contactLink()}>
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
  textTitle: {
    marginTop: scaleHeight(30),
    textAlign: 'center',
    fontSize: normalizeFont(22),
    color: 'black'
  },
  bodyTitle: {
    marginTop: scaleHeight(20),
    textAlign: 'center',
    fontSize: 15,
    color: '#878788',
    marginLeft: scaleWidth(40),
    marginRight: scaleWidth(40),
  },
  textBox: {
    height: scaleHeight(70),
    marginTop: scaleHeight(25),
    width: scaleWidth(230),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxView: {
    width: scaleWidth(50), height: scaleWidth(50), borderColor: '#E6E7E9', borderRadius: scaleHeight(3), borderWidth: scaleWidth(2), backgroundColor: '#FFFFFF', textAlign: 'center', fontSize: normalizeFont(18), fontWeight: 'bold',
  },
  termsView: { height: scaleHeight(20), width: scaleWidth(370), flexDirection: 'row', justifyContent: 'center', marginTop: scaleHeight(20) },
  baseText: { marginLeft: scaleWidth(7), color: '#000', fontSize: normalizeFont(16) },
  titleText: { color: colors.buttonBg },
})
