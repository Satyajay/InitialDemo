import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView, Alert
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Header from "../common/Header";
import Button from '../common/buttons';
import css from '../common/styles';

export default class Value extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });


    constructor(props) {
        super(props);
        this.state = {
            mintLabel: "Value Page"
        };
    }

    valueAction() {
        Alert.alert('Coming Soon')
    }

    render() {
        return (
            <View style={styles.container}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Value' noBackBtn={true} />
                <Button onPress={() => this.valueAction()} title='COMING SOON' />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8',
    },
    mintStyle: {
        justifyContent: "center", alignItems: "center", height: scaleHeight(60), width: (width - 30), backgroundColor: "#2F5B94", marginTop: scaleHeight(30), borderRadius: scaleHeight(5),
    },
})
