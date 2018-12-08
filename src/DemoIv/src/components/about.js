import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from './styles';// Styling page
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
            <View>
           <ImageBackground source={headerBg} style={{ height: Platform.OS === 'ios' ? 64 : 44, flexDirection: 'column' }}>
            {Platform.OS === 'ios' ? <View style={{ top: 0, height: 20, width: '100%' }}></View> : null}
            <View style={{ top: 0,flex:1, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}  >
                    <View style={{ width: 50, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={backIcon} style={{ height: 20, width: 11 }} />
                    </View>
                </TouchableOpacity>
                    <View style={{ justifyContent:'center', flex:1, width: width,marginRight:50, height: 44, alignItems:'center',  flexDirection:'column' }}>
                        <Text style={{alignSelf:'center',color:'#fff', fontSize:18}}>ABOUT</Text>
                    </View>
            </View>
          </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={css.wrapper}> 
                <Text style={css.aboutLbl}>ABOUT IVA</Text>
                <Text style={css.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

            </View>
             <View style={css.wrapper}> 
                <Text style={css.aboutLbl}>CONTACT US</Text>
                <Text style={css.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            
            </View>
            <View style={css.tempView}>
                </View>
            </ScrollView>
          </View>
        )
    }

}

