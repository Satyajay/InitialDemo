import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const headerBg = require("../images/headerImg.png");
const backIcon = require("../images/backIcon.png");
import css from './styles';// Styling page
import Header from "./Header" 
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
            <View>
            {/*<ImageBackground source={headerBg} style={{ height: Platform.OS === 'ios' ? 64 : 44, flexDirection: 'column' }}>
            {Platform.OS === 'ios' ? <View style={{ top: 0, height: 20, width: '100%' }}></View> : null}
            <View style={{ top: 0,flex:1, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}  >
                    <View style={{ width: 50, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={backIcon} style={{ height: 20, width: 11 }} />
                    </View>
                </TouchableOpacity>
                    <View style={{ justifyContent:'center', flex:1, width: width,marginRight:50, height: 44, alignItems:'center',  flexDirection:'column' }}>
                        <Text style={{alignSelf:'center',color:'#fff', fontSize:18}}>SETTINGS</Text>
                    </View>
            </View>
          </ImageBackground>*/}
           <Header onPress={()=>tthis.props.navigation.goBack()} HeaderText='SETTINGS' />
            <ScrollView showsVerticalScrollIndicator={false}>
           <Text style={css.configueLbl}>CONFIGURATION</Text>
              <View style={css.switchContainer}>
                <Text style={css.enableText}>Enable Audio</Text>
                 <Switch
                 disabled={false}
                 onTintColor='#607EE7'
                 style={css.Switch}
                  value = {true}/>
              </View>
                </ScrollView>
            </View>
          
        )
    }

}


