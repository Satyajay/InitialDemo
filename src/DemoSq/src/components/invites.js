import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Animated, ImageBackground, AsyncStorage, Modal,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, StatusBar
} from 'react-native';
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


export default class Invites extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            acceptedList: [],
            pendingList: [],
            animating: false,
            rejectedList: [],
            FlatListItems: [{
                eventName: "T20 Corporate Cricket",
                address: 'Noida Stadium',
                eventDate: "2nd January, 2018",
                eventTime: '02:30 PM',
                profileImg: profileImg
            }, {
                eventName: "T20 Corporate Cricket",
                address: 'Noida Stadium',
                eventDate: "2nd January, 2018",
                eventTime: '02:30 PM',
                profileImg: profileImg
            }, {
                eventName: "T20 Corporate Cricket",
                address: 'Noida Stadium',
                eventDate: "2nd January, 2018",
                eventTime: '02:30 PM',
                profileImg: profileImg
            }, {
                eventName: "T20 Corporate Cricket",
                address: 'Noida Stadium',
                eventDate: "2nd January, 2018",
                eventTime: '02:30 PM',
                profileImg: profileImg
            }, {
                eventName: "T20 Corporate Cricket",
                address: 'Noida Stadium',
                eventDate: "2nd January, 2018",
                eventTime: '02:30 PM',
                profileImg: profileImg
            }, {
                eventName: "T20 Corporate Cricket",
                address: 'Noida Stadium',
                eventDate: "2nd January, 2018",
                eventTime: '02:30 PM',
                profileImg: profileImg
            }],
            userId: null,
        }
    }

    componentDidMount() {

        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
            this.getInvitations(user_id)
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

            hours = temp.split(":")[0].length < 2 ? ("0" + temp.split(":")[0]) : temp.split(":")[0];
            console.log("0" + temp.split(":")[1].length+"Time-----"+temp.split(":")[1]);
            min = temp.split(":")[1].length < 2 ? ("0" + temp.split(":")[1]) : temp.split(":")[1]
            temp = hours + ":"+min;
        }
        return temp;
    }
    getInvitations(user_id) {
        var data = {

        }
        this.setState({ animating: true });
        Apis.patchApi(data, "/joinevent/myinvitation/" + user_id).then(response => {
            this.setState({ animating: false });
            console.log(user_id+"invitations+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {

                this.setState({
                    pendingList: response.data.pending,
                    rejectedList: response.data.rejected,
                    acceptedList: response.data.accepted,
                });


            } else {
                this.setState({ animating: false });


            }
        });

    }


    acceptInvitation(eventId) {
        var data = {
            userId: this.state.userId,
            eventId: eventId
        }
       
        this.setState({ animating: true });
        Apis.patchApi(data, "/joinevent/accept").then(response => {
            this.setState({ animating: false });
            console.log("invitations+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.getInvitations(this.state.userId)
            } else {
                this.setState({ animating: false });


            }
        });

    }


    rejectInvitation(eventId) {
        var data = {
            userId: this.state.userId,
            eventId: eventId
        }
        console.log(JSON.stringify(data))
        this.setState({ animating: true });
        Apis.patchApi(data, "/joinevent/reject").then(response => {
            this.setState({ animating: false });
            console.log("invitations+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.getInvitations(this.state.userId)

            } else {
                this.setState({ animating: false });


            }
        });

    }



  

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.parentRow} onPress={()=>this.props.navigation.navigate('EventDetail',{
            eventId:item._id,
            is_Join:true,
        })}>
            <View style={css.roww}>
                <Image source={profileImg} style={styles.commentImage} />
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.commentContent}>{item ? item.eventName : ""}</Text>
                    <Text style={styles.address}>{item ? item.googleMapLocation : ""}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Image style={{ height: 15, width: 15, alignSelf: 'center' }} source={calenderImg} resizeMode="contain" />
                        <Text style={[css.time, { marginTop: 5, marginLeft: 5, opacity: 0.9, fontWeight: '400', color: 'black' }]}>{this.eventDate(item.startAt)}</Text>
                        <Image style={{ marginLeft: 15, height: 15, width: 15, alignSelf: 'center' }} source={timerImg} resizeMode="contain" />
                        <Text style={[css.time, { marginTop: 5, marginLeft: 5, opacity: 0.9, fontWeight: '400', color: 'black' }]}>{this.eventTime(item.Kick_of_Time)}</Text>
                    </View>
                </View>
            </View>
            <View style={css.btnWrapper}>
                <TouchableOpacity style={css.applyBtn} onPress={() => this.acceptInvitation(item._id)}>
                    <Text style={css.applyLbl}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.cancelBtn} onPress={() => this.rejectInvitation(item._id)}>
                    <Text style={css.applyLbl}>Reject</Text>
                </TouchableOpacity>

            </View>



        </TouchableOpacity>
    );

    _renderItem2 = ({ item }) => (
        <TouchableOpacity style={styles.parentRow} onPress={()=>this.props.navigation.navigate('EventDetail',{
            eventId:item._id,
            is_Join:false,
        })}>
            <View style={css.roww}>
                <Image source={profileImg} style={styles.commentImage} />
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={styles.commentContent}>{item ? item.eventName : ""}</Text>
                    <Text style={styles.address}>{item ? item.googleMapLocation : ""}</Text>
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
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Invites' noBackBtn={false} />
                <Tabs>
                    <View title="ACCEPTED" style={{ flex: 1, backgroundColor: 'white' }}>
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                            data={this.state.acceptedList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={this._renderItem2}
                            keyExtractor={item => item.idx}

                        />
                    </View>
                    <View title="DECLINED" style={{ flex: 1, backgroundColor: 'white' }}>
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                            data={this.state.rejectedList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={this._renderItem2}
                            keyExtractor={(item, index) => index}


                        />
                    </View>
                    <View title="PENDING" style={{ flex: 1, backgroundColor: 'white' }}>
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                            data={this.state.pendingList}
                            ItemSeparatorComponent={this.FlatListItemSeparator}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}

                        />
                    </View>
                </Tabs>
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
    commentContent: {
        fontSize: 13,
        marginTop: 10,
        color: '#000',

    },

    address: {
        fontSize: 11,
        //marginTop:5,
        color: '#000',
        opacity: 0.9,
        fontWeight: '300'
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
//    9795555651

// 12345678