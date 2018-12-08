import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View,
  Dimensions, Image,
  TextInput, TouchableOpacity, Platform, ScrollView, FlatList, Alert
} from 'react-native';
const { width, height, scale } = Dimensions.get('window');
import { scaleHeight, scaleWidth, normalizeFont } from "../utils/responsive"
import css from '../common/styles';
const mailinActive = require("../img/user.png");
const mailActive = require("../img/user-hover.png");
import Button from '../common/smallbutton';
import Header from "../common/Header";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import colors from '../common/colors'

export default class MintHistory extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null,

  });


  constructor(props) {
    super(props);
    this.state = {
      line1: '#D9DADC',
      mailColor: mailinActive,
      // tableHead: ['S.No.', 'Date', 'Time', 'Coins', 'Rewards'],
      tableData: [
        ['1', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['2', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['3', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['4', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['5', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['6', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['7', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['8', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['9', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
        ['10', '02/05/2108', '09:42 AM', '10 AUD', '2 DIGI'],
      ],
      tableHead: ['S.No.', 'Date', 'Time', 'Coins', 'Rewards'],
      widthArr: [40, 85, 75, 75, 75]
    };
  }

  onmailBlur() {
    this.setState({
      mailColor: mailinActive,
      line1: "#D9DADC"
    })
  }

  onmailFocus() {
    this.setState({
      mailColor: mailActive,
      line1: "#ABBBE1"
    })
  }

  getMint() {
    this.props.navigation.navigate('Tab')
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    //     const tableData = [];
    //      for (let i = 0; i < 9; i += 1) {
    //       const rowData = [];
    //       for (let j = 0; j < this.state.tableData.length; j += 1) {
    //         rowData.push(this.state.tableData[j]);
    //       }
    //     tableData.push(rowData);
    //    }
    return (
      <View style={styles.container}>
        <Header onPress={() => this.props.navigation.goBack()} HeaderText='Mint History' />
        {/* <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'} vertical={true}> */}
        <View style={styles.mintWrap}>
          <ScrollView horizontal={true}>
            <View style={styles.tableWrap}>
              <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text1} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                  {
                    this.state.tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#FFFFFF' }]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.mintBtn} onPress={() => this.getMint()}>
            <Text style={styles.mintTextBtn}>MINT</Text>
          </TouchableOpacity>
          <View style={{ height: scaleHeight(30) }}>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  mintWrap: {
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(100),
    height: '80%',
    elevation: 3,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#A9A9A9',
    backgroundColor: '#FFFFFF',

  },
  tableWrap: { marginLeft: scaleWidth(15), marginRight: scaleWidth(15), marginTop: scaleHeight(20) },
  header: { height: scaleHeight(40), backgroundColor: '#F5F6F8' },
  text: { textAlign: 'center', fontWeight: '100' },
  text1: { textAlign: 'center', fontWeight: 'bold', color: '#4E4E4E' },
  dataWrapper: { marginTop: scaleHeight(-1) },
  row: { height: scaleHeight(40), backgroundColor: '#FFFFFF' },
  mintBtn: {
    paddingVertical: scaleHeight(20),
    width: scaleWidth(120),
    alignSelf: 'center',
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(25),
    backgroundColor: colors.buttonBg,
    shadowColor: '#24BDFD',
    elevation: scaleHeight(2),
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: scaleHeight(5),
    shadowOpacity: scaleHeight(0.8),
  },
  mintTextBtn: {
    color: colors.buttonText,
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(14)
  }
})
