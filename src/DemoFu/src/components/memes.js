import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Animated, ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList,StatusBar
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import ImageSlider from 'react-native-image-slider';
import css from '../common/styles';
import Header from "../common/Header"
const image1 = require('../images/11.jpg');
const image2 = require('../images/22.jpg');
const image3 = require('../images/33.jpg');
const nextIcon = require('../images/next.png');
const productImage = 'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png';
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const data = [
    {
        image: image1,
        title: 'Nursing Room',
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

const data1 =[
    {
        image: image2,
        title: 'EMR',
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

const data2=[
    {
        image: image3,
        title: 'Surgeon',
        view: 'View All',
        data: [{
            image: image1,
        }, {
            image: image2,
        }, {
            image: image3,
        }]
     },
     ]


const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
    'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]

export default class Memes extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    constructor(props) {
        super(props);
        this.state = {
            headingArr: [{
                heading: "Learning Never Ends",
                text: "Control Your Own Level Of Motivation"
            }, {
                heading: "Choosing The Best",
                text: "Change Your Mind Change Your Luck"
            }, {
                heading: "Learning Never Ends",
                text: "Control Your Own Level Of Motivation"
            }, {
                heading: "Choosing The Best",
                text: "Change Your Mind Change Your Luck"
            }, {
                heading: "Learning Never Ends",
                text: "Control Your Own Level Of Motivation"
            },
            {
                heading: "Choosing The Best",
                text: "Change Your Mind Change Your Luck"
            }, {
                heading: "Learning Never Ends",
                text: "Control Your Own Level Of Motivation"
            }
            ]
        };
    }

    open(param) {
        console.log(param);
        this.props.navigation.navigate('ViewAll', { profileInfo: param })
    }

    openDetail(param) {
        console.log(param);
        this.props.navigation.navigate('NewsDetail', { profileInfo: param })
    }

    numItems = images.length
    itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    animVal = new Animated.Value(0)

    renderText(params) {
        console.log("params" + JSON.stringify(params));
        return (
            < View style={styles.textView} >
                <Text style={styles.tutorialHeading}>{params.heading}</Text>
                <Text numberOfLines={2} style={styles.tutorialText}>{params.text}</Text>
            </View >)
    }


    renderRowParentList(item) {
        console.log(item);
        return (
            <View style={styles.rowColor}>
                <TouchableOpacity onPress={() => this.open(item.title)}>
                <View style={styles.rowtitleStyle}>
                    <Text style={styles.rowTitleLabelStyle}>{item.title}</Text>
                    <Image style={css.arrowIcon} source ={nextIcon}/>
                </View>
                 </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    data={item.data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>

                        <View style={styles.rowViewStyle}>
                            <TouchableOpacity onPress={() => this.openDetail(item.title)}>
                                <Image style={styles.rowImageStyle} source={item.image} />
                            </TouchableOpacity>
                        </View>

                    }
                />
            </View>

        )
    }

    renderRowStoryList(item) {
       
        return (
         
            <View style={styles.rowColorStory}>
                 <TouchableOpacity onPress={() => this.open(item.title)}>
                <View style={styles.rowtitleStyle}>                                     
                    <Text style={styles.rowTitleLabelStyle}>{item.title}</Text>
                    <Image style={css.arrowIcon} source ={nextIcon}/>
                </View>
                 </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    data={item.data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>

                        <View style={styles.rowViewStyle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.title)}>
                                <Image style={styles.rowImageStyle} source={item.image} />
                            </TouchableOpacity>
                        </View>

                    }
                />
            </View>

        )
    }

    renderRowVideosList(item) {
        console.log(item);
        return (
            <View style={styles.rowColorVideo}>
                <TouchableOpacity onPress={() => this.open(item.title)}>
                <View style={styles.rowtitleStyle}>                 
                    <Text style={styles.rowTitleLabelStyle}>{item.title}</Text>
                     <Image style={css.arrowIcon} source ={nextIcon}/>
                </View>
                 </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    data={item.data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>

                        <View style={styles.rowViewStyle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.title)}>
                                <Image style={styles.rowImageStyle} source={item.image} />
                            </TouchableOpacity>
                        </View>

                    }
                />
            </View>

        )
    }

    render() {
        let imageArray = []
        let barArray = []
        images.forEach((image, i) => {
            console.log(image, i)
            var thisImage;
            thisImage = (
                <View key={`image${i}`} style={{ alignItems: 'center', }} >
                    <ImageBackground source={{ uri: image }}
                        style={{ width: deviceWidth, height: scaleHeight(175) }}>
                        {this.renderText(this.state.headingArr[i])}
                    </ImageBackground>
                </View>
            )
            imageArray.push(thisImage)

            const scrollBarVal = this.animVal.interpolate({
                inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
                outputRange: [-this.itemWidth, this.itemWidth],
                extrapolate: 'clamp',
            })

            const thisBar = (
                <View
                    key={`bar${i}`}
                    style={[
                        styles.track,
                        {
                            width: this.itemWidth,
                            marginLeft: i === 0 ? 0 : BAR_SPACE,
                        },
                    ]}
                >
                    <Animated.View

                        style={[
                            styles.bar,
                            {
                                width: this.itemWidth,
                                transform: [
                                    { translateX: scrollBarVal },
                                ],
                            },
                        ]}
                    />
                </View>
            )
            barArray.push(thisBar)
        })
        return (
            <View style={styles.container}>
                 <Header onPress={()=>this.props.navigation.goBack()} HeaderText='Memes' filter={true}/>
                <ScrollView style={{marginTop:10}}>
                    <FlatList
                        horizontal={false}
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => this.renderRowParentList(item)
                        }
                    >

                    </FlatList>

                    <FlatList
                        horizontal={false}
                        data={data1}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => this.renderRowStoryList(item)
                        }
                    >

                    </FlatList>

                    <FlatList
                        horizontal={false}
                        data={data2}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => this.renderRowVideosList(item)
                        }
                    >

                    </FlatList>
                </ScrollView>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        top: (height * 0.9),
        flexDirection: 'row',
    },
    track: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        height: 2,
    },
    bar: {
        backgroundColor: 'red',
        height: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    tutorialHeading: {
        color: "#ffffff",
        fontFamily: 'Cochin',
        fontSize: normalizeFont(22)
    },
    tutorialText: {
        color: "#ffffff",
        fontFamily: 'Cochin',
        fontSize: normalizeFont(18)
    },
    textView: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleHeight(0.3 * height),
    },
    rowtitleStyle: {
         marginTop:10,
         marginLeft:5,
        flexDirection: "row", 
    },
    rowColor: {
       backgroundColor:'#fff',marginBottom:-15
    },
    rowColorStory:{
        backgroundColor:'#ffffff',marginBottom:-15,marginTop:0
    },
    rowColorVideo:{
        backgroundColor:'#ffffff',marginTop:0
    },
    rowTitleLabelStyle: {
       alignSelf:'center', marginLeft: 5, fontSize: normalizeFont(18), fontWeight: "600", color: "#C3363F"
    },
    rowTitleViewAllStyle: {
        marginTop: scaleHeight(20), marginRight: scaleWidth(20), fontSize: normalizeFont(14),fontWeight:"500", color: "#9F9F9F"
    },

    rowViewStyle: {
        marginHorizontal: scaleHeight(8), marginTop: scaleHeight(10),margin:10,
        backgroundColor:'#ffffff'
    },
    rowImageStyle: {
        height: scaleHeight(120), width: scaleWidth(120), borderRadius: 5
    },

    rowDescViewStyle: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    rowDescLabelStyle: {
        width: scaleWidth(200), marginTop: scaleHeight(5), fontSize: normalizeFont(14)
    },
    rowDescPriceLabel: {
        color: "#31B862", marginRight: scaleWidth(5), fontSize: normalizeFont(14)
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 12,
        color:'white',
        top:0,
      },
      statusBar:{
        height: (Platform.OS === 'ios') ? 20 : 0,
      },

})
