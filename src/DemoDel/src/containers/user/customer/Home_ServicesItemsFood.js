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
  FlatList,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { BoxShadow } from 'react-native-shadow';
import CustomerConnection from "../../../config/Connection";


import { startLoading, stopLoading, showToast, hideToast } from '../../../redux/modules/app';
import CustomersAPI from '../../../utilities/Customer_ApiCalls';
import { ToastActionsCreators } from 'react-native-redux-toast';

class Home_Services extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      activecolor: '#C3C1C0',

    }
  }
  onClickSubtract(_index) {
    var arr1 = [];
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (i == _index) {
        if (parseInt(val.prev) - this.props.state.FoodRange >= 1) {
          //arr1.push({next:parseInt(val.next)-this.props.state.FoodRange,prev:parseInt(val.prev)-this.props.state.FoodRange});
          if (parseInt(val.prev) - this.props.state.FoodRange == 1) {
            arr1.push({ next: parseInt(val.next) - this.props.state.FoodRange, prev: parseInt(val.prev) - this.props.state.FoodRange, opacity: 1, activecolor: '#C3C1C0' });
            //this.setState({opacity:1,activecolor:'#C3C1C0'});
          }
          else {
            arr1.push({ next: parseInt(val.next) - this.props.state.FoodRange, prev: parseInt(val.prev) - this.props.state.FoodRange, opacity: val.opacity, activecolor: val.activecolor });
          }
        }
        else {
          arr1.push({ next: val.next, prev: val.prev, opacity: 1, activecolor: '#C3C1C0' });
          //this.setState({opacity:1,activecolor:'#C3C1C0'});
        }
      }
      else {
        arr1.push(val);
      }
    });

    this.props.dispatch({ type: 'SET_ITEMRANGE_ARRAY', array: arr1 });
  }
  onClickAdd(_index) {
    var arr1 = [];
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (i == _index) {
        if (parseInt(val.next) + this.props.state.FoodRange <= 100)
          arr1.push({ next: parseInt(val.next) + this.props.state.FoodRange, prev: parseInt(val.prev) + this.props.state.FoodRange, opacity: 0.5, activecolor: Constants.Colors.Blue });
        else {
          arr1.push({ next: val.next, prev: val.prev, opacity: 0.5, activecolor: Constants.Colors.Blue });
        }
      }
      else {
        arr1.push(val);
      }
    });
    //this.setState({opacity:0.5,activecolor:Constants.Colors.Blue});
    this.props.dispatch({ type: 'SET_ITEMRANGE_ARRAY', array: arr1 });
  }

  itemList(data) {
    let { item, index } = data;
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20,
      color: "#000",
      border: 3,
      radius: 4,
      opacity: 0.2,
      x: 2,
      y: 2,
      style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3 }
    };
    return (
      <BoxShadow setting={shadowOpt}>
        <View style={{ backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20 }}>
          <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100 }]}>
            <Text style={[styles.textStyle, { color: '#5D5D5D', flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
              {this.props.state.LocationForService}{index + 1}{': '}
            </Text>
            <View style={[styles.flexRow, { flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6 }]}>
              <Image source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'} />
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                {item.address}
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow, { marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2, }]}>
            <Text style={[styles.textStyle, { flex: 2, justifyContent: 'flex-start', marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100, textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
              {'Number of Dishes'}
            </Text>
            <View style={[styles.flexRow, {
              flex: 1, justifyContent: 'flex-end', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2, backgroundColor: '#ffffff',
              borderRadius: 20, borderWidth: 1, borderColor: Constants.Colors.BlurGrey
            }]}>
              <TouchableOpacity style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "#1E4281", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} activeOpacity={item.opacity} onPress={() => this.onClickSubtract(index)}>
                <Text style={[styles.plusIconWhite]}>-</Text>
                {/* <Image source={Constants.Images.customer.minusWhite} style={[styles.plusIcon, { tintColor: item.activecolor }]} resizeMode={'contain'} /> */}
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.textStyle]}>
                  {item.prev}-{item.next}
                </Text>
              </View>
              <TouchableOpacity style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: "#1E4281", borderBottomRightRadius: 0, borderTopRightRadius: 0 }} activeOpacity={0.5} onPress={() => this.onClickAdd(index)}>
                <Text style={[styles.plusIconWhite]}>+</Text>
                {/* <Image source={Constants.Images.customer.plus} style={[styles.plusIcon]} resizeMode={'contain'} /> */}
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </BoxShadow>
    )
  }

  CallUrgency() {
    let { navigate } = this.props.navigation;
    var len = this.props.state.pickupArr.length;
    var strItems = [];
    var strWeight = [];
    var pickup = [];
    var drop = [];
    var urgencyStr = 'direct';

    this.props.dispatch(startLoading());

    /*   this.props.state.pickupArr.map((val,i) => {
         if(!(val.address.indexOf('Choose')==0))
         {
           pickup[i]=val.lat+','+val.long;
         }
       });
   
   
       var len = this.props.state.dropArr.length;
       this.props.state.dropArr.map((val,i) => {
         if(!(val.address.indexOf('Choose')==0))
         {
           drop[i]=val.lat+','+val.long;
         }
       });*/

    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0)) {
        strItems[i] = val.next;
      }
    });

    var timeframe = 1;


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
      'pickup': pickup,
      'drop_location': drop,
      'date': '05/06/2018',
      'time': '04:20PM',
      'quantity': strItems,
      'service_type': 1,
      "delivery_type_usf": 1

    }));


    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'pickup': pickup,
        'drop_location': drop,
        'date': '05/06/2018',
        'time': '04:20PM',
        'quantity': strItems,
        'service_type': 1,
        "delivery_type_usf": 1

      }),
    }).then((response) => response.json())
      .then((result) => {
        if (result.status == true) {
          this.props.dispatch(stopLoading());
          this.props.dispatch({ type: 'SET_VEHICLECOST', _data: result.data, id: 0 });

          navigate('UrgencyForFood');
        } else {
          this.props.dispatch(stopLoading());
          this.props.dispatch(ToastActionsCreators.displayInfo(result.message));
        }

        //this.props.dispatch({type : 'SET_VEHICLECOST', _data : arr1.data,id:0});
        //this.props.dispatch({type:'ACTIVE_VEHICLE', tagid:0});

      })
      .catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    var arr1 = [];
    var len = this.props.state.DisplayLocationAddress.length;
    this.props.state.DisplayLocationAddress.map((val, i) => {
      if (!(val.address.indexOf('Choose') == 0))
        arr1.push(val);
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#f4f5f7' }}>
        <HeaderBackground navigation={navigate} goBack={goBack} />

        <HeaderMenu navigation={navigate} catId={2}/>
        <ScrollView style={{ marginTop: Constants.BaseStyle.DEVICE_WIDTH * 3 / 100 }}>
          <FlatList
            data={arr1}
            renderItem={this.itemList.bind(this)}
          />

        </ScrollView>
        <TouchableHighlight
          style={[styles.ButtonStyleNext, { backgroundColor: '#366CB5', borderColor: 'transparent', marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3 }]}
          onPress={() => this.CallUrgency()}
        >
          <Text style={[styles.ButtonTextStyleNext, { color: "#FFFFFF", textAlign: "center", fontWeight: '900', fontSize: 18 }]}>
            {'NEXT'}
          </Text>
        </TouchableHighlight>
        {/* <ShadowButton
          onPress={() => this.CallUrgency()}
          text={'NEXT'}
          bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
          style={[styles.ButtonStyle]}
          textStyle={[styles.ButtonTextStyle]}
        /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  pickupIcon: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  plusIcon: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    tintColor: Constants.Colors.Blue,
  },
  plusIconWhite: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    color: '#fff',
    fontSize: 20,
    marginTop: -7,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    textAlign: 'center',
    color: '#081933',
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
  ButtonStyleNext: {
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    marginTop: 10,//10,
    marginLeft: 10,//10,
    marginRight: 10,//10,
  },
  ButtonTextStyleNext: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
});

/*const mapStateToProps = state => ({
  state: state.CustomerReducer,
  urgencystate: state.UrgencyReducer
});

const mapDispatchToProps = dispatch => ({
  CustomerActions: bindActionCreators(CustomerActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Home_Services);*/
export default connect(state => ({ state: state.CustomerReducer }))(Home_Services);
