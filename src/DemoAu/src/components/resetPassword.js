import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Modal, Animated, ActivityIndicator, ImageBackground, AsyncStorage
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
import Button from '../common/smallbutton';
import Header from "../common/Header";
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
import colors from '../common/colors';
const Apis = require('../utils/Api');
const aussieLogo = require('../img/logo.png');

export default class ResetPassowrd extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            codesent: false,
            enterEmailLabel: "Enter your email below to receive your password reset instructions",
            checkyourEmail: "Check your email",
            resendCodeMessage: "We've sent you an email to info@example.com.Click the link in the email to reset your password.",
            resendMessage1: "If you don't see the email, check other places like you junk,spam,social or other folders in your email client.",
            resetButton: "Reset Password ",
            resendMailButton: "Resend",
            line1: '#D9DADC',
            mailColor: mailinActive,
            animating: false,
            modalShown: false,
            modalVisible: false,
        };
    }
    callToast(message, type, duration) {
        if (this.state.modalShown) return
        this.setToastType(message, type)
        this.setState({ modalShown: true })
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: !duration ? 350 : duration
            }).start(this.closeToast())
    }

    closeToast() {
        setTimeout(() => {
            this.setState({ modalShown: false })
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 0,
                    duration: 350
                }).start()
        }, 2000)
    }

    callXToast() {
        Animated.timing(
            this.animatedXValue,
            {
                toValue: 0,
                duration: 350
            }).start(this.closeXToast())
    }

    closeXToast() {
        setTimeout(() => {
            Animated.timing(
                this.animatedXValue,
                {
                    toValue: -windowWidth,
                    duration: 350
                }).start()
        }, 2000)
    }

    setToastType(message = 'Success!', type = 'success') {
        let color
        if (type == 'error') color = 'red'
        if (type == 'success') color = '#2487DB'
        if (type == 'warning') color = '#ec971f'
        if (type == 'success') color = 'green'
        this.setState({ toastColor: color, message: message })
    }


    onmailBlur() {
        this.setState({
            mailColor: mailinActive,
            line1: "#D9DADC"
        })
    }

    onmailFocus() {
        this.setState({
            mailColor: mailActive,
            line1: "#ABBBE1"
        })
    }

    setModalVisible() {
        this.setState({ modalVisible: true });

    }

    resetPass() {
        this.setState({ animating: true });
        this.setState({ animating: false });
        const { email } = this.state;
        if (email == '' || email == null) {
            this.callToast('Please enter email id', 'error')
        } else if (!email.match(emailRegex)) {
            this.callToast('Please enter valid email id', 'error')
        } else {
            AsyncStorage.getItem('auth_key').then((Auth_key) => {
                this.setState({ Auth_key: Auth_key });
                var data = {
                    forget_email: this.state.email,
                };
                console.log(data)
                this.setState({ animating: true });
                Apis.postAPI('wsforgetpassword', data).then(response => {
                    console.log(JSON.stringifyresponse)
                    if (response.status == 1 || response.status == "1") {
                        console.log("response-----" + JSON.stringify(response));
                        this.setModalVisible();
                        let that = this;
                        setTimeout(function () {
                            that.setState({ modalVisible: false });
                            that.props.navigation.goBack();
                        }, 5000);
                        this.setState({ animating: false });
                        this.refs.email.blur();
                    } else {
                        this.setState({ animating: false });
                        this.callToast(response.message, 'error')
                    }
                })
            });
        }
    }

    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })
        return (
            <View style={styles.container}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Forgot Password' />
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <Modal
                        transparent={true}
                        onRequestClose={() => null}
                        visible={this.state.animating}>
                        <View style={css.transaparentView}>
                            <ActivityIndicator size="large" color={colors.bdMainRed} />
                        </View>
                    </Modal>
                    <View style={styles.emailWrap}>
                        <Text style={styles.emailtitle}>
                            {this.state.enterEmailLabel}
                        </Text>
                        <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30), }]}>
                            <TextInput
                                style={css.inputNext}
                                ref="email"
                                auto-correction={false}
                                placeholder="Email Id"
                                onBlur={() => this.onmailBlur()}
                                onFocus={() => this.onmailFocus()}
                                keyboardType={'email-address'}
                                returnKeyType='done'
                                onChangeText={value => this.setState({ email: value })}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Button onPress={() => this.resetPass()} title='SUBMIT' />
                    </View>
                </ScrollView>
                <Animated.View style={{ transform: [{ translateY: animation }], height: 67, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
                        {this.state.message}
                    </Text>
                </Animated.View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.transaparentView}>
                        <View style={styles.centerView}>
                            <ImageBackground resizeMode='cover' style={{ marginTop: scaleHeight(10), height: scaleHeight(90), width: scaleWidth(90), borderRadius: scaleWidth(0) }} source={aussieLogo}></ImageBackground>
                            <Text style={styles.topText}>Please Check!</Text>
                            <Text style={styles.desc}>We have sent a reset password link {'\n'} to your email.</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8',
    },
    emailWrap: {
        marginLeft: scaleWidth(20),
        marginRight: scaleWidth(20),
        borderRadius: scaleHeight(10),
        marginTop: scaleHeight(30),
        marginBottom: scaleHeight(10),
        borderColor: 'red',
        height: 260,
        elevation: 3,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3)
        },
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#A9A9A9',
        backgroundColor: '#FFFFFF',

    },
    emailtitle: {
        marginLeft: scaleWidth(30),
        marginRight: scaleWidth(30),
        marginTop: scaleHeight(30),
        color: '#4850C4',
        fontSize: normalizeFont(18),
        textAlign: 'center',
    },
    transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

    centerView: { height: scaleHeight(200), width: scaleWidth(300), borderRadius: scaleHeight(20), backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

    topText: { top: scaleHeight(10), textAlign: 'center', fontSize: normalizeFont(16), fontWeight: '700', color: '#000' },

    desc: { marginTop: scaleHeight(20), textAlign: 'center', fontSize: normalizeFont(14), color: '#000', opacity: 0.7, fontWeight: '400', marginBottom: scaleHeight(20) },
})
