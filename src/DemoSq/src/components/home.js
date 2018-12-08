import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, Alert,
  Dimensions, Image, Animated, ImageBackground,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, StatusBar
} from 'react-native';
import css from '../common/styles';// Styling page
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import Header from "../common/Header"
import colors from '../common/colors';
const eventsBanner = require('../images/socialbg.png');
const etheleteBanner = require('../images/atheleticsbg.png');
const sicialImg = require('../images/social.png');
const menu = require('../images/menu.png');
const Apis = require('../utils/Api');
const atheletImg = require('../images/atheletics.png');
const homeImg = require('../images/1.png');
const createEvnt = require('../images/2.png');
const myEvent = require('../images/3.png');
const invitations = require('../images/4.png');
const profileImg = require('../images/5.png');
const notificationSett = require('../images/6.png');
const logoutImg = require('../images/8.png');




export default class Home extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-width)
    this.state = {
      data: [{
        image: homeImg,
        title: "Home"
      }, {
        image: createEvnt,
        title: "Create Events"
      }, {
        image: myEvent,
        title: "My Events"
      }, {
        image: invitations,
        title: "Invitations"
      }, {
        image: profileImg,
        title: "My Profile"
      }, {
        image: notificationSett,
        title: "Notification Settings"
      }, {
        image: logoutImg,
        title: "Logout"
      }],
      atheleticCount:null,
      categoryId:null,
      socialCount:null
    }
  }
  callToast(message, type) {
    if (this.state.modalShown) return
    this.setToastType(message, type)
    this.setState({ modalShown: true })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }

  closeToast() {
    // setTimeout(() => {
    this.setState({ modalShown: false })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 350
      }).start()
    // }, 2000)
  }

  close() {
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 350
        }).start()
    }, 100)
  }

  callXToast() {
    Animated.timing(
      this.animatedXValue,
      {
        toValue: 0,
        duration: 350
      }).start(this.closeXToast())
  }

  closeXToast() {
    setTimeout(() => {
      Animated.timing(
        this.animatedXValue,
        {
          toValue: -windowWidth,
          duration: 350
        }).start()
    }, 2000)
  }

  setToastType(message = 'Success!', type = 'success') {
    let color
    if (type == 'error') color = 'red'
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }
  componentDidMount() {
    this.getEvents();

  }

  getEvents() {
    this.setState({ animating: true });
    Apis.getAPI("event/event").then(response => {
      this.setState({ animating: false });
      console.log("list+++++++++++" + JSON.stringify(response));
      if (response.status == 'success') {
             this.setState({
              atheleticCount:response.data[1]?response.data[1].count:0,
              categoryId:response.data[1]._id,
              socialCount:response.data[0]?response.data[0].count:0
             });
      } else {
        this.setState({ animating: false });


      }
    });

  }
  screenNavigations(screenName) {
    switch (screenName) {
      case "Create Events":
        this.props.navigation.navigate('CreateSquad');
        break;
      case "Home":
        this.close()
        break;
      case "Logout":
        Alert.alert(
          'Logout',
          'Are you sure to logout?',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.logout() },
          ],
          { cancelable: false }
        )
        break;
      case "My Profile":
        this.props.navigation.navigate('MyProfile', {
          mobile: "",
          screenType:"home"
        })
        break;

        case "My Events":
        this.props.navigation.navigate('Events', {
         
        })
        break;
      case "Invitations":
        this.props.navigation.navigate('Invites', {
          mobile: ""
        })

        break;
      default:
        this.test()
    }

  }

  getSubCategories() {
        this.setState({ animating: true });
        Apis.getAPI("event/subevents/?categoryId="+this.state.categoryId).then(response => {
            this.setState({ animating: false });
            if (response.status == 'success') {
               this.props.navigation.navigate('Athletics',{
              categoryArray:response.data
            })
              //   that=this;
              //  setTimeout(() => {
              //   that.setState({ animating: false,subCategoryList:response.data});
                   
              //  }, 500);
              

            } else {
                this.setState({ animating: false });


            }
        });

    }
  logout() {
    this.props.navigation.navigate('Login');
  }
  test() {
    this.callToast('Please enter mobile no.', 'error')
  }
  _renderItem = ({ item }) => (
    <TouchableOpacity style={{ left: 0, width: '100%', height: 50, flexDirection: "row" }} onPress={() => this.screenNavigations(item.title)}>
      <Image style={[styles.commentImage, { marginLeft: 20, height: 20, width: 20, alignSelf: 'center' }]} source={item.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  FlatListItemSeparator = () => {
    return (
      <View
        style={styles.line}
      />
    );
  }

  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .8, 1],
      outputRange: [-width, -10, 0]
    })
    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ translateX: animation }], width: width, backgroundColor: "rgba(0,0,0,0.5)", position: 'absolute', left: 0, top: 0, height: height, justifyContent: 'center', zIndex: 2 }}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => this.close('Athletics')}>
            <TouchableOpacity activeOpacity={1} style={{ height: '100%', marginLeft: 0, width: 250, backgroundColor: colors.buttonBg }} onPress={() => this.close('Athletics')}>

              <View style={{ height: 20 }}></View>
              <FlatList
                style={{ height: 350 }}
                extraData={this.state}
                ref='flatlist'
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={this._renderItem}
                keyExtractor={item => item.idx}


              />
              <View
                style={{ height: 30, width: '100%', backgroundColor: 'red' }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
        {/* Header */}
        <View style={css.gredient}>
          {Platform.OS === 'ios' ? <View style={css.statusBar}></View> : null}
          <View style={css.menuContainer}>
            <View style={css.backBtnView}>
              {
                !this.props.noBackBtn ? <TouchableOpacity onPress={() => this.test()} >
                  <View style={css.backBtnView}>
                    <View style={[css.circileLeft]}>
                      <Image style={{ height: 15, width: 15 }} source={menu} resizeMode='contain' />
                    </View>

                  </View>
                </TouchableOpacity> : null
              }
            </View>
            <View style={css.textContainer}>

            </View>

            <View style={{
              width: 50,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 0, zIndex: 2, height: 44, flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', zIndex: 2, alignItems: 'flex-end' }}>
          </View>
          <ImageBackground style={[styles.wrapper, { marginTop: 0 }]} source={etheleteBanner}>
            <TouchableOpacity style={styles.centerView} onPress={() =>this.getSubCategories()}>
              <View style={styles.circularImage}>
                <Image style={{ height: 40, alignSelf: 'center' }} source={atheletImg} resizeMode='contain' />
              </View>
              <Text style={styles.topLbl}>Athletics</Text>
              <Text style={styles.bottomLbl}>{this.state.atheleticCount} Events</Text>
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground style={styles.wrapper} source={eventsBanner}>
            <View style={styles.centerView}>
              <View style={[styles.circularImage]}>
                <Image style={{ height: 40, alignSelf: 'center' }} source={sicialImg} resizeMode='contain' />
              </View>
              <Text style={[styles.topLbl, { color: 'white', textAlign: 'center' }]}>Social</Text>
              <Text style={[styles.bottomLbl, { color: 'white', textAlign: 'center' }]}>{this.state.socialCount} Events</Text>

            </View>
          </ImageBackground>
        </View>
      </View >

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  line: {
    height: 1,
    left: 0,
    width: 210,
    alignSelf: 'center',
    opacity: 0.5,
    backgroundColor: 'white',
  },
  title: { marginLeft: 10, alignSelf: 'center', fontSize: 13, fontWeight: '600', color: 'white' },
  wrapper: { flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' },
  centerView: { height: 90, width: 70, alignSelf: 'center' },
  circularImage: { height: 40, width: 40, borderRadius: 20, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  topLbl: { marginTop: 5, fontSize: 15, fontWeight: 'bold', color: colors.buttonBg, textAlign: 'center' },
  bottomLbl: { fontSize: 11, fontWeight: '500', color: colors.buttonBg, textAlign: 'center' }
})




// user_d-- 5b9bf6f84085953330612d2a
// categoryId- 5b9e9e9b4513045a9b9019a8
// category name- Athelete
// subcategoryID-  5b9cd3640f2f8644b9b9a711
// subcategoryName- Cricket 

// url- {{url}}event/create


// response-  {
//     "status": "success",
//     "data": {
//         "eventRequestId": [],
//         "privateEvent": false,
//         "_id": "5b9fc8d84513045a9b9019ea",
//         "userId": "5b9bf6f84085953330612d2a",
//         "categoryId": "5b9e9e9b4513045a9b9019a8",
//         "subCategoryId": "5b9cd3640f2f8644b9b9a711",
//         "eventName": "Public Event",
//         "Kick_of_Time": "10:10",
//         "googleMapLocation": "noida",
//         "startAt": "2018-09-30T00:00:00.000Z",
//         "totalTeam": 5,
//         "description": "this match is held between two team",
//         "eventImage": "/images/1537198296863.png",
//         "rules": "i follow my rules none other then else",
//         "expireAt": "2018-09-30T00:00:00.000Z",
//         "createdAt": "2018-09-17T15:31:36.864Z",
//         "updatedAt": "2018-09-17T15:31:36.864Z",
//         "__v": 0
//     }
// }



// url- {{url}}/event/subevents-list?subCategoryId=5b9e9e9b4513045a9b9019a8

// response-{
//     "status": "failure",
//     "error": {
//         "error_code": "BAD_REQUEST",
//         "message": "events not found"
//     }
// }