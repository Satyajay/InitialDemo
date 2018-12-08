import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Constants from '../../constants';
import { BoxShadow } from 'react-native-shadow';

import { StackActions, NavigationActions } from 'react-navigation';


var navigate = null;
class HeaderMenu extends Component<{}> {

  onClickLocation() {
    //if(this.props.state.HomeTabsIndex>0)
    //{
    //let { dispatch } = this.props.navigation;

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'CustomerHomeNewx' })],
    });
    this.props.dispatch(resetAction);
//    this.props.dispatch({ type: 'SET_TABINDEX', index: 0 });
    //navigate('CustomerHome');
    //}
  }
  onClickService() {
   
if(this.props.catId>2)
{const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home_Food' })],
});
this.props.dispatch(resetAction);   
}

    //}
  }

  onClickPayment() {
   
    if(this.props.catId>3)
    {const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home_PaymentProceed' })],
    });
    this.props.dispatch(resetAction);   
    }

  //  this.props.dispatch({ type: 'SET_TABINDEX', index: 2 });
   // navigate('Home_PaymentProceed');
    //}
  }

  onClickSelectDriver() {
    //if(this.props.state.HomeTabsIndex>0)
    //{
    //let { dispatch } = this.props.navigation;
    this.props.dispatch({ type: 'SET_TABINDEX', index: 3 });
    //navigate('Home_SelectDriver');
    //}
  }

  render() {
    navigate = this.props.navigation;
    const shadowOpt = {
      width: Constants.BaseStyle.DEVICE_WIDTH,
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5.1,
      color: "#fff",
      border: 3,
      radius: 4,
      opacity: 0.2,
      x: 0,
      y: 2,
      style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1 }
    };
    return (
      <BoxShadow setting={shadowOpt}>
        <View style={styles.container}>
          <View style={[styles.flexRow/*,{left:(Constants.BaseStyle.DEVICE_WIDTH/100 * -5.6)}*/]}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.3} underlayColor={"#fff"} onPress={() => this.onClickLocation()}>
                <ImageBackground source={this.props.state.TabHeaderImages[0].displayimg} style={[styles.backgroundImage, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 24 }]}>
                  <Text style={[styles.text, { color: this.props.state.TabHeaderImages[0].color, marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5) }]}>{'Location'}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.overlay}>
              <TouchableOpacity activeOpacity={0.3} underlayColor={"#fff"} onPress={() => this.onClickService()}>
                <ImageBackground source={this.props.state.TabHeaderImages[1].displayimg} style={[styles.backgroundImage, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 33 }]}>
                  <Text style={[styles.text, { color: this.props.state.TabHeaderImages[1].color, marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100 * 3) }]}>{'Services & Items'}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View >
            <View style={[styles.overlay, { left: (Constants.BaseStyle.DEVICE_WIDTH / 100 * -8) }]}>
              <TouchableOpacity activeOpacity={0.3} underlayColor={"#fff"} onPress={() => this.onClickPayment()}>
                <ImageBackground source={this.props.state.TabHeaderImages[2].displayimg} style={[styles.backgroundImage, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 27.5 }]}>
                  <Text style={[styles.text, { color: this.props.state.TabHeaderImages[2].color }]}>{'Payment'}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={[styles.overlay, { left: (Constants.BaseStyle.DEVICE_WIDTH / 100 * -11.5) }]}>
              <TouchableOpacity activeOpacity={0.3} underlayColor={"#fff"} onPress={() => this.onClickSelectDriver()}>
                <ImageBackground source={this.props.state.TabHeaderImages[3].displayimg} style={[styles.backgroundImage, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 28 }]}>
                  <Text style={[styles.text, { color: this.props.state.TabHeaderImages[3].color, marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100 * 3.5) }]}>{'Select Driver'}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BoxShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    backgroundColor: '#FFFFFF'
  },
  flexRow: {
    flexDirection: 'row',
  },
  text: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#4C6899',
    textAlign: 'center'
  },
  backgroundImage: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    left: (Constants.BaseStyle.DEVICE_WIDTH / 100 * -4),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default connect(state => ({ state: state.CustomerReducer }))(HeaderMenu);
