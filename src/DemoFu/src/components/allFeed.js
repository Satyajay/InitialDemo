import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
import Header from "../common/Header"
import colors from '../common/colors'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Icon from 'react-native-vector-icons/Ionicons';
const deselect = require("../images/favorite-unselected.png");
const selected = require("../images/fill-favorite.png");
const unlikeIcon = require("../images/unlike.png");
const likeIcon = require("../images/like.png");
const likeedIcon = require("../images/likes.png");
const commentIcon = require("../images/comment.png");
const shareIcon = require("../images/share-gray.png");



export default class MyFeeds extends Component {

     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

   state = {
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
     alertItemName = (item) => {
      alert(item.name)
   }

   detail(){
     this.props.navigation.navigate("FeedDetail");
   }

    render() {
      var dataArray = [];

        for(var i=0;i<5;i++){
            dataArray.push( <View  key = {i} source={i} style={styles.container}>
         <Card style={{width:'100%'}}>
            <View style={{flex: 1,flexDirection: "row"}}>
              <Image source={require('../images/dev3.jpg')} style = {styles.BorderClass} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.name}> Patrica Cullen </Text>
                  <Text style={styles.time}> 2 hrs ago </Text>
              </View>
              <TouchableOpacity style={[css.favourite,{marginRight:10}]}>
              <Image style={css.favourite} source={deselect}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.content}> Well I Certainly face the problem :) </Text>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                <TouchableOpacity onPress={() => this.detail()} style = {styles.imageContent}>
                <Image resizeMode="stretch" source={require('../images/dev3.jpg')} style = {{height:'100%', width:'100%', borderRadius:6}} />
                </TouchableOpacity >
            </View>
            <View style={css.staticRow}>
                <TouchableOpacity style={css.staticLikesContaner} onPress={()=>this.props.navigation.navigate("Likes")}>
                  <Image style={css.likedImg} source={likeedIcon}/>
                   <Text style={css.likedLbl}> 127 Likes </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={css.staticLikesContaner} onPress={()=>this.props.navigation.navigate("Comments")}>
                  <Text style={styles.comment2}> 127 Comments </Text>
                  </TouchableOpacity>
                  <Text style={styles.share}> 127 Shares </Text>
            </View>
            <CardAction seperator={true} inColumn={false} style={{marginTop:10, backgroundColor:'#F4F3F8'}}>
               <View style={css.actionView}>
                <TouchableOpacity style={css.likeView}>
                    <Image style={css.likeImage} source={unlikeIcon}/>
                  <Text style={styles.like}> Like </Text>
                 </TouchableOpacity>
                  <TouchableOpacity style={css.commentView} onPress={() => this.detail()}>
                    <Image style={css.commentImg} source={commentIcon}/>                 
                  <Text style={styles.comment}>Comment </Text>
                     </TouchableOpacity>
                   <TouchableOpacity style={css.shreView}>
                    <Image style={css.shareImg} source={shareIcon}/>
                    <Text style={styles.share2}>Share </Text>
                    </TouchableOpacity>
               </View>
          </CardAction>
          </Card>

        </View>
            )
        }
        return (
            <View style={{backgroundColor:'#fff'}}>
           <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Newsfeed' filter={true} noBackBtn={true}/>      

        <ScrollView showsVerticalScrollIndicator={false} style={{bottom:0}}>
          {dataArray}
        <View style={css.tempView}></View>
      </ScrollView>    
          </View>
        )
    }

}

const styles = StyleSheet.create ({
   container: {
      //padding: 10,
      marginTop: 3,
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   },
   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'white',
    top:0,
    
  },
  BorderClass:
  {
     margin:10,
     width: 60,
     height: 60,
     borderRadius: 30
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
    borderRadius:6
  },
    like:{
    fontSize: 13,
    color:colors.grayColor,
    margin:10,
    alignSelf:'center',    
    alignItems:'flex-start',
    flex:1
  },
  comment:{
    fontSize: 13,
    color:colors.grayColor,
    alignSelf:'center',    
    margin:10,
    alignItems:'center',
    justifyContent:'center',
   
  },
   comment2:{
    fontSize: 14,
    color:colors.grayColor,
    margin:10,
    marginRight:0,
    alignItems:'flex-end',
    justifyContent:'flex-end',
   
  },
  share:{
    color:colors.grayColor,
    fontSize: 14,
    margin:8,
    textAlign:'right',
    alignSelf:'center',
    alignItems:'flex-end',
    flex:1
  },
   share2:{
    color:colors.grayColor,
    fontSize: 13,
    width:'25%',
    margin:8,
    textAlign:'right',
    alignItems:'flex-end',
    flex:1
  }
  
})