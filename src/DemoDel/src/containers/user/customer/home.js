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
} from 'react-native';

import { connect } from 'react-redux';

import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from "../../../constants";
import SubmitButton from "../../../components/common/FormSubmitButton";
import CustomerMapView from '../../../components/customer/MapView';
//import PickUpLocation from '../../../components/customer/PickUpLocation';
import Home_OrdersList from '../../../components/customer/Home_OrdersList';
import Home_DriverList from '../../../components/customer/Home_DriverList';
//import BarChartReport from '../../../components/customer/BarChart';
import SearchPlace from '../../../components/customer/SearchPlace';
import SearchPlace_Hourly from '../../../components/customer/SearchPlace_Hourly';
import ServiceRegularMapView from '../../../components/customer/ServiceRegularMapView';

import HeaderMenu from '../../../components/customer/HeaderMenu';
import HourlyServiceHeaderMenu from '../../../components/customer/HourlyServiceHeaderMenu';

import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';

var strAddress = '228 Park Ave S, New York, NY 10003, USA';


class CustomerHome extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      DeliveryFlag: 1,
      HourlyFlag: 0,
      OrdersList: [{ id: 0, orderNo: '#9786', status: 'Ongoing', amount: '$250', time: '3:50 PM', statusFlag: 1 },
      { id: 1, orderNo: '#9787', status: 'Delivered', amount: '$250', time: '3:50 PM', statusFlag: 2 },
      { id: 2, orderNo: '#9734', status: 'Delivered', amount: '$200', time: '3:00 PM', statusFlag: 2 },
      { id: 3, orderNo: '#9722', status: 'Delivered', amount: '$350', time: '1:10 PM', statusFlag: 2 },
      { id: 4, orderNo: '#9767', status: 'Ongoing', amount: '$150', time: '6:40 PM', statusFlag: 1 },
      { id: 5, orderNo: '#9755', status: 'Ongoing', amount: '$100', time: '2:00 PM', statusFlag: 1 },
      { id: 6, orderNo: '#9784', status: 'Ongoing', amount: '$150', time: '4:30 PM', statusFlag: 1 },
      { id: 7, orderNo: '#9726', status: 'Ongoing', amount: '$250', time: '3:30 PM', statusFlag: 1 },
      ],
    }
    console.log('vehicle list ++++', this.props.state.FilteredTransportArray);
  }





  setViewColorOnClick(value) {
    if (value === 1) {
      return [styles.colIndexViewBlack];
    }
    else {
      return [styles.colIndexViewWhite];
    }
  }

  setTextColorOnClick(value) {
    if (value === 1) {
      return [styles.colIndexLabelBlack];
    }
    else {
      return [styles.colIndexLabelWhite];
    }
  }

  onPressInfo(value) {
    if (parseInt(value) === 1) {
      //this.setState({DeliveryFlag:1,HourlyFlag:0});
      this.props.dispatch({ type: 'SET_SERVICEFLAG', deliveryFlag: 1, hourlyFlag: 0 });
    }
    else {
      //this.setState({ DeliveryFlag: 0, HourlyFlag: 1 });
      this.props.dispatch({ type: 'SET_SERVICEFLAG', deliveryFlag: 0, hourlyFlag: 1 });

    }
  }

  componentWillFocus() {
    alert("Ssds")
  }


  componentDidMount() {
    // <Text onPress={()=>goBack()}> GO BACK GO BACK </Text>
    // alert(Uniquedatataa++)
    console.log('Uniquedatataa    ---- -' + Uniquedatataa);
    if (Uniquedatataa++ > 0) {
      Uniquedatataa--;
      this.props.navigation.goBack();
    }
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
      <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
        {/* <Text onPress={()=>goBack()}> GO BACK GO BACK {Uniquedatataa}</Text> */}
        <HeaderBackground navigation={navigate}>
        </HeaderBackground>
        <BoxShadow setting={shadowOpt}>
          <View style={[styles.flexRow]}>
            <TouchableOpacity onPress={() => this.onPressInfo(1)} style={[styles.colIndex, this.setViewColorOnClick(this.props.state.DeliveryFlag)]}>
              <Text style={this.setTextColorOnClick(this.props.state.DeliveryFlag)}>{'Delivery Service'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressInfo(2)} style={[styles.colIndex, this.setViewColorOnClick(this.props.state.HourlyFlag)]}>
              <Text style={this.setTextColorOnClick(this.props.state.HourlyFlag)}>{'Hourly Service'}</Text>
            </TouchableOpacity>
          </View>
        </BoxShadow>

        <ScrollView style={{ flex: 1, bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1, }}>
          <CustomerMapView HourlyFlag={this.props.state.HourlyFlag} navigation={navigate} goBack={goBack} />
          <View style={[styles.horizontalLine, { marginTop: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100, marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} />
          <Home_OrdersList navigation={navigate} />
          <View style={[styles.horizontalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} />
          <TouchableOpacity style={[styles.cardView]}>
            <View style={styles.flexRow}>
              <View style={{ flex: 0.4 }}>
                <Image source={Constants.Images.customer.invitefriendhome} style={styles.inviteFriendIcon} resizeMode={'contain'} />
              </View>
              <View style={{ flex: 0.8, justifyContent: 'center' }}>
                <Text style={[styles.inviteFriendHeader]}>{'Invite Friends'}</Text>
                <Text style={[styles.inviteFriendText]}>{'Refer your friends and get 10$ on adding money by your friend.'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.horizontalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} />
          <Home_DriverList />
          <View style={[styles.horizontalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} />
          <View style={[styles.flexRow, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>
            <Text style={[styles.ReportStyle, { flex: 0.5 }]}>{'Reports'}</Text>
            <Text style={[styles.MoreReportStyle, { flex: 0.5, justifyContent: 'flex-end', textAlign: 'right' }]}>{'More Reports'}</Text>
          </View>
          {/*<BarChartReport/>*/}
          <View style={{ flex: 1 }}>
            <Image source={Constants.Images.customer.report}
              style={{
                height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40,
                width: Constants.BaseStyle.DEVICE_WIDTH
              }}
              resizeMode={'contain'} />
          </View>

          <Modal animationType={"fade"} transparent={true} visible={this.props.state.placeModalVisibility} onRequestClose={() => {
            alert("test")
            this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false })
          }}>
            <SearchPlace navigation={navigate} dispatch={this.props.navigation} />
          </Modal>
          <Modal animationType={"fade"} transparent={true} visible={this.props.state.placeModalVisibility_hourly} onRequestClose={() => { this.props.dispatch({ type: 'PLACE_FINDER_MODAL_HOURLY', visibility: false }) }}>
            <SearchPlace_Hourly navigation={navigate} dispatch={this.props.navigation} />
          </Modal>
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
  horizontalLine: {
    height: 2,
    backgroundColor: '#B1B1B1',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
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
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colIndexViewWhite: {
    backgroundColor: Constants.Colors.White,
  },
  colIndexViewBlack: {
    backgroundColor: "#184082",
  },
  colIndexLabelWhite: {
    fontSize: Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: "#4C4C4C",
    textAlign: "center",
  },
  colIndexLabelBlack: {
    fontSize: Constants.CustomerFonts.TopHeader.fontSize,
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    color: Constants.Colors.White,
    textAlign: "center",
  },
  cardView: {
    backgroundColor: Constants.Colors.WhiteSmoke,
    borderRadius: 15,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1.5 / 100,
    justifyContent: 'center',
  },
  inviteFriendIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  inviteFriendHeader: {
    fontSize: Constants.CustomerFonts.bold.fontSize,
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
    textAlign: 'left',
    color: '#081933',
  },
  inviteFriendText: {
    color: '#969297',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    textAlign: 'left',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  ReportStyle: {
    color: '#414141',
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingVertical: Constants.BaseStyle.PADDING * 0.4,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  MoreReportStyle: {
    color: Constants.Colors.LightBlue,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    textDecorationLine: 'underline',
  },
});
export default connect(state => ({ state: state.CustomerReducer }))(CustomerHome);
