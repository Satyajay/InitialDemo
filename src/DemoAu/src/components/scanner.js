import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert
} from 'react-native';

import Camera from 'react-native-camera';
import PropTypes from 'prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from "../common/Header";
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"

export default class Scanner extends Component {

  onSuccess(e) {
    Alert.alert(e.data);
    this.props.navigation.navigate('WalletSend', { scanCode: e.data });
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }

  constructor(props) {
    super(props);
    this.state = {
      qrcode: ''
    }
  }


  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Please Scan Your QR Code!
          </Text>
        }
      // bottomContent={
      //   <TouchableOpacity style={styles.buttonTouchable}>
      //     <Text style={styles.buttonText}>OK. Got it!</Text>
      //   </TouchableOpacity>
      // }
      />
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: normalizeFont(18),
    padding: scaleHeight(32),
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: normalizeFont(21),
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: normalizeFont(16),
  },
});