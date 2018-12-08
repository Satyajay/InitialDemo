import React, { Component } from 'react';
import {
  SwitchIOS,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
const deviceScreen = require('Dimensions').get('window')
import styles2 from './styles';
import Button from './Button';
const background = require("../images/login1_bg.png");
const mark = require("../images/profilepic.png");
const profile = require("../images/profile.png");
const settings = require("../images/settings.png");
const help = require("../images/help.png");
const ivalogo = require("../images/ivalogo.png");
const termslogo = require("../images/terms.png");


export default class ControlPanel extends Component {
     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

    
     onProfile = () => {
      this.props.closeDrawer();
      this.props.openProfile();

    }
     openSettings = () => {
      this.props.closeDrawer();
      this.props.openSettings();

    }
     openAbout = () => {
      this.props.closeDrawer();
      this.props.openAbout();
    }
    

    


  render() {
    return (
        <TouchableOpacity style={{height:'100%', width:'100%', flex:1, backgroundColor:"rgba(0,0,0,0)"}}  onPress={() => this.props.closeDrawer()}>
      <View style={styles2.controlPanel}>
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
            <ScrollView style={[styles2.sideMenu, this.props.style || {}]}>
                    <View>
                    {this._renderHeader()}
                      <View style={styles.line}></View>
                    <TouchableOpacity style={styles.menu} onPress={() => {
                                                   this.onProfile()
                                                }}>
                        <Image source={profile} style={styles.leftIcon}/>
                        <Text style={styles.menuText} type='h5White'>My Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}    onPress={() => {
                                                   this.openSettings()
                                                }}>
                      <Image source={settings} style={styles.leftIcon}/>
                       
                        <Text style={styles.menuText} type='h5White'>Configure/Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}>
                      <Image source={help} style={styles.leftIcon}/>
                        <Text style={styles.menuText} type='h5White'>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}>
                      <Image source={ivalogo} style={styles.iva}/>
                        
                        <Text style={styles.menuText} type='h5White'>IVA Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}  onPress={() => {
                                                   this.openAbout()
                                                }}>
                      <Image source={termslogo} style={styles.terms}/>
                        
                        <Text style={styles.menuText} type='h5White'>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>



                <View style={styles.fixedFooter}>
              <Text style={styles.accountText}>Copyright 2018 .dotSolved {"\n"} All rights reserved.</Text>
            </View>
         <View style={styles.tempView}></View>
        </ScrollView>
    </ImageBackground>
      </View>
      </TouchableOpacity>
    )
  }

  _renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.userInfosHolder}>
                    <Image style={styles.avatar} source={mark} />
                    <View style={styles.userInfos}>
                        <Text type='h1White' style={styles.username}>Steven Gibbens</Text>
                        <Text type='h5White' style={styles.email}>steve.Gibbens@acme.com</Text>
                    </View>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        //width: SideMenuWidth,
        flex:1
        //backgroundColor: 'red'
    },
    leftIcon:{
      height:20,
      width:20,
      marginLeft:-5,
    },

      tempView:{
          height:50,
          },
    iva:{
     height:12,
     width:25,
     marginLeft:-5,
    },
    terms:{
        height:25,
        width:20,
        marginLeft:-5,
    },


  fixedFooter: {
  //  position: 'absolute',
    width:'100%',
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  accountText: {
    color: "#fff",
    textAlign:'center',
    fontSize:13,
    fontFamily:'Montserrat-Regular',
   // backgroundColor:'white'
  },
    sideMenuTitle: {
        marginLeft: 10,
        marginBottom: 25
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        //backgroundColor:'red'
    },
    line:{
       height:2,
       width:'100%',
       backgroundColor:'cyan',
       opacity:0.3
    },
    menuText: {
        marginLeft: 10,
        fontSize:15,
        fontFamily:'Montserrat-Regular',
        color:'#fff'
    },
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
     //   width: SideMenuWidth,
        backgroundColor: 'transparent'
    },
    header: {
        marginLeft:10,
        marginTop: 30,
        marginBottom: 30
    },
    userInfosHolder: {
        //left:0,
        marginLeft:0,
        flexDirection: 'row',
       // justifyContent: 'space-between'
    },
    avatar: {
        left:10,
        width: 60,
        height: 60,
        borderRadius: 30
    },
    userInfos: {
        height: 50,
        marginLeft:25,
        //justifyContent: 'left'
    },
    username: {
        top:7,
        fontSize:17,
        fontFamily:'Montserrat-Regular',
        color:'#fff'
        //fontWeight: '700'
    },
    email:{
       top:17,
       color:'#fff',
       fontFamily:'Montserrat-Regular',
       fontSize:13
    }
})
