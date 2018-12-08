import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const { width, height } = Dimensions.get('window');
const image1 = require('../images/dev1.jpg');
const image2 = require('../images/dev2.jpg');
const image3 = require('../images/dev3.jpg');
const filter = require('../images/filter.png');
const back = require('../images/back1.png');

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
        header:
        <View style={{ backgroundColor: "white", height: scaleHeight(70), justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={back} style={{ marginLeft: 5,marginTop:10,tintColor:"black",height:scaleHeight(20),width:scaleWidth(15) }} />
            </TouchableOpacity>
            <View style={{ height: scaleHeight(45),marginTop:10, borderWidth: scaleWidth(2), borderColor: "#E8E8E8", width: "70%", marginLeft: "5%", justifyContent: "center" }}>
                <TextInput
                value={`${navigation.state.params.search}`}
                    underlineColorAndroid="transparent"
                    placeholder="Search"
                    placeholderTextColor="#9C9C9C"
                    style={{ fontSize: normalizeFont(17),marginLeft:10  }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                <Image source={filter} style={{ marginLeft: 10,marginTop:10, }} />
            </TouchableOpacity>
        </View>,
        title: "Search",
        headerTitleStyle: { color: "black", alignSelf: "center" },
        headerStyle: {
            backgroundColor: "white"
        }

    });



    constructor(props) {
        super(props);
        this.state = {

        };
    }


    goSearch(param) {
        search = param
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={{ marginTop: 20, marginLeft: 15, fontSize: normalizeFont(18), color: "black" }}>248 results</Text>

                    <FlatList
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index}

                        renderItem={({ item }) =>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Description')} style={{ marginTop: 20, marginHorizontal: 5 }}>

                                <View style={{ flexDirection: "row", borderRadius: 5, alignItems: "center", backgroundColor: "white", marginHorizontal: 10 }}>

                                    <Image style={{ height: scaleHeight(120), flex: 1.2, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} source={item.image} />
                                    <View style={{ marginLeft: 10, flex: 2 }}>
                                        <Text style={{ width: scaleWidth(200), marginTop: 5, fontSize: normalizeFont(16) }}>{item.text}</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginRight: 5 }}>
                                            <Text>{item.name}</Text>
                                            <Text style={{ color: item.price == 'Free' ? 'red' : "#31B862", marginRight: 5, fontSize: normalizeFont(16) }}>{item.price}</Text>
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
        backgroundColor: '#FAFAFA'

    },

})
