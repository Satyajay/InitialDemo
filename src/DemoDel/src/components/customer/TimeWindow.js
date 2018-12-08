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
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

//import Background from '../../components/common/Background';
import Constants from "../../constants";

class TimeWindow extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      ProgressWidth : 5,
      ProgressData : 0,
      OutputText :'Time Window',
    }

  }



  render() {
    let {
      OutputText,ProgressWidth,startTime,startAMPM,endTime,endAMPM,DeliveryDate,timeFrame
    } = this.props;
    return (
      <View style={[styles.completePercent]}>
        <View style={[styles.flexRow,{marginBottom:4,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
          <TouchableOpacity onPress={() => this.props.onChangeTime()} style={{flex:1,justifyContent:'flex-start'}}>
            <Text style={[styles.TimeText,{textAlign:'left'}]}>
              {startTime}
              <Text style={[styles.TimeAMPMText]}>
                {' '}{startAMPM}
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onChangeDate()} style={{flex:1,justifyContent:'flex-start'}}>
            <Text style={[styles.TimeText,{textAlign:'center'}]}>{DeliveryDate}</Text>
          </TouchableOpacity>
          <View style={{flex:1,justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
            <Text style={[styles.TimeText,{textAlign:'right',color:'#C3C1C0'}]}>
              {endTime}
              <Text style={[styles.TimeAMPMText]}>
                {' '}{endAMPM}
              </Text>
            </Text>
          </View>
        </View>
        <View style={[styles.flexRow,{alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
          <View style={[styles.progressCircle]}/>
          <View style={styles.progressLineWrap}>
              <View style={[styles.progressLine,{width:ProgressWidth-((Constants.BaseStyle.DEVICE_WIDTH/100)*5),marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}/>
          </View>
        </View>
        <View style={[styles.progressCircle,{left:ProgressWidth+6,bottom:6}]}/>

          <View style={[styles.flexRow,{bottom:5,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
            <TouchableOpacity onPress={() => this.props.onChangeTime()} style={{flex:1,justifyContent:'flex-start'}}>
              <Text style={{textAlign:'left'}}>{'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onChangeDate()} style={{flex:2,justifyContent:'center'}}>
              <Text style={[styles.progressText,{textAlign:'center'}]}>{timeFrame}{' '}{OutputText}</Text>
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'flex-end'}}>
              <Text style={{textAlign:'right'}}>{'End'}</Text>
            </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  flexRow:{
		flexDirection: 'row',
	},
  completePercent:{
    //marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    backgroundColor:'#ffffff'
		//alignItems: 'center',
	},
	progressLineWrap:{
		width : (Constants.BaseStyle.DEVICE_WIDTH/100)*90-(Constants.BaseStyle.DEVICE_WIDTH/100)*5,//Constants.BaseStyle.DEVICE_WIDTH-30,
		backgroundColor:'#C3C1C0',
		height: 2,
    borderRadius:5,
    //overflow:'hidden'
    //height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1,
	},
	progressLine:{
    width : (Constants.BaseStyle.DEVICE_WIDTH/100)*90,//Constants.BaseStyle.DEVICE_WIDTH-30,
		backgroundColor:'#53C8E5',
		height: 2,
    //height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1,
    borderRadius:5
	},
  progressCircle:{
    width:6,
    height:6,
    borderRadius: 3,
    backgroundColor: '#16477C',
    borderWidth: 1,
    borderColor: '#16477C',
  },
	progressText:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
		color:'#C3C1C0',
	},
  TimeText:{
    fontSize:Constants.CustomerFonts.normal.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:'#53C8E5',
	},
  TimeAMPMText:{
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    color:'#5D5D5D',
	},
});
export default connect(state => ({state: state.CustomerReducer}))(TimeWindow);
