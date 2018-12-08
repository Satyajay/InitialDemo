import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput,Switch,AsyncStorage, TouchableOpacity, ImageBackground, Animated,Alert,Modal, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex=/^[a-zA-Z ]+$/;
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-picker';
import css from '../common/styles';
import Button from '../common/buttons'
import colors from '../common/colors'
const mailActive = require("../images/mail_selected.png");
const mailinActive = require("../images/mail_unselected.png");
const passActive = require("../images/password_selected.png");
const passinActive = require("../images/password_unselected.png");
const profilePic = require("../images/profile_pic_placeholder.png");
const addPic = require("../images/add_pic.png");
const feedIcon = require("../images/my-feeds.png");
const notiIcon = require("../images/notifications.png");
const contactIcon = require("../images/contact-us.png");
const privacyIcon = require("../images/privacy-policy.png");
const termsIcon = require("../images/terms-&-conditions.png");
const logoutIcon = require("../images/logout.png");
const APIs = require( '../utils/Api');
let responseData={};
import { RNS3 } from 'react-native-aws3';
let profileImage= "";
let Auth_key="";


export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
         headerBackTitle: null,
            title: "Menu",
            headerStyle: {
            backgroundColor: '#272460',
            borderBottomColor: 'transparent',
          },

         headerTitleStyle: {
            fontSize: 18,
            color:'#fff',
            alignSelf:'center',
            fontWeight:'bold'
          }
       });


   
       state = {
            modalVisible: false,
            avatarSource:profilePic,
            animating: false,
            user_id:null,
            Auth_key:null,
            is_Profile:false
        };


    componentDidMount() {
       AsyncStorage.getItem('auth_key').then((Auth_key) => {   
        // Auth_key=Auth_key;
         if(Auth_key!=null){
           this.setState({Auth_key:Auth_key});
          this.getProfile();
         }
         
        });
       //this.getProfile();
    }

    getProfile(){
        AsyncStorage.getItem('user_id').then((user_id) => {   
          this.setState({user_id:user_id});        
        });
        
     AsyncStorage.getItem('auth_key').then((Auth_key) => {   
       Auth_key= Auth_key;
        let details = {
            auth_key:Auth_key,
            other_user_id:this.state.user_id
        };
       // this.setState({animating: true});
        APIs.signUp(details,'getUserProfile.json').then(data => {
            console.log("++++++"+JSON.stringify(data));
            if(data.result_data.profile_pic!=undefined &&data.result_data.profile_pic!=null&&data.result_data.profile_pic!=""){
              profileImage=data.result_data.profile_pic;
             this.setState({
              avatarSource: data.result_data.profile_pic,
              is_Profile:true,
              value:true,
              animating:false
            });
            }
            if(data.status == '1'||data.status == 1){
              console.log(data.message);
              this.setState({animating: false});
               this.setState({
                 name: data.result_data.full_name,
                 
                });
               responseData=data.result_data;
            }else{
              console.log(data.message);
              this.setState({animating: false});
            }
        });
  });
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

   this.setState({animating: false});
          let source = { uri: response.uri };
                const file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: response.uri,
          name: new Date().getTime()+".png",
          type: "image/png"
        }

        const options = {
         // keyPrefix: "uploads/",
          bucket: "profileimagerx",
          region: 'us-east-1',
          accessKey: "AKIAIFY5N6QSVAAHGO7Q",
          secretKey: "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",
          successActionStatus: 201
        }

        RNS3.put(file, options).then(response => {
          if (response.status !== 201)
           {
              throw new Error("Failed to upload image to S3");
           }
           profileImage=response.body.postResponse.location;
           this.setState({
          avatarSource: response.body.postResponse.location,
          is_Profile:true
        });
        this.updateProfilePic();
       
        });
        
      }
    });
  }


  updateProfilePic (){
      this.setState({animating: true});
     AsyncStorage.getItem('auth_key').then((Auth_key) => {   
      var data={
        profile_pic:profileImage,
        auth_key:Auth_key,
        full_name:this.state.name
      };
    APIs.signUp2(data,'update_profile.json').then(response => {
      if(response.status==1||response.status=="1"){
        console.log("response-----"+JSON.stringify(response));
         this.setState({animating: false});
      }else{
         this.setState({animating: false});
         this.callToast(response.message,'error')
         // alert(response.message);
      }
    })
     });
       
  

  }
       
       test(){
        this.setState( {value: !this.state.value})
       }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    logOut(){
    AsyncStorage.removeItem('auth_key')
    this.props.navigation.navigate('Login');
    this.setState({modalVisible: false});
    
  }
  
  gotoMyfeeds(){
     AsyncStorage.getItem('auth_key').then((Auth_key) => {   
         Auth_key=Auth_key;
         if(Auth_key!=null){
          this.props.navigation.navigate('MyFeeds')
         }else{
            this.callToast("You are not logged in",'error')
            //alert("You are not logged in");
          }
        });
   
  }

  goTocontactUs(){
      AsyncStorage.getItem('auth_key').then((Auth_key) => {  
         if(Auth_key!=null){ 
           this.props.navigation.navigate('ContactUs');
         }else{
            this.callToast("You are not logged in",'error')      
         }
      });
  }

  signout(){
    AsyncStorage.getItem('auth_key').then((Auth_key) => {  
         if(Auth_key!=null){ 
          this.setModalVisible(!this.state.modalVisible);      
         }else{
            this.props.navigation.navigate('Login');
           // alert("You are not logged in");           
         }
      });
  }


    render() {

        return (
            <View style={styles.container}>
               <Modal
                transparent={true}
                onRequestClose={() => null} 
                visible={this.state.animating}>
                  <View style={css.transaparentView}>
                    <ActivityIndicatorExample
                    animating = {this.state.animating}/>
                 </View>
              </Modal>
             {/*<View style={styles.profilePicView}></View>*/}
             {              
              !this.state.is_Profile?<ImageBackground imageStyle={css.border} style={[css.dpWrap,styles.profilePicView]} source={this.state.avatarSource}>
                {
                    this.state.Auth_key?<TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>:null
                }
                </ImageBackground>:null
             }
              {              
              this.state.is_Profile?<ImageBackground imageStyle={css.border} style={[css.dpWrap,styles.profilePicView]} source={{uri:this.state.avatarSource}}>
                    <TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>
                </ImageBackground>:null
             }
             {
             this.state.Auth_key? <Text style={styles.nameLbl}>{this.state.name}</Text>:null
             }
             {
               this.state.Auth_key?<TouchableOpacity  onPress={() => this.props.navigation.navigate('MyProfile',{
                is_user:true,
                response:responseData,
                callBack:this.getProfile.bind(this)
                })}>
              <Text style={styles.viewLbl}>View Profile</Text>
            </TouchableOpacity>:null
             }  
              <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={{flex:1, height:'100%', width:'100%', marginTop:20, backgroundColor:'#fff'}}>
                   <TouchableOpacity style={styles.row} onPress={() => this.gotoMyfeeds()}>     
                    <Image style={styles.leftIcon} source={feedIcon}/>         
                      <Text style={styles.title}>My Feeds</Text>
                  </TouchableOpacity>                  
                    <View style={styles.row}>
                       <Image style={styles.leftIcon} source={notiIcon}/>            
                      <Text style={styles.title}>Notifications</Text>   
                      <View style={{flex:1, flexDirection:'row',justifyContent:'flex-end', alignItems:'flex-end'}}>
                          <Switch
                          disabled={false}
                          onTintColor= {colors.buttonBg}
                          thumbTintColor='#FFF'
                          style={[css.Switch]}
                          value={ this.state.value }
                              onValueChange={
                          this.test.bind( this )
                          }
                        />      
                        </View>
                                
                  </View>
                   <TouchableOpacity style={styles.row} onPress={() => this.goTocontactUs()}>
                      <Image style={styles.leftIcon} source={contactIcon}/>      
                      <Text style={styles.title}>Contact Us</Text>                      
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Privacy')}>
                       <Image style={styles.leftIcon} source={privacyIcon}/>           
                      <Text style={styles.title}>Privacy Policy</Text>                      
                 </TouchableOpacity>
                  <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Terms')}>
                       <Image style={styles.leftIcon} source={termsIcon}/>                                         
                      <Text style={styles.title}>Terms & Conditions</Text>                      
                  </TouchableOpacity>
                   <TouchableOpacity style={styles.row}
                            onPress={() => {
                           this.signout()
                            }}>
                       <Image style={styles.leftIcon} source={logoutIcon}/>  
                       {
                       this.state.Auth_key!=null?<Text style={styles.title}>Logout</Text>:null             
                       }                               
                       {
                         this.state.Auth_key==null?<Text style={styles.title}>Login</Text>:null 
                       }        
                    </TouchableOpacity>                                                                 
             </ScrollView>
              <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.transaparentView}>
                        <View style={styles.centerView}>
                         <Text style={styles.topText}>Logout</Text>
                         <Text style={styles.desc}>Are you sure want to logout from {'\n'} Funny Rx?</Text>
                         <View style={styles.btnWrapper}>
                             <TouchableOpacity style={styles.yesBtn} onPress={() =>   this.logOut()}>
                                 <Text style={styles.yesText}>YES</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.noBtn} onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                  <Text style={styles.noText}>NO</Text>
                             </TouchableOpacity>
                         </View>
                        </View>
                    </View>
                    </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F2F6',
        alignItems: "center"
    },
    profilePicView:{marginTop:30},
    
    nameLbl:{marginTop:15, fontSize:16, color:'#000', fontWeight:'500'},

    viewLbl:{marginTop:5, fontSize:14, color:colors.buttonBg, fontWeight:'500'},

    leftIcon:{height:25, width:25, alignSelf:'center'},

    row:{marginTop:15, height:30, width:'87%', alignSelf:'center', flexDirection:'row'},

    title:{marginLeft:15,color:colors.grayColor, alignSelf:'center', fontSize:15, fontWeight:'500',opacity:0.8},

    transaparentView:{flex:1, backgroundColor:"rgba(0,0,0,0.7)", alignItems:'center', flexDirection:'row', justifyContent:'center'},

    centerView: {height:140, width:280, borderRadius:4, backgroundColor:'#fff', alignSelf:'center',alignItems:'center'},

    topText:{top:20, textAlign:'center', fontSize:15, fontWeight:'500', color:'#000'},

    desc:{top:30, textAlign:'center', fontSize:13, color:'#000', opacity:0.7,fontWeight:'400'},

    btnWrapper:{position: 'absolute', left: 0, right: -1, bottom: 0,height:35, flexDirection:'row', justifyContent:'center'},

    yesBtn:{height:35, width:'50%', backgroundColor:'#E5E5E5', alignItems:'center', flexDirection:'row', justifyContent:'center',borderBottomLeftRadius:4},

    yesText:{textAlign:'center', fontSize:14, fontWeight:'500', color:'#000', opacity:0.8},

    noBtn: {height:35, width:'50%', backgroundColor:colors.buttonBg, alignItems:'center', flexDirection:'row', justifyContent:'center',borderBottomRightRadius:4},

    noText:{textAlign:'center', fontSize:14, fontWeight:'500', color:'#FFF'}

})
