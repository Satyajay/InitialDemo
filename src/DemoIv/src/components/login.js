import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput,Button, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
//import Orientation from 'react-native-orientation';

import css from './styles';// Styling page
const mark = require("../images/logo.png");// IVA logo
const groupImg = require("../images/Group.png"); //Play image


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });

  //   componentDidMount() {
  //   Orientation.unlockAllOrientations();
  // }


    render() {


        return (
           <LinearGradient colors={['#6079ea', '#28cfdd']} style={css.background}>
             <ScrollView style={css.container}>
            <View>
         <View style={css.signupHeaderWrapper}>
              <Text style={css.signupLbl}>LOGIN</Text>
            </View>
           
           <View style={css.markWrap}>
            <Image source={mark} style={css.mark} />
          </View>
       
          <View style={css.Loginwrapper}>
              <TextField
                  label='Username/Email ID'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'
                  containerStyle={styles.Tfwrapper}
                  style={{fontFamily:'Montserrat-Regular'}}
                  labelTextStyle={titleFontSize= 16}
                />
             <TextField
                  label='Password'
                  textColor='#fff'
                  tintColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  baseColor='#fff'
                  containerStyle={styles.Tfwrapper}
                 secureTextEntry 
                />
            <TouchableOpacity activeOpacity={.8}  onPress={() => this.props.navigation.navigate('ResetPassowrd')}>
              <View >
                <Text style={css.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Home')}>
              <View style={css.button}>
                <Text style={css.LoginbuttonText}>LOGIN</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('SignUp')}>
              <View style={css.signupbuttonView}>
                <Text style={css.otherButton}>SIGN UP FOR AN ACCOUNT</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={.5}>
              <View style={css.playButton}>
                 <Image source={groupImg} style={styles.mark2} resizeMode="contain" />
              </View>
            </TouchableOpacity>


       
          </View>
          <View style={css.container}>
            <View style={css.checkoutWrap}>
              <Text style={css.checkoutText}>Check out how IVA {"\n"} can help you & your business</Text>

              <TouchableOpacity activeOpacity={.5}>
              </TouchableOpacity>
            </View>
          </View>
     
      </View>
         <View style={css.tempView}></View>
         
       </ScrollView >
      </LinearGradient>
        )
    }

}

const styles = StyleSheet.create({
   mark2: {
    width:50,
    height: 50,
  },
  
 
  Tfwrapper:{
    top:-20,
    height:40,
    marginVertical: 10,
    width:'80%',
    marginLeft :'10%',
    
  },
 
});