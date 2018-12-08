import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Orientation from 'react-native-orientation';
//const background = require("../images/login1_bg.png");
const mark = require("../images/logo.png");
const groupImg = require("../images/Group.png");
const lockIcon = require("../images/login1_lock.png");
const personIcon = require("../images/login1_person.png");
const wall = require('../images/wall.png');
const activeIndex=0;

export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });
     
     _onMomentumScrollEnd (e, state, context) {
       if(state.index){
       activeIndex=state.index;
       }
       //alert(JSON.stringify(state));
    //console.log(state, context.state)
  }

  navigateTo(){
    if(activeIndex<2){
      this.refs["swiper"].scrollBy(1)
    }else{
   this.props.navigation.navigate('Login')
    }
    
    //
  }

// componentDidMount() {
//     // this locks the view to Portrait Mode
//     Orientation.lockToPortrait();
//   }


    render() {

      

     // alert(JSON.stringify(Platform));
   const images = [
     'http://placeimg.com/640/480/any',
    'http://placeimg.com/640/480/any',
    'http://placeimg.com/640/480/any'
    ];
        return (
          <LinearGradient colors={['#6079ea', '#28cfdd']} style={styles.background}>
           {/*// <ImageBackground source={background} style={styles.background} resizeMode="cover">*/}
            <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} />
          </View>
      {/*<View style={styles.sliders}>*/}
      <Swiper  onMomentumScrollEnd ={this._onMomentumScrollEnd} loop={false} ref="swiper" style={styles.wrapper} showsButtons={false} dotStyle={styles.dot} activeDotStyle={styles.dot2}> 
        <View style={styles.slide1}>
            <Image source={wall} style={styles.img}/>            
          <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</Text>
        </View>
        <View style={styles.slide1}>
            <Image source={wall} style={styles.img}/>
           <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</Text>
      
               </View>
        <View style={styles.slide1}>
            <Image source={wall} style={styles.img}/>          
         <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</Text>
         
        </View>
      </Swiper>



<View style={styles.buttonWrapper}>
            <TouchableOpacity activeOpacity={.5} style={styles.skipBtnWraper}  onPress={() => this.props.navigation.navigate('Login')} >
              <View style={styles.skipBtn}>
                <Text style={styles.signupButton}>SKIP</Text>
              </View>
        </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} style={styles.skipBtnWraper} onPress={() => this.navigateTo()}>
              <View style={styles.button1}>
                <Text style={styles.buttonText} >   NEXT</Text>
              </View>
            </TouchableOpacity>
       </View>
       <Text style={{fontSize:12, color:'#fff', textAlign:'center', top:-30, fontFamily:'Montserrat-Regular'}}>@2017 dotsolved Inc.</Text>
      
       </LinearGradient>
        )
    }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img:{
   flex:3,//height<=568?6:5,
   width:width,
   backgroundColor:'transparent'
  },
  text: {
    top:height<=568?20:30,
    flex:1,
   // fontSize:Platform.OS=='ios'?14:12,
    lineHeight:15,
    width:'80%',
    color:'#FFF',
    textAlign:'center',
    fontSize:14,
    fontFamily:'Montserrat-Regular',
   backgroundColor:'transparent'
  },

  dot:{
    top:height<=568?-40:-50,
    zIndex:9999,
  // top:height<=568?-40:-50,
   backgroundColor:'#fff'
  },
  dot2:{
   top:height<=568?-40:-50,
   backgroundColor:'#607EE7'
  },


   wrapper: {
    // flex:1,
    top:0, 
    height:300,
    backgroundColor:'transparent'
  },
  slide1: {
    width:'100%',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

   markWrap: {
    top:0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  mark: {
    width:70,
    height: 22,
  },
  background: {
    width:'100%',
    height:200,
    flex:1
  },

  sliders:{
   height:50,
   width:'100%',
   top:0,
   flex:0.8,
   backgroundColor:'transparent'
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
  },
  button1: {
    width:'90%',
    left:'10%',
  //  borderWidth: 0.5,
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#fff'
  },

  skipBtnWraper:{
      backgroundColor:'transparent',
      width:'45%'
  },

   skipBtn: {
    width:'90%',
    left:0,
    borderWidth: 0.5,
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },

  buttonWrapper:{
    marginTop: 50,
    flex:0.3,
    width:'90%',
    marginLeft:'5%',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    //bottom:50,
    //marginTop: '80%',
   // backgroundColor:'red'
  },

  signupbuttonView: {
    paddingVertical: 0,
    width:'80%',
    marginLeft:'10%',
    borderWidth: 0.5,
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#607EE7",
    fontWeight:'bold',
    left:-5,
    backgroundColor:'transparent',
    fontSize: 14,
    fontFamily:'Montserrat-Regular',
   
  },

   signupButton: {
    color: "#fff",
    fontWeight:'bold',
    backgroundColor:'transparent',
    fontSize: 14,
    fontFamily:'Montserrat-Regular',
   
  },
  forgotPasswordText: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: '10%',
  },
  signupWrap: {
    width:'80%',
    marginLeft:'10%',
    marginTop:50,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  forgotPasswordWrapper: {
    top:25,
    width:'80%',
    marginLeft:'10%',
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#fff",
    fontSize:15,
    textAlign:'center',
    fontFamily:'Montserrat-Regular',
  },
 forgetLbl:{
 color: "#fff",
 fontSize:17,
 },

  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  },
  playButton: {
    marginTop:40,
    height:60,
    width:60,
    marginLeft:'42%',
    borderRadius: 30,
    backgroundColor:'#607EE7'
  }
});