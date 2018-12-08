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
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";
import HourlyServiceHeaderMenu from '../../../components/customer/HourlyServiceHeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import {BoxShadow} from 'react-native-shadow';

import { ToastActionsCreators } from 'react-native-redux-toast';

class Hourly_PaymentProceed extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      WalletBorderColor:'transparent',
      PaypalBorderColor:'transparent',
      ActivePayBackColor:'#FFFFFF',
      ActivePayTextColor:'#C3C1C0',
      ActiveButton:false,
    }

  }

  onClickWallet()
  {
    this.setState({WalletBorderColor:'#53C8E5',  PaypalBorderColor:'transparent',
      ActivePayBackColor:'#53C8E5',ActivePayTextColor:'#FFFFFF', ActiveButton:true});
  }

  onClickPaypal()
  {
    this.setState({WalletBorderColor:'transparent',  PaypalBorderColor:'#53C8E5',
      ActivePayBackColor:'#53C8E5',ActivePayTextColor:'#FFFFFF', ActiveButton:true});
  }

  onClickPay()
  {


    let { navigate } = this.props.navigation;
    if(this.state.ActiveButton)
    {
       navigate('Home_SelectDriver');
    }
  }


  render() {
    const { navigate, goBack } = this.props.navigation;


    const shadowPayment = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8.2,
                        color:"#000",
                        border:3,
                        radius:5,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
                          marginTop: Constants.BaseStyle.DEVICE_WIDTH*1/100}
                      };

    const shadowOtherService = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
                      };

    const shadowPayVisa = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 23.2,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}
                      };

    const shadowPayWallet = {width:Constants.BaseStyle.DEVICE_WIDTH,
                        height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 11.2,
                        color:"#000",
                        border:3,
                        radius:4,
                        opacity:0.2,
                        x:2,
                        y:2,
                        style:{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}
                      };

    return (
      <View style={{flex:1,backgroundColor:'#f4f5f7'}}>
        <HeaderBackground navigation={navigate} goBack={goBack}/>
        {/* <Text onPress={()=>goBack()}> GO BACK GO BACK {Uniquedatataa}</Text> */}
 
        <HourlyServiceHeaderMenu navigation={navigate}/>

        <BoxShadow setting={shadowPayment}>
          <View style={[styles.flexDirection,{backgroundColor:'#ffffff',justifyContent:'center',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8}]}>
              <Text style={[styles.textStyleTop,{textAlign:'left',color:'#C3C1C0',fontSize:Constants.CustomerFonts.normal.fontSize,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
              {'Proceed to Pay '}
                <Text style={[{fontFamily:Constants.CustomerFonts.bold.fontFamily,fontSize:Constants.CustomerFonts.BigSize.fontSize, color: Constants.Colors.Black}]}>
                {'$'}{this.props.state.InvoiceData.totalCharge}
                </Text>
              </Text>
          </View>
        </BoxShadow>

        <ScrollView style={{flex:1}}>
          <BoxShadow setting={shadowPayVisa}>
            <View style={{backgroundColor:'#ffffff',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 23}}>
              <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                {/*<View style={{flex:0.5,justifyContent:'flex-start'}}>
                  <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                    {'Credit & Debit Cards'}
                  </Text>
                </View>*/}
                <TouchableOpacity style={{flex:1,justifyContent:'flex-end'}}>
                  <Text style={[styles.textStyle,{color:'#53C8E5',textAlign:'right',textDecorationLine:'underline',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                    {'New Card'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                <View style={[styles.flexRow,{flex:0.7,justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <Image source={Constants.Images.customer.visa} style={[styles.PayIcon]} resizeMode={'contain'}/>
                    <Text style={[styles.textStyle,{textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}>
                      {'4280-XXXXXXXX-4578'}
                    </Text>
                </View>
                <View style={[styles.flexRow,{flex:0.3,alignItems:'center',justifyContent:'center',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder='CVV'
                    multiline={false}
                    style={styles.inputStyle}
                  />
                </View>
              </View>
              <View style={[styles.horizontalLine]}/>
              <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                <View style={[styles.flexRow,{flex:0.7,justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <Image source={Constants.Images.customer.mastercard} style={[styles.PayIcon]} resizeMode={'contain'}/>
                    <Text style={[styles.textStyle,{textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}>
                      {'9658-XXXXXXXX-4578'}
                    </Text>
                </View>
                <View style={[styles.flexRow,{flex:0.3,alignItems:'center',justifyContent:'center',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder='CVV'
                    multiline={false}
                    style={styles.inputStyle}
                  />
                </View>
              </View>

            </View>
          </BoxShadow>

          <BoxShadow setting={shadowPayWallet}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClickWallet()} style={{backgroundColor:'#ffffff',borderWidth:2,borderColor:this.state.WalletBorderColor,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 11}}>
              {/*<View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                <View style={{flex:0.5,justifyContent:'flex-start'}}>
                  <Text style={[styles.textStyle,{textAlign:'left',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                    {'Pay By Wallet'}
                  </Text>
                </View>
              </View>*/}
              <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100}]}>
                <View style={[styles.flexRow,{flex:0.7,justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <Image source={Constants.Images.customer.wallet} style={[styles.PayIcon]} resizeMode={'contain'}/>
                  <View>
                    <Text style={[styles.textStyleSmall,{textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                      {'$250'}
                    </Text>
                    <Text style={[styles.textStyleSmall,{color:'#C3C1C0',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>
                      {'Pay $60 by your DelGate wallet'}
                    </Text>
                  </View>
                </View>

              </View>

            </TouchableOpacity>
          </BoxShadow>

          <BoxShadow setting={shadowPayWallet}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.onClickPaypal()} style={{backgroundColor:'#ffffff',borderWidth:2,borderColor:this.state.PaypalBorderColor,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 11}}>

              <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                <View style={[styles.flexRow,{flex:0.7,justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                  <Image source={Constants.Images.customer.paypal} style={[styles.PaypalIcon]} resizeMode={'contain'}/>
                  <View>
                    <Image source={Constants.Images.customer.paypalTitle} style={[styles.PayTitleIcon,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]} resizeMode={'contain'}/>

                  </View>
                </View>

              </View>

            </TouchableOpacity>
          </BoxShadow>

        </ScrollView>

        <ShadowButton
          onPress={() => this.onClickPay()}
          text={'PAY'}
          bottom={Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}
          style={[styles.ButtonStyle,{backgroundColor: this.state.ActivePayBackColor,borderColor: this.state.ActivePayBackColor,}]}
          textStyle={[styles.ButtonTextStyle,{color:this.state.ActivePayTextColor,}]}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow:{
		flexDirection: 'row',
	},
  PayIcon:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 10,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  PaypalIcon:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 12,
    //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  PayTitleIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 9,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,
  },
  horizontalLine:{
    height:2,
  	backgroundColor: '#EFEDED',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
  },
  textStyleTop:{
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    textAlign:'center',
  	color:'#081933',
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    textAlign:'center',
  	color:'#081933',
  },
  textStyleSmall:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    textAlign:'center',
  	color:'#081933',
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //marginBottom:10,
    marginTop:0,//10,
    marginLeft:0,//10,
    marginRight:0,//10,
    borderRadius:30,
    backgroundColor: '#53C8E5',
    borderColor: "#53C8E5",
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.White,
    textAlign:'center',
  },
  inputStyle:{
		flex:1,
		borderWidth: 0.5,
		borderColor:'#B1B1B1',
		paddingTop:2,
		paddingBottom:2,
		paddingLeft:10,
		paddingRight: 10,
    textAlign:'center'
	},

});
export default connect(state => ({state: state.CustomerReducer}))(Hourly_PaymentProceed);
