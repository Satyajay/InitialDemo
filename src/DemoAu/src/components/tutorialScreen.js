import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native'
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
const { width, height } = Dimensions.get('window');

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
    'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
    'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]

export default class App extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,

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
                heading: "",
                text: ""
            }]
        };
    }

    numItems = images.length
    itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    animVal = new Animated.Value(0)

    _onExplore() {
        this.props.navigation.navigate('Tab')
    }

    _onSignUp() {
        this.props.navigation.navigate('Signup')
    }
    _onLogin() {
        this.props.navigation.navigate('Login')
    }




    renderText(params) {
        console.log("params" + JSON.stringify(params));
        return (
            < View style={styles.textView} >
                <Text style={styles.tutorialHeading}>{params.heading}</Text>
                <Text numberOfLines={2} style={styles.tutorialText}>{params.text}</Text>
            </View >)
    }


    renderButton() {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.buttonViewStyle}>
                    <TouchableOpacity style={styles.signUpBtnStyle} onPress={() => this._onSignUp()}>
                        <Text style={{ fontSize: scaleHeight(20), alignSelf: 'center', color: "#fff" }}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.exploreBtnStyle} onPress={() => this._onExplore()}>
                        <Text style={{ fontSize: scaleHeight(20), alignSelf: 'center', color: "#18AAD5" }}>Explore</Text>
                    </TouchableOpacity>
                </View >
                <View style={styles.alreadyUserViewStyle}>
                    <Text style={{ fontSize: scaleHeight(16), alignSelf: 'center', color: "gray" }}>Already a user ? </Text>
                    <TouchableOpacity style={styles.loginStyle} onPress={() => this._onLogin()}>
                        <Text style={{ fontSize: scaleHeight(16), color: "#18AAD5" }}>Log in </Text>
                    </TouchableOpacity>
                </View >
            </View >
        )
    }


    render() {

        let imageArray = []
        let barArray = []
        images.forEach((image, i) => {
            console.log(image, i)
            var thisImage;
            if (i == 2) {
                thisImage = (
                    <View key={`image${i}`} style={{ alignItems: 'center' }} >
                        <Image
                            source={{ uri: image }}
                            style={{ width: deviceWidth, height: scaleHeight(400) }}
                        />
                        {this.renderButton()}

                    </View>
                )
            }
            else {
                thisImage = (
                    <View key={`image${i}`} style={{ alignItems: 'center', }} >
                        <Image
                            source={{ uri: image }}
                            style={{ width: deviceWidth, height: scaleHeight(400) }}
                        />
                        {this.renderText(this.state.headingArr[i])}

                    </View>
                )
            }
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
            <View
                style={styles.container}
                flex={1}
            >
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
                <View
                    style={styles.barContainer}
                >
                    {barArray}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleHeight(400),
        
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
        color: "#1C8ADB",
        top: scaleHeight(60),
        fontFamily: 'Cochin',
        fontSize: normalizeFont(22)
    },
    tutorialText: {
        color: "#000",
        top: scaleHeight(80),
        fontFamily: 'Cochin',
        fontSize: normalizeFont(16),
        width: scaleWidth(180),
        textAlign: 'center'
    },
    buttonViewStyle: {
        width: scaleWidth(350), height: scaleHeight(50), top: scaleHeight(70), flexDirection: 'row', justifyContent: "space-between"
    },
    signUpBtnStyle: {
        width: width / 2.35, backgroundColor: '#117892', justifyContent: "center", alignItems: "center", borderRadius: 8
    },
    exploreBtnStyle: {
        width: width / 2.35, justifyContent: "center", alignItems: "center", borderColor: "#18AAD5", borderWidth: 1, borderRadius: 8
    },
    alreadyUserViewStyle: {
        width: scaleWidth(150), height: scaleHeight(50), top: scaleHeight(80), flexDirection: 'row', justifyContent: "space-between"
    },
    loginStyle: {
        justifyContent: "center", alignItems: "center"
    }
})




// import React, {Component} from 'react';
// import {
//     AppRegistry, StyleSheet, Text, View,
//     Dimensions, Image,
//     TextInput, TouchableOpacity, Platform, ScrollView, FlatList, StatusBar
// } from 'react-native';
// const { width, height } = Dimensions.get('window');
// const image1 = require('../images/dev1.jpg');
// import Carousel from 'react-native-carousel';
// import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"



// export default class Login extends Component {

//     static navigationOptions = ({ navigation }) => ({
//         header: null
//     });

//     constructor(props) {
//         super(props);
//         this.state = {
//             headingScrollView1: {
//                 heading: "Learning Never Ends",
//                 text: "Control Your Own Level Of Motivation"
//             },
//             headingScrollView2: {
//                 heading: "Choosing The Best",
//                 text: "Change Your Mind Change Your Luck"
//             },
//         };
//     }

//     _onExplore() {
//         this.props.navigation.navigate('Tab')
//     }

//     _onSignUp() {
//         this.props.navigation.navigate('Signup')
//     }
//     _onLogin() {
//         this.props.navigation.navigate('Login')
//     }

//     renderText(params) {
//         console.log("params" + JSON.stringify(params));
//         return (
//             < View style={styles.textView} >
//                 <Text style={styles.tutorialHeading}>{params.heading}</Text>
//                 <Text numberOfLines={2} style={styles.tutorialText}>{params.text}</Text>
//             </View >)
//     }


//     render() {


//         return (
//             <View style={styles.container}>
//                 <StatusBar
//                     barStyle="dark-content"
//                 />
//                 <Carousel
//                     animate={false}
//                     indicatorOffset={20}
//                     indicatorColor="#1C8ADB"
//                 >
//                     <View style={styles.containerCarousel}>
//                         <View style={styles.tutorialTopView1}>
//                             <View style={styles.innerScrollView}>
//                                 <Image style={styles.images} source={image1} />
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(200), height: scaleHeight(25), top: scaleHeight(20) }} />
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(100), height: scaleHeight(25), top: scaleHeight(30) }} />
//                             </View>
//                         </View>
//                         {this.renderText(this.state.headingScrollView1)}
//                     </View>
//                     <View style={styles.containerCarousel}>
//                         <View style={styles.tutorialTopView2}>
//                             <View style={styles.innerScrollView}>
//                                 <Image style={styles.images} source={image1} />
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(200), height: scaleHeight(25), top: scaleHeight(20) }} />
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(100), height: scaleHeight(25), top: scaleHeight(30) }} />
//                             </View>
//                         </View>
//                         {this.renderText(this.state.headingScrollView2)}
//                     </View>
//                     <View style={styles.containerCarousel}>
//                         <View style={styles.tutorialTopView3} >
//                             <View style={styles.innerScrollView}>
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(300), height: scaleHeight(50), top: scaleHeight(10), flexDirection: 'row', borderRadius: scaleHeight(5) }} >
//                                     <Text style={{
//                                         color: 'gray', fontFamily: 'Cochin', top: scaleHeight(10), marginLeft: scaleHeight(10),
//                                         fontSize: normalizeFont(20), flex: 1
//                                     }}>Quiz</Text>
//                                     <Text style={{
//                                         color: 'gray', fontFamily: 'Cochin', top: scaleHeight(10), marginRight: scaleHeight(10), textAlign: "right",
//                                         fontSize: normalizeFont(20), flex: 1
//                                     }}>2 / 3</Text>
//                                 </View>
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(300), height: scaleHeight(25), top: scaleHeight(30), borderRadius: scaleHeight(3) }} />
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(300), height: scaleHeight(25), top: scaleHeight(40), borderRadius: scaleHeight(3) }} />
//                                 <View style={{ backgroundColor: "#ffffff", width: scaleWidth(200), height: scaleHeight(25), top: scaleHeight(50), borderRadius: scaleHeight(3) }} />
//                             </View>
//                         </View>
//                         <View style={{ width: scaleWidth(350), height: scaleHeight(50), top: scaleHeight(70), flexDirection: 'row', justifyContent: "space-between" }}>
//                             <TouchableOpacity style={{ width: width / 2.35, backgroundColor: '#117892', justifyContent: "center", alignItems: "center", borderRadius: 8 }} onPress={() => this._onSignUp()}>
//                                 <Text style={{ fontSize: scaleHeight(20), alignSelf: 'center', color: "#fff" }}>Sign Up</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ width: width / 2.35, justifyContent: "center", alignItems: "center", borderColor: "#18AAD5", borderWidth: 1, borderRadius: 8 }} onPress={() => this._onExplore()}>
//                                 <Text style={{ fontSize: scaleHeight(20), alignSelf: 'center', color: "#18AAD5" }}>Explore</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{ width: scaleWidth(150), height: scaleHeight(50), top: scaleHeight(80), flexDirection: 'row', justifyContent: "space-between" }}>
//                             <Text style={{ fontSize: scaleHeight(16), alignSelf: 'center', color: "gray" }}>Already a user ? </Text>
//                             <TouchableOpacity style ={{justifyContent : "center" , alignItems : "center"}} onPress={() => this._onLogin()}>
//                             <Text style={{ fontSize: scaleHeight(16), color: "#18AAD5" }}>Log in </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </Carousel>
//             </View >
//         )
//     }

// }

// const styles = StyleSheet.create({
//     container: {
//         top: 20,
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center'
//     },

//     containerCarousel: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     images: {
//         height: scaleHeight(180),
//         width: scaleWidth(300),
//         top: scaleHeight(0),
//         borderRadius: 10
//     },
//     tutorialTopView1: {
//         width: width,
//         backgroundColor: '#1C8ADB',
//         alignItems: 'center',
//         height: scaleHeight(400)
//     },

//     tutorialTopView2: {
//         backgroundColor: '#1C8ADB',
//         width: width,
//         alignItems: 'center',
//         height: scaleHeight(400)
//     },
//     tutorialTopView3: {
//         backgroundColor: '#1C8ADB',
//         width: width,
//         alignItems: 'center',
//         height: scaleHeight(400)
//     },
//     innerScrollView: {
//         height: scaleHeight(300),
//         width: scaleWidth(300),
//         top: scaleHeight(60),
//     },
//     textView: {
//         backgroundColor: '#fff',
//         width: width,
//         alignItems: 'center',
//         height: scaleHeight(0.3 * height),
//     },
//     tutorialHeading: {
//         color: "#1C8ADB",
//         top: scaleHeight(60),
//         fontFamily: 'Cochin',
//         fontSize: normalizeFont(22)
//     },
//     tutorialText: {
//         color: "#000",
//         top: scaleHeight(80),
//         fontFamily: 'Cochin',
//         fontSize: normalizeFont(16),
//         width: scaleWidth(180),
//         textAlign: 'center'
//     }

// })
