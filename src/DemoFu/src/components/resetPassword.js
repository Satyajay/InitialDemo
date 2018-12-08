import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity,Animated, Platform, ScrollView, FlatList, KeyboardAvoidingView,Modal
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

    const { email, password } = this.state;
    console.log(email +"");
    if(email==''||email==null){
        this.callToast('Please enter email','error')
    }else if(!email.match(emailRegex)){
        this.callToast('Please enter valid email id','error')
    }else{
       //alert("Success");

       let forgotData = {
        'email': email,
       };

       this.setState({animating: true});
    APIs.forgotPwd(forgotData).then(data => {
          console.log(data);
          if(data.status == '1'||data.status==1){
             //alert(data.message);
            this.setState({animating: false});
           this.setModalVisible();
           let that=this;
            setTimeout(function(){
            that.setState({modalVisible: false});
            that.props.navigation.goBack();
             },10000);
            
          }else{
             this.callToast(data.message,'error')
            console.log(data.message);
            this.setState({animating: false});
          }
      });

    }
   
  }

    render() {

    let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })

        return (
            <View style={css.container}>
                <View style={{height:30, width:'100%', marginTop:30}}>
                    <TouchableOpacity style={{height:30, width:60}} onPress={() => this.props.navigation.goBack()}>
                    <Icon style={{marginTop:0,marginLeft:15}} name="md-close" size={30} color='#000'/>
                    </TouchableOpacity>
                </View>
                <Modal
                    transparent={true}
                    onRequestClose={() => null} 
                    visible={this.state.animating}>
                      <View style={css.transaparentView}>
                    <ActivityIndicatorExample
                      animating = {this.state.animating}/>
                  </View>
                </Modal>
                <View style={styles.headerView}>
                <Text style={styles.headerLbl}>FORGOT PASSWORD ?</Text>
                <View style={{height:1.5, width:35,marginLeft:10, backgroundColor:colors.buttonBg}}></View>
                </View>
                <View style={{marginTop:5,flex:1, width:'84%'}}>
                <Text style={styles.topLbl}>Don't worry just enter your registered email id and we will send you further instructions.</Text>
                <View style={[css.topView,styles.tfView]}>
                  <Image source={this.state.mailColor} style={css.mailIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Email Id"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        keyboardType={'email-address'}
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
           
            <Button  title='Submit' onPress={() => this._onSubmit()} /> 
            </View>
              <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
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
                <View style={{marginTop:30,height:60, width:60, borderRadius:30, backgroundColor:'green'}}></View>
                <Text style={styles.topText}>Thank You!</Text>
                <Text style={styles.desc}>We have sent a reset password link {'\n'} to your email.</Text>
              </View>
          </View>
          </Modal>

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

        
