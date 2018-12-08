import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Animated, ImageBackground, AsyncStorage,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, StatusBar
} from 'react-native';
//import getDirections from 'react-native-google-maps-directions'
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import Header from "../common/Header"
import colors from '../common/colors';
import css from '../common/styles';
import Tabs from './topTab';
const Apis = require('../utils/Api');

const calenderImg = require('../images/calender.png');
const timerImg = require('../images/timer.png');
const profileImg = require('../images/profilepic.png');

export default class Events extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            upcomingEvents: [],
            previousEvents: [],
            userId: null,
        }
    }


    componentDidMount() {

        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
            this.getEvents(user_id)
        });


    }

    handleGetDirections = () => {
        const data = {
            source: {
                latitude: -33.8356372,
                longitude: 18.6947617
            },
            destination: {
                latitude: -33.8600024,
                longitude: 18.697459
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
            console.log("0" + temp.split(":")[1].length + "Time-----" + temp.split(":")[1]);
            min = temp.split(":")[1].length < 2 ? ("0" + temp.split(":")[1]) : temp.split(":")[1]
            temp = hours + ":" + min;
        }
        return temp;
    }

    getEvents(user_id) {
        this.setState({ animating: true });
        Apis.getAPI("/event/myevent?id=" + user_id).then(response => {
            this.setState({ animating: false });
            console.log("Events+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.setState({
                    upcomingEvents: this.state.upcomingEvents.concat(response.data.upcomingEvents),
                    previousEvents: this.state.previousEvents.concat(response.data.prevEvents)
                })
            } else {
                this.setState({ animating: false });


            }
        });

    }

    time(value) {
        var temp
        return temp;
    }

    _renderItem = ({ item }) => (
        // <TouchableOpacity style={styles.parentRow}  onPress={this.handleGetDirections} style={{ marginTop: 10, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", backgroundColor: '#f2f2f2' }}>
        <TouchableOpacity style={styles.parentRow} onPress={() => this.props.navigation.navigate('CreateTeam', {
            eventId: item._id,
            eventDate: item.startAt,
            eventTime: item.Kick_of_Time
        })} style={{ marginTop: 10, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", backgroundColor: '#f2f2f2' }}>
            <View style={css.roww}>
                <Image source={profileImg} style={styles.commentImage} />
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.commentContent}>{item.eventName}</Text>
                    <Text style={styles.address}>{item.googleMapLocation}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Image style={{ height: 15, width: 15, alignSelf: 'center' }} source={calenderImg} resizeMode="contain" />
                        <Text style={[css.time, { marginTop: 5, marginLeft: 5, opacity: 0.9, fontWeight: '400', color: 'black' }]}>{this.eventDate(item.startAt)}</Text>
                        <Image style={{ marginLeft: 15, height: 15, width: 15, alignSelf: 'center' }} source={timerImg} resizeMode="contain" />
                        <Text style={[css.time, { marginTop: 5, marginLeft: 5, opacity: 0.9, fontWeight: '400', color: 'black' }]}>{this.eventTime(item.Kick_of_Time)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );



    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header HeaderText='My Events' noBackBtn={true} />
                {/* <View style={{ height: 130, width: '100%', backgroundColor: colors.headerColor, justifyContent: 'center' }}>
                    <Image style={{ marginTop: 5, height: 70, width: 70, borderRadius: 35, alignSelf: 'center' }} source={profilePic} resizeMode="contain" />
                    <Text style={[css.screenName, { marginTop: 5, fontSize: 16, fontWeight: '400' }]}>John Doe</Text>
                </View> */}
                <Tabs>
                    <View title="UPCOMING" style={{ flex: 1, backgroundColor: 'white' }}>
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                            data={this.state.upcomingEvents}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}


                        />
                    </View>
                    <View title="PREVIOUS" style={{ flex: 1, backgroundColor: 'white' }}>
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                            data={this.state.previousEvents}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}


                        />
                    </View>
                    {/* <View title="ATTENDED" style={{ flex: 1, backgroundColor: 'white' }}>
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
                    </View> */}
                </Tabs>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parentRow: { marginTop: 10, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "column", backgroundColor: '#f2f2f2' },
    row: { flex: 1, width: '100%', flexDirection: 'row' },
    avatar: { marginLeft: 15, height: 44, width: 44, borderRadius: 23, alignSelf: 'center' },



    name: { marginLeft: 10, fontSize: 15, fontWeight: '400', alignSelf: 'center' },
    commentName: {
        marginTop: 3,
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },

    address: {
        fontSize: 11,
        //marginTop:5,
        color: '#000',
        opacity: 0.9,
        fontWeight: '300'
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
