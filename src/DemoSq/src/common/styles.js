import { StyleSheet, PixelRatio, Platform, Dimensions } from 'react-native';
const deviceScreen = require('Dimensions').get('window')
const { width, height } = Dimensions.get('window');
import colors from './colors'
//import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: '#B99BC4',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: "center"
  },
  background: {
    height: '100%',
    width: '100%'
  },
  topView: {
    height: 40, borderRadius: 5, marginTop: 0,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    height: 40, borderRadius: 5, backgroundColor: colors.tfViewColor, marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgotPasswordText: {
    color: colors.txtWhite,
    backgroundColor: "transparent",
    textAlign: "right",
    fontSize: 14,
    fontWeight: '400',
    alignItems: 'flex-end',
    //top:20
  },
  input: {
    left: 10,
    backgroundColor: 'transparent',
    height: 40,
    color: '#fff',
  },
  socialView: { height: 60, width: 120, marginTop: 10, alignSelf: 'center', flexDirection: 'row' },
  socialBtn: { height: 50, width: 50, borderRadius: 25, backgroundColor: "#fff", alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupHeaderWrapper: {
    top: 25,
    width: '80%',
    marginLeft: '10%',
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupLbl: {
    color: "#fff",
    fontSize: 17,
    //fontFamily:'Montserrat-Regular',
  },
  markWrap: {
    top: 20,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
  mark: {
    width: 155,
    alignItems: 'center',
    height: 50,
  },



  button: { left: 30, width: width - 60, marginTop: 20, height: 40, borderRadius: 20, backgroundColor: "#fff", flexDirection: 'row', justifyContent: "center" },


  otherButton: {
    color: "#fff",
    backgroundColor: 'transparent',
    fontSize: 15,
    // fontFamily:'Montserrat-Bold',

  },
roww:{marginTop:0, marginBottom:0,flex: 1,width:'100%',flexDirection: "row",backgroundColor:'#f2f2f2'},
  signupbuttonView: {
    paddingVertical: 0,
    width: '80%',
    marginLeft: '10%',
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
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 14,
  },
  controlPanel: {
    //flex: 1,
    width: 300,
    //backgroundColor:'#326945',
    height: deviceScreen.height,
  },
  controlPanelText: {
    color: 'white',
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
    color: 'white',
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 15,
    textAlign: 'left',
    left: 10,
    padding: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',

    alignItems: 'center'
  },
  lastRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
    alignItems: 'center'
  },
  rowLabel: {
    left: 10,
    fontSize: 15,
    flex: 1,
  },
  rowInput: {
    right: 10,
  },
  sliderMetric: {
    right: 10,
    width: 30,
  },
  slider: {
    width: 150,
    height: 30,
    margin: 10,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 0,
    padding: 0,
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

  Tfwrapper: { height: 40, left: 30, width: width - 60 },
  logo: { marginTop: 40, height: 100, width: 80, alignSelf: 'center' },
  screenName: { marginTop: 20, alignSelf: 'center', fontSize: 25, fontWeight: '500', color: colors.txtWhite },
  leftIcon: { height: 15, width: 15, marginLeft: 0 },
  bottomLine: { height: 1.5, width: '100%', marginTop: 0, opacity: 0.7, backgroundColor: "#fff" },
  forgotView: { left: 30, width: width - 60, marginTop: 10 },
  //****** Login Screen wrapper *********//

  Loginwrapper: {
    marginTop: 0,
    // alignItem:'center',
    paddingVertical: 30
  },
  swipperWrap: { top: 0, flex: 1, width: '100%' },
  loginWrap: { left: 0, height: 30, width: '33.33%' },
  blankView: { height: 30, width: '33.33%' },
  headerView: {
    // height: scaleHeight(45),
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '84%'
    //alignItems: 'center',
  },
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  socialwrapper: {
    //  height: scaleHeight(45), marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mailIcon: {
    marginLeft: 10,
    height: 13,
    width: 17,
  },
  phoneIcon: {
    marginLeft: 10,
    height: 18,
    width: 16,
  },
  userIcon: {
    marginLeft: 10,
    height: 17,
    width: 17
  },
  dpWrap: { height: 80, width: 80, borderRadius: 40, alignSelf: 'center' },
  touchedView: { height: 30, width: 30, top: 50, borderRadius: 15, backgroundColor: colors.buttonBg, marginLeft: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:2
 },
  border: { borderRadius: 40 },
  addPic: { height: 20, width: 20 },

  buttonTitle: { alignSelf: 'center', fontSize: 16, fontWeight: '500', color: '#4698DA' },
  passIcon: {
    marginLeft: 10,
    height: 17,
    width: 14,

  },

  orLabelStyle: {
    marginTop: 85, fontSize: 14, fontWeight: '500', textAlign: "center", color: '#000'
  },

  checkoutWrap: {
    marginTop: -30,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  BorderClass:
  {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30
  },


  checkoutText: {
    color: "#fff",
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },

  playButton: {
    marginTop: 30,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  /*
   * Tutorial Screen CSS
   */
  buttonWrapper: {
    marginTop: 50,
    flex: 0.2,
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
  },
  applyLbl:{fontSize:13,fontWeight:'500', alignSelf:'center', color:'white', textAlign:'center'},
  btnWrapper:{height:40,width:'100%', flexDirection:'row', justifyContent:'flex-start'},
  applyBtn:{height:30,marginLeft:10,width:120,borderRadius:20, backgroundColor:colors.buttonBg,justifyContent:'center'},
  skipBtnWraper: {
    backgroundColor: 'transparent',
    width: '45%'
  },
  skipBtn: {
    width: '90%',
    left: 0,
    borderWidth: 0.5,
    height: 45,
    borderRadius: 25,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  skipBtnText: {
    color: "#fff",
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',

  },


  /*
   * Control Panel CSS
   */
  line: {
    height: 2,
    width: '100%',
    backgroundColor: 'cyan',
    opacity: 0.3
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    //backgroundColor:'red'
  },
  cancelBtn:{height:30,width:120,borderRadius:20, justifyContent:'center', backgroundColor:colors.buttonBg,position:'absolute',right:10},
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#fff'
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    //width: SideMenuWidth,
    flex: 1
    //backgroundColor: 'red'
  },

  iva: {
    height: 12,
    width: 25,
    marginLeft: -5,
  },


  leftThumb: { height: 20, width: 20, marginLeft: 10, alignSelf: 'center' },
  arrowIcon: { height: 14, width: 14, alignSelf: 'center', marginLeft: 0 },
  terms: {
    height: 25,
    width: 20,
    marginLeft: -5,
  },
  fixedFooter: {
    width: '100%',
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  staticRow: { flex: 1, flexDirection: "row" },
  favourite: { height: 30, width: 35, alignSelf: 'center' },

  staticLikesContaner: { flexDirection: 'row', alignItems: 'flex-start', marginLeft: 10 },

  likedImg: { height: 25, width: 25, alignSelf: 'center' },
  name: {
    fontSize: 15,
    marginTop: 25,
    fontWeight: '600',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 5,
    color: colors.grayColor
  },
  content: {
    fontSize: 13,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  likedLbl: { color: colors.grayColor, fontSize: 14, alignSelf: 'center' },
  actionView: { flex: 1, flexDirection: "row", marginLeft: 20, marginRight: 10 },
  likeView: { flexDirection: "row", width: '33.33%', alignSelf: 'center', justifyContent: 'flex-start' },

  likeImage: { height: 20, width: 20, alignSelf: 'center' },

  commentView: { flexDirection: "row", width: '33.33%', justifyContent: 'center' },
  commentImg: { height: 20, width: 20, alignSelf: 'center', marginLeft: 5 },

  shreView: { flexDirection: "row", flex: 1, width: '33.33%', alignItems: 'flex-end', justifyContent: 'flex-end' },

  shareImg: { height: 20, width: 22, marginLeft: '33%', alignSelf: 'center' },

  Sideheader: {
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 30
  },
  userInfosHolder: {
    marginLeft: 0,
    flexDirection: 'row',
  },
  userInfos: {
    height: 50,
    marginLeft: 16,
  },

  avatar: {
    left: 4,
    width: 60,
    height: 60,
    borderRadius: 30
  },
  username: {
    top: 7,
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    color: '#fff'
  },
  email: {
    top: 17,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13
  },





  gredient: {
    height: Platform.OS === 'ios' ? 64 : 44,
    flexDirection: 'column',
    //backgroundColor:colors.headerColor
  },


  statusBar: {
    top: 0,
    height: 20,
    width: '100%'
  },

  menuContainer: {
    top: 0,
    flex: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  backBtnView: {
    width: 50,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },

  backBtn: {
    height: 20,
    width: 11
  },

  textContainer: {
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
    height: 44,
    alignItems: 'center',
    flexDirection: 'row'
  },
  circileLeft: { height: 30, width: 30, borderRadius: 15, backgroundColor: colors.buttonBg, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  textContainer2: {
    justifyContent: 'center',
    // flex:1,
    borderRadius:10,
    alignSelf: 'center',
    height: 25,
    width: 150,
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileTf: { flex: 1, fontSize: 14, color: '#000' },


  headerText: {
    marginTop: 5,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '300',
    height: 25,

    textAlign: 'center',
    // fontFamily:'Montserrat-Regular',
    fontSize: 16
  },




  //**** Forgot password CSS //

  infoWrap: {
    width: '80%',
    marginLeft: '10%',
    marginTop: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  container: { flex: 1, backgroundColor: "#093164" },
  //***** Profile screen CSS //
  profilebuttonText: {
    marginTop: 15,
    color: "#607EE7",
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    textAlign: 'center'

  },
  prowrapper: {
    marginTop: 10,
    width: '94%',
    marginLeft: '3%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 500
  },

  picWrapper: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  profileLbl: {
    marginTop: 15,
    color: "#607EE7",
    backgroundColor: 'transparent',
    fontSize: 15,
    //fontFamily:'Montserrat-Regular',
    textAlign: 'center'
  },
  profilepIc: {
    height: 110,
    width: 110,
    borderRadius: 55,
    alignItems: 'center',
  },
  //*********  About Screen Css ******//
  wrapper: {
    marginTop: 10,
    width: '94%',
    marginLeft: '3%',
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 'auto'
  },

  aboutLbl: {
    marginTop: 15,
    color: colors.buttonBg,
    backgroundColor: 'transparent',
    fontSize: 16,
    marginLeft: '5%',
    textAlign: 'left'
  },

  desc: {
    marginTop: 12,
    width: '90%',
    opacity: 0.9,
    marginBottom: 25,
    marginLeft: '5%',
    fontSize: 13,
    // fontFamily:'Montserrat-Regular',
    color: '#000',
  },

  tempView: {
    height: 100,
    width: '100%',
    backgroundColor: 'transparent'
  },

  //*********  Seettings Screen Css ******//
  enableText: {
    marginTop: 10,
    marginLeft: 20,
    color: "#000",
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'transparent',
    fontSize: 16,

  },

  configueLbl: {
    marginTop: 25,
    fontFamily: 'Montserrat-Regular',
    marginLeft: '3%',
    textAlign: 'left',
    width: '94%',
    color: '#607EE7'
  },

  Switch: {
    // marginTop:4,
    //height:40,
    //width:70
    //marginRight:10,
    // alignSelf:'flex-end'
    // marginLeft: 130,
    // width:200
  },
});
