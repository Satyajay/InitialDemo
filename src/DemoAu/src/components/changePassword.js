import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Modal, Animated, ActivityIndicator, ImageBackground, AsyncStorage
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton';
import Header from "../common/Header";
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
import colors from '../common/colors';
const aussieLogo = require('../img/logo.png');
const Apis = require('../utils/Api');

export default class ChangePassowrd extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,

    });


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            codesent: false,
            enterEmailLabel: "Make sure it's  unique to this account",
            checkyourEmail: "Check your email",
            resendCodeMessage: "We've sent you an email to info@example.com.Click the link in the email to reset your password.",
            resendMessage1: "If you don't see the email, check other places like you junk,spam,social or other folders in your email client.",
            resetButton: "Reset Password ",
            resendMailButton: "Resend",
            line1: '#D9DADC',
            line2: '#D9DADC',
            line3: '#D9DADC',
            mailColor: mailinActive,
            isVisible: true,
            animating: false,
            modalShown: false,
            modalVisible: false
        };

    }
    callToast(message, type) {
        if (this.state.modalShown) return
        this.setToastType(message, type)
        this.setState({ modalShown: true })
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 350
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


    oldPassBlur() {
        this.setState({
            // mailColor: mailinActive,
            line1: "#D9DADC"
        })
    }

    oldPassFocus() {
        this.setState({
            //mailColor: mailActive,
            line1: "#ABBBE1"
        })
    }

    newPasslBlur() {
        this.setState({
            mailColor: mailinActive,
            line2: "#D9DADC"
        })
    }

    newPassFocus() {
        this.setState({
            mailColor: mailActive,
            line2: "#ABBBE1"
        })
    }

    cnfBlur() {
        this.setState({
            mailColor: mailinActive,
            line3: "#D9DADC"
        })
    }

    cnfFocus() {
        this.setState({
            mailColor: mailActive,
            line3: "#ABBBE1"
        })
    }
    passVisible() {
        if (this.state.viewColor == '#797979') {
            this.setState({
                viewColor: colors.buttonBg
            })
            this.setState({
                isVisible: false
            })
        } else {
            this.setState({
                viewColor: colors.grayColor
            })
            this.setState({
                isVisible: true
            })
        }
    }
    setModalVisible() {
        this.setState({ modalVisible: true });

    }
    resetPass() {
        const { old_pass, new_pass, cnf_pass } = this.state;
        if (old_pass == '' || old_pass == null) {
            this.callToast('Please enter old password', 'error')
        } else if (new_pass == '' || new_pass == null) {
            this.callToast('Please enter new password', 'error')
        } else if (cnf_pass == '' || cnf_pass == null) {
            this.callToast('Please enter confirm password', 'error')
        } else if (new_pass != cnf_pass) {
            this.callToast('Password and confirm password does not match', 'error')
        } else {
            AsyncStorage.getItem('auth_key').then((Auth_key) => {
                this.setState({ Auth_key: Auth_key });
                var data = {
                    user_id: Auth_key,
                    password: this.state.old_pass,
                    new_password: this.state.new_pass
                };
                console.log(data)
                this.setState({ animating: true });
                Apis.postAPI('wschangepassword', data).then(response => {
                    console.log(JSON.stringifyresponse)
                    if (response.status == 1 || response.status == "1") {
                        console.log("response-----" + JSON.stringify(response));
                        this.setModalVisible();
                        let that = this;
                        setTimeout(function () {
                            that.setState({ modalVisible: false });
                            that.props.navigation.goBack();
                        }, 1000);
                        this.setState({ animating: false });
                    } else {
                        this.setState({ animating: false });
                        this.callToast(response.message, 'error')
                    }
                })
            });

            // this.props.navigation.navigate('More')
            // this.refs.cpass.blur();
        }
    }

    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })
        return (
            <View style={styles.container}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Change Password' />
                <Modal
                    transparent={true}
                    onRequestClose={() => null}
                    visible={this.state.animating}>
                    <View style={css.transaparentView}>
                        <ActivityIndicator size="large" color={colors.bdMainRed} />
                    </View>
                </Modal>
                <View style={styles.emailWrap}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <Text style={styles.emailtitle}>
                            {this.state.enterEmailLabel}
                        </Text>
                        <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30), }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Enter Old Password"
                                onBlur={() => this.oldPassBlur()}
                                onFocus={() => this.oldPassFocus()}
                                keyboardType={'email-address'}
                                returnKeyType='next'
                                onSubmitEditing={() => this.pass.focus()}
                                onChangeText={value => this.setState({ old_pass: value })}
                                ref={(pass) => this.pass = pass}
                                secureTextEntry={this.state.isVisible}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line2, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30) }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Enter New Password"
                                onBlur={() => this.newPasslBlur()}
                                onFocus={() => this.newPassFocus()}
                                keyboardType={'email-address'}
                                returnKeyType='next'
                                onSubmitEditing={() => this.refs.cpass.focus()}
                                onChangeText={value => this.setState({ new_pass: value })}
                                ref={(pass) => this.pass = pass}
                                secureTextEntry={this.state.isVisible}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line3, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30) }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Confirm Password"
                                onBlur={() => this.cnfBlur()}
                                onFocus={() => this.cnfFocus()}
                                keyboardType={'email-address'}
                                returnKeyType='done'
                                ref="cpass"
                                secureTextEntry={this.state.isVisible}
                                onChangeText={value => this.setState({ cnf_pass: value })}
                                underlineColorAndroid="transparent"

                            />
                        </View>
                        <Button onPress={() => this.resetPass()} title='SUBMIT' />
                    </ScrollView>
                </View>
                <Animated.View style={{ transform: [{ translateY: animation }], height: scaleHeight(67), backgroundColor: this.state.toastColor, position: 'absolute', left: scaleWidth(0), top: scaleHeight(0), right: scaleWidth(0), justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: normalizeFont(16), textAlign: 'center' }}>
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
                            <Text style={styles.topText}>Congrats!</Text>
                            <Text style={styles.desc}>Your password is changed {'\n'} successfully.</Text>
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
        marginLeft: scaleHeight(20),
        marginRight: scaleWidth(20),
        borderRadius: scaleHeight(10),
        marginTop: scaleHeight(30),
        borderColor: 'red',
        height: scaleHeight(400),
        elevation: 3,
        shadowOffset: {
            width: scaleHeight(0),
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
