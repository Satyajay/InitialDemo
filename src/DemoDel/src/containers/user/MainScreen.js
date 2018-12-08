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
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Background from '../../components/common/Background';
import Constants from "../../constants";
import * as ScheduleActions from '../../redux/modules/schedule';
import { bindActionCreators } from "redux";
class MainScreen extends Component {
  constructor(props) {
    super(props);
    console.log('24-- -main-', props)
    this.state = {
      driverId: props.userData.data._id,
    }
  }
  componentWillMount() {
  //  const { navigate } = this.props.navigation;
  // navigate('CustomerHome')
   // console.log('30-- -main--props-', this.props)
   // console.log('31-- -main-state', this.state)
  //  this.props.ScheduleActions.getSchedule({ ...this.state }, this.props.tokenforuser);
  }

  

  render() {


    const { navigate } = this.props.navigation;
    return (
      <Background style={styles.container}>
      
        <Image source={Constants.Images.user.logo} style={styles.logo} resizeMode={'contain'} />
       <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <View style={styles.singleContainer}>
        <TouchableOpacity onPress={() => {
          try {
            navigate('profile')
          }
          catch (e) {
            alert(e);
          }

        }} style={styles.imgContainer}>
          <Image source={Constants.Images.user.driver_van} style={styles.driver} resizeMode={'contain'} />
        </TouchableOpacity>
        <Text style={styles.text}>Driver App</Text>
        </View>
        <View style={styles.singleContainer}>
        
        <TouchableOpacity onPress={() => 
         { try{
          navigate('customerprofile')
          }
          catch(e){
            alert(e)
          }
          
          }} style={styles.imgContainer}>
          <Image source={Constants.Images.user.customer_cart} style={styles.customer} resizeMode={'contain'} />
        </TouchableOpacity>
        <Text style={styles.text}>Customer App</Text>
        </View>
        </View>
      </Background>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 30,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 60
  },
  driver: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    alignSelf: 'center'
  },
  customer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    alignSelf: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    backgroundColor: 'transparent',
    color: Constants.Colors.WhiteUpd
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    // borderWidth: 4,
    
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 19,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 19,
    // borderRadius: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,
    // borderColor: '#16477C',
    backgroundColor:Constants.Colors.DarkBlue
    //padding:10,
  },
  singleContainer:{
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    flexDirection:"column"
  }
});


const mapStateToProps = state => (
  {
    //tokenforuser:state.user.userData.token,
    // tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
    scheduleDatesList: state.schedule.scheduleDatesList,
    userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  });

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);