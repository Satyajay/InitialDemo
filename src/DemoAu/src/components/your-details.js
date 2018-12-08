import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Modal, Animated, ActivityIndicator, AsyncStorage, KeyboardAvoidingView
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton';
import Header from "../common/Header";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const phoneRegex = '^[0-9]$';
import colors from '../common/colors';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const nameRegex = /^[a-zA-Z ]+$/;
const Apis = require('../utils/Api');

export default class YourDetails extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,

    });


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            codesent: false,
            enterEmailLabel: "Please fill out all fields",
            line1: '#D9DADC',
            line2: '#D9DADC',
            line3: '#D9DADC',
            line4: '#D9DADC',
            mailColor: mailinActive,
            isVisible: true,
            animating: false,
            modalShown: false,
            email: '',
            phone_no: '',
            name: '',
            username: ''
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
            line1: "#D9DADC"
        })
    }

    oldPassFocus() {
        this.setState({
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

    resetPass() {
        this.props.navigation.navigate('DevAuth')
        this.refs.cpass.blur();
    }

    cellBlur() {
        this.setState({
            mailColor: mailinActive,
            line4: "#D9DADC"
        })
    }

    cellFocus() {
        this.setState({
            mailColor: mailActive,
            line4: "#ABBBE1"
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


    componentDidMount() {
        const { state } = this.props.navigation;
        console.log("Callback data======" + JSON.stringify(state.params));
        // this.state.email = state.params.email,
        //     this.state.name = state.params.name,
        //     this.state.username = state.params.user_name,
        //     this.state.phone_no = state.params.mobileNo

        this.setState({
            name: state.params.name,
            username: state.params.user_name,
            email: state.params.email,
            phone_no: state.params.mobileNo,
            callBack: state.params.callBack()
        });
    }

    detailSubmit() {
        const { email, name, username, phone_no } = this.state;
        if (email == '' || email == null) {
            this.callToast('Please enter email id', 'error')
        } else if (!email.match(emailRegex)) {
            this.callToast('Please enter valid email id', 'error')
        } else if (name == '' || name == null) {
            this.callToast('Please enter your name', 'error')
        } else if (!name.match(nameRegex)) {
            this.callToast('Please enter valid name', 'error')
        } else if (username == '' || username == null) {
            this.callToast('Please enter username', 'error')
        } else if (phone_no == '' || phone_no == null) {
            this.callToast('Please enter phone no', 'error')
        } else if (!phone_no.match("^[0-9]+$")) {
            this.callToast('Please enter phone no in digits', 'error')
        } else {
            AsyncStorage.getItem('auth_key').then((Auth_key) => {
                this.setState({ Auth_key: Auth_key });
                var updateInfo = {
                    user_id: Auth_key,
                    name: name,
                    phone_number: phone_no
                };
                console.log(updateInfo)
                this.setState({ animating: true });
                Apis.postAPI('wsupdateprofile', updateInfo).then(response => {
                    if (response.status == 1 || response.status == "1") {
                        console.log("response-----" + JSON.stringify(response));
                        this.callToast(response.message, 'success')
                        this.setState({ animating: false });
                        that = this;
                        setTimeout(function () {
                            that.goBack();
                            // that.props.navigation.goBack();
                        }, 500);
                    } else {
                        this.setState({ animating: false });
                        this.callToast(response.message, 'error')
                    }
                })
            });
        }
    }

    goBack() {
        const { state } = this.props.navigation;
        this.props.navigation.goBack()
        if (state.params.callBack) {
            state.params.callBack();
        }
    }

    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })
        return (
            <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Your Details' />
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
                                auto-correction={false}
                                placeholder="Email Id"
                                onBlur={() => this.oldPassBlur()}
                                onFocus={() => this.oldPassFocus()}
                                keyboardType={'email-address'}
                                editable={false}
                                selectTextOnFocus={false}
                                returnKeyType='next'
                                onSubmitEditing={() => this.refs.cpass2.focus()}
                                onChangeText={value => this.setState({ email: value })}
                                ref={(pass) => this.pass = pass}
                                value={this.state.email}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line2, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30), }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Name"
                                onBlur={() => this.newPasslBlur()}
                                onFocus={() => this.newPassFocus()}
                                returnKeyType='next'
                                onSubmitEditing={() => this.refs.cpass.focus()}
                                onChangeText={value => this.setState({ name: value })}
                                ref="cpass2"
                                value={this.state.name}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line3, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30), }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Username"
                                onBlur={() => this.cnfBlur()}
                                onFocus={() => this.cnfFocus()}
                                editable={false}
                                selectTextOnFocus={false}
                                returnKeyType='next'
                                onSubmitEditing={() => this.refs.cpass3.focus()}
                                onChangeText={value => this.setState({ username: value })}
                                ref="cpass"
                                value={this.state.username}
                                underlineColorAndroid="transparent"

                            />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line4, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30), }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Phone Number"
                                keyboardType={'number-pad'}
                                onBlur={() => this.cellBlur()}
                                onFocus={() => this.cellFocus()}
                                onChangeText={value => this.setState({ phone_no: value })}
                                returnKeyType='done'
                                ref="cpass3"
                                value={this.state.phone_no}
                                underlineColorAndroid="transparent"

                            />
                        </View>
                        <Button style={{ width: 110 }} onPress={() => this.detailSubmit()} title='SUBMIT' />
                    </View>

                </ScrollView>
                <Animated.View style={{ transform: [{ translateY: animation }], height: scaleHeight(67), backgroundColor: this.state.toastColor, position: 'absolute', left: scaleWidth(0), top: scaleHeight(0), right: scaleWidth(0), justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: normalizeFont(16), textAlign: 'center' }}>
                        {this.state.message}
                    </Text>
                </Animated.View>
            </KeyboardAvoidingView>
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
        height: scaleHeight(400),
        elevation: 3,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
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


})
