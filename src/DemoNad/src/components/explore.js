import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, Animated, ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import ImageSlider from 'react-native-image-slider';
const image1 = require('../images/dev1.jpg');
const image2 = require('../images/dev2.jpg');
const image3 = require('../images/dev3.jpg');
const productImage = 'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png';
const data = [
    {
        image: image1,
        text: "Use this technology and get ready to blow your mind",
        price: "$10",
        title: 'Development',
        view: 'View All',
        data: [{
            image: image1,
            text: "Use this technology and get ready to blow your mind",
            price: "$10"
        }, {
            image: image2,
            text: "Use this technology and get ready to blow your mind",
            price: "$9"
        }, {
            image: image3,
            text: "Use this technology and get ready to blow your mind",
            price: "$8"
        }]
    },
    {
        image: image2,
        text: "Use this technology and get ready to blow your mind",
        price: "$9",
        title: 'Design',
        view: 'View All',
        data: [{
            image: image1,
            text: "Use this technology and get ready to blow your mind",
            price: "$10"
        }, {
            image: image2,
            text: "Use this technology and get ready to blow your mind",
            price: "$9"
        }, {
            image: image3,
            text: "Use this technology and get ready to blow your mind",
            price: "$8"
        }]
    },
    {
        image: image3,
        text: "Use this technology and get ready to blow your mind",
        price: "$8",
        title: 'Languages',
        view: 'View All',
        data: [{
            image: image1,
            text: "Use this technology and get ready to blow your mind",
            price: "$10"
        }, {
            image: image2,
            text: "Use this technology and get ready to blow your mind",
            price: "$9"
        }, {
            image: image3,
            text: "Use this technology and get ready to blow your mind",
            price: "$8"
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

export default class Explore extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerBackTitle: null,
        title: "Explore",
        headerTitleStyle: { color: "black", alignSelf: "center" },

        headerTintColor: "#8E8E8E"
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
        this.props.navigation.navigate('Viewall', { profileInfo: param })
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
        return (
            <View>
                <View style={styles.rowtitleStyle}>
                    <Text style={styles.rowTitleLabelStyle}>{item.title}</Text>
                    <TouchableOpacity onPress={() => this.open('Development')}>
                        <Text style={styles.rowTitleViewAllStyle}>{item.view}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal={true}
                    data={item.data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) =>

                        <View style={styles.rowViewStyle}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Description')}>
                                <Image style={styles.rowImageStyle} source={item.image} />
                            </TouchableOpacity>
                            <View style={styles.rowDescViewStyle}>
                                <Text style={styles.rowDescLabelStyle}>{item.text}</Text>
                                <Text style={styles.rowDescPriceLabel}>{item.price}</Text>
                            </View>

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

                <ScrollView>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={10}
                        pagingEnabled
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                            )
                        }
                    >
                        {imageArray}
                    </ScrollView>
                    <FlatList
                        horizontal={false}
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => this.renderRowParentList(item)
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
        backgroundColor: '#FFFFFF',

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
        flexDirection: "row", justifyContent: "space-between"
    },
    rowTitleLabelStyle: {
        marginTop: scaleHeight(20), marginLeft: scaleWidth(20), fontSize: normalizeFont(18), fontWeight: "bold", color: "#575757"
    },
    rowTitleViewAllStyle: {
        marginTop: scaleHeight(20), marginRight: scaleWidth(20), fontSize: normalizeFont(14), color: "#9F9F9F"
    },
    rowViewStyle: {
        marginHorizontal: scaleHeight(10), marginTop: scaleHeight(10)
    },
    rowImageStyle: {
        height: scaleHeight(150), width: scaleWidth(250), borderRadius: 5
    },
    rowDescViewStyle: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    },
    rowDescLabelStyle: {
        width: scaleWidth(200), marginTop: scaleHeight(5), fontSize: normalizeFont(14)
    },
    rowDescPriceLabel: {
        color: "#31B862", marginRight: scaleWidth(5), fontSize: normalizeFont(14)
    }

})
