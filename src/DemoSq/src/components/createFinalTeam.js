import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch, Modal,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
import colors from '../common/colors';
const profileImg = require('../images/profilepic.png');
const check = require('../images/check.png');
const selectImg = require("../images/select.png");
let _ = require('underscore')

const Apis = require('../utils/Api');

export default class createFinalTeam extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            searchTf: null,
            FlatListItems: [],
            searchedArray: [],
            selectedArray: [],
            auth_key: null,
            userId: null,
            eventId:null,
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
        const { state } = this.props.navigation;
        this.setState({
            FlatListItems: state.params.usersList,
            searchedArray: state.params.usersList,
            eventId:state.params.eventId
            // eventDate: state.params.eventDate,
            // eventTime: state.params.eventTime,
        });
        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
        });
        // this.getAllNotifications();

    }

    createTeam() {
        var data = {
            userId:this.state.userId,
            eventId:this.state.eventId,
            teamName:this.state.searchTf,
            teamMembers:this.state.selectedArray,
            
        };
        console.log("----------" + JSON.stringify(data))
        Apis.signUp(data, "team/create").then(response => {
            console.log("----------" + JSON.stringify(response))
            if (response.status == "success") {
                
                this.setState({ animating: false, });
                console.log("Team has been created successfully");
            } else {

                this.setState({ animating: false });
               


            }

        })
    }

    filter(inputData) {
        console.log(inputData);
        var filterData = inputData.toString()

        var evens = _.filter(this.state.FlatListItems, function (obj) {
            console.log("********************* " + obj.firstName);
            if (obj.participantsName) {
                return obj.participantsName.toLowerCase().indexOf(filterData.toLowerCase()) > -1
            }

        });
        this.setState({
            searchedArray: evens
        })
        console.log("********************* " + JSON.stringify(evens));
    }


    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }




    getAllNotifications() {
        this.setState({ animating: true });
        var data = {
            auth_key: this.state.auth_key,
            offset: 0,
            limit: 20
        };
        Apis.postAPI("getmynotifications.json", data).then(data => {

            if (data.status == '1') {
                console.log("+Get all Notifications------" + JSON.stringify(data));

                this.setState({
                    animating: false,
                    FlatListItems: data.commented_result,
                    commentCount: data.count_feeds
                });
            } else {
                console.log(data.message);
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

    // <View style={{ marginTop: 0, height: 55, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }}>
    //     <Image source={profileImg} style={styles.profileImg} />
    //     <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
    //         <Text style={styles.commentContent}>{item.username}</Text>
    //     </View>
    //     <Image style={{marginTop:14,height:20, width:20}} resizeMode="contain" source={check}/>
    // </View>

    selectUsers(item, index) {
        let { searchedArray } = this.state;
        let targetPost = searchedArray[index];
        if (targetPost.isAccepted == true) {
            targetPost.isAccepted = false;
            this.state.selectedArray.push(item.participants);
            this.setState({ searchedArray: searchedArray });
        } else {
            this.state.selectedArray.splice(index, 1);
            targetPost.isAccepted = true;
            this.setState({ searchedArray: searchedArray });
        }

        console.log("------------------" + JSON.stringify(this.state.selectedArray));

        //this.setState({unlikeImg:likeIcon});
        //this.props.navigation.navigate("FeedDetail");
    }



    _renderItem = ({ item, index }) => (
        <TouchableOpacity style={{ marginTop: 0, height: 55, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }} onPress={() => this.selectUsers(item, index)}>
            <Image source={profileImg} style={styles.profileImg} />
            <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                <Text style={styles.commentContent}>{item.participantsName}</Text>
            </View>
            {item.isAccepted ? <Image style={{ marginTop: 14, height: 20, width: 20 }} resizeMode="contain" source={check} /> : <Image style={{ marginTop: 14, height: 20, width: 20 }} resizeMode="contain" source={selectImg} />}

        </TouchableOpacity>

    );


    render() {


        return (
            <View style={{ backgroundColor: '#fff', height: '100%', width: '100%' }}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Create Team' noBackBtn={false} />
                <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 13, fontWeight: '400' }}>Team Name</Text>
                <TextInput
                    style={{ marginTop: 7, height: 36, paddingLeft: 10, marginLeft: 20, width: width - 40, backgroundColor: '#f2f2f2', fontSize: 12 }}
                    auto-correction={false}
                    placeholder="Enter Team Name"
                    keyboardType={'email-address'}
                    returnKeyType='search'
                    ref="search"
                    onChangeText={value => this.setState({searchTf:value})}
                    underlineColorAndroid="transparent"
                />

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0, height: '100%' }}>
                    <FlatList
                        extraData={this.state}
                        ref='flatlist'
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
                        data={this.state.searchedArray}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index}
                        inverted

                    />

                </ScrollView>
                <View style={{ left: 20, width: width - 40, marginBottom: 20, height: 35, flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => this.props.navigation.navigate('Invites')}>
                        <Text style={[css.buttonTitle, { color: '#fff', fontSize: 14 }]}>Next Team</Text>
                    </TouchableOpacity>
                    <View style={{ width: 20 }} />
                    <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => this.createTeam()}>
                        <Text style={[css.buttonTitle, { color: '#fff', fontSize: 14 }]}>Finish</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

}


const styles = StyleSheet.create({
    row: { flex: 1, width: '100%', flexDirection: 'row' },

    avatar: { marginLeft: 15, height: 44, width: 44, borderRadius: 23, alignSelf: 'center' },
    button: { flex: 1, borderRadius: 20, backgroundColor: colors.buttonBg, flexDirection: 'row', justifyContent: "center" },
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
