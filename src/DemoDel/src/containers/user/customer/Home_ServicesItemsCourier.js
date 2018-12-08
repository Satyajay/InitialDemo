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
  Modal,
  Alert,
} from 'react-native';

import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;
import CustomerConnection from "../../../config/Connection";

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import CheckBoxLabel from '../../../components/customer/CheckBoxLabel';
import AddCourierItems from '../../../components/customer/AddCourierItems';
import { BoxShadow } from 'react-native-shadow';
import { startLoading, stopLoading } from '../../../redux/modules/app';

class Home_ServicesItemsCourier extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      itemId: 1,
      parentId: 1,
      selectedItem: 1,
      quantityArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      //quantityArr : [{qty : '1'},{qty : '2'},{qty : '3'},{qty : '4'},{qty : '5'},{qty : '6'},{qty : '7'},{qty : '8'},{qty : '9'},{qty : '10'}]
    }
  }

  AddItems(id) {
    this.props.dispatch({ type: 'COURIER_MODAL', visibility: true, itemindex: id });
  }
  onClickTailgate(id) {
    this.props.dispatch({ type: 'COURIER_TAILGATE', itemindex: id });

  }
  onClickResidential(id) {
    this.props.dispatch({ type: 'COURIER_RESIDENTIAL', itemindex: id });
  }

  setCheckImage(value) {
    if (value) {
      return Constants.Images.customer.check;
    }
    else {
      return Constants.Images.customer.uncheck;
    }
  }
  onClickQuantity(id, parentId) {
    this.setState({ isVisible: true, itemId: id, parentId: parentId });
  }
  onDeleteItem(id, parentId) {
    let { dispatch } = this.props.navigation;
    this.setState({ itemId: id, parentId: parentId });
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            dispatch({ type: 'COURIER_ITEMDELETE', id: this.state.itemId, parentid: this.state.parentId });
            return true;
          }
        },
      ],
      { cancelable: false }
    )
  }


  itemList(data) {
    let { item, index } = data;
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 50,//37.2,
      color: "#000",
      border: 3,
      radius: 4,
      opacity: 0.2,
      x: 2,
      y: 2,
      style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3 }
    };

    var _height = 25.2;
    if (item.courieritems.length > 0) {
      _height = 32;
      if (item.courieritems.length > 1) {
        _height = 32 + ((item.courieritems.length - 1) * 12)
      }
    }


    var _itemslist = item.courieritems.map((val, b) => {


      return (
        <View >
          <View style={[styles.flexRow, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
            <View style={{ flex: 0.5 }}>
              <View>
                <Text style={[styles.text3]}>{val.name}</Text>
              </View>
              <View style={{ marginTop: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }}>
                <Text style={[styles.text4]}>{`Size: ${val.height*val.depth*val.width}  ft3`}</Text>
              </View>
            </View>
            <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={[styles.text4]}>{`Weight: ${val.weight} Pounds`}</Text>
            </View>
            <View style={[{ flex: 0.3, alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>

              <View style={{ borderWidth: 1, borderColor: '#EFEDED', paddingTop: 2, paddingBottom: 2, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={[styles.textStyle]} onPress={() => this.onClickQuantity(val.id, val.parentId)}>{val.quantity}</Text>
              </View>

            </View>
            <TouchableOpacity onPress={() => this.onDeleteItem(val.id, val.parentId)} activeOpacity={0.5} style={{ alignItems: 'center', justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
              <Image source={Constants.Images.customer.delete} style={[styles.deleteIcon]} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
          {(b != item.courieritems.length - 1) ?
            <View style={[styles.horizontalLine]} />
            :
            null
          }
        </View>
      );
    });
    return (
      <BoxShadow setting={{
        width: Constants.BaseStyle.DEVICE_WIDTH,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * _height,//37.2,
        color: "#000",
        border: 3,
        radius: 4,
        opacity: 0.2,
        x: 2,
        y: 2,
        style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3 }
      }}>
        <View style={{ backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * _height }}>
          <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100 }]}>
            <Text style={[styles.textStyle, { color: '#5D5D5D', flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
              {this.props.state.LocationForService}{index + 1}{': '}
            </Text>
            <View style={[styles.flexRow, { flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6 }]}>
              <Image source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'} />
              <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
                {item.address}
              </Text>
            </View>
          </View>
          {(item.courieritems.length > 0) ?
            <View>
              <CheckBoxLabel
                viewStyle={{ alignItems: 'center', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }}
                imgsource={this.setCheckImage(item.IsTailgate)}
                onPress={() => this.onClickTailgate(item.id)}
                MyTextStyle={{ fontFamily: Constants.CustomerFonts.semibold.fontFamily }}
                text={'Tailgate Needed'}
                isInfoImg={false}
              />
              <CheckBoxLabel
                viewStyle={{ alignItems: 'center', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }}
                imgsource={this.setCheckImage(item.IsResidential)}
                onPress={() => this.onClickResidential(item.id)}
                MyTextStyle={{ fontFamily: Constants.CustomerFonts.semibold.fontFamily }}
                text={'Residential Location'}
                isInfoImg={false}
              />
              <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100 }]}>
                <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2, }}>
                  <Text style={[styles.ItemHeaderStyle]}>{'Items'}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, }}>
                  <Text style={[styles.AddItemStyle]} onPress={() => this.AddItems(item.id)}>{'ADD ITEM'}</Text>
                </View>
              </View>

              {_itemslist}
            </View>

            :

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={Constants.Images.customer.courier_gray} style={[styles.Courier_imgSize]} resizeMode={'contain'} />

              <Text style={[styles.AddItemStyle]} onPress={() => this.AddItems(item.id)}>
                {'ADD ITEM'}
              </Text>
            </View>
          }



        </View>

      </BoxShadow>
    )
  }

  onPickerSelect(index) {
    this.setState({ selectedItem: index });
  }
  setQuantity() {
    this.props.dispatch({ type: 'COURIER_ITEMQUANTITY', qty: this.state.selectedItem, id: this.state.itemId, parentid: this.state.parentId });
    this.setState({ isVisible: false });
  }

  CallUrgency() {
    let { navigate } = this.props.navigation;
    var len = this.props.state.pickupArr.length;
    var strItems = [];
    var strWeight = [];
    var strTailgate = [];
    var strResidential = [];
    var pickup = [];
    var drop = [];
    var urgencyStr = 'direct';


    var len = this.props.state.DisplayLocationAddress.length;

    this.props.state.DisplayLocationAddress.map((val, i) => {

      if (!(val.address.indexOf('Choose') == 0)) {
        var qty = 0;
        var wt = 0;
        var arr1 = [];
        for (var x = 0; x < val.courieritems.length; x++) {
          qty += parseFloat(val.courieritems[x].size * val.courieritems[x].quantity);
          wt += parseFloat(val.courieritems[x].weight);
          arr1.push({
            "name": "abc",
            "size": 1,
            "weight": 4,
            "quantity": 5,
            "height": 7,
            "width": 4,
            "depth": 5,
            "isSkid": false
          });
        }
        strItems.push(arr1);
        strWeight[i] = wt;
        strTailgate[i] = 0;
        strResidential[i] = 0;
      }
    });

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
    var timeframe = 1;

    // fetch('http://18.212.245.222:7010/api/place-order/vehiclecalculation/', {
    this.props.dispatch(startLoading())            
    fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation/', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'pickup': pickup,//this.props.state.pickupArr[0].lat+','+this.props.state.pickupArr[0].long],
        'drop_location': drop,//this.props.state.dropArr[0].lat+','+this.props.state.dropArr[0].long],



        'date': '05/06/2018',
        'time': '04:20PM',
        'vehicle': this.props.state.vehicleName,
        'quantity': strItems,
        'weight': strWeight,
        //   'service_type':4,
        //   'delivery_type_usf':urgencyStr,
        //   'time_frame':timeframe,
        "tailgate": strTailgate,
        "residential": strResidential,
        "extra_help": false,
        "driver_help": false,
        "item": strItems,
        "service_type": 3,
        "delivery_type_usf": 1,
        "driverHelp": false,
        "extraHelper": 0,
        //  "tailgate": [1,1],
        "residential": [1, 0]




      }),
    }).then((response) => response.json())
      .then((arr1) => {
    this.props.dispatch(stopLoading())              
        this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr1.data, id: 0 });
        //this.props.dispatch({type : 'SET_VEHICLECOST_Courier', _data : arr1.data});
        //this.props.dispatch({type:'ACTIVE_VEHICLE', tagid:0});
        navigate('UrgencyForCourier');
      })
      .catch((error) => {
    this.props.dispatch(stopLoading())              
        console.error(error);
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

        <ShadowButton
          onPress={() => this.CallUrgency()}
          text={'NEXT'}
          bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
          style={[styles.ButtonStyle]}
          textStyle={[styles.ButtonTextStyle]}
        />

        <Modal animationType={"fade"} transparent={true} visible={this.props.state.CourierModalVisibility} onRequestClose={() => { this.props.dispatch({ type: 'COURIER_MODAL', visibility: false }) }}>
          <AddCourierItems navigation={navigate} dispatch={this.props.navigation} />
        </Modal>

        <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { this.setState({ isVisible: false }) }}>
          <View style={[styles.modalOuter]}>
            <View style={[styles.modalInner, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80, borderRadius: 10, padding: 0 }]}>
              <View style={[styles.flexRow, { borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#EFEDED', borderBottomWidth: 1, borderBottomColor: '#969297', justifyContent: 'center', alignItems: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5.5, }]}>
                <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }}>
                  <Text style={{ color: '#969297', fontFamily: Constants.CustomerFonts.semibold.fontFamily, fontSize: Constants.CustomerFonts.semibold.fontSize }}>{'Set Quantity'}</Text>
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
                    itemStyle={{ color: '#081933', fontSize: 20 }}
                    onValueChange={(index) => this.onPickerSelect(index)}>
                    {this.state.quantityArr.map((value, i) => (
                      <PickerItem label={value} value={i} key={"money" + value} />
                    ))}
                  </Picker>
                  <TouchableOpacity activeOpacity={0.5} style={[styles.OKButtonStyle]} onPress={() => this.setQuantity()}>
                    <Text style={[styles.OKButtonTextStyle]}>
                      {'OK'}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  inputStyle: {
    //flex:1,
    borderWidth: 0.5,
    borderColor: '#B1B1B1',
    padding: 1,
    margin: 0,
    //paddingBottom:5,
    //paddingLeft:1,
    //paddingRight: 1,
    textAlign: 'center',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  pickupIcon: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  deleteIcon: {
    //marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  Courier_imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22,
    opacity: 0.2,

  },
  text1: {
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.BigSize.fontFamily,
    color: '#969297',
  },
  text2: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#C3C1C0',
  },
  text3: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#081933',
  },
  text4: {
    fontSize: Constants.CustomerFonts.small_13.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#C3C1C0',
  },
  AddItemStyle: {
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.BigSize.fontFamily,
    color: '#53C8E5',
    textDecorationLine: 'underline',
  },
  ItemHeaderStyle: {
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.BigSize.fontFamily,
    color: '#081933',
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
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
  OKButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
    marginBottom: 0,
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
  horizontalLine: {
    height: 2,
    backgroundColor: '#EFEDED',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
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

});
export default connect(state => ({ state: state.CustomerReducer }))(Home_ServicesItemsCourier);
