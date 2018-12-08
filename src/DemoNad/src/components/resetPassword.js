import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"


export default class ResetPassowrd extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Reset Password",
        headerTitleStyle: {
            alignSelf: "center",
            marginLeft: Platform.OS == "android" ? -30 : 0

        },
        headerTintColor: "#8E8E8E"
    });


    constructor(props) {
        super(props);
        this.state = {
            codesent: false,
            enterEmailLabel: "Enter your Email to reset your password",
            checkyourEmail: "Check your email",
            resendCodeMessage: "We've sent you an email to info@example.com.Click the link in the email to reset your password.",
            resendMessage1: "If you don't see the email, check other places like you junk,spam,social or other folders in your email client.",
            resetButton: "Reset Password ",
            resendMailButton: "Resend"
        };

    }
    sendCode() {
        this.setState({
            codesent: true,
        })
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.codesent == false ?
                        <View style={styles.forgetView} >
                            <Text style={styles.forgetLabel}>{this.state.enterEmailLabel}</Text>
                            <View style={styles.textFeildView}>

                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#C7C7C7"
                                    style={styles.textfield}
                                    underlineColorAndroid="transparent"

                                />
                            </View>

                            <TouchableOpacity onPress={() => this.sendCode()} style={styles.forgetButton}>
                                <Text style={{ color: "white" }}>{this.state.resetButton} </Text>
                            </TouchableOpacity>
                        </View>

                        :

                        <View style={{}}>
                            <Text></Text>

                            <Text style={styles.checkyourEmail}>{this.state.checkyourEmail}</Text>

                            <Text style={styles.resendCodeMessage}>{this.state.resendCodeMessage}</Text>

                            <Text style={styles.resendMessage1}>{this.state.resendMessage1}</Text>

                            <TouchableOpacity onPress={() => this.sendCode()} style={styles.resendButtton}>
                                <Text style={{ color: "white", fontSize: normalizeFont(16) }}> {this.state.resendMailButton} </Text>
                            </TouchableOpacity>
                        </View>


                    }

                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center"
    },
    forgetView: {
        marginLeft: scaleWidth(5),
        marginRight: scaleWidth(5)
    },
    forgetLabel: {
        marginTop: scaleHeight(20),
        fontSize: normalizeFont(16),
        color: "#3f3f3f",
        textAlign: 'left'
    },
    textFeildView: {
        height: scaleHeight(60), width: scaleWidth(width), borderColor: "#E9E9EA", borderRadius: scaleHeight(10), borderWidth: 2, marginTop: scaleHeight(20)
    },
    textfield: {
        height: scaleHeight(60), marginLeft: scaleWidth(10), fontSize: normalizeFont(14)
    },
    forgetButton: {
        height: scaleHeight(60), backgroundColor: "#00AD83", marginTop: scaleHeight(20), borderRadius: 5, justifyContent: "center", alignItems: "center"
    },
    resendButtton: {
        width: (width - 10), height: scaleHeight(60), alignSelf: "center", backgroundColor: "#00AD83", marginTop: scaleHeight(20), borderRadius: 5, justifyContent: "center", alignItems: "center"
    },
    checkyourEmail: {
        marginTop: scaleHeight(30), fontSize: normalizeFont(14), fontWeight: "bold", marginHorizontal: 15, color: "#808080"
    },
    resendCodeMessage: {
        marginHorizontal: scaleWidth(15), marginTop: scaleHeight(10), color: "#808080", fontSize: normalizeFont(16)
    },
    resendMessage1: {
        marginHorizontal: scaleWidth(15), marginTop: scaleHeight(5), color: "#808080", fontSize: normalizeFont(16)
    }

})
