import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
const image1 = require('../images/dev1.jpg');
const image2 = require('../images/dev2.jpg');
const image3 = require('../images/dev3.jpg');

const data = [
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "Free",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "$9",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
]

export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.profileInfo}`,
        headerBackTitle: null,
        headerTintColor: "#8E8E8E"
    });

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <FlatList

                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}

                        renderItem={({ item }) =>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Description')} style={styles.rowTouchableStyle}>

                                <View style={styles.rowViewStyle}>

                                    <Image style={styles.rowImageStyle} source={item.image} />
                                    <View style={styles.rowLabelContainerStyle}>
                                        <Text style={styles.rowLabelStyle}>{item.text}</Text>
                                        <View style={styles.rowBottomViewStyle}>
                                            <Text style={styles.nameStyle}>{item.name}</Text>
                                            <Text style={{ color: item.price == 'Free' ? 'red' : "#31B862", marginTop: scaleHeight(30), marginRight: scaleWidth(5), fontSize: normalizeFont(16) }}>{item.price}</Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>

                        }
                    />
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA"


    },
    rowTouchableStyle: {
        marginTop: scaleHeight(20), marginHorizontal: scaleWidth(5)
    },
    rowViewStyle: {
        flexDirection: "row", borderRadius: 5, alignItems: "center", backgroundColor: "white", marginHorizontal: normalizeFont(10)
    },
    rowImageStyle: {
        height: normalizeFont(120), flex: 1.2, borderTopLeftRadius: scaleWidth(5), borderBottomLeftRadius: scaleWidth(5)
    },
    rowLabelContainerStyle: {
        marginLeft: scaleWidth(10), flex: 2
    },
    rowLabelStyle: {
        width: scaleWidth(200), marginTop: scaleHeight(5), fontSize: normalizeFont(14)
    },
    nameStyle: {
        marginTop: scaleHeight(30), fontSize: normalizeFont(14)
    },
    rowBottomViewStyle: {
        flexDirection: "row", justifyContent: "space-between", marginTop: scaleHeight(10), marginRight: scaleWidth(5)
    },

})
