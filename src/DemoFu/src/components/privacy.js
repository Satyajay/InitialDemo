import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler,Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
const APIs = require( '../utils/Api');

export default class Privacy extends Component {

     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
        };
    }

    componentWillMount() {
        console.log("comp will mount");
        let details = {
            'type': '2',
        };
        this.setState({animating: true});
        APIs.privacyPolicy(details).then(data => {
            console.log(data);
            if(data.status == '1'){
              console.log(data.message);
              this.setState({animating: false});
            }else{
              console.log(data.message);
              this.setState({animating: false});
            }
        });
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
            <View style={{backgroundColor:'#fff'}}>
               <Modal
                transparent={true}
                onRequestClose={() => null} 
                visible={this.state.animating}>
                  <View style={css.transaparentView}>
                    <ActivityIndicatorExample
                    animating = {this.state.animating}/>
                 </View>
              </Modal>
           <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Privacy Policy' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={css.aboutLbl}>1.Ownership and License</Text>
                <Text style={css.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                <Text style={css.aboutLbl}>2.Permitted and Prohibited Uses</Text>
                <Text style={css.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

           
           
            <View style={css.tempView}>
                </View>
            </ScrollView>
          </View>
        )
    }

}

