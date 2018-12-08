import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,Animated,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { TextField } from 'react-native-material-textfield';
import Interactable from 'react-native-interactable'
import Drawer from 'react-native-drawer';

const Screen = Dimensions.get('window');

const background = require("../images/Home.png");
const mark = require("../images/logo.png");
const groupImg = require("../images/Group.png");
const dynamicCrm = require("../images/circle1.png");
const salesforce = require("../images/circle2.png");
import MyControlPanel from './ControlPanel';
import MyMainView from './MyMainView';

export default class Login extends Component {
 static navigationOptions = ({ navigation }) => ({
        header: null,
    });


constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:60,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: true,
      side: "left",
    };
  }

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer(){
    this.drawer.open()
  }

  openChat(){
    alert('hhh');
  }
    



 openProfile(){
    this.drawer.open()
  }
  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    var controlPanel = <MyControlPanel closeDrawer={() => {
      this.drawer.close();
    }}  openProfile={() => {
        
      this.props.navigation.navigate('profileScreen');
    }} 
    openSettings={() => {
      this.props.navigation.navigate('SettingsScreen');
    }} 

     openAbout={() => {
      this.props.navigation.navigate('AboutScreen');
    }} 
    
    
    
    
    />
    return (
      <Drawer
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
         closedDrawerOffset={-3}
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={(viewport) => viewport.width-viewport.width}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        disabled={true}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={100}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.side}
        
        >

        {/*<DemoScreen/>*/}
        <MyMainView
        openChat={() => {
          this.props.navigation.navigate('salseforceChatScreen');
        }}
         closeDrawer={() => {
        this.drawer.close();
        }}
          drawerType={this.state.drawerType}
          setParentState={this.setStateFrag.bind(this)}
          openDrawer={this.openDrawer.bind(this)}
         // closeDrawer={this.closeDrawer.bind(this)}
         // openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag= {this.state.relativeDrag}
          panStartCompensation= {this.state.panStartCompensation}
          tweenHandlerOn={this.state.tweenHandlerOn}
          disabled={this.state.disabled}
          panThreshold={this.state.panThreshold}
          tweenEasing={this.state.tweenEasing}
          tweenHandlerPreset={this.state.tweenHandlerPreset}
          animation={this.state.animation}
          noopChange={this.noopChange.bind(this)}
          acceptTap={this.state.acceptTap}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          side={this.state.side}
          />
      </Drawer>
    );
  }
    }

    //     onStopInteraction(event, check) {

    //     let menuOpened = true
    //     if(event.nativeEvent.index == 0) {
    //         menuOpened = false
    //     }
    //     this.setState((preState, props) => {
    //         return { menuOpened }
    //     })
    // }

//     onMenuPress = () => {
//         const menuOpened = !this.state.menuOpened
//         if(menuOpened) {
//             this.refs['menuInstance'].snapTo({index: 1})
//         } else {
//             this.refs['menuInstance'].snapTo({index: 0})
//         }
//     }

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCircle:{
     marginTop:100,
     left:'15%',
     height:150,
     width:150,

  },
  tempView:{
    height:100
  },

  bottomCircle:{
     marginTop:20,
     left:'42%',
     height:150,
     width:150,

  },
  topCircle2:{
     marginTop:20,
     left:'15%',
     height:150,
     width:150,

  },

  background: {
    width,
    height,
  },


});