import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,  PixelRatio,
    TextInput,AsyncStorage, TouchableOpacity, ImageBackground, Animated,Alert,Modal, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex=/^[a-zA-Z ]+$/;
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Swiper from 'react-native-swiper';
import css from '../common/styles';
import Button from '../common/buttons'
import colors from '../common/colors'
import Header from "../common/Header"
const APIs =require('../utils/Api');
const mailActive = require("../images/mail_selected.png");
const mailinActive = require("../images/mail_unselected.png");
const passActive = require("../images/password_selected.png");
const passinActive = require("../images/password_unselected.png");
const profilePic = require("../images/profile_pic_placeholder.png");
const addPic = require("../images/add_pic.png");
const userselIcon = require("../images/username_selected.png");
const userunSelIcon = require("../images/username_unselected.png");
const topPick = require("../images/top.png");
const phoneIcon = require('../images/phone_icon.png');
let responseData={};
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
import { RNS3 } from 'react-native-aws3';
let profileImage= "";
let Auth_key="";

export default class EditProfile extends Component {

    static navigationOptions = ({ navigation }) => ({
       header:null
    });


    constructor(props) {
        super(props);
          this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
       this.state = {
            avatarSource: profilePic,
            modalVisible: false,
            mobile:null,
            useremail:null,
            rname:null,
            loginType:null,
            oldPicon:passinActive,
            newpicon:passinActive,
            cnewpIcon:passinActive,
            phoneIcon:phoneIcon,
            mailColor: mailinActive,
            userIcon:userunSelIcon,
            topButtonVisible:false,
            bottomBtnVisible:false,
            user_id:null,
            passColor: passinActive,
            is_Profile:false
        };
    }


    componentDidMount() {
       
     this.getProfile();
    }

    getProfile(){
       AsyncStorage.getItem('user_id').then((user_id) => {   
          this.setState({user_id:user_id});        
        });
        
         this.setState({animating: true});
     AsyncStorage.getItem('auth_key').then((Auth_key) => {   
       Auth_key= Auth_key;
        let details = {
            auth_key:Auth_key,
            other_user_id:this.state.user_id
        };
        this.setState({animating: true});
        APIs.signUp(details,'getUserProfile.json').then(data => {
            console.log("++++++"+data.result_data.profile_pic);
            if(data.status == '1'|| data.status == 1){
             this.setState({
                 rname:data.result_data.full_name,
                 useremail:data.result_data.email,
                 mobile:data.result_data.mobile
                });
           
              this.setState({animating: false});
             
                if(data.result_data.profile_pic!=undefined &&data.result_data.profile_pic!=null&&data.result_data.profile_pic!=""){
              profileImage=data.result_data.profile_pic;
             this.setState({
              avatarSource: data.result_data.profile_pic,
              is_Profile:true,
              loginType:data.result_data.signup_source,
              value:true
            });
            }
               responseData=data.result_data;
            }else{
              console.log(data.message);
              this.setState({animating: false});
            }
        });
     });
    }



        onmobileBlur() {
            this.setState({
            mailColor: userunSelIcon
            })
        }

         onmobileFocus() {
            this.setState({
                mailColor: userunSelIcon
            })
        }


           onoldPwdBlur() {
            this.setState({
            oldPicon: passinActive
            })
           }

         onoldPwdFocus() {
            this.setState({
                oldPicon: passActive
            })
        }


         onnewPwdBlur() {
            this.setState({
            newpicon: passinActive
            })
           }

         onnewPwdFocus() {
            this.setState({
                newpicon: passActive
            })
        }

         oncnewPwdBlur() {
            this.setState({
            cnewpIcon: passinActive
            })
           }

         oncnewPwdFocus() {
            this.setState({
                cnewpIcon: passActive
            })
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
        this.setState({animating: true});
          let source = { uri: response.uri };
            const file = {
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
               this.setState({animating: false});
              throw new Error("Failed to upload image to S3");
           }
           this.setState({animating: false});
           profileImage=response.body.postResponse.location;
           this.setState({
          avatarSource: response.body.postResponse.location,
          is_Profile:true
        });
        // this.updateProfilePic();
         
        });
      }
    });
  }
      

updateProfilePic (){
  const { mobile, rname } = this.state;
      if(rname==''||rname==null){
        this.callToast('Please enter name','error')
        }else if(!rname.match(nameRegex)){
        this.callToast('Please enter valid name','error')
        } else if(mobile==""||mobile==null||mobile==undefined){
        this.callToast('Please enter phone number','error')
        } else if(mobile.length<10){
        this.callToast('Please enter valid phone number','error')
        }else{
      this.setState({animating: true});
     AsyncStorage.getItem('auth_key').then((Auth_key) => {   
      var data={
        profile_pic:profileImage,
        auth_key:Auth_key,
        oldPwd:null,
        newPwd:null,
        cnewPwd:null,
        full_name:this.state.rname,
        mobile:this.state.mobile
      };
    APIs.signUp2(data,'update_profile.json').then(response => {
      if(response.status==1||response.status=="1"){
        console.log("response-----"+JSON.stringify(response));
         this.setState({animating: false});
         this.goBack();
        //   this.props.navigation.goBack()
      }else{
         this.setState({animating: false});
         this.callToast(response.message,'error')
         // alert(response.message);
      }
    })
     });
       
    }
}

//auth_key,current_password, new_password

 changePassword(){
  const { oldPwd, newPwd, cnewPwd } = this.state;
       if(oldPwd==''||oldPwd==null){
        this.callToast('Please enter old password','error')
        }else if(oldPwd.length<6){
        this.callToast('Password should be atleast 6 charecters','error')
        }else if(newPwd==''||newPwd==null||newPwd==undefined){
        this.callToast('Password enter new password','error')        
        } else if(cnewPwd==''||cnewPwd==null||cnewPwd==undefined){
        this.callToast('Password enter confirm password','error')        
        } else if(newPwd.length<6){
        this.callToast('Password should be atleast 6 charecters','error')                   
        } else if(newPwd!=cnewPwd){
         this.callToast('Password does not match','error')     
        }else{
             this.setState({animating: true});
     AsyncStorage.getItem('auth_key').then((Auth_key) => {   
      var data={
        auth_key:Auth_key,
        current_password:oldPwd,
        new_password:newPwd
       
      };
       // APIs.postAPI('change_password.json',data).then(response => {
        APIs.signUp2(data,'change_password.json').then(response => {
        if(response.status==1||response.status=="1"){
            console.log("response-----"+JSON.stringify(response));
            this.setState({
                animating: false,
                bottomBtnVisible:false,
                oldPwd:null,
                newPwd:null,
                cnewPwd:null
            });
            this.callToast(response.message,'success') 
            //this.goBack();
            //   this.props.navigation.goBack()
        }else{
            this.setState({animating: false});
            this.callToast(response.message,'error')
            // alert(response.message);
        }
        })
     });
        }
       
   }




  
 

 callToast(message, type) {
    if(this.state.modalShown) return
    this.setToastType(message, type)
    this.setState({ modalShown: true })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }
  
  closeToast() {
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
      this.animatedValue,
      { 
        toValue: 0,
        duration: 350
      }).start()
    }, 2000)
  }

  callXToast() {
    Animated.timing(
      this.animatedXValue,
      { 
        toValue: 0,
        duration: 350
      }).start(this.closeXToast())
  }

  closeXToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedXValue,
      { 
        toValue: -windowWidth,
        duration: 350
      }).start()
    }, 2000)
  }

  setToastType(message='Success!', type='success') {
    let color
    if (type == 'error') color = colors.buttonBg
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }

        onnameFocus() {
            this.setState({
                userIcon: userselIcon
            })
        }

       onnameBlur() {
            this.setState({
            userIcon: userunSelIcon
            })
        }

        onmailFocus() {
            this.setState({
                mailColor: mailActive
            })
        }

        onmailBlur() {
            this.setState({
            mailColor: mailinActive
            })
        }
        onPassFocus() {
            this.setState({
                passColor: passActive
            })
        }

        onPassBlur() {
            this.setState({
            passColor: passinActive
            })
        }

 goBack(){
 const {state} = this.props.navigation;
 this.props.navigation.goBack()
 if(state.params.callBack){
   state.params.callBack();
 }
}


cancelChangePassword(){
    this.setState({bottomBtnVisible:false});
}

//onPress={() => }
    render() {
          let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })


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
                     <ImageBackground style={styles.header} source={topPick}>
                <View  style={[css.gredient,{backgroundColor:'transparent'}]}>
            {Platform.OS === 'ios' ? <View style={[css.statusBar]}></View> : null}
            <View style={[css.menuContainer,{backgroundColor:'transparent'}]}>
                <View style={css.backBtnView}>
               <TouchableOpacity onPress={() => this.props.navigation.goBack()}  >
                    <View style={css.backBtnView}>
                        <Icon  name="md-arrow-back" size={30} color='#fff'/> 
                    </View>
                </TouchableOpacity> 
                </View>
                    <View style={css.textContainer}>
                        <Text style={css.headerText}>          Edit Profile</Text>
                    </View>
                   <View style={{ width: 50,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                    </View>
                    <View style={{ width: 50,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                   
                     </View>
            </View>
          </View>
            </ImageBackground>
             <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
          </Text>
        </Animated.View>
            <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
              
             <View style={styles.bottomWrapper}>
                  {              
              !this.state.is_Profile?<ImageBackground imageStyle={css.border} style={[css.dpWrap,styles.profilePicView]} source={this.state.avatarSource}>
                    <TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>
                </ImageBackground>:null
             }
              {              
              this.state.is_Profile?<ImageBackground imageStyle={css.border} style={[css.dpWrap,styles.profilePicView]} source={{uri:this.state.avatarSource}}>
                    <TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>
                </ImageBackground>:null
             }
                <View style={[styles.topView,{marginTop:30}]}>
                    <Text style={{left:0, textAlign:'left', fontSize:15, fontWeight:'500',color:'#000', opacity:0.8}}>Personal Info</Text>
                    {
                    !this.state.topButtonVisible?<TouchableOpacity style={{height:20, marginTop:-17, marginRight:0, width:70, alignSelf:'flex-end'}} onPress={() => this.setState({ topButtonVisible: true,bottomBtnVisible: false })}>
                    <Text style={{right:0, textAlign:'right',fontSize:14, fontWeight:'500',color:colors.buttonBg}}>Edit</Text>
                    </TouchableOpacity>:null
                    }
                 </View>  
                 <View style={styles.tfView}>
                 <Image style={styles.searchIcon}  source={this.state.userIcon} style={css.userIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Name"
                        onBlur={ () => this.onNameBlur() }
                        onFocus={ () => this.onNameFocus() }
                        onChangeText={value => this.setState({ rname: value })}
                        underlineColorAndroid="transparent"
                        value={this.state.rname}
                        ref="name"
                        onBlur={ () => this.onnameBlur() }
                        onFocus={ () => this.onnameFocus() }
                        returnKeyType='next'
                        onChangeText={value => this.setState({ rname: value })}
                      />
                </View>
                <View style={styles.tfView}>
                     <Image source={this.state.mailColor} style={css.mailIcon}/>
                    {/*<Icon style={styles.searchIcon} name="ios-mail-outline" size={25} color={this.state.mailColor}/>*/}
                     <TextInput
                        style={css.input}
                        placeholder="Email Id"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        onChangeText={value => this.setState({ remail: value })}
                        underlineColorAndroid="transparent"
                        value={this.state.useremail}
                      />
                </View>

                  <View style={styles.tfView}>
                     <Image source={this.state.phoneIcon} style={css.phoneIcon}/>
                    {/*<Icon style={styles.searchIcon} name="ios-mail-outline" size={25} color={this.state.mailColor}/>*/}
                     <TextInput
                        style={css.input}
                        placeholder="Phone Number"
                        onBlur={ () => this.onmobileBlur() }
                        onFocus={ () => this.onmobileFocus() }
                        returnKeyType='next'
                        ref="mobile"
                        maxLength={14}
                        keyboardType={'phone-pad'}
                        onChangeText={value => this.setState({ mobile: value })}
                        underlineColorAndroid="transparent"
                        value={this.state.mobile}
                      />
                </View>
                  <View style={{height:25, width:'100%', backgroundColor:'transparent'}}></View>
          {
             this.state.topButtonVisible?<View><View style={styles.topBtnWrapper}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() =>  this.props.navigation.goBack()}>
                        <Text style={{color:'#C8C8C8',textAlign:'center', fontSize:15, fontWeight:'500'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={() =>  this.updateProfilePic()}>
                         <Text style={{color:'#fff', textAlign:'center', alignSelf:'center',fontSize:15, fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:25}}></View>
                </View>:null
           }
           </View>
            {
             this.state.loginType=="App"?<View style={styles.devider}></View>:null
            }
           {
             this.state.loginType=="App"?<View style={styles.bottomWrapper}>
                <View style={[styles.topView, styles.moreSapce]}>
                    <Text style={{left:0, textAlign:'left', fontSize:15, fontWeight:'500',color:'#000', opacity:0.8}}>Password</Text>
                    {
                    !this.state.bottomBtnVisible?<TouchableOpacity style={{height:20, marginTop:-17, marginRight:0, width:70, alignSelf:'flex-end'}} onPress={() => this.setState({ bottomBtnVisible: true,topButtonVisible: false })}>
                    <Text style={{right:0, textAlign:'right',fontSize:14, fontWeight:'500',color:colors.buttonBg}}>Change</Text>
                    </TouchableOpacity>:null
                    }
                   
                 </View>  
        <View style={{height:15, width:'100%', backgroundColor:'#fff'}}></View>
             {
                    this.state.bottomBtnVisible?<View style={{flex:1}}>
                    <View style={styles.tfView}>
                <Image source={this.state.oldPicon} style={css.passIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Old Password"
                        onBlur={ () => this.onoldPwdBlur() }
                        onFocus={ () => this.onoldPwdFocus() }
                        onChangeText={value => this.setState({ oldPwd: value })}
                        underlineColorAndroid="transparent"
                        secureTextEntry ={true}
                      />
                </View>

                 <View style={styles.tfView}>
                <Image source={this.state.newpicon} style={css.passIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="New Password"
                        onBlur={ () => this.onnewPwdBlur() }
                        onFocus={ () => this.onnewPwdFocus() }
                        onChangeText={value => this.setState({ newPwd: value })}
                        underlineColorAndroid="transparent"
                        secureTextEntry ={true}
                      />
                </View>
                 <View style={styles.tfView}>
                <Image source={this.state.cnewpIcon} style={css.passIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Confirm Password"
                        onBlur={ () => this.oncnewPwdBlur() }
                        onFocus={ () => this.oncnewPwdFocus() }
                        onChangeText={value => this.setState({ cnewPwd: value })}
                        underlineColorAndroid="transparent"
                        secureTextEntry ={true}
                      />
                </View>
                 <View style={{height:20}}></View>

                 <View style={[styles.topBtnWrapper]}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => this.setState({ bottomBtnVisible: false })}>
                        <Text style={{color:'#C8C8C8',textAlign:'center', fontSize:15, fontWeight:'500'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => this.changePassword()}>
                         <Text style={{color:'#fff', textAlign:'center', alignSelf:'center',fontSize:15, fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>
                </View>
                 <View style={{height:20}}></View>
                </View>:null
                }
                 </View> :null
              }   
                          <View style={{height:150}}></View>         
             </ScrollView>            
            </View>
        ) 
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F2F6',
       // alignItems: "center"
    },
     header:{
         height:80,
         backgroundColor:'#fff',
         width:'100%'
    },
    moreSapce:{
       marginTop:15,
      // backgroundColor:'red'
    },
    avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
    topBtnWrapper:{
        height: 40,  borderRadius: 5,marginTop: 0,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginLeft:40,
        marginRight:40,
      },
     tfView: {
        height: 40,  borderRadius: 5, backgroundColor:colors.tfViewColor, marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:25,
        marginRight:25,
    },
      cancelBtn:{top:4,height:35, width:110, borderRadius:5,borderWidth:2,borderColor:'#D8D8D8', alignSelf:'flex-start',justifyContent: "center"},
      topView: {
        height: 20,  borderRadius: 5, marginTop: 20,
        marginLeft:25,
        marginRight:25,
    },
    saveBtn:{height:35, width:110, borderRadius:5,backgroundColor:colors.headerColor, alignSelf:'flex-end', justifyContent: "center"},
    mailIcon:{
     marginLeft:10,
     height:12,
     width:17,
    },
     passIcon:{
     marginLeft:10,
     height:20,
     width:15,
    },
    devider:{height:13, width:'100%', backgroundColor:'transparent', borderWidth: 0.5, borderColor:"#ddd",shadowOpacity: 0.3,shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 1},
    bottomWrapper:{width:'100%',flex:1, marginTop:0, backgroundColor:'#fff'},
    profilePicView:{marginTop:30},
    
    nameLbl:{marginTop:15, fontSize:16, color:'#000', fontWeight:'500'},

    viewLbl:{marginTop:5, fontSize:14, color:colors.buttonBg, fontWeight:'500'},

    row:{marginTop:15, height:30, width:'84%', alignSelf:'center', flexDirection:'row'},

    title:{marginLeft:40,color:colors.grayColor, fontSize:15, fontWeight:'500', marginTop:10,opacity:0.8},

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
