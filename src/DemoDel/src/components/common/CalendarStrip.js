import React, { Component } from "react";
import { StyleSheet} from "react-native";
import Constants from '../../constants';
import CalendarStrip from "react-native-calendar-strip";
import moment from 'moment';
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
export default class Calendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      renderCalender: false,
      renderList: false,     
    }
  }

  componentWillMount(){
    // setTimeout(function(that){
    //   console.log('302-componentWillMount setTimeout-Calendar ',that)
    //   console.log('273 componentWillMount -Calendar-that ',that.state)
    //   console.log('273-componentWillMount Calendar-that ',that.props)
    //   that.start();
    //  }, 100,{start:startLoading} );
  }
  componentDidMount(){
    //startLoading()
   // setTimeout(() => {this.setState({renderHeader: true})}, 0);
    
    // setTimeout(function(that){
    //   console.log('302-componentDidMount setTimeout-stopLoading Calendar ',that)
    //   console.log('273 componentDidMount -Calendar-stopLoading that ',that.state)
    //   console.log('273 componentDidMount Calendar-stopLoadingthat ',that.props)
    //   that.stop();
    //  }, 100,{stop:stopLoading} );
  }

  componentDidUpdate(){
 // stopLoading()
    // setTimeout(function(that){
    //   console.log('302-componentDidUpdate setTimeout-stopLoading Calendar ',that)
    //   console.log('273 componentDidUpdate -Calendar-stopLoading that ',that.state)
    //   console.log('273 componentDidUpdate Calendar-stopLoadingthat ',that.props)
    //   that.stop();
    //  }, 5000,{stop:stopLoading} );

  }
  render(){
    //console.log(this.props)
    return (
      <CalendarStrip
        selectedDate={this.props.currentDate}
        minDate={moment(new Date())}
        maxDate={moment(new Date()).add(55, 'days')}
        daySelectionAnimation={{type: 'background', borderWidth:1,   highlightColor: Constants.Colors.LightBlue}}
        style={{height:100, paddingTop: 10, paddingBottom: 10}}
        calendarHeaderStyle={{color: Constants.Colors.Blue}}
        calendarColor={'white'}
        dateNumberStyle={{color: Constants.Colors.Blue}}
        dateNameStyle={{color: Constants.Colors.Blue}}
        iconLeft={Constants.Images.driver.backward}
        iconRight={Constants.Images.driver.next}
        iconContainer={{flex: 0.1}}
        onDateSelected={(date)=>this.props.getDateSelected(date)}
      />
    );
  }
};

const styles = StyleSheet.create({
  // loginButtonStyle: {
  //   borderWidth: 1,
  //   padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
  //   backgroundColor: '#53C8E5',
  //   borderColor: "#53C8E5",
  //   marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
  //   marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*10,
  //   borderRadius:5
  // }
});
