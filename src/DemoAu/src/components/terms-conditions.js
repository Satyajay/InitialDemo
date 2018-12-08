import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList,
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton'
import Header from "../common/Header"

export default class TermsConditions extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,

    });


    constructor(props) {
        super(props);
        this.state = {
            workContent: "Lorem Ipsum is simply dummy been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimenbook.\n\nIt has survived not only five centuries, but also the leap into electronic Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.\n\nwhen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.\n\ndummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimenbook.",
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='Terms and Conditions' />
                <View style={styles.workWrap}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <Text style={styles.workprocess}>
                            {this.state.workContent}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8',
    },
    workWrap: {
        marginLeft: scaleWidth(20),
        marginRight: scaleWidth(20),
        borderRadius: scaleHeight(10),
        marginTop: scaleHeight(30),
        borderColor: 'red',
        height: '80%',
        elevation: 3,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#A9A9A9',
        backgroundColor: '#FFFFFF',

    },
    workprocess: {
        marginTop: scaleHeight(18),
        textAlign: 'justify',
        fontSize: normalizeFont(14),
        color: '#7B7B7B',
        marginLeft: scaleWidth(30),
        marginRight: scaleWidth(30),
        marginBottom: scaleHeight(20),
    },
})
