import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";


export default class Signup extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Sign up",

        headerTitleStyle: {
            alignSelf: "center",
        },
        headerTintColor: "#8E8E8E"
    });


    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={scaleHeight(80)} style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <TouchableOpacity >
                        <View style={styles.fbViewStyle}>
                            <Text style={{ color: "#ABBBD3" }}> Access with facebook </Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.orStyle}> or</Text>

                    <View style={styles.signUpView}>

                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="#C7C7C7"
                            style={styles.textFeildStyle}
                            underlineColorAndroid="transparent"

                        />
                        <View style={styles.lineStyle} />
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="#C7C7C7"
                            style={styles.textFeildStyle}
                            underlineColorAndroid="transparent"

                        />

                        <View style={styles.lineStyle} />

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#C7C7C7"
                            style={styles.textFeildStyle}
                            underlineColorAndroid="transparent"

                        />
                        <View style={styles.lineStyle} />

                        <TextInput
                            placeholder="Passowrd"
                            placeholderTextColor="#C7C7C7"
                            style={styles.textFeildStyle}
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}

                        />

                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.signUpButtonStyle}>
                        <Text style={{ color: "white" }}> Sign up </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center"
    },
    fbViewStyle: {
        height: scaleHeight(60), width: (width - 30), backgroundColor: "#2F5B94", marginTop: scaleHeight(30), borderRadius: 5, justifyContent: "center", alignItems: "center"
    },
    orStyle: {
        marginVertical: scaleHeight(15), fontSize: normalizeFont(17), textAlign: "center"
    },
    signUpView: {
        width: (width - 30), borderColor: "#E9E9EA", borderRadius: 10, borderWidth: 2
    },
    signUpButtonStyle: {
        height: scaleHeight(60), width: (width - 30), backgroundColor: "#00AD83", marginTop: scaleHeight(30), borderRadius: 5, justifyContent: "center", alignItems: "center"
    },
    lineStyle: {
        borderBottomWidth: 2, borderColor: "#E9E9EA"
    },
    textFeildStyle: {
        height: scaleHeight(60), marginLeft: scaleWidth(20), fontSize: normalizeFont(17)
    }

})
