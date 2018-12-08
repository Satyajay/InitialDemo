import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch, Modal, Animated,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
const profileImg = require('../images/profilepic.png');
import Orientation from 'react-native-orientation';

const Apis = require('../utils/Api');
const profilePic = require("../images/profile_pic_placeholder.png");
const addPic = require("../images/camera.png");
const editIcon = require("../images/edit.png");
import Button from '../common/themeButton';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex = /^[a-zA-Z ]+$/;
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

export default class MyProfile extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-width)
        this.state = {
            avatarSource: profilePic,
            auth_key: null,
            screenType: null,
            fname: null,
            userId: null,
            is_back: true,
            lname: null,
            imageSource: null,
            uname: null,
            mobile: null,
            animating: false,
            email: null,
            content_id: null,
            modalShown: false,
            toastColor: 'green',
            message: 'Success!'
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        const { state } = this.props.navigation;
        if (state.params) {
            this.setState({
                mobile: state.params.mobile,
                is_back: false,
                screenType: state.params.screenType
            })
        }

        AsyncStorage.getItem('user_id').then((user_id) => {
            // alert("user_id"+user_id);
            this.setState({
                userId: user_id
            });
            if (!state.params) {
                this.getProfile(user_id)
            }
            if (state.params.screenType == "home") {
                this.getProfile(user_id)
            }


        });

        // this.getAllNotifications();

    }


    getProfile(userId) {
        this.setState({ animating: true });
        Apis.getAPI("/user/profile?userId=" + userId).then(response => {
            this.setState({ animating: false });
            console.log("list+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.setState({
                    fname: response.data.firstName,
                    lname: response.data.lastName,
                    mobile: response.data.mobileNo,
                    email: response.data.email ? response.data.email : "",
                });
            } else {
                this.setState({ animating: false });


            }
        });

    }


    selectPhotoTapped() {
        // this.props.test();
        const options = {
            quality: 0.5,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    avatarSource: response,
                    imageSource: response.uri
                });
                const file = {
                    // `uri` can also be a file system path (i.e. file://)
                    uri: response.uri,
                    name: new Date().getTime() + ".png",
                    type: "image/png"
                }



                const options = {
                    // keyPrefix: "uploads/",
                    bucket: "profileimagerx",
                    region: 'us-east-1',
                    accessKey: "AKIAIFY5N6QSVAAHGO7Q",
                    secretKey: "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",
                    successActionStatus: 201
                }

                RNS3.put(file, options).then(response => {
                    if (response.status !== 201) {
                        throw new Error("Failed to upload image to S3");
                    }
                    console.log("*************"+JSON.stringify(response));
                });


            }
        });
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    onSave() {

        const { fname, lname, uname, mobile, email } = this.state;
        // if (uname == '' || uname == null) {
        //     this.callToast('Please enter username', 'error')
        // }
        if (fname == '' || fname == null) {
            this.callToast('Please enter first name', 'error')
        } else if (!fname.match(nameRegex)) {
            this.callToast('Please enter valid name', 'error')
        }
        else if (lname == '' || lname == null) {
            this.callToast('Please enter last name', 'error')
        } else if (!lname.match(nameRegex)) {
            this.callToast('Please enter valid name', 'error')
        }

        else if (mobile == '' || mobile == null) {
            this.callToast('Please enter mobile number', 'error')
        } else {
            var data = {
                userId: this.state.userId,
                firstName: fname,
                lastName: lname,
                mobileNo: mobile,
                email: email,
                profilePic: this.state.imageSource,
            };
            this.setState({ animating: true });
            Apis.patchApi(data, "user/update").then(response => {
                console.log("----------" + JSON.stringify(response))
                if (response.status == "success") {
                    this.setState({ animating: false });
                    if (this.state.screenType == "signup") {
                        this.props.navigation.navigate('SelectInterest');
                    } else {
                        this.props.navigation.navigate('Home');
                    }

                } else {
                    this.callToast(response.error.message, 'error')
                    this.setState({ animating: false });
                }

            })
        }
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
        if (type == 'primary') color = '#2487DB'
        if (type == 'warning') color = '#ec971f'
        if (type == 'success') color = 'green'
        this.setState({ toastColor: color, message: message })
    }







    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })

        return (
            <KeyboardAvoidingView style={[css.container, { backgroundColor: 'white' }]} behavior="padding" enabled>
                <Animated.View style={{ transform: [{ translateY: animation }], height: 60, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center', zIndex: 2 }}>
                    <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                        {this.state.message}
                    </Text>
                </Animated.View>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='My Profile' noBackBtn={this.state.is_back} />

                <ScrollView>
                    <ImageBackground imageStyle={css.border} style={[css.dpWrap, styles.profilePicView]} source={this.state.avatarSource}>
                        <TouchableOpacity onPress={() => this.selectPhotoTapped()} style={css.touchedView}>
                            <Image style={[css.addPic, { zIndex: 2, position: "absolute" }]} source={addPic} resizeMode="contain" />
                        </TouchableOpacity>

                    </ImageBackground>
                    {/* <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1,color:'black' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            placeholder="Enter Username"
                            returnKeyType='next'
                            ref="username"
                            //onSubmitEditing={() => this.refs.email.focus()}
                            onChangeText={value => this.setState({ uname: value })}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={{ height: '100%', width: 30, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                            <Image style={styles.editIcon} source={editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View> */}
                    <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            placeholder="Enter First Name"
                            returnKeyType='next'
                            autoCorrect={false}
                            ref="fName"
                            value={this.state.fname}
                            //onSubmitEditing={() => this.refs.email.focus()}
                            onChangeText={value => this.setState({ fname: value })}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={{ height: '100%', width: 30, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                            <Image style={styles.editIcon} source={editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            placeholder="Enter Last Name"
                            returnKeyType='next'
                            autoCorrect={false}
                            value={this.state.lname}
                            ref="lname"
                            //onSubmitEditing={() => this.refs.email.focus()}
                            onChangeText={value => this.setState({ lname: value })}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={{ height: '100%', width: 30, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                            <Image style={styles.editIcon} source={editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            autoCorrect={false}
                            placeholder="Enter Mobile Number"
                            keyboardType={'phone-pad'}
                            maxLength={10}
                            value={this.state.mobile}
                            returnKeyType='next'
                            ref="mobile"
                            //onSubmitEditing={() => this.refs.email.focus()}
                            onChangeText={value => this.setState({ mobile: value })}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={{ height: '100%', width: 30, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                            <Image style={styles.editIcon} source={editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            placeholder="Email(Optional)"
                            autoCorrect={false}
                            returnKeyType='done'
                            ref="email"
                            value={this.state.email}
                            //onSubmitEditing={() => this.refs.email.focus()}
                            onChangeText={value => this.setState({ email: value })}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity style={{ height: '100%', width: 30, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                            <Image style={styles.editIcon} source={editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button onPress={() => this.onSave()} title='SAVE' />
                    </View>

                </ScrollView>
                <Modal
                    transparent={true}
                    onRequestClose={() => null}
                    visible={this.state.animating}>
                    <View style={css.transaparentView}>
                        <ActivityIndicatorExample
                            animating={this.state.animating} />
                    </View>
                </Modal>

            </KeyboardAvoidingView>
        )
    }

}


const styles = StyleSheet.create({
    row: { flex: 1, width: '100%', flexDirection: 'row' },
    editIcon: { height: 15, width: 15, alignSelf: 'center' },
    avatar: { marginLeft: 15, height: 44, width: 44, borderRadius: 23, alignSelf: 'center' },
    top: { marginTop: 35, backgroundColor: '#EDEDED', left: 20, width: width - 40, flexDirection: 'row', borderRadius: 0 },
    name: { marginLeft: 10, fontSize: 15, fontWeight: '400', alignSelf: 'center' },
    commentName: {
        marginTop: 3,
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    commentContent: {
        fontSize: 12,
        marginTop: 5,
        color: '#000',

    },

    commentImage:
    {
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    profilePicView: { marginTop: 15 },
    container2: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        // alignItems: 'center',
        paddingLeft: 15,
    },
    input: {
        flex: 3,
        height: 40,
        fontSize: 15,
    },

})
