import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const headerBg = require("../images/headerImg.png");
const backIcon = require("../images/backIcon.png");
class Header extends Component {
    render() {
        return (
            /*<TouchableOpacity onPress={()=>this.props.onPress()}>
          <View style={{ top:20, itemAlign:'center', height: 50, width:'100%', backgroundColor:'red'}}>
            <Text>{this.props.HeaderText}</Text>
         </View>
         </TouchableOpacity>*/
        <ImageBackground source={headerBg} style={{ height: Platform.OS === 'ios' ? 64 : 44, flexDirection: 'column' }}>
            {Platform.OS === 'ios' ? <View style={{ top: 0, height: 20, width: '100%' }}></View> : null}
            <View style={{ top: 0,flex:1, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}  >
                    <View style={{ width: 50, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={backIcon} style={{ height: 20, width: 11 }} />
                    </View>
                </TouchableOpacity>
                    <View style={{ justifyContent:'center', flex:1, width: width,marginRight:50, height: 44, alignItems:'center',  flexDirection:'column' }}>
                        <Text style={{alignSelf:'center',color:'#fff', fontSize:18}}>{this.props.HeaderText}</Text>
                    </View>
            </View>
          </ImageBackground>
       );
     }
}

export default Header;