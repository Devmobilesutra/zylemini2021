import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import Colors from './utils/Colors';
import Header2 from './PaymentModuleCommonComponent/Header2';
import Dimen from './utils/Dimen';
import BottomGreenbar from './PaymentModuleCommonComponent/BottomGreenbar';
import CheckBox from 'react-native-check-box';
import { Alert } from 'react-native';

let arry = [];
export default class AcceptPayment2 extends Component {
    isShow = true;

    constructor(props) {
        super(props);
        this.state = {
            _amount: '00,000.00',
            _showSteps: false,
            _showList: false,
            _modes: [],
        };
    }

    render() {
        const DATA = [
            {
                text: 'Cash',
            },
            {
                text: 'Cheque',
            },
            // {
            //   text: 'Online Payment',
            // },
            // {
            //   text: 'Swipe card',
            // },
            // {
            //   text: 'Digital Wallet',
            // },
        ];

        function ListModel(props) {
            const item = props.item.item;
            const [ChangeColor, setChangeColor] = React.useState(
                Colors.TexthintColor2,
            );
            const [checked, setChecked] = React.useState(false);

            const changecolor = newValue => {
                setChangeColor(newValue ? 'black' : Colors.TexthintColor2);
            };

            const ArrayPush = () => {
                arry.push(item.text);
                props.GetArray(arry);
            };

            const ArrayRemove = () => {
                arry = arry.filter(v => v !== item.text);
                props.GetArray(arry);
            };

            return (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}>
                    <CheckBox
                        isChecked={checked}
                        onClick={() => {
                            if (checked) {
                                setChecked(false);
                                changecolor(false);
                                setChecked(false);
                                ArrayRemove();
                            } else {
                                setChecked(true);
                                changecolor(true);
                                setChecked(true);
                                ArrayPush();
                            }
                        }}
                    />
                    <Text
                        style={{
                            marginStart: 10,
                            fontSize: Dimen.FontSizeSmall,
                            color: ChangeColor,
                            fontFamily: 'Proxima Nova',
                        }}>
                        {item.text}
                    </Text>
                </View>
            );
        }

        return (
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
                <View style={{ flex: 1 }}>
                    <View style={styles.SubHeadingConatiner}>
                        <Text style={styles.SubHeadingTextStyle}>PAYMENT MODE</Text>
                        <Text style={styles.SubHeadingTextStyle}>Can select more then 1</Text>
                    </View>

                    <View style={styles.SelectModeContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (this.isShow) {
                                    this.setState({ _showList: true });
                                    this.isShow = false;
                                } else {
                                    this.setState({ _showList: false });
                                    this.isShow = true;
                                }
                            }}>
                            <View style={styles.SelectModeConatiner2}>
                                <Text
                                    style={{
                                        color: Colors.TexthintColor2,
                                        alignSelf: 'center',
                                        fontFamily: 'Proxima Nova',
                                    }}>Select Modes</Text>
                                <Image
                                    style={{ height: 25, width: 25, alignSelf: 'center' }}
                                    source={require('./Assets/Images/dd_arow.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {this.state._showList ? (
                        <View style={styles.FlatListConatiner}>
                            <FlatList
                                data={DATA}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={item => (
                                    <ListModel
                                        item={item}
                                        GetArray={array => {
                                            //this.setState({_modes: array});
                                            console.log('ARRAY:: ', array);
                                        }}
                                    />
                                )}
                            />
                        </View>
                    ) : null}
                </View>

                <BottomGreenbar
                    DataToBePass={'DATA'}
                    Amount={this.state._amount}
                    Navigation={this.props.navigation}
                    OnNextClick={() => {
                        if (arry.length !== 0) {
                            this.props.navigation.navigate('AcceptPayment3', {
                                Mode: arry,
                            });
                        } else {
                            Alert.alert('Please select Payment Mode');
                        }
                    }}
                />
            </View>
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
        //fontWeight: 'bold',
        fontSize: Dimen.FontSizeSmall,
        fontFamily: 'Proxima Nova',
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
        // height: 215,
        borderWidth: 1,
        borderColor: Colors.BorderColor2,
        borderRadius: 5,
        overflow: 'hidden',
    },
});
