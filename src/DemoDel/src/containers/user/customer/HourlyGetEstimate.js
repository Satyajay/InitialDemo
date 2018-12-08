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
  Modal,
  FlatList,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native';

import { connect } from 'react-redux';

import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";

import MapView_HourlyService from '../../../components/customer/MapView_HourlyService';
//import PickUpLocation from '../../../components/customer/PickUpLocation';
import Home_OrdersList from '../../../components/customer/Home_OrdersList';
import Home_DriverList from '../../../components/customer/Home_DriverList';
import BarChartReport from '../../../components/customer/BarChart';
import SearchPlace_Hourly from '../../../components/customer/SearchPlace_Hourly';

import CheckBoxLabel from '../../../components/customer/CheckBoxLabel';

import HourlyServiceHeaderMenu from '../../../components/customer/HourlyServiceHeaderMenu';

import {BoxShadow} from 'react-native-shadow';
import moment from 'moment';
import { ToastActionsCreators } from 'react-native-redux-toast';
var strAddress='228 Park Ave S, New York, NY 10003, USA';

class HourlyGetEstimate extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      PickerDate:new Date(),
      DeliveryDate:moment().format('DD/MM/YYYY'),
      PickerTime:new Date(),
      StartTime:moment().format('hh:mm A'),
      DriverHelp:false,
      ExtraHelp:false,
      Insurance:false,
      isVisible:false,

    }
  }


  vehicalList(item)
  {
    return(

          <View style={[{backgroundColor:Constants.Colors.White,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12,width:Constants.BaseStyle.DEVICE_WIDTH/100 * 25}]}>
            <TouchableOpacity onPress={() => {this.setActiveTransport(item.tag)}}>
              <View style={{alignItems:'center',backgroundColor:item.backgroundColor,borderBottomColor:item.borderBottomColor,borderBottomWidth:item.borderBottomWidth}}>
                <Text style={[styles.transportCostStyle]}>{item.cost}</Text>
                <Image source={item.displayimg} style={[styles.transportIcons,{alignItems:'center'}]} resizeMode={'contain'}/>
                <Text style={[styles.transportLabel]}>{item.header}</Text>
              </View>
            </TouchableOpacity>
          </View>
      )
  }
  setActiveTransport(id)
  {
        this.props.dispatch({type:'ACTIVE_VEHICLE_FILTER', tagid:id});
  }

  CallInvoice()
  {
    let context = this;
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;
    var len = this.props.state.pickupArr.length;

    if((context.props.state.Hourly_pickupArr.indexOf('Choose')==0) || (context.props.state.Hourly_dropArr.indexOf('Choose')==0) || context.props.state.vehicleID==0)
    {
        dispatch(ToastActionsCreators.displayInfo('You have not select either \'Start Location\', \'End Location\' or \'Vehicle\''));
        return;
    }

    var pickup=[];
    var drop=[];


    this.props.state.Hourly_pickupArr.map((val,i) => {

        pickup[i]=val.lat+','+val.long;

    });

    var len = this.props.state.Hourly_dropArr.length;
    this.props.state.Hourly_dropArr.map((val,i) => {

        drop[i]=val.lat+','+val.long;

    });
    var duration=this.props.state.HourlyServiceDisplayDuration.toLowerCase().replace(' hours','').replace(' hour','');


      fetch('http://18.205.68.238:9000/api/place-order/createHourly/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'pickupLocation': pickup,
          'dropoffLocation': drop,
          'date':this.props.state.HourlyServiceDisplayDate,
          'time':this.props.state.HourlyServiceDisplayTime,
          'driver_help':this.state.DriverHelp,
          'extra_help':this.state.ExtraHelp,
          'vehicle':this.props.state.vehicleName,
          'duration':parseInt(duration),
        }),
      }).then((response) => response.json())
        .then((arr) => {
          //dispatch({type : 'SET_HOURLYINVOICE', amount : arr.data.totalCharge,_orders:arr.data.orders,driverhelp:arr.data.driver_help_cost,extrahelper:arr.data.extra_help_cost});
          dispatch({type : 'SET_INVOICE', _data : arr.data,_orders:arr.data.orders});//,driverhelp:arr.data.driver_help_cost,extrahelper:arr.data.extra_help_cost});
          navigate('Hourly_Invoice');
        })
        .catch((error) => {
          console.error(error);
        });
  }

  onHelpDriverClick()
  {
    var helpValue=!this.state.DriverHelp;

    var duration=this.props.state.HourlyServiceDisplayDuration.toLowerCase().replace(' hours','').replace(' hour','');

      fetch('http://18.205.68.238:9000/api/place-order/vehiclecalculation/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'date':this.props.state.HourlyServiceDisplayDate,
          'time':this.props.state.HourlyServiceDisplayTime,
          'service_type':0,
          'duration':parseInt(duration),
          'driver_help':helpValue,
          'extra_help':this.state.ExtraHelp,
        }),
      }).then((response) => response.json())
        .then((arr) => {
          this.props.dispatch({type : 'SET_VEHICLECOST', _data : arr.data});
          this.setState({DriverHelp : helpValue});
        })
        .catch((error) => {
          console.error(error);
        });
  }
  onExtraHelperClick()
  {
    var extraHelp=!this.state.ExtraHelp;

    var duration=this.props.state.HourlyServiceDisplayDuration.toLowerCase().replace(' hours','').replace(' hour','');

      fetch('http://18.205.68.238:9000/api/place-order/vehiclecalculation/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'date':this.props.state.HourlyServiceDisplayDate,
          'time':this.props.state.HourlyServiceDisplayTime,
          'service_type':0,
          'duration':parseInt(duration),
          'driver_help':this.state.DriverHelp,
          'extra_help':extraHelp,
        }),
      }).then((response) => response.json())
        .then((arr) => {
          this.props.dispatch({type : 'SET_VEHICLECOST', _data : arr.data});
          this.setState({ExtraHelp : extraHelp});
        })
        .catch((error) => {
          console.error(error);
        });
  }
  onInsuranceClick()
  {
    this.setState({Insurance : false});
  }
  setDriverHelpImage()
  {
    if(this.state.DriverHelp)
    {
      return Constants.Images.customer.check;
    }
    else
    {
      return Constants.Images.customer.uncheck;
    }
  }

  setExtraHelpImage()
  {
    if(this.state.ExtraHelp)
    {
      return Constants.Images.customer.check;
    }
    else
    {
      return Constants.Images.customer.uncheck;
    }
  }
  setInsuranceImage()
  {
    if(this.state.Insurance)
    {
      return Constants.Images.customer.check;
    }
    else
    {
      return Constants.Images.customer.uncheck;
    }
  }

  onPressInfo(id)
  {
    this.setState({isVisible:true});
  }

  render() {
    const shadowOpt = {
        width:Constants.BaseStyle.DEVICE_WIDTH,
        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7.6,
        color:"#000",
        border:3,
        radius:1,
        opacity:0.1,
        x:0,
        y:2,
        style:{zIndex:1}
    };
    const shadowOpt1 = {
       width:Constants.BaseStyle.DEVICE_WIDTH,
       height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10.6,//16.8,
       color:"#000",
       border:3,
       radius:5,
       opacity:0.1,
       x:0,
       y:2,
       style:{zIndex:1,marginBottom: Constants.BaseStyle.DEVICE_WIDTH*1/100}
    };
    const shadowOpt2 = {
       width:Constants.BaseStyle.DEVICE_WIDTH,
       height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12.2,
       color:"#000",
       border:3,
       radius:5,
       opacity:0.1,
       x:0,
       y:2,
       style:{zIndex:1,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,}
    };
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={[styles.container,{backgroundColor:'#ffffff'}]}>
        <HeaderBackground navigation={navigate} goBack={goBack}/>

        <HourlyServiceHeaderMenu  navigation={navigate}/>

          <View style={{flex:1/*,bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,*/}}>
            <MapView_HourlyService navigation={navigate}/>

            <View style={{/*bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,*/backgroundColor:Constants.Colors.WhiteSmoke}}>
            <BoxShadow setting={shadowOpt1}>
              <View style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10.4,backgroundColor:'#ffffff'/*,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,*/}}>


                <View style={[styles.flexRow,{backgroundColor:Constants.Colors.White}]}>
                  <CheckBoxLabel
                    viewStyle={{flex:1,justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}
                    imgsource={this.setDriverHelpImage()}
                    onPress={() => this.onHelpDriverClick()}
                    onPressInfo={() => this.onPressInfo(1)}
                    text={'Tailgate is needed'}
                    isInfoImg={true}
                    />
                  <CheckBoxLabel
                    viewStyle={{justifyContent:'flex-end',alignItems:'center',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}
                    imgsource={this.setExtraHelpImage()}
                    onPress={() => this.onExtraHelperClick()}
                    onPressInfo={() => this.onPressInfo(2)}
                    text={'Extra Helper'}
                    isInfoImg={true}
                    />


                  {/*<View activeOpacity={0.5} onPress={() => this.onHelpDriverClick()} style={[styles.flexRow,{flex:1,justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                    <TouchableOpacity style={[styles.flexRow,{alignItems:'center'}]}>
                      <Image source={this.setDriverHelpImage()} style={[styles.imgSize]} resizeMode={'contain'}/>
                      <Text style={[styles.textStyle]}>{'Tailgate is needed'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={Constants.Images.customer.info} style={[styles.infoimgSize]} resizeMode={'contain'}/>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.onExtraHelperClick()}  style={[styles.flexRow,{justifyContent:'flex-end',alignItems:'center',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                    <Image source={this.setExtraHelpImage()} style={[styles.imgSize]} resizeMode={'contain'}/>
                    <Text style={[styles.textStyle]}>{'Extra Helper'}</Text>
                    <Image source={Constants.Images.customer.info} style={[styles.infoimgSize]} resizeMode={'contain'}/>
                  </TouchableOpacity>*/}
                </View>

                <View style={[styles.flexRow,{backgroundColor:Constants.Colors.White}]}>
                  <CheckBoxLabel
                    viewStyle={{flex:0.5,alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}
                    imgsource={this.setInsuranceImage()}
                    onPress={() => this.onInsuranceClick()}
                    onPressInfo={() => this.onPressInfo(3)}
                    text={'Buy Insurance'}
                    isInfoImg={true}
                    />
                  {/*<View style={[styles.flexRow,{flex:0.5,alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                    <Image source={Constants.Images.customer.uncheck} style={[styles.imgSize]} resizeMode={'contain'}/>
                    <Text style={[styles.textStyle]}>{'Buy Insurance'}</Text>
                    <Image source={Constants.Images.customer.info} style={[styles.infoimgSize]} resizeMode={'contain'}/>
                  </View>*/}
                </View>

                {/*<View style={[styles.flexRow,{flex:0.5,alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder='Parcel Total Value'
                    multiline={false}
                    style={styles.inputStyle}

                  />
                </View>*/}
              </View>
            </BoxShadow>
              <View style={{opacity:0.8,backgroundColor:Constants.Colors.WhiteSmoke}}>
                <BoxShadow setting={shadowOpt2}>
                  <FlatList data={this.props.state.FilteredTransportArray} renderItem={({item})=>this.vehicalList(item)} horizontal={true}/>
                </BoxShadow>
              </View>
              <ShadowButton
                onPress={() => this.CallInvoice()}
                text={'NEXT'}
                bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                style={[styles.ButtonStyle]}
                textStyle={[styles.ButtonTextStyle]}
              />
            </View>


            <Modal animationType={"fade"} transparent={true} visible={this.props.state.placeModalVisibility} onRequestClose={() => {this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false})}}>
              <SearchPlace_Hourly navigation={navigate} dispatch={this.props.navigation}/>
            </Modal>

            <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => {this.setState({isVisible:false})}}>
              <View  style={[styles.modalOuter]}>
                <View  style={styles.modalInner}>
                  <View style={[styles.flexRow,{justifyContent:'flex-end'}]}>
                    <TouchableOpacity style={[styles.btCloseModal]} onPress={() => {this.setState({isVisible:false})}}>
                      <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]}  resizeMode={'contain'}/>
                    </TouchableOpacity>
                  </View>

                   <View>
                     <Text>{'This is a dummy info text.'}</Text>
                   </View>
                </View>
              </View>
            </Modal>

          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginBottom:10,
    marginTop:0,//10,
    marginLeft:0,//10,
    marginRight:0,//10,
    borderRadius:30,
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.White,
  },
  transportIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 14,
    padding:0,
  },
  transportLabel:{
    textAlign:'center',
    marginTop:0,
    color:'#081933',
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },
  transportCostStyle:{
    textAlign:'center',
    //marginTop:0,
    color:'#306AB3',
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.small_13.fontSize,//Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 2,
    marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    color:'#5D5D5D',
  },
  inputStyle:{
		flex:1,
		borderWidth: 0.5,
		borderColor:'#B1B1B1',
		paddingTop:2,
		paddingBottom:2,
		paddingLeft:10,
		paddingRight: 10,
	},
  imgSize:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  infoimgSize:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  subsubContainer: {
    //bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 17,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //opacity: 0.87,
  },
  navigationBar:{
    backgroundColor:'transparent',//Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
  },
  navBarRight:{
			flex:1,
			flexDirection:'row',
			height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
			//marginTop:0,
			alignItems:'center',
			justifyContent:'flex-end',
			backgroundColor:'transparent',
      marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
		},
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },

  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 9,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginTop:3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  horizontalLine:{
    height:2,
  	backgroundColor: '#B1B1B1',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  flexRow:{
		flexDirection: 'row',
	},
  flexCol:{
		flexDirection:'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
  colIndex:{
		flex:1,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7,
    alignItems:'center',
    justifyContent:'center',
	},
  modalOuter: {
			backgroundColor: 'rgba(0,0,0,0.8)',
			padding: 4,
			flex:1,
			alignItems:'center',
			justifyContent:'center',
		},
	modalInner:{
		margin: 10,
	  padding:3,
		backgroundColor:'#fff',
		position: 'relative',
	},
  btCloseModal:{
			width: 20,
			height:20,
			borderRadius:20,
	},
  btnCloseModalIcon:{
    width:Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
	},
});
export default connect(state => ({state: state.CustomerReducer}))(HourlyGetEstimate);
