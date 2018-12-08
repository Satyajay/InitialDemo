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
import Button from '../common/buttons';
import css from '../common/styles';
import colors from '../resources/styles/colors';
const logoImg = require('../images/slogo1.png');
const mailImg = require('../images/username.png');
const password = require('../images/password.png');
const fbIcon = require('../images/fb.png');
const gIcon = require('../images/google.png');



const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex = /^[a-zA-Z ]+$/;
export default class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });



  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-width)
    this.state = {
      email:"9795555651",//null,
      password: "12345678",//null,  
      isVisible: true,
      userId: null,
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
    const { email, password } = this.state;
    if (email == '' || email == null) {
      this.callToast('Please enter mobile no.', 'error')
    } else if (password == '' || password == null) {
      this.callToast('Please enter password', 'error')
      // alert("Please enter password.");
    } else if (password.length < 6) {
      // alert("Password should be atleast 6 charecters.");
      this.callToast('Password should be atleast 6 charecters', 'error')

    } else {
      this.setState({ animating: true });
      var data = {
        mobileNo: this.state.email,
        password: this.state.password,
      };
      Apis.signUp(data, "user/login").then(response => {
        console.log("----------" + JSON.stringify(response))
        if (response.status == "success") {
          this.refs.email.blur();
          this.refs.pass.blur();
          this.refs.email.clear();
          this.refs.pass.clear();
          AsyncStorage.setItem('user_id', response.data._id);
          this.props.navigation.navigate('Tab')
          this.setState({ animating: false, });
        } else {

          this.setState({ animating: false });
          this.callToast(response.error.message, 'error')


        }

      })


    }
  }
  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })
    return (
      <KeyboardAvoidingView style={css.container} keyboardShouldPersistTaps="never" behavior="padding" enabled>
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
          <Text style={css.screenName}>Login</Text>
          <View style={css.Loginwrapper}>
            <View style={css.Tfwrapper}>
              <View style={css.topView}>
                <Image style={css.leftIcon} source={mailImg} resizeMode='contain' />
                <TextInput
                  style={[css.input, { width: width - 80 }]}
                  auto-correction={false}
                  placeholder="Phone No."
                  maxLength={10}
                  placeholderTextColor={colors.txtWhite}
                  keyboardType={'phone-pad'}
                  returnKeyType='next'
                  ref="email"
                  onSubmitEditing={() => this.refs.pass.focus()}
                  onChangeText={value => this.setState({ email: value })}
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
                  returnKeyType='done'
                  secureTextEntry={true}
                  placeholderTextColor={colors.txtWhite}
                  ref="pass"
                  onChangeText={value => this.setState({ password: value })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={css.bottomLine}></View>
            </View>
            <View style={css.forgotView}>
              <TouchableOpacity style={{ width: 200, alignSelf: 'flex-end' }} activeOpacity={.8}>
                <Text style={css.forgotPasswordText}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <Button onPress={() => this._onLogin()} title='Login' />
            <Text style={styles.loginText}>Login With</Text>
            <View style={css.socialView}>
              <TouchableOpacity style={css.socialBtn}>
                <Image style={{ height: 25, width: 25 }} source={fbIcon} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity style={[css.socialBtn, { marginLeft: 20 }]}>
                <Image style={{ height: 25, width: 25 }} source={gIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.loginText, { marginTop: 8 }]}>Not a member?</Text>
            <View style={{ marginTop: -12 }}>
              <Button onPress={() => this.props.navigation.navigate('SignUp')} title='Sign Up' />
            </View>
          </View>

          {/* <View style={css.tempView}></View> */}
        </ScrollView>



      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  mark2: {
    width: 50,
    height: 50,
  },
  loginText: { marginTop: 20, alignSelf: 'center', fontSize: 14, fontWeight: '400', color: colors.txtWhite },

  Tfwrapper: {
    top: -20,
    height: 40,
    marginVertical: 10,
    width: '80%',
    marginLeft: '10%',

  },

});


// 5b7804998dbcef6addf30f08