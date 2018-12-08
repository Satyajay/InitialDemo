/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { Container, Header, Tab, Tabs, ScrollableTab, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Card, Button, Icon, Title, Item, Input } from 'native-base'
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { BoxShadow } from 'react-native-shadow';
import Carousel from 'react-native-snap-carousel';
import Pending from './pending';
import Ongoing from './ongoing';
import Scheduled from './scheduled';
import Delivered from './delivered';
import Cancelled from './cancelled';
import Drafts from './drafts';
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { bindActionCreators } from "redux";

class CustomerOrders extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      email: "",
      id: ""
    }
  }

  componentDidMount = () => {
    // AsyncStorage.getItem("email").then((value) => {
    //   this.setState({ email: value })
    // })
    // AsyncStorage.getItem("id").then((value) => {
    //   this.setState({ userId: value })
    // })
  }


  tabIndex(i) {
    //console.log('tabIndex is ====', i);
    if (i == 0) {
      console.log('id++++++++++++++' + this.state.email)
      // this.props.UserActions.Pending_List({
      //   status: 'Available',
      //   max: 6217708099,
      //   min: 0,
      //   page: 1,
      //   count: 1,
      //   datemin: 0,
      //   datemax: 1538223074000220000011,
      //   customerId: '5bda93c59f19ad5e722d8ca3',
      // });
      // console.log('Pending list is++' + this.props.PendingInfo)
    }
    // if (i == 1) {
    //   console.log('Schedule')
    //   this.props.UserActions.Schedule_List({
    //     status: 'Schedule',
    //     max: 6217708099,
    //     min: 0,
    //     page: 1,
    //     count: 1,
    //     datemin: 0,
    //     datemax: 1538223074000220000011,
    //     customerId: '5bda93c59f19ad5e722d8ca3',
    //   });
    //   console.log('schedule data+++', this.props.ScheduleInfo)
    // }
    // if (i == 2) {
    //   console.log('Ongoing')
    //   this.props.UserActions.Ongoing_List({
    //     status: 'Ongoing',
    //     max: 6217708099,
    //     min: 0,
    //     page: 1,
    //     count: 1,
    //     datemin: 0,
    //     datemax: 1538223074000220000011,
    //     customerId: '5bda93c59f19ad5e722d8ca3',
    //   });
    //   console.log('ongoing data+++', this.props.ongoingInfo)
    // } if (i == 3) {
    //   console.log('Delivered')
    //   this.props.UserActions.Delivered_List({
    //     status: 'Delivered',
    //     max: 6217708099,
    //     min: 0,
    //     page: 1,
    //     count: 1,
    //     datemin: 0,
    //     datemax: 1538223074000220000011,
    //     customerId: '5bda93c59f19ad5e722d8ca3',
    //   });
    //   console.log('delivered data+++', this.props.deliveredInfo)
    // } if (i == 4) {
    //   console.log('Cancel')
    //   this.props.UserActions.Canceled_List({
    //     status: 'Failed',
    //     max: 6217708099,
    //     min: 0,
    //     page: 1,
    //     count: 1,
    //     datemin: 0,
    //     datemax: 1538223074000220000011,
    //     customerId: '5bda93c59f19ad5e722d8ca3',
    //   });
    // } if (i == 5) {
    //   console.log('Draft')
    //   this.props.UserActions.drafts_Lists({ customerId: '5bda93c59f19ad5e722d8ca3' });
    // }
  }
  render() {
    return (
      <Container>
        <HeaderBackground></HeaderBackground>
        <Tabs onChangeTab={({ i, ref, from }) => this.tabIndex(i)} renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent' }}>
          <Tab heading="Pending" tabStyle={{ backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} textStyle={{ color: '#52C8E4' }} activeTabStyle={{ backgroundColor: '#52C8E4', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} activeTextStyle={{ color: '#fff' }} >
            <Pending />
          </Tab>
          <Tab heading="Scheduled" tabStyle={{ backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} textStyle={{ color: '#52C8E4' }} activeTabStyle={{ backgroundColor: '#52C8E4', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} activeTextStyle={{ color: '#fff' }}>
            <Scheduled />
          </Tab>
          <Tab heading="Ongoing" tabStyle={{ backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} textStyle={{ color: '#52C8E4' }} activeTabStyle={{ backgroundColor: '#52C8E4', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} activeTextStyle={{ color: '#fff' }}>
            <Ongoing />
          </Tab>
          <Tab heading="Delivered" tabStyle={{ backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} textStyle={{ color: '#52C8E4' }} activeTabStyle={{ backgroundColor: '#52C8E4', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} activeTextStyle={{ color: '#fff' }}>
            <Delivered />
          </Tab>
          <Tab heading="Canceled" tabStyle={{ backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} textStyle={{ color: '#52C8E4' }} activeTabStyle={{ backgroundColor: '#52C8E4', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} activeTextStyle={{ color: '#fff' }}>
            <Cancelled />
          </Tab>
          <Tab heading="Drafts" tabStyle={{ backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} textStyle={{ color: '#52C8E4' }} activeTabStyle={{ backgroundColor: '#52C8E4', borderWidth: 1.5, borderColor: '#C9C9C9', borderStyle: 'solid' }} activeTextStyle={{ color: '#fff' }}>
            <Drafts />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken,
  ScheduleInfo: state.user.scheduleData,
  draftsInfo: state.user.draftsData
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

const styles = StyleSheet.create({
  border: {
    height: 30
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CustomerOrders));