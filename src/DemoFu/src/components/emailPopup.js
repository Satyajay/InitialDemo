import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,AsyncStorage,
    TextInput, TouchableOpacity,Animated, Platform, ScrollView, FlatList, KeyboardAvoidingView,Modal,BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import css from '../common/styles';
import Button from '../common/buttons'
import colors from '../common/colors'
const mailActive = require("../images/mail_selected.png");
const mailinActive = require("../images/mail_unselected.png");
const APIs = require( '../utils/Api');

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height


export default class ResetPassword extends Component {

    static navigationOptions = ({ navigation }) => ({
       header:null
    });


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
             mailColor: mailinActive,
             email:null,
             modalShown: false,
             modalVisible: false,
             animating: false,
            // toastColor: 'green',
            // message: 'Success!'

        };
    }


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

  setModalVisible() {
    this.setState({modalVisible: true});
   
  }

    callToast(message, type) {
    if(this.state.modalShown) return
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

  setToastType(message='Success!', type='success') {
    let color
    if (type == 'error') color = colors.buttonBg
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
   // if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }
        onmailFocus() {
            this.setState({
                mailColor: mailActive
            })
        }

        onmailBlur() {
            this.setState({
            mailColor: mailinActive
            })
        }
   _onSubmit() {
     this.refs.email.blur();
       const {state} = this.props.navigation;
 console.log("+++++++++++++++++++++"+JSON.stringify(state.params.data));
 
    const { email, password } = this.state;
    console.log(email +"");
    if(email==''||email==null){
        this.callToast('Please enter email','error')
    }else if(!email.match(emailRegex)){
        this.callToast('Please enter valid email id','error')
    }else{
      const {state} = this.props.navigation;
      console.log("+++++++++++++++++++++"+JSON.stringify(state.params.instaData));
      var data = {
        email: email,
        social_type: state.params.data.social_type,
        social_id: state.params.data.social_id,
        device_token: '23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
        device_type: 'ios',
        full_name: state.params.data.full_name,
        profile_pic: state.params.data.profile_pic,
      };
      console.log(JSON.stringify(data))
      this.setState({ animating: true });
      APIs.signUp2(data, 'social_login.json').then(response => {
        if (response.status == 1 || response.status == "1") {
          console.log("response-----" + JSON.stringify(response));
          AsyncStorage.setItem('auth_key', response.user_details.auth_key);
         AsyncStorage.setItem('emailId', response.user_details.email);
         AsyncStorage.setItem('user_id', response.user_details.user_id);
          this.props.navigation.navigate('Tab')
          this.setState({ animating: false });
        } else {
          this.setState({ animating: false });
          this.callToast(response.message, 'error')
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
            <View style={[css.container,{backgroundColor:"rgba(0,0,0,0.7)", justifyContent:"center", flexDirection:'column'}]}>
                <Modal
                    transparent={true}
                    onRequestClose={() => null} 
                    visible={this.state.animating}>
                      <View style={css.transaparentView}>
                    <ActivityIndicatorExample
                      animating = {this.state.animating}/>
                  </View>
                </Modal>
                
              <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
          </Text>
        </Animated.View>

              <View style={styles.centerView}>
               <View style={styles.headerView}>
                <Text style={styles.headerLbl}>ENTER EMAIL</Text>
                <View style={{height:1.5, width:35,marginLeft:10, backgroundColor:colors.buttonBg}}></View>
                </View>
                <View style={{marginTop:5,flex:1, width:'84%'}}>
                {/*<Text style={styles.topLbl}>Don't worry just enter your registered email id and we will send you further instructions.</Text>*/}
                <View style={[css.topView,styles.tfView]}>
                  <Image source={this.state.mailColor} style={css.mailIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Email Id"
                        ref="email"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        keyboardType={'email-address'}
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
           
            <Button  title='Submit' onPress={() => this._onSubmit()} /> 
            </View>
              </View>
          </View>
         
        )
    }

}

const styles = StyleSheet.create({

   headerLbl:{ fontSize:16, fontWeight:'700',color:'#000'},

   topLbl:{ marginTop:10, color:'#000',fontSize:13 },

   tfView:{ marginTop:20 },

    headerView:{ top:10, height:30,width:'84%'},

    title:{marginLeft:15,color:colors.grayColor, alignSelf:'center', fontSize:15, fontWeight:'500',opacity:0.8},

     transaparentView:{flex:1, backgroundColor:"rgba(0,0,0,0.7)", alignItems:'center', flexDirection:'row', justifyContent:'center'},

    centerView: {height:200, width:300, borderRadius:5, backgroundColor:'#fff', alignSelf:'center',alignItems:'center'},

    topText:{top:20, textAlign:'center', fontSize:18, fontWeight:'700', color:'#000'},

    desc:{marginTop:35, textAlign:'center', fontSize:15, color:'#000', opacity:0.7,fontWeight:'400'},


        })

        
