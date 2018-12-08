import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput,ImageBackground,NativeModules,AsyncStorage, TouchableHighlight, TouchableOpacity,Modal,Animated,Alert, Platform, ScrollView, FlatList, KeyboardAvoidingView
} from 'react-native';
const { width, height } = Dimensions.get('window');
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex=/^[a-zA-Z ]+$/;
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-custom-toast';
import css from '../common/styles';
import Button from '../common/buttons'
import colors from '../common/colors'
const Apis =require('../utils/Api');
import ActivityIndicator from '../common/activityIndicator' 
const profilePic = require("../images/profile_pic_placeholder.png");
const mailActive = require("../images/mail_selected.png");
const fbIcon = require("../images/fb.png");
const instaIcon = require("../images/insta.png");
const twitterIcon = require("../images/twitter.png");
const googleIcon = require("../images/G+.png");
const linkedInIcon = require("../images/Linkedin.png");
const mailinActive = require("../images/mail_unselected.png");
const passActive = require("../images/password_selected.png");
const passinActive = require("../images/password_unselected.png");
const userselIcon = require("../images/username_selected.png");
const userunSelIcon = require("../images/username_unselected.png");
const addPic = require("../images/add_pic.png");
const checked = require("../images/checked.png");
const unChecked = require("../images/unchecked.png");
const nextIcon = require('../images/next.png');
const phoneIcon = require('../images/phone_icon.png');
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
import { RNS3 } from 'react-native-aws3';
let profileImage= "";
import InstagramLogin from 'react-native-instagram-login'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

//import InstagramLogin from 'react-native-instagram-login'
const { RNTwitterSignIn } = NativeModules
import LinkedinLogin from 'react-native-linkedin-login';
const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "Mp0taY9OcO8UhvacuTPU73Xbp",
  TWITTER_CONSUMER_SECRET: "HWAhDOOUFYsuL4H4w445eEta2lzpxRBN07zxuFZCo5UwbD9RqG"
}

const baseImage = require("../images/base.png");
export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
       header:null
    });


    constructor(props) {
        super(props);
         this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
             leftText: "I agree to the ",
             centerText: 'Terms & Conditions ',
             rightText:' of FunnyRx',
             activeColor:'#000',
             checkBox:unChecked,
             avatarSource:profilePic,
             email: null,
             rname:null,
             modalVisible: false,
             remail:null,
             mobile:null,
             rpassword:null,
             password:null,
             lineVisible:true,
             social_id:null,
             linkedName:null,
             linkedIn_pic:null,
             likedin_id:null,
             linkedIn_email:null,
             phoneIcon:phoneIcon,
             inActiveColor:'#BDBDBD',
             mailColor: mailinActive,
             passColor: passinActive,
             viewColor:colors.grayColor,
             userIcon:userunSelIcon,
             isVisible:true,
             animating: false,
             modalShown: false,
             toastColor: 'green',
             message: 'Success!'

        };
    }

 componentDidMount() {
   
  

  GoogleSignin.currentUserAsync().then((user) => {
      console.log('USER', user);
      this.setState({user: user});
    }).done();
    this._setupGoogleSignin();


  }

  componentWillMount() {
    // initialize LinkedinApi
    console.log('init');
    LinkedinLogin.init(
      [
        'r_emailaddress',
        'r_basicprofile'
      ]
    );

    this.getUserSession();
    
  }

  getUserSession() {
    // get the user session from the store

    
    AsyncStorage.getItem('user',  (err, result)  => {
      if (result) {
        const user = JSON.parse(result);

        // set the api session if found
        LinkedinLogin.setSession(user.accessToken, user.expiresOn);

        this.setState({
          user
        });

        console.log('user', user);
      }
    });

  }

   socialRegister(data){
    
   this.setState({animating: true});
    Apis.signUp2(data,'social_login.json').then(response => {
       console.log("response-----"+JSON.stringify(response));
      // alert(response.status);
      if(response.status==1||response.status=="1"){
         this.setState({animating: false});
         AsyncStorage.setItem('auth_key', response.user_details.auth_key);
         AsyncStorage.setItem('emailId', response.user_details.email);
          AsyncStorage.setItem('user_id', response.user_details.user_id);
              this.callToast("You have logged in successfully",'success') 
          that=this;
          setTimeout(function(){
           that.props.navigation.navigate('Tab')            
          },500);
         
        
      }else{
         this.setState({animating: false});
         this.callToast(response.message,'error')
         // alert(response.message);
      }
    })
     

  }


   fbSignIn = () => {
     let that =this;
  FBLoginManager.logout(function(error, data){
    if (!error) {
      console.log("Login data: ", JSON.stringify(data));
    } else {
      console.log("Error: ", error);
    }
  })
   FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
   
   FBLoginManager.loginWithPermissions(["public_profile","email","user_friends"], function(error, response){
      if(Platform.OS === 'ios'){
      Apis.facebookUser(response.credentials.token).then(response => {
      console.log("*****************"+JSON.stringify(response));
         if (!error) {
        console.log("-----"+JSON.stringify(response));
          // var obj=JSON.parse(response.profile);
       if(response.email==null||response.email==""||response.email==undefined){
         this.props.navigation.navigate('EmailPopup',{ data: {
            social_type:"facebook",
            social_id:response.id,
            full_name:response.name,
            profile_pic:'https://graph.facebook.com/'+response.id+'/picture?type=normal'
          }})
       }else{
             // console.log("+++++++++++++++"+obj);
        var data={
          email:response.email,
          social_type:"facebook",
          social_id:response.id,
          device_token:'23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
          device_type:'ios',
          full_name:response.name,
          profile_pic:'https://graph.facebook.com/'+response.id+'/picture?type=normal'
      }

      console.log(data);

      that.socialRegister(data);
       }
          


     } else {
        alert("-----Error"+error);
       console.log("Error: ", error);
     }
    })
    }else{
     if (!error) {
        console.log("-----"+JSON.stringify(response));
       var obj=JSON.parse(response.profile);
       if(obj.email==null||obj.email==""||obj.email==undefined){
         this.props.navigation.navigate('EmailPopup',{ data: {
            social_type:"facebook",
            social_id:obj.id,
            full_name:obj.name,
            profile_pic:'https://graph.facebook.com/'+obj.id+'/picture?type=normal'
          }})
       }else{
              console.log("+++++++++++++++"+obj);
        var data={
          email:obj.email,
          social_type:"facebook",
          social_id:obj.id,
          device_token:'23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
          device_type:'ios',
          full_name:obj.name,
          profile_pic:'https://graph.facebook.com/'+obj.id+'/picture?type=normal'
      }

      console.log(data);

      that.socialRegister(data);
       }
     }  
      else {
        alert("-----Error"+error);
       console.log("Error: ", error);
     }
     }
  });
}

  linkedinLogin() {
    alert("Work is in progess");
    // LinkedinLogin.login().then((user) => {
    //   console.log('User logged in: ', user);

    //   // recieved auth token
    //   this.setState({ user });
    
    //    AsyncStorage.setItem('user', JSON.stringify(user), () => {
    //         this.getUserProfile();
    //     });
        

    // }).catch((e) => {
    //   var err = JSON.parse(e.description);
    //  // alert("ERROR: " + err.errorMessage);
    //   console.log('Error', e);
    // });

    // return true;
  }

  logout() {
    LinkedinLogin.logout();
    console.log('user logged out');
    
    AsyncStorage.removeItem('user');
    this.setState({ user: null });
  }
 
  getUserProfile(user) {
    LinkedinLogin.getProfile().then((data) => {
      console.log('received profile', data);
      const userdata = Object.assign({}, this.state.user, data);

      console.log('user: ', userdata);
      this.setState({
         user: userdata, 
         linkedName:userdata.firstName+" "+userdata.lastName,
         linkedIn_email:userdata.emailAddress,
         likedin_id:userdata.id
         });

      AsyncStorage.setItem('user', JSON.stringify(userdata), () => {
          this.getUserProfileImage();
        });

    }).catch((e) => {
      console.log(e);
    });
  }

  getUserProfileImage() {
    let that= this;
    LinkedinLogin.getProfileImages().then((images) => {
      console.log('received profile image', images);
      this.setState({linkedIn_pic: images[0]});
      const userdata = Object.assign({}, this.state.user, { images });

      AsyncStorage.setItem('user', JSON.stringify(userdata), () => {
        this.setState({ user: userdata,linkedIn_pic: images[0]});
      });
      var data={
          email:this.state.linkedIn_email,
          social_type:"linkedin",
          social_id:this.state.likedin_id,
          device_token:'23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
          device_type:'ios',
          full_name:this.state.linkedName,
          profile_pic:images[0]
      }
      that.socialRegister(data);
      
    }).catch((e) => {
      console.log(e);
    });
  }

 

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '455139582079-ms00utl7rf44014igs5ia22uh19er28s.apps.googleusercontent.com',
        webClientId: '455139582079-e0pcp2lqcobkidlagkjc3km8lnq91ep1.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  googleSign() {
    let that=this;
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
       GoogleSignin.signIn()
    .then((user) => {
      var obj=user;
        var data={
          email:obj.email,
          social_type:"google+",
          social_id:obj.id,
          device_token:'23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
          device_type:'ios',
          full_name:obj.name,
          profile_pic:obj.photo
      }

      console.log(data);
      that.socialRegister(data);
  
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
    // play services are available. can now configure library
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    })
   
  }



  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          if(loginData.email==null||loginData.email==''||loginData.email==undefined){
            this.props.navigation.navigate('EmailPopup',{ data: {
            social_type:"twitter",
            social_id:loginData.userID,
            full_name:loginData.userName,
            profile_pic:loginData.photo?loginData.photo:""
          } })
          }else{
            console.log("success");
          }
        
        }
        
        //email,social_type,social_id,device_type,device_token,full_name,profile_pic
        var data ={
          full_name: loginData.name,
          email: '',
          social_type:'twitter',
          social_id:loginData.userID,
          device_token: "1234567890",
          device_type:"android",
          profile_pic:""
        }

          Apis.socialLogin(data).then(data => {
              console.log(data);
              if(data.status == '1'){
                console.log(data.message);
              
              }else{
                console.log(data.message);
              }
          });

      })
      .catch(error => {
        console.log(error)
      }
    )
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
     selectPhotoTapped() {
    // this.props.test();
    const options = {
      quality: 1.0,
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
          console.log("+++++++++++"+JSON.stringify(response.body));
         
        });
        this.setState({
          avatarSource: source
        });
      }
    });
  }

      
        onmailFocus() {
            this.setState({
                mailColor: mailActive
            })
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

        onmailBlur() {
            this.setState({
            mailColor: mailinActive
            })
        }

         onmobileBlur() {
            this.setState({
            mailColor: mailinActive
            })
        }

         onmobileFocus() {
            this.setState({
                mailColor: mailActive
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
            showCustomToast(msg)
                    {
                        this.refs.customToast.showToast(msg, 3000);
                    }

        passVisible(){
            if(this.state.viewColor=='#797979'){
              this.setState({
                    viewColor: colors.buttonBg
                })
                 this.setState({
                    isVisible: false
                })
            }else{
                this.setState({
                    viewColor: colors.grayColor
                })
                 this.setState({
                    isVisible: true
                })
            }
       
        }

        loginVisible(){
            if(this.state.lineVisible==false){
               this.refs["swiper"].scrollBy(-1);
            }
            this.setState({
                activeColor: '#000'
            })
             this.setState({
                inActiveColor: '#BDBDBD'
            })
             this.setState({
                lineVisible: true
            })

            
        }

         signupVisible(){
            if(this.state.lineVisible==true){
               this.refs["swiper"].scrollBy(1);
            }
            this.setState({
                activeColor: '#BDBDBD'
            })
             this.setState({
                inActiveColor: '#000'
            })
             this.setState({
                lineVisible: false
            })
        }

    navigateTo(){
      this.refs["swiper"].scrollBy(0)
  }

//****************** Manula Login */
  _onLogin() {
    
    const { email, password } = this.state;
    if(email==''||email==null){
        this.callToast('Please enter email id','error')
    }else if(!email.match(emailRegex)){
         this.callToast('Please enter valid email id','error')

    }else if(password==''||password==null){
        this.callToast('Please enter password','error')
      // alert("Please enter password.");
    } else if(password.length<6){
      // alert("Password should be atleast 6 charecters.");
        this.callToast('Password should be atleast 6 charecters','error')
       
    }else{
      var data={
        email:this.state.email,
        password:this.state.password,
        device_token:'23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
        device_type:'ios'
      };
   this.setState({animating: true});
    Apis.signUp2(data,'login.json').then(response => {
      if(response.status==1||response.status=="1"){
         this.refs.email.blur()
        this.refs.pass.blur()
       
        console.log("response-----"+JSON.stringify(response));
         AsyncStorage.setItem('auth_key', response.user_details.auth_key);
         AsyncStorage.setItem('emailId', response.user_details.email);
         AsyncStorage.setItem('user_id', response.user_details.user_id);
          this.callToast("You have logged in successfully",'success') 
          that=this;
          setTimeout(function(){
           that.props.navigation.navigate('Tab')            
          },500);
           this.setState({animating: false});
        
      }else{
         this.setState({animating: false});
         this.callToast(response.message,'error')
         // alert(response.message);
      }
    })

    }
   
  }


//////////*************Manual signup */
  _onRegister() {
      //alert(this.state.checkBox);
    const {rname, remail, rpassword,mobile} = this.state;
    if(rname==''||rname==null){
       this.callToast('Please enter name','error')
    }else if(!rname.match(nameRegex)){
      this.callToast('Please enter valid name','error')
    }
    else if(remail==''||remail==null){
      this.callToast('Please enter email id','error')      
    }else if(!remail.match(emailRegex)){
       this.callToast('Please enter valid email id','error')
    }
    else if(mobile==""||mobile==null||mobile==undefined){
      this.callToast('Please enter phone number','error')
    }
     else if(mobile.length<10){
      this.callToast('Please enter valid phone number','error')
    }
    else if(rpassword==''||rpassword==null){
      this.callToast('Please enter password','error')
    } else if(rpassword.length<6){
      this.callToast('Password should be atleast 6 charecters','error')
    }else if(this.state.checkBox==15){
         this.callToast('Please agree terms & conditions','error')
    
    }else{
      
        this.refs.name.clear()
        this.refs.remail.clear()
        this.refs.rpwd.clear()

        this.refs.name.blur()
        this.refs.remail.blur()
        this.refs.rpwd.blur()
       

   this.setState({animating: true});
      var data={
        profile_pic:profileImage,
        full_name:this.state.rname,
        email:this.state.remail,
        password:this.state.rpassword,
        mobile:this.state.mobile,
        device_token:'23456789iuhgfvcxdfghjk8y7t6redwertfghuytgfcv',
        device_type:'ios'
      };
    Apis.signUp(data,"signup.json").then(response => {
      if(response.status==1||response.status=="1"){
         this.setState({
            rname:null,
            remail:null,
            rpassword:null,
            mobile:null,
            checkBox:unChecked
        });
        
        this.setState({
          animating: false,
           modalVisible: true
        });
        that=this;
        setTimeout(function(){
          that.setState({
          modalVisible: false
        });
        that.loginVisible();
        },2000);
        
         // this.loginVisible();
      }else{
        this.setState({animating: false});
         this.callToast(response.message,'error')
         // alert(response.message);
      }
    })
        
        // this.callToast('Registered successfully','error')
       
    }
   
  }
//  if(loginData.email==null||loginData.email==''||loginData.email==undefined){
//             this.props.navigation.navigate('EmailPopup',{ data: {
//             social_type:"twitter",
//             social_id:loginData.userID,
//             full_name:loginData.name,
//             profile_pic:loginData.photo?loginData.photo:""
//           } })
//           }else{
//             console.log("success");
//           }

 

        check(){
            this.setState({ checkBox:checked})
            
        }
        
      // instaGramcallback(token){
      //   alert(token);
      // }

      instaGramcallback(token){
      Apis.instaUser(token).then(response => {
      this.props.navigation.navigate('EmailPopup',{ data: {
            social_type:"instagram",
            social_id:response.data.id,
            full_name:response.data.full_name,
            profile_pic:response.data.profile_picture ? response.data.profile_picture: ""
          }})
    })
  }



    render() {
        let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })

        return (
            
            <View style={css.container}>
               <InstagramLogin
                  ref='instagramLogin'
                  clientId='bce411f8adb14cf6a0d164074980c03e'
                  redirectUrl='https://google.com'
                  scopes={['public_content', 'follower_list']}
                  onLoginSuccess={(token) => this.instaGramcallback(token)}
                  onLoginFailure={(data) => console.log(data)}
                />
              <View style={{top:20,height:25, width:'100%', flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end', width:100, marginRight:10}} onPress={() =>  this.props.navigation.navigate('Tab')}>
                <Text style={{alignSelf:'flex-end', fontSize:15, fontWeight:'600', color:colors.buttonBg}}>Skip</Text>
                 <Image style={styles.arrowIcon} source ={nextIcon}/>
                  </TouchableOpacity>
              </View>
                   <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
          </Text>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: this.animatedXValue }], height: 70, marginTop: windowHeight - 70, backgroundColor: 'green', position: 'absolute', left:0, top:0, width: windowWidth, justifyContent: 'center' }}>
          <Text style={{  color: 'white', fontSize:14,  textAlign: 'center' }}>Success!</Text>
        </Animated.View>
                <Modal
                transparent={true}
                onRequestClose={() => null} 
                visible={this.state.animating}>
                  <View style={css.transaparentView}>
                 <ActivityIndicatorExample
              animating = {this.state.animating}/>
              </View>
              </Modal>
                <View style={css.headerView}>
                  <TouchableOpacity style={css.loginWrap} onPress={() => this.loginVisible()}>
                   <Text style={{fontSize:16, fontWeight:'500',color:this.state.activeColor}}>LOGIN</Text>
                  {
                    this.state.lineVisible ?<View style={{height:1.5, width:30,marginLeft:10, backgroundColor:colors.buttonBg}}></View>:null
                  }  
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:30,width:'33.33%'}} onPress={() => this.signupVisible()}>
                       <Text style={{fontSize:16,alignSelf:'center', fontWeight:'600',color:this.state.inActiveColor}}>REGISTER</Text>
                    {
                !this.state.lineVisible ?<View style={{height:1.5,alignSelf:'center', width:35, backgroundColor:colors.buttonBg}}></View>:null
                    }
                  </TouchableOpacity>
                  <View style={css.blankView} ></View>
                </View>
            <View style={css.swipperWrap}>
            <Swiper ref="swiper" loop={false} showsPagination={false}  scrollEnabled={false}> 
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}  style={{flex:1, width:'84%', marginLeft:'8%'}} >
                    
                <View style={css.topView}>
                    <Image source={this.state.mailColor} style={css.mailIcon}/>
                     <TextInput
                        style={css.input}
                        auto-correction={false}
                        placeholder="Email Id"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        ref="email"
                        onSubmitEditing={() => this.pass.focus()}
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                <View style={css.bottomView}>
                    <Image source={this.state.passColor} style={css.passIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Password"
                        onBlur={ () => this.onPassBlur() }
                        onFocus={ () => this.onPassFocus() }
                        returnKeyType='done'
                        onChangeText={value => this.setState({ password: value })}
                        underlineColorAndroid="transparent"
                        ref= "pass"
                        secureTextEntry ={this.state.isVisible}
                      />
                    <TouchableOpacity onPress={() =>this.passVisible()}>
                    <Icon  style={styles.searchIcon} name="ios-eye-outline" size={25} color={this.state.viewColor}/>
                    </TouchableOpacity>
                </View>
            <TouchableOpacity activeOpacity={.8} style={{top:20}} onPress={() => this.props.navigation.navigate('ResetPassowrd')}>
                <Text style={css.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button onPress={() => this._onLogin()} title='Login' />
              <Text style={css.orLabelStyle}>or connect with</Text>
            <View style={css.socialwrapper}>
                <TouchableOpacity onPress={() => this.fbSignIn()}>
                <Image style={css.socialBtn} source={fbIcon}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.refs.instagramLogin.show()}>
                <Image style={css.socialBtn} source={instaIcon}></Image>
                </TouchableOpacity>
               
               <TouchableOpacity  onPress={this._twitterSignIn}>
                  <Image style={css.socialBtn} source={twitterIcon}></Image>
                </TouchableOpacity>
                   
                    <TouchableOpacity onPress={()=> this.googleSign()}>
                <Image style={css.socialBtn} source={googleIcon}></Image>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=> this.linkedinLogin()}>
                <Image style={css.socialBtn} source={linkedInIcon}></Image>
                 </TouchableOpacity>
            </View>
            </ScrollView>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={{flex:1, width:'84%', marginLeft:'8%'}}>
            <ImageBackground imageStyle={css.border} style={css.dpWrap} source={this.state.avatarSource}>
                    <TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={css.topView}>
                <Image style={styles.searchIcon}  source={this.state.userIcon} style={css.userIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Enter Name"
                        auto-correction={false}
                        ref="name"
                        onBlur={ () => this.onnameBlur() }
                        onFocus={ () => this.onnameFocus() }
                         returnKeyType='next'
                         onChangeText={value => this.setState({ rname: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                <View style={css.bottomView}>
                     <Image source={this.state.mailColor} style={css.mailIcon}/>
                  
                     <TextInput
                        style={css.input}
                        placeholder="Enter Email Id"
                        ref="remail"
                        auto-correction={false}
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        returnKeyType='next'
                        keyboardType={'email-address'}
                        onChangeText={value => this.setState({ remail: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                 <View style={css.bottomView}>
                     <Image source={this.state.phoneIcon} style={css.phoneIcon}/>
                  
                     <TextInput
                        style={css.input}
                        auto-correction={false}
                        placeholder="Enter Phone Number"
                        ref="mobile"
                        maxLength={14}
                        onBlur={ () => this.onmobileBlur() }
                        onFocus={ () => this.onmobileFocus() }
                        returnKeyType='next'
                        keyboardType={'phone-pad'}
                        onChangeText={value => this.setState({ mobile: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                <View style={css.bottomView}>
                     <Image source={this.state.passColor} style={css.passIcon}/>
               
                     <TextInput
                        style={css.input}
                        placeholder="Create Password"
                         ref="rpwd"
                        onBlur={ () => this.onPassBlur() }
                        onFocus={ () => this.onPassFocus() }
                         returnKeyType='done'
                         onChangeText={value => this.setState({ rpassword: value })}
                        underlineColorAndroid="transparent"
                        secureTextEntry ={this.state.isVisible}
                      />
                    <TouchableOpacity onPress={() =>this.passVisible()}>
                    <Icon  style={styles.searchIcon} name="ios-eye-outline" size={25} color={this.state.viewColor}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.termsView]}>
                     <TouchableHighlight onPress={() =>this.check()}>
                    <Image style={{height:17, width:17}} source={this.state.checkBox}/>
                    </TouchableHighlight>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')}>
                 <Text style={styles.baseText}>
                    <Text>
                    {this.state.leftText}
                    </Text>
                    <Text style={styles.titleText}>
                    {this.state.centerText}
                    </Text>
                    <Text>
                    {this.state.rightText}
                    </Text>
                </Text>
                </TouchableOpacity>
              </View>
            <Button onPress={() => this._onRegister()} title='Register' />
              <Text style={[css.orLabelStyle,styles.orLbl]}>or connect with</Text>
            <View style={css.socialwrapper}>
                <Image style={css.socialBtn} source={fbIcon}></Image>
                <Image style={css.socialBtn} source={instaIcon}></Image>
                <Image style={css.socialBtn} source={twitterIcon}></Image>
                <Image style={css.socialBtn} source={googleIcon}></Image>
                <Image style={css.socialBtn} source={linkedInIcon}></Image>
            </View>
            </ScrollView>
            </Swiper>
             </View>
             <Toast ref = "customToast" borderRadius={20} backgroundColor="rgba(0,0,0,0.5)" position = "bottom"/>
             <Image style={{bottom:-20,height:95, width:width}} source={baseImage}/>
             <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.transaparentView}>
                        <View style={styles.centerView}>
                          <View style={{marginTop:30,height:60, width:60, borderRadius:30, backgroundColor:'green'}}></View>
                         <Text style={styles.topText}>Thank You!</Text>
                         <Text style={styles.desc}>You are successfully registered.</Text>
                        </View>
                    </View>
                    </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    searchIcon: {padding: 10},
    arrowIcon:{height:14,width:14, marginTop:10,marginLeft:0},
    orLbl :{marginTop:20},

    termsView:{ top:20, height:20, flexDirection:'row'},

    baseText: { marginLeft:7, color:'#000', fontSize:12},

    titleText: { color:colors.buttonBg },
    transaparentView:{flex:1, backgroundColor:"rgba(0,0,0,0.7)", alignItems:'center', flexDirection:'row', justifyContent:'center'},

    centerView: {height:200, width:300, borderRadius:5, backgroundColor:'#fff', alignSelf:'center',alignItems:'center'},

    topText:{top:20, textAlign:'center', fontSize:18, fontWeight:'700', color:'#000'},

    desc:{marginTop:35, textAlign:'center', fontSize:16, color:'#000', opacity:0.7,fontWeight:'600'},

   
})
