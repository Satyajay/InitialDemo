import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, Modal, TouchableHighlight, Button, AsyncStorage, ActivityIndicator, Animated
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import SmallBtn from '../common/smallbutton';
import colors from '../common/colors';
import Header from "../common/Header";
const promo = require('../img/promo.png');
const settingsIcon = require('../img/settings.png');
const detailsIcon = require('../img/your-details.png');
const appIcon = require('../img/apps.png');
const Apis = require('../utils/Api');
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
import css from '../common/styles';
let Auth_key = "";


import Icon from 'react-native-vector-icons/Ionicons';

export default class Explore extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            mintLabel: "More Page",
            modalVisible: false,
            modalShown: false,
            animating: false
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


    moreDetails() {
        this.props.navigation.navigate('YourDetails');
    }

    workProcess() {
        this.props.navigation.navigate('WorkProcess');
    }

    logout() {
        AsyncStorage.removeItem('auth_key');
        this.props.navigation.navigate('Login');
        this.setState({ modalVisible: false });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    termsCondition() {
        this.props.navigation.navigate('TermsCondition')
    }
    appVersion() {
        alert('App Version')
    }
    changePass() {
        this.props.navigation.navigate('ChangePassword');
    }

    referProgram() {
        this.props.navigation.navigate('ReferProgram');
    }

    componentDidMount() {
        this.getProfile();
        AsyncStorage.getItem('auth_key').then((Auth_key) => {
            Auth_key = Auth_key;
            if (Auth_key != null) {
                this.setState({ Auth_key: Auth_key });
                this.getProfile();
            }
        });
    }

    yourDetails() {
        this.props.navigation.navigate('YourDetails', {
            user_name: this.state.user_username,
            email: this.state.user_email,
            mobileNo: this.state.user_phone,
            name: this.state.user_name,
            callBack: this.getProfile.bind(this)
        });
    }

    contactUs() {
        this.props.navigation.navigate('ContactTab');
    }

    getProfile() {
        AsyncStorage.getItem('auth_key').then((Auth_key) => {
            this.setState({ Auth_key: Auth_key });
            var profileInfo = {
                user_id: Auth_key,
            };
            console.log(profileInfo)
            //this.setState({ animating: true });
            Apis.postAPI('wsgetprofile', profileInfo).then(response => {
                if (response.status == 1 || response.status == "1") {
                    console.log(response);
                    //this.setState({ animating: false });
                    this.setState({
                        user_email: response.details.email,
                        user_name: response.details.name,
                        user_phone: response.details.phone_number,
                        user_username: response.details.username,
                        callBack: this.getProfile.bind(this)
                    });
                } else {
                    //this.setState({ animating: false });
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
            <View style={styles.container}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='More' noBackBtn={true} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.transaparentView}>
                        <View style={styles.centerView}>
                            {/* <Text style={styles.topText}>Logout</Text> */}
                            <Text style={styles.desc}>Are you sure want to logout from {'\n'} Aussie Digital?</Text>
                            <View style={styles.btnWrapper}>
                                <TouchableOpacity style={styles.yesBtn} onPress={() => this.logout()}>
                                    <Text style={styles.yesText}>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.noBtn} onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                    <Text style={styles.noText}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    onRequestClose={() => null}
                    visible={this.state.animating}>
                    <View style={css.transaparentView}>
                        <ActivityIndicator size="large" color={colors.bdMainRed} />
                    </View>
                </Modal>
                <ScrollView style={{ flex: 1, backgroundColor: '#E9EAEC' }}>
                    <View style={styles.imageView}>
                        <Image style={styles.leftIcon} source={promo} />
                        <Text style={styles.rightTitle}>Promo</Text>
                    </View>

                    <TouchableOpacity style={styles.rowView} onPress={() => this.referProgram()}>
                        <Text style={styles.label}>Referral Program</Text>
                        <View style={styles.nextContainer}>
                            <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                        </View>
                    </TouchableOpacity>


                    <View style={[styles.imageView, { marginTop: scaleHeight(5), width: scaleWidth(150), }]}>
                        <Image style={[styles.leftIcon, { height: scaleHeight(20) }]} source={detailsIcon} />
                        <Text style={styles.rightTitle}>Your Details</Text>
                    </View>

                    <View style={styles.profileBox}>

                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(5), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(42) }]} onPress={() => this.yourDetails()}>
                            <Text style={styles.label1}>Email id</Text>
                            <Text style={styles.emailText}>{this.state.user_email}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(5), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(42) }]} onPress={() => this.yourDetails()}>
                            <Text style={styles.label1}>Name</Text>
                            <Text style={styles.nameText}>{this.state.user_name}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.imageView, { marginTop: scaleHeight(5) }]}>
                        <Image style={[styles.leftIcon, { height: scaleHeight(20) }]} source={settingsIcon} />
                        <Text style={styles.rightTitle}>Settings</Text>
                    </View>
                    <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(5) }]} onPress={() => this.changePass()}>
                        <Text style={styles.label}>Change Password</Text>
                        <View style={styles.nextContainer}>
                            <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.imageView, { marginTop: scaleHeight(5) }]}>
                        <Image style={[styles.leftIcon, { height: scaleHeight(20) }]} source={appIcon} />
                        <Text style={styles.rightTitle}>App</Text>
                    </View>
                    <View style={styles.detailInfo}>
                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(5), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(40), }]}>
                            <Text style={styles.label}>App Version 1.0.0</Text>
                            <View style={styles.nextContainer}>
                                <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(0), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(40), }]} onPress={() => this.termsCondition()}>
                            <Text style={styles.label}>Terms & Conditions</Text>
                            <View style={styles.nextContainer}>
                                <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(0), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(40) }]} onPress={() => this.workProcess()}>
                            <Text style={styles.label}>How it Works</Text>
                            <View style={styles.nextContainer}>
                                <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(0), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(40) }]} onPress={() => this.contactUs()}>
                            <Text style={styles.label}>Contact Us</Text>
                            <View style={styles.nextContainer}>
                                <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowView, { marginTop: scaleHeight(0), marginLeft: scaleWidth(0), marginRight: scaleWidth(0), marginBottom: scaleHeight(50), borderRadius: scaleHeight(0), borderLeftColor: 'transparent', height: scaleHeight(40), }]} onPress={() => this.setModalVisible(true)}>
                            <Text style={styles.label}>Logout</Text>
                            <View style={styles.nextContainer}>
                                <Icon name="ios-arrow-forward" size={20} color='#A7A7A7' style={styles.nextIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: scaleHeight(50), width: scaleWidth(250) }}>
                    </View>
                </ScrollView>
                <Animated.View style={{ transform: [{ translateY: animation }], height: 67, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
                        {this.state.message}
                    </Text>
                </Animated.View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mintStyle: {
        justifyContent: "center", alignItems: "center", height: scaleHeight(60), width: (width - 30), backgroundColor: "#2F5B94", marginTop: scaleHeight(30), borderRadius: scaleHeight(5),
    },
    transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

    centerView: { height: scaleHeight(140), width: scaleWidth(280), borderRadius: scaleHeight(8), backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

    topText: { top: scaleHeight(20), textAlign: 'center', fontSize: normalizeFont(15), fontWeight: '500', color: '#000' },

    desc: { top: scaleHeight(30), textAlign: 'center', fontSize: normalizeFont(14), color: '#000', opacity: 0.9, fontWeight: '400' },

    btnWrapper: { position: 'absolute', left: scaleWidth(15), right: scaleWidth(15), bottom: scaleHeight(20), height: scaleHeight(35), flexDirection: 'row', justifyContent: 'space-around' },

    yesBtn: {
        height: scaleHeight(30), width: scaleWidth(95),
        backgroundColor: '#B2B2B2',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: scaleHeight(18),
        shadowColor: '#B2B2B2',
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },

    yesText: { textAlign: 'center', fontSize: normalizeFont(14), fontWeight: '500', color: '#FFFFFF' },

    noBtn: {
        height: scaleHeight(30),
        width: scaleWidth(95),
        backgroundColor: colors.buttonBg,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: scaleHeight(18),
        shadowColor: colors.buttonBg,
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },

    noText: { textAlign: 'center', fontSize: normalizeFont(14), fontWeight: '500', color: '#FFFFFF' },

    title1: { marginLeft: scaleWidth(15), color: colors.grayColor, alignSelf: 'center', fontSize: normalizeFont(15), fontWeight: '500', opacity: 0.8 },
    rightTitle: { marginLeft: scaleWidth(5), fontSize: normalizeFont(14), fontWeight: '400', color: '#000', alignSelf: 'center', opacity: 0.9 },
    imageView: { flexDirection: 'row', justifyContent: 'flex-start', marginTop: scaleHeight(20), height: scaleHeight(25), marginLeft: scaleWidth(25), width: scaleWidth(80), },
    leftIcon: { height: scaleHeight(12), width: scaleWidth(20), marginLeft: scaleWidth(0), alignSelf: 'center' },
    rowView: { flexDirection: 'row', marginTop: scaleHeight(5), height: scaleHeight(50), marginLeft: scaleWidth(25), marginRight: scaleWidth(25), borderRadius: scaleHeight(8), borderLeftWidth: scaleWidth(1.5), borderLeftColor: '#061DC1', backgroundColor: '#fff' },
    nextContainer: { width: '20%', height: '100%', flexDirection: 'row', justifyContent: 'flex-end' },
    label: { width: '80%', alignSelf: 'center', marginLeft: scaleWidth(7), color: '#A7A7A7', fontSize: normalizeFont(13), fontWeight: '400' },
    label1: { width: '30%', alignSelf: 'center', marginLeft: scaleWidth(7), color: '#A7A7A7', fontSize: normalizeFont(13), fontWeight: '400' },
    nextIcon: { marginRight: scaleWidth(20), alignSelf: 'center' },
    emailText: {
        color: '#6AC9FD',
        marginTop: scaleHeight(12),
        marginRight: 5,
        fontSize: normalizeFont(13)
    },
    nameText: {
        color: '#6AC9FD',
        marginTop: scaleHeight(13),
        fontSize: normalizeFont(13)
    },
    profileBox: {
        marginTop: scaleHeight(5), height: scaleHeight(100), marginBottom: scaleHeight(5), marginLeft: scaleWidth(25), marginRight: scaleWidth(25), borderRadius: scaleHeight(8), backgroundColor: '#fff', borderLeftWidth: scaleWidth(1.5), borderLeftColor: '#67C3F8'
    },
    detailInfo: {
        marginTop: scaleHeight(5), height: scaleHeight(210), marginBottom: scaleHeight(5), marginLeft: scaleWidth(25), marginRight: scaleWidth(25), borderRadius: scaleHeight(8), backgroundColor: '#fff', borderLeftWidth: scaleWidth(1.5), borderLeftColor: '#67C3F8',
    }

})