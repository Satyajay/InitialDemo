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
  KeyboardAvoidingView,
  Button,
  ScrollView,
  Picker,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

//import Picker from 'react-native-wheel-picker'
// var PickerItem = Picker.Item;

import Constants from "../../constants";
import CheckBoxLabel from '../../components/customer/CheckBoxLabel';
import { ToastActionsCreators } from 'react-native-redux-toast';

import {BoxShadow} from 'react-native-shadow';
var navigate=null;
var itemLength,itemWeight,itemheight,itemWidth;
class AddCourierItems extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      itemname:'',
      height:3,
      height2:5,
      heightUnit:1,
      width:3,
      width2:5,
      widthUnit:1,
      depth:3,
      depth2:5,
      depthUnit:1,
      weight:15,
      weight2:5,
      weightUnit:1,
      skid:false,
      itemNoList : ['0','1','2','3','4','5','6','7','8','9','10',
                    '11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28','29','30',
                    '31','32','33','34','35','36','37','38','39','40',
                    '41','42','43','44','45','46','47','48','49','50'],
      unitList : ['Cms','Inches','Feet'],
      unitWeightList : ['Ounce','Kgs','Pound'],
    }
  }



  validateData=()=>{






return false;




  }

  AddItem()
  {


   // console.log(itemLength);

    


   


    if(this.state.itemname=='')
    {
      //this.props.dispatch(ToastActionsCreators.displayInfo('Please fill all the items property.'));
      this.props.dispatch({type : 'COURIER_MODAL', visibility:false,itemindex:this.props.state.CourierItemIndex});
    }
    else {



      if(!itemLength && !itemWeight && !itemheight && !itemWidth )
    {
    alert("Please enter Dimension");
    return;  
    }


    if(!isNaN(itemLength) && !isNaN(itemWeight) && !isNaN(itemheight) && !isNaN(itemWidth) )
    {
    
    var tempHeight,tempHeight2,tempWidth,tempWidth2,tempLength,tempLength2,tempweight,tempweight2;
    var data=  itemheight.split('.');
    
    
      tempHeight=data[0]==''?0:data[0];
      tempHeight2=!data[1] || data[1]==''?0:data[1];
    
    
    data=  itemWidth.split('.');
    
    
      tempWidth=data[0]==''?0:data[0];
      tempWidth2=!data[1] || data[1]==''?0:data[1];
    
    data=  itemLength.split('.');
    
    
      tempLength=data[0]==''?0:data[0];
      tempLength2=!data[1] || data[1]==''?0:data[1];
    
    data=  itemWeight.split('.');
    
    
    tempweight=data[0]==''?0:data[0];
    tempweight2=data[1]==''?0:data[1];



    //var _height=parseFloat(this.state.height+((this.state.height2>9) ? this.state.height2 * 0.1 : this.state.height2 * 0.01));
    //var _width=parseFloat(this.state.width+((this.state.width2>9) ? this.state.width2 * 0.1 : this.state.width2 * 0.01));
    //var _depth=parseFloat(this.state.depth+((this.state.depth2>9) ? this.state.depth2 * 0.1 : this.state.depth2 * 0.01));
    //var _weight=parseFloat(this.state.weight+((this.state.weight2>9) ? this.state.weight2 * 0.1 : this.state.weight2 * 0.01));
  



    this.props.dispatch({type:'COURIER_ITEMADD',itemname:this.state.itemname,
      height:itemheight, width:itemWidth,depth:itemLength,weight:itemWeight,isSkid:this.state.skid});
    this.props.dispatch({type : 'COURIER_MODAL', visibility:false,itemindex:this.props.state.CourierItemIndex});
    itemheight=itemLength=itemWidth=itemWeight=undefined;

     
    
    }
    else
    {
      alert("Dimensions are not valid..")
      return;
    }



      
   
   
    }

  }
  onClick()
  {
    var id=!this.state.skid;
    this.setState({skid:!this.state.skid});
  }
  setCheckImage(value)
  {
    if(value)
    {
      return Constants.Images.customer.check;
    }
    else
    {
      return Constants.Images.customer.uncheck;
    }
  }

  

  onPickerHeightSelect(index)
  {
    this.setState({height:index});
  }
  onPickerHeight2Select(index)
  {
    this.setState({height2:index});
  }
  onPickerHeightUnitSelect(value,index)
  {
   // alert(value +  ' ' +index);

    this.setState({heightUnit:value});
  }
  onPickerWeightSelect(index)
  {
    this.setState({weight:index});
  }
  onPickerWeight2Select(index)
  {
    this.setState({weight2:index});
  }
  onPickerWeightUnitSelect(value,index)
  {

    this.setState({weightUnit:value});
  }
  onPickerDepthSelect(index)
  {
    this.setState({depth:index});
  }
  onPickerDepth2Select(index)
  {
    this.setState({depth2:index});
  }
  onPickerDepthUnitSelect(value,index )
  {
   this.setState({depthUnit:value});
   // alert(value +  ' ' +index);

  }
  onPickerWidthSelect(index)
  {
    this.setState({width:index});
  }
  onPickerWidth2Select(index)
  {
    this.setState({width2:index});
  }
  onPickerWidthUnitSelect(value,index)
  {
  
    this.setState({widthUnit:value});
   // alert(value +  ' ' +index);

  }

  render() {

    return (
        <View  style={[styles.modalOuter]}>
            <View  style={styles.modalInner}>
              <View style={[styles.flexRow,{backgroundColor:'#EFEDED',borderBottomWidth:1,borderBottomColor:'#969297',justifyContent:'center',alignItems:'center',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,}]}>
                <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                  <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>{'Add Item'}</Text>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity activeOpacity={0.6} style={[styles.btCloseModal]} onPress={() => {this.props.dispatch({type : 'COURIER_MODAL', visibility:false})}}>
                    <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]} resizeMode={'contain'}/>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView>
                <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 90,
                                    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 70.2,
                                    color:"#000",
                                    border:3,
                                    radius:5,
                                    opacity:0.1,
                                    x:0,
                                    y:2,
                                    style:{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
                                      marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1}}}>
                  <View style={{backgroundColor:'#FFFFFF'}}>
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,borderBottomWidth:0.6,borderBottomColor:'#EFEDED'}]}>
                      <Text style={[styles.textStyle,{color:'#5D5D5D',flex:0.3,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                        {this.props.state.LocationForService}{this.props.state.CourierItemIndex+1}{': '}
                      </Text>
                      <View style={[styles.flexRow,{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6}]}>
                        <Image source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'}/>
                        <Text numberOfLines={1} style={[styles.textStyle,{textAlign:'left',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                          {/* {this.props.state.DisplayLocationAddress[this.props.state.CourierItemIndex].address} */}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.flexRow,{justifyContent:'flex-start',alignItems:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='Item Name'
                        multiline={false}
                        style={styles.inputStyle}
                        onChangeText={(itemname) => this.setState({itemname})}
                      />
                    </View>
                    <CheckBoxLabel
                      viewStyle={{justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}
                      imgsource={this.setCheckImage(this.state.skid)}
                      onPress={() => this.onClick()}
                      text={'This Parcel is on Skid'}
                      isInfoImg={false}
                    />
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                      <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        <Text style={{color:'#969297',
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {'Height'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                        
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='Height e.g 12.2'
                        multiline={false}
                        maxLength={9}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                     itemheight=value;
                        }
                      }
//                        keyboardType={Number}
                      />
                        
                        {/* <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 10,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.height}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerHeightSelect(index)}>
                                                {this.state.itemNoList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker> */}
                      </View>
                      {/* <View style={{alignItems:'flex-end',justifyContent:'flex-end',marginBottom:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.bold.fontFamily,fontSize:Constants.CustomerFonts.BigSize.fontSize}}>
                          {'.'}
                        </Text>
                      </View> */}
                      {/* <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                        <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 10,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.height2}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerHeight2Select(index)}>
                                                {this.state.itemNoList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker>
                      </View> */}
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        {/* <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 15,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.heightUnit}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerHeightUnitSelect(index)}>
                                                {this.state.unitList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker> */}


                        <Picker
  // selectedValue={this.state.language}
  style={{ height: 50, width: 100 }}
  selectedValue={this.state.heightUnit}
  onValueChange={(itemValue, itemIndex) => this.onPickerHeightUnitSelect(itemValue, itemIndex)}>
  <Picker.Item label="Cms" value="Cms" />
  <Picker.Item label="Inches" value="Inches" />
  <Picker.Item label="Feet" value="Feet" />
</Picker>

    
                        
                      </View>

                    </View>
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                      <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {'Width'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                     
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='Width e.g 12.2'
                        multiline={false}
                        maxLength={9}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}

                        onChangeText={(value) => {
                          itemWidth=value;
                             }}
                      />

                      </View>
                      {/* <View style={{alignItems:'flex-end',justifyContent:'flex-end',marginBottom:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.bold.fontFamily,fontSize:Constants.CustomerFonts.BigSize.fontSize}}>
                          {'.'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                        <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 10,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.width2}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerWidth2Select(index)}>
                                                {this.state.itemNoList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker>
                      </View> */}
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        {/* <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 15,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.widthUnit}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerWidthUnitSelect(index)}>
                                                {this.state.unitList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker> */}


 <Picker
 // selectedValue={this.state.language}
  style={{ height: 50, width: 100 }}
  selectedValue={this.state.widthUnit}
  onValueChange={(itemValue, itemIndex) => this.onPickerWidthUnitSelect(itemValue, itemIndex)}>
  <Picker.Item label="Cms" value="Cms" />
  <Picker.Item label="Inches" value="Inches" />
  <Picker.Item label="Feet" value="Feet" />
</Picker>

    

                      </View>

                    </View>
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                      <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {'Length'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                       
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='Length e.g 12.2'
                        multiline={false}
                        maxLength={9}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                          itemLength=value;
                             }
                   }
                      />
                       
                      
                      </View>
                      {/* <View style={{alignItems:'flex-end',justifyContent:'flex-end',marginBottom:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.bold.fontFamily,fontSize:Constants.CustomerFonts.BigSize.fontSize}}>
                          {'.'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                        <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 10,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.depth2}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerDepth2Select(index)}>
                                                {this.state.itemNoList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker>
                      </View> */}
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        {/* <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 15,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.depthUnit}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerDepthUnitSelect(index)}>
                                                {this.state.unitList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker> */}

    <Picker
     // selectedValue={this.state.language}
      style={{ height: 50, width: 100 }}
      selectedValue={this.state.depthUnit}
 // onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
      onValueChange={(itemValue, itemIndex) => this.onPickerDepthUnitSelect(itemValue,itemIndex)}>
      <Picker.Item label="Cms" value="Cms" />
     <Picker.Item label="Inches" value="Inches" />
      <Picker.Item label="Feet" value="Feet" />
</Picker>
                        
                      </View>

                    </View>

                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                      <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {'Weight'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                       
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='Weight e.g 12.2'
                        multiline={false}
                        maxLength={9}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                          itemWeight=value;
                             }
                            }
                      />
                       
                        {/* <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 10,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.weight}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerWeightSelect(index)}>
                                                {this.state.itemNoList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker> */}





                      </View>
                      {/* <View style={{alignItems:'flex-end',justifyContent:'flex-end',marginBottom:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6}}>
                        <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.bold.fontFamily,fontSize:Constants.CustomerFonts.BigSize.fontSize}}>
                          {'.'}
                        </Text>
                      </View>
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 3}}>
                        <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 10,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.weight2}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerWeight2Select(index)}>
                                                {this.state.itemNoList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker>
                      </View> */}
                      <View style={{justifyContent:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                        {/* <Picker style={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 15,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 12}}
                                            selectedValue={this.state.weightUnit}
                                            itemStyle={{color: '#081933',fontSize:15}}
                                            onValueChange={(index) => this.onPickerWeightUnitSelect(index)}>
                                                {this.state.unitWeightList.map((value, i) => (
                                                    <PickerItem label={value} value={i} key={"money"+value}/>
                                                ))}
                        </Picker> */}

<Picker
  style={{ height: 50, width: 100 }}
  selectedValue={this.state.weightUnit}
  onValueChange={(itemValue, itemIndex) => this.onPickerWeightUnitSelect(itemValue,itemIndex)}>
  

  <Picker.Item label="Ounce" value="Ounce" />
  <Picker.Item label="Kgs" value="Kgs" />
  <Picker.Item label="Pound" value="Pound" />
</Picker>


                      </View>
                    </View>

                  </View>
                </BoxShadow>
                <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 80,
                                    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6.3,
                                    color:"#000",
                                    border:3,
                                    radius:20,
                                    opacity:0.1,
                                    x:2,
                                    y:2,
                                    style:{marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
                                      marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
                                    marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1}}}>
                  <TouchableOpacity activeOpacity={0.5} style={[styles.ButtonStyle]} onPress={() => this.AddItem()}>
                    <Text style={[styles.ButtonTextStyle]}>
                      {'DONE'}
                    </Text>
                  </TouchableOpacity>
                </BoxShadow>
              </ScrollView>

            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexRow:{
		flexDirection: 'row',
	},
  logo: {
    height: 50,
    width: 50,
    alignSelf:'center',
    marginBottom:15,
  },
  inputStyle:{
		flex:1,
		borderWidth: 0.5,
		borderColor:'#B1B1B1',
		paddingTop:2,
		paddingBottom:2,
		paddingLeft:5,
		paddingRight: 5,
    textAlign:'left'
  },
  
inputTextStyle:{
//	flex:1,
	//	borderWidth: 0.5,
	//	borderColor:'#B1B1B1',
		//paddingTop:2,
	//	paddingBottom:2,
	//	paddingLeft:5,
	//	paddingRight: 5,
    textAlign:'center',
    height:40,
    width:100,
    borderColor:'#B1B1B1',
    borderWidth:3,

},

  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  modalOuter: {
      backgroundColor: 'rgba(100,100,100,0.6)',
      //opacity:0.7,
      padding: Constants.BaseStyle.PADDING * .5,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  modalInner:{
    flex:1,
    marginBottom: 5,
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    //padding:Constants.BaseStyle.PADDING * .2,
    width:Constants.BaseStyle.DEVICE_WIDTH/100*90,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 75,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    backgroundColor:'#fff',
    //position: 'relative',
    borderRadius:10,
  },
  btCloseModal:{
			width: 20,
			height:20,
			borderRadius:20,
	},
  btnCloseModalIcon:{
		width:Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
		height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
	},
  pickupIcon:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
    marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    textAlign:'center',
    color:'#081933',
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    //marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    //width:(Constants.BaseStyle.DEVICE_WIDTH/100)*50,
    //marginBottom:10,
    marginTop:0,//10,
    marginLeft:0,//(Constants.BaseStyle.DEVICE_WIDTH/100)*10,//10,
    marginRight:0,//(Constants.BaseStyle.DEVICE_WIDTH/100)*10,//10,
    borderRadius:30,
    backgroundColor: '#53C8E5',
    borderColor: "#53C8E5",
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.White,
    textAlign: "center"
  },

  Headertext:{
    fontSize:20,
    marginBottom:15,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  Subheadtext:{
    fontSize:16,
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  recieveMsg:{
    fontSize:16,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Orange,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2,
    marginBottom : 10
  },

});

export default connect(state => ({state: state.CustomerReducer}))(AddCourierItems);
