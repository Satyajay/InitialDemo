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
import {BoxShadow} from 'react-native-shadow';
 var navigate=null;
class HourlyServiceHeaderMenu extends Component<{}> {

  onClickLocation()
  {
    //if(this.props.state.HomeTabsIndex>0)
    //{
    //let { dispatch } = this.props.navigation;

      this.props.dispatch({type:'SET_HOURLYSERVICE_TABINDEX',index:1});
       navigate('HourlyGetEstimate');
    //}
  }
  onClickTime()
  {
    //if(this.props.state.HomeTabsIndex>0)
    //{
    //let { dispatch } = this.props.navigation;

      this.props.dispatch({type:'SET_HOURLYSERVICE_TABINDEX',index:0});
       //navigate('CustomerHome');
    //}
  }

  onClickPayment()
  {
    //if(this.props.state.HomeTabsIndex>0)
    //{
    //let { dispatch } = this.props.navigation;
      this.props.dispatch({type:'SET_HOURLYSERVICE_TABINDEX',index:2});
       navigate('Hourly_PaymentProceed');
    //}
  }

  onClickSelectDriver()
  {
    //if(this.props.state.HomeTabsIndex>0)
    //{
    //let { dispatch } = this.props.navigation;
      this.props.dispatch({type:'SET_HOURLYSERVICE_TABINDEX',index:3});
       //navigate('Home_SelectDriver');
    //}
  }

  render() {
    navigate = this.props.navigation;
    const shadowOpt = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5.1,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:0,
                        y:2,
                        style:{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1}
                      };
        return(
          <BoxShadow setting={shadowOpt}>
            <View style={[styles.container,{zIndex:1}]}>
              <View style={[styles.flexRow/*,{left:(Constants.BaseStyle.DEVICE_WIDTH/100 * -2)}*/]}>
                <TouchableOpacity activeOpacity={0.3} underlayColor={Constants.Colors.WhiteSmoke} onPress={() => this.onClickTime()}>
                  <View style={{alignItems:'center'}}>
                    <ImageBackground source={this.props.state.HourlyServiceTabHeaderImages[0].displayimg}  style={[styles.backgroundImage,{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 25}]}>
                        <Text style={[styles.text,{textAlign:'center',color: this.props.state.HourlyServiceTabHeaderImages[0].color,/*marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100 * 1.5)*/}]}>
                          {'Time'}
                        </Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <View style={styles.overlay}>
                  <TouchableOpacity activeOpacity={0.3} underlayColor={Constants.Colors.WhiteSmoke} onPress={() => this.onClickLocation()}>
                    <ImageBackground source={this.props.state.HourlyServiceTabHeaderImages[1].displayimg}  style={[styles.backgroundImage,{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 29}]}>
                      <Text style={[styles.text,{color: this.props.state.HourlyServiceTabHeaderImages[1].color}]}>{'Location'}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View >
                <View style={[styles.overlay,{left:(Constants.BaseStyle.DEVICE_WIDTH/100 * -8)}]}>
                  <TouchableOpacity activeOpacity={0.3} underlayColor={Constants.Colors.WhiteSmoke} onPress={() => this.onClickPayment()}>
                      <ImageBackground source={this.props.state.HourlyServiceTabHeaderImages[2].displayimg}  style={[styles.backgroundImage,{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 29}]}>
                        <Text style={[styles.text,{color: this.props.state.HourlyServiceTabHeaderImages[2].color}]}>{'Payment'}</Text>
                        </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={[styles.overlay,{left:(Constants.BaseStyle.DEVICE_WIDTH/100 * -12)}]}>
                    <TouchableOpacity activeOpacity={0.3} underlayColor={Constants.Colors.WhiteSmoke} onPress={() => this.onClickSelectDriver()}>
                      <ImageBackground source={this.props.state.HourlyServiceTabHeaderImages[3].displayimg}  style={[styles.backgroundImage,{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 30}]}>
                          <Text style={[styles.text,{color: this.props.state.HourlyServiceTabHeaderImages[3].color,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100 * 3.5)}]}>{'Select Driver'}</Text>
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
    width : Constants.BaseStyle.DEVICE_WIDTH,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    backgroundColor:'#FFFFFF',
  },
  flexRow:{
		flexDirection: 'row',
	},
  text:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    color:Constants.Colors.LightBlue,
  },
  backgroundImage: {
    //flex: 1,
    //width : Constants.BaseStyle.DEVICE_WIDTH/100 * 23,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4.9,
    //resizeMode:'contain',
    //padding:4,
    // flexDirection: 'column',
    // backgroundColor:'transparent',
     justifyContent: 'center',
     alignItems:'center',
},
overlay: {
  //position:"relative",
    left: (Constants.BaseStyle.DEVICE_WIDTH/100 * -4),//-12,
  }
});
export default connect(state => ({state: state.CustomerReducer}))(HourlyServiceHeaderMenu);
