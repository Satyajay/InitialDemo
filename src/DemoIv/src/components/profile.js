import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Header from "./Header" 
import css from './styles';// Styling page
import { TextField } from 'react-native-material-textfield';
const mark = require("../images/profilepic.png");
const headerBg = require("../images/headerImg.png");
const backIcon = require("../images/backIcon.png");

export default class Settings extends Component {

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
     <View resizeMode="cover">
          <ImageBackground source={headerBg} style={{ height: Platform.OS === 'ios' ? 64 : 44, flexDirection: 'column' }}>
            {Platform.OS === 'ios' ? <View style={{ top: 0, height: 20, width: '100%' }}></View> : null}
            <View style={{ top: 0,flex:1, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}  >
                    <View style={{ width: 50, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={backIcon} style={{ height: 20, width: 11 }} />
                    </View>
                </TouchableOpacity>
                    <View style={{ justifyContent:'center', flex:1, width: width,marginRight:50, height: 44, alignItems:'center',  flexDirection:'column' }}>
                        <Text style={{alignSelf:'center',color:'#fff', fontSize:18}}>MY PROFILE</Text>
                    </View>
            </View>
        </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
             <View style={css.prowrapper}> 
                <View style={css.picWrapper}>
                   <Image style={css.profilepIc} source={mark}/>        
                </View>
                <Text style={css.buttonText}>Change profile photo</Text>   
                <TextField
                  label='Name'
                  textColor='#000'
                  tintColor='#000'
                  baseColor='#000'
                  value='Steven Gibbens'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={css.Tfwrapper}
                />

               <TextField
                  label='Email Address'
                  textColor='#000'
                  tintColor='#000'
                  baseColor='#000'
                  value='steve.gibbens@abcinc.com'
                 style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={css.Tfwrapper}
                />       

                <TextField
                  label='Contact Number'
                  textColor='#000'
                  tintColor='#000'
                  style={{fontFamily:'Montserrat-Regular'}}
                  baseColor='#000'
                  value='14088000000'
                  containerStyle={css.Tfwrapper}
                />
                 <TextField
                  label='URL'
                  textColor='#000'
                  tintColor='#000'
                  style={{fontFamily:'Montserrat-Regular'}}
                  baseColor='#000'
                  value='www.abcinc.com'
                  containerStyle={css.Tfwrapper}
                />
             </View>
             <View style={css.tempView}></View>
         
            </ScrollView>
          </View>
        )
    }

}

const styles = StyleSheet.create({
   
   
   

    
})
