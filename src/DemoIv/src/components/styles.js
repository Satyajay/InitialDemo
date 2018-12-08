import { StyleSheet, PixelRatio } from 'react-native';
const deviceScreen = require('Dimensions').get('window')

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
    backgroundColor:'transparent',
    fontSize: 16,
   
  },

  otherButton: {
    color: "#fff",
    fontWeight:'bold',
    backgroundColor:'transparent',
    fontSize: 14,
    fontFamily:'Montserrat-Regular',
   
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
  },
  controlPanel: {
    flex: 1,
    width:300,
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
    fontWeight:'bold',
    fontFamily:'Montserrat-Regular',
    backgroundColor:'transparent',
    fontSize: 14,
   
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
  fontFamily:'Helvetica',    
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
    fontSize: 14,
    fontWeight:'500',
    textAlign:'center'
  },

  desc:{
    marginTop:12,
    width:'90%',
    opacity:0.9,
    marginBottom:25,
    marginLeft:'5%',
    fontSize:14,
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
    marginTop:3,
    marginRight:10
  },

});
