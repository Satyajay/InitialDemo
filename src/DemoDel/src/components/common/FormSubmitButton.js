import React, { PropTypes } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
let Screen = require("Dimensions").get("window");
import Constants from '../../constants';
const FormSubmitButton = props => {
  const { text, onPress, style, textStyle } = props;

  return (
    <TouchableOpacity
      style={[styles.loginButtonStyle,style]}
      onPress={onPress}
    >
      <Text style={[{ color: Constants.Colors.White, textAlign: "center",fontWeight:'900',fontSize:18},textStyle ]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  loginButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: 'rgb(27,68,125)',
    borderColor: "rgb(27,68,125)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*10,
    borderRadius:5
  }
});

export default FormSubmitButton;
