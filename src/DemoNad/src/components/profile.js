import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const image1 = require('../images/menu_icon.png');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
const image2 = require('../images/dev2.jpg');
const image3 = require('../images/dev3.jpg');
const data = [
    {
        image: image3,
        text: "The Complete courses for Unity 3D for ios and android",
        price: "78%",
        name: "Continue Learning"
    },
    {
        image: image2,
        text: "Design & Photography",
        price: "",
        name: "Start Learning"
    },
    {
        image: image3,
        text: "Learn English",
        price: "",
        name: "Start Learning"
    },
    {
        image: image2,
        text: "Design & Photography",
        price: "",
        name: "Start Learning"
    },
    {
        image: image2,
        text: "Learn English",
        price: "",
        name: "Start Learning"
    },
    {
        image: image3,
        text: "Design & Photography",
        price: "",
        name: "Start Learning"
    },
]
export default class Login extends Component {
    static navigationOptions = ({ navigation }) => ({

        headerTitleStyle: { color: "black", alignSelf: "center" },
        headerStyle: {
            backgroundColor: "white",
        },
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                          <Image source={image1} />
                       </TouchableOpacity>,
        headerLeft: <TouchableOpacity onPress={() => navigation.navigate('LanguageScreen')}>
            <Image source={image1} />
        </TouchableOpacity>
    });
    constructor(props) {
        super(props);
        this.state = {
            myCoursesLabel: "MY COURSES",
            dashboardLabel: "DASHBOARD",
            show: "MY COURSES",
        };
    }
    switchEditableMode() {
        this.userNameField.focus();
    }

    showDetails(param) {
        this.setState({
            show: param
        })
    }


    render() {

        return (
            <View style={styles.container}>

                <View style={styles.topContainerStyle}>
                    <Image style={styles.profileImage} source={{ uri: "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png" }} />
                    <View style={styles.userNameViewStyles}>
                        <TextInput
                            placeholder="User's Name"
                            placeholderTextColor="#fff"
                            style={styles.userNameTextFeildStyles}
                            underlineColorAndroid="transparent"
                            ref={(userNameField) => this.userNameField = userNameField}
                        />
                        <TouchableOpacity onPress={() => this.switchEditableMode()} >
                            <Image style={styles.editImage} source={image1} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.internalTabViewStyle}>
                    <TouchableOpacity onPress={() => this.showDetails(this.state.myCoursesLabel)} style={{ flex: 1, alignItems: "center", height: scaleHeight(50), justifyContent: "center", borderBottomColor: this.state.show == this.state.myCoursesLabel ? "#00ADDD" : null, borderBottomWidth: this.state.show == this.state.myCoursesLabel ? scaleWidth(2) : null }}>
                        <Text style={{ fontSize: normalizeFont(17), color: this.state.show == this.state.myCoursesLabel ? "#00ADDD" : "#8C8C8C", fontWeight: "bold" }}>{this.state.myCoursesLabel}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.showDetails(this.state.dashboardLabel)} style={{ flex: 1, alignItems: "center", height: scaleHeight(50), justifyContent: "center", borderBottomColor: this.state.show == this.state.dashboardLabel ? "#00ADDD" : null, borderBottomWidth: this.state.show == this.state.dashboardLabel ? scaleWidth(2) : null }}>
                        <Text style={{ fontSize: normalizeFont(17), color: this.state.show == this.state.dashboardLabel ? "#00ADDD" : "#8C8C8C", fontWeight: "bold" }}>{this.state.dashboardLabel}</Text>
                    </TouchableOpacity>
                </View>

                <FlatList

                    data={data}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: width }}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) =>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Description')} style={styles.rowTouchableStyle}>

                            <View style={styles.rowViewStyle}>

                                <Image style={styles.rowImageStyle} source={item.image} />
                                <View style={styles.rowLabelContainerStyle}>
                                    <View style={styles.rowBottomViewStyle}>
                                        <Text style={styles.nameStyle}>{item.name}</Text>
                                        <Text style={{ color: "#000", marginRight: scaleWidth(5), fontSize: normalizeFont(12), fontWeight: 'bold' }}>{item.price}</Text>
                                    </View>
                                    <Text style={styles.rowLabelStyle}>{item.text}</Text>

                                </View>
                            </View>

                        </TouchableOpacity>

                    }
                />


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center",


    },
    topContainerStyle: {
        height: scaleHeight(150),
        backgroundColor: '#91DBF1',
        width: width,
        alignItems: 'center',
    },
    profileImage: {
        height: scaleHeight(80),
        width: scaleHeight(80),
        borderRadius: scaleHeight(40),
        top: scaleHeight(10)
    },
    userNameViewStyles: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    userNameTextFeildStyles: {
        height: scaleHeight(60), fontSize: normalizeFont(17)
    },
    editImage: {
        height: 20, width: 10
    },
    internalTabViewStyle: {
        height: scaleHeight(50), borderBottomColor: "#ECECEC", borderBottomWidth: scaleWidth(1), width: width, flexDirection: "row", alignItems: "center"
    },
    rowTouchableStyle: {
        marginTop: scaleHeight(20), marginHorizontal: scaleWidth(5)
    },
    rowViewStyle: {
        flexDirection: "row", alignItems: "center", backgroundColor: "white", marginHorizontal: normalizeFont(10), borderRadius: 10, borderColor: '#fff'
    },
    rowImageStyle: {
        height: normalizeFont(80), flex: 1.2, borderTopLeftRadius: scaleWidth(5), borderBottomLeftRadius: scaleWidth(5), borderRadius: 5
    },
    rowLabelContainerStyle: {
        marginLeft: scaleWidth(10), flex: 2, height: normalizeFont(80)
    },
    rowLabelStyle: {
        width: scaleWidth(200), fontSize: normalizeFont(14), marginTop: scaleHeight(20)
    },
    nameStyle: {
        fontSize: normalizeFont(12)
    },
    rowBottomViewStyle: {
        flexDirection: "row", justifyContent: "space-between", marginTop: scaleHeight(5), marginRight: scaleWidth(5)
    },

})
