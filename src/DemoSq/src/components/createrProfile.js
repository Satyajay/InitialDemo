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
            fname:null,
            lname: null,
            mobile: null,
            email: null,
            userId: null,
        }
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        this.getProfile(state.params.createdId)


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





    render() {

        return (
            <View style={{ height:'100%', width:'100%' }}>
                <View style={[styles.wrapper, { marginTop: 0 }]} >
                    <Header onPress={() => this.props.navigation.goBack()} HeaderText='Profile' noBackBtn={false} />
                    <View style={styles.centerView}>
                        <Image style={styles.circularImage} source={profileImg} resizeMode='contain' />
                        <Text style={styles.topLbl}>{this.state.fname}</Text>

                    </View>
                </View>

                <View style={{ marginTop: 20, height: 30, marginBottom: 0, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }}>
                    <Image source={profileImg} style={{
                        height:24, width:24, borderRadius:12, alignSelf:"center"
                    }} />
                        <Text style={{marginLeft:15, alignSelf:'center', fontSize:14, color:"#000"}}>{this.state.fname} {this.state.lname}</Text>
                </View>

                 <View style={{ marginTop: 0, height: 55, marginBottom: 0, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }}>
                    <Image source={profileImg} style={{
                        height:24, width:24, borderRadius:12, alignSelf:"center"
                    }} />
                        <Text style={{marginLeft:15, alignSelf:'center', fontSize:14, color:"#000"}}>{this.state.mobile}</Text>
                </View>
              <View style={[css.line,{backgroundColor:"#000", marginLeft:20,  width: width - 40,}]}></View>
                 <View style={{ marginTop: 0, height: 55, marginBottom: 0, left: 20, width: width - 40, flexDirection: "row", justifyContent: 'flex-start' }}>
                    <Image source={profileImg} style={{
                        height:24, width:24, borderRadius:12, alignSelf:"center"
                    }} />
                        <Text style={{marginLeft:15, alignSelf:'center', fontSize:14, color:"#000"}}>{this.state.email}</Text>
                </View>
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
    title: { marginLeft: 10, alignSelf: 'center', fontSize: 13, fontWeight: '600', color: 'white' },
    wrapper: { height: 220, width: '100%', backgroundColor: colors.buttonBg },
    centerView: { height: 150, width: "100%", alignSelf: 'center', backgroundColor: colors.buttonBg },
    circularImage: { height: 100, width: 100, borderRadius: 50, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    topLbl: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: "#fff", textAlign: 'center' },
    bottomLbl: { fontSize: 11, fontWeight: '500', color: colors.buttonBg, textAlign: 'center' }

})
//    9795555651

// 12345678