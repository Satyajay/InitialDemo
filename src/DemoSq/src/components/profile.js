import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Header from "../common/Header"
import css from './styles';// Styling page
import { TextField } from 'react-native-material-textfield';
const mark = require("../images/profilepic.png");
import ImagePicker from 'react-native-image-picker';


export default class Settings extends Component {

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });


    constructor(props) {
        super(props);
        this.state = {
            profilePic:mark
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
    

selectPhotoTapped() {
    // this.props.test();
    const options = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
         this.setState({
            profilePic:response.uri
         });
   

        
      }
    });
  }

    render() {

        return (
     <View resizeMode="cover">
          <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Profile'  noBackBtn={true}/>
       
            <ScrollView showsVerticalScrollIndicator={false}>
             <View style={css.prowrapper}> 
                <View style={css.picWrapper}>
                   <Image style={css.profilepIc} source={this.state.profilePic}/>        
                </View>
                <Text style={css.profilebuttonText}>Change profile photo</Text>   
                <TextField
                  label='Name'
                  textColor='#000'
                  tintColor='#000'
                  baseColor='#000'
                  value='Steven Gibbens'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={css.Tfwrapper}
                  labelTextStyle={{fontFamily:'Montserrat-Regular'}}
                  
                />

               <TextField
                  label='Email Address'
                  textColor='#000'
                  tintColor='#000'
                  baseColor='#000'
                  value='steve.gibbens@abcinc.com'
                  style={{fontFamily:'Montserrat-Regular'}}
                  containerStyle={css.Tfwrapper}
                  labelTextStyle={{fontFamily:'Montserrat-Regular'}}
                  
                />       

                <TextField
                  label='Contact Number'
                  textColor='#000'
                  tintColor='#000'
                  style={{fontFamily:'Montserrat-Regular'}}
                  baseColor='#000'
                  keyboardType={'phone-pad'}  
                  value='14088000000'
                  labelTextStyle={{fontFamily:'Montserrat-Regular'}}                  
                  containerStyle={css.Tfwrapper}
                />
                 <TextField
                  label='URL'
                  textColor='#000'
                  tintColor='#000'
                  style={{fontFamily:'Montserrat-Regular'}}
                  labelTextStyle={{fontFamily:'Montserrat-Regular'}}                  
                  baseColor='#000'
                  value='www.abcinc.com'
                  containerStyle={css.Tfwrapper}
                />
             </View>
             <View style={css.tempView}></View>
         
            </ScrollView>
          </View>
        )
    }

}

const styles = StyleSheet.create({
   
   
   

    
})
