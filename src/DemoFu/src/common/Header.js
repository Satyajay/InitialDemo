import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import css from './styles';
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
                        <Icon  name="md-arrow-back" size={30} color='#fff'/> 
                    </View>
                </TouchableOpacity>:null
                }
                </View>
                    <View style={css.textContainer}>
                        <Text style={css.headerText}>{this.props.HeaderText}</Text>
                    </View>
                    {
                    this.props.rightBtn?<View style={{ width: 50,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                    </View>:null
                    }
                    <View style={{ width: 50,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                   
                      {
                    this.props.filter?<TouchableOpacity style={{ width: 50,
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                           // backgroundColor:'#'
                            }}>
                    </TouchableOpacity>:null
                    }
                     </View>
            </View>
          </View>
       );
     }
}

export default Header;