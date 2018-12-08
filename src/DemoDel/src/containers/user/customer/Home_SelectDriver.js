/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListView,
  ImageBackground,
  Modal,
  AsyncStorage,
  Alert,
  ToastAndroid
} from 'react-native';

import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from "../../../constants";
//import SelectDriverMapView from '../../../components/customer/SelectDriverMapView';
import CustomerMapView from '../../../components/customer/MapView1';
//import Home_SelectDriverList from '../../../components/customer/Home_SelectDriverList';
import ShadowButton from "../../../components/customer/ShadowButton";
import { startLoading, stopLoading } from '../../../redux/modules/app';
import RestClient from '../../../utilities/RestClient';
import { StackActions, NavigationActions } from 'react-navigation';
import CustomerConnection from "../../../config/Connection";
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'CustomerHomeNewx' })],
});

import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';
import Toast, { DURATION } from 'react-native-easy-toast'
var strAddress = '228 Park Ave S, New York, NY 10003, USA';


class Home_SelectDriver extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      scheduledDate: [],
      order_id: '',
      time: '',
      expireTime: '',
      date: '',
      maxTime: '',
      minTime: '',
      totalCharge: '',
      orderStatus: '',
      modalVisible: false,
      scheduleStatus: '',
      pendingStatus: '',
      additionalInfo: false
    };

  }
  clickOnSelect() {
    this.setState({ modalVisible: false });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  checkStatus() {
    //alert(orderID)
    //let orderID = '5bfd7b34a6feab0ba6887bc6'
    RestClient.get_New_Patch('place-order/orderDetails/' + orderID).then((result) => {
      console.log('order_details++', result);
      if (result.status == true) {
        let that = this;
        setTimeout(function () {
          if (result.data.orderStatus == 'Available') {
            that.setState({ modalVisible: true });
          }
        }, 180000)
        setTimeout(function () {
          if (result.data.orderStatus == 'Schedule') {
            that.refs.toast.show('Congrats! Your order is accepted.', DURATION.LENGTH_LONG);
            that.props.navigation.dispatch(resetAction);
          }
        }, 180000)

      }
      else {
        console.log('check status again')
      }
    }).catch(error => {
      console.log("error=> ", error)
    });
  }


  selectDriver = () => {
    //alert(orderID)
    this.setState({ additionalInfo: true })
    //let orderID = '5bfd7b34a6feab0ba6887bc6'
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + '/place-order/placeinpool', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //  body: JSON.stringify({"orderId": orderID})
      body: JSON.stringify({ "orderId": orderID })

    }).then((response) => {
      response.json()
    }).then((arr) => {
      this.props.dispatch(stopLoading())
      this.refs.toast.show('Your order is successfully placed in pool.', DURATION.LENGTH_LONG);
      this.checkStatus();
      //this.props.navigation.dispatch(resetAction);

    }).catch((error) => {
      this.props.dispatch(stopLoading())
      alert(error);
    });
  }

  additionalInfo() {
    this.props.navigation.navigate("NotesPick1")
  }

  render() {
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.6,
      color: "#000",
      border: 3,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 2,
      style: { zIndex: 1 }
    };
    //debugger;
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={[styles.container]}>
        {/* <Text onPress={()=>goBack()}> GO BACK GO BACK </Text> */}
        <HeaderBackground navigation={navigate} goBack={goBack} />
        {/*<View  style = {styles.searchContainer}>
          <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'}/>
          <TextInput autoFocus={false} onChangeText={(text) => this.FilterCityList(text)} style={styles.txtInputSearch} placeholder={'Type address here'} underlineColorAndroid="transparent" />
        </View>*/}
        <ScrollView>
          <CustomerMapView HourlyFlag={6} navigation={navigate} goBack={goBack} loc={this.props.state.pickupArr} />
          {/* <CustomerMapView HourlyFlag={6} navigation={navigate} goBack={goBack} loc={[{ lat: 28, long: 77 }]} /> */}



          {
            <View style={[styles.container]}>

              {/* { <Home_SelectDriverList navigation={navigate} cb={this.props.navigation.dispatch(resetAction)}/> } */}
              <ShadowButton
                onPress={() => this.selectDriver()}
                text={'PLACE IN THE POOL'}
                bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                style={[styles.ButtonStyle]}
                textStyle={[styles.ButtonTextStyle]}
              />
              {
                this.state.additionalInfo ?
                  <ShadowButton
                    onPress={() => this.additionalInfo()}
                    text={'ADDITIONAL INFORMATION'}
                    bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                    style={[styles.ButtonStyle]}
                    textStyle={[styles.ButtonTextStyle]}
                  /> : null}

            </View>

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
                <View style={styles.headerColor}>
                  <Text style={styles.headText}>OOPS!</Text>
                  <TouchableOpacity onPress={() => this.clickOnSelect()}>
                    <Image source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.topText}>Your Order has not been accepted by drivers.</Text>
                <Text style={styles.desc}>1.
                                You can place it in the pool so that it can be seen by drivers. </Text>
                <Text style={styles.desc1}>2.
                                You can select another driver.</Text>
                <TouchableOpacity style={styles.nextBtn} onPress={() => this.clickOnSelect()}>
                  <Text style={styles.nextText}>SELECT DRIVER AGAIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Toast
            ref="toast"
            style={{ backgroundColor: '#D6511F' }}
            position='bottom'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={5000}
            opacity={0.8}
            textStyle={{ color: 'white' }}
          />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: 'transparent',//Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 1,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 9,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  searchContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    //paddingLeft: 10,
    //paddingRight:10,
    marginLeft: 15,
    marginRight: 15,
    //marginTop:10,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,

  },
  searchContentIcon: {
    //tintColor:'#898988',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
  },
  txtInputSearch: {
    backgroundColor: '#fff',
    color: '#5D5D5D',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingRight:10,
    //paddingTop:3,
    //paddingBottom:3,
    flex: 1,
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    marginBottom: 10,
    marginTop: 0,//10,
    marginLeft: 0,//10,
    marginRight: 0,//10,
    borderRadius: 30,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  centerView: { height: scaleHeight(360), width: scaleWidth(350), borderRadius: 5, backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

  topText: { top: scaleHeight(20), textAlign: 'justify', fontSize: normalizeFont(18), fontWeight: '700', color: '#314054', marginLeft: scaleWidth(25) },

  desc: { marginTop: scaleHeight(30), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: 25 },
  desc1: { marginTop: scaleHeight(15), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: scaleWidth(0), marginRight: scaleWidth(102), marginBottom: scaleHeight(20) },
  nextBtn: {
    marginTop: scaleHeight(25),
    borderRadius: scaleWidth(5),
    height: scaleHeight(50),
    width: scaleWidth(300),
    backgroundColor: '#366CB5'
  },
  nextText: {
    fontSize: normalizeFont(16),
    textAlign: 'center',
    padding: scaleWidth(14),
    color: "#FCFEFE",
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  headerColor: {
    marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5),
    flexDirection: 'row'
  },
  headText: {
    marginLeft: scaleWidth(20),
    color: 'grey',
    fontSize: normalizeFont(20),
    width: scaleWidth(80),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    marginTop: scaleHeight(15)
  },
  closeicon: {
    backgroundColor: 'transparent',
    height: scaleHeight(25),
    width: scaleWidth(25),
    marginTop: scaleHeight(18),
    marginLeft: scaleWidth(200),
  }

});
export default connect(state => ({ state: state.CustomerReducer }))(Home_SelectDriver);
