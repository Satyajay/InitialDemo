import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";

export default class Language extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Language",
        headerTintColor: "#8E8E8E"
    });
    constructor(props) {
        super(props);
        this.state = {
      };
    }


    render() {

        return (
           
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                </ScrollView>
          
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center"
    },
    fbButtonStyle: {
        justifyContent: "center", alignItems: "center", height: scaleHeight(60), width: (width - 30), backgroundColor: "#2F5B94", marginTop: scaleHeight(30), borderRadius: 5
    },
    orLabelStyle: {
        marginVertical: scaleHeight(15), fontSize: normalizeFont(17), textAlign: "center"
    },
    usernameView: {
        height: scaleHeight(125), width: (width - 30), borderColor: "#E9E9EA", borderRadius: 10, borderWidth: 2
    },
    passwordView: {
        borderBottomWidth: 2, borderColor: "#E9E9EA"
    },
    forgetButtonStyle: {
        marginTop: scaleHeight(10), color: "#91DBF1", fontSize: normalizeFont(16)
    },
    loginButtonStyle: {
        height: scaleHeight(60), width: (width - 30), backgroundColor: "#00AD83", marginTop: scaleHeight(20), borderRadius: 5, justifyContent: "center", alignItems: "center"
    },
    loginTextFeildStyles: {
        height: scaleHeight(60), marginLeft: 20, fontSize: normalizeFont(17)
    }
})
