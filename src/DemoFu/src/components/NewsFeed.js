
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,Image,
  View,ScrollView,
  StatusBar
} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../common/colors'
//export default class NewsFeed extends React.Component {
export default class NewsFeed extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:null
     });


  constructor() {
    super()
    this.state = {
      page: "HomeScreen",
    }
  }

   render() {
    return (
      <View style={styles.container}>
       
        <View style={{backgroundColor:'#272262',marginBottom:10,top:0,}}>
        <Text style={styles.welcome}>
          Newsfeed
        </Text>
        </View> 
        <ScrollView>
        <View style={styles.container}>
          <Card>
            <View style={{flex: 1,flexDirection: "row"}}>
              <Image source={require('../images/dev3.jpg')} style = {styles.BorderClass} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.name}> Patrica Cullen </Text>
                  <Text style={styles.time}> 2 hrs ago </Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.content}> Well I Certainly face the problem :) </Text>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                <Image resizeMode="cover" source={require('../images/dev3.jpg')} style = {styles.imageContent} />
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.like}> 127 Likes </Text>
                  <Text style={styles.comment}> 127 Comments </Text>
                  <Text style={styles.share}> 127 Shares </Text>
            </View>
            <CardAction seperator={true} inColumn={false} style={{backgroundColor:'#F4F3F8'}}>
             <View style={{flex: 1,flexDirection: "row"}}>
                <Text style={styles.like}> 127 Likes </Text>
                <Text style={styles.comment}> 127 Comments </Text>
                <Text style={styles.share}> 127 Shares </Text>
            </View>
          </CardAction>
          </Card>

          <Card>
            <View style={{flex: 1,flexDirection: "row"}}>
              <Image source={require('../images/dev3.jpg')} style = {styles.BorderClass} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.name}> Patrica Cullen </Text>
                  <Text style={styles.time}> 2 hours ago </Text>
              </View>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.content}> Well I Certainly face the problem :) </Text>
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                <Image resizeMode="cover" source={require('../images/dev3.jpg')} style = {styles.imageContent} />
            </View>
            <View style={{flex: 1,flexDirection: "row"}}>
                  <Text style={styles.like}> 127 Likes </Text>
                  <Text style={styles.comment}> 127 Comments </Text>
                  <Text style={styles.share}> 127 Shares </Text>
            </View>
            <CardAction seperator={true} inColumn={false} style={{backgroundColor:'#F4F3F8'}}>
               <View style={{flex: 1,flexDirection: "row"}}>
                
                  <Text style={styles.like}> 127 Likes </Text>
                 
                  <Text style={styles.comment}> 127 Comments </Text>
                  <Text style={styles.share}> 127 Shares </Text>
               </View>
          </CardAction>
          </Card>

        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F0EFF4'
  },
  // statusBar:{
  //   height: (Platform.OS === 'ios') ? 20 : 0,
  // },
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
    fontWeight: 'bold',
    color:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  time:{
    fontSize: 15,
    marginBottom: 20,
    color:colors.grayColor
  },
  content:{
    fontSize: 15,
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
    borderRadius:7
  },
  like:{
    fontSize: 12,
    margin:10,
    alignItems:'flex-start',
    flex:1
  },
  comment:{
    fontSize: 12,
   margin:10,
    alignItems:'center',
    justifyContent:'center',
   
  },
  share:{
    fontSize: 12,
    margin:10,
    textAlign:'right',
    flex:1
  }
});
