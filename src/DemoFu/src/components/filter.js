import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const { width, height } = Dimensions.get('window');
const down = require('../images/down.png');


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Filters",
        headerStyle: {
            backgroundColor: "white"
        },
        headerTitleStyle: {
            color: "#595959",
            alignSelf: Platform.OS == "android" ? 'center' : null,
            marginLeft: Platform.OS == "android" ? -30 : null
        },

        headerTintColor: "#8E8E8E"
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
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                    <Text style={{ marginTop: 20, marginLeft: "10%", color: "#929292", fontSize: normalizeFont(16) }}>Sort by</Text>

                    <TouchableOpacity style={{ height: scaleHeight(60), width: '90%', alignSelf: "center", borderWidth: scaleWidth(2), borderColor: "#E7E7E8", marginTop: 10, borderRadius: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                        <Text style={{ marginLeft: "5%", color: "#686868", fontSize: normalizeFont(17) }}>Reviews</Text>

                        <Image source={down} style={{ marginRight: "5%", tintColor: "#9C999A", height: scaleHeight(10), width: scaleWidth(14) }} />

                    </TouchableOpacity>


                    <Text style={{ marginTop: 10, marginLeft: "10%", color: "#929292", fontSize: normalizeFont(16) }}>Pricing</Text>

                    <TouchableOpacity style={{ height: scaleHeight(60), width: '90%', alignSelf: "center", borderWidth: scaleWidth(2), borderColor: "#E7E7E8", marginTop: 10, borderRadius: 10, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                        <Text style={{ marginLeft: "5%", color: "#686868", fontSize: normalizeFont(17) }}>Paid</Text>

                        <Image source={down} style={{ marginRight: "5%", tintColor: "#9C999A", height: scaleHeight(10), width: scaleWidth(14) }} />

                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: scaleHeight(60),backgroundColor: "#00AD83", width: '90%', alignSelf: "center", marginTop: 20, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>

                        <Text style={{ color: "white", fontSize: normalizeFont(17) }}>Apply</Text>

                    </TouchableOpacity>


                

                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',




    },

})
