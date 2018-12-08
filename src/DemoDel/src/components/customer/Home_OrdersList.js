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

import Background from '../../components/common/Background';
import Constants from "../../constants";

export default class Home_OrdersList extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      next:1,
      prev:0,
      OrdersList : [{id:0,orderNo:'#9786',status:'Ongoing',amount:'$250',time:'3:50 PM',statusFlag:1,date:'Jun 28, 2018'},
                   {id:1,orderNo:'#9787',status:'Delivered',amount:'$250',time:'3:50 PM',statusFlag:2,date:'Jun 28, 2018'},
                   {id:2,orderNo:'#9734',status:'Delivered',amount:'$200',time:'3:00 PM',statusFlag:2,date:'Jun 28, 2018'},
                   {id:3,orderNo:'#9722',status:'Delivered',amount:'$350',time:'1:10 PM',statusFlag:2,date:'Jun 28, 2018'},
                   {id:4,orderNo:'#9767',status:'Ongoing',amount:'$150',time:'6:40 PM',statusFlag:1,date:'Jun 28, 2018'},
                   {id:5,orderNo:'#9755',status:'Ongoing',amount:'$100',time:'2:00 PM',statusFlag:1,date:'Jun 28, 2018'},
                   {id:6,orderNo:'#9784',status:'Ongoing',amount:'$150',time:'4:30 PM',statusFlag:1,date:'Jun 28, 2018'},
                   {id:7,orderNo:'#9726',status:'Ongoing',amount:'$250',time:'3:30 PM',statusFlag:1,date:'Jun 28, 2018'},
                  ],

    }
  }
  setStatusColor(value)
  {
    if(value==1)
      return [styles.itemStatus1,{marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}];
    else {
      return [styles.itemStatus2,{marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}];
    }
  }


  DisplayOrdersList(item){
    return(
      <View key={1} style={[styles.flexRow]}>
        <View key={2} style={{flex:1,justifyContent:'center',alignItems:'center',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}}>
            {/*<View key={10} style={[styles.flexRow,{flex:1,justifyContent:'center'}]}>
              <Text key={11} style={[styles.itemStatus1,{color:'#969297'}]}>{item.date}</Text>
            </View>*/}
            <View key={3} style={[styles.flexRow,{alignItems:'center'}]}>
              <Text key={4} style={this.setStatusColor(item.statusFlag)}>{item.status}</Text>
              <Text key={5} style={[styles.itemOrder,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}>{item.orderNo}</Text>
            </View>
            <View key={5} style={[styles.flexRow,{alignItems:'center'}]}>
              <Text key={11} style={[styles.itemStatus1,{color:'#969297',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}]}>{item.date}</Text>
              <Text key={7} style={[styles.itemTime,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 1}]}>{item.time}</Text>
              {/*<Text key={8} style={[styles.itemAmount,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}]}>{item.amount}</Text>*/}
            </View>
        </View>
        <View key={9} style={[styles.verticalLine,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}]}/>
      </View>
    	);
  }

  Previous()
  {
    var index1 = this.state.prev;
    if(index1>0)
      index1--;
      this.setState({prev:index1,next:index1+1});
  }
  Next()
  {
    var index1 = this.state.next;
    if(index1<this.state.OrdersList.length-1)
      index1++;
      this.setState({next:index1,prev:index1-1});
  }

  render() {


    return (
      <View>
        <Text style={[styles.orderText]}>{'Orders'}</Text>
          <View style={[styles.flexRow,{backgroundColor:'#ffffff',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,}]}>
          <TouchableOpacity onPress={() => this.Previous()}>
            <Image  source={Constants.Images.customer.prev} style={[styles.arrowIcons,{flex : 0.2,marginTop: Constants.BaseStyle.DEVICE_WIDTH*8/100}]} resizeMode={'contain'}/>
          </TouchableOpacity >

          <FlatList data={this.state.OrdersList} renderItem={({item})=>this.DisplayOrdersList(item)} horizontal={true}/>

            <TouchableOpacity onPress={() => this.Next()}>
            <Image source={Constants.Images.customer.next} style={[styles.arrowIconsNext,{flex : 0.2,marginTop: Constants.BaseStyle.DEVICE_WIDTH*8/100}]} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow:{
		flexDirection: 'row',
	},
  orderText:{
    color:'#081933',
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    fontSize:Constants.CustomerFonts.BigSize.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
  },
  itemStatus1:{
    textAlign:'left',
    color:Constants.Colors.Orange,
    flex:0.7,
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  itemStatus2:{
    textAlign:'left',
    color:'#306AB3',
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    flex:0.7,
  },
  itemOrder:{
    textAlign:'center',
  	color: '#636464',
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    flex:0.4,
  },
  itemTime:{
    textAlign:'left',
    color: "#636464",
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    flex:0.4
  },
  itemAmount:{
    textAlign:'center',
    color: '#636464',
    fontSize:Constants.CustomerFonts.small.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    flex:0.4
  },
  verticalLine:{
    width:1,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  arrowIcons:{
    marginBottom: 10,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    //tintColor:Constants.Colors.BlurGrey,
  },
  arrowIconsNext:{
    marginBottom: 10,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    //tintColor:Constants.Colors.BlurGrey,
    //transform: [{rotate: '180deg'}],
  },

});
