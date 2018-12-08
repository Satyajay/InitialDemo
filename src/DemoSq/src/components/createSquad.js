import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch, Modal, Animated,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Orientation from 'react-native-orientation';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Moment from 'react-moment';
import Header from "../common/Header"
const profileImg = require('../images/profilepic.png');
const Apis = require('../utils/Api');
const profilePic = require("../images/profile_pic_placeholder.png");
const addPic = require("../images/camera.png");
const editIcon = require("../images/map.png");
const check = require("../images/check.png");
const selectImg = require("../images/select.png");

import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker2 from 'react-native-modal-datetime-picker';
import Button from '../common/themeButton';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex = /^[a-zA-Z ]+$/;
import ImagePicker from 'react-native-image-picker';
import colors from '../common/colors';
import RNGooglePlaces from 'react-native-google-places';

export default class MyProfile extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-width)
        this.state = {
            date: 'MM/DD/YYYY',
            time: 'HH:MM',
            imagePath: null,
            checkImage: check,
            avatarSource: null,
            check: true,
            auth_key: null,
            details: null,
            fname: null,
            selectedVal: null,
            selectedVal2: null,
            slectectedCat:null,
            slectectedSubCat:null,
            userId: null,
            isDateTimePickerVisible: false,
            isDateTimePickerVisible2: false,
            lname: null,
            imageSource: null,
            uname: null,
            mobile: null,
            animating: false,
            email: null,
            content_id: null,
            modalShown: false,
            toastColor: 'green',
            message: 'Success!',
            showInput: false,
            addressQuery: '',
            predictions: [],
            collectionCat: [],
            collectionSubCat: [],
            categoryList: [],
            subCategoryList:[],
            flag: true
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
        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
        });
        const { state } = this.props.navigation;
        this.getCategories();
       
        // this.getAllNotifications();

    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [month, day, year].join('/');
        }
        //  var SelectedDate= date.split(" ");
        //alert(formatDate(date));


        this.setState({
            date: formatDate(date)
        });

        this._hideDateTimePicker();
    };

    _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

    _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

    _handleDatePicked2 = (date) => {
        // alert(date);
        function formatDate(date) {
            var d = new Date(date),
                Hours = '' + (d.getHours()),
                Min = '' + d.getMinutes();

            return [Hours, Min].join(':');
        }



        this.setState({
            time: formatDate(date)
        });

        this._hideDateTimePicker2();
    };


    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    upload(url, data) {
        let options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST'
        };

        options.body = new FormData();
        for (let key in data) {
            options.body.append(key, data[key]);
        }

        return fetch(url, options)
            .then(response => {
                return response.json()
                    .then(responseJson => {
                        console.log("Create event" + JSON.stringify(responseJson));
                        if (responseJson.status == "success") {
                            this.setState({ animating: false });
                            this.props.navigation.navigate('SendInvites', {
                                eventId: responseJson.data._id
                            });
                        } else {
                            this.callToast(responseJson.error.message, 'error')
                            this.setState({ animating: false });
                        }
                        //You put some checks here
                        //return responseJson;
                    });
            });
    }

    getCategories() {
        this.setState({ animating: true });
        Apis.getAPI("/category/list").then(response => {
            this.setState({ animating: false });
            console.log("Userssssss+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.setState({ animating: false,collectionCat:response.data});
                for (var i = 0; i < response.data.length; i++) {
                    this.state.categoryList.push({
                        value: response.data[i].name
                    });
                }

            } else {
                this.setState({ animating: false });


            }
        });

    }

    getSubCategories(categoryId) {
        this.setState({ animating: true });
        Apis.getAPI("event/subevents/?categoryId="+categoryId).then(response => {
            this.setState({ animating: false });
            console.log("subcategory+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.setState({ animating: false,collectionSubCat:response.data});
                for (var i = 0; i < response.data.length; i++) {
                    this.state.subCategoryList.push({
                        value: response.data[i].name
                    });
                }

            } else {
                this.setState({ animating: false });


            }
        });

    }


    onSave() {

        const { title, selectedVal, selectedVal2, addressQuery, date, time } = this.state;
        if (title == '' || title == null) {
            this.callToast('Please enter title', 'error')
        }
        else if (selectedVal == '' || selectedVal == null) {
            this.callToast('Please select category', 'error')
        } else if (selectedVal2 == '' || selectedVal2 == null) {
            this.callToast('Please select sub-category', 'error')
        }
        else if (addressQuery == '' || addressQuery == null) {
            this.callToast('Please enter location', 'error')
        } else if (date == 'MM/DD/YYYY') {
            this.callToast('Please select date', 'error')
        }
        else if (time == 'HH:MM') {
            this.callToast('Please select time', 'error')
        }
        else {
            this.setState({ animating: true });

            var data = {
                userId: this.state.userId,
                categoryId: this.state.slectectedCat,
                subCategoryId: this.state.slectectedSubCat,
                eventName: title,
                Kick_of_Time: time,
                googleMapLocation: addressQuery,
                startAt: date,
                totalTeam: 5,
                description: this.state.details,
                privateEvent: this.state.check,
                eventImage: this.state.imagePath,
                expireAt: date,
                rules: "I follow my rules none other then else"
            };
            console.log("----------" + JSON.stringify(data))

            this.upload("http://52.14.89.103:3000/api/event/create", data)



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

    renderItem = ({ item }) => {
        console.log('item no---', item)
        return (
            <View style={styles.listItemWrapper}>
                <TouchableOpacity style={styles.listItem}
                    onPress={() => this.onSelectSuggestion(item.fullText)}>
                    {/* <View style={styles.avatar}>
                        <Image style={styles.listIcon} source={require('../images/google.png')} />
                    </View> */}
                    <View style={styles.placeMeta}>
                        <Text style={styles.primaryText}>{item.fullText}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.divider} />
            </View>
        );
    }
    onSelectSuggestion(fullText) {
        RNGooglePlaces.lookUpPlaceByID(fullText)
            .then((results) => console.log(results))
            .catch((error) => console.log(error.message));

        this.setState({
            showInput: false,
            addressQuery: fullText,
            predictions: [],
            flag: false
        });
        RNGooglePlaces.lookUpPlaceByID('ChIJhRTXUeeROxARmk_Rp3PtIvI')
            .then((results) => console.log(results))
            .catch((error) => console.log(error.message));
    }

    onGetPlaceByIDPress = () => {

    }

    keyExtractor = item => item.placeID;

    onQueryChange = (text) => {
        console.log("----" + text);
        this.setState({ addressQuery: text, flag: true });
        RNGooglePlaces.getAutocompletePredictions(text, {
            // country: text
        })
            .then((places) => {
                console.log(places);
                this.setState({ predictions: places });
            })
            .catch(error => console.log(error.message));
    }
    selectCaregory(value, index, data) {
        console.log("-----" + JSON.stringify(this.state.collectionCat));

        this.setState({
            slectectedCat:this.state.collectionCat[index]._id?this.state.collectionCat[index]._id:null,
            selectedVal: value,
        })
         this.getSubCategories(this.state.collectionCat[index]._id);

    }

    selectCaregory2(value,index,data) {

        this.setState({
            selectedVal2: value,
            slectectedSubCat:this.state.collectionSubCat[index]._id
        })

        console.log(this.state.slectectedSubCat + "-----" + JSON.stringify(this.state.collectionSubCat));

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

                var temp = response.uri;
                var url = temp.replace("file:///", " ");
                console.log("------" + url)
                //file:///Users/Sumit/Library/Developer/CoreSimulator/Devices/D3AF2C0F-4C7F-4BA8-9D71-0AC937D31511/data/Containers/Data/Application/26E3F68A-F3F4-4852-9100-8DA76A754C44/Documents/8C1B1915-97FA-442C-BA33-BA1E5CD311A6.jpg","rules":"I follow my rules none other then else"}
                this.setState({
                    imagePath: response.uri,
                    avatarSource: response,
                    imageSource: response.data
                });

                // this.setState({
                //     imagePath:response.uri,
                //     avatarSource: response,
                //     imageSource:response.data
                // });



            }
        });
    }

    check() {
        if (this.state.check == false) {
            this.setState({
                check: true,
                checkImage: selectImg
            });
        } else {
            this.setState({
                check: false,
                checkImage: check
            });
        }
    }

    render() {
        let animation = this.animatedValue.interpolate({
            inputRange: [0, .3, 1],
            outputRange: [-70, -10, 0]
        })

        let data = [{
            value: 'Athelete',
            id: '5b77cca465704e5472d97465'
        }, {
            value: 'Social',
            id: '5b7802108dbcef6addf30f07'
        }];

        let subData = [{
            value: 'Test',
            id: '5b7e9c0d8dbcef6addf30f11'
        }];

        return (
            <KeyboardAvoidingView style={[css.container, { backgroundColor: 'white' }]} behavior="padding" enabled>
                <Animated.View style={{ transform: [{ translateY: animation }], height: 60, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center', zIndex: 2 }}>
                    <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
                        {this.state.message}
                    </Text>
                </Animated.View>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Create Event' noBackBtn={false} />
                <ScrollView>
                    <Text style={styles.commentContent}> Create Event</Text>
                    <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            placeholder="Enter Event Title"
                            returnKeyType='next'
                            autoCorrect={false}
                            ref="title"
                            //onSubmitEditing={() => this.refs.email.focus()}
                            onChangeText={value => this.setState({ title: value })}
                            underlineColorAndroid="transparent"
                        />

                    </View>
                    <Text style={[styles.commentContent, { marginTop: 10, fontWeight: '400' }]}>Category</Text>
                    <View style={[css.topView, styles.top, { marginTop: 10 }]}>
                        <Dropdown inputContainerStyle={{ borderBottomColor: 'transparent' }} textColor='#000' baseColor="#000" pickerStyle={styles.pickerStyle} containerStyle={styles.ddView} data={this.state.categoryList} onChangeText={(value, index, data) => this.selectCaregory(value, index, data)} />
                    </View>

                    <Text style={[styles.commentContent, { marginTop: 10, fontWeight: '400' }]}>Sub-Category</Text>
                    <View style={[css.topView, styles.top, { marginTop: 10 }]}>
                        <Dropdown inputContainerStyle={{ borderBottomColor: 'transparent' }} textColor='#000' baseColor="#000" pickerStyle={styles.pickerStyle} containerStyle={styles.ddView} data={this.state.subCategoryList} onChangeText={(value, index, data) => this.selectCaregory2(value, index, data)} />
                    </View>

                    <View style={[css.topView, styles.top]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black' }]}
                            auto-correction={false}
                            ref={input => this.pickUpInput = input}
                            placeholderTextColor='black'
                            placeholder="Enter Location"
                            value={this.state.addressQuery}
                            onChangeText={this.onQueryChange}
                            onSubmitEditing={() => this.refs.email.focus()}
                            underlineColorAndroid={'transparent'}
                            returnKeyType='next'
                        />
                        {<TouchableOpacity style={{ height: '100%', width: 30, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                            <Image style={styles.editIcon} source={editIcon} resizeMode="center" />
                        </TouchableOpacity>}

                    </View>
                    <View style={styles.list}>
                        {this.state.flag ?
                            <FlatList
                                data={this.state.predictions}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1 }}
                            /> : null}

                    </View>
                    <TouchableOpacity style={[css.topView, styles.top]} onPress={this._showDateTimePicker}>
                        <Text style={[styles.commentContent, { fontSize: 13, fontWeight: '400', alignSelf: 'center', marginLeft: 7 }]}>{this.state.date}</Text>

                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        date={new Date()}
                        minimumDate={new Date()}
                        onCancel={this._hideDateTimePicker}
                    />
                    <TouchableOpacity style={[css.topView, styles.top]} onPress={this._showDateTimePicker2}>
                        <Text style={[styles.commentContent, { fontSize: 13, fontWeight: '400', alignSelf: 'center', marginLeft: 7 }]}>{this.state.time}</Text>

                    </TouchableOpacity>
                    <DateTimePicker2
                        isVisible={this.state.isDateTimePickerVisible2}
                        onConfirm={this._handleDatePicked2}
                        mode="time"
                        date={new Date()}
                        minimumDate={new Date()}
                        onCancel={this._hideDateTimePicker2}
                    />

                    <Text style={[styles.commentContent, { marginTop: 10, fontWeight: '400' }]}>Event Picture</Text>
                    <TouchableOpacity style={[css.topView, styles.top, { height: 80, marginTop: 10 }]} onPress={() => this.selectPhotoTapped()}>
                        <ImageBackground style={{ height: '100%', width: '100%' }} source={this.state.avatarSource} resizeMode="contain">


                        </ImageBackground>

                    </TouchableOpacity>
                    <TouchableOpacity style={[css.topView, { height: 20, marginTop: 10, left: 20, width: width - 40, flexDirection: 'row' }]} onPress={() => this.check()}>
                        <Image style={{ height: 15, width: 15, marginLeft: 0 }} source={this.state.checkImage} resizeMode='contain' />
                        <Text style={[styles.commentContent, { fontWeight: '400', alignSelf: 'center', marginLeft: 5 }]}>Make this event public</Text>
                    </TouchableOpacity>
                    <View style={[css.topView, styles.top, { height: 80 }]}>
                        <TextInput
                            style={[css.input, { flex: 1, color: 'black', height: '100%' }]}
                            auto-correction={false}
                            placeholderTextColor='black'
                            multiline={true}
                            placeholder="Event Details"
                            autoCorrect={false}
                            returnKeyType='done'
                            onChangeText={value => this.setState({ details: value })}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button onPress={() => this.onSave()} title='Create Your Squad' />
                    </View>
                    <View style={{ height: 50 }}></View>
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
    pickerStyle: {
        backgroundColor: colors.buttonBg, left: '5%', width: '90%'
    },

    ddView: {
        top: -12,
        width: '97%',
        marginLeft: 10,
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: "transparent"

    },

    commentContent: {
        fontSize: 12,
        marginLeft: 20,
        fontWeight: 'bold',
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
    primaryText: {
        color: '#222B2F',
        fontSize: 15,
        //marginBottom: 3,

    },
    list: {
        marginTop: 15,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20
    },

})
