/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    TouchableHighlight
} from 'react-native';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
import RestClient from '../../../redux/modules/RestClient';
import Toast, { DURATION } from 'react-native-easy-toast';
import ImagePickerCropper from "react-native-image-crop-picker";
import { Radio } from 'native-base';
import { connect } from 'react-redux';
import Regex from '../../../utilities/Regex';


class NotesDrop extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            available: true,
            deliverFlag: true,
            dropFlag: false,
            modalVisible: false,
            ImagemodalVisible: false,
            ImagePath: '',
            role: "DELIVER",
            door: "",
            DropOff: [{ "id": 0, "address": "Terrace, BC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 54.5181925, "long": -128.6031539 }],
            // Picks:
            //     [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }],
            Picks: this.props.state.pickupArr,
            DropOff: this.props.state.dropArr,
            address: '',
            NewPicks: this.props.state.pickupArr,
            isPic: false
        }
    }

    setAvailability() {
        this.setState({
            available: !this.state.available
        })
    }
    radioFun(value) {
        console.log("value on radio", value)
        if (value == 'DELIVER') {
            //this.state.deliverFlag = true
            this.setState({
                deliverFlag: true,
                dropFlag: false
            })
        }
        if (value == 'DROP') {
            //this.state.dropFlag = true
            this.setState({
                dropFlag: true,
                deliverFlag: false
            })
        }
    }
    radioFun1(value) {
        console.log("value on radio", value)
    }

    componentDidMount() {
        let dropOffArray = this.state.DropOff;
        console.log('drop_length---', dropOffArray.length)
        console.log('drop_array---', dropOffArray)
        this.setState({ address: dropOffArray[0].address, DropOff: dropOffArray })

        let pickUpp = this.state.Picks;
        this.setState({ NewPicks: pickUpp })
        let pickArray = pickUpp.slice(0, -1)
        this.setState({ Picks: pickArray })
    }

    submit = () => {
        console.log('deliverFlag++', this.state.deliverFlag)
        console.log('dropFlag++', this.state.dropFlag)
        if (this.state.role == 'DELIVER') {
            const { name, phone, buzzno, postal, unit } = this.state;
            if (name == '' || name == null) {
                this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG);
            } else if (phone == '' || phone == null) {
                this.refs.toast.show('Please enter phone.', DURATION.LENGTH_LONG);
            } else if (!Regex.validateMobile(phone.trim())) {
                this.refs.toast.show('Please enter valid phone no.', DURATION.LENGTH_LONG);
            } else if (buzzno == '' || buzzno == null) {
                this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
            } else if (postal == '' || postal == null) {
                this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
            } else if (postal.length < 6) {
                this.refs.toast.show('Please enter postal code with minimum 6 digits.', DURATION.LENGTH_LONG);
            } else if (unit == '' || unit == null) {
                this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
            } else {
                let obj = {
                    //"order_id": "5bebfe53ab88712a606956be",
                    "order_id": orderID,
                    "Inchargename": name,
                    "phone": phone,
                    "buzz_number": buzzno,
                    "postal_code": postal,
                    "unitnumber": unit,
                    "order_type": "Drop"
                }
                console.log('obj++', obj)
                RestClient.urlPost("pickupinfo/create", obj).then((result) => {
                    if (result.status == true) {
                        this.refs.toast.show('Your information is updated successfully', DURATION.LENGTH_LONG);
                        console.log("data get", result.data);
                    } else {
                        console.log("data getting")
                    }
                }).catch(error => {
                    console.log("result of type eror", error)
                });
            }
        } else {
            let objData = {
                //"order_id": "5bebfe53ab88712a606956be",
                "order_id": orderID,
                "order_type": "Drop",
                "location": this.state.door,
                "locationimage": this.state.ImagePath,
            }
            console.log("objData++", objData)
            if (this.state.role == 'DROP') {
                console.log('drop')
                RestClient.urlPostFile("dropoffinfo/create", objData).then((result) => {
                    if (result.status == true) {
                        this.refs.toast.show('Your information is updated successfully', DURATION.LENGTH_LONG);
                        console.log("data get", result.data);
                        //this.props.navigation.navigate("NotesPick3")
                    } else {
                        console.log("data getting")
                    }
                }).catch(error => {
                    console.log("result of type eror", error)
                });
            }
        }
    }

    openOptions() {
        this.setState({ ImagemodalVisible: true });
    }

    openNotes() {
        this.setState({ modalVisible: true });
    }

    openExperienceImagePickerCropper = (imageType) => {
        ImagePickerCropper.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let source = { uri: image.path };
            let fileName = image.path.split("/")
            let len = fileName.length;
            let name = fileName[len - 1]
            console.log('image path', name)
            console.log('source ', source)

            this.setState({
                ImagePath: {
                    uri: image.path,
                    name: name,
                    filename: name,
                    type: image.mime
                },
                isPic: true
            })
            let pathImage = this.state.ImagePath;
            console.log("Path is ++", pathImage)
        });
    }
    openExperienceImagePickerCropperCamera = (imageType) => {
        ImagePickerCropper.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            let source = { uri: image.path };
            let fileName = image.path.split("/")
            let len = fileName.length;
            let name = fileName[len - 1]
            console.log('image path', name);
            console.log('source ', source)
            this.setState({
                ImagePath: {
                    uri: image.path,
                    name: name,
                    filename: name,
                    type: image.mime
                },
            })
            let pathImage = this.state.ImagePath;
            console.log("Path is ++", pathImage)

        });
    }

    clickOnSelect() {
        this.setState({ modalVisible: false });
    }

    clickCancel() {
        this.setState({ ImagemodalVisible: false });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeaderBackground navigation={navigate} />
                <HeaderMenu />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.msgCont}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                            <Image
                                style={styles.imgCont}
                                source={Constants.Images.customer.NotificationLogo}
                            />
                            <Text style={styles.msgText}>Please provide some details while a driver accepts your order </Text>
                        </View>
                    </View>
                    {/* Dynamic Pickup start*/}

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <View style={styles.focusCircle} />
                        {
                            this.state.Picks.length == 2 || this.state.Picks.length == 3 ? <View style={styles.focusCircle} /> : null
                        }
                        {
                            this.state.NewPicks.length == 3 ? <View style={styles.focusCircle} /> : null
                        }
                        <View style={styles.OtherCircle} />
                    </View>
                    <View style={{
                        flex: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: scaleHeight(6),
                    }}>
                        {
                            <Text style={{ fontSize: normalizeFont(12) }}>Pickup 1</Text>
                        }

                        {
                            this.state.Picks.length == 2 || this.state.Picks.length == 3 ? <Text style={{ fontSize: normalizeFont(12) }}>Pickup 2</Text> : null
                        }
                        {
                            this.state.NewPicks.length == 3 ? <Text style={{ fontSize: normalizeFont(12) }}>Pickup 3</Text> : null
                        }
                        <Text style={{ fontSize: normalizeFont(12) }}>Drop-Off</Text>
                    </View>

                    {/* Dynamic Pickup end*/}
                    <View elevation={5} style={styles.shadowCss}>
                        <View style={[styles.flexRow, { marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100 }]}>
                            <Text style={[styles.textStyle, { color: '#5D5D5D', flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                                {'Drop-Off'}
                            </Text>
                            <View style={[styles.flexRow, { flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6 }]}>
                                <Image source={Constants.Images.customer.markerOrange} style={[styles.pickupIcon]} resizeMode={'contain'} />
                                <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                                    {this.state.address}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: scaleWidth(10), marginBottom: scaleHeight(12) }}>
                            <Radio selected={false} selectedColor={Constants.Colors.DarkBlue}
                                selected={this.state.role == 'DELIVER'}
                                onPress={() => this.setState({ role: 'DELIVER' })}
                                color={"#081933"}
                                radioBtnSize={20}
                                selected={this.state.role == 'DELIVER'}
                            />
                            <Text style={{ marginRight: 10, marginLeft: 8, fontSize: 16, color: Constants.Colors.DarkGrey, alignSelf: "center" }}>Deliver to Person</Text>


                            <Radio selected={true} selectedColor={Constants.Colors.DarkBlue}
                                color={"#081933"}
                                onPress={() => this.setState({ role: 'DROP' })}
                                selected={this.state.role == 'DROP'}
                            />
                            <Text style={{ marginRight: 10, marginLeft: 8, fontSize: 16, color: Constants.Colors.DarkGrey, alignSelf: "center" }}>Drop at Location</Text>
                        </View>
                        {/* <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            radioStyle={{ paddingLeft: 10 }}
                            onPress={(value) => {
                                this.radioFun(value)
                            }}
                            buttonColor={Constants.Colors.Blue}
                            selectedButtonColor={Constants.Colors.LightBlue}
                            labelColor={Constants.Colors.Blue}

                        /> */}
                        {
                            this.state.role == "DELIVER" ?
                                <View style={styles.textView}>
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Name of Incharge Person"
                                        placeholderTextColor="#9C9C9C"
                                        onChangeText={(name) => this.setState({ name })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Phone"
                                        keyboardType={'phone-pad'}
                                        placeholderTextColor="#9C9C9C"
                                        onChangeText={(phone) => this.setState({ phone })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Buzz Number"
                                        keyboardType={'number-pad'}
                                        placeholderTextColor="#9C9C9C"
                                        onChangeText={(buzzno) => this.setState({ buzzno })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Postal Code"
                                        keyboardType={'number-pad'}
                                        placeholderTextColor="#9C9C9C"
                                        onChangeText={(postal) => this.setState({ postal })}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Unit Number"
                                        keyboardType={'number-pad'}
                                        placeholderTextColor="#9C9C9C"
                                        onChangeText={(unit) => this.setState({ unit })}
                                    />
                                    <TouchableOpacity style={styles.noteButton} onPress={() => this.openNotes()}>
                                        <Text style={styles.noteText}>ADD NOTES AND PICTURE</Text>
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                        {
                            this.state.role == "DROP" ?
                                <View style={{ marginTop: scaleHeight(10) }}>
                                    <View style={{ flexDirection: 'column', marginLeft: scaleWidth(10) }}>
                                        <Radio selected={false} selectedColor={Constants.Colors.DarkBlue}
                                            selected={this.state.door == 'FRONT'}
                                            onPress={() => this.setState({ door: 'FRONT' })}
                                            color={"#081933"}
                                            radioBtnSize={20}
                                            selected={this.state.door == 'FRONT'}
                                        />
                                        <Text style={{ marginLeft: scaleWidth(25), fontSize: normalizeFont(16), color: Constants.Colors.LightGray, marginTop: scaleHeight(-24), marginBottom: scaleHeight(8) }}>Front Door</Text>

                                        <Radio selected={true} selectedColor={Constants.Colors.DarkBlue}
                                            color={"#081933"}
                                            onPress={() => this.setState({ door: 'BACK' })}
                                            selected={this.state.door == 'BACK'}
                                        />
                                        <Text style={{ marginLeft: scaleWidth(25), fontSize: normalizeFont(16), color: Constants.Colors.LightGray, marginTop: scaleHeight(-24) }}>Back Door</Text>
                                    </View>
                                    {/* <RadioForm
                                        radio_props={radio_props1}
                                        initial={0}
                                        radioStyle={{ paddingLeft: 10, paddingTop: 4 }}
                                        onPress={(value) => {
                                            this.radioFun1(value)
                                        }}
                                        buttonColor={Constants.Colors.Blue}
                                        animation={true}
                                        selectedButtonColor={Constants.Colors.LightBlue}
                                        labelColor={Constants.Colors.Blue}
                                    /> */}
                                    <View style={styles.viewCont}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                            <TouchableOpacity onPress={() => this.openOptions()}>
                                                {
                                                    this.state.isPic ? <Image
                                                        style={styles.camCont}
                                                        source={this.state.ImagePath}
                                                    /> : <Image
                                                            style={styles.camCont}
                                                            source={Constants.Images.customer.CameraNotes}
                                                        />
                                                }

                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.openOptions()}>
                                                <Text style={styles.camText}>Add drop location pictures.</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <TouchableOpacity style={styles.noteBtn} onPress={() => this.openNotes()}>
                                        <Text style={styles.noteText}>ADD NOTES AND PICTURE</Text>
                                    </TouchableOpacity></View> : null
                        }
                    </View>
                    <TouchableOpacity style={styles.nextBtn} onPress={() => this.submit()}>
                        <Text style={styles.nextText}>DONE</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.transaparentView}>
                        <View style={styles.centerView}>
                            <View style={styles.headerColor}>
                                <Text style={styles.headText}>Notes</Text>
                                <TouchableOpacity onPress={() => this.clickOnSelect()}>
                                    <Image source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textCont}>
                                <View style={styles.ViewMsg}>
                                    <Text style={styles.textCss}>Tom Kollin</Text>
                                    <Text style={styles.dateCss}>Apr-02-2018, 22:10</Text>
                                </View>
                                <Text style={styles.paraCss}>Contrary to popular belief, Lorem Ipsum is not simply random text classical Latin literature from 45 BC, making it over 2000 years old.</Text>
                            </View>
                            <View style={styles.msgContImage}>
                                <View style={styles.ViewMsg}>
                                    <Text style={styles.textCss}>Tom Kollin</Text>
                                    <Text style={styles.dateCss}>Apr-02-2018, 22:10</Text>
                                </View>
                                <Text style={styles.paraCss}>Contrary to popular belief, Lorem Ipsum is not simply random text classical Latin literature.</Text>
                                <View style={styles.ImgView}>
                                    <Image source={Constants.Images.customer.goback} style={styles.arrowImg} resizeMode={'contain'} />
                                    <Image source={Constants.Images.customer.Car1} style={styles.imgCss} resizeMode={'contain'} />
                                    <Image source={Constants.Images.customer.Car2} style={styles.imgCss} resizeMode={'contain'} />
                                    <Image source={Constants.Images.customer.next} style={styles.arrowImg} resizeMode={'contain'} />
                                </View>
                            </View>
                            <View style={styles.chatCont}>

                                <TextInput
                                    style={styles.chatInput}
                                    underlineColorAndroid="transparent"
                                    placeholder="Write a note here...."
                                    placeholderTextColor={Constants.Colors.LightGray}
                                />
                                <View style={styles.addView}>
                                    <TouchableOpacity onPress={() => this.openOptions()}>
                                        <Image source={Constants.Images.customer.Gallerypic} style={styles.imgCssAdd} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.openOptions()}>
                                        <Text style={styles.addPic}>Add Picture</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={Constants.Images.customer.Sendpic} style={styles.imgCssAdd1} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Select Image Modal start */}
                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.ImagemodalVisible}
                >

                    <View style={{ flex: 8 }}></View>
                    <View style={{ flex: 2, backgroundColor: "white" }}>
                        <TouchableOpacity
                            style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                            onPress={() => {
                                this.openExperienceImagePickerCropper(this.state.imageType)
                                this.setState({ ImagemodalVisible: !this.state.ImagemodalVisible })
                            }}>

                            <Text style={styles.text}>Select From Gallery..</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                            onPress={() => {
                                this.openExperienceImagePickerCropperCamera(this.state.imageType)
                                this.setState({ ImagemodalVisible: !this.state.ImagemodalVisible })
                            }}>
                            <Text style={styles.text}>Open Camera..</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                            onPress={() => this.clickCancel()}>
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* Select Image Modal end */}
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#D6511F' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7"
    },
    msgCont: {
        height: 65,
        width: "100%",
        backgroundColor: "#E8F9FF",
        marginTop: 10,
        marginBottom: 15,
    },
    focusCircle: {
        width: scaleWidth(25), height: scaleHeight(25), backgroundColor: Constants.Colors.LightBlue, borderRadius: scaleWidth(25)
    },
    OtherCircle: {
        width: scaleWidth(25), height: scaleHeight(25), backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(25)
    },
    viewCont: {
        height: 50,
        width: "100%",
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 0,
    },
    imgCont: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginTop: 15
    },
    camCont: {
        width: scaleWidth(45),
        height: scaleHeight(32),
        marginLeft: scaleWidth(12),
        marginTop: scaleHeight(5),
        marginRight: scaleWidth(0)
    },
    camText: {
        fontSize: 15,
        color: '#697477',
        marginLeft: 12,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'justify',
        fontFamily: Constants.CustomerFonts.bold.fontFamily,
        marginRight: scaleWidth(120)
    },
    msgText: {
        fontSize: 15,
        color: '#697477',
        marginLeft: 50,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'justify',
        fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    },
    cirCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: scaleWidth(25),
        marginRight: scaleWidth(25)
    },
    circle: {
        width: scaleWidth(30), height: scaleHeight(30), borderRadius: scaleHeight(30), backgroundColor: '#F28F4B'
    },
    circleDark: {
        width: scaleWidth(30), height: scaleHeight(30), borderRadius: scaleHeight(30), backgroundColor: '#2E68B4'
    },
    pickText: {
        textAlign: 'center', color: '#6B6B6B', marginTop: scaleWidth(35), marginLeft: scaleWidth(-95), marginBottom: scaleHeight(15)
    },
    flexRow: {
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: Constants.CustomerFonts.normal.fontSize,
        fontFamily: Constants.CustomerFonts.normal.fontFamily,
        textAlign: 'center',
        color: '#081933',
        marginBottom: scaleHeight(10)
    },
    pickupIcon: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
        marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
    },
    input: {
        height: scaleHeight(48), borderColor: '#C2C2C2', borderWidth: scaleWidth(1.5), backgroundColor: '#FFFFFF', fontSize: normalizeFont(17), marginBottom: scaleHeight(20), paddingHorizontal: 20,
    },
    textView: {
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(20),
        marginLeft: scaleWidth(10),
        marginRight: scaleWidth(10),
        fontFamily: Constants.CustomerFonts.normal.fontFamily,

    },
    noteBtn: {
        width: '94%',
        alignSelf: 'center',
        height: scaleHeight(50),
        borderRadius: scaleHeight(5),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(8),
        backgroundColor: "#F7F7F7",
        shadowColor: 'red',
        elevation: 3,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },

    noteButton: {
        width: '100%',
        alignSelf: 'center',
        height: scaleHeight(50),
        borderRadius: scaleHeight(5),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(8),
        backgroundColor: "#F7F7F7",
        shadowColor: 'red',
        elevation: 3,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    noteText: {
        color: Constants.Colors.LightBlue,
        fontWeight: '400',
        backgroundColor: 'transparent',
        fontSize: normalizeFont(18),
        fontFamily: Constants.CustomerFonts.bold.fontFamily,
    },
    nextBtn: {
        width: '90%',
        alignSelf: 'center',
        height: scaleHeight(50),
        borderRadius: scaleHeight(5),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(22),
        marginBottom: scaleHeight(30),
        backgroundColor: Constants.Colors.LightBlue,
        shadowColor: '#24BDFD',
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    nextText: {
        color: Constants.Colors.White,
        fontWeight: '400',
        backgroundColor: 'transparent',
        fontSize: normalizeFont(18),
        fontFamily: Constants.CustomerFonts.bold.fontFamily,
    },
    shadowCss: {
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

    centerView: { height: scaleHeight(500), width: scaleWidth(350), borderRadius: 5, backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

    topText: {
        top: scaleHeight(20),
        textAlign: 'justify',
        fontSize: normalizeFont(18),
        fontWeight: '700', color: '#314054',
        marginLeft: scaleWidth(25),
        borderRadius: scaleWidth(10),
        borderColor: 'red',
        height: scaleHeight(80),
        width: scaleWidth(280)
    },

    desc: { marginTop: scaleHeight(30), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: 25 },
    desc1: { marginTop: scaleHeight(15), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: scaleWidth(0), marginRight: scaleWidth(102), marginBottom: scaleHeight(20) },
    headerColor: {
        marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5),
        flexDirection: 'row'
    },
    headText: {
        marginLeft: scaleWidth(20),
        color: 'grey',
        fontSize: normalizeFont(20),
        width: scaleWidth(80),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        marginTop: scaleHeight(15)
    },
    closeicon: {
        backgroundColor: 'transparent',
        height: scaleHeight(25),
        width: scaleWidth(25),
        marginTop: scaleHeight(18),
        marginLeft: scaleWidth(200),
    },
    arrowImg: {
        height: scaleHeight(30),
        width: scaleWidth(15),
        marginTop: scaleHeight(18)
    },
    addView: {
        flexDirection: 'row',
        marginLeft: scaleWidth(20),
        marginRight: scaleWidth(10),
        marginTop: scaleHeight(10),
        justifyContent: 'flex-start',
        marginBottom: scaleHeight(20)
    },
    addPic: {
        color: Constants.Colors.DarkBlue,
        marginLeft: scaleWidth(5), alignItems: 'flex-start',
        fontSize: normalizeFont(17), marginTop: scaleHeight(5),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    },
    imgCssAdd1: {
        height: scaleHeight(40),
        width: scaleWidth(30),
        alignItems: 'flex-start',
        marginLeft: scaleWidth(135),
        marginRight: 10
    },
    imgCssAdd: {
        height: scaleHeight(40),
        width: scaleWidth(30),
        alignItems: 'flex-start',
        marginLeft: scaleWidth(0)
    },
    chatInput: {
        height: scaleHeight(48), fontSize: normalizeFont(17), marginBottom: scaleHeight(0), paddingHorizontal: 20,
    },
    ViewMsg: {
        flexDirection: 'row',
        marginLeft: scaleWidth(10),
        marginRight: scaleWidth(10),
        marginTop: scaleHeight(10)
    },
    ImgView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: scaleWidth(10),
        marginRight: scaleWidth(10),
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(10)
    },
    imgCss: {
        height: scaleHeight(70),
        width: scaleWidth(140),
        backgroundColor: Constants.Colors.White,
        borderRadius: scaleWidth(5)
    },
    textCss: {
        alignItems: 'flex-start',
        fontSize: normalizeFont(16),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: Constants.Colors.DarkBlue
    },
    dateCss: {
        alignItems: 'flex-end',
        marginLeft: scaleWidth(92),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: Constants.Colors.Orange,
        fontSize: normalizeFont(16),
    },
    paraCss: {
        marginLeft: scaleWidth(10),
        marginRight: scaleWidth(10),
        marginTop: scaleWidth(5),
        marginBottom: scaleHeight(5),
        fontSize: normalizeFont(14),
        color: Constants.Colors.DarkGrey,
        fontFamily: Constants.CustomerFonts.normal.fontFamily,
        textAlign: 'justify'
    },
    textCont: {
        height: scaleHeight(100),
        width: scaleWidth(320),
        borderRadius: scaleWidth(10),
        borderColor: Constants.Colors.DarkGrey,
        borderWidth: 0.5,
        marginTop: scaleHeight(15),
        marginBottom: scaleHeight(12)
    },
    msgContImage: {
        height: scaleHeight(175),
        width: scaleWidth(320),
        borderColor: Constants.Colors.DarkGrey,
        borderWidth: 0.5,
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(12)

    },
    chatCont: {
        height: scaleHeight(100),
        width: scaleWidth(320),
        backgroundColor: '#F5F5F5',
        borderColor: Constants.Colors.DarkGrey,
        borderWidth: 0.5,
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(12)
    },
    msgCont: {
        height: scaleHeight(65),
        width: "100%",
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(15),
    },
    imgCont: {
        width: scaleWidth(30),
        height: scaleHeight(30),
        marginLeft: scaleWidth(40),
        marginTop: scaleHeight(15)
    },
    msgText: {
        fontSize: normalizeFont(15),
        color: '#697477',
        marginLeft: scaleWidth(50),
        marginRight: scaleWidth(30),
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(10),
        textAlign: 'justify',
        fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
    },
});
export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(NotesDrop);