import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import css from './styles';
const backImg = require('../images/back.png');
class Header extends Component {
    render() {
        return (
        <View  style={css.gredient}>
            {Platform.OS === 'ios' ? <View style={css.statusBar}></View> : null}
            <View style={css.menuContainer}>
                <View style={css.backBtnView}>
                {
                !this.props.noBackBtn?<TouchableOpacity onPress={() => this.props.onPress()}  >
                    <View style={css.backBtnView}>
                    <View style={css.circileLeft}>
                    <Image  style={{height:10, width:15}} source={backImg} resizeMode='contain'/>
                    </View>
                        
                    </View>
                </TouchableOpacity>:null
                }
                </View>
                    <View style={css.textContainer}>
                    <View style={[css.textContainer2]}> 
                        <Text style={css.headerText}>{this.props.HeaderText}</Text>
                        </View>
                    </View>
        
                    <View style={{ width: 50,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                 
                     </View>
            </View>
          </View>
       );
     }
}

export default Header;