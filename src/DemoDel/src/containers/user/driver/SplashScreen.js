import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Image, View, ImageBackground } from 'react-native';
//import AppIntroSlider from 'react-native-app-intro-slider';
import BouncingPreloader from 'react-native-bouncing-preloader';
import Constants from '../../../constants'



export default class SplashScreen extends Component {

  constructor(props) {
    super(props);

    //  this.props.navigation.navigate("socketUpdate");


    setTimeout(() => {
      //this.props.navigation.navigate("NotesDrop")
      this.props.navigation.navigate("Login")
      //   this.props.navigation.navigate('driverNavigation')

      // this.props.navigation.navigate("tutorialVideo")

      //scoketIo
      //     this.props.navigation.navigate("annotationMap")
      //this.props.navigation.navigate('Home_SelectDriver');

    }, 2000);
  }

  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        source={require('../../../assets/images/background.png')}
      >
        {/* <BouncingPreloader
  icons={[require('../../../assets/images/logo_1.png'),
  ]}
  speed={2000}
  leftRotation="360deg"
  /> */}
        <Image
          resizeMode="center"
          source={require('../../../assets/images/logo_1.png')}
        />
        <Image

          resizeMode="center"
          source={require('../../../assets/images/logoSplash.png')}
        />

      </ImageBackground>
    );
  }
}