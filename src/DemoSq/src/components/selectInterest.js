import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, Modal, AsyncStorage, Animated,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, BackHandler, Dimensions, ImageBackground
} from 'react-native';
import Orientation from 'react-native-orientation';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import Header from "../common/Header"
import css from '../common/styles';// Styling page
const select = require("../images/select.png");
import Grid from 'react-native-grid-component';
const Apis = require('../utils/Api');
//http://52.14.89.103:3000



export default class ViewAll extends Component {
  animatedValue = new Animated.Value(0)
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  constructor(props) {
    super(props);
    this.state = {
      content_type: null,
      userId: null,
      category_id: null,
      category_name: null,
      modalShown: false,
      toastColor: 'green',
      message: 'Success!',
      animating: false,
      data: [
        {
          "_id": "5b77fddf8dbcef6addf30f00",
          "name": "tennis",
          "isSleceted": false,
          "image": "/images/1534590431301.jpeg"
        },
        {
          "_id": "5b77fde68dbcef6addf30f01",
          "name": "cricket",
          "isSleceted": false,
          "image": "/images/1534590438987.jpeg"
        },
        {
          "_id": "5b77fdef8dbcef6addf30f02",
          "name": "ballyball",
          "isSleceted": false,
          "image": "/images/1534590447509.jpeg"
        },
        {
          "_id": "5b77fdfe8dbcef6addf30f03",
          "name": "chess",
          "isSleceted": false,
          "image": "/images/1534590462524.jpeg"
        },
        {
          "_id": "5b7801ec8dbcef6addf30f06",
          "name": "Cricket",
          "isSleceted": false,
          "image": "/images/1534591468770.png"
        }
      ]
    };
  }
  _renderItem = (data, i) => (

    <TouchableOpacity style={[styles.item]} key={i} onPress={() => this.addInterest(data)}>
      <ImageBackground imageStyle={{ borderRadius: 6 }} style={{ height: 110, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} key={i} source={{ uri: "http://52.14.89.103:3000" + data.image }}>
        {
          data.isSleceted == true ? <Image style={{ height: 36, width: 36, borderRadius: 18, alignSelf: 'center' }} source={select} /> : null
        }
      </ImageBackground>
      <Text style={{ marginTop: 5, marginBottom: 10, alignSelf: 'center', textAlign: 'center' }}>{data.name}</Text>
    </TouchableOpacity>
  );

  selectInterest(index) {
    let { data } = this.state;
    let targetPost = data[index];
    targetPost.isSleceted = true
    this.setState({
      data: data
    });
    console.log(JSON.stringify(this.state.data))
    //  select
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-width)
    const { state } = this.props.navigation;
    AsyncStorage.getItem('user_id').then((user_id) => {
      this.setState({
        userId: user_id
      });
    });
    this.getInterest();

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
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
        this.animatedValue,
        {
          toValue: 0,
          duration: 350
        }).start()
    }, 2000)
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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  }

  getInterest(id) {
    this.setState({ animating: true });
    Apis.getAPI("interest/list").then(response => {
      this.setState({ animating: false });
      console.log("+++++++++++" + JSON.stringify(response));
      if (response.status == 'success') {
        this.setState({ animating: false });
        //  alert(JSON.stringify(response.data));
        // this.setState({
        //     data:response.data
        // });
      } else {
        this.setState({ animating: false });


      }
    });

  }

  addInterest(param) {
    this.setState({ animating: true });
    var data = {
      userId: this.state.userId,
      interestId: param._id,
      interestName: param.name
    };
    this.setState({ animating: true });
    Apis.signUp(data, "user/add-interest").then(response => {
      console.log("----------" + JSON.stringify(response))
      if (response.status == "success") {
        this.setState({ animating: false });
        this.callToast(response.message, 'success')
         this.props.navigation.navigate('Tab')
      } else {
        this.setState({ animating: false });
      }
    })
  }


  _renderPlaceholder = i => <View style={[styles.item]} key={i} />;

  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })
    return (
      <View style={{ flex: 1 }}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Select Interests' filter={true} />
        <Animated.View style={{ transform: [{ translateY: animation }], height: 60, backgroundColor: this.state.toastColor, position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center', zIndex: 2 }}>
          <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
            {this.state.message}
          </Text>
        </Animated.View>
        <Grid
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderItem={this._renderItem}
          renderPlaceholder={this._renderPlaceholder}
          data={this.state.data}
          itemsPerRow={3}
        />

        <Modal
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.animating}>
          <View style={css.transaparentView}>
            <ActivityIndicatorExample
              animating={this.state.animating} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 140,
    margin: 6,
    borderRadius: 5
  },
  list: {
    flex: 1,

  }
});