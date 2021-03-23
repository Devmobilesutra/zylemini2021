import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableWithoutFeedback,
    ScrollView,
    //BackHandler,
    TextInput,
} from 'react-native';

import Colors from './utils/Colors';
import Dimen from './utils/Dimen';
import Header2 from './PaymentModuleCommonComponent/Header2';
import AcceptPaymentSCreenListModel from './ListModels/AcceptPaymentSCreenListModel';

import { Actions } from 'react-native-router-flux';
import { KeyboardAvoidingView } from 'react-native';
import Card from './Components/Card';

import Database from '../../utility/Database';
import { Alert } from 'react-native';
const db = new Database();

let TotleAmount = 0;
let ITEM;
export default class AcceptPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _amount: 0,
            _showSteps: false,
            _invoiceList: [],
            _initalAmount: 0,
            _id: props.id,
        };
    }

    componentDidMount() {
        this.getHistoryOrderFromDB();
    }

    getHistoryOrderFromDB() {
        db.getTotalOrderDetails(this.state._id).then(data => {

            let addition = 0;
            data.find(obj => {
                addition = addition + parseInt(obj.Amount);
            });
            this.setState({
                _invoiceList: data,
                _initalAmount: addition,
            });


        });
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header2
                    ShowSteps={this.state._showSteps}
                    Step={'1'}
                    ShowAandI={true}
                    Goback={() => {
                        this.props.navigation.goBack();
                    }}
                    OutStandingAmount={this.state._initalAmount}
                    NoumberOfInvoices={this.state._invoiceList.length}>
                    Accepts Payments
                </Header2>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            margin: 20,
                            color: Colors.TexthintColor,
                            fontFamily: 'Proxima Nova',
                        }}>Add amount to be paid against each invoice</Text>
                    <FlatList
                        style={styles.FlatListStyle}
                        keyboardDismissMode="none"
                        //keyboardShouldPersistTaps="handled"
                        data={this.state._invoiceList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={item => (
                            <AcceptPaymentSCreenListModel
                                item={item}
                                Amount={TotleAmount}
                                ShowSteps={value => {
                                    this.setState({
                                        _showSteps: value,
                                    });
                                }}
                                GetItemDetail={(detail, amount) => {
                                    ITEM = detail;
                                    TotleAmount = amount
                                }}

                            />
                        )}
                    />
                </View>

                <View
                    style={{
                        height: 60,
                        backgroundColor: Colors.DarkGreen,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text
                            style={{
                                fontSize: Dimen.FontSizeVerySmall,
                                color: Colors.White,
                                fontFamily: 'Proxima Nova',
                            }}>
                            TOTLE AMOUNT TO BE PAID</Text>
                        <Text style={{ color: Colors.White }}>{TotleAmount}</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {

                            if (TotleAmount > 0) {
                                let Obj = {
                                    amt: TotleAmount,
                                    item: ITEM
                                }
                                this.props.navigation.navigate('AcceptPayment2', {
                                    Obj: Obj
                                });
                            } else {
                                Alert.alert("Please fill some amount ")
                            }


                        }}>
                        <Text
                            style={{
                                marginRight: 10,
                                color: Colors.White,
                                fontFamily: 'Proxima Nova',
                            }}>
                            NEXT
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    FlatListStyle: {
        marginLeft: 10,
        marginRight: 10,
    },
    ///////////////////////
    MainConatiner: {
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
    },
    HeadingConatiner: {
        height: 50,
        //backgroundColor: Colors.TexthintColor2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    AreaTextStyle: {
        marginRight: 15,
        fontSize: Dimen.FontSizeVerySmall,
        fontWeight: 'bold',
        color: Colors.TexthintColor,
    },
    OrderAndAmountContainer: { marginLeft: 50 },
    SubHeadingStyle: {
        color: Colors.TexthintColor,
        fontWeight: 'bold',
        fontSize: Dimen.FontSizeVerySmall,
    },
    Text2Style: {
        marginTop: 10,
        color: Colors.TexthintColor,
    },
    DuePaymentTextStyle: {
        marginTop: 10,
        color: Colors.Orange,
    },
    Line: {
        borderWidth: 0.5,
        borderColor: Colors.TexthintColor2,
        marginLeft: 5,
        marginRight: 5,
    },
    SubHeaadingContainer: {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
    },
    LastRowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    InProgressButtonContainer: {
        height: 30,
        width: 90,
        marginTop: 10,
        backgroundColor: Colors.ButtonColor,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ShopnameText: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: Colors.TextColor2,
    },
    LINESTYLE: {
        borderColor: Colors.Black,
        borderWidth: 1,
    },
});
