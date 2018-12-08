import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Modal, ActivityIndicator, Animated, AsyncStorage, BackHandler, ListView, Alert
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton';
import Header from "../common/Header";
import { Dropdown } from 'react-native-material-dropdown';
const passActive = require("../img/password-hover.png");
import colors from '../common/colors';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const radioDisable = require('../img/radio-inactive.png');
const radioEnable = require('../img/radio-active.png');
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const Apis = require('../utils/Api');
import Icon from 'react-native-vector-icons/Ionicons';


var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})
export default class WalletSend extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,

  });


  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      codesent: false,
      enterEmailLabel: "Wallet Send",
      bodyLabel: "Enter the wallet address you want to send to",
      line1: '#D9DADC',
      mailColor: mailinActive,
      line2: '#D9DADC',
      line3: '#D9DADC',
      radioActive: radioEnable,
      radioinActive: radioDisable,
      animating: false,
      modalShown: false,
      isClose: false,
      text: '',
      arrayholder: [],
      searchedMemes: [],
      inputValue: "",
      flag: true
    };
    //this.arrayholder = []
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.searchUser();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
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
    if (type == 'success') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }

  onmailBlur() {
    this.setState({
      mailColor: mailinActive,
      line1: "#D9DADC"
    })
  }

  onmailFocus() {
    this.setState({
      mailColor: mailActive,
      line1: "#ABBBE1"
    })
  }
  newPasslBlur() {
    this.setState({
      mailColor: mailinActive,
      line2: "#D9DADC"
    })
  }

  dropBlur() {
    this.setState({
      mailColor: mailinActive,
      line3: "red"
    })
  }

  dropFocus() {
    this.setState({
      mailColor: mailActive,
      line3: "green"
    })
  }

  newPassFocus() {
    this.setState({
      mailColor: mailActive,
      line2: "#ABBBE1"
    })
  }

  passVisible() {
    if (this.state.viewColor == '#797979') {
      this.setState({
        viewColor: colors.buttonBg
      })
      this.setState({
        isVisible: false
      })
    } else {
      this.setState({
        viewColor: colors.grayColor
      })
      this.setState({
        isVisible: true
      })
    }
  }

  componentDidMount() {
    const { state } = this.props.navigation;
    this.setState({
      user_wallet_id: state.params.user_wallet,
      WalletCode: state.params.scanCode
    });
    this.state.inputValue = this.state.WalletCode;
  }

  resetPass() {
    this.props.navigation.navigate('ChangePassword');
    this.refs.email.blur();
  }

  getCode(value) {
    this.setState({
      inputValue: value
    });
  }


  scanCode() {
    this.props.navigation.navigate('Scanner', {
      callBack: this.getCode.bind(this)
    });
  }

  forgotPin() {
    this.props.navigation.navigate('ForgotPin')
  }
  selectDigi() {
    this.setState({
      radioActive: radioDisable,
      radioinActive: radioEnable
    });
  }

  selectAud() {
    this.setState({
      radioinActive: radioDisable,
      radioActive: radioEnable
    });
  }


  SearchFilterFunction(text) {
    const newData = this.state.arrayholder.data.filter(function (data) {
      const itemData = data.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text,
      flag: true,
      animating: false
    })
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  sendSubmit() {
    const { inputValue, quantity, password } = this.state;
    if (inputValue == '' || inputValue == null) {
      this.callToast('Please enter wallet address', 'error')
    } else if (quantity == '' || quantity == null) {
      this.callToast('Please enter quantity', 'error')
    } else if (password == '' || password == null) {
      this.callToast('Please enter your PIN', 'error')
    } else {
      AsyncStorage.getItem('auth_key').then((Auth_key) => {
        this.setState({ Auth_key: Auth_key });
        var transfer = {
          user_id: Auth_key,
          password: password,
          token_type: 'AUD',
          user_wallet: inputValue,
          quantity: quantity,
          //from_address: this.state.user_wallet_id
        };
        console.log(transfer)
        this.setState({ animating: true });
        Apis.postAPI('wscointransfer', transfer).then(response => {
          if (response.success == 1 || response.success == "1") {
            this.setState({ animating: false });
            this.callToast('Transaction successfully created.', 'success')
            this.props.navigation.navigate('Wallet');
          } else {
            this.setState({ animating: false });
            this.callToast(response.message, 'error')
          }
        })
      });
    }
  }

  searchUser(searchedText) {
    const { inputValue } = this.state;
    this.setState({ animating: false, flag: true });
    var userSearch = {
      keyword: inputValue,
    };
    Apis.postAPI('wsusersearch', userSearch).then(response => {
      if (response.success == 1 || response.success == "1") {
        this.setState({
          animating: false,
          searchedMemes: response.data,
        },
        );
        console.log(this.state.searchedMemes)
      } else {
        this.setState({ animating: false })
      }
    })
  }

  getWalletAddress(text) {
    if (text.wallet_id == null) {
      Alert.alert("Selected user has no any wallet id")
    } else {
      this.setState({
        inputValue: text.wallet_id,
        flag: false
      })
    }
  }

  renderAdress = (memes) => {
    return (
      <TouchableOpacity onPress={() => this.getWalletAddress(memes)}>
        <Text style={styles.nameDecor}>{memes.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    let animation = this.animatedValue.interpolate({
      inputRange: [0, .3, 1],
      outputRange: [-70, -10, 0]
    })
    let data = [{
      value: '1',
    }, {
      value: '2',
    }, {
      value: '3',
    }];
    var radio_props = [
      { label: 'AOD Coins', value: 0 },
      { label: 'DIGI Coins', value: 1 }
    ];
    // if (this.state.animating) {
    //   return (
    //     <View style={{ transform: [{ translateY: -70 }], height: scaleHeight(67), backgroundColor: this.state.toastColor, position: 'absolute', left: scaleWidth(0), top: scaleHeight(0), right: scaleWidth(0), justifyContent: 'center' }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Send' />
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
          <Modal
            transparent={true}
            onRequestClose={() => null}
            visible={this.state.animating}>
            <View style={css.transaparentView}>
              <ActivityIndicator size="large" color={colors.bdMainRed} />
            </View>
          </Modal>
          <Text style={styles.bodyTitle}> {this.state.bodyLabel} </Text>
          <View style={styles.walletWrap}>
            {/* <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(15), marginRight: scaleWidth(15) }]}>
              <TextInput
                style={css.inputNext}
                auto-correction={false}
                placeholder="Enter Wallet Address"
                // onBlur={ () => this.onmailBlur() }
                // onFocus={ () => this.onmailFocus() }
                returnKeyType='next'
                value={this.state.address}
                onSubmitEditing={() => this.refs.cpass.focus()}
                onChangeText={value => this.setState({ address: value })}
                underlineColorAndroid="transparent"
              />
            </View> */}
            <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(15), marginRight: scaleWidth(15) }]}>
              <TextInput
                style={css.inputNext}
                multiline={false}
                //onSubmitEditing={() => this.refs.cpass.focus()}
                // onChangeText={(text) => this.SearchFilterFunction(text)}
                value={this.state.inputValue}
                onChangeText={value => this.setState({ inputValue: value, isClose: true })}
                onSubmitEditing={this.searchUser.bind(this)}
                returnKeyType='search'
                underlineColorAndroid='transparent'
                placeholder="Search Wallet id by Name"
              />
              {this.state.isClose ? < TouchableOpacity style={{ marginRight: 10, height: 24, width: 24, borderRadius: 12, backgroundColor: "#C2C2C2", alignSelf: 'center', alignItems: 'center', justifyContent: "center" }} onPress={() => this.setState({ searchedMemes: [], inputValue: "", isClose: false })}>
                <Icon name="md-close" size={16} color='#fff' /></TouchableOpacity> : null
              }
            </View>
            {
              this.state.flag ?
                <ListView
                  dataSource={ds.cloneWithRows(this.state.searchedMemes)}
                  //enableEmptySections={true}
                  renderRow={this.renderAdress} /> : null}

            {/* {
              this.state.flag ?
                <ListView
                  dataSource={this.state.dataSource}
                  // renderSeparator={this.ListViewItemSeparator}
                  renderRow={(rowData) => <Text style={styles.rowViewContainer}
                    onPress={this.GetListViewItem.bind(this, rowData.wallet_id)} >{rowData.name}</Text>}
                  enableEmptySections={true}
                  style={{ marginTop: 5, borderBottomWidth: 0 }}
                /> : null} */}
            <View style={styles.radioBox}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={{ color: 'grey', marginLeft: Platform.OS === 'ios' ? scaleWidth(10) : scaleWidth(10), marginRight: Platform.OS === 'ios' ? scaleWidth(10) : scaleWidth(10), fontSize: Platform.OS === 'ios' ? normalizeFont(14) : normalizeFont(15), }}>Select Coins:</Text>
              </View>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: Platform.OS === 'ios' ? scaleWidth(10) : scaleWidth(10), marginRight: Platform.OS === 'ios' ? scaleWidth(10) : scaleWidth(10), }} onPress={() => this.selectAud()}>
                <Text style={{ color: 'grey', fontSize: Platform.OS === 'ios' ? normalizeFont(14) : normalizeFont(15), }}>AUD Coins</Text>
                <Image source={this.state.radioActive} style={styles.radioIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: Platform.OS === 'ios' ? scaleWidth(10) : scaleWidth(15), marginRight: Platform.OS === 'ios' ? scaleWidth(10) : scaleWidth(15), }} onPress={() => this.selectDigi()} >
                <Text style={{ color: 'grey', fontSize: Platform.OS === 'ios' ? normalizeFont(14) : normalizeFont(15), }}>DIGI Coins</Text>
                <Image source={this.state.radioinActive} style={styles.radioIcon} />
              </TouchableOpacity>
            </View>
            {/* <View style={{ marginLeft: scaleWidth(15), marginRight: scaleWidth(15), }}>
              <Dropdown
                ref="cpass"
                textColor='#B6B6B6'
                baseColor="#D9DADC"
                fontSize={14}
                labelFontSize={12}
                value='Enter Quantity'
                onChangeText={value => this.setState({ quantity: value })}
                blur={() => this.dropBlur()}
                focus={() => this.dropFocus()}
                data={data} />
            </View> */}
            <View style={[css.topView, { borderBottomColor: this.state.line1, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(15), marginRight: scaleWidth(15) }]}>
              <TextInput
                ref="cpass"
                style={css.inputNext}
                auto-correction={false}
                placeholder="Enter Quantity"
                // onBlur={ () => this.onmailBlur() }
                // onFocus={ () => this.onmailFocus() }
                keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
                returnKeyType='done'
                onSubmitEditing={() => this.refs.cpass1.focus()}
                onChangeText={value => this.setState({ quantity: value })}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={[css.topView, { borderBottomColor: this.state.line2, borderBottomWidth: scaleWidth(2), marginLeft: scaleWidth(15), marginRight: scaleWidth(15), }]}>
              <TextInput
                ref="cpass1"
                style={css.inputNext}
                auto-correction={false}
                placeholder="Enter PIN"
                // onBlur={ () => this.newPasslBlur() }
                // onFocus={ () => this.newPassFocus() }
                returnKeyType='done'
                //maxLength={4}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                secureTextEntry={this.state.isVisible}
                onChangeText={value => this.setState({ password: value })}
                underlineColorAndroid="transparent"
              />
            </View>
            <TouchableOpacity onPress={() => this.forgotPin()}>
              <Text style={styles.pinBox}>Forgot PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={() => this.sendSubmit()}>
              <Text style={styles.scanText}>SUBMIT</Text>
            </TouchableOpacity>
            <Text style={styles.orStyle}>Or</Text>
            <TouchableOpacity style={styles.scanBtn} onPress={() => this.scanCode()}>
              <Text style={styles.scanText}>SCAN WALLET QR CODE</Text>
            </TouchableOpacity>
            <View style={{ height: scaleHeight(50) }}>
            </View>
          </View>
        </ScrollView>
        <Animated.View style={{ transform: [{ translateY: animation }], height: scaleHeight(67), backgroundColor: this.state.toastColor, position: 'absolute', left: scaleWidth(0), top: scaleHeight(0), right: scaleWidth(0), justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: normalizeFont(16), textAlign: 'center' }}>
            {this.state.message}
          </Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  walletWrap: {
    marginLeft: scaleWidth(20),
    marginRight: scaleWidth(20),
    borderRadius: scaleHeight(10),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(20),
    borderColor: 'red',
    height: "80%",
    elevation: 3,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#A9A9A9',
    backgroundColor: '#FFFFFF',

  },
  bodyTitle: {
    marginTop: scaleHeight(25),
    textAlign: 'center',
    fontSize: normalizeFont(15),
    color: '#5A5A5B',
    marginLeft: scaleWidth(70),
    marginRight: scaleWidth(70),
  },
  orStyle: {
    textAlign: 'center',
    marginBottom: scaleHeight(20),
    marginTop: scaleHeight(20),
    color: 'black'
  },
  scanBtn: {
    width: '75%',
    alignSelf: 'center',
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(5),
    backgroundColor: '#04188B',
    shadowColor: '#04188B',
    elevation: 2,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 5,
    shadowOpacity: 0.8
  },
  scanText: {
    color: colors.buttonText,
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(14),
  },
  pinBox: {
    textAlign: 'right',
    marginTop: scaleHeight(10),
    color: '#04188B',
    marginRight: scaleWidth(30),
  },
  submitBtn: {
    paddingVertical: scaleHeight(20),
    width: scaleWidth(120),
    alignSelf: 'center',
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(22),
    backgroundColor: colors.buttonBg,
    shadowColor: '#24BDFD',
    elevation: 2,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 5,
    shadowOpacity: 0.8
  },
  radioBox: {
    flexDirection: 'row',
    marginTop: scaleHeight(30),
    justifyContent: 'center',
    marginLeft: scaleHeight(18),
    marginRight: scaleHeight(18),
  },
  radioIcon: {
    marginLeft: scaleWidth(4),
    height: scaleHeight(15),
    width: scaleWidth(15),
    marginTop: Platform.OS === 'ios' ? scaleHeight(2) : scaleHeight(4)
  },
  rowViewContainer: {
    fontSize: 14,
    marginLeft: 18,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 15,
  },

  TextInputStyleClass: {
    height: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0
  },
  nameDecor: {
    marginTop: scaleHeight(15),
    marginLeft: scaleWidth(17),
    marginRight: scaleWidth(17),
    marginBottom: scaleHeight(5)
  }
})