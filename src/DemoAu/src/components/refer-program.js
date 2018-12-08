import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, AsyncStorage, Animated, ActivityIndicator, Modal, KeyboardAvoidingView
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton'
import Header from "../common/Header";
import colors from '../common/colors';
const Apis = require('../utils/Api');
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class ReferProgram extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,

    });

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            codesent: false,
            referLabel: "Your Referral Details",
            referLabelLink: 'Your Referral Link',
            line1: '#D9DADC',
            line2: '#D9DADC',
            line3: '#D9DADC',
            line4: '#D9DADC',
            mailColor: mailinActive,
            isVisible: true,
            bodyLabel: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            referLink: 'https://aussiedigital.io/referral/',
            animating: false,
            modalShown: false,
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
        if (type == 'error') color = '#cc0000'
        if (type == 'success') color = '#2487DB'
        if (type == 'warning') color = '#ec971f'
        if (type == 'success') color = '#4FB449'
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

    detailSubmit() {
        alert('Detail Submit');
    }
    shareIt() {
        alert('Share Link')
    }
    componentDidMount() {
        this.getReferLink();
        // AsyncStorage.getItem('auth_key').then((Auth_key) => {
        //     Auth_key = Auth_key;
        //     if (Auth_key != null) {
        //         this.setState({ Auth_key: Auth_key });
        //         this.getProfile();
        //     }
        // });
    }

    getReferLink() {
        AsyncStorage.getItem('auth_key').then((Auth_key) => {
            this.setState({ Auth_key: Auth_key });
            var code_link = {
                user_id: Auth_key,
            };
            console.log(code_link)
            Apis.postAPI('wsreferral', code_link).then(response => {
                if (response.status == 1 || response.status == "1") {
                    console.log(response);
                    this.setState({ animating: false });
                    this.setState({
                        refer_code: response.code,
                    });
                } else {
                    this.setState({ animating: false });
                    console.log(response.message);
                }
            })
        });
    }

    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })
        return (
            <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Referral Program' />
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <Modal
                        transparent={true}
                        onRequestClose={() => null}
                        visible={this.state.animating}>
                        <View style={css.transaparentView}>
                            <ActivityIndicator size="large" color={colors.bdMainRed} />
                        </View>
                    </Modal>
                    <Text style={styles.bodyTitle}> {this.state.bodyLabel} </Text>
                    <View style={styles.emailWrap}>
                        <Text style={styles.refertitle}>
                            {this.state.referLabelLink}
                        </Text>
                        <Text style={styles.referUrl}>{this.state.referLink}{this.state.refer_code}</Text>
                        <TouchableOpacity style={styles.scanBtn} onPress={() => this.shareIt()}>
                            <Text style={styles.scanText}>SHARE VIA EMAIL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emailWrap}>
                        <Text style={styles.refertitle}>
                            {this.state.referLabel}
                        </Text>
                        <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30), }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Total Earnings"
                                onBlur={() => this.oldPassBlur()}
                                onFocus={() => this.oldPassFocus()}
                                keyboardType={'email-address'}
                                returnKeyType='next'
                                onSubmitEditing={() => this.refs.cpass2.focus()}
                                ref={(pass) => this.pass = pass}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line2, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30) }]}>
                            <TextInput
                                style={css.inputNext}
                                auto-correction={false}
                                placeholder="Referral Earnings"
                                onBlur={() => this.newPasslBlur()}
                                onFocus={() => this.newPassFocus()}
                                returnKeyType='done'
                                ref="cpass2"
                                underlineColorAndroid="transparent"
                            />
                        </View>
                    </View>
                    <View style={{ height: scaleHeight(40) }}>
                    </View>
                </ScrollView>

                <Animated.View style={{ transform: [{ translateY: animation }], height: 67, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
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
        height: scaleHeight(230),
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
    refertitle: {
        marginLeft: scaleWidth(30),
        marginRight: scaleWidth(30),
        marginTop: scaleHeight(30),
        color: '#4850C4',
        fontSize: normalizeFont(18),
        textAlign: 'center',
    },
    bodyTitle: {
        marginTop: scaleHeight(18),
        textAlign: 'justify',
        fontSize: normalizeFont(14),
        color: '#878788',
        marginLeft: scaleWidth(30),
        marginRight: scaleWidth(30),
    },
    scanBtn: {
        width: '65%',
        alignSelf: 'center',
        height: scaleHeight(40),
        borderRadius: scaleHeight(20),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(20),
        backgroundColor: colors.buttonBg,
        shadowColor: '#24BDFD',
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    scanText: {
        color: colors.buttonText,
        fontWeight: '400',
        backgroundColor: 'transparent',
        fontSize: normalizeFont(14),
    },
    referUrl: {
        marginLeft: scaleWidth(10),
        marginRight: scaleWidth(10),
        marginBottom: scaleHeight(20),
        marginTop: scaleHeight(30),
        color: 'black',
        textAlign: 'center'
    }
})
