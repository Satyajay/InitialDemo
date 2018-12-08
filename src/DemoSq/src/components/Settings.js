import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
const headerBg = require("../images/headerImg.png");
const backIcon = require("../images/backIcon.png");
import css from './styles';// Styling page
import Header from "./Header"
export default class Settings extends Component {

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });


    constructor(props) {
        super(props);
        this.state = {
            value: true
        };
    }
    test(){
        this.setState( {value: !this.state.value})
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
            <Header onPress={()=>this.props.navigation.goBack()} HeaderText='SETTINGS' />
            <ScrollView showsVerticalScrollIndicator={false}>
           <Text style={css.configueLbl}>CONFIGURATION</Text>
              <View style={css.switchContainer}>
                <Text style={css.enableText}>Enable Audio</Text>
                 <Switch
                 disabled={false}
                 onTintColor='#607EE7'
                 thumbTintColor='#fff'
                 style={css.Switch}
                 value={ this.state.value }
                    onValueChange={
                    this.test.bind( this )
                    }
                   />
              </View>
                </ScrollView>
                </View>
          
        )
    }

}


