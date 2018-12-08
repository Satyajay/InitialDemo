/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet,ImageBackground,TouchableOpacity, Image, View, Keyboard, ViewPropTypes } from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Record from './recording';
import Actions from './Actions';
import Color from './Color';
const headerBg = require("../images/headerImg.png");
const recorderImg = require("../images/recorder.png");

export default class InputToolbar extends React.Component {

  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      position: 'absolute',
    };
  }


  click = () =>{
      this.props.openChat();
    }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    this.setState({
      position: 'relative',
    });
  }

  keyboardWillHide() {
    this.setState({
      position: 'absolute',
    });
  }

  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }
   renderRecord() {
    if (this.props.renderSend) {
      return this.props.renderRecord(this.props);
    }
    return <Record {...this.props} />;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} />;
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <ImageBackground source={headerBg}
        style={[styles.container, this.props.containerStyle, { position: this.state.position }]}
      >
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
           {this.renderRecord()}
          {/*<TouchableOpacity onPress={this.props.openChat}>
         <View style={styles.iconWrap}>
              <Image style={styles.icons} source={recorderImg}>
         </Image>
         </View>
         </TouchableOpacity>*/}
        </View>
        {this.renderAccessory()}
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    //backgroundColor: 'green',
    bottom: 0,
    left: 0,
    right: 0,
   // height:60
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
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
});


InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderRecord:null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  onPressActionButton: () => {},
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderRecord: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};