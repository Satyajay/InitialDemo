/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,Switch,
  TouchableOpacity
} from "react-native";
//import { Switch } from 'react-native-switch';
import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import NotificationList from "../../../components/driver/NotificationList";
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import { connect } from 'react-redux';

class Notification extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      availabilityStatus:props.driverAvailabilityStatus
    };
  }

  componentWillReceiveProps(nextProps){
    //console.log('nextProps ******* ',nextProps)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus
    })
  }

  render() {
    const titleConfig = {
      title: " NOTIFICATIONS",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          rightButton={
            <View style={styles.rightButtonNav}>
              <TouchableOpacity onPress={()=>navigate('Settings')}>
                <Image
                  source={Constants.Images.user.setting}
                  style={styles.navIcons} resizeMode={'contain'}/>
              </TouchableOpacity>
              <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
                <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
              </View>
            </View>
          }
          leftButton={<TouchableOpacity onPress={()=>navigate('DrawerOpen')}><Image source={Constants.Images.user.user} style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} resizeMode={'contain'}/></TouchableOpacity>}
        />
        <NotificationList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.WhiteBlur
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  rightButtonNav: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  }
});

const mapStateToProps = state => ({
  driverAvailabilityStatus: state.user.driverAvailabilityStatus
});

export default connect(mapStateToProps, null)(Notification);