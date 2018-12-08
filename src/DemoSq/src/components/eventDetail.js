import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch, Modal,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import getDirections from 'react-native-google-maps-directions'

import css from '../common/styles';// Styling page
import Header from "../common/Header"
const profileImg = require('../images/profilepic.png');
const Apis = require('../utils/Api');
import colors from '../common/colors';
const etheleteBanner = require('../images/atheleticsbg.png');
const pin = require('../images/pin.png');
const calenderImg = require('../images/cal-2.png');
const timerimg = require('../images/timer2.png');



export default class createTeam extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            auth_key: null,
            createName: "avinash",
            profileImage: null,
            eventAddress: null,
            eventDate: "",
            eventId: null,
            userId: null,
            createdId:null,
            detail: "",
            animating:false,
            sourceLat:28.67677,
            sourceLong:77.78878,
            destinationLat:28.5677,
            destinationLong:77.2344,
            is_Join: false,
            eventTime: null,
            content_id: null
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    componentDidMount() {
        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
        });
        const { state } = this.props.navigation;
        if (state.params) {
            this.setState({
                is_Join: state.params.is_Join,
                eventId:state.params.eventId,
            });
            this.eventDetail(state.params.eventId);

        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );
        // this.getAllNotifications();
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    eventDetail(eventId) {
        this.setState({ animating: true });
        Apis.getAPI("event/description?id=" + eventId).then(response => {
            this.setState({ animating: false });
            if (response.status == 'success') {
                 this.setState({ animating: false });
                this.setState({
                    detail: response.data[0].eventDescription,
                    eventDate: response.data[0].eventDate,
                    eventTime: response.data[0].eventTime,
                    createName: response.data[0].createdName,
                    eventAddress: response.data[0].googleMapLocation,
                    profileImage: response.data[0].createdProfile,
                    createdId:response.data[0].createdId


                })
                this.getDestination(response.data[0].googleMapLocation)
            } else {
                this.setState({ animating: false });


            }
        });

    }


    eventDate(date) {
        var temp = date;
        if (typeof (temp) == "string") {
            temp = temp.split("T")[0];
        }
        return temp;
    }

    eventTime(time) {
        var temp = time;
        if (typeof (temp) == "string") {
            var hours = 0;
            var min = 0;
            // if(typeof(temp.split(":")[0]=="string")){
            hours = temp.split(":")[0].length < 2 ? ("0" + temp.split(":")[0]) : temp.split(":")[0];
            //}
            min = temp.split(":")[1].length < 2 ? ("0" + temp.split(":")[1]) : temp.split(":")[1]
            temp = hours + ":" + min;
        }
        return temp;
    }

    acceptInvitation(eventId) {
        var data = {
            userId: this.state.userId,
            eventId: this.state.eventId
        }
       console.log("------"+JSON.stringify(data));
        this.setState({ animating: true });
        Apis.patchApi(data, "/joinevent/accept").then(response => {
            this.setState({ animating: false });
            if (response.status == 'success') {
                this.props.navigation.navigate('Home')
            } else {
                this.setState({ animating: false });


            }
        });

    }
    handleGetDirections = () => {
        const data = {
            source: {
                latitude: this.state.sourceLat,
                longitude: this.state.sourceLong
            },
            destination: {
                latitude: this.state.destinationLat,
                longitude: this.state.destinationLong
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode 
                }
            ]
        }

        getDirections(data)
    }

    // getDestination

    getDestination(address){
        Apis.getDestination(address).then(response => {
            if(response.status=="OK"){
                this.setState({
                    destinationLat:response.results[0].geometry.location.lat,
                    destinationLong:response.results[0].geometry.location.lng,
                });
            }
           
           
        });
        // https://maps.googleapis.com/maps/api/geocode/json?address=Noida&key=AIzaSyBhbi7g9ToKONHuiwQvGiUyKcOFZfFkhT8

    }



    render() {


        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                <ImageBackground style={{ height: 200, width: '100%', backgroundColor: colors.headerColor }} source={etheleteBanner} resizeMode='cover'>
                    <Header onPress={() => this.props.navigation.goBack()} HeaderText='Accepted Participants' noBackBtn={false} />
                </ImageBackground>
                <View style={{ height: 35, width: '100%', marginTop: 0, flexDirection: 'row', flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.buttonBg }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 15, width: 15, alignSelf: 'center' }} source={calenderImg} resizeMode="contain" />
                        <Text style={{ color: '#fff', fontSize: 14, marginLeft: 5 }}>{this.eventDate(this.state.eventDate)}</Text>
                    </View>
                    <View style={{ height: 25, width: 1, backgroundColor: "#fff", alignSelf: 'center' }}></View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 15, width: 15, alignSelf: 'center' }} source={timerimg} resizeMode="contain" />
                        <Text style={{ color: '#fff', fontSize: 14, marginLeft: 5 }}>{this.eventTime(this.state.eventTime)}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0, height: '100%' }}>
                    <TouchableOpacity style={{ marginTop: 10, marginLeft: 20, height: 60, flexDirection: "row", justifyContent: "flex-start" }} onPress={() => this.props.navigation.navigate('CreateProfile',{
                        createdId:this.state.createdId
                    })}>
                        <Image source={profileImg} style={styles.commentImage} />
                        <View style={{ marginLeft: 10, height: 60, flexDirection: "column", justifyContent: "center" }}>
                            <Text style={{ marginLeft: 0, color: '#000', fontSize: 14 }}>Creator:</Text>
                            <Text style={{ marginLeft: 0, color: '#000', fontSize: 16, fontWeight: '600' }}>{this.state.createName}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, marginLeft: 20, color: '#000', fontSize: 25, fontWeight: '600' }}>Description</Text>
                    <Text style={{ marginTop: 7, marginLeft: 20, marginRight: 20, color: '#000', fontSize: 13, fontWeight: '300' }}>{this.state.detail ? this.state.detail : ""}</Text>
                    <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20, height: 30, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image style={{ height: 15, width: 15, alignSelf: 'center' }} source={pin} resizeMode="contain" />
                        <Text style={{ marginLeft: 5, alignSelf: 'center', color: '#000', fontSize: 14, fontWeight: '500' }}>{this.state.eventAddress}</Text>
                    </View>

                    <Text style={{ marginLeft: 5, marginRight: 20, color: colors.buttonBg, textAlign: 'right', textDecorationLine: 'underline', fontSize: 14, fontWeight: '500' }} onPress={this.handleGetDirections}>View on map</Text>

                </ScrollView>
                {/* textDecorationLine */}
                {/* <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => this.props.navigation.navigate('CreateFinalTeam')}>
                    <Text style={[css.buttonTitle, { color: '#ffcc00', fontSize: 14 }]}>Create Team</Text>
                </TouchableOpacity> */}

                {this.state.is_Join ? <View style={styles.button} activeOpacity={.8} >
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.buttonBg, justifyContent: 'center', borderRadius: 20 }} activeOpacity={.8} onPress={() => this.acceptInvitation()}>
                        <Text style={[css.buttonTitle, { color: '#fff', fontSize: 16, fontWeight: 'bold' }]}>Join</Text>
                    </TouchableOpacity>
                </View> : null}

                 <Modal
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.animating}>
          <View style={css.transaparentView}>
            <ActivityIndicatorExample
              animating={this.state.animating} />
          </View>
        </Modal>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    row: { flex: 1, width: '100%', flexDirection: 'row' },

    avatar: { marginLeft: 15, height: 44, width: 44, borderRadius: 23, alignSelf: 'center' },
    button2: { left: 20, marginBottom: 20, width: width - 40, marginTop: 20, height: 35, borderRadius: 20, backgroundColor: colors.buttonBg, flexDirection: 'row', justifyContent: "center" },

    button: { left: 20, marginBottom: 20, width: width - 40, marginTop: 20, height: 35, borderRadius: 20, flexDirection: 'row', justifyContent: "center" },
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
        fontSize: 13,
        fontWeight: '500',
        color: '#000',
        marginLeft: 5

    },

    profileImg:
    {
        marginTop: 10,
        width: 36,
        height: 36,
        borderRadius: 18
    },

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
    commentImage:
    {
        margin: 0,
        width: 50,
        alignSelf: 'center',
        marginLeft: 0,
        height: 50,
        borderRadius: 25
    },

})

