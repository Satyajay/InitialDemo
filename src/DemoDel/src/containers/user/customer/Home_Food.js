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
  AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { BoxShadow } from 'react-native-shadow';
import _ from "underscore";

import { ToastActionsCreators } from 'react-native-redux-toast';

import CustomerConnection from "../../../config/Connection";
import { stopLoading, startLoading } from '../../../redux/modules/app';

class Home_Food extends Component<{}> {
  constructor(props) {
    super(props);

  }

  OnClickFood = (element) => {
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;
    //  alert("CustomerConnection" + CustomerConnection.getCustomerTempUrl())
    this.props.dispatch(startLoading());
    var REQUEST_URL = CustomerConnection.getAdminUrl() + '/admin/getdgunit?serviceId=' + element._id;
    fetch(REQUEST_URL)
      .then((response) =>
        response.json())
      .then((arr) => {
        dispatch({ type: 'SET_FOODRANGE', range: arr.data[0].dgUnit, _deliverytype: 0, _weight: 3 });
        navigate('Home_Services');
        this.props.dispatch(stopLoading());
      }).catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });

  }
  OnClickDocument(element) {
    console.log('elements +++++++++' + element)
    let { dispatch } = this.props.navigation;
    let { navigate } = this.props.navigation;
    this.props.dispatch(startLoading());
    //   var REQUEST_URL='http://18.212.245.222:7010/api/dgunit/get/?type=documents';
    var REQUEST_URL = CustomerConnection.getAdminUrl() + '/admin/getdgunit?serviceId=' + element._id;

    fetch(REQUEST_URL)
      .then((response) =>
        response.json())
      .then((arr) => {
        this.props.dispatch(stopLoading());
        dispatch({ type: 'SET_FOODRANGE', range: arr.data[0].dgUnit, _deliverytype: 1, _weight: arr.data[0].weight });
        navigate('Home_ServicesDoc');
      }).catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });;

  }

  OnClickCourier() {
    let { navigate } = this.props.navigation;
    let { dispatch } = this.props.navigation;
    var unit = {
      weight: 10,
      height: 1,
      width: 1,
      depth: 1,
      isSkid: false,
    };

    dispatch({ type: 'SET_COURIER_UNITS' });
    navigate('Home_ServicesItemsCourier');
  }

  OnClickFurniture() {
    let { navigate } = this.props.navigation;
    let { dispatch } = this.props.navigation;
    this.props.dispatch(startLoading())
    var REQUEST_URL = CustomerConnection.getAdminUrl() + '/admin/getfurniturebycategory';
    var furnitureArray = [];
    fetch(REQUEST_URL)
      .then((response) =>
        response.json())
      .then((arr) => {
        this.props.dispatch(stopLoading())
        if (arr.status && arr.data) {
          _.each(arr.data, function (element) {
            let tempData = {};
            tempData['category'] = element.category._id;
            tempData['categoryName'] = element.category.name;
            tempData['products'] = [];
            _.each(element.furniture, function (productData) {
              if (productData.status)
                tempData['products'].push({
                  category: productData.category,
                  id: productData._id,
                  name: productData.name,
                  desc: productData.description,
                  quantity: 0,
                  img: CustomerConnection.mediaURL() + productData.imagePath,
                  qtyInCircle: 0,
                  unit: productData.unit
                })
            })
            furnitureArray.push(tempData);
          });

        }


        dispatch({ type: 'SET_FURNITURE_UNITS', funData: furnitureArray });
        navigate('Home_ServicesItemsFurniture');


        //    dispatch({type : 'SET_FOODRANGE', range : arr.data[0].dgUnit ,_deliverytype:1,_weight:arr.data[0].weight});
        //  navigate('Home_ServicesDoc');
      }).catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });;


  }


  handlePress = (element) => {

    if (element.name == 'Food')
      this.OnClickFood(element)
    if (element.name == 'Documents')
      this.OnClickDocument(element)
    if (element.name == 'Courier & Frieght')
      this.OnClickCourier(element)
    if (element.name == 'Furniture & Appliances')
      this.OnClickFurniture(element)

  }


  componentDidMount() {

    /*if(Uniquedatataa++>0)
    {
      this.props.navigation.goBack();
      Uniquedatataa--;
    
    }*/


    //alert(Uniquedatataa++);

  }

  renderBlock = () => {
    const { navigate, goBack } = this.props.navigation;
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 44,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
      color: "#000",
      border: 3,
      radius: 10,
      opacity: 0.1,
      x: 2,
      y: 2,
      style: {
        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 3 / 100,
      }
    };



    CategoryBlock = [];

    CategoryBlock = this.props.dashbaordData.categoryData.map((element) => {

      if (element.name != 'Hourly Services') {
        return (
          <BoxShadow setting={shadowOpt}>
            <TouchableOpacity style={[styles.cardView]} onPress={() => this.handlePress(element)}>
              <View style={[styles.contentStyle]}>
                <Image source={{ uri: CustomerConnection.mediaURL() + element.image }} style={[styles.imgSize]} resizeMode={'contain'} />
                <Text style={styles.textStyle}>{element.name}</Text>
              </View>
            </TouchableOpacity>
          </BoxShadow>
        )
      }
    });

    return CategoryBlock;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={[styles.container]}>
        {/* <Text onPress={()=>goBack()}> GO BACK GO BACK {Uniquedatataa}</Text> */}

        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={1} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.dashbaordData && this.renderBlock()}
        </ScrollView>

        {/* <ScrollView style={[styles.container,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*3/100}]}>
          <View style={styles.flexRow}>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity  style={[styles.cardView]} onPress={() => this.OnClickFood()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.food} style={[styles.imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Food'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity style={[styles.cardView]} onPress={() => this.OnClickDocument()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.documents} style={[styles.doc_imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Documents'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
          { </View>
          <View style={styles.flexRow}> }
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity style={[styles.cardView]} onPress={() => this.OnClickFurniture()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.furniture} style={[styles.furniture_imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Furniture & Appliances'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
            <BoxShadow setting={shadowOpt}>
              <TouchableOpacity  style={[styles.cardView]} onPress={() => this.OnClickCourier()}>
                <View style={[styles.contentStyle]}>
                  <Image source={Constants.Images.customer.courier} style={[styles.doc_imgSize]} resizeMode={'contain'}/>
                  <Text style={styles.textStyle}>{'Courier & \r\nFrieght'}</Text>
                </View>
              </TouchableOpacity>
            </BoxShadow>
          </View>
        </ScrollView> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  flexRow: {
    flexDirection: 'row',
  },
  cardView: {
    backgroundColor: '#fff',
    //borderColor:'#fff',
    //borderWidth:1,
    //marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,
    //borderColor: '#fff',
    //padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*3/100,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 44,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
    borderRadius: 10,
  },
  contentStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 44,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
    alignItems: 'center',
    justifyContent: 'center',
    //padding:10,
  },
  imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 28,
  },
  doc_imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22,
  },
  furniture_imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 30,
  },

  textStyle: {
    textAlign: 'center',
    //fontSize:Constants.CustomerFonts.BigSize.fontSize,
    fontSize: 19,
    //lineHeight:24,
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
    color: '#212123',

  },

  contentContainer: {
    //  paddingVertical: 20,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    //horizontal:false,
    flexWrap: "wrap",
    //justifyContent: "space-around"   

  },
});
export default connect(state => ({
  state: state.CustomerReducer,
  dashbaordData: state.adminReducer
}))(Home_Food);
