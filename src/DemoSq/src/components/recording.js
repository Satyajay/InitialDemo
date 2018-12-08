/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text,Image, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Color from './Color';
const sendImg = require("../images/send.png");
const recorderImg = require("../images/recorder.png");
export default function Record({ text, containerStyle, onSend,onRecord, children, textStyle, label, alwaysShowSend }) {
  if (alwaysShowSend || text.trim().length == 0) {
    //alert(alwaysShowSend);
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        accessibilityTraits="button"
        onPress={() => {
          onRecord({ text: text.trim() }, true);
        }}
      >
       <View style={styles.iconWrap}>
              <Image style={styles.icons} source={recorderImg}>
         </Image>
         </View>
      </TouchableOpacity>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  iconWrap:{
    marginRight:5,
    marginBottom:5,
    top:1,
    height:36,
    alignItems: "center",
    width:36,
    borderRadius:18,
    backgroundColor:'white'
  },
    icons:{
      top:8,
      height:20,
      width:11,
    },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

Record.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
  alwaysShowSend: false,
};

Record.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
  alwaysShowSend: PropTypes.bool,
};