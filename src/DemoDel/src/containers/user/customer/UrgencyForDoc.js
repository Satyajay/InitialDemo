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
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListView,
  ImageBackground,
  Modal,
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid,
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";
import ServiceRegularMapView from '../../../components/customer/ServiceRegularMapView';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import TimeWindow from "../../../components/customer/TimeWindow";
import TimeFrame from "../../../components/customer/TimeFrame";
import CustomerConnection from "../../../config/Connection";


import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';
import moment from 'moment';
import { startLoading, stopLoading } from '../../../redux/modules/app';

class UrgencyForDoc extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
      PickerDate: new Date(),
      DeliveryDate: 'Delivery Date',//moment().format('MMM-DD-YYYY'),
      PickerTime: new Date(),
      StartTime: 'Start Time',//moment().format('hh:mm'),
      StartAMPM: '',//moment().format('A'),
      EndTime: 'End Time',//moment(new Date()).add('hour',1).format('hh:mm'),
      EndAMPM: '',//moment().format('A'),
      timeFrame: '',//'1 Hour',
      timeFrameValue: 0,
      mapHeight: 30,

      selectedItem: '',//'direct',
      DriverHelp: false,
      ExtraHelper: false,
      showMap:true
    }

  
  }

  CallDatePicker() {
    let context = this;
    DatePickerAndroid.open({
      date: new Date(context.state.PickerDate),
    }).then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = new Date(year, month, day);
        var strDate = moment(ss).format('MMM-DD-YYYY');
        context.setState({ PickerDate: new Date(year, month, day), DeliveryDate: strDate });
        context.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });
      }
    });
  }

  CallTimePicker() {
    let context = this;
    var timeMoment = moment(context.state.PickerTime);
    TimePickerAndroid.open({
      hour: timeMoment.hour(),
      minute: timeMoment.minutes(),
      is24Hour: false,
    }).then(({ action, hour, minute, pm }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = moment().hour(hour).minute(minute).toDate();
        var strDate = moment(ss).format('hh:mm');
        var _ampm = moment(ss).format('A');
        var strDate1 = moment(ss).add('hour', context.state.timeFrameValue).format('hh:mm');
        var _ampm1 = moment(ss).add('hour', context.state.timeFrameValue).format('A');

        if (context.state.timeFrameValue == 0)
          context.setState({ PickerTime: moment().hour(hour).minute(minute).toDate(), StartTime: strDate, StartAMPM: _ampm });
        else {
          context.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
          context.setState({ PickerTime: moment().hour(hour).minute(minute).toDate(), StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1 });
        }

      }
    });
  }

  onClickDirect() {
    this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10,
      selectedItem: 'direct', timeFrame: '1 Hour', timeFrameValue: 1,
      EndTime: moment(this.state.PickerTime).add('hour', 1).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(1);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
  }
  onClickRush() {
    this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30,
      selectedItem: 'rush', timeFrame: '2 Hours', timeFrameValue: 2,
      EndTime: moment(this.state.PickerTime).add('hour', 2).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(2);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
  }
  /*onClickFaster()
  {
    this.setState({ProgressWidth:(Constants.BaseStyle.DEVICE_WIDTH/100)*60,
      selectedItem:'faster',timeFrame:'4 Hours',timeFrameValue:4,
      EndTime:moment(this.state.PickerTime).add('hour',4).format('hh:mm'),
      EndAMPM:moment(this.state.PickerTime).format('A')});
      this.CallVehicelCost(4);
  }*/
  onClickRegular() {
    this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 60,
      selectedItem: 'regular', timeFrame: '4 Hours', timeFrameValue: 4,
      EndTime: moment(this.state.PickerTime).add('hour', 4).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(4);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
  }
  onClickEconomy() {
    this.setState({
      ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
      selectedItem: 'economy', timeFrame: '6 Hours', timeFrameValue: 6,
      EndTime: moment(this.state.PickerTime).add('hour', 6).format('hh:mm'),
      EndAMPM: moment(this.state.PickerTime).format('A')
    });
    this.CallVehicelCost(6);
    this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
  }
  onHelpDriverClick() {
    this.setState({ DriverHelp: !this.state.DriverHelp });
  }
  onExtraHelperClick() {
    this.setState({ ExtraHelper: !this.state.ExtraHelper });
  }
  setDriverHelpImage() {
    if (this.state.DriverHelp) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }

  setExtraHelpImage() {
    if (this.state.ExtraHelper) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }

  CallInvoice() {
    let context = this;
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;

    if (!context.props.state.ActiveButton) {
      return;
    }

    var len = this.props.state.pickupArr.length;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
    var urgencyStr = 'regular';
    if (context.state.timeFrameValue == 1)
      urgencyStr = 'direct';
    /*else if(context.state.timeFrameValue == 2)
    {
      urgencyStr='rush';
    }
    else if(context.state.timeFrameValue == 4)
    {
      urgencyStr='faster';
    }*/
    else {
      urgencyStr = 'regular';
    }

    this.props.state.pickupArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        pickup[i] = {

          "pickup_point": val.lat + ',' + val.long,
          "address": val.address,
          "pickup_status": 0,
          "priority": 0,
          type: 'pickup'
        };
      }
    });
    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
        strWeight[i] = 3;
      }
    });

    var len = this.props.state.dropArr.length;
    this.props.state.dropArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        drop[i] = {

          "drop_point": val.lat + ',' + val.long,
          "address": val.address,
          "drop_status": 0,
          "priority": 0,
          type: 'drop'
        }
      }
    });


    var timeframe = context.state.timeFrameValue;
    AsyncStorage.getItem("id").then((value) => {




      this.props.dispatch(startLoading())
      fetch(CustomerConnection.getTempUrl() + 'place-order/create/', {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "pickup": pickup,
          "drop_location": drop,
          "date": this.state.DeliveryDate,
          "time": this.state.StartTime,
          "quantity": [1],
          "id": value,
          "vehicle": this.props.state.vehicleID,
          "service_type": 2,
          "delivery_type_usf": 1

        }),
      }).then((response) => response.json())
        .then((arr) => {
          this.props.dispatch(stopLoading())
         // orderID = arr.data.orderId;
          orderID = arr.data._id;
          this.setState({showMap:false})


          dispatch({ type: 'SET_INVOICE', _data: arr.data, _orders: arr.data.orders });
       
          navigate('Home_DocumentInvoice');
        })
        .catch((error) => {
          this.props.dispatch(stopLoading())

          console.error(error);
        });
    })

  }


componentDidMount(){

var ss=new Date();
var hour= ss.getHours();
var minute=ss.getMinutes()
  var strDate = moment(new Date()).format('hh:mm');
  var _ampm = moment(ss).format('A');
  var strDate1 = moment(ss).add('hour', 1).format('hh:mm');
  var _ampm1 = moment(ss).add('hour', 1).format('A');

  

  this.setState({
    PickerTime: moment().hour(hour).minute(minute).toDate(),
    StartTime: strDate, StartAMPM: _ampm, EndTime: strDate1, EndAMPM: _ampm1,
    timeFrame: '1 Hour', ProgressWidth: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
     PickerDate: new Date(ss.getFullYear(), ss.getMonth(), ss.getDate()), 
     DeliveryDate: moment(ss).format('MMM-DD-YYYY')
  });

  this.props.dispatch({ type: 'IS_STARTUPTIME', data: true });
  this.props.dispatch({ type: 'IS_DELIVERYDATE', data: true });//,ActiveNextBackColor:'#53C8E5',ActiveNextTextColor:'#FFFFFF', ActiveButton:true})
     
  


}



  CallVehicelCost(_timeframe) {
    //let context = this;
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;
    var len = this.props.state.pickupArr.length;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
    var urgencyStr = 'regular';
    if (_timeframe == 1)
      urgencyStr = 'direct';
    /*else if(context.state.timeFrameValue == 2)
    {
      urgencyStr='rush';
    }
    else if(context.state.timeFrameValue == 4)
    {
      urgencyStr='faster';
    }*/
    else {
      urgencyStr = 'regular';
    }

    // this.props.state.pickupArr.map((val,i) => {
    //   if(!(val.address.indexOf('Choose')==0))
    //   {
    //     pickup[i]=val.lat+','+val.long;
    //   }
    // });
    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
        strWeight[i] = 3;
      }
    });

    /*    var len = this.props.state.dropArr.length;
        this.props.state.dropArr.map((val,i) => {
          if(!(val.address.indexOf('Choose')==0))
          {
            drop[i]=val.lat+','+val.long;
          }
        });
    
    */
    this.props.state.pickupArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        pickup[i] = {

          "pickup_point": val.lat + ',' + val.long,
          "address": val.address,
          "pickup_status": 0,
          "priority": 0,
          type: 'pickup'
        };
      }
    });

    var len = this.props.state.dropArr.length;
    this.props.state.dropArr.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        drop[i] = {

          "drop_point": val.lat + ',' + val.long,
          "address": val.address,
          "drop_status": 0,
          "priority": 0,
          type: 'drop'
        }
      }
    });

    console.log(JSON.stringify({
      'date': '05/06/2018',
      'time': '04:20PM',
      'quantity': strItems,
      'weight': strWeight,
      'service_type': 2,
      'delivery_type_usf': _timeframe,
      'time_frame': 1,
      'pickup': pickup,
      'drop_location': drop,
    }))
    //   var timeframe = _timeframe;

    //fetch('http://18.205.68.238:9000/api/place-order/vehiclecalculation/', {
    //   fetch('http://18.212.245.222:7010/api/place-order/vehiclecalculation', { 
    this.props.dispatch(startLoading())
    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'date': '05/06/2018',
        'time': '04:20PM',
        'quantity': strItems,
        'weight': strWeight,
        'service_type': 2,
        'delivery_type_usf': 1,
        'time_frame': 1,
        'pickup': pickup,
        'drop_location': drop,
      }),



    }).then((response) => response.json())
      .then((arr1) => {
        this.props.dispatch(stopLoading())

        dispatch({ type: 'SET_VEHICLECOST', _data: arr1.data, id: this.props.state.vehicleID });
      })
      .catch((error) => {
        this.props.dispatch(stopLoading())

        console.error(error);
      })
  }

  render() {
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5.5,
      color: "#000",
      border: 3,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 2,
      style: { zIndex: 1 }
    };
    const shadowOpt1 = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,//16.8,
      color: "#000",
      border: 3,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 2,
      style: { zIndex: 1 }
    };
    const shadowOpt2 = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15.8,
      color: "#000",
      border: 3,
      radius: 1,
      opacity: 0.1,
      x: 0,
      y: 2,
      style: { zIndex: 1, marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100, }
    };
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.WhiteSmoke }]}>
        <HeaderBackground navigation={navigate} goBack={goBack} />

        <HeaderMenu navigation={navigate}  catId={2}/>
        <View style={{ flex: 1, marginTop: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100, backgroundColor: Constants.Colors.White }}>
          <TimeFrame
            onClickDirect={() => this.onClickDirect()}
            onClickRush={() => this.onClickRush()}
            onClickEconomy={() => this.onClickEconomy()}
            onClickRegular={() => this.onClickRegular()}
            selectedItem={this.state.selectedItem}

          />
          <TimeWindow
            OutputText={'Time Window'}
            ProgressWidth={this.state.ProgressWidth}
            startTime={this.state.StartTime}
            startAMPM={this.state.StartAMPM}
            endTime={this.state.EndTime}
            endAMPM={this.state.EndAMPM}
            timeFrame={this.state.timeFrame}
            DeliveryDate={this.state.DeliveryDate}
            onChangeDate={() => this.CallDatePicker()}
            onChangeTime={() => this.CallTimePicker()}
          />

          {/*<View style={[styles.horizontalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}/>

            <BoxShadow setting={shadowOpt}>
              <View style={[styles.flexRow,{backgroundColor:Constants.Colors.White}]}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.onHelpDriverClick()} style={[styles.flexRow,{flex:1,alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <Image source={this.setDriverHelpImage()} style={[styles.imgSize]} resizeMode={'contain'}/>
                  <Text style={[styles.textStyle]}>{'Help from Driver'}</Text>
                  <Image source={Constants.Images.customer.info} style={[styles.infoimgSize]} resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.onExtraHelperClick()}  style={[styles.flexRow,{alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <Image source={this.setExtraHelpImage()} style={[styles.imgSize]} resizeMode={'contain'}/>
                  <Text style={[styles.textStyle]}>{'Extra Helper'}</Text>
                  <Image source={Constants.Images.customer.info} style={[styles.infoimgSize]} resizeMode={'contain'}/>
                </TouchableOpacity>
              </View>
            </BoxShadow>*/}

          {this.state.showMap && <ServiceRegularMapView navigation={navigate} height={42} />}
        </View>
        <View style={{/*bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,*/backgroundColor: '#ffffff' }}>

          <ShadowButton
            onPress={() => this.CallInvoice()}
            text={'NEXT'}
            bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
            style={[styles.ButtonStyle, { backgroundColor: this.props.state.ActiveNextBackColor, borderColor: this.props.state.ActiveNextBackColor, }]}
            textStyle={[styles.ButtonTextStyle, { color: this.props.state.ActiveNextTextColor, }]}
          />
        </View>
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
  horizontalLine: {
    height: 2,
    backgroundColor: '#D7D7D7',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colIndex: {
    flex: 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colIndexViewWhite: {
    backgroundColor: Constants.Colors.White,
  },
  colIndexViewBlack: {
    backgroundColor: Constants.Colors.LightBlue,
  },
  colIndexLabelWhite: {
    fontSize: 12,//Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.LightBlue,
    textAlign: "center",
  },
  colIndexLabelBlack: {
    fontSize: 12,//Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.White,
    textAlign: "center",
  },
  TimeWindowStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'left',
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: 13,//Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },

  TimeHourStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
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

  imgSize: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  infoimgSize: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  textStyle: {
    fontSize: 13,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    color: '#5D5D5D',
  },
  inputStyle: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#B1B1B1',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  track: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#969297',
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: '#306AB3',
  }
});
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(UrgencyForDoc);
