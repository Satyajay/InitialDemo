import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("./login1_bg.png");
const mark = require("./logo.png");
const groupImg = require("./Group.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          
        <Image source={background} style={styles.background} resizeMode="cover">
             <View style={styles.forgotPasswordWrapper}>
              <Text style={styles.forgetLbl}>FORGET PASSWORD</Text>
            </View>
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>

            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>We need your registered email address {"\n"} to send your password reset instructions. </Text>
            </View>
          
            <View style={styles.inputWrap}>
              <TextInput 
                placeholder="Email ID" 
                placeholderTextColor="#FFF"
                style={styles.input} 
              />
            </View>
           
           
            <TouchableOpacity activeOpacity={.5}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>RESET PASSWORD</Text>
              </View>
            </TouchableOpacity>




            <TouchableOpacity activeOpacity={.5}>
              <View style={styles.signupbuttonView}>
                <Text style={styles.signupButton}>BACK TO LOGIN</Text>
              </View>
            </TouchableOpacity>

          
          <View style={styles.container}>
            
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    marginTop:-55,
    width:'40%',
    marginLeft:'30%',
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },

  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    marginTop:40,
    width:'80%',
    marginLeft:'10%',
    height: 40,
    borderBottomWidth: 1,
    // fontSize:12,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
  },
  button: {
    paddingVertical: 20,
    width:'80%',
    marginLeft:'10%',
    borderWidth: 0.5,
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor:'#fff'
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
   
  },

   signupButton: {
    color: "#fff",
    fontWeight:'bold',
    backgroundColor:'transparent',
    fontSize: 14,
   
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
    marginTop:-100,
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
    textAlign:'left',
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


module.exports = LoginScreen
