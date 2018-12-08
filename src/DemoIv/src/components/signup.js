import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
//import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import MultiSelect from 'react-multiselect-dropdown'
import css from './styles';// Styling page
import LinearGradient from 'react-native-linear-gradient';
const mark = require("../images/logo.png");
const groupImg = require("../images/Group.png");
const lockIcon = require("../images/login1_lock.png");
const personIcon = require("../images/login1_person.png");
let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];
let dataSource = [
  {id: 1, name: 'Item1'},
  {
    id: 2, 
    name: 'Item2',
    children:[
      {id: 2.1, name: 'Item2.1'},
      {id: 2.2, name: 'Item2.2'}
    ]
  }
]
 
let dataSourceConfig = {
  label: 'id', 
  text: 'name'
}
export default class Signup extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });


    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
             <LinearGradient colors={['#6079ea', '#28cfdd']} style={css.background}>
            <ScrollView >
           <View style={css.signupHeaderWrapper}>
              <Text style={css.signupLbl}>CREATE ACCOUNT</Text>
            </View>
           
           <View style={css.markWrap}>
            <Image source={mark} style={css.mark} />
          </View>


          <View style={styles.wrapper}>

             <TextField
                  label='Name'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={titleFontSize= 16}
                />



            <TextField
                  label='Email Address'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={titleFontSize= 16}
                />


            <TextField
                  label='Password'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={titleFontSize= 16}
                  secureTextEntry
                />

                <TextField
                  label='Contact Number'
                  textColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  tintColor='#fff'
                   style={{fontFamily:'Montserrat-Regular'}}
                  baseColor='#fff'
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={titleFontSize= 16}
                />

 
             <TextField
                  label='Organization'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={titleFontSize= 16}
                />

              <TextField
                  label='URL'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={titleFontSize= 16}
                />
               {/*<MultiSelect
              dataSource={dataSource}
              dataSourceConfig={dataSourceConfig}
              initValue={[1,2]}
              //onChange={this.onChange}
            />*/}

            <Dropdown  textColor='#ffffff'  baseColor="#ffffff"  pickerStyle={styles.pickerStyle} containerStyle={styles.ddView} data={data} value="Salesforce"/>
          
            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Home')}>
              <View style={css.button}>
                <Text style={css.otherButton}>CREATE ACCOUNT</Text>
              </View>
            </TouchableOpacity>




            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.goBack()}>
              <View style={css.signupbuttonView}>
                <Text style={styles.signupButton}>ALREADY A MEMBER? SIGN IN</Text>
              </View>
            </TouchableOpacity>
           <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Copyright 2018 .dotSolved {"\n"} All rights reserved.</Text>
            </View>
            <View style={styles.tempView}></View>
          </View>
          
           </ScrollView>
       </LinearGradient>
     
   
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%'
  },
 
  tempView:{
  height:50,
  },
   Tfwrapper:{
    top:-20,
    height:40,
    marginVertical: 10,
    width:'80%',
    marginLeft :'10%',
    
  },
  pickerStyle:{
    backgroundColor:"#607EE7"
  },
  ddView: {
   top:-15,
   width:'80%',
   marginLeft:'10%',
   height: 64,
    borderBottomWidth: 1,
   borderBottomColor: "transparent"
  
  },
 
  background: {
   height:'100%',
   width:'100%',
   backgroundColor:'transparent'
  },
  wrapper: {
    marginTop:0,
    paddingVertical: 5,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    width:'80%',
    marginLeft:'10%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
   signupHeaderWrapper: {
    top:25,
    width:'80%',
    marginLeft:'10%',
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
signupLbl:{
 color: "#fff",
 fontSize:17,
 fontFamily:'Montserrat-Regular',
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
    borderWidth:1,
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
  //  borderWidth: 1,
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
    fontFamily:'Montserrat-Regular',
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
    marginTop:40,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#fff",
    fontFamily:'Montserrat-Regular',
    textAlign:'center',
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
    fontFamily:'Montserrat-Regular',
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
