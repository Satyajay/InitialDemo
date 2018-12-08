import React, { Component } from 'react';
import Constants from "../../../constants";
import { withNavigation } from 'react-navigation'
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';
import RestClient from '../../../utilities/RestClient';
import PTRView from 'react-native-pull-to-refresh';


import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ListView,
    FlatList,
    AsyncStorage
} from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, Left, Right, Title, Body, Content, Card, CardItem, List, ListItem } from 'native-base'
import { NavigationActions } from "react-navigation";
class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendData: [],
            order_id: '',
            time: '',
            expireTime: '',
            date: '',
            maxTime: '',
            minTime: '',
            totalCharge: '',
            pendingArray: []
        }
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    _refresh() {
        return new Promise((componentDidMount) => {
            setTimeout(() => { componentDidMount() }, 2000)
        });
    }
    moveFun() {
        this.props.navigation.navigate('Login')
    }


    componentDidMount() {
        AsyncStorage.getItem("id").then((value) => {
            RestClient.get_New('myorders/my-orders/', {
                status: 'Available',
                max: 6217708099,
                min: 0,
                page: 1,
                count: 1,
                datemin: 0,
                datemax: 1538223074000220000011,
                customerId: value,
            }, '').then((result) => {
                if (result.status == 1) {
                    let pendingarr = []
                    for (var i = 0; i < result.data.length; i++) {
                        var obj = result.data[i];
                        let new_min = moment.utc(obj.minTime).format('HH:mm A');
                        let new_max = moment.utc(obj.maxTime).format('HH:mm A');
                        let new_date = moment.utc(obj.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
                        let objj = {
                            order_id: obj.orderId,
                            time: obj.time,
                            expireTime: obj.orderExpireTime,
                            date: new_date,
                            maxTime: new_max,
                            minTime: new_min,
                            totalCharge: obj.totalCharge,
                            _id: obj._id

                        }
                        pendingarr.push(objj)
                        console.log("*************************");
                        console.log("order_id++", obj.orderId);
                        console.log("time++", obj.time);
                        console.log("Expire time", obj.orderExpireTime);
                        console.log("date", obj.date);
                        console.log("Max_time", obj.maxTime);
                        console.log("Min_time", obj.minTime);
                        console.log("*************************");
                    }
                    this.setState({
                        pendData: pendingarr
                    })
                }
                else {

                }
            }).catch(error => {
                console.log("error=> ", error)
            });
        })
    }

    // async componentWillReceiveProps(nextProps) {
    //     let pending = await nextProps.PendingInfo;
    //     console.log('pending data+++', pending);
    //     if (pending != null) {
    //         let pendingarr = []
    //         for (var i = 0; i < pending.length; i++) {
    //             var obj = pending[i];
    //             let new_min = moment.utc(obj.minTime).format('HH:mm A');
    //             let new_max = moment.utc(obj.maxTime).format('HH:mm A');
    //             let new_date = moment.utc(obj.updatedAt, "YYYY-MM-DDTHH:mm:ss Z").format('DD/MM/YYYY');
    //             let objj = {
    //                 order_id: obj.orderId,
    //                 time: obj.time,
    //                 expireTime: obj.orderExpireTime,
    //                 date: new_date,
    //                 maxTime: new_max,
    //                 minTime: new_min,
    //                 totalCharge: obj.totalCharge,
    //                 _id: obj._id

    //             }
    //             pendingarr.push(objj)
    //             console.log("*************************");
    //             console.log("order_id++", obj.orderId);
    //             console.log("time++", obj.time);
    //             console.log("Expire time", obj.orderExpireTime);
    //             console.log("date", obj.date);
    //             console.log("Max_time", obj.maxTime);
    //             console.log("Min_time", obj.minTime);
    //             console.log("*************************");
    //         }
    //         this.setState({
    //             pendData: pendingarr
    //         })
    //     }
    // }
    pendingDetail(item) {
        this.props.navigation.navigate('Orders_Pending', { detail_id: item._id })
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <PTRView onRefresh={this._refresh} >
                <Container style={{ backgroundColor: '#F8F8F8' }}>
                    <Content>
                        <View style={styles.searchContainer}>
                            <TextInput autoFocus={false} style={styles.txtInputSearch} placeholder={'Search in orders'} underlineColorAndroid="transparent" />
                            <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                        </View>
                        <View style={styles.ordercontainer}>
                            <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                <Text style={styles.NewOrderStyle}>NEW ORDER</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'contain'} />
                            </View>
                        </View>

                        <List>
                            <FlatList
                                data={this.state.pendData}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.pendingDetail(item)}>
                                        <Card>
                                            <CardItem>
                                                <Left><Text style={{ color: '#53C8E5' }}>{item.expireTime} Mins</Text></Left>
                                                <Right><Text style={{ color: '#2662B1' }}>Order ID #{item.order_id}</Text></Right>
                                            </CardItem>
                                            <CardItem><Text style={{ color: '#A0A0A0', marginBottom: 0 }}>Delivery Date: {item.date}</Text></CardItem>
                                            <CardItem cardBody>
                                                <Left>
                                                    <Text style={styles.timeCss}>Time-frame: {item.minTime} - {item.maxTime}</Text>
                                                </Left>
                                                <Right>
                                                    <Text style={{ color: '#C9C9C9', marginRight: 14, marginBottom: 12 }}>${item.totalCharge}</Text>
                                                </Right>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                }
                            />
                        </List>
                    </Content>
                </Container>
            </PTRView>
        );
    }
}


const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
        borderWidth: .5,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#C1C1C1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    timeCss: {
        color: '#A0A0A0', fontSize: 13,
        marginTop: 0,
        marginLeft: 14,
        marginBottom: 12,
        width: '110%'
    },
    searchContentIcon: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3.5,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3.5,
        marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    },
    filterIcon: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    },
    txtInputSearch: {
        backgroundColor: '#fff',
        color: '#5D5D5D',
        fontSize: Constants.CustomerFonts.small.fontSize,
        flex: 1,
        marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
    },
    ordercontainer: {
        flexDirection: 'row',
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    },
    NewOrderStyle: {
        fontSize: Constants.CustomerFonts.normal.fontSize,
        //fontFamily: Constants.CustomerFonts.BigSize.fontFamily,
        color: '#53C8E5',
        textDecorationLine: 'underline',
        marginTop: 10,
        marginBottom: 10
    },
})

//export default withNavigation(Pending);

const mapStateToProps = state => ({
    modalstate: state.ModalHandleReducer,
    deviceToken: state.user.deviceToken,
    PendingInfo: state.user.pendingData
});

const mapDispatchToProps = dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Pending));
