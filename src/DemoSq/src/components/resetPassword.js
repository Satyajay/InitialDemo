import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList,BackHandler
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
import ActiveButton from "./activeButton"
import InActiveButton from "./inActiveButton"
import css from './styles';// Styling page
import SubHeader from "./subHeader"
import Logo from "./logo"

export default class ResetPassowrd extends Component {

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });
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

    constructor(props) {
        super(props);
        this.state = {
            codesent: false,
            enterEmailLabel: "Enter your Email to reset your password",
            checkyourEmail: "Check your email",
            resendCodeMessage: "We've sent you an email to info@example.com.Click the link in the email to reset your password.",
            resendMessage1: "If you don't see the email, check other places like you junk,spam,social or other folders in your email client.",
            resetButton: "Reset Password ",
            resendMailButton: "Resend"
        };

    }
    sendCode() {
        this.setState({
            codesent: true,
        })
    }


    render() {

        return (
         <LinearGradient colors={['#6079ea', '#28cfdd']} style={css.background}>
        <ScrollView>
            <View style={css.container}>
            <SubHeader subHeader='FORGET PASSWORD'/>
            <Logo/>
            <View style={css.infoWrap}>
              <Text style={css.accountText}>We need your registered email address to send your password reset instructions. </Text>
            </View>
             <TextField
                  label='Email ID'
                  textColor='#fff'
                  tintColor='#fff'
                  baseColor='#fff'   
                  style={{fontFamily:'Montserrat-Regular',fontSize:14}}
                  containerStyle={styles.Tfwrapper}
                  labelTextStyle={{fontFamily:'Montserrat-Regular'}}
                />         
           <View style={{height:40}}></View>
             <ActiveButton onPress={() => alert('Work is in progress')} title='RESET PASSWORD' />
            <InActiveButton onPress={() => this.props.navigation.goBack()} title='BACK TO LOGIN' />    

          
          <View style={styles.container}>
            
          </View>
      </View>

         <View style={css.tempView}></View>

      </ScrollView >
       </LinearGradient>
      
        )
    }

}

const styles = StyleSheet.create({
    Tfwrapper:{
    //top:-20,
    height:40,
    marginTop:0,
    width:'80%',
    marginLeft :'10%',
    
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    marginTop:40,
    width:'80%',
    marginLeft:'10%',
    height: 40,
    borderBottomWidth: 1,
    // fontSize:12,
    borderBottomColor: "#CCC"
  },
});
