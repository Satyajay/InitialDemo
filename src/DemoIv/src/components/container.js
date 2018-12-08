'use strict'
import React, { Component } from 'react'
import {
    StatusBar, StyleSheet, View, Platform
} from 'react-native'

//import Icon from 'react-native-vector-icons/FontAwesome'
//import colors from './../resources/styles/colors'

class Container extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container, this.props.style || {}]}>
                {/* Replace status on iOS */}
                <StatusBar hidden={true} />
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'red',
        alignItems: 'stretch',
        flex: 1
    },
    shoppingCart: {
        position: 'absolute',
        top: 13,
        right: 15,
        color: 'blue',
        zIndex: 1,
        backgroundColor: 'transparent'
    }
})

module.exports = Container
