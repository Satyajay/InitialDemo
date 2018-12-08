import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const { width, height } = Dimensions.get('window');
const filter = require('../images/filter.png');
const back = require('../images/back1.png');

const data = [
    {
        title: "development",
        color: "green"
    },
    {
        title: "business"
    },
    {
        title: "design"
    },
    {
        title: "math"
    },
    {
        title: "language"
    },
]




export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:
        <View style={{ backgroundColor: "white", height: scaleHeight(70), justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
          
            <View style={{ height: scaleHeight(45),marginTop:scaleHeight(20), borderWidth: 2, borderColor: "#E8E8E8", width: "70%", marginLeft: "5%", justifyContent: "center" }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Search"
                    placeholderTextColor="#9C9C9C"
                    style={{ fontSize: normalizeFont(17),marginLeft:10 }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                <Image source={filter} style={{ marginLeft: 10,marginTop:10}} />
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
        this.props.navigation.navigate('SearchResult', { search: param })
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={{ marginLeft: 40, marginTop: 20, fontSize: normalizeFont(21), fontWeight: "bold", color: "#575757" }}>Popular Searches</Text>
                    <FlatList

                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index}

                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.goSearch(item.title)}>
                                <Text style={{ marginLeft: 40, marginTop: 20, fontSize: normalizeFont(20), color: item.color == "green" ? "#00A776" : "#9B9B9B" }}>{item.title}</Text>
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
