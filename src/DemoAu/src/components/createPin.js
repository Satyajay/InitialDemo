import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Modal, Animated, ActivityIndicator, AsyncStorage, KeyboardAvoidingView
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

export default class CreatePin extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });


  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      codesent: false,
      textLabel: "ENTER PIN",
      bodyLabel: "Please create a PIN. It is used while sending transaction from one wallet to another wallet.",
      confPin: "CONFIRM PIN",
      resendMessage1: "If you don't see the email, check other places like you junk,spam,social or other folders in your email client.",

      resetButton: "Reset Password ",
      resendMailButton: "Resend",
      line1: '#D9DADC',
      mailColor: mailinActive,
      leftText: "Having Trouble? ",
      centerText: 'Please Contact Us ',
      animating: false,
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      val6: '',
      val7: '',
      val8: '',
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

  resetPass() {
    this.props.navigation.navigate('ChangePassword');
  }

  verfyDevice() {
    // const { val1, val2, val3, val4, val5, val6, val7, val8 } = this.state;
    // console.log(val1, val2, val3, val4, val5, val6, val7, val8);
    // if (val1 == '' || val1 == null || val2 == '' || val2 == null || val3 == '' || val3 == null || val4 == '' || val4 == null) {
    //   this.callToast('Please enter PIN', 'error');
    // } else if ((val5 == '' || val5 == null || val6 == '' || val6 == null || val7 == '' || val7 == null || val8 == '' || val8 == null)) {
    //   this.callToast('Please enter confirm PIN', 'error');
    // } else if ((val1 + val2 + val3 + val4) != (val5 + val6 + val7 + val8)) {
    //   this.callToast('Enter PIN and Confirm PIN does not match', 'error');
    // } else {
    that.props.navigation.navigate('Tab')


    // AsyncStorage.getItem('auth_key').then((Auth_key) => {
    //   this.setState({ Auth_key: Auth_key });
    //   var data = {
    //     user_id: Auth_key,
    //     secure_pin: val1 + val2 + val3 + val4,
    //   };
    //   console.log(data)
    //   this.setState({ animating: true });
    //   Apis.postAPI('wssetuppin', data).then(response => {
    //     console.log(JSON.stringifyresponse)
    //     if (response.status == 1 || response.status == "1") {
    //       console.log("response-----" + JSON.stringify(response));
    //       this.callToast(response.message, 'success');
    //       that = this;
    //       setTimeout(function () {
    //         that.props.navigation.navigate('Tab')
    //       }, 500);
    //       this.setState({ animating: false });
    //       this.refs.tf4.blur();
    //     } else {
    //       this.setState({ animating: false });
    //       this.callToast(response.message, 'error')
    //     }
    //   })
    // });
    // }
  }


  contactLink() {
    alert('Contact Us')
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

  next1(tf, value) {
    if (tf == 5 && value.length == 1) {
      this.refs.tf6.focus()
    }
    if (tf == 6 && value.length == 1) {
      this.refs.tf7.focus()
    }

    if (tf == 7 && value.length == 1) {
      this.refs.tf8.focus()
    }
    if (tf == 8 && value.length == 0) {
      this.refs.tf7.focus()
    }

    if (tf == 7 && value.length == 0) {
      this.refs.tf6.focus()
    }
    if (tf == 6 && value.length == 0) {
      this.refs.tf5.focus()
    }
    if (tf == 5 && value.length == 0) {
      this.refs.tf4.focus()
    }
  }

  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })

    return (
      <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Create PIN' />
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
          <Text style={styles.textTitle}> {this.state.textLabel} </Text>
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
          </View>
          <Text style={styles.textTitle2}> {this.state.confPin} </Text>
          <View style={styles.textBox}>
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next1(5, value)}
              onChangeText={value => this.setState({ val5: value })}
              underlineColorAndroid="transparent"
              ref="tf5"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next1(6, value)}
              onChangeText={value => this.setState({ val6: value })}
              ref="tf6"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next1(7, value)}
              onChangeText={value => this.setState({ val7: value })}
              ref="tf7"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.boxView}
              maxLength={1}
              onChangeText={value => this.next1(8, value)}
              onChangeText={value => this.setState({ val8: value })}
              ref="tf8"
              underlineColorAndroid="transparent"
            />
          </View>
          <Button onPress={() => this.verfyDevice()} title='SUBMIT' />
          <View style={{ height: 50, width: 200 }}>
          </View>
        </ScrollView>
        <Animated.View style={{ transform: [{ translateY: animation }], height: 67, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            {this.state.message}
          </Text>
        </Animated.View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  textTitle: {
    marginTop: scaleHeight(20),
    textAlign: 'center',
    fontSize: normalizeFont(22),
    color: 'black'
  },
  textTitle2: {
    marginTop: scaleHeight(20),
    textAlign: 'center',
    fontSize: normalizeFont(22),
    color: 'black'
  },
  bodyTitle: {
    marginTop: scaleHeight(30),
    textAlign: 'center',
    fontSize: 15,
    color: '#878788',
    marginLeft: scaleWidth(40),
    marginRight: scaleWidth(40)
  },
  textBox: {
    height: scaleHeight(70),
    marginTop: scaleHeight(25),
    width: scaleWidth(230),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxView: {
    width: scaleWidth(50), height: scaleHeight(50), borderColor: '#E6E7E9', borderRadius: scaleHeight(3), borderWidth: scaleWidth(2), backgroundColor: '#FFFFFF', textAlign: 'center', fontSize: normalizeFont(18), fontWeight: 'bold',
  },
  termsView: { top: scaleHeight(20), height: scaleHeight(20), flexDirection: 'row', justifyContent: 'center', marginTop: scaleHeight(20) },
  baseText: { marginLeft: scaleWidth(7), color: '#000', fontSize: normalizeFont(16) },
  titleText: { color: colors.buttonBg },
})
