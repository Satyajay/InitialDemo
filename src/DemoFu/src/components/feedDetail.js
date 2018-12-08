/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,Image,
  View,ScrollView,TouchableOpacity,TextInput,TouchableHighlight,ImageBackground,
  StatusBar,FlatList,Dimensions
} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive";
import Header from "../common/Header"
import colors from '../common/colors'
import Icon from 'react-native-vector-icons/Ionicons';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const deviceWidth = Dimensions.get('window').width;
console.log(deviceWidth);
//export default class Privacy extends Component {
export default class FeedDetail extends Component {

  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
      text: 'Write a comment..' 
    }
  }
  static navigationOptions = ({ navigation }) => ({
    header:null
 });

  _renderTitle (title) {
    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 20}}>{title}</Text>
      </View>
    )
  }

  onSubmitEdit = () => {
    // whatever you want to do on submit
  }
  

  render() {
    return (
      <View style={styles.container}>
          <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Detail' rightBtn={true}/>
        <ScrollView showsVerticalScrollIndicator={false}> 
        <View style={styles.container}>
            <View style={{flex: 1,flexDirection: "row"}}>
              <Image source={require('../images/dev3.jpg')} style = {styles.BorderClass} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.name}> Patrica Cullen </Text>
                  <Text style={styles.time}> 2 hours ago </Text>
              </View>
                <View style={{height:30, width:30, alignSelf:'center', marginRight:10, backgroundColor:'green'}}></View>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.content}> Well I Certainly face the problem :) </Text>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                <ImageBackground imageStyle={{borderRadius:6}} resizeMode="cover" source={require('../images/dev3.jpg')} style = {styles.imageContent} >
                  <View style={{top:5, marginLeft:width-60, height:34,width:34,borderRadius:17, backgroundColor:'red'}}></View>
                </ImageBackground>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.like}> 127 Likes </Text>
                <TouchableOpacity style={styles.share}> 
                    <View style={{height:30, width:30,alignSelf:'flex-end', backgroundColor:'red'}}></View>
                </TouchableOpacity>
                  {/*<Text style={styles.share}> 127 Shares </Text>*/}
            </View>
            <View style={{flex: 1,flexDirection: "row",margin:10}}>
                  <Text style={styles.commentCount}> 27 Comments </Text>
            </View>

            <View style={{flex: 1,flexDirection: "row",backgroundColor:'#fff',padding:10}}>
              <Image source={require('../images/dev3.jpg')} style = {styles.commentImage} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.commentName}> Patrica Cullen </Text>
                  <Text style={styles.commentContent}>Lorem ipsum dolor dolor dolor dolordolor dolor dolor dolor dolor dolor dolor dolor</Text>
                  <Text style={styles.commentTime}> 2 hours ago </Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: "row",backgroundColor:'#fff',padding:10}}>
              <Image source={require('../images/dev3.jpg')} style = {styles.commentImage} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.commentName}> Patrica Cullen </Text>
                  <Text style={styles.commentContent}>Lorem ipsum dolor dolor dolor dolordolor dolor dolor dolor dolor dolor dolor dolor</Text>
                  <Text style={styles.commentTime}> 2 hours ago </Text>
              </View>
            </View>
           

        </View>
      </ScrollView>
       
         <View style={{height:50,width:'100%', backgroundColor:"#fefefe", flexDirection:'row'}}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
  statusBar:{
    height: (Platform.OS === 'ios') ? 20 : 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'white'
  },
  BorderClass:
  {
     margin:10,
     width: 60,
     height: 60,
     borderRadius: 30
  },
  commentImage:
  {
     margin:10,
     width: 40,
     height: 40,
     borderRadius: 20
  },
  name: {
    fontSize: 15,
    marginTop: 25,
    fontWeight: '600',
    color:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  time:{
    fontSize: 13,
    marginBottom: 20,
    color:colors.grayColor
  },
  content:{
    fontSize: 14,
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    marginBottom:5,
    color:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  imageContent:{
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    height:220,
    //marginBottom:5,
    flex:1,
    borderRadius:6,
    width: deviceWidth,
  },
  like:{
    fontSize: 15,
    margin:10,
    alignItems:'flex-start',
    flex:1
  },
  commentCount:{
    fontSize: 15,
    fontWeight:'600',
    color:'black'
  },
  comment:{
    fontSize: 15,
    margin:10,
    alignItems:'center',
    justifyContent:'center',
   
  },
  share:{
   // fontSize: 15,
    margin:10,
    height:30,
    width:30,
    flex:1
  },
  input:{
   padding:10,
   margin:10,
   flex:1
  },
  commentName:{
    marginTop:10,
    fontSize:15,
    fontWeight: '400',
    color:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  commentContent:{
    marginTop:6,
    color:'#000',
    opacity:0.8,
    fontSize:14,
    fontWeight:'500'
  },
  commentTime:{
    marginTop:10,
    color:colors.grayColor,
    fontSize:13,
    opacity:0.8,
    fontWeight:'500'
  },

});
