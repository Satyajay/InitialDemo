import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch, Modal,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
let _ = require('underscore')
import css from '../common/styles';// Styling page
import Header from "../common/Header"
import colors from '../common/colors';
const profileImg = require('../images/profilepic.png');
const img = require('../images/7.png');
const check = require('../images/check.png');
const selectImg = require("../images/select.png");
const Apis = require('../utils/Api');

export default class createFinalTeam extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            searchTf: null,
            eventId: null,
            userId: null,
            animating: false,
            FlatListItems: [],
            selectedArray: [],
            searchedArray:[],
            auth_key: null,
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
        if (state.params) {
            this.setState({
                eventId: state.params.eventId
            })
        }
        AsyncStorage.getItem('user_id').then((user_id) => {
            this.setState({
                userId: user_id
            });
        })

        this.getUsers()
        // this.getAllNotifications();

    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    // url-   {{url}}/joinevent/create
    // request- {
    //     "userId":["5b6d6374f6d46a05516c7b91","5b6d6374f6d46a05516c7b91","5b6d6374f6d46a05516c7b91"],
    //     "eventId":"5b9662ff3cb15a5ed66d68ef"
    // }



    getUsers() {
        this.setState({ animating: true });
        Apis.getAPI("/user/list").then(response => {
            this.setState({ animating: false });
            console.log("Userssssss+++++++++++" + JSON.stringify(response));
            if (response.status == 'success') {
                this.setState({ animating: false });
                this.setState({
                    searchedArray:response.data,
                    FlatListItems: this.state.FlatListItems.concat(response.data),
                })
            } else {
                this.setState({ animating: false });


            }
        });

    }


    filter(inputData) {
        console.log(inputData);
        var filterData = inputData.toString()

        var evens = _.filter(this.state.FlatListItems, function (obj) {
            console.log("********************* " + obj.firstName);
            if (obj.firstName) {
                return obj.firstName.toLowerCase().indexOf(filterData.toLowerCase()) > -1
            }

        });
        this.setState({
            searchedArray: evens
        })
        console.log("********************* " + JSON.stringify(evens));
    }



    selectUsers(item, index) {
        let { FlatListItems } = this.state;
        let targetPost = FlatListItems[index];
        if (targetPost.deleted == false) {
            targetPost.deleted = true;
            this.state.selectedArray.push(item._id);
            this.setState({ FlatListItems: FlatListItems });
        } else {
            this.state.selectedArray.splice(index, 1);
            targetPost.deleted = false;
            this.setState({ FlatListItems: FlatListItems });
        }

        console.log("------------------" + JSON.stringify(this.state.selectedArray));

        //this.setState({unlikeImg:likeIcon});
        //this.props.navigation.navigate("FeedDetail");
    }


    sendInvite() {
        this.setState({ animating: true });
        var data = {
            "requestedUserId": this.state.userId,
            "eventId": this.state.eventId,
            "userId": this.state.selectedArray,
            "userMobileNo": "8130922812"
        };
        console.log(JSON.stringify(data))
        Apis.signUp(data, "joinevent/create").then(response => {
            if (response.status == "success") {
                this.setState({ animating: false });
               this.props.navigation.navigate('Events')
                console.log("%%%%%%%%%%%%%%%" + JSON.stringify(response));
                // this.callToast('OTP sent successfully', 'success');
                // this.setState({ animating: false });
            } else {
                console.log("%%%%%%%%%%%%%%%errrrrrrr" + JSON.stringify(response));
                // this.callToast(response.error.message, 'error');
                this.setState({ animating: false });

            }

        })


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

    _renderItem = ({ item, index }) => (
        <TouchableOpacity style={{ marginTop: 0, height: 55, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }} onPress={() => this.selectUsers(item, index)}>
            <Image source={profileImg} style={styles.profileImg} />
            <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                <Text style={styles.commentContent}>{item.firstName && item.firstName != "" ? item.firstName : item.mobileNo} {item.lastName ? item.lastName : ""}</Text>
            </View>
            {!item.deleted ? <Image style={{ marginTop: 14, height: 20, width: 20 }} resizeMode="contain" source={check} /> : <Image style={{ marginTop: 14, height: 20, width: 20 }} resizeMode="contain" source={selectImg} />}

        </TouchableOpacity>
    );


    render() {


        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Send Invite' noBackBtn={false} />
                <View style={{ marginTop: 7, height: 36, paddingLeft: 10, marginLeft: 20, width: width - 40, backgroundColor: '#f2f2f2', flexDirection: 'row' }}>
                    <TextInput
                        style={{ flex: 1, paddingLeft: 10, marginLeft: 0, fontSize: 12 }}
                        auto-correction={false}
                        placeholder="Search"
                        returnKeyType='search'
                        ref="search"
                        onChangeText={value => this.filter(value.toLowerCase())}
                        underlineColorAndroid="transparent"
                    />
                    <Image style={{ height: 20, width: 50, alignSelf: 'center' }} resizeMode="contain" source={img} />
                </View>
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


                    />

                </ScrollView>
                <TouchableOpacity style={styles.button} activeOpacity={.8} onPress={() => this.sendInvite()}>
                    <Text style={[css.buttonTitle, { color: '#fff', fontSize: 14 }]}>Invite</Text>
                </TouchableOpacity>

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
    button: { left: 20, marginBottom: 20, width: width - 40, marginTop: 20, height: 35, borderRadius: 20, backgroundColor: colors.buttonBg, flexDirection: 'row', justifyContent: "center" },
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
