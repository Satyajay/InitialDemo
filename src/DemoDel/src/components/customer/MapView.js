
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
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';


import Constants from "../../constants";
import CustomerConnection from "../../config/Connection";
import SubmitButton from "../../components/common/FormSubmitButton";

import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import PickUpLocation from './PickUpLocation';
import { BoxShadow } from 'react-native-shadow';
import RestClient from '../../utilities/RestClient';
import ServiceCall from '../../redux/modules/RestClient';
import { bindActionCreators } from "redux";
import * as AdminActions from '../../redux/modules/adminReducer';
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import moment from 'moment';
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;//LATITUDE_DELTA * ASPECT_RATIO;
var navigate = null;
var goBack = null;
var watchID: ?number = null;
var _key = 0;
class CustomerMapView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showMap: true,
      VehicleList: [],
      vehicals: [],
      initialPosition:
      {
        //  latitude: 28.6139,
        // longitude: 77.2090,
        latitude: 49.2827, longitude: -123.1207,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },

      initialRegion:
      {
        //  latitude: 28.6139,
        // longitude: 77.2090,
        // latitude:56.13,longitude: -106.3468,
        latitude: 49.2827, longitude: -123.1207,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      url: CustomerConnection.mediaURL(),
      markerPosition: {
        latitude: 28.6139,
        longitude: 77.2090,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      TransportArr: [
        {
          tag: '1', displayimg: Constants.Images.customer.bike, imgsource: Constants.Images.customer.bike,
          activeimgsource: Constants.Images.customer.active_bike, header: 'Bike', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$10', name: 'bike'
        },
        {
          tag: '2', displayimg: Constants.Images.customer.small, imgsource: Constants.Images.customer.small,
          activeimgsource: Constants.Images.customer.active_small, header: 'Small', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$30', name: 'small'
        },
        {
          tag: '3', displayimg: Constants.Images.customer.medium, imgsource: Constants.Images.customer.medium,
          activeimgsource: Constants.Images.customer.active_medium, header: 'Medium', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$40', name: 'medium'
        },
        // {
        //   tag: '4', displayimg: Constants.Images.customer.large, imgsource: Constants.Images.customer.large,
        //   activeimgsource: Constants.Images.customer.active_large, header: 'Large', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$50', name: 'large'
        // },
        // {
        //   tag: '5', displayimg: Constants.Images.customer.xlarge, imgsource: Constants.Images.customer.xlarge,
        //   activeimgsource: Constants.Images.customer.active_xlarge, header: 'XLarge', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'xlarge'
        // },
        // {
        //   tag: '6', displayimg: Constants.Images.customer.truck_deck, imgsource: Constants.Images.customer.truck_deck,
        //   activeimgsource: Constants.Images.customer.active_truck_deck, header: 'DeckTruck', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'deck'
        // },
        {
          tag: '7', displayimg: Constants.Images.customer.truck_fridge, imgsource: Constants.Images.customer.truck_fridge,
          activeimgsource: Constants.Images.customer.active_truck_fridge, header: 'FridgeTruck', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'fridge'
        }
      ],
      isVisible: false,
      selectedItem: 4,
      durationTime: ['3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours',
        '19 hours', '20 hours', '21 hours', '22 hours', '23 hours', '24 hours'],
    }

    this.initialPosition = this.state.initialPosition;
    this.markerPosition = this.state.markerPosition;
  }

  componentDidMount() {
    let obj = {
      "page": 1,
      "count": 10,
      "status": true
    }
    ServiceCall.urlAdmin("/admin/getvehicle", obj).then((result) => {
      if (result.status == 1) {
        console.log("data get", result.data);
        let vanArray = [];
        for (i = 0; i < result.data.length; i++) {
          var vanList = result.data[i];
          console.log('image path-----', CustomerConnection.mediaURL() + vanList.vehicle_category.imagePath)

          vanArray.push(vanList)
          // let objj = {
          //   ArrayInfo: vanList
          //   // name: vanList.name,
          //   // image: CustomerConnection.mediaURL() + vanList.imagePath,
          //   // activeImage: CustomerConnection.mediaURL() + vanList.activeImagePath,
          //   // top_image: CustomerConnection.mediaURL() + vanList.top_image,
          //   // id: vanList._id
          // }
          console.log('objj', vanArray)
        }
        this.setState({
          vehicals: vanArray
        })
      } else {
        console.log("data getting")
      }
    }).catch(error => {
      console.log("result of type eror", error)
    });
  }

  componentWillUnmount() {
    //  navigator.geolocation.clearWatch(this.watchID);
  }


  searchPlace(_flag) {
    let dropAddress = this.props.state.dropArr;
    AsyncStorage.setItem("DropOff", JSON.stringify(dropAddress))
    let PickUpAddress = this.props.state.pickupArr;
    AsyncStorage.setItem("PickUp", JSON.stringify(PickUpAddress))
    var lendrop = this.props.state.dropArr.length - 1;
    var lenpick = this.props.state.pickupArr.length - 1;
    var addFlag = true;
    if (_flag == 1)//pickup
    {
      if (lenpick > 1) {
        if (lenpick == 3) {
          addFlag = false;
        }
        else if (lendrop == 1 && lenpick == 3) {
          addFlag = false;
        }
      }
      else if (lendrop > 1 && lenpick == 1) {
        addFlag = false;
      }
    }
    else if (_flag == 2) {
      if (lendrop > 1) {
        if (lendrop == 3) {
          addFlag = false;
        }
        else if (lenpick == 1 && lendrop == 3) {
          addFlag = false;
        }
      }
      else if (lendrop == 1 && lenpick > 1) {
        addFlag = false;
      }
    }
    if (addFlag) {
      this.props.dispatch({ type: 'SETPICKDROPFLAG', flag: _flag });
      this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: true });
    }
    else if (lendrop == 3 || lenpick == 3) {
      this.props.dispatch(ToastActionsCreators.displayInfo('You can enter max 3 pickup/drop locations.'));
      this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false });
    }
    else {
      this.props.dispatch(ToastActionsCreators.displayInfo('You can enter multiple locations either for Pickups or for Drops.'));
      this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false });
    }
  }

  vehicalList(item) {
    return (
      <View style={[{ backgroundColor: Constants.Colors.WhiteSmoke, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9.8, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25 }]}>
        <TouchableOpacity onPress={() => { this.setActiveTransport(item) }}>
          <View style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
            {
              item.vehicle_category._id ? <Image source={{ uri: CustomerConnection.mediaURL() + item.vehicle_category.imagePath }} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} /> : <Image source={{ uri: CustomerConnection.mediaURL() + item.vehicle_category.activeImagePath }} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
            }
            <Text style={[styles.transportLabel]}>{item.vehicle_category.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  setActiveTransport(val) {
    console.log('index tap====', val)
    // if (this.props.state.AddressCount > 0 || this.props.HourlyFlag != 0)
    //   //this.props.dispatch({ type: 'ACTIVE_VEHICLE', tagid: id });
    // if (parseInt(val.vehicle_category._id) == parseInt(index)) {
    //   newstate.vehicleName = val.name;
    //   arr1.push({
    //     tag: val.tag, displayimg: val.activeimgsource, imgsource: val.imgsource,
    //     activeimgsource: val.activeimgsource, header: val.header,
    //     backgroundColor: newstate.EstimateButtonBackgroundColor, borderBottomWidth: 4, borderBottomColor: "#1E4281", cost: val.cost, name: val.name
    //   });
    // }
    // else {
    //   arr1.push({
    //     tag: val.tag, displayimg: val.imgsource, imgsource: val.imgsource,
    //     activeimgsource: val.activeimgsource, header: val.header,
    //     backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: val.cost, name: val.name
    //   });
    // }
  }



  CallDatePicker() {
    //let context = this;
    DatePickerAndroid.open({
      date: new Date(this.props.state.HourlyServiceDate),
    }).then(({ action, year, month, day }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = new Date(year, month, day);
        var strDate = moment(ss).format('DD/MM/YYYY');
        this.props.dispatch({ type: 'SET_HOUR', displayDate: strDate, date: new Date(year, month, day) });
      }
    });
  }

  CallTimePicker() {
    //let context = this;
    var timeMoment = moment(this.props.state.HourlyServiceTime);
    TimePickerAndroid.open({
      hour: timeMoment.hour(),
      minute: timeMoment.minutes(),
      is24Hour: false,
    }).then(({ action, hour, minute, pm }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        var ss = moment().hour(hour).minute(minute).toDate();
        var strDate = moment(ss).format('hh:mm A');

        this.props.dispatch({ type: 'SET_TIME', displayTime: strDate, time: moment().hour(hour).minute(minute).toDate() });
      }
    });
  }

  setDurationTime() {
    this.props.dispatch({ type: 'SET_DURATION', displayDuration: this.state.durationTime[this.state.selectedItem] });
    this.setState({ isVisible: false });
  }

  componentWillMount() {

    this.setState({ showMap: true })
  }

  focu



  clickOnEstimate() {
    //let { dispatch } = this.props.navigation;

    if (this.props.state.DeliveryServiceOpacity == 1 && this.props.state.HourlyFlag == 0) {

      AdminActions.Get_Admin_Data('/admin/getservice', {}, 'admin').then((res) => {
        console.log(res.data);
        this.props.dispatch({ type: 'SET_DETAILS_CATEGORY', data: res.data })
        this.props.dispatch({ type: 'SET_TABINDEX', index: 1 });
        navigate('Home_Food');

        this.setState({ showMap: false })


      });

      //  RestClient.get_New('admin/getservice',{},'admin');
      return;

      //  alert("TEST")
    } else {
      if (this.props.state.HourlyServiceCount == 3 && this.props.state.HourlyFlag == 1) {
        navigate('HourlyGetEstimate');
        // var len = this.props.state.pickupArr.length;
        // var pickup = [];
        // var drop = [];

        // this.props.state.Hourly_pickupArr.map((val, i) => {
        //   if (i < len - 1) {
        //     pickup[i] = val.lat + ',' + val.long;
        //   }
        // });

        // var len = this.props.state.Hourly_dropArr.length;
        // this.props.state.Hourly_dropArr.map((val, i) => {
        //   if (i < len - 1) {
        //     drop[i] = val.lat + ',' + val.long;
        //   }
        // });
        // var duration = this.props.state.HourlyServiceDisplayDuration.toLowerCase().replace(' hours', '').replace(' hour', '');

        // fetch('http://18.205.68.238:9000/api/place-order/vehiclecalculation/', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     'date': this.props.state.HourlyServiceDisplayDate,
        //     'time': this.props.state.HourlyServiceDisplayTime,
        //     'service_type': 0,
        //     'duration': duration,
        //   }),
        // }).then((response) => response.json())
        //   .then((arr) => {
        //     this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr.data });
        //     this.props.dispatch({ type: 'SET_HOURLYSERVICE_TABINDEX', index: 1 });
        //     navigate('HourlyGetEstimate');
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }

    }

  }


  onPickerSelect(index) {
    //this.props.dispatch({type:'SET_DURATION', displayDuration : this.state.durationTime[index]});
    this.setState({ selectedItem: index });
  }



  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


  render() {
    navigate = this.props.navigation;
    goBack = this.props.navigation;
    const shadowForEstimate = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.2,
      color: "#fff",
      border: .5,
      radius: 1,
      opacity: 0.1,
      x: 2,
      y: 2,
      style: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 23,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
      }
    };
    const shadowForPickup = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6.4 * this.props.state.pickUpControlCount,
      color: "#000",
      border: 3,
      radius: 5,
      opacity: 0.1,
      x: 2,
      y: 2,
      style: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 91,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
      }
    };
    const shadowForHour = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20.5,
      color: "#000",
      border: 3,
      radius: 5,
      opacity: 0.2,
      x: 2,
      y: 2,
      style: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 91,
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
      }
    };
    var vehiclePositions = null;

    var newRegion = null;


    this.props.state.markerPositions.map((marker, i) => {
      console.log(marker);
      if (marker.title != '') {
        newRegion = marker.coordinates;
        //newRegion.latitudeDelta= 1;
        //newRegion.longitudeDelta= 1;
      }
    })

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.rootContainer]}>
          {this.state.showMap && <MapView
            key={new Date().getTime()}
            style={{ height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75, zIndex: 0 }}
            zoomEnabled={true}
            //initialRegion={this.state.initialPosition}
            initialRegion={this.state.initialPosition}
            region={newRegion}
            showsUserLocation={true}
            //  followsUserLocation={true}
            pitchEnabled={false}
            rotateEnabled={false}
          //minZoomLevel={15}
          >
            {/* <MapView.Circle
               center = { this.props.state.initialPosition }
                radius = { 50 }
                //strokeWidth = { 1 }
                strokeColor = { 'rgba(83,200,229,0.5)'}
                fillColor = { 'rgba(83,200,229,0.5)' }

                /> */}


            {this.props.state.markerPositions.map((marker, i) => (
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
                image={marker.img}
                key={marker.id}
              />
            ))}

          </MapView>}
          <BoxShadow setting={shadowForEstimate}>
            <View style={[{ opacity: this.props.state.DeliveryServiceOpacity }]}>
              <TouchableOpacity
                style={[styles.ButtonStyle, { backgroundColor: '#366CB5'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: 'transparent'/*this.props.state.EstimateButtonBackgroundColor*/ }]}
                onPress={() => this.clickOnEstimate()}
              >
                <Text style={[styles.ButtonTextStyle, { color: "#FFFFFF", textAlign: "center", fontWeight: '900', fontSize: 18 }]}>
                  {'GET ESTIMATE'}
                </Text>
              </TouchableOpacity>

            </View>
          </BoxShadow>

          <View style={[styles.subsubContainer, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/ }]}>
            <FlatList data={this.state.vehicals} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
          </View>

          {this.props.HourlyFlag === 0 ?
            <BoxShadow setting={shadowForPickup}>
              <View style={[styles.ButtonPickupStyle, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/, backgroundColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/ }]}>
                <PickUpLocation
                  onChangeText={() => this.searchPlace(1)}
                  onPress={() => this.searchPlace(1)}
                  PickDropFlag={1}
                  list={this.props.state.pickupArr}
                />
                <View style={[styles.horizontalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10 }]} />
                <PickUpLocation
                  onChangeText={() => this.searchPlace(2)}
                  onPress={() => this.searchPlace(2)}
                  PickDropFlag={2}
                  list={this.props.state.dropArr}
                  tintColor={[{ tintColor: '#F58436' }]}
                />
              </View>
            </BoxShadow>
            :
            <BoxShadow setting={shadowForHour}>
              <View style={[styles.ButtonPickupStyle, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/, backgroundColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/ }]}>
                <TouchableOpacity onPress={() => this.CallDatePicker()}>
                  <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                    <Image source={Constants.Images.customer.calendar} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                    <Text style={styles.HourlyTextStyle}>
                      {'Date'}
                    </Text>
                    <Text style={[styles.HourlyRightText]}>
                      {this.props.state.HourlyServiceDisplayDate}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.horizontalLine]} />
                <TouchableOpacity onPress={() => this.CallTimePicker()}>
                  <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                    <Image source={Constants.Images.customer.clock} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                    <Text style={styles.HourlyTextStyle}>
                      {'Start Time'}
                    </Text>
                    <Text style={[styles.HourlyRightText]}>
                      {this.props.state.HourlyServiceDisplayTime}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.horizontalLine]} />
                <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                  <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                    <Image source={Constants.Images.customer.duration} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                    <Text style={styles.HourlyTextStyle}>
                      {'Duration'}
                    </Text>
                    <Text style={[styles.HourlyRightText]}>
                      {this.props.state.HourlyServiceDisplayDuration}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[styles.horizontalLine, { height: 0 }]} />
              </View>
            </BoxShadow>
          }

        </View>

        <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { this.setState({ isVisible: false }) }}>
          <View style={[styles.modalOuter]}>
            <View style={[styles.modalInner, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80, borderRadius: 10, padding: 0 }]}>
              <View style={[styles.flexRow, { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#EFEDED', borderBottomWidth: 1, borderBottomColor: '#969297', justifyContent: 'center', alignItems: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5.5, }]}>
                <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }}>
                  <Text style={{ color: '#969297', fontFamily: Constants.CustomerFonts.semibold.fontFamily, fontSize: Constants.CustomerFonts.semibold.fontSize }}>{'Set Duration'}</Text>
                </View>
                <View style={[styles.flexRow, { justifyContent: 'flex-end' }]}>
                  <TouchableOpacity style={[styles.btCloseModal]} onPress={() => { this.setState({ isVisible: false }) }}>
                    <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View style={{ justifyContent: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 30, marginBottom: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, }}>
                  <Picker style={{ marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 30, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15 }}
                    selectedValue={this.state.selectedItem}
                    itemStyle={{ color: '#081933', fontSize: 17 }}
                    onValueChange={(index) => this.onPickerSelect(index)}>
                    {this.state.durationTime.map((value, i) => (
                      <PickerItem label={value} value={i} key={"money" + value} />
                    ))}
                  </Picker>
                  <TouchableOpacity activeOpacity={0.5} style={[styles.OKButtonStyle]} onPress={() => this.setDurationTime()}>
                    <Text style={[styles.OKButtonTextStyle]}>
                      {'OK'}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.Colors.White,//'#F5FCFF'
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    margin: 10,
    padding: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  btCloseModal: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  btnCloseModalIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
  },
  durationViewStyle: {
    alignItems: 'center',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80,
  },

  flexRow: {
    flexDirection: 'row',
  },
  pickupIcons: {
    marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 19,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //opacity: 0.87,
  },
  ButtonPickupStyle: {
    borderWidth: 1,
    borderRadius: 5,

    //bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 96,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#D7D7D7',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  ButtonStyle: {
    //borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginBottom: 10,
    marginTop: 0,//10,
    marginLeft: 0,//10,
    marginRight: 0,//10,
    //borderRadius: 30,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  OKButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
    marginBottom: 3,
    marginTop: 20,//10,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
    borderRadius: 30,
    backgroundColor: '#53C8E5',//Constants.Colors.White,
    borderColor: '#53C8E5',//Constants.Colors.White,
  },
  OKButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,//'#53C8E5',
    textAlign: "center",
  },
  HourlyTextStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
    color: '#5D5D5D',
  },
  HourlyRightText: {
    flex: 1,
    textAlign: 'right',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  DurationListText: {
    textAlign: 'center',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#081933',
    borderBottomWidth: 1,
    //borderTopWidth:1,
  },

  transportIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 15,
    padding: 0,
  },
  transportLabel: {
    textAlign: 'center',
    marginTop: 0,
    color: '#081933',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  vanCss: {
    alignItems: 'center',
  }
});




const mapStateToProps = state => ({
  state: state.CustomerReducer,
});




export default connect(mapStateToProps, null)(CustomerMapView);
