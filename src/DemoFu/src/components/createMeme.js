import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Picker,
    TextInput, TouchableOpacity, ImageBackground, Animated, Platform, ScrollView, FlatList, KeyboardAvoidingView,Modal,AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import css from '../common/styles';
import Button from '../common/buttons'
import colors from '../common/colors'
import Header from "../common/Header"
import Toast from 'react-native-custom-toast';
//import { Dropdown } from 'react-native-material-dropdown';
const Apis =require('../utils/Api');

const titleActive = require("../images/mail_selected.png");
const titleinActive = require("../images/add-title.png");
const taginActive = require("../images/add-tag.png");
const categoryIcon = require("../images/select-category.png");
const mailActive = require("../images/mail_selected.png");
const mailinActive = require("../images/mail_unselected.png");
const addPhotos = require("../images/add-picture.png");
const deselect_fb = require("../images/gray-fb.png");
const selcted_fb = require("../images/red-fb.png");
const deselect_insta = require("../images/gray-instagram.png");
const selcted_insta = require("../images/red-instagram.png");
const deselect_twitter = require("../images/gray-twitter.png");
const selcted_twitter = require("../images/red-twitter.png");
const deselect_whatsapp = require("../images/gray-watsapp.png");
const selcted_whatsapp = require("../images/red-watsapp.png");
const deselect_gPlus = require("../images/gray-google-plus.png");
const selcted_gPlus = require("../images/red-google-plus.png");
const deselect_pin = require("../images/gray-pinterest.png");
const selcted_pin = require("../images/red-pinterest.png");
const deselect_linkedIn = require("../images/gray-linked-in.png");
const selcted_linkedIn = require("../images/red-linked-in.png");

import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
let profileImage= "";

import Tabs from './topTab';



let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height


export default class ResetPassword extends Component {

    static navigationOptions = ({ navigation }) => ({
       header:null
    });


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
             titleColor: titleinActive,
             email:null,
             modalShown: false,
             tagColor:taginActive,
             avatarSource:'',
             isPic:false,
             animating: false,
             toastColor: 'green',
             message: 'Success!',
             selectedVal:'Select category',
             optionsArr:[],
             category:'1'
            // toastColor: 'green',
            // message: 'Success!'

        };
    }

    componentDidMount() {
      this.getCategory();
    }

    componentWillMount() {
    //  this.getCategory();
    }

    updateUser = (user) => {
      console.log(user);
      this.setState({ selectedVal: user,category:user })
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
   // if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
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
  _onSubmit() {
    const {isPic, title, tag,category } = this.state;

    console.log(isPic +"" +title +" "+tag +" "+category);
    if(!isPic){
      alert('Please enter meme pic');
      //this.callToast('Please enter meme pic','error')
    }
    else if(title==''||title==null|| typeof title == 'undefined'){
      alert('Please enter title');
      //  this.callToast('Please enter title','error')
    }else if(tag==''||tag==null ||typeof title == 'undefined'){
      alert('Please enter tag');
      //  this.callToast('Please enter tag','error')
    }
    // else if(category==''||category==null){
    //   this.callToast('Please enter category','error')
    // }
    else{
       this.setState({
       // animating: true
      });
       console.log(profileImage+" "+title +" "+tag +" "+this.state.category);
     
       AsyncStorage.getItem('auth_key').then((Auth_key) => {

        console.log(Auth_key);

         let source = { uri: this.state.avatarSource.uri };
                const file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: this.state.avatarSource.uri,
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
          // console.log(response);
           profileImage = response.body.postResponse.location;
           console.log(profileImage);
           var data={
            auth_key: Auth_key,
            meme: profileImage,
            title:title,
            tags:tag,
            category: this.state.category,
            type:"1",
          };

           Apis.postAPI("create_meme.json",data).then(data => {
                console.log(data);
                if(data.status == '1'){
                  console.log(data.message);
                  alert(data.message);
                  this.setState({
                    title:'',
                    tag:''
                  })
                  this.setState({animating: false});
                  this.props.navigation.navigate('Tab'); 
                }else{
                  console.log(data.message);
                  alert(data.message);
                  this.setState({animating: false});
                }
            });
     
        });

      });
  
    }
   
  }

  getCategory(){
   // this.setState({animating: true});
    AsyncStorage.getItem('auth_key').then((Auth_key) => {
        console.log(Auth_key);   
        
        var data={
          auth_key: Auth_key,
        };

        Apis.postAPI("category.json",data).then(data => {
          console.log(data);
          if(data.status == '1'||data.status == 1){
            console.log(data.message);
           // alert(data.message);
           var category_data = data.category_data;
           console.log(category_data);
           this.setState({optionsArr:category_data});

           console.log(this.state.optionsArr);
            this.setState({animating: false});
          }else{
            console.log(data.message);
           // alert(data.message);
            this.setState({animating: false});
          }
        });
      });
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
        this.setState({
          avatarSource: response,
          isPic:true
        });

        console.log(this.state.avatarSource);
        
      }
    });
  }

    render() {

      var options =[{
        id:"1",
        cat:"Home"
      },
      {
        id:"2",
        cat:"Savings"
      }
      ];
      let dataDrop = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];

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
               <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Create' noBackBtn={true}/>  
                    <Tabs>

                     
                <ScrollView  title="Meme" style={styles.ScrollView} keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
                    <ImageBackground style={styles.imageContaner} > 
                      {
                        
                        !this.state.isPic? <TouchableOpacity style={styles.centerView} onPress={() =>this.selectPhotoTapped()}> 
                        <Image style={styles.centerImg} source={addPhotos}/>
                           <Text style={styles.addLbl}>Add Picture</Text>                   
                        </TouchableOpacity>:null
                      }
                       { 
                         this.state.isPic?<TouchableOpacity style={styles.secondCenterView} onPress={() =>this.selectPhotoTapped()}> 
                                     
                        </TouchableOpacity>:null
                       }
                    </ImageBackground>
                <View style={[css.topView,styles.tfView]}>
                  <Image source={this.state.titleColor} style={styles.titleIcon}/>
                     <TextInput
                        style={css.input}
                        ref="title"
                        placeholder="Add Title"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        onChangeText={value => this.setState({ title: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                 <View style={[css.topView,styles.tfView]}>
                  <Image source={this.state.tagColor} style={[styles.titleIcon,{width:17}]}/>
                     <TextInput
                        style={css.input}
                        ref="tag"
                        placeholder="Add Tag"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        onChangeText={value => this.setState({ tag: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>

                 <View style={[css.topView,styles.tfView]}> 
                 <Image source={categoryIcon} style={[styles.titleIcon]}/>
                  <Picker style={[styles.picker]} itemStyle={styles.pickerItem}
                      mode="dropdown"
                      selectedValue={this.state.selectedVal}
                      onValueChange = {this.updateUser}> 
                      {this.state.optionsArr.map((item, index) => {
                          return (<Picker.Item label={item.category_name} value={item.idx} key={item.idx}/>) 
                      })
                      }
                  </Picker>
                  {/* <Text style = {styles.text}>{this.state.selectedVal}</Text> */}
                </View>

               

                 {/* <TouchableOpacity style={[css.topView,styles.tfView]}>
                   <Image source={categoryIcon} style={[styles.titleIcon]}/>
                     <TextInput
                        style={css.input}
                        ref="category"
                        placeholder="Select Category"
                        disabled={true}
                        editable={false}
                        onChangeText={value => this.setState({ category: value })}
                        underlineColorAndroid="transparent"
                      />

                     
                </TouchableOpacity> */}
                <View style={styles.sharesView}>
                    <Text style={{fontSize:14, fontWeight:'600', color:'#000'}}>Share on</Text>
                      <View style={styles.row}>
                          <TouchableOpacity style={[styles.subRow]}>
                              <Image style={styles.socialBtn} source={deselect_fb}/>
                              <Text style={styles.socialLbl}>Facebook</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.subRow]}>
                             <Image style={styles.socialBtn} source={deselect_insta}/>
                            <Text style={styles.socialLbl}>Instagram</Text>
                          </TouchableOpacity>
                          
                        </View>
                         <View style={styles.row}>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_twitter}/>
                              <Text style={styles.socialLbl}>Twitter</Text> 
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_whatsapp}/>                               
                              <Text style={styles.socialLbl}>Whatsapp</Text>
                             </TouchableOpacity>
                        </View>
                         <View style={styles.row}>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_gPlus}/>                                
                              <Text style={styles.socialLbl}>Google+</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_pin}/>                                 
                              <Text style={styles.socialLbl}>Pinterest</Text>
                             </TouchableOpacity>
                        </View>
                         <View style={[styles.row,{height:20}]}>
                              <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_linkedIn}/>                                 
                              <Text style={styles.socialLbl}>LinkedIn</Text>
                              </TouchableOpacity>
                        </View>
                </View>
             <View style={{width:'84%', marginLeft:'8%'}}>
            <Button  title='Post' onPress={() => this._onSubmit()} /> 
                </View>
                <View style={css.tempView}></View>
                    <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
          </Text>
        </Animated.View>
            </ScrollView>
        
           
                 <ScrollView  title="Video" style={styles.ScrollView} keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
                    <ImageBackground style={styles.imageContaner}> 
                        <TouchableOpacity style={styles.centerView}>     
                        <Image style={styles.centerImg} source={addPhotos}/>
                           <Text style={styles.addLbl}>Add Video</Text>                   
                        </TouchableOpacity>
                    </ImageBackground>
                <View style={[css.topView,styles.tfView]}>
                  <Image source={this.state.titleColor} style={styles.titleIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Add Title"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                 <View style={[css.topView,styles.tfView]}>
                  <Image source={this.state.tagColor} style={[styles.titleIcon,{width:17}]}/>
                     <TextInput
                        style={css.input}
                        placeholder="Add Tag"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                 <TouchableOpacity style={[css.topView,styles.tfView]}>
                   <Image source={categoryIcon} style={[styles.titleIcon]}/>
                     <TextInput
                        style={css.input}
                        placeholder="Select Category"
                        disabled={true}
                        editable={false}
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                      />
                </TouchableOpacity>
                <View style={styles.sharesView}>
                    <Text style={{fontSize:14, fontWeight:'600', color:'#000'}}>Share on</Text>
                      <View style={styles.row}>
                          <TouchableOpacity style={[styles.subRow]}>
                              <Image style={styles.socialBtn} source={deselect_fb}/>
                              <Text style={styles.socialLbl}>Facebook</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.subRow]}>
                             <Image style={styles.socialBtn} source={deselect_insta}/>
                            <Text style={styles.socialLbl}>Instagram</Text>
                          </TouchableOpacity>
                          
                        </View>
                         <View style={styles.row}>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_twitter}/>
                              <Text style={styles.socialLbl}>Twitter</Text> 
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_whatsapp}/>                               
                              <Text style={styles.socialLbl}>Whatsapp</Text>
                             </TouchableOpacity>
                        </View>
                         <View style={styles.row}>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_gPlus}/>                                
                              <Text style={styles.socialLbl}>Google+</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_pin}/>                                 
                              <Text style={styles.socialLbl}>Pinterest</Text>
                             </TouchableOpacity>
                        </View>
                         <View style={[styles.row,{height:20}]}>
                              <TouchableOpacity style={[styles.subRow]}>
                                <Image style={styles.socialBtn} source={deselect_linkedIn}/>                                 
                              <Text style={styles.socialLbl}>LinkedIn</Text>
                              </TouchableOpacity>
                        </View>
                </View>
             <View style={{width:'84%', marginLeft:'8%'}}>
            <Button  title='Post'  /> 
                </View>
                <View style={css.tempView}></View>
                    <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
          </Text>
        </Animated.View>
            </ScrollView>
        
        
         </Tabs>
            </View>
        )
    }

}
        const styles = StyleSheet.create({
            container: {
                flex: 1,  
                width:'100%',  
                backgroundColor:'#fff'                        // Take up all screen
            },
             titleIcon:{
                marginLeft:10,
                height:17,
                width:19,
                },
        ScrollView:{marginTop:0,height:'100%', width:'100%',backgroundColor:'white'},
        row:{marginTop:10, height:30, width:'100%',flexDirection:'row', justifyContent:'flex-start'},
        subRow:{height:30, width:'50%', flexDirection:'row', justifyContent:'flex-start'},
        headerLbl:{ fontSize:16, fontWeight:'700',color:'#000'},
        socialBtn:{height:25, width:25, alignSelf:'center'},
        socialLbl:{marginLeft:7, alignSelf:'center'},
        topLbl:{ marginTop:10, color:'#000',fontSize:13 },
        imageContaner:{marginTop: 10, height:140, width:'84%',marginLeft:'8%', borderColor:colors.buttonBg, borderWidth:1.5, borderRadius:5},
        tfView:{ marginTop:12, width:'84%', marginLeft:'8%' },

        headerView:{ top:10, height:30,width:'84%'},
        centerView:{marginTop:45, height:50, width:80, alignSelf:'center'},
        secondCenterView:{marginTop:10, height:200, width:200,alignSelf:'center'},
        centerImg:{height:30, width:35, alignSelf:'center'},
        addLbl:{marginTop:5,fontSize:14, fontWeight:'400', color:colors.buttonBg},
        sharesView:{marginTop:20, height:175, width:'84%', marginLeft:'8%'},
        pickerStyle:{
          backgroundColor:"#607EE7"
        },

        ddView: {
          top:-15,
          width:'80%',
          marginLeft:'10%',
          height: 64,
           borderBottomWidth: 1,
          borderBottomColor: "transparent"
         
         },

         picker: {
          width: 200,
          height: 44,
          
          borderColor: 'red',
          borderBottomWidth: 2,
          flex: 90
        },
        
        pickerItem: {
          height: 44,
          color: 'red'
        },


        })
