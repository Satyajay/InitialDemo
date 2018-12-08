import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions,AsyncStorage, Image,  PixelRatio,
    TextInput, TouchableOpacity, ImageBackground, Animated,Alert,Modal, Platform, ScrollView, FlatList, KeyboardAvoidingView
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
const topPick = require("../images/top.png");
const bottomImg = require("../images/base.png");
let responseData={};
import { RNS3 } from 'react-native-aws3';
let profileImage= "";
let Auth_key="";

export default class Login extends Component {

    static navigationOptions = ({ navigation }) => ({
       header:null
    });


   
       state = {
            avatarSource: profilePic,
            modalVisible: false,
            is_follow:false,
            mailColor: mailinActive,
            username:null,
            useremail:null,
            post:0,
            followers:0,
            following:0,
            user_id:null,
            animating:false,
            is_Profile:false,
            topButtonVisible:false,
            bottomBtnVisible:false,
            passColor: passinActive,
        };

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

    componentDidMount() {
       this.getProfile();
    }

    getProfile(){
        //alert("hhhh");
         AsyncStorage.getItem('user_id').then((user_id) => {   
          this.setState({user_id:user_id});        
        });

       AsyncStorage.getItem('auth_key').then((Auth_key) => {   
       Auth_key= Auth_key;
        let details = {
            auth_key:Auth_key,
            other_user_id:this.state.user_id
        };
        this.setState({animating: true});
        APIs.signUp(details,'getUserProfile.json').then(data => {
            console.log("++++++"+data.result_data.profile_pic);
         
            if(data.status == '1'||data.status == 1){
              console.log(data.message);
              this.setState({animating: false});
               this.setState({name: data.result_data.full_name});
               this.setState({username:data.result_data.full_name});
             this.setState({
             useremail:data.result_data.email,
             post:data.post,
             followers:data.followers,
             following:data.following
            });
            if(data.result_data.profile_pic!=undefined && data.result_data.profile_pic!=null&&data.result_data.profile_pic!=""){
              profileImage=data.result_data.profile_pic;
             this.setState({
              avatarSource: data.result_data.profile_pic,
              is_Profile:true,
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

        setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    

        goBack(){
        const {state} = this.props.navigation;
        this.props.navigation.goBack()
        if(state.params.callBack){
          state.params.callBack();
        }
        }
    unfollow(){
    this.props.navigation.navigate('Login');
    this.setState({modalVisible: false});
    }

//onPress={() => }
    render() {
        const {state} = this.props.navigation;
        // if(state.params.response){
        //     this.setState({username:state.params.response.full_name});
        //     this.setState({useremail:state.params.response.email});
        // // alert(state.params.response.full_name);
        // }
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
               <TouchableOpacity onPress={() => this.goBack()}  >
                    <View style={css.backBtnView}>
                        <Icon  name="md-arrow-back" size={30} color='#fff'/> 
                    </View>
                </TouchableOpacity> 
                </View>
                    <View style={css.textContainer}>
                        <Text style={css.headerText}>            My Profile</Text>
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
            {/*<Header onPress={()=>this.props.navigation.goBack()} HeaderText='My Profile' />*/}
            <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>

                {              
              !this.state.is_Profile?<ImageBackground imageStyle={css.border} style={[css.dpWrap,styles.profilePicView]} source={this.state.avatarSource}>
                    
                   {
                    state.params.is_user?<TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>:null
                   }
                </ImageBackground>:null
             }
              {              
              this.state.is_Profile?<ImageBackground imageStyle={css.border} style={[css.dpWrap,styles.profilePicView]} source={{uri:this.state.avatarSource}}>   
                   {
                    state.params.is_user?<TouchableOpacity onPress={() =>this.selectPhotoTapped()} style={css.touchedView}>
                    <Image style={css.addPic} source={addPic}/>
                    </TouchableOpacity>:null
                   }
                </ImageBackground>:null
             }
                <View style={styles.lblContainer}>
                    <Text style={styles.nameLbl}>{this.state.username}</Text>
                    {
                      state.params.is_user?<Text style={styles.emailLbl}>{this.state.useremail}</Text>:null
                    }
                </View>
                {
         state.params.is_user?<TouchableOpacity style={[css.button, {marginTop:0,width:150}]}  onPress={() => this.props.navigation.navigate('Editprofile',{callBack:this.getProfile.bind(this)})}>
                      <Text style={css.buttonText}>Edit Profile</Text>
               </TouchableOpacity>:null
                }

                {
                !state.params.is_user&&!state.params.is_follow?<TouchableOpacity style={[css.button, {marginTop:-30,width:150}]}  onPress={() => this.props.navigation.navigate('Editprofile',{response:state.params.response})}>
                      <Text style={css.buttonText}>Follow</Text>
               </TouchableOpacity>:null
                }
                 {
                 !state.params.is_user && state.params.is_follow?<TouchableOpacity style={[css.button, {marginTop:-30, borderColor:colors.buttonBg,marginRight:0, borderWidth:1, backgroundColor:'#fff',width:150}]}  onPress={() => this.setModalVisible()}>
                      <Text style={[css.buttonText, {color:colors.buttonBg}]}>Unfollow</Text>
                 </TouchableOpacity>:null
                 }

             <View style={styles.bottomWrapper}>
             <View style={{flex:1}}>
                 <TouchableOpacity style={styles.tappableView} onPress={() => this.props.navigation.navigate('MyFeeds')}>
                     <Text style={styles.count}>{this.state.post}</Text>
                       <Text style={styles.staticLbl}>Posts</Text>
                </TouchableOpacity>
             </View>
             <View style={styles.verticalLine}></View>
             <View style={{flex:1}}>
                   <TouchableOpacity style={styles.tappableView} onPress={() => this.props.navigation.navigate('Followers')}>
                     <Text style={styles.count}>{this.state.followers}</Text>
                       <Text style={styles.staticLbl}>Followers</Text>
                </TouchableOpacity>
             </View>
             <View style={styles.verticalLine}></View>
             <View style={{flex:1}}>
                   <TouchableOpacity style={styles.tappableView}  onPress={() => this.props.navigation.navigate('Following')}>
                     <Text style={styles.count}>{this.state.following}</Text>
                       <Text style={styles.staticLbl}>Following</Text>
                </TouchableOpacity>
             </View>
                 </View>     
                  {
                    state.params.is_user?<View style={{marginTop:20, height:60, width:100, alignSelf:'center',backgroundColor:'#fff'}}></View>:null
                  }
             </ScrollView> 
             {
              state.params.is_user || !state.params.is_follow?<Image style={{bottom:0, height:95, width:'100%'}} source={bottomImg}></Image>:null
             }
             <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.transaparentView}>
                        <View style={styles.centerView}>
                         <Text style={styles.topText}>Unfollow</Text>
                         <Text style={styles.desc}>Are you sure want to unfollow?</Text>
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
        backgroundColor: '#fff',
       // alignItems: "center"
    },
    header:{
         height:80,
         width:'100%'
    },
    moreSapce:{
       marginTop:30,
    },
    lblContainer:{marginTop:0,height:70, width:200,flexDirection:'column',alignSelf:'center', alignItems:'center'},
    nameLbl:{marginTop:5, fontSize:16, width:'100%', color:'#000', fontWeight:'500', textAlign:'center'},
    emailLbl:{marginTop:5, fontSize:13, width:'100%', color:colors.grayColor, fontWeight:'500', textAlign:'center'},
    tappableView:{marginTop:15, height:70, width:'100%'},
    count:{fontSize:22, marginTop:10, fontWeight:'700', color:'#000',alignSelf:'center'},
    staticLbl:{fontSize:15, marginTop:5,fontWeight:'600', color:colors.grayColor,alignSelf:'center',opacity:0.8},
    verticalLine:{backgroundColor:'gray',height:70,opacity:0.3, marginTop:15, width:0.6},
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
        height: 40,  borderRadius: 5,marginTop: 25,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginLeft:40,
        marginRight:40,
      },
          topView: {
        height: 20,  borderRadius: 5, marginTop: 20,
        marginLeft:25,
        marginRight:25,
    },
    saveBtn:{height:35, width:110, borderRadius:5,backgroundColor:colors.headerColor, alignSelf:'flex-end', justifyContent: "center"},
  
    bottomWrapper:{marginLeft:15,borderRadius:5, marginRight:15,height:100, marginTop:35, backgroundColor:'#F2F2F2',flexDirection:'row'},
    profilePicView:{marginTop:30},
     unfollowBtn:{height:30, right:15, borderRadius:5, position: 'absolute', width:120, borderColor:colors.buttonBg,marginRight:0, borderWidth:1,alignSelf:'center', alignItems:'center', flexDirection:'row', justifyContent: "center"},
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
