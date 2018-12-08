import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


import Constants from '../../constants';
var navigate = null;
var goBack = null;
export default class HeaderBackground extends Component<{}> {
  render() {
    navigate = this.props.navigation;
    //goBack= this.props.goBack;
    return (
      <LinearGradient colors={['#396CB3', '#396CB3']} style={styles.navigationBarcontainer}>
        <View style={styles.navigationBar}>
          <TouchableOpacity onPress={() => navigate('DrawerOpen')
          }>
            <Image source={Constants.Images.customer.user}
              style={[styles.navIcons, { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }]} resizeMode={'contain'} />
          </TouchableOpacity>
          {(goBack) ?
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={Constants.Images.customer.goback}
                style={[styles.backIcons, { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }]} resizeMode={'contain'} />
            </TouchableOpacity>
            :
            null
          }
          <View style={styles.navBarCenter}>
            <TouchableOpacity activeOpacity={0.9} style={[{ flexDirection: 'row' }]}
              onPress={() =>
                console.log("it's here")
              }>
              <Image
                source={Constants.Images.customer.itshere}
                style={styles.mapIcon} resizeMode={'contain'} />
              {/* <Text style={styles.mapText}>it's here</Text> */}
            </TouchableOpacity>
          </View>

          <View style={[styles.navBarRight]}>
            <TouchableOpacity style={[{ flexDirection: 'row' }]}
              onPress={() =>{
               navigate("annotationMap1")
             //   navigate('Home_SelectDriver');
              }
              }>
              {/* <Text>Track Order</Text> */}
              <Image
                source={Constants.Images.customer.setting}
                style={styles.settingIcon} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Constants.BaseStyle.DEVICE_WIDTH
  },
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
  },
  navigationBar: {
    backgroundColor: 'transparent',//Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 0.5,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 20,
  },
  navBarCenter: {
    flex: 1,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 0,
  },
  mapText: {
    fontSize: 20,
    color: '#F9F9FB',
    marginTop: 3.5,
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
  backIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  mapIcon: {
    height: 100,
    width: 100,
    marginTop: 3.5,
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 22
  },
});
