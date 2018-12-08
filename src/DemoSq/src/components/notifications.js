import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image,Switch,Modal,
    TextInput, TouchableOpacity,ImageBackground, Platform, ScrollView, FlatList, KeyboardAvoidingView,BackHandler,AsyncStorage
} from 'react-native';
const { width, height } = Dimensions.get('window');
import css from '../common/styles';// Styling page
 import Header from "../common/Header"
const profileImg = require('../images/profilepic.png');
const Apis =require('../utils/Api');

export default class Notifications extends Component {

     static navigationOptions = ({ navigation }) => ({
       header: null,
    });

    constructor(props) {
        super(props);
         this.state = {
             FlatListItems:[{
               message:"User X is attending XYZ Event at ABC",
               eventDate:"2nd January, 2018",
               profileImg:profileImg
             },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },{
              message:"User X is attending XYZ Event at ABC",
              eventDate:"2nd January, 2018",
              profileImg:profileImg
            },],
             auth_key:null,
             content_id:null
         }
    }

    componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    componentDidMount() {
       AsyncStorage.getItem('auth_key').then((Auth_key) => {
       this.setState({
         auth_key:Auth_key
       });
       });
      const {state} = this.props.navigation;
      // this.getAllNotifications();
      
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }




     getAllNotifications(){
     this.setState({animating: true});
         var data={
           auth_key:this.state.auth_key,
           offset:0,
           limit:20
         };
         Apis.postAPI("getmynotifications.json",data).then(data => {
          
           if(data.status == '1'){
             console.log("+Get all Notifications------"+JSON.stringify(data));
            
             this.setState({
               animating: false,
               FlatListItems:data.commented_result,
               commentCount:data.count_feeds
              });
           }else{
             console.log(data.message);
             this.setState({animating: false});
           }
         });
    
   }


   
FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          alignSelf:'center',
          opacity:0.8,
         // backgroundColor: '',
        }}
      />
    );
  }

  _renderItem = ({item}) => (
    <View style={{marginTop:10, marginBottom:0,flex: 1,left:20,width:width-40,flexDirection: "row",backgroundColor:'#f2f2f2'}}>
              <Image source={item.profileImg} style = {styles.commentImage} />
              <View style={{flex: 1,flexDirection: "column"}}>
                  <Text style={styles.commentContent}>{item.message}</Text>
                  <Text style={styles.commentContent}>Dated</Text>
                  <Text style={[css.time,{marginTop:5,opacity:1}]}>{item.eventDate}</Text>
              </View>
    </View>
  );

    
    render() {
        
        
        return (
            <View style={{backgroundColor:'#fff', flex:1}}>
           <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Notifications'  noBackBtn={true}/>
              
               <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:0, height:'100%'}}>
              <FlatList
                extraData={this.state}
                ref='flatlist'
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<View style={{marginTop:30,height:60, width:'100%'}}><Text style={{alignSelf:'center', textAlign:'center'}}>No Record Found</Text></View>}
                data={ this.state.FlatListItems }   
                ItemSeparatorComponent = {this.FlatListItemSeparator}
                renderItem={this._renderItem}
                keyExtractor={item => item.idx}
                inverted
                
         />
        
          </ScrollView>
          {/* <Modal
                transparent={true}
                onRequestClose={() => null} 
                visible={this.state.animating}>
                  <View style={css.transaparentView}>
                 <ActivityIndicatorExample
              animating = {this.state.animating}/>
              </View>
              </Modal>
             */}
          </View>
        )
    }

}


const styles = StyleSheet.create({
 row:{flex:1, width:'100%', flexDirection:'row'},

 avatar:{marginLeft:15, height:44, width:44, borderRadius:23,alignSelf:'center'},

 name:{ marginLeft:10, fontSize:15, fontWeight:'400', alignSelf:'center'},
  commentName:{
    marginTop:3,
    fontSize:14,
    fontWeight: '400',
    color:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  commentContent:{
    fontSize:12,
    marginTop:5,
    color:'#000',
    
  },

  commentImage:
  {
     margin:10,
     width: 50,
     height: 50,
     borderRadius: 25
  },

  container2: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
   // alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 3,
    height: 40,
    fontSize: 15,
  },

})
