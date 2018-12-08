import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, Animated, Modal, ActivityIndicator, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Header from "../common/Header";
import css from '../common/styles';
import Button from '../common/smallbutton';
import Button1 from '../common/roundbutton';
import Button2 from '../common/bluebutton';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import { Dropdown } from 'react-native-material-dropdown';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
import colors from '../common/colors';
const Apis = require('../utils/Api');


export default class Explore extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
            textLabel: "STAKING",
            bodyLabel: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            getTitle: "Get Coin Age",
            line1: '#E1E1E1',
            mailColor: mailinActive,
            stackTitle: "Initiate Staking",
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

    getCoinAge() {
        const { email } = this.state;
        const { wallet_id } = this.state;
        if (wallet_id == '' || wallet_id == null) {
            this.callToast('Please enter wallet id', 'error')
        } else {
            var coinAge = {
                wallet: wallet_id
            };
            console.log(coinAge)
            this.setState({ animating: true });
            Apis.postAPI('wsgetcoinage', coinAge).then(response => {
                if (response.status == 1 || response.status == "1") {
                    console.log("response-----" + JSON.stringify(response));
                    this.callToast(response.message, 'success')
                    this.setState({ animating: false });
                } else {
                    this.setState({ animating: false });
                    this.callToast(response.message, 'error')
                }
            })
        }

    }

    initStaking() {
        const { tokentype, stack_wallet } = this.state;
        if (tokentype == '' || tokentype == null) {
            this.callToast('Please select token to be minted', 'error')
        } else if (stack_wallet == '' || stack_wallet == null) {
            this.callToast('Please enter wallet id', 'error')
        } else {
            AsyncStorage.getItem('auth_key').then((Auth_key) => {
                this.setState({ Auth_key: Auth_key });
                var stackInfo = {
                    user_id: Auth_key,
                    wallet: tokentype,
                    token: stack_wallet
                };
                console.log(stackInfo)
                this.setState({ animating: true });
                Apis.postAPI('wsmint', stackInfo).then(response => {
                    if (response.status == 1 || response.status == "1") {
                        console.log("response-----" + JSON.stringify(response));
                        this.callToast(response.message, 'success')
                        this.setState({ animating: false });
                        this.props.navigation.navigate('Minor');
                    } else {
                        this.setState({ animating: false });
                        this.callToast(response.message, 'error')
                    }
                })
            });
        }
    }

    onmailBlur() {
        this.setState({
            mailColor: mailinActive,
            line1: '#E1E1E1',
        })
    }

    onmailFocus() {
        this.setState({
            mailColor: mailActive,
            line1: '#E1E1E1',
        })
    }

    viewHistory() {
        this.props.navigation.navigate('MintHistory');
    }

    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })
        let data = [{
            value: 'DIGI',
        }, {
            value: 'AUD',
        },
        ];
        return (
            <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Mint' noBackBtn={true} />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <Modal
                        transparent={true}
                        onRequestClose={() => null}
                        visible={this.state.animating}>
                        <View style={css.transaparentView}>
                            <ActivityIndicator size="large" color={colors.bdMainRed} />
                        </View>
                    </Modal>
                    <Text style={styles.textTitle}> {this.state.textLabel} </Text>
                    <Text style={styles.bodyTitle}> {this.state.bodyLabel} </Text>
                    <View style={styles.stackWrap}>
                        <Text style={styles.coinTitle}>{this.state.stackTitle}</Text>
                        <Button1 onPress={() => this.viewHistory()} title='View History' />
                        <View style={{ marginLeft: scaleWidth(30), marginRight: scaleWidth(30) }}>
                            <Dropdown textColor='#B6B6B6'
                                baseColor="#B6B6B6"
                                value='Select Token to be Minted'
                                onChangeText={value => this.setState({ tokentype: value })}
                                data={data} />
                        </View>
                        <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30) }]}>
                            <TextInput
                                style={css.inputNext}
                                ref="email"
                                auto-correction={false}
                                placeholder="Enter Wallet Id"
                                onBlur={() => this.onmailBlur()}
                                onFocus={() => this.onmailFocus()}
                                returnKeyType='done'
                                onChangeText={value => this.setState({ stack_wallet: value })}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Button onPress={() => this.initStaking()} title='MINT' />
                    </View>
                    <View style={styles.coinWrap}>
                        <Text style={styles.coinTitle}>{this.state.getTitle}</Text>
                        <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(30), marginRight: scaleWidth(30) }]}>
                            <TextInput
                                style={css.inputNext}
                                ref="email"
                                auto-correction={false}
                                placeholder="Enter Wallet Id"
                                onBlur={() => this.onmailBlur()}
                                onFocus={() => this.onmailFocus()}
                                returnKeyType='done'
                                onChangeText={value => this.setState({ wallet_id: value })}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Button2 onPress={() => this.getCoinAge()} title='SUBMIT' />
                    </View>
                    <View style={{ height: scaleHeight(50), width: scaleWidth(200), }}>
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
    textTitle: {
        marginTop: scaleHeight(20),
        textAlign: 'center',
        fontSize: normalizeFont(18),
        color: 'black'
    },
    bodyTitle: {
        marginTop: scaleHeight(18),
        textAlign: 'justify',
        fontSize: normalizeFont(14),
        color: '#878788',
        marginLeft: scaleWidth(30),
        marginRight: scaleWidth(30),
    },
    stackWrap: {
        marginLeft: scaleWidth(20),
        marginRight: scaleWidth(20),
        borderRadius: scaleHeight(10),
        marginTop: scaleHeight(30),
        marginBottom: scaleHeight(10),
        borderColor: 'red',
        height: scaleHeight(390),
        elevation: 3,
        shadowOffset: {
            width: scaleHeight(0),
            height: scaleWidth(3),
        },
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#A9A9A9',
        backgroundColor: '#FFFFFF',
    },
    coinWrap: {
        marginLeft: scaleWidth(20),
        marginRight: scaleWidth(20),
        borderRadius: scaleHeight(10),
        marginTop: scaleHeight(30),
        marginBottom: scaleHeight(10),
        borderColor: 'red',
        height: scaleHeight(220),
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
    coinTitle: {
        marginLeft: scaleWidth(30),
        marginRight: scaleWidth(30),
        marginTop: scaleHeight(20),
        color: '#4850C4',
        fontSize: normalizeFont(18),
        textAlign: 'center',
    },
})
