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
export default class Likes extends Component {

     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

    constructor(props) {
        super(props);
         this.state = { FlatListItems:
     [
    {
    name: 'Abby',
    is_follow:false
    },{
    name: 'Alice',
    is_follow:true
    },{
    name: 'Amelia',
    is_follow:false
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
            <View style={{backgroundColor:'#fff', flex:1}}>
           <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Comments' />
              
               <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:0, height:'100%'}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ this.state.FlatListItems }   
                ItemSeparatorComponent = {this.FlatListItemSeparator}
                renderItem={({item}) =>   
               <View style={styles.row}>
                   <TouchableOpacity style={{alignSelf:'center'}} onPress={() => this.props.navigation.navigate('MyProfile',{is_user:false,is_follow:item.is_follow})}>
                   <Image style={styles.avatar} source={image1}/>
                   </TouchableOpacity>
               <Text style={styles.name}> {item.name} </Text>
              </View>}
         />
         <View style={css.tempView}></View>
          </ScrollView>
            <View style={{height:50,width:'100%', backgroundColor:"#fefefe", flexDirection:'row',borderTopWidth:2, borderColor:'red'}}>
            <TextInput
            multiline = {true}
            numberOfLines = {3}
            underlineColorAndroid='transparent'
            style={{height: 50,padding:20,flex:1}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.text}
            //value={this.state.text}
          >
          </TextInput> 
          <View style={{height:50, width:50, backgroundColor:'blue'}}></View>
         </View>
          </View>
        )
    }

}


const styles = StyleSheet.create({
 row:{height:60, width:'100%', flexDirection:'row'},

 avatar:{marginLeft:15, height:44, width:44, borderRadius:23,alignSelf:'center'},

 name:{ marginLeft:10, fontSize:15, fontWeight:'400', alignSelf:'center'},


})
