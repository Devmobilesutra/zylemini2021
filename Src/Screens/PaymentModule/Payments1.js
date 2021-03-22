import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    AsyncStorage,
    BackHandler,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import Header from './PaymentModuleCommonComponent/Header';
import Colors from './utils/Colors';
import OrdersAndFilter from './PaymentScreenComponents/OrdersAndFilter';
import HistryorderFilter from './PaymentScreenComponents/HistryorderFilter';
import PaymentScreenOutStandingListModel from './ListModels/PaymentScreenOutStandingListModel';
import PaymentScreenPrviousOrderListModel from './ListModels/PaymentScreenPrviousOrderListModel';
import { FloatingAction } from 'react-native-floating-action';

import Database from '../../utility/Database';
const db = new Database();

var open;
const actions = [
    {
        text: 'Accept Payment',
        color: 'transperent',
        name: 'bt_payment',
        position: 3,
        textColor: 'black',
        textStyle: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 15 },
        buttonSize: 0,
    },
];


const DATA = [
    {
        ActivityEnd: '2021-3-8 14:27:43',
        ActivityStart: '2021-3-8 14:26:36',
        ActivityStatus: '0',
        ExpectedDeliveryDate: '08-Mar-2021',
        sync_flag: 'N',
        selected_flag: '1',
        user_id: '54923',
        to_date: '2021-03-08 14:27:28',
        from_date: '2021-03-08 14:27:28',
        total_amount: '111.11',
        longitude: '73.896864',
        id: '08032021142728',
        Party: 'Sri Mahalingeshwara Enterprises Hongasandra (18244)',
        AREA: 'BANGALORE - AREA',
        DefaultDistributorId: '',
        check_date: '2021-3-8',
        remark: '',
        collection_type: '0',
        latitude: '18.4223144',
        entity_id: '105604',
        entity_type: '1',
        Current_date_time: '2021-03-08 14:27:28',
    },
    {
        ActivityEnd: '2021-3-8 14:27:43',
        ActivityStart: '2021-3-8 14:26:36',
        ActivityStatus: '0',
        ExpectedDeliveryDate: '08-Mar-2021',
        sync_flag: 'N',
        selected_flag: '1',
        user_id: '54923',
        to_date: '2021-03-08 14:27:28',
        from_date: '2021-03-08 14:27:28',
        total_amount: '111.11',
        longitude: '73.896864',
        id: '08032021142728',
        Party: 'Sri Mahalingeshwara Enterprises Hongasandra (18244)',
        AREA: 'BANGALORE - AREA',
        DefaultDistributorId: '',
        check_date: '2021-3-8',
        remark: '',
        collection_type: '0',
        latitude: '18.4223144',
        entity_id: '105604',
        entity_type: '1',
        Current_date_time: '2021-03-08 14:27:28',
    },
];

export default class Payments1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _isOutStanding: true,
            _isHistory: false,
            _name: '',
            _outstandingOrder: [],
            _historyOrder: [],
            _O_orders: 0,
            initalAmount: 0,
            _h_totle: 0,
            name: '',
            active: false,
        };
    }

    componentDidMount() {
        this.getOutstandingOrderFormDB();
    }

    getOutstandingOrderFormDB() {
        this.setState({ _outstandingOrder: [] });
        AsyncStorage.getItem('username').then(keyValue => {
            this.setState({
                name: JSON.parse(keyValue),
            });
        });
        db.getAllOrders().then(data => {
            let addition = 0;
            data.find(obj => {
                addition = addition + parseInt(obj.total_amount);
            });
            this.setState({
                _outstandingOrder: data,
                initalAmount: addition,
            });
            //this.setState({_O_orders: this.state._outstandingOrder.length});
        });
    }

    getHistoryOrderFromDB() {
        db.getAllOrders('Y').then(data => {
            console.log("HISTORYORDER::", data)
            this.setState({ _historyOrder: data });
        });
    }

    render() {
        const _orderCondition = this.state._isOutStanding === true;

        return (
            <View style={styles.MainContainer}>
                <Header
                    Goback={() => {
                        Actions.App();
                    }}
                    Outstanding={() => {
                        this.setState({
                            _isHistory: false,
                            _isOutStanding: true,
                        });
                        this.getOutstandingOrderFormDB();
                    }}
                    Histry={() => {
                        this.setState({
                            _isHistory: true,
                            _isOutStanding: false,
                        });
                        this.getHistoryOrderFromDB();
                    }}
                    OnSearchPress={() => {
                        console.log('Search Clicked');
                    }}
                />
                <View style={{ flex: 1 }}>
                    {_orderCondition ? (
                        <OrdersAndFilter
                            outStandingOredr={JSON.stringify(
                                this.state._outstandingOrder.length,
                            )}
                            TotalOutStandingAmount={this.state.initalAmount}
                        />
                    ) : (
                        <HistryorderFilter Amount={this.state._historyOrder.length} />
                    )}

                    <Dash dashLength={2} dashColor="#ADA2A2" />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            style={styles.FlatListStyle}
                            data={
                                _orderCondition
                                    ? this.state._outstandingOrder
                                    : this.state._historyOrder
                            }
                            //data={_orderCondition ? DATA : this.state._historyOrder}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={item =>
                                _orderCondition ? (
                                    <PaymentScreenOutStandingListModel
                                        item={item}
                                        OnPressViewDetail={() => {
                                            this.props.navigation.navigate('AcceptPayment');
                                        }}
                                    />
                                ) : (
                                    <PaymentScreenPrviousOrderListModel
                                        item={item}
                                        InitialAmount={this.state.initalAmount}
                                        GetAddition={x => { }}
                                        OnPressViewDetail={(item) => {
                                            //Actions.AcceptPayment();
                                            console.log("PRINTING ID:: ", item.id)
                                            this.props.navigation.navigate('AcceptPayment', {
                                                id: item.id

                                            })
                                        }}
                                    />
                                )
                            }
                        />
                        <FloatingAction
                            open={open}
                            color="#a10d59"
                            actions={actions}
                            buttonSize={hp('9.5')}
                            floatingIcon={
                                this.state.active == false
                                    ? require('../../assets/Icons/Floating.png')
                                    : require('../../assets/Icons/FAB_Close_Menu.png')
                            }
                            iconWidth={wp(20)}
                            iconHeight={hp(16)}
                            shadow="null"
                            overlayColor="#221818"
                            showBackground={true}
                            onPressItem={name => {
                                if (name == 'bt_payment') {
                                    Actions.AcceptPayment();
                                    this.setState({
                                        active: !this.state.active,
                                    });
                                }
                            }}
                            onPressMain={() => {
                                if (this.state.active == false) {
                                    this.setState({
                                        active: !this.state.active,
                                    });
                                } else {
                                    this.setState({
                                        active: !this.state.active,
                                    });
                                }
                            }}
                            onPressBackdrop={() => {
                                if (this.state.active == false) {
                                    this.setState({
                                        active: !this.state.active,
                                    });
                                } else {
                                    this.setState({
                                        active: !this.state.active,
                                    });
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: { flex: 1 },
    FlatListStyle: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});

// BackHandler.addEventListener(
//   'hardwareBackPress',
//   this.handleBackButtonClick(),
// );

// componentWillUnmount() {
//   BackHandler.removeEventListener(
//     'hardwareBackPress',
//     this.handleBackButtonClick,
//   );
// }

// handleBackButtonClick() {
//   console.log('BACK FUNCTION CALLED');
//   Actions.drawerMenu();
//   return true;
// }

//this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

//const DATA2 = [
//   {
//     ActivityEnd: '1900-01-01T00:00:00',
//     ActivityStart: '1900-01-01T00:00:00',
//     ActivityStatus: '0',
//     ExpectedDeliveryDate: '2021-03-09T00:00:00',
//     sync_flag: 'Y',
//     selected_flag: '',
//     user_id: '54923',
//     to_date: '2021-03-09T00:00:00',
//     from_date: '2021-03-09T00:00:00',
//     total_amount: '1428',
//     longitude: '75.549687',
//     id: '09032021181601',
//     Party: 'Deepak Raj N KSBCL - HONGASANDRA (15145)',
//     AREA: 'BANGALORE - AREA',
//     DefaultDistributorId: '0',
//     check_date: '',
//     remark: '',
//     collection_type: '0',
//     latitude: '20.994353',
//     entity_id: '76281',
//     entity_type: '1',
//     Current_date_time: '2021-03-09T18:16:01',
//   },
// ];
