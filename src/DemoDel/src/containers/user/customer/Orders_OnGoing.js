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
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListView,
  ImageBackground,
  Modal,
} from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';
import HeaderBackgroundWithBackButton from '../../../components/customer/HeaderBackgroundWithBackButton';
import Constants from "../../../constants";
import SelectDriverMapView from '../../../components/customer/SelectDriverMapView';
import Orders_DraftsGeneral from '../../../components/customer/Orders_GeneralDrafts';
import * as UserActions from '../../../redux/modules/user';
import { bindActionCreators } from "redux";
import SubmitButton from "../../../components/common/FormSubmitButton";
import { BoxShadow } from 'react-native-shadow';

import { Container, Card, CardItem, Body, Left, Right, Thumbnail, Content } from 'native-base'

var strAddress = '228 Park Ave S, New York, NY 10003, USA';


class Orders_Ongoing extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      generalFlag: 1,
      locationFlag: 0,
      servicesFlag: 0,
      productFlag: 0,
      detailsInfo: '',
      params: '',
      orderId: '',
      date: '',
      maxTime: '',
      minTime: '',
      pickUpp: [],
      dropLocation: [],
      order_ID: '',
      miItems: [],
      miItems: [],
      productArray: [],
      noSelection: false,
      WhiteGlove: false,
      ExtraHelper: false,
      DriverHelp: false,
      TailGate: false,
      Residence: false
    }
    // const { state } = this.props.navigation.state;
    // this.setState({
    //   orderIdd: state.detail_id
    // })
    // console.log("order id is+++", orderIdd)
    this.miItems = [
      {
        'test1': '1',
        'test2': '2'
      }
    ]
  }

  setControlTextColor(value) {
    if (value == 1)
      return [styles.textStyle, { color: '#53C8E5' }];
    else {
      return [styles.textStyle];
    }
  }

  onClickGeneral() {
    this.setState({
      generalFlag: 1,
      locationFlag: 0,
      servicesFlag: 0,
      productFlag: 0,
    });
  }

  async onClickLocation() {
    let detailsInfo = this.props.orderDetails;
    //console.log("pickup details++++++", detailsInfo);
    var ab = await detailsInfo.orders[0].pickup;
    let pickUp = [];
    for (var i = 0; i < ab.length; i++) {
      var mytest = ab[i]
      console.log("mytest data is:", mytest)
      let objj = {
        address: mytest.address,
        pickup_point: mytest.pickup_point
      }
      pickUp.push(objj)
    }
    let drop = await detailsInfo.orders[0].drop_location;
    let dropArr = [];
    for (i = 0; i < drop.length; i++) {
      var dl = drop[i];
      console.log('dl++', dl);
      let obj = {
        address: dl.address,
        drop_point: dl.drop_point
      }
      dropArr.push(obj)
    }
    this.setState({
      pickUpp: pickUp,
      dropLocation: dropArr,
      generalFlag: 0,
      locationFlag: 1,
      servicesFlag: 0,
      productFlag: 0,
    });
  }

  async onClickServices() {
    let detailsInfo = this.props.orderDetails;
    //console.log("pickup details++++++", detailsInfo);
    var ab = await detailsInfo.orders[0].pickup;
    let pickUp = [];
    for (var i = 0; i < ab.length; i++) {
      var mytest = ab[i]
      console.log("mytest data is:", mytest)
      let objj = {
        address: mytest.address,
        pickup_point: mytest.pickup_point
      }
      pickUp.push(objj)
    }
    let details = this.props.orderDetails;
    console.log("delivery name++", details.deliveryName);
    let dName = details.deliveryName
    if (dName == 'Document' || dName == 'Food') {
      this.setState({
        pickUpp: pickUp,
        noSelection: true,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    } else if (dName == 'Furniture') {
      this.setState({
        pickUpp: pickUp,
        WhiteGlove: true,
        ExtraHelper: true,
        DriverHelp: true,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    }
    else if (dName == 'Courier') {
      this.setState({
        pickUpp: pickUp,
        WhiteGlove: true,
        ExtraHelper: true,
        DriverHelp: true,
        TailGate: true,
        Residence: true,
        generalFlag: 0,
        locationFlag: 0,
        servicesFlag: 1,
        productFlag: 0,
      })
    }
  }


  async onClickProducts() {
    let detailsInfo = await this.props.orderDetails;
    console.log("pickup details++++++", JSON.stringify(detailsInfo.orders[0].furniture[0]));
    var ab = detailsInfo.orders[0].pickup;
    let pickUp = [];
    for (let i = 0; i < ab.length; i++) {
      var mytest = ab[i];
      let objj = {
        address: mytest.address,
        pickup_point: mytest.pickup_point
      }
      pickUp.push(objj);
    }
    let fuTest = [];
    detailsInfo.orders[0].furniture.map((fur) => {
      console.log(' ==== furrrr ====', fur)
      fur.map((value) => {
        console.log(' ==== val =====', value)
        fuTest.push(value)
      })
    })
    this.setState({
      pickUpp: pickUp,
      productArray: fuTest,
      generalFlag: 0,
      locationFlag: 0,
      servicesFlag: 0,
      productFlag: 1
    });
  }

  async componentWillMount() {
    const { state } = await this.props.navigation;
    console.log("Callback data======" + JSON.stringify(state.params));
    var Order_IDD = state.params.detail_id;
    console.log("Param Value", Order_IDD)
    this.props.UserActions.Ordered_details(Order_IDD);
    // this.props.UserActions.Ordered_details('5bd9a8ecbf200c4479fa88f6');
  }


  componentWillReceiveProps(nextProps) {
    let detailsInfo = nextProps.orderDetails;
    let new_min = moment.utc(detailsInfo.minTime).format('HH:mm A');
    let new_max = moment.utc(detailsInfo.maxTime).format('HH:mm A');
    let new_date = moment.utc(detailsInfo.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
    this.setState({
      orderId: detailsInfo.orderId,
      date: new_date,
      maxTime: new_max,
      minTime: new_min
    })
  }


  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={[styles.container, { backgroundColor: Constants.Colors.White }]}>
        <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={'Ongoing Order'} />

        <BoxShadow setting={{
          width: Constants.BaseStyle.DEVICE_WIDTH,
          height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 45,
          color: "#000",
          border: 3,
          radius: 5,
          opacity: 0.1,
          x: 0,
          y: 2,
          style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1 }
        }}>
          <SelectDriverMapView navigation={navigate} height={48} controlVisible={false} />
        </BoxShadow>
        <BoxShadow setting={{
          width: Constants.BaseStyle.DEVICE_WIDTH,
          height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.2,
          color: "#000",
          border: 3,
          radius: 5,
          opacity: 0.1,
          x: 0,
          y: 2,
          style: {
            marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
            marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1
          }
        }}>
          <View style={[styles.flexRow, { backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7, }]}>
            <TouchableOpacity onPress={() => this.onClickGeneral()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={this.setControlTextColor(this.state.generalFlag)}>{'General'}</Text>
            </TouchableOpacity>
            <View style={[styles.verticalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} />
            <TouchableOpacity onPress={() => this.onClickLocation()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={this.setControlTextColor(this.state.locationFlag)}>{'Locations'}</Text>
            </TouchableOpacity>
            <View style={[styles.verticalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} />
            <TouchableOpacity onPress={() => this.onClickServices()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={this.setControlTextColor(this.state.servicesFlag)}>{'Services'}</Text>
            </TouchableOpacity>
            <View style={[styles.verticalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} />
            <TouchableOpacity onPress={() => this.onClickProducts()} style={[{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={this.setControlTextColor(this.state.productFlag)}>{'Products'}</Text>
            </TouchableOpacity>
          </View>
        </BoxShadow>

        {this.state.generalFlag == 1 ?
          /********** DRAFT GENERAL ******/
          <Container>
            <Content>
              <Card>
                <View style={[styles.container, { backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18 }]}>
                  <View style={[styles.flexRow]}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                      <Image source={Constants.Images.customer.furniture} style={[styles.picSize,]} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 0.7, alignItems: 'flex-start', justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1, }}>
                      <Text style={[styles.orderTextStyle, { textAlign: 'left', }]}>{'Order Id : '}{this.state.orderId}</Text>
                    </View>
                  </View>
                  <View style={[styles.flexRow, { marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1, alignItems: 'center' }]}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                      <Text style={[styles.orderTextStyle]}>{'Delivery Date'}</Text>
                    </View>
                    <View style={{ flex: 0.7, justifyContent: 'flex-start', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                      <Text style={[styles.orderTextStyle, { textAlign: 'left', }]}>{this.state.date}</Text>
                    </View>
                  </View>
                  <View style={[styles.flexRow, { alignItems: 'center' }]}>
                    <View style={[styles.flexRow, { flex: 1, alignItems: 'center' }]}>
                      <View style={{ justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                        <Text style={[styles.orderTextStyle]}>{'Time Window'}</Text>
                      </View>
                      <TouchableOpacity onPress={() => this.props.onPressInfo()}>
                        <Image source={Constants.Images.customer.info} style={[styles.infoimgSize, { marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} resizeMode={'contain'} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.64, justifyContent: 'flex-start', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                      <Text style={[styles.orderTextStyle, { textAlign: 'left', }]}>{this.state.minTime} - {this.state.maxTime}</Text>
                    </View>
                  </View>

                </View>
              </Card>

            </Content>
          </Container>
          : this.state.locationFlag == 1 ?
            /********** DRAFT LOCATION ******/
            <BoxShadow setting={{
              width: Constants.BaseStyle.DEVICE_WIDTH,
              height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
              color: "#000",
              border: 3,
              radius: 5,
              opacity: 0.1,
              x: 0,
              y: 2,
              style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3, marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }
            }}>

              <ScrollView style={[styles.container, { backgroundColor: '#ffffff'/*,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18*/ }]}>
                <Text style={[styles.BigHeaderTextStyle, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>{'Locations'}</Text>
                <FlatList
                  data={this.state.pickUpp}
                  renderItem={({ item, index }) => <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
                    <Text style={{ color: '#7A95C3', marginBottom: 3 }}>Pickup {index}</Text>
                    <Text style={{ color: '#A4A2A5', marginBottom: 3 }}>{item.address}</Text>
                  </View>}
                />
                <FlatList
                  data={this.state.dropLocation}
                  renderItem={({ item }) => <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
                    <Text style={{ color: '#F9B998', marginBottom: 3 }}>Drop-off</Text>
                    <Text style={{ color: '#A4A2A5', marginBottom: 3 }}>{item.address}</Text>
                  </View>}
                />
              </ScrollView>
            </BoxShadow>
            : this.state.servicesFlag == 1 ?
              /********** DRAFT SERVICE ******/
              <Container>
                <Content>

                  <FlatList
                    data={this.state.pickUpp}
                    renderItem={({ item, index }) =>
                      <Card>
                        <CardItem>
                          <Left>
                            <Text style={{ color: '#83858E' }}>Pickup {index}:</Text>
                          </Left>
                          <CardItem cardBody>
                            <Thumbnail style={styles.imgSize} source={Constants.Images.customer.pickup} />
                            <Text style={{ color: '#83858E' }}>{item.address}</Text>
                          </CardItem>
                        </CardItem>
                        <CardItem>
                          {
                            this.state.WhiteGlove ?
                              <Left>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.customer.white_glove} />
                                <Text style={{ color: '#83858E' }}>White Glove</Text>
                              </Left> : null
                          }
                          {
                            this.state.ExtraHelper ?
                              <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.customer.extra_helper} />
                                <Text style={{ color: '#83858E' }}>Extra Helper</Text>
                              </CardItem> : null
                          }
                        </CardItem>
                        <CardItem>
                          {
                            this.state.Residence ?
                              <Left>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.customer.residential} />
                                <Text style={{ color: '#83858E' }}>Residential</Text>
                              </Left> : null
                          }
                          {
                            this.state.TailGate ?
                              <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.customer.tailgate} />
                                <Text style={{ color: '#83858E' }}>Tailgate</Text>
                              </CardItem> : null
                          }
                        </CardItem>
                        <Body>
                          {
                            this.state.noSelection ?
                              <Text style={styles.noService}>SERVICE NOT SELECTED</Text>
                              : null
                          }
                        </Body>
                      </Card>
                    }
                  />
                </Content>
              </Container>
              : this.state.productFlag == 1 ?
                /********** DRAFT PRODUCT ******/
                <Container>
                  <Content>

                    <FlatList
                      data={this.state.pickUpp}
                      renderItem={({ item, index }) =>

                        <Card>
                          <CardItem>
                            <Left>
                              <Text style={{ color: '#83858E' }}>Pickup {index}:</Text>
                            </Left>
                            <CardItem cardBody>
                              <Thumbnail style={styles.imgSize} source={Constants.Images.customer.pickup} />
                              <Text style={{ color: '#83858E' }}>{item.address}</Text>
                            </CardItem>
                          </CardItem>
                          <FlatList
                            data={this.state.productArray}
                            renderItem={({ item }) =>
                              <CardItem>
                                <CardItem cardBody>
                                  <Thumbnail style={styles.imgSize1} source={{ uri: 'http://13.233.162.221:8283' + item.imagePath }} />
                                  <Body style={{ marginLeft: 4 }}>
                                    <Text style={{ fontSize: 18, color: "#060320" }}>{item.name}</Text>
                                    <Text style={{ fontSize: 14, marginTop: 6, color: '#83858E' }}>{item.description}</Text>
                                  </Body>
                                </CardItem>
                                <Right>
                                  <Text style={{ fontSize: 18 }}>{item.unit}</Text>
                                </Right>
                              </CardItem>
                            }
                          />
                          <View
                            style={{
                              borderBottomColor: '#F3F3F3',
                              borderBottomWidth: 2,
                            }}
                          />
                        </Card>
                      }
                    />
                  </Content>
                </Container>
                : null
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexRow: {
    flexDirection: 'row',
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    marginBottom: 10,
    marginTop: 10,//10,
    marginLeft: 0,//10,
    marginRight: 0,//10,
    borderRadius: 30,
    backgroundColor: Constants.Colors.White,
    borderColor: Constants.Colors.White,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    //fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#53C8E5',
  },
  verticalLine: {
    width: 2,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.small_13.fontSize,
    //fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#5D5D5D',
    textAlign: 'center',
  },
  viewShadow: {
    borderBottomWidth: 5,
    backgroundColor: '#d9d9d9',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  imgSize: {
    width: 12,
    height: 12,
  },
  noService: {
    color: '#83858E',
    textAlign: 'center',
    marginBottom: 35,
    fontSize: 16
  },
  imgSize1: {
    width: 50,
    height: 50,
  },
  picSize: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 16,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
  },
  HeaderTextStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#081933',
  },
  flexRow: {
    flexDirection: 'row',
  },
  orderTextStyle: {
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: '#5D5D5D',
  },
  infoimgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  ButtonStyle: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: Constants.Colors.LightBlue,
    borderColor: Constants.Colors.LightBlue,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    //opacity: 0.87,
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
  },
});
const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  deviceToken: state.user.deviceToken,
  // draftsInfo: state.user.draftsData,
  orderDetails: state.user.orderDetails
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders_Ongoing);
