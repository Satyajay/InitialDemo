import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, ImageBackground,
} from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const { width, height } = Dimensions.get('window');
const image1 = require('../images/dev1.jpg');
const back = require('../images/back1.png');
const down = require('../images/down.png');
const up = require('../images/up.png');


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });


    constructor(props) {
        super(props);
        this.state = {
            show: "info",
            aboutCourse: "The complete course for Unity3D for Android and IOS devices",
            check: "",
            check1: false
        };
    }

    showDetails(param) {
        this.setState({
            show: param
        })
    }

    open(param) {
        this.setState({
            check: param
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={image1} style={{ height: scaleHeight(250), width: width }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image source={back} style={{ marginLeft: 20, marginTop: 20, height: scaleHeight(20), width: scaleWidth(15) }} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{ height: scaleHeight(60), borderBottomColor: "#ECECEC", borderBottomWidth: scaleWidth(1), width: width, flexDirection: "row", marginHorizontal: 50, alignItems: "center" }}>

                    <TouchableOpacity onPress={() => this.showDetails('info')} style={{ flex: 1, alignItems: "center", height: scaleHeight(60), justifyContent: "center", borderBottomColor: this.state.show == 'info' ? "#00ADDD" : null, borderBottomWidth: this.state.show == 'info' ? scaleWidth(2) : null }}>
                        <Text style={{ fontSize: normalizeFont(17), color: this.state.show == 'info' ? "#00ADDD" : "#8C8C8C", fontWeight: "bold" }}>INFO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.showDetails('outline')} style={{ flex: 1, alignItems: "center", height: scaleHeight(60), justifyContent: "center", borderBottomColor: this.state.show == 'outline' ? "#00ADDD" : null, borderBottomWidth: this.state.show == 'outline' ? scaleWidth(2) : null }}>
                        <Text style={{ fontSize: normalizeFont(17), color: this.state.show == 'outline' ? "#00ADDD" : "#8C8C8C", fontWeight: "bold" }}>OUTLINE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.showDetails('reviews')} style={{ flex: 1, alignItems: "center", height: scaleHeight(60), justifyContent: "center", borderBottomColor: this.state.show == 'reviews' ? "#00ADDD" : null, borderBottomWidth: this.state.show == 'reviews' ? scaleWidth(2) : null }}>
                        <Text style={{ fontSize: normalizeFont(17), color: this.state.show == 'reviews' ? "#00ADDD" : "#8C8C8C", fontWeight: "bold" }}>REVIEWS</Text>
                    </TouchableOpacity>


                </View>
                <ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false}>

                    {this.state.show == "info" ?

                        <View>

                            <View style={{ flexDirection: "row", marginLeft: 15 }}>
                                <Text style={{ fontSize: normalizeFont(18), width: '60%', color: "#575757" }}>{this.state.aboutCourse} </Text>

                                <TouchableOpacity style={{ height: scaleHeight(40), borderWidth: scaleWidth(1), borderColor: "#00ADDD", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: normalizeFont(19), color: "#00ADDD", marginHorizontal: 10 }}>ENROLL $10</Text>
                                </TouchableOpacity>

                            </View>

                            <Text style={{ marginTop: 5, color: "#888485", fontSize: normalizeFont(16), marginLeft: 15 }}>Ahmad Naser</Text>

                            <TouchableOpacity onPress={() => this.open("course description")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                                <Text style={{ color: "#888485", fontSize: normalizeFont(17), marginLeft: 15 }}>Course Description</Text>
                                <Image source={this.state.check == "course description" ? up : down} style={{ tintColor: "#888889", marginRight: 15, height: scaleHeight(9), width: scaleWidth(12) }} />
                            </TouchableOpacity>

                            <View style={{ height: scaleHeight(2), width: width, backgroundColor: "#E7E7E7", marginTop: 15 }} />

                            <TouchableOpacity onPress={() => this.open("course requirement")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ color: "#888485", fontSize: normalizeFont(17), marginLeft: 15 }}>What are the course requirements?</Text>
                                <Image source={this.state.check == "course requirement" ? up : down} style={{ tintColor: "#888889", marginRight: 15, height: scaleHeight(9), width: scaleWidth(12) }} />
                            </TouchableOpacity>

                            <View style={{ height: scaleHeight(2), width: width, backgroundColor: "#E7E7E7", marginTop: 15 }} />

                            <TouchableOpacity onPress={() => this.open("course result")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ color: "#888485", fontSize: normalizeFont(17), marginLeft: 15 }}>What am I going to get from this course?</Text>
                                <Image source={this.state.check == "course result" ? up : down} style={{ tintColor: "#888889", marginRight: 15, height: scaleHeight(9), width: scaleWidth(12) }} />
                            </TouchableOpacity>
                        </View>

                        : this.state.show == "outline" ?
                            <Text>Outline</Text>
                            : this.state.show == "reviews" ?
                                <Text>REVIEWS</Text>
                                : null
                    }


                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center"
    },

})
