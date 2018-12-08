import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";

export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Log in",
        headerTintColor: "#8E8E8E"
    });


    constructor(props) {
        super(props);
        this.state = {
            fbButtonLabel: "Access with facebook",
            forgetButtonLabel: "Forget your passowrd?",
            or: "or",
            loginButtonText: "Log in"
        };
    }


    render() {

        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.fbButtonStyle}>
                        <Text style={{ color: "#ABBBD3" }}> {this.state.fbButtonLabel} </Text>
                    </TouchableOpacity>

                    <Text style={styles.orLabelStyle}> {this.state.or}</Text>

                    <View style={styles.usernameView}>

                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#C7C7C7"
                            style={styles.loginTextFeildStyles}
                            underlineColorAndroid="transparent"
                            returnKeyType="next"
                            onSubmitEditing={() => this.pass.focus()}

                        />
                        <View style={styles.passwordView} />

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#C7C7C7"
                            style={styles.loginTextFeildStyles}
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            returnKeyType="done"
                            ref={(pass) => this.pass = pass}
                        />

                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassowrd')}>
                        <Text style={styles.forgetButtonStyle}> {this.state.forgetButtonLabel}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Tab')} style={styles.loginButtonStyle}>
                        <Text style={{ color: "white" }}>{this.state.loginButtonText}</Text>
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


// Post API

// Apis.postAPI('wslogin', data).then(response => {
//     console.log("response-----" + JSON.stringify(response));
//     if (response.status == 1 || response.status == "1") {
//       this.setState({ animating: false });
//       AsyncStorage.setItem('auth_key', JSON.stringify(response.user_details.user_id));
//       this.callToast('You have logged in successfully', 'success')
//       that = this;
//       setTimeout(function () {
//         that.props.navigation.navigate('DevAuth');
//       }, 500);
//     } else {
//       this.setState({ animating: false });
//       this.callToast(response.message, 'error')
//     }
//   })