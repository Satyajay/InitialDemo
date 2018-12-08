import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions,AsyncStorage, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground,Animated, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler,Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
import Button from '../common/buttons'
import colors from '../common/colors'
import Toast from 'react-native-custom-toast';
const mailActive = require("../images/mail_selected.png");
const mailinActive = require("../images/mail_unselected.png");
const userselIcon = require("../images/username_selected.png");
const userunSelIcon = require("../images/username_unselected.png");
const descinActive = require("../images/description.png");
const descActive = require("../images/description_selected.png");
const titleInactive = require("../images/title_unselected.png");
const titleActive = require("../images/title_selected.png");
const APIs = require( '../utils/Api');
const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const nameRegex=/^[a-zA-Z ]+$/;
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height




export default class ContactUs extends Component {

     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

    constructor(props) {
        super(props);
          this.animatedValue = new Animated.Value(0)
        this.animatedXValue = new Animated.Value(-windowWidth)
        this.state = {
              mailColor: mailinActive,
              userIcon:userunSelIcon,
              descColor: descinActive,
              titleColor:titleInactive,
              animating: false,
              message:null,
              toastColor: 'green',
              modalVisible: false,
              email:null,
              title:null

        };
    }

    componentWillMount() {
            AsyncStorage.getItem('emailId').then((emailId) => {   
           this.setState({
               email:emailId
           });
          });
            BackHandler.addEventListener('hardwareBackPress', this.backPressed);
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

   setModalVisible() {
    this.setState({modalVisible: true});
    let that= this;
    setTimeout(function(){
    that.setState({modalVisible: true});
      that.props.navigation.goBack();
    },3000);
   
  }

    componentWillUnmount() {
         
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
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

        onDescFocus(){
            this.setState({
            descColor: descActive
            })
        }


        ontitleBlur() {
            this.setState({
            titleColor: titleInactive
            })
        }

        ontitleFocus(){
            this.setState({
            titleColor: titleActive
            })
        }





          onDescBlur(){
            this.setState({
            descColor: descinActive
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

    _onSubmit(){
        const { email, rname,title,message } = this.state;
        if(email==''||email==null){
        this.callToast('Please enter email id','error')      
        }else if(!email.match(emailRegex)){
        this.callToast('Please enter valid email id','error')
        }else if(rname==''||rname==null){
        this.callToast('Please enter name','error')
        }else if(!rname.match(nameRegex)){
        this.callToast('Please enter valid name','error')
        }else if(title==''||title==null){
        this.callToast('Please enter title','error')
       }else if(message==''||message==null){
        this.callToast('Please enter description','error')
        } else {
        AsyncStorage.getItem('auth_key').then((Auth_key) => {   
        let contactData = {
            'auth_key': Auth_key,
            'email':email,
            'name':rname,
            'title':title,
            'message':message
        };
        this.setState({animating: true});
        APIs.contactUs(contactData).then(data => {
            console.log(data);
            if(data.status == '1' || data.status == 1){
              console.log(data.message);
              this.setState({animating: false});
              this.setModalVisible();
              //this.props.navigation.goBack();
            }else{
              console.log(data.message);
              this.setState({animating: false});
            }
        });
        });
        }
    }

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
             
           <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Contact Us' />
                <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ color: 'white',  fontSize:14,  textAlign:'center'}}>
            { this.state.message }
          </Text>
        </Animated.View>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} style={{flex:1, width:'84%', marginLeft:'8%'}}>
                 <Text style={styles.desc}>We would love to hear from you. {'\n'} Just fill out the form below</Text>
                  <View style={[css.topView,styles.tfWrapper]}>
                    <Image source={this.state.mailColor} style={css.mailIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Email Id"
                        onBlur={ () => this.onmailBlur() }
                        onFocus={ () => this.onmailFocus() }
                        keyboardType={'email-address'}
                        onChangeText={value => this.setState({ email: value })}
                        underlineColorAndroid="transparent"
                        value={this.state.email}
                        editable={false}
                      />
                </View>
                 <View style={css.bottomView}>
                    <Image source={this.state.userIcon} style={css.userIcon}/>
                     <TextInput
                        style={css.input}
                        placeholder="Name"
                        ref="name"
                        onBlur={ () => this.onnameBlur() }
                        onFocus={ () => this.onnameFocus() }
                        returnKeyType='next'
                        onChangeText={value => this.setState({ rname: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                 <View style={css.bottomView}>
                    <Image source={this.state.titleColor} style={[css.userIcon,{width:16}]}/>
                     <TextInput
                        style={css.input}
                        placeholder="Title"
                        ref="title"
                        onBlur={ () => this.ontitleBlur() }
                        onFocus={ () => this.ontitleFocus() }
                        returnKeyType='next'
                        onChangeText={value => this.setState({ title: value })}
                        underlineColorAndroid="transparent"
                      />
                </View>
                <View style={styles.textAreaView}>
                    <Image source={this.state.descColor} style={styles.descIcon}/>
                     <TextInput
                        style={[css.input,styles.textArea]}
                        placeholder="Description"
                        multiline = {true}
                        numberOfLines = {4}
                        ref="desc"
                        returnKeyType='done'
                        onChangeText={value => this.setState({ message: value })}
                        onBlur={ () => this.onDescBlur() }
                        onFocus={ () => this.onDescFocus() }
                        underlineColorAndroid="transparent"
                      />
                </View>
                <Button onPress={() => this._onSubmit()} title='Submit' />
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
                <View style={{marginTop:30,height:60, width:60, borderRadius:30, backgroundColor:'green'}}></View>
                <Text style={styles.topText}>Thank You!</Text>
                <Text style={styles.descriptions}>Your request has been received.</Text>
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
        backgroundColor: '#FFFFFF',
        
    },
    tfWrapper:{
        marginTop:50,
    },
    textArea:{
      marginTop:-10,
      height:80
    },
     mailIcon:{
     marginLeft:10,
     height:12,
     width:17,
    },

    descIcon:{
     marginTop:-50,
     marginLeft:10,
     height:20,
     width:20,
    },
    textAreaView:{
        height: 100,  borderRadius: 5, backgroundColor:colors.tfViewColor, marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    desc:{top:20, textAlign:'center', fontSize:14, color:'#000', opacity:0.8,fontWeight:'500'},

    title:{marginLeft:15,color:colors.grayColor, alignSelf:'center', fontSize:15, fontWeight:'500',opacity:0.8},

     transaparentView:{flex:1, backgroundColor:"rgba(0,0,0,0.7)", alignItems:'center', flexDirection:'row', justifyContent:'center'},

    centerView: {height:200, width:300, borderRadius:5, backgroundColor:'#fff', alignSelf:'center',alignItems:'center'},

    topText:{top:20, textAlign:'center', fontSize:18, fontWeight:'700', color:'#000'},

    descriptions:{marginTop:35, textAlign:'center', fontSize:15, color:'#000', opacity:0.7,fontWeight:'400'},
    
    
  
})


