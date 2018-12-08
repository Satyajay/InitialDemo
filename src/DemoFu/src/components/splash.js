import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,AsyncStorage,
    TextInput, TouchableOpacity,Animated,Alert, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex=/^[a-zA-Z ]+$/;
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './login.js';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import css from '../common/styles';
import Button from '../common/buttons'
import colors from '../common/colors'
const mailActive = require("../images/mail_selected.png");
const mailinActive = require("../images/mail_unselected.png");
const passActive = require("../images/password_selected.png");
const passinActive = require("../images/password_unselected.png");
export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
       header:null
    });


    constructor(props) {
        super(props);
        this.state = {
          

        };
    }
    componentWillMount () {
        var navigator = this.props.navigator;
        setTimeout (() => {
             AsyncStorage.getItem('auth_key').then((Auth_key) => {    
                //alert(Auth_key);
                if(Auth_key!=null){
                    this.props.navigation.navigate('Tab');
                }else{
                    this.props.navigation.navigate('Login')               
                }
            });

        }, 8000);     //<-- Time until it jumps to "MainView"
    }

   

    render() {

        return (
                    <Video source={require('../images/FunnyRX_Splash.mp4')}
                     style={styles.backgroundVideo}
                    muted={true}
                    resizeMode="cover"
                    repeat={false}/>    
        )
    }

}

 
const styles = StyleSheet.create({
    backgroundVideo: {
    position: 'absolute',
    height:height,
    width:width,
    flex:1,
  },
  
})
