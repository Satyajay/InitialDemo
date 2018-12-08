import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import Header from "../common/Header"
import Grid from 'react-native-grid-component';
const image1 = require('../images/dev1.jpg');
const image2 = require('../images/dev2.jpg');
const image3 = require('../images/dev3.jpg');

const data = [
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "Free",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "$9",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
     {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "Free",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "$9",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
     {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "Free",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "$9",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
     {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "Free",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    },
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        name: "Ahmad Naser"
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "$9",
        name: "Raymond Manning"
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        name: "Cecilia Clayton"
    }
]



export default class ViewAll extends Component {
    static navigationOptions = ({ navigation }) => ({
       header: null,
    });

_renderItem = (data, i) => (
    <TouchableOpacity  style={[styles.item]} key={i} onPress={()=>this.openDetail()}>
    <Image style={{height:'100%',width:'100%',borderRadius:5}} key={i} source={data.image}/>
     </TouchableOpacity>
  );
 
  openDetail() {
        this.props.navigation.navigate('NewsDetail')
    }
   
  _renderPlaceholder = i => <View style={styles.item} key={i} />;
 
  render() {
    return (
    <View style={{flex:1}}>
   <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Nursing Room' filter={true}/>
      <Grid
        showsVerticalScrollIndicator={false}
        style={styles.list}
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={data}
        itemsPerRow={3}
      />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 110,
    margin: 6,
    borderRadius:5
  },
  list: {
    flex: 1,
    
  }
});