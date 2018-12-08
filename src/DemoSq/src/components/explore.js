import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Animated, ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList,StatusBar
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"

export default class Explore extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    constructor(props) {
        super(props);
        this.state = {
        }
    }





    render() {
   
        return (
            <View style={styles.container}>
              
         
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        top: (height * 0.9),
        flexDirection: 'row',
    },
    track: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        height: 2,
    },
    bar: {
        backgroundColor: 'red',
        height: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    tutorialHeading: {
        color: "#ffffff",
        fontFamily: 'Cochin',
        fontSize: normalizeFont(22)
    },
    tutorialText: {
        color: "#ffffff",
        fontFamily: 'Cochin',
        fontSize: normalizeFont(18)
    },
    textView: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleHeight(0.3 * height),
    },
    rowtitleStyle: {
        marginTop:10,
        flexDirection: "row", 
        height:30,
       // backgroundColor:'red',
        width:100,
        marginLeft:5,
        justifyContent:'center'
    },
    rowColor: {
       backgroundColor:'#fff',
    },
    rowColorStory:{
        backgroundColor:'#ffffff',marginBottom:-15,marginTop:0
    },
    rowColorVideo:{
        backgroundColor:'#ffffff',marginTop:0
    },
    rowTitleLabelStyle: {
       alignSelf:'center', marginLeft: 5, fontSize: normalizeFont(18), fontWeight: "600", color: "#C3363F"
    },
    rowTitleViewAllStyle: {
        marginTop: scaleHeight(20), marginRight: scaleWidth(20), fontSize: normalizeFont(14),fontWeight:"500", color: "#9F9F9F"
    },

    rowViewStyle: {
        marginHorizontal: scaleHeight(8), marginTop: scaleHeight(10),margin:10,
        backgroundColor:'#ffffff'
    },
    rowImageStyle: {
        height: scaleHeight(120), width: scaleWidth(120), borderRadius:4
    },

    rowDescViewStyle: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    rowDescLabelStyle: {
        width: scaleWidth(200), marginTop: scaleHeight(5), fontSize: normalizeFont(14)
    },
    rowDescPriceLabel: {
        color: "#31B862", marginRight: scaleWidth(5), fontSize: normalizeFont(14)
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 12,
        color:'white',
        top:0,
      },
      statusBar:{
        height: (Platform.OS === 'ios') ? 20 : 0,
      },

})
