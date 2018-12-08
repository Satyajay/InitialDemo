import { StyleSheet, PixelRatio,Platform,Dimensions } from 'react-native';
const deviceScreen = require('Dimensions').get('window')
const { width, height } = Dimensions.get('window');
module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: '#B99BC4',
  },
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
  },
  background: {
    height:'100%',
    width:'100%'
  },
  forgotPasswordText: {
    width:'80%',
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "right",
    fontSize:14,
    fontFamily:'Montserrat-Regular',    
    marginLeft: '10%',
  },
   signupHeaderWrapper: {
    top:25,
    width:'80%',
    marginLeft:'10%',
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupLbl:{
  color: "#fff",
  fontSize:17,
  fontFamily:'Montserrat-Regular',
  },
 markWrap: {
    top:20,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
   mark: {
    width:155,
    alignItems:'center',
    height: 50,
  },



  button: {
    paddingVertical: 20,
    width:'80%',
    marginLeft:'10%',
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor:'#fff'
  },

 buttonText: {
    marginTop:12,
    marginLeft:20,
    color: "#000",
    fontFamily:'Montserrat-Regular',
    backgroundColor:'transparent',
    fontSize: 16,
   
  },

  otherButton: {
    color: "#fff",
    backgroundColor:'transparent',
    fontSize: 15,
    fontFamily:'Montserrat-Bold',
   
  },
  
  signupbuttonView: {
    paddingVertical: 0,
    width:'80%',
    marginLeft:'10%',
    borderWidth: 1,
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
   accountText: {
    color: "#fff",
    fontFamily:'Montserrat-Regular',
    textAlign:'center',
    fontSize:14,
  },
  controlPanel: {
  //  flex: 1,
    width:280,
    //backgroundColor:'#326945',
    height:deviceScreen.height,
  },
  controlPanelText: {
    color:'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
  },
  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold',
  },
  categoryLabel: {
    fontSize: 15,
    textAlign: 'left',
    left: 10,
    padding:10,
    fontWeight:'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',

    alignItems: 'center'
  },
  lastRow: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
    alignItems: 'center'
  },
  rowLabel: {
    left:10,
    fontSize:15,
    flex:1,
  },
  rowInput: {
    right:10,
  },
  sliderMetric: {
    right:10,
    width:30,
  },
  slider: {
    width: 150,
    height: 30,
    margin: 10,
  },
  picker: {
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
  },
  label: {
    fontSize: 20,
    textAlign: 'left',
    margin: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    
  Tfwrapper:{
    top:10,
    height:40,
    marginVertical: 15,
    width:'80%',
    marginLeft :'10%',
    
  },

  //****** Login Screen wrapper *********//

   Loginwrapper: {
    marginTop:-20,
    paddingVertical: 30,
  },
  
  LoginbuttonText: {
    color: "#607EE7",
    fontFamily:'Montserrat-Bold',
    backgroundColor:'transparent',
    fontSize: 15,
   
  },

  checkoutWrap: {
    marginTop:-30,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  


checkoutText: {
    color: "#fff",
    fontFamily:'Montserrat-Regular',
    textAlign:'center',
  },

 playButton: {
    marginTop:30,
    height:60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * Tutorial Screen CSS
   */
  buttonWrapper:{
    marginTop: 50,
    flex:0.3,
    width:'90%',
    marginLeft:'5%',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
  },

  skipBtnWraper:{
    backgroundColor:'transparent',
    width:'45%'
},
skipBtn: {
  width:'90%',
  left:0,
  borderWidth: 0.5,
  height: 45,
  borderRadius: 25,
  borderColor: '#fff',
  alignItems: "center",
  justifyContent: "center",
},
skipBtnText: {
  color: "#fff",
  fontWeight:'bold',
  backgroundColor:'transparent',
  fontSize: 14,
  fontFamily:'Montserrat-Regular',
 
},


/*
 * Control Panel CSS
 */
line:{
  height:2,
  width:'100%',
  backgroundColor:'cyan',
  opacity:0.3
},
menu: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 20,
  //backgroundColor:'red'
},
menuText: {
  marginLeft: 10,
  fontSize:15,
  fontFamily:'Montserrat-Regular',
  color:'#fff'
},
sideMenu: {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  //width: SideMenuWidth,
  flex:1
  //backgroundColor: 'red'
},

iva:{
  height:12,
  width:25,
  marginLeft:-5,
 },

 leftIcon:{
  height:20,
  width:20,
  marginLeft:-5,
},

terms:{
  height:25,
  width:20,
  marginLeft:-5,
},
fixedFooter: {
  width:'100%',
  marginTop: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: 50,
},

Sideheader: {
  marginLeft:10,
  marginTop: 30,
  marginBottom: 30
},
userInfosHolder: {
  marginLeft:0,
  flexDirection: 'row',
},
userInfos: {
  height: 50,
  marginLeft:16,
},

avatar: {
  left:4,
  width: 60,
  height: 60,
  borderRadius: 30
},
username: {
  top:7,
  fontSize:17,
  fontFamily:'Montserrat-Regular',
  color:'#fff'
},
email:{
 top:17,
 color:'#fff',
 fontFamily:'Montserrat-Regular',
 fontSize:13
},

nextBtn: {
  width:'90%',
  left:'10%',
//  borderWidth: 0.5,
  height: 45,
  borderRadius: 25,
  borderColor: '#fff',
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:'#fff'
},
nextButtonText: {
  color: "#607EE7",
  fontWeight:'bold',
  left:-5,
  backgroundColor:'transparent',
  fontSize: 14,
  fontFamily:'Montserrat-Regular',
 
},

/*
 * HEADER CSS 
 * 
 */

 gredient:{
    height: Platform.OS === 'ios' ? 64 : 44,
    flexDirection: 'column' 
 },


 statusBar:{
  top: 0,
  height: 20,
  width: '100%' 
 },

 menuContainer:{
  top: 0,
  flex:1,
  height: 44,
  flexDirection:'row',
  justifyContent:'flex-start'
 },

 backBtnView:{
    width: 50,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
   },
 
 backBtn:{
    height: 20,
     width: 11
   },

textContainer:{
   justifyContent:'center',
   flex:1,
   width: width,
   marginRight:50,
   height: 44,
   alignItems:'center',
   flexDirection:'column'
   },


   headerText:{
     alignSelf:'center',
     color:'#fff',
     fontFamily:'Montserrat-Regular',
     fontSize:18
    },


  //**** Forgot password CSS //

  infoWrap: {
    width:'80%',
    marginLeft:'10%',
    marginTop:20,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  //***** Profile screen CSS //
  profilebuttonText: {
    marginTop:15,
    color: "#607EE7",
    backgroundColor:'transparent',
    fontFamily:'Montserrat-Regular',
    fontSize: 15,
    textAlign:'center'
   
  },
   prowrapper:{
      marginTop: 10,
      width: '94%',
      marginLeft:'3%',
      backgroundColor:'#fff',
      borderRadius:25,
      height: 500
    },

 picWrapper:{
    marginTop:20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  profileLbl: {
  marginTop:15,
  color: "#607EE7",
  backgroundColor:'transparent',
  fontSize: 15,
  fontFamily:'Montserrat-Regular',
  textAlign:'center'
},
   profilepIc:{
        height:110,
        width:110,
        borderRadius: 55,
        alignItems:'center',
    },
  //*********  About Screen Css ******//
    wrapper:{
      marginTop: 10,
      width: '94%',
      marginLeft:'3%',
      backgroundColor:'#fff',
      borderRadius:20,
      height: 'auto'
    },

  aboutLbl: {
    marginTop:15,
    fontFamily:'Montserrat-Regular',    
    color: "#607EE7",
    backgroundColor:'transparent',
    fontSize: 15,
    //fontWeight:'500',
    textAlign:'center'
  },

  desc:{
    marginTop:12,
    width:'90%',
    opacity:0.9,
    marginBottom:25,
    marginLeft:'5%',
    fontSize:15,
    fontFamily:'Montserrat-Regular',
    color:'#000',
  },

   tempView:{
      height:100,
      width:'100%',
      backgroundColor:'transparent'
    },

  //*********  Seettings Screen Css ******//
   enableText: {
    marginTop:10,
    marginLeft:20,
    color: "#000",
    fontFamily:'Montserrat-Regular',
    backgroundColor:'transparent',
    fontSize: 16,
   
  },

   configueLbl:{
    marginTop:25,
    fontFamily:'Montserrat-Regular',
    marginLeft:'3%',
    textAlign:'left',
    width:'94%',
    color:'#607EE7'
  },
   switchContainer: {
    width:'94%',
    marginLeft:'3%',
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    borderRadius: 25,
    borderColor: '#fff',
    marginTop: 15,
    backgroundColor:'#fff'
  },

  Switch:{
    marginTop:4,
    marginRight:10
  },

});
