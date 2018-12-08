import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Dimensions,
  ImageBackground,
  ScrollView,
  Image,TouchableOpacity,Keyboard, TouchableHighlight
} from 'react-native';
const { width, height } = Dimensions.get('window');
import {GiftedChat, Actions, SystemMessage} from 'react-native-gifted-chat';
import Bubble from './Bubble';
import Modal from 'react-native-simple-modal';
import ModalWrapper from 'react-native-modal-wrapper';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import LinearGradient from 'react-native-linear-gradient';
import InputToolbar from './InputToolbar';
const personIcon = require("../images/login1_person.png");
const headerBg = require("../images/headerImg.png");
const backIcon = require("../images/backIcon.png");
const fillImg = require("../images/Fill.png");
const main = require("../images/rec.png");
const closeBtn = require("../images/close.png");
const suggestHeight=0;

export default class Login extends Component {

   static navigationOptions = ({ navigation }) => ({
       header: null,
    });
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  
//export default class Example extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      messages: [],
      modalVisible: false,
      loadEarlier: true,
      typingText: null,
      open: false,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.click=this.click.bind(this);

    this._isAlright = null;
  }

modalDidOpen = () => console.log('Modal did open.')

modalDidClose = () => {
      this.setState({open: false});
      console.log('Modal did close.');
    }
  
    moveUp = () => this.setState({offset: -100})
  
    resetPosition = () => this.setState({offset: 0})
  
    openModal = () => this.setState({open: true})
  
    closeModal = () => this.setState({open: false})


componentWillMount() {
   this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('../data/messages.js'),
      };
    });
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    this.setState({
      messages2: [
        {
          _id: 1,
          text: 'Hi! I am Eva! Ask me anout lorem ipsum',
          color:'red',
          user: {
            _id: 2,
            name: 'React Native',
            avatar: {backIcon},
           
          },
        },
        {
          _id: 2,
          text: 'Want to know about recent opportunities?',
           color:'red',
          user: {
            _id: 2,
            name: 'React Native',
            avatar: {backIcon},
          },
        },
        {
          _id: 3,
          text: 'How about last week sales leads?',
           color:'red',
          user: {
            _id: 2,
             color:'red',
            name: 'React Native',
            avatar: {backIcon},
          },
        },
        {
          _id: 4,
          text: 'Add a new client?',
           color:'red',
          //createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require("../images/reciever.png"),
          },
        },
      ],
    });
  }
  

  _keyboardDidShow () {
    //alert('Keyboard Shown');
  }

  _keyboardDidHide () {
    //this.setModalVisible(false);
    //alert('Keyboard Hidden');
  }


  componentWillUnmount() {
    this._isMounted = false;
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setModalVisible(false);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }
  click(value){
    if(value.length>3){
     this.setModalVisible(true);
    }
   //alert(value);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require("../images/reciever.png")
           // avatar:{personIcon},
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}

        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (  
        <CustomActions
          {...props}
        />
     
    );
  }

      
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#5784E8',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
         
        }}
        textStyle={{
          fontSize: 14,
         // color:'red'
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
       backgroundColor='#fff'
        {...props}
      />
    );
  }
  
 hideModal(){
  this.setModalVisible(false);
 }

  renderFooter(props) {
    if (this.state.typingText) {

      
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  

  renderInputToolbar(props){
    return (
      <InputToolbar {...props} 
      openChat={() => {
          //this.setState({open: true})
        }}/>
    )
  }


componentDidMount() {
		_keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
		_keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
	}
	componentWillUnmount() {
		_keyboardWillShowSubscription.remove();
		_keyboardWillHideSubscription.remove();
	}
	_keyboardWillShow(e) {
		this.setState({height: height - e.endCoordinates.height});
    suggestHeight=eval(height - e.endCoordinates.height-50);
    
	}
	_keyboardWillHide(e) {
		this.setState({height: height});
	}

//253, 216
  render() {
    return (
      <View style={{backgroundColor:'#fff', height:'100%', width:'100%',flex:1}}>
        {
         !(this.state.modalVisible) ?<ImageBackground source={headerBg} style={{ height: Platform.OS === 'ios' ? 64 : 44, flexDirection: 'column' }}>
            {Platform.OS === 'ios' ? <View style={{ top: 0, height: 20, width: '100%' }}></View> : null}
            <View style={{ top: 0,flex:1, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}  >
                    <View style={{ width: 50, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={backIcon} style={{ height: 20, width: 11 }} />
                    </View>
                </TouchableOpacity>
                  <TouchableOpacity style={{ justifyContent:'center', flex:1, width: width,marginRight:50, height: 44, alignItems:'center',  flexDirection:'column' }} onPress={() => this.openModal()}  >
                    <View>
                        <Text style={{alignSelf:'center',color:'#fff', fontSize:18}}>SALESFORCE CRM</Text>
                    </View>
                    </TouchableOpacity>
            </View>
        </ImageBackground>:null
        }

 
      {/*{
          // Pass any View or Component inside the curly bracket.
          // Here the ? Question Mark represent the ternary operator.
        this.state.modalVisible ?<LinearGradient colors={['#6079ea', '#28cfdd']} style={{width:'100%', height:suggestHeight}}>
         <ImageBackground source={fillImg} style={{width:'100%',flex:1, marginTop:0}}>
           <View style={{ top: 0, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
            <View style={{justifyContent:'center', flex:1, width: '100%', alignItems:'center',  flexDirection:'column' }}>
                <Text style={{alignSelf:'center',color:'#fff', fontSize:20, fontFamily:'Montserrat-Regular'}}>WELCOME TO IVA</Text>
            </View>
            </View>
            <ScrollView style={{flex:1}}>
          <View style={{flex:1}}>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>             
             <Text style={styles.autoSugeestion}>Hi! I am Eva! Ask me about lorem ipsum </Text>
             </TouchableOpacity>
           </View>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>
             <Text style={styles.autoSugeestion}>Want to know abour recent opportunities?</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>             
             <Text style={styles.autoSugeestion}>How about last week sales leads?</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>
             <Text style={styles.autoSugeestion}>Add a new client? </Text>
             </TouchableOpacity>
           </View>
            </View>
            </ScrollView>
           </ImageBackground>
         </LinearGradient> : null
      }*/}

<ModalWrapper
      isNative={false}
      onRequestClose={this.onRequestClose}
      position='left'
      shouldAnimateOnRequestClose={true}
      showOverlay={false}
      visible={this.state.modalVisible}>
    {/*<View style={{height:560, width:'100%', bottom:0,backgroundColor:'red'}}>
      <Text style={styles.modalText}>Modal without overlay</Text>
    </View>*/}
<LinearGradient colors={['#6079ea', '#28cfdd']} style={{height:560, width:'100%', top:0,}}>
         <ImageBackground source={fillImg} style={{width:'100%',flex:1, marginTop:300}}>
           <View style={{ top: 0, height: 44,flexDirection:'row',justifyContent:'flex-start'}}>
            <View style={{justifyContent:'center', flex:1, width: '100%', alignItems:'center',  flexDirection:'column' }}>
                <Text style={{alignSelf:'center',color:'#fff', fontSize:20, fontFamily:'Montserrat-Regular'}}>WELCOME TO IVA</Text>
            </View>
            </View>
            <ScrollView style={{flex:1}}>
          <View style={{flex:1}}>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>             
             <Text style={styles.autoSugeestion}>Hi! I am Eva! Ask me about lorem ipsum </Text>
             </TouchableOpacity>
           </View>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>
             <Text style={styles.autoSugeestion}>Want to know abour recent opportunities?</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>             
             <Text style={styles.autoSugeestion}>How about last week sales leads?</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.wrapper}>
             <TouchableOpacity onPress={() => this.hideModal()}>
             <Text style={styles.autoSugeestion}>Add a new client? </Text>
             </TouchableOpacity>
           </View>

           <View style={{height:50}}>
             
           </View>
            </View>
            
            </ScrollView>
           </ImageBackground>
         </LinearGradient>
  </ModalWrapper>


 
      <GiftedChat
        renderInputToolbar={this.renderInputToolbar} 
        messages={this.state.messages}
        onSend={this.onSend}
        onInputTextChanged={this.click}
        //loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        renderAvatarOnTop={true}
        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />


        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', marginTop:-5}}>
            <TouchableOpacity
            style={{ marginTop:0, width: '100%'}}
                onPress={this.closeModal}>
              <View style={{flexDirection:'row',marginLeft:10, width:'100%', height:40,marginTop:0}}>
            <Image source={closeBtn} style={{ height: 30, width: 30, marginLeft:'88%'}} />
            </View>
          </TouchableOpacity>
            
          <View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={main} style={{ height: 150, width: 150 }} />
          </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  autoSugeestion:{
    paddingLeft:10,
    paddingRight:10,
    alignSelf:'center',
    lineHeight:18,
    marginTop:10,
    fontSize:15,color:'#5784E8',
    fontFamily:'Montserrat-Regular',
    marginBottom:10
      },
       
   wrapper: {
      borderRadius: 10,
      backgroundColor: '#fff',
      marginLeft: 60,
      alignItems:'center',
      alignSelf:'flex-start',
      maxWidth:'70%',
      marginTop: 13,
      //minHeight: 40,
      justifyContent: 'flex-start',
      //flexDirection:'column' ,
      borderBottomLeftRadius: 1,
    },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
