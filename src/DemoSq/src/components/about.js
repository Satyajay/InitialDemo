import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Switch,
    TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from './styles';// Styling page
import Header from "./Header"

export default class Settings extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }
    render() {
        return (
            <View>
                <Header onPress={() => this.props.navigation.goBack()} HeaderText='ABOUT' />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={css.wrapper}>
                        <Text style={css.aboutLbl}>ABOUT IVA</Text>
                        <Text style={css.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                    </View>
                    <View style={css.wrapper}>
                        <Text style={css.aboutLbl}>CONTACT US</Text>
                        <Text style={css.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                    </View>
                    <View style={css.tempView}>
                    </View>
                </ScrollView>
            </View>
        )
    }

}

