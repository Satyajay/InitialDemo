import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image, Switch, Modal,
  TextInput, TouchableOpacity, ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView, BackHandler, AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
const profileImg = require('../images/profilepic.png');
const Apis = require('../utils/Api');
const calenderImg = require('../images/calender.png');
const timerImg = require('../images/timer.png');

export default class GameList extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      auth_key: null,
      animating:false,
      subCateId:null,
      content_id: null
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  componentDidMount() {
    AsyncStorage.getItem('auth_key').then((Auth_key) => {
      this.setState({
        auth_key: Auth_key
      });
    });
    const { state } = this.props.navigation;
    this.setState({
      subCateId:state.params.id
    })
    this.getSubCategories(state.params.id);

  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  }




   getSubCategories(id) {
        this.setState({ animating: true });
        Apis.getAPI("event/subcategory-events?subCategoryId="+id).then(response => {
            this.setState({ animating: false });
            if (response.status == 'success') {
               this.setState({ animating: false });
              this.setState({
                FlatListItems:response.data
              });
              console.log(id+"-------"+JSON.stringify(response));
              

            } else {
                this.setState({ animating: false });


            }
        });

    }

 eventDate(date) {
        var temp = date;
        if (typeof (temp) == "string") {
            temp = temp.split("T")[0];
        }
        return temp;
    }

    eventTime(time) {
        var temp = time;
        if (typeof (temp) == "string") {
            var hours = 0;
            var min = 0;

            hours = temp.split(":")[0].length < 2 ? ("0" + temp.split(":")[0]) : temp.split(":")[0];
            console.log("0" + temp.split(":")[1].length+"Time-----"+temp.split(":")[1]);
            min = temp.split(":")[1].length < 2 ? ("0" + temp.split(":")[1]) : temp.split(":")[1]
            temp = hours + ":"+min;
        }
        return temp;
    }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          alignSelf: 'center',
          opacity: 0.8,
          // backgroundColor: '',
        }}
      />
    );
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity style={{ marginTop: 10, marginBottom: 0, flex: 1, left: 20, width: width - 40, flexDirection: "row", backgroundColor: '#f2f2f2' }} onPress={() => this.props.navigation.navigate('EventDetail', {
      eventId:item._id,
      is_Join: true,
    })}>
      <Image source={profileImg} style={styles.commentImage} />
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={styles.commentContent}>{item.eventName}</Text>
        <Text style={styles.address}>{item.googleMapLocation}</Text>
        <View style={{ flexDirection: 'row', }}>
          <Image style={{ height: 15, width: 15, alignSelf: 'center' }} source={calenderImg} resizeMode="contain" />
          <Text style={[css.time, { marginTop: 5, marginLeft: 5, opacity: 0.9, fontWeight: '400', color: 'black' }]}>{this.eventDate(item.startAt)}</Text>
          <Image style={{ marginLeft: 15, height: 15, width: 15, alignSelf: 'center' }} source={timerImg} resizeMode="contain" />
          <Text style={[css.time, { marginTop: 5, marginLeft: 5, opacity: 0.9, fontWeight: '400', color: 'black' }]}>{this.eventTime(item.Kick_of_Time)}</Text>
          {/* <View style={{height:15, width:15, backgroundColor:'red', alignSelf:'center'}}></View>
                  <Text style={[css.time,{marginTop:5,marginLeft:5,opacity:0.9,fontWeight:'400', color:'black'}]}>{item.eventDate}</Text>
                  <View style={{marginLeft:15,height:15, width:15, backgroundColor:'red',alignSelf:'center'}}></View>
                  <Text style={[css.time,{marginTop:5,marginLeft:5, opacity:0.9,fontWeight:'400', color:'black'}]}>{item.eventTime}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );


  render() {


    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Cricket' noBackBtn={false} />
        <View style={{ marginTop: 0, height: 30, left: 20, width: width - 40, flexDirection: "row" }}>
          <Text style={{ marginTop: 13, marginLeft: 0, fontSize: 13, fontWeight: '400' }}>Cricket Near you</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0, height: '100%' }}>

          <FlatList
            extraData={this.state}
            ref='flatlist'
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<View style={{ marginTop: 30, height: 60, width: '100%' }}><Text style={{ alignSelf: 'center', textAlign: 'center' }}>No Record Found</Text></View>}
            data={this.state.FlatListItems}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={this._renderItem}
            keyExtractor={item => item.idx}
            inverted

          />

        </ScrollView>
        <Modal
                transparent={true}
                onRequestClose={() => null} 
                visible={this.state.animating}>
                  <View style={css.transaparentView}>
                 <ActivityIndicatorExample
              animating = {this.state.animating}/>
              </View>
              </Modal>
            
      </View>
    )
  }

}


const styles = StyleSheet.create({
  row: { flex: 1, width: '100%', flexDirection: 'row' },

  avatar: { marginLeft: 15, height: 44, width: 44, borderRadius: 23, alignSelf: 'center' },

  name: { marginLeft: 10, fontSize: 15, fontWeight: '400', alignSelf: 'center' },
  commentName: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  commentContent: {
    fontSize: 13,
    marginTop: 10,
    color: '#000',

  },

  address: {
    fontSize: 11,
    //marginTop:5,
    color: '#000',
    opacity: 0.9,
    fontWeight: '300'
  },

  commentImage:
  {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25
  },

  container2: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    // alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 3,
    height: 40,
    fontSize: 15,
  },

})
