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
  ScrollView,
  TouchableOpacity,
  FlatList,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';

import { connect } from 'react-redux';


import Constants from "../../constants";
import SubmitButton from "../../components/common/FormSubmitButton";
import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import PickUpLocation_Hourly from './PickUpLocation_Hourly';
import {BoxShadow} from 'react-native-shadow';
import moment from 'moment';
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;//LATITUDE_DELTA * ASPECT_RATIO;
var navigate=null;
var watchID: ?number = null;
class MapView_HourlyService extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      error:null,

      initialPosition:
      {
        latitude:28.6139,
        longitude:77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      markerPosition:{
        latitude:28.6139,
        longitude:77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      isVisible:false,
      durationTime : [{time : '1 hour'},{time : '2 hours'},{time : '3 hours'},{time : '4 hours'},{time : '5 hours'},{time : '6 hours'},{time : '7 hours'},{time : '8 hours'},{time : '9 hours'},{time : '10 hours'},
                      {time : '11 hours'},{time : '12 hours'},{time : '13 hours'},{time : '14 hours'},{time : '15 hours'},{time : '16 hours'},{time : '17 hours'},{time : '18 hours'},{time : '19 hours'},{time : '20 hours'},{time : '21 hours'},
                      {time : '22 hours'},{time : '23 hours'},{time : '24 hours'}]

    }

    this.initialPosition = this.state.initialPosition;
    this.markerPosition = this.state.markerPosition;
  }



  /*componentDidMount()
  {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

        var initialRegion={
          latitude : lat,
          longitude : long,
          latitudeDelta : LATITUDE_DELTA,
          longitudeDelta : LONGITUDE_DELTA,
        }

      this.setState({initialPosition:initialRegion});
      this.setState({markerPosition:initialRegion});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );

    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var lastRegion={
        latitude : lat,
        longitude : long,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA,
      }

      this.setState({initialPosition:lastRegion});
      this.setState({markerPosition:lastRegion});
    });
  }*/


  /*componentWillUnmount()
  {
    //navigator.geolocation.clearWatch(this.watchID);
  }*/


  searchPlace(_flag)
  {
    var lendrop=this.props.state.Hourly_dropArr.length-1;
    var lenpick=this.props.state.Hourly_pickupArr.length-1;
    var addFlag=true;
    if(_flag==1)//pickup
    {
      if(lenpick==1)
      {
        addFlag=false;
      }
      /*if(lenpick>1)
      {
        if(lenpick==3)
        {
          addFlag=false;
        }
        else if(lendrop==1 && lenpick==3)
        {
          addFlag=false;
        }
      }
      else if (lendrop>1 && lenpick==1)
      {
        addFlag=false;
      }*/
    }
    else if (_flag==2)
    {
      if(lendrop==1)
      {
        addFlag=false;
      }
      /*if (lendrop>1)
      {
        if(lendrop==3)
        {
          addFlag=false;
        }
        else if(lenpick==1 && lendrop==3)
        {
          addFlag=false;
        }
      }
      else if (lendrop==1 && lenpick>1)
      {
        addFlag=false;
      }*/
    }



    if(addFlag)
    {
      this.props.dispatch({type:'SETPICKDROPFLAG',flag:_flag});
      this.props.dispatch({type:'PLACE_FINDER_MODAL_HOURLY',visibility:true});
    }
    /*else if(lendrop==3 || lenpick==3)
    {
      this.props.dispatch(ToastActionsCreators.displayInfo('You can enter max 3 pickup/drop locations.'));
      this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false});
    }*/
    else {
      this.props.dispatch(ToastActionsCreators.displayInfo('You can enter only one Pickup and Drop address.'));
      this.props.dispatch({type:'PLACE_FINDER_MODAL_HOURLY',visibility:false});
    }
  }

  vehicalList(item)
  {
    return(
          <View key={1} style={[{backgroundColor:Constants.Colors.WhiteSmoke,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12.6,width:Constants.BaseStyle.DEVICE_WIDTH/100 * 25}]}>
            <TouchableOpacity key={2} onPress={() => {this.setActiveTransport(item.tag)}}>
              <View key={3} style={{alignItems:'center',backgroundColor:item.backgroundColor,borderBottomColor:item.borderBottomColor,borderBottomWidth:item.borderBottomWidth}}>
                <Image key={4} source={item.displayimg} style={[styles.transportIcons,{alignItems:'center'}]} resizeMode={'contain'}/>
                <Text key={5} style={[styles.transportLabel]}>{item.header}</Text>
              </View>
            </TouchableOpacity>
          </View>
    	)
  }
  setActiveTransport(id)
  {
    if(this.props.state.AddressCount>0 || this.props.HourlyFlag != 0)
      this.props.dispatch({type:'ACTIVE_VEHICLE', tagid:id});
  }

  CallDatePicker()
  {
    //let context = this;
    DatePickerAndroid.open({
               date: new Date(this.props.state.HourlyServiceDate),
             }).then(({action, year, month, day}) => {
               if (action !== DatePickerAndroid.dismissedAction)
               {
                 var strDay=day;
                 var strmonth=(month + 1);
                 if(day<10)
                 {
                   strDay='0'+strDay;
                 }
                 if(month+1<10)
                 {
                   strmonth='0'+strmonth;
                 }
                 var strDate = strDay + '/' + strmonth + '/' + year;
                 this.props.dispatch({type:'SET_HOUR', displayDate : strDate, date : new Date(year,month,day)});
               }
             });
   }

  CallTimePicker()
  {
     //let context = this;
     var timeMoment = moment(this.props.state.HourlyServiceTime);
   	  TimePickerAndroid.open({
         hour: timeMoment.hour(),
         minute: timeMoment.minutes(),
         is24Hour: false,
       }).then(({action, hour, minute, pm}) => {
         if (action !== DatePickerAndroid.dismissedAction) {
           var _ampm=' AM';
           if(hour>12)
            {
              _ampm=' PM';
              hour=hour-12;
            }
           var strHour=hour;
           var strMin=minute;
           if(hour<10)
            strHour='0'+strHour;

           if(minute<10)
              strMin='0'+strMin;

           var strDate = strHour + ':' + strMin+_ampm;
           //context.setState({PickerTime : moment().hour(hour).minute(minute).toDate(), StartTime : strDate});
           this.props.dispatch({type:'SET_TIME', displayTime : strDate, time : moment().hour(hour).minute(minute).toDate()});
         }
       });
  }

  setDurationTime(_time)
  {
    this.props.dispatch({type:'SET_DURATION', displayDuration : _time});
    this.setState({isVisible:false});
  }


  clickOnEstimate()
  {
     if(this.props.state.DeliveryServiceOpacity==1)
     {
       this.props.dispatch({type:'SET_TABINDEX',index:1});
       navigate('Home_Food');
     }
     else if (this.props.state.HourlyServiceCount == 3 && this.props.state.HourlyFlag == 1)
     {
       this.props.dispatch({type:'SET_HOURLYSERVICE_TABINDEX',index:1});
       navigate('HourlyGetEstimate');
     }

  }



  render() {
    navigate  = this.props.navigation;
    const shadowForEstimate = {width:Constants.BaseStyle.DEVICE_WIDTH/100*95,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 7.2,
                        color:"#000",
                        border:3,
                        radius:20,
                        opacity:0.1,
                        x:2,
                        y:2,
                        style:{bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
                               marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2}
    };
    const shadowForPickup = {width:Constants.BaseStyle.DEVICE_WIDTH/100*95,
                            height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6.4 * 1.9,
                            color:"#000",
                            border:3,
                            radius:5,
                            opacity:0.1,
                            x:2,
                            y:2,
                            style:{bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 73,
                            marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,}
    };
    const shadowForHour = {width:Constants.BaseStyle.DEVICE_WIDTH/100*95,
                            height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 20.5,
                            color:"#000",
                            border:3,
                            radius:5,
                            opacity:0.2,
                            x:2,
                            y:2,
                            style:{bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 93,
                            marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,}
    };
    var vehiclePositions=null;

    return (
      <View style={{flex:1}}>
        <View style={[styles.rootContainer]}>
          {/* <MapView
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 75,zIndex:0}}
            zoomEnabled={true}
            initialRegion={this.props.state.initialPosition}
            region={this.props.state.initialPosition}
            showsUserLocation={true}
            followsUserLocation={false}
            pitchEnabled={false}
            rotateEnabled={false}
            //minZoomLevel={15}
            >
            <MapView.Circle
              center = { this.state.initialPosition }
              radius = { 50 }
              //strokeWidth = { 1 }
              strokeColor = { 'rgba(83,200,229,0.5)' }
              fillColor = { 'rgba(83,200,229,0.5)' }

              />

              {this.props.state.markerPositions.map((marker, i) => (
                    <MapView.Marker
                      coordinate={marker.coordinates}
                      title={marker.title}
                      image={marker.img}
                      key={marker.id}
                    />
                  ))}

          </MapView> */}

          <BoxShadow setting={shadowForPickup}>
            <View style={[styles.ButtonPickupStyle,{opacity : 0.8,backgroundColor: '#ffffff',borderColor: '#ffffff'}]}>
              <PickUpLocation_Hourly
                onChangeText={() => this.searchPlace(1)}
                onPress={() => this.searchPlace(1)}
                PickDropFlag={1}
                list={this.props.state.Hourly_pickupArr}
              />
              <View style={[styles.horizontalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 10}]}/>
              <PickUpLocation_Hourly
                onChangeText={() => this.searchPlace(2)}
                onPress={() => this.searchPlace(2)}
                PickDropFlag={2}
                list={this.props.state.Hourly_dropArr}
                tintColor={[{tintColor:'#F58436'}]}
              />
            </View>
          </BoxShadow>

        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Constants.Colors.White,//'#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
		width:20,
		height:20,
	},

  flexRow:{
		flexDirection: 'row',
	},
  pickupIcons:{
    marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 2,
  },
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 22,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //opacity: 0.87,
  },
  ButtonPickupStyle: {
    borderWidth: 1,
    borderRadius:5,

    //bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 96,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  horizontalLine:{
    height:2,
  	backgroundColor: '#D7D7D7',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginBottom:10,
    marginTop:0,//10,
    marginLeft:0,//10,
    marginRight:0,//10,
    borderRadius:30,
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
  },
  HourlyTextStyle:{
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    flex : 1,
    justifyContent:'center',
    marginTop:5,
  	color: '#5D5D5D',
  },
  HourlyRightText:{
    flex : 1,
    textAlign:'right',
    justifyContent:'flex-end',
    marginTop:5,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },

});

export default connect(state => ({state: state.CustomerReducer}))(MapView_HourlyService);
