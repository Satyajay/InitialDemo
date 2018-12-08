import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch, Modal,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
const profileImg = require('../images/profilepic.png');
const Apis = require('../utils/Api');
import colors from '../common/colors';
const etheleteBanner = require('../images/atheleticsbg.png');
const calenderImg = require('../images/cal-2.png');
const timerimg = require('../images/timer2.png');
export default class createTeam extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
            auth_key: null,
            eventId: null,
            userId: null,
            eventDate: null,
            eventTime: null,
            content_id: null,
            count: 0,
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        this.setState({
            eventId: state.params.eventId,
            eventDate: state.params.eventDate,
            eventTime: state.params.eventTime,
        });
        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
            this.getParticipants(state.params.eventId, user_id);
        });

        // this.getAllNotifications();
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    getParticipants(eventId, user_id) {
        this.setState({ animating: true, eventId: eventId });
        console.log("/event/participants/?eventId=" + eventId + "&userId=" + user_id + "Userssssss+++++++++++");

        Apis.getAPI("/event/participants/?eventId=" + eventId + "&userId=" + user_id).then(response => {
            this.setState({ animating: false });
            if (response.status == 'success') {
                this.setState({ animating: false });
                this.setState({
                    count: response.data.length,
                    FlatListItems: response.data
                })
            } else {
                this.setState({ animating: false });


            }
        });

    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    bottom: 0,
                    height: 1.5,
                    width: width - 40,
                    alignSelf: 'center',
                    opacity: 0.4,
                    backgroundColor: 'gray',
                }}
            />
        );
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

            hours = temp.split(":")[0].length < 2 ? ("0" + temp.split(":")[0]) : temp.split(":")[0];
            //  console.log("0" + temp.split(":")[1].length+"Time-----"+temp.split(":")[1]);
            min = temp.split(":")[1].length < 2 ? ("0" + temp.split(":")[1]) : temp.split(":")[1]
            temp = hours + ":" + min;
        }
        return temp;
    }

    _renderItem = ({ item }) => (
        <View style={{ marginTop: 0, height: 55, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }}>
            <Image source={profileImg} style={styles.profileImg} />
            <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                <Text style={styles.commentContent}>{item.participantsName}</Text>
            </View>
        </View>
    );


    render() {


        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                <ImageBackground style={{ height: 200, width: '100%', backgroundColor: colors.headerColor }} source={etheleteBanner} resizeMode='cover'>
                    <Header onPress={() => this.props.navigation.goBack()} HeaderText='Accepted Participants' noBackBtn={false} />
                    <Text style={{ marginLeft: 20, marginTop: 100, color: '#fff', fontSize: 14 }}>{this.state.count} Participants</Text>
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
                    <Text style={{ marginLeft: 20, marginTop: 15, color: '#000', fontSize: 14 }}>Participants</Text>

                    <FlatList
                        extraData={this.state}
                        ref='flatlist'
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                        data={this.state.FlatListItems}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.idx}
                        inverted

                    />

                </ScrollView>
                {/* <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => this.props.navigation.navigate('CreateFinalTeam')}>
                    <Text style={[css.buttonTitle, { color: '#ffcc00', fontSize: 14 }]}>Create Team</Text>
                </TouchableOpacity> */}

                <View style={styles.button} activeOpacity={.8} >
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.buttonBg, justifyContent: 'center', borderRadius: 20 }} activeOpacity={.8} onPress={() => this.props.navigation.navigate('ChatDetails')}>
                        <Text style={[css.buttonTitle, { color: '#fff', fontSize: 14 }]} >Chat</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10 }}></View>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.buttonBg, justifyContent: 'center', borderRadius: 20 }} activeOpacity={.8} onPress={() => this.props.navigation.navigate('CreateFinalTeam', {
                        usersList: this.state.FlatListItems,
                        eventId: this.state.eventId
                    })}>
                        <Text style={[css.buttonTitle, { color: '#fff', fontSize: 14 }]}>Create Team</Text>
                    </TouchableOpacity>
                </View>
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

})
