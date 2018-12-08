import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
import colors from "../common/colors"
const image1 = require('../images/dev1.jpg');
const image2 = require('../images/dev2.jpg');
const image3 = require('../images/dev3.jpg');
const data = [
    {
        image: image1,
        title: 'Meme',
        view: 'View All',
        data: [{
            image: image1,
        }, {
            image: image2,
        }, {
            image: image3,
        }]
    }
]
export default class Following extends Component {

     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

    constructor(props) {
        super(props);
         this.state = { FlatListItems:
     [
    {
    name: 'Abby',
    is_follow:true
    },{
    name: 'Alice',
    is_follow:true
    },{
    name: 'Amelia',
    is_follow:true
    },{
    name: 'Courtney',
    is_follow:false
    }, {
    name: 'Emma',
    is_follow:false
    }, {
    name: 'Freya',
    is_follow:true
    }, {
    name: 'Hannah',
    is_follow:false
    }, {
    name: 'Jessica',
    is_follow:false
    }, {
    name: 'Libby',
    is_follow:false
    }, {
    name: 'Madison',
    is_follow:false
    } 
    ]}
    }

    componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }
   
FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          alignSelf:'center',
          opacity:0.8,
          backgroundColor: '#F2F2F2',
        }}
      />
    );
  }
    
    render() {
        
        
        return (
            <View style={{backgroundColor:'#fff'}}>
           <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Following' />
               <ScrollView>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ this.state.FlatListItems }   
                ItemSeparatorComponent = {this.FlatListItemSeparator}
                renderItem={({item}) =>   
               <View style={styles.row}>
                   <TouchableOpacity style={{alignSelf:'center'}} onPress={() => this.props.navigation.navigate('MyProfile',{is_user:false,is_follow:true})}>
                   <Image style={styles.avatar} source={image1}/>
                   </TouchableOpacity>
               <Text style={styles.name}> {item.name} </Text>
           
               <TouchableOpacity style={styles.unfollowBtn}>
                <Text style={[css.buttonText,{alignSelf:'center',color:colors.buttonBg}]}>Unfollow</Text>
               </TouchableOpacity>
              </View>}
         />
         <View style={css.tempView}></View>
          </ScrollView>
          </View>
        )
    }

}


const styles = StyleSheet.create({
 row:{height:70, width:'100%', flexDirection:'row'},

 avatar:{marginLeft:15, height:44, width:44, borderRadius:22,alignSelf:'center'},

 name:{ marginLeft:10, fontSize:15, fontWeight:'400', alignSelf:'center'},

 followBtn:{height:30, right:15, borderRadius:5, position: 'absolute', width:120, backgroundColor:colors.buttonBg,marginRight:0, alignSelf:'center', alignItems:'center', flexDirection:'row', justifyContent: "center"},

 unfollowBtn:{height:30, right:15, borderRadius:5, position: 'absolute', width:120, borderColor:colors.buttonBg,marginRight:0, borderWidth:1,alignSelf:'center', alignItems:'center', flexDirection:'row', justifyContent: "center",}

})
