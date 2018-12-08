import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Log in",
        headerStyle: {
            backgroundColor: "white"
        },
        headerTitleStyle: {
            alignSelf: "center",
            marginLeft: Platform.OS == "android" ? -30 : 0
            
        },

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

               <Text>Messages</Text>
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
