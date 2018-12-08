import React, { Component } from 'react';
import {Text, View,TouchableOpacity,Image,Dimensions} from 'react-native';
import css from './styles';
import colors from '../common/colors';
const arrow = require('../images/btn-arrow.png');

class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={[css.button,{
                backgroundColor:colors.buttonBg
            }]} activeOpacity={.8}  onPress={() => this.props.onPress()}>
          <Text style={[css.buttonTitle,{color:'white'}]}>{this.props.title}</Text>                         
            </TouchableOpacity>
    
       );
     }
}

export default Button;