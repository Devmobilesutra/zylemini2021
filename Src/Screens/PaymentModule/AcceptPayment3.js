import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet, Root } from 'native-base';
import Colors from './utils/Colors';
import Header2 from './PaymentModuleCommonComponent/Header2';
import Dimen from './utils/Dimen';
import BottomGreenbar from './PaymentModuleCommonComponent/BottomGreenbar';
import CashPaymentContainer from './AcceptpaymentComponent/CashPaymentContainer';
import ChequePaymentConatiner from './AcceptpaymentComponent/ChequePaymentConatiner';
import { Alert } from 'react-native';
import { Modal } from 'react-native';


export default class AcceptPayment3 extends Component {
    isShow = true;
    constructor(props) {
        super(props);
        let _modesArray = props.Mode;

        console.log("PRINTING POROPS", props.Obj.item)
        this.state = {
            _amount: props.Obj.amt,
            _showSteps: false,
            _modes: _modesArray,
            _receiptPhoto: [],
            _checkphoto: [],

            _showCashmodule: false,
            _showCheqModule: false,
            _modelVisible: false



        };

    }

    componentDidMount() {
        if (this.state._modes.includes('Cash')) {
            this.setState({ _showCashmodule: true });
        }
        if (this.state._modes.includes('Cheque')) {
            this.setState({ _showCheqModule: true });
        }
    }

    // FUNCTION S FOR PICK IMAGE

    onClickAddImage = imageToBeAdd => {
        const BUTTONS = ['Take photo', 'Choose', 'cancel'];
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: 2,
                title: 'select photo',
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        this.takePhotoFromCamera(imageToBeAdd);
                        break;

                    case 1:
                        this.takePhotoFromLibrary(imageToBeAdd);
                        break;
                    default:
                        break;
                }

            },
        );
    };

    takePhotoFromCamera = imageToBeAddIn => {
        ImagePicker.openCamera({
            compressImageQuality: 0.5,
        }).then(image => {
            this.onSelectedImage(image, imageToBeAddIn);
        });
    };

    takePhotoFromLibrary = imageToBeAddIn => {
        ImagePicker.openPicker({
            compressImageQuality: 0.5,
        }).then(image => {
            this.onSelectedImage(image, imageToBeAddIn);

        });
    };

    onSelectedImage = (image, imageToBeAddIn) => {
        const source = { uri: image.path };
        let item = {
            id: Date.now(),
            url: source,
            content: image.data,
        };

        if (imageToBeAddIn === 'cash') {
            let newDataImg = this.state._receiptPhoto;
            newDataImg.push(item);
            this.setState({ _receiptPhoto: newDataImg });
        } else {
            let newDataImg = this.state._checkphoto;
            newDataImg.push(item);
            this.setState({ _checkphoto: newDataImg });
        }
    };

    //FUNCTION FOR CALANDEER PICKER

    render() {


        const ModelImplement = (props) => {
            return (<Modal
                visible={props.visible}
                transparent={true}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: 'black',
                    opacity: 0.9
                }}>
                    <View style={{
                        height: 150,
                        width: 300,
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        borderRadius: 10,
                        overflow: 'hidden'

                    }}>
                        <View style={{
                            height: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white'
                        }}>
                            <Text style={{ color: 'balck' }}>Are you sure to submit the payment ?</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopWidth: 1,
                                borderRightWidth: 1

                            }}>
                                <TouchableOpacity onPress={() => {
                                    Alert.alert("Payment Successfull.....")
                                }}>
                                    <Text style={{ color: 'balck', fontWeight: 'bold' }}>Yes</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopWidth: 1,
                            }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ _modelVisible: false })
                                }}>
                                    <Text style={{ color: 'balck', fontWeight: 'bold' }}>No</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                </View>
            </Modal>)
        }

        return (
            <Root>
                <View style={{ flex: 1 }}>
                    <Header2
                        ShowSteps={true}
                        ShowAandI={false}
                        Step={'2'}
                        Goback={() => {
                            this.props.navigation.goBack();
                        }}>
                        Accepts Payments
                    </Header2>

                    <ModelImplement visible={this.state._modelVisible} />
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={styles.SubHeadingConatiner}>
                                <Text style={styles.SubHeadingTextStyle}>PAYMENT MODE</Text>
                                <Text style={styles.SubHeadingTextStyle}>
                                    Can select more then 1
                                </Text>
                            </View>
                            <View style={styles.SelectModeContainer}>
                                <View style={styles.SelectModeConatiner2}>
                                    <Text
                                        style={{
                                            color: Colors.TexthintColor2,
                                            alignSelf: 'center',
                                        }}>
                                        {this.state._modes.join('+')}
                                    </Text>
                                    <Image
                                        style={{
                                            height: 25,
                                            width: 25,
                                            alignSelf: 'center',
                                        }}
                                        source={require('./Assets/Images/dd_arow.png')}
                                    />
                                </View>
                            </View>
                            <Text
                                style={{
                                    color: Colors.TexthintColor2,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    marginTop: 10,
                                    fontFamily: 'Proxima Nova',
                                }}>
                                Add amount to be paid against each invoice</Text>

                            {this.state._showCashmodule ? (
                                <CashPaymentContainer
                                    PickedAndClickedImage={this.state._receiptPhoto}
                                    PickImageForCash={() => {
                                        this.onClickAddImage('cash');
                                    }}
                                />
                            ) : null}

                            {this.state._showCheqModule ? (
                                <ChequePaymentConatiner
                                    PickedAndClickedImage={this.state._checkphoto}
                                    PickImageForCheck={() => {
                                        this.onClickAddImage('check');
                                    }}
                                />

                            ) : null}

                            <Text
                                style={{
                                    marginLeft: 20,
                                    fontSize: Dimen.FontSizeSmall,
                                    color: Colors.TexthintColor2,
                                }}>
                                REMARKS
                            </Text>
                            <TextInput multiline={true} style={styles.RemarkText} />
                        </ScrollView>
                    </View>

                    <BottomGreenbar
                        DataToBePass={'DATA'}
                        Amount={this.state._amount}
                        Navigation={this.props.navigation}
                        OnNextClick={() => {
                            this.setState({ _modelVisible: true })
                        }}
                    />
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    FlatListStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    SubHeadingConatiner: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SubHeadingTextStyle: {
        color: Colors.TexthintColor2,
        fontWeight: 'bold',
        fontSize: Dimen.FontSizeSmall,
    },
    SelectModeContainer: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        borderRadius: 5,
        backgroundColor: Colors.White,
        borderWidth: 1,
        borderColor: Colors.BorderColor2,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
    },
    SelectModeConatiner2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    FlatListConatiner: {
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        backgroundColor: Colors.White,

        borderWidth: 1,
        borderColor: Colors.BorderColor2,
        borderRadius: 5,
        overflow: 'hidden',
    },
    RemarkText: {
        height: 100,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        borderColor: Colors.BorderColor2,
        marginBottom: 20,
    },
});
