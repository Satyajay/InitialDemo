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
  Image,ScrollView,
  TouchableOpacity,
  TextInput,Switch,FlatList,
  AsyncStorage,
  Alert,
  ToastAndroid
} from "react-native";


import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import ServingAreaList from "../../../components/driver/ServingAreaList";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ScheduleActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import RestClient from '../../../utilities/RestClient';
import { startLoading, stopLoading, showToast, hideToast } from '../../../redux/modules/app';
import _ from "underscore";
const KEYS_TO_FILTERS = ['name'];


import SearchInput, { createFilter } from 'react-native-search-filter';


let citiesList=[]
 class ServingArea extends Component {
  constructor(props) {
    super(props);
    console.log('SA-31-props',props)
    this._handleResults=this._handleResults.bind(this);
    this._handleChangeText=this._handleChangeText.bind(this);
    this._getValue=this._getValue.bind(this);
    
    

    let myServingAreas=[]
    if(props.myServingAreas===undefined){
      myServingAreas=[]
    }else{
      myServingAreas=[] //props.myServingAreas
    }
    this.state={
      available:true,
      searchTerm: '',
      myServingAreasList:myServingAreas,
      allCities:props.citiesList,
      searching:false,
      citiesData:[]
    }
  }
  
  searchUpdated(term) {
    let isSearching=false
    if(term===''){
      isSearching=false
    }else{
      isSearching=true
    }
    this.setState({ searchTerm: term, searching:isSearching })
  }
  getServingAreas(){
    RestClient.post("users/getDriver",{},this.props.tokenforuser).then((result) => {
      // startLoading();
       console.log("result",result.data)
       if(result.status == 1){
         //  stopLoading();
           var data=result.data
           
           var test=data.cities && data.cities.map(function(item){
               return {_id:item._id,cityName:item.cityName}
           })
           console.log("75-SA--test ", test)
   
           var obj = {};
           var servingAreas=test
           this.setState({myServingAreasList:servingAreas},()=>{
             console.log('95--updated-state-servingAreas-- ', this.state)
           }) 
        
       }
      }).catch(error => {
          console.log("error=> "+error)
         // dispatch(stopLoading());
      });
  }
  componentDidMount(){
    console.log("componentDidMount" )
   this.getServingAreas() 
     
  }

  deleteServingArea(id){
    let servingAreaArr=[];
    servingAreaArr.push(id)
    AsyncStorage.getItem("token").then((userToken) => {
        console.log("inside",servingAreaArr,userToken)
        RestClient.post("drivers/deletedrivercity",{servingcity:JSON.stringify(servingAreaArr)},userToken).then((result) => {
          console.log("result in serving area",result) 
          if(result.status==1)
          {
          this.getServingAreas()            
          ToastAndroid.show("Serving Area Deleted", ToastAndroid.SHORT);
          }
          else{
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
            }
        }).catch(error => {
            console.log("result of type eror",error)
          });
    })
}
addServingArea(id){
  console.log("add",id)
  let servingAreaArr=[];
  servingAreaArr.push(id)
  AsyncStorage.getItem("token").then((userToken) => {
      console.log("inside",servingAreaArr,userToken)
      RestClient.post("drivers/adddrivercity",{servingcity:JSON.stringify(servingAreaArr)},userToken).then((result) => {
        ToastAndroid.show("Serving Area Added Successfully", ToastAndroid.SHORT);
          this.getServingAreas()
      }).catch(error => {
        ToastAndroid.show("Serving Area deletion error", ToastAndroid.SHORT);
        });
  })
}
    setAvailability(){
      this.setState({
        available:!this.state.available
      })
    }

addCities(){

}

_handleResults(results) {
  console.log('_handleResults(results',results)
   
  this.setState({myServingAreasList: results });
}
_getValue(val){
  if(val=='' || val.length==0){
    console.log('blank input')
    this.setState({myServingAreasList: this.props.myServingAreas } );

  }
}


_handleChangeText(results) {
  console.log('_handleChangeText(results',results)
  console.log('_handleChangeText(state',this.state)
  console.log('_handleChangeText(props',this.props)
  if(results==''){
    console.log('blank string')
    this.setState({myServingAreasList: this.props.myServingAreas } );
  }
 
}

getServingAreaList(){
  citiesList=[]
  this.state.allCities.map((value,key)=>{
    let Selected=false
   let servingArr= _.findWhere(this.state.myServingAreasList,{_id:value._id})
   if(servingArr)
   citiesList.push({name:value.name,_id:value._id,Selected:true})
   else
   citiesList.push({name:value.name,_id:value._id,Selected:false})
    })
}

renderAreaList(value){
  return(value.Selected?<View style={styles.inputCard}>
  <View style={{flex:4}}>
        <Text style={styles.areaText}  >
      {value.name}
      </Text>
      </View>
      <View style={{flex:1}}>
      <TouchableOpacity
      onPress={()=>{
        Alert.alert(
          'Delete Serving Area',
          'Are you sure you want to Delete?',
          [         
            {text: 'Cancel', style: 'cancel'},
            {text: 'Yes', onPress: () => {this.deleteServingArea(value._id)

          }},
          ],
          { cancelable: false }
        )
      }
    }
      >
      <MaterialIcon
              name="close-circle"
              style={{
                fontSize: 22,
                marginLeft: 30,
                alignSelf:"center"
              }}
            />
            </TouchableOpacity>
            </View>
      </View>:<View style={styles.inputCard}>
        <View style={{flex:4}}>
        <Text style={styles.areaText1}  >
      {value.name}
      </Text>
      </View>
      <View style={{flex:1}}>
      <TouchableOpacity
      onPress={()=>this.addServingArea(value._id)}
      >
      <MaterialIcon
              name="plus-circle-outline"
              style={{
                fontSize: 22,
                marginLeft: 30,
                alignSelf:"center"
              }}
            />
            </TouchableOpacity>
            </View>
      </View>
  )
}

renderSA(){
  this.getServingAreaList()
    return(
      <FlatList
      data={citiesList}
      renderItem={({item})=>this.renderAreaList(item)}
    />
    )
  
}

  
  render() {
console.log("namenamename111",citiesList)    
    const titleConfig = {
      title: "DEFAULT SERVING AREA",
      tintColor: "#fff",
      style:{fontSize:12,fontWeight:'400'}
    };
    console.log('SA-99-state',this.state);
    
    const filteredEmails = citiesList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));


    const { navigate, goBack } = this.props.navigation;
    return (
    <View style={styles.container}>
      <NavigationBar
        statusBar={{hidden:true}}
        style={styles.navigationBar}
        title={titleConfig}
        rightButton={
          <View style={styles.rightButtonNav}>
            <TouchableOpacity onPress={()=>navigate('Settings')}>
              <Image
                source={Constants.Images.user.setting}
                style={styles.navIcons} resizeMode={'contain'}/>
            </TouchableOpacity>
            <Switch
              onChange={()=>this.setAvailability()}
              value={this.state.available}
              style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} />
          </View>
        }
        leftButton={
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              name="angle-left"
              size={40}
              color="white"
              style={[
                styles.navIcons,
                { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }
              ]}
            />
          </TouchableOpacity>
        }
      />

      <SearchInput 
          onChangeText={(term) => { this.searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder="search..."
          />

    <ScrollView>
          
          { this.state.searching &&  filteredEmails.map(data => {
            console.log("email",data)
            return (
              this.renderAreaList(data)
            )
          })}

        { !this.state.searching && this.renderSA()

          }  
        
        </ScrollView>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,

  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },

  container2: {
    flex: 1,
    padding:Constants.BaseStyle.PADDING * 0.9,
  },
  mapIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6
  },

  inputCard: {
    alignItems:'flex-end',
    flexDirection:'row',
    padding:Constants.BaseStyle.PADDING * 0.4,
    backgroundColor:'white',
    borderWidth:2,
  shadowColor:Constants.Colors.LightGray,
     shadowOffset: {
       width: 1,
       height: 1
     },
     shadowRadius: 3,
     shadowOpacity: 1.0,
     borderRadius:2,
     borderWidth:1,
     borderColor:Constants.Colors.WhiteBlur,
     marginVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1
  },
  subcontainer: {
  paddingHorizontal: Constants.BaseStyle.PADDING * 0.8,
  paddingVertical: Constants.BaseStyle.PADDING * 0.2,
    flexDirection: "row",

  },
  areaText: {
    fontSize: 17,
    fontWeight:'900',
    color: Constants.Colors.Blue,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2
  },
  areaText1: {
    fontSize: 17,
    fontWeight:'900',
    color: Constants.Colors.newOrange,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  sectionHeaders:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:Constants.BaseStyle.PADDING * .5,
    alignItems:'center'
  },
  textBlue:{
    fontSize:14,
    color:Constants.Colors.Blue
  },
  textOrange:{
    fontSize:14,
    color:Constants.Colors.Orange
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  addIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4
  },
  citySection: {
    marginHorizontal:10,
alignItems:'center',
    flexDirection:'row',
justifyContent:'space-between',
borderBottomWidth:1,
borderBottomColor:Constants.Colors.Blue,

  },

});


const mapStateToProps = state => (
  {
  //tokenforuser:state.user.userData.token,
  tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
  listOfSchedule:state.schedule.scheduleList,
  propSelectedDate:state.schedule.scheduleSelectedDate,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  scheduleDatesList: state.schedule.scheduleDatesList,
  defaultSchedule:state.schedule.defaultSchedule,
  myServingAreas:state.schedule.myServingAreas,
  citiesList:state.schedule.citiesList
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ServingArea);