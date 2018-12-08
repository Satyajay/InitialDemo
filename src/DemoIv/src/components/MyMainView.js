'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View,Dimensions, Platform,TouchableOpacity,Text,Image,ImageBackground, ScrollView
} from 'react-native'

import Container                            from './container'
const MenuIcon = require("../images/menu.png");
const headerBg = require("../images/headerImg.png");
const background = require("../images/Home.png");
const mark = require("../images/logo.png");
const groupImg = require("../images/Group.png");
const dynamicCrm = require("../images/circle1.png");
const salesforce = require("../images/circle2.png");
const window = Dimensions.get('window');
//import styles from './styles';
//import Button from './Button';
//module.exports = DemoScreen
export default class DemoScreen extends Component {
  setParentState(args){
    this.props.setParentState(args)
  }

  render(){
    return (
    <View style={[ styles.container, this.props.style || {} ]}>
                { this.renderNavBar() }
                { this.renderHeader() }
      </View>


    )
    
  }

   onPressMenu = () => {
        this.props.navigation.navigate('DrawerOpen')
    }

    onPressBack = () => {
        this.props.navigation.goBack()
    }

    click = () =>{
      this.props.openChat();
    }

    renderNavBar() {
        return (
        <ImageBackground style={ styles.headerBg } source={headerBg}>
            <View style={ styles.navBar }>
                <TouchableOpacity  onPress={this.props.openDrawer} style={styles.menuWrap}>
                 <Image source={MenuIcon} style={styles.menuIcon}/>
                </TouchableOpacity>
               <View style={styles.markWrap}>
                <Image source={mark} style={styles.mark} />
               </View>
            </View>


          </ImageBackground>
        )
    }

    renderHeader() {
        return (
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollWrap}>
        <TouchableOpacity activeOpacity={.5}>
        <Image source={dynamicCrm} style={styles.topCircle}/>
        </TouchableOpacity>
         <TouchableOpacity activeOpacity={.5}   onPress={() => {
            this.props.openChat();
          }}>
        <Image source={salesforce} style={styles.bottomCircle}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.5} >
        <Image source={dynamicCrm} style={styles.topCircle2}/>
        </TouchableOpacity>
        <Image source={salesforce} style={styles.bottomCircle}/>
        <View style={styles.tempView}>
            </View>
        </ScrollView>
       </ImageBackground>
        )
    }
}



const styText = { color: 'transparent' }
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
        flex:1
    },

   scrollWrap:{
     flex:1,
     width:250,
   },

    menuWrap:{
     top:20,
     width:'10%',
     marginLeft:0
    },
     markWrap: {
        top:17,
        width: '40%',
        marginLeft:'20%',
        height:40,
        alignItems:'center',
       // backgroundColor:'red'
      },
      mark: {
         width: 75,
         height: 24,
      },


    menuIcon:{
      height:20,
      width:25,
      left:-5,
    },
    headerBg:{
      top:0,
      height:64,
      width:'100%'
    },
    navBar: {
        height: 64,
      //  justifyContent: 'center',
        paddingHorizontal: 25,
         flexDirection: "row",
    },
    headerHolder: {
        padding: 25,
        flex: 1
    },
    logo: {
        ...styText,
        marginTop: 10
    },
    siteName: {
        marginTop: 30,
        width: 250
    },
    btnHeader: {
        width: 160,
        height: 40,
        marginVertical: 70,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'transparent'
    },
    btnHeaderTitleStyle: {
        fontSize: 14,
        fontWeight: '700'
    },
    topCircle:{
     marginTop:100,
     left: 3,
     height:150,
     width:150,

  },
  tempView:{
    height:100
  },

  bottomCircle:{
     marginTop:25,
     left: 97,
     height:150,
     width:150,

  },
  topCircle2:{
     marginTop:20,
     left:3,
     height:150,
     width:150,

  },

  background: {
    width:'100%',
    height:'100%',
    alignItems:'center',
    flex:1,
    //justifyContent: 'center',
    //flexDirection: "row",
  },

})



// Shadow props are not supported in React-Native Android apps.
// The below part handles this issue.

// iOS Styles
var iosStyles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.75,
  }
});

const iosMinTrTintColor = '#1073ff';
const iosMaxTrTintColor = '#b7b7b7';
const iosThumbTintColor = '#343434';

// Android styles
const androidStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 4 / 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  }
});

const androidMinTrTintColor = '#26A69A';
const androidMaxTrTintColor = '#d3d3d3';
const androidThumbTintColor = '#009688';


const sliderStyles = (Platform.OS === 'ios') ? iosStyles : androidStyles;
const minimumTrackTintColor = (Platform.OS === 'ios') ? iosMinTrTintColor : androidMinTrTintColor;
const maximumTrackTintColor = (Platform.OS === 'ios') ? iosMaxTrTintColor : androidMaxTrTintColor;
const thumbTintColor = (Platform.OS === 'ios') ? iosThumbTintColor : androidThumbTintColor;
module.exports = DemoScreen