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
  TextInput
} from 'react-native';

import { connect } from 'react-redux';


import Constants from "../../constants";

import MapView from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {BoxShadow} from 'react-native-shadow';
import moment from 'moment';
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = 1;//LATITUDE_DELTA * ASPECT_RATIO;
var navigate=null;
class SelectDriverMapView extends Component<{}> {
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
    }
    this.initialPosition = this.state.initialPosition;
  }

  watchID: ?number = null;

  componentDidMount()
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
  }

  onRegionChange(region) {
          this.setState({
              initialPosition: region
          });
      }


  render() {
    let {height, controlVisible} = this.props;
    navigate  = this.props.navigation;
    return (
      <View style={{flex:1}}>
        <View style={[styles.rootContainer,{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * height}]}>
          <MapView
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * height,zIndex:0}}
            zoomEnabled={true}
            initialRegion={this.props.state.initialPosition}
            region={this.props.state.initialPosition}
            showsUserLocation={true}
            followsUserLocation={true}
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

            </MapView>
            {(controlVisible== true) ?
            <View style={[styles.viewStyle]}>
              <View style={[styles.flexRow,{alignItems:'center'}]}>
                <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH/100*80,
                                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
                                        color:"#000",
                                        border:3,
                                        radius:5,
                                        opacity:0.1,
                                        x:0,
                                        y:2,
                                        style:{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
                                          marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,}
                                    }}>
                  <View style={[styles.searchContainer]}>
                      <TextInput
                        placeholder={'Search by name'}
                        style={[styles.txtInputSearch]}
                        underlineColorAndroid="transparent"
                        />
                    <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'}/>
                  </View>
                </BoxShadow>
                <Image source={Constants.Images.customer.filter} style={[styles.searchContentIcon,{flex:1}]} resizeMode={'contain'}/>
              </View>
            </View>
            :
            null
            }

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

  flexRow:{
		flexDirection: 'row',
	},
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 64,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,//34,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //opacity: 0.87,
  },
  viewStyle:{
    backgroundColor:Constants.Colors.WhiteBlur,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 14,
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 60,
    alignItems:'center',
    justifyContent:'center',
  },
  searchContainer:{
    backgroundColor:Constants.Colors.WhiteSmoke,
    opacity:0.8,
    justifyContent:'flex-start',
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 80,
    flexDirection:'row',
    alignItems:'center',
    padding:5,
    borderRadius:5,
    //paddingLeft: 10,
    //paddingRight:10,
    //marginLeft:15,
    //marginRight:15,
    //marginTop:10,
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,

  },
  searchContentIcon: {
    justifyContent:'flex-end',
    //flex:0.3,
    //tintColor:'#898988',
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
  },
  txtInputSearch: {
    //backgroundColor:'#fff',
    color: '#5D5D5D',
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    //paddingRight:10,
    //paddingTop:3,
    //paddingBottom:3,
    flex:1,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
  },


});

export default connect(state => ({state: state.CustomerReducer}))(SelectDriverMapView);
