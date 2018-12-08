import React, { Component } from 'react';
import {Text, View,TouchableOpacity,Image,Dimensions} from 'react-native';
import css from './styles';
const arrow = require('../images/btn-arrow.png');

class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={css.button} activeOpacity={.8}  onPress={() => this.props.onPress()}>
          <Text style={css.buttonTitle}>{this.props.title}</Text>                         
            <Image style={{alignSelf:'center',height:15, width:40}} source={arrow} resizeMode='contain'/>
            </TouchableOpacity>
    
       );
     }
}

export default Button;