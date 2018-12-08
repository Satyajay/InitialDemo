import React, { Component } from 'react';
import {
  SwitchIOS,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';
const deviceScreen = require('Dimensions').get('window')
const { width, height } = Dimensions.get('window');
import css from './styles';
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
        <View style={{height:'100%', width:'100%', flex:1,flexDirection: 'row'}}>
      <View style={css.controlPanel}>
        <ImageBackground source={background} style={css.background} resizeMode="cover">
            <ScrollView style={[css.sideMenu, this.props.style || {}]}>
                    <View>
                    {this._renderHeader()}
                      <View style={css.line}></View>
                    <TouchableOpacity style={css.menu} onPress={() => {
                                                   this.onProfile()
                                                }}>
                        <Image source={profile} style={css.leftIcon}/>
                        <Text style={css.menuText} type='h5White'>My Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.menu}    onPress={() => {
                                                   this.openSettings()
                                                }}>
                      <Image source={settings} style={css.leftIcon}/>
                       
                        <Text style={css.menuText} type='h5White'>Configure/Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.menu}>
                      <Image source={help} style={css.leftIcon}/>
                        <Text style={css.menuText} type='h5White'>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.menu}>
                      <Image source={ivalogo} style={css.iva}/>
                        
                        <Text style={css.menuText} type='h5White'>IVA Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.menu}  onPress={() => {
                                                   this.openAbout()
                                                }}>
                      <Image source={termslogo} style={css.terms}/>
                        
                        <Text style={css.menuText} type='h5White'>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>
                <View style={css.fixedFooter}>
              <Text style={css.accountText}>Copyright 2018 .dotSolved {"\n"} All rights reserved.</Text>
            </View>
         <View style={css.tempView}></View>
        </ScrollView>
    </ImageBackground>
      </View>
      <TouchableOpacity activeOpacity={0.4}style={{flex:1, width:width-300}} onPress={() => this.props.closeDrawer()}>
      <View style={{flex:1,backgroundColor:"rgba(0,0,0,0.4)"}}>
        </View>
       </TouchableOpacity>
      </View>
    )
  }

  _renderHeader() {
        return (
            <View style={css.Sideheader}>
                <View style={css.userInfosHolder}>
                    <Image style={css.avatar} source={mark} />
                    <View style={css.userInfos}>
                        <Text type='h1White' style={css.username}>Steven Gibbens</Text>
                        <Text type='h5White' style={css.email}>steve.Gibbens@acme.com</Text>
                    </View>

                </View>
            </View>
        )
    }
}

