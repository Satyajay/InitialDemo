import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Animated, ImageBackground, BackHandler,AsyncStorage,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList, StatusBar,Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import Header from "../common/Header"
import colors from '../common/colors';
const Apis = require('../utils/Api');
import css from '../common/styles';
import Grid from 'react-native-grid-component';
const etheleteBanner = require('../images/atheleticsbg.png');
const atheletImg = require('../images/atheletics.png');
const profilePic = require('../images/profilepic.png');


export default class Athletics extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            header:"Athletics",
            userId:null,
            subCategoryList: [],
            data: [],
            animating:false
        }
    }

    componentDidMount() {
        const { state } = this.props.navigation;
            console.log( "subcategory+++++++++++" + JSON.stringify(state.params.categoryArray));
           that=this;
            setTimeout(function() {
                    that.setState({
                    subCategoryList:state.params.categoryArray
                });
            },500);
       
       
       
        
    
      }

 
    // -----------------------------
    

    componentWillMount() {
         const { state } = this.props.navigation;
          this.setState({
                    subCategoryList:state.params.categoryArray
                });
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    backgrondImage(url){
      return "http://52.14.89.103:3000/"+url
    }

    _renderItem = (data, i) => (
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('GameList',{
            id:data._id
        })} style={[styles.item, { backgroundColor: '#f2f2f2', justifyContent:'center' }]} key={i}>
            <Image style={styles.eventPic} key={i} source={{uri:this.backgrondImage(data.backgroundImage)}}/> 
            <View style={styles.textContainer}>
            <Text style={styles.EventName}>{data.name}</Text>
            <Text style={styles.count}>{data.count} Events</Text>            
            </View>
        </TouchableOpacity>
    );

    openDetail(param) {
        this.props.navigation.navigate('NewsDetail', { response: param })
    }
    _renderPlaceholder = i => <View style={styles.item} key={i} />;
    render() {

        return (
            <View style={{ flex: 1, backgroundColor:'white' }}>
                <Header onPress={()=>this.props.navigation.goBack()} HeaderText={this.state.header} noBackBtn={false} />

                <Text style={styles.commentContent}>Categories</Text>
                <Grid
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    renderItem={this._renderItem}
                    renderPlaceholder={this._renderPlaceholder}
                    data={this.state.subCategoryList}
                    itemsPerRow={2}
                />
                 <Modal
                    transparent={true}
                    onRequestClose={() => null}
                    visible={this.state.animating}>
                    <View style={css.transaparentView}>
                        <ActivityIndicatorExample
                        animating={this.state.animating} />
                    </View>
                 </Modal>
            </View>



        )
    }
}

const styles = StyleSheet.create({
    row: { flex: 1, width: '100%', flexDirection: 'row' },

    avatar: { marginLeft: 15, height: 44, width: 44, borderRadius: 23, alignSelf: 'center' },

    centerView: { height: 90, width: 70, alignSelf: 'center' },
    circularImage: { height: 40, width: 40, borderRadius: 20, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    topLbl: { marginTop: 5, fontSize: 15, fontWeight: 'bold', color: colors.headerColor },
    bottomLbl: { fontSize: 11, fontWeight: '500', color: colors.headerColor },
    item: {
        flex: 1,
        height: 65,
        flexDirection:'row',
        margin: 6,
        borderRadius: 2
    },
    list: {
        flex: 1,

    },
    commentContent: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 13,
        fontWeight: '500',
        color: '#000',
        marginLeft: 5

    },
    eventPic:{height:50,width:50,borderRadius:25, marginLeft:5,alignSelf:'center'},
    textContainer:{flex:1, flexDirection:'column', justifyContent:'center'},
    EventName:{marginLeft:5, color:'black', fontSize:13, fontWeight:'400'},
    count:{marginLeft:5, color:'black', fontSize:11, fontWeight:'300', opacity:0.9}
})
