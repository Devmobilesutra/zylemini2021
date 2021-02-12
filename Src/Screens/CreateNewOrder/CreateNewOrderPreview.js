import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  ImageBackground,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
  SlideAnimation
} from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import Database from './../../utility/Database';
import {Actions} from 'react-native-router-flux';
import {InputAutoSuggest} from 'react-native-autocomplete-search';
const db = new Database();
import EditInlineOnOrderPreview from './EditInlineOnOrderPreview';
import {DrawerActions} from 'react-navigation-drawer';
import {TOTAL_ORDER_VALUE} from '../../Redux/actions/CreateOrderAction';
import CalendarPicker from 'react-native-calendar-picker';
//PREVIOUSDAYORDERDAYS
var datess;
var newDate;
var selectedStartDate;
var selectedStartDate1;
var totalAmounts;
export class CreateNewOrderPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      app_order_id: '',
      outletId: '',
      outletName: '',
      visible: '',
      visiblepopup :'',
      remark: '',
      // selectedStartDate: '',
      visiblecal: '',
      visiblecal1: '',

      collapsed: false,
      from_date: '',
      BrandList: [],
      amount: '',
      refresh: false,
      orderData: [],
      MasterorderData: [],
      refreshDelete: false,
      totalAmount: '',
      total: '',
      PREVIOUSDAYORDERDAYS: '',
      item_data1: [],
      msg: '',
      mobile_no: '9545106161',
    };
  }
  // forceUpdateHandler() {
  //   this.forceUpdate();
  // }
  componentDidMount() {
      
    // setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 }
 componentWillUnmount() {
  console.log('in back press')
//  this.setState({visiblepopup : false})
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
 }
 shouldComponentUpdate() {
     return true;
   }
   
 handleBackButtonClick() {
   
  // this.setState({visiblepopup : false})
     return true;
 }
  WhatsAppShare = () => {
    // [{"user_id":"52362","collection_type":"0","total_amount":"1100","longitude":"73.8100302","latitude":"18.4942158","entity_id":"47853","entity_type":"1","Current_date_time":"2020-6-14 17:47:52","id":"1462020174752"}]
    //console.log("MasterorderData+++++",JSON.stringify(this.state.MasterorderData))
    let url =
      'whatsapp://send?text=' +
      'RetailerOrdrAmount=' +
      this.state.totalAmount +
      '&phone=91' +
      this.state.mobile_no;
    Linking.openURL(url)
      .then(data => {
        //console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  refreshDelete(app_order_id, ItemId) {
    AsyncStorage.getItem('outletId').then(keyValue => {
      this.setState({outletId: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('outletName').then(keyValue => {
      this.setState({outletName: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('app_order_id').then(keyValue => {
      var a = JSON.parse(keyValue);
      db.getInsertedsTempOrder(a).then(getdata => {
        this.setState({
          BrandList: getdata,
        });
        var amountss = 0;
        for (var i = 0; i < this.state.BrandList.length; i++) {
          // this.state.total +=this.state.BrandList[i].Amount
          amountss += parseInt(this.state.BrandList[i].Amount);
          this.state.total = amountss;
          this.setState({total: amountss});
        }
      });
    });
  }

  static navigationOptions = {
    title: 'Order Preview',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      marginLeft: wp('-2'),
      fontSize: 20,
    },
    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
      
        <TouchableOpacity onPress={() => Actions.CreateNewOrderSecond()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };

  discardClickHandler(e) {
    AsyncStorage.getItem('app_order_id').then(keyValue => {
      var a = JSON.parse(keyValue);
      db.selectOrdersDetail(a).then(data => {
        for (var i = 0; i < data.length; i++) {
          db.updateTABLE_PITEM_ADDEDITBRAND(data[i].item_id, false, false);
          db.updateTABLE_PITEM_btleQty(data[i].item_id, '');
          db.discardOrders(a);
          db.discardOrdersMaster(a);
          db.discardDiscount(a);
        }
      });

      //changing both discard from here to above...........
      db.getInsertedsTempOrder(a).then(getdata => {
        this.setState({BrandList: getdata});
        Actions.CreateNewOrderSecond();
      });
    });
    // this.props.refresh(orderId, this.props.ItemId)
  }

 

  saveClickHandler(e) {
    //////////insert into main Detail Table
    AsyncStorage.getItem('app_order_id').then(keyValue => {
      var a = JSON.parse(keyValue);
      db.getOrderDataFromTempOrderDetails(a).then(data => {
        //console.log("data=",data)
        this.setState({orderData: data});
        totalAmounts = 0;
        //
        // })  //not here

        this.state.orderData.map((item, i) => {
          //console.log("sachins1.//////////////////////////////////////////=",k)
          db.checkOrderInOrderDetailsMain1(item.item_id, a).then(item_data => {
            //console.log("item_data=",item_data)
            if (item_data.length == 0) {
              // [{"Amount":"700","rate":"2","to_date":"","from_date":"2020-4-15 14:23:54","large_Unit":"0","small_Unit":"0","quantity_two":"0","quantity_one":"35","item_Name":"{0062}DYC SELECT 180 ML X 48 42.8 %","item_id":"81","order_id":"1542020142354","id":1},
              // {"Amount":"60","rate":"3","to_date":"","from_date":"","large_Unit":"0","small_Unit":"0","quantity_two":"0","quantity_one":"2","item_Name":"{0063}DYC SELECT  375 ML X 24 42.8 %","item_id":"82","order_id":"1542020142354","id":11}]

              db.insertOrderDetails(
                item.order_id,
                item.item_id,
                item.item_Name,
                item.quantity_one,
                item.quantity_two,
                item.small_Unit,
                item.large_Unit,
                item.rate,
                item.Amount,
                '1',
                'N',
              );
            } else {
              db.updateDetailMain(
                item.quantity_one,
                item.quantity_two,
                item.small_Unit,
                item.large_Unit,
                item.rate,
                item.Amount,
                item.order_id,
                item.item_id,
              );
            }
          });
          totalAmounts = totalAmounts + parseInt(item.Amount);
        }); ////end of for loop

        this.ordersavePopUp();
        this.insertIntoOrderMaster();

        // Alert.alert(
        //   'ZyleminiPlus',
        //   'Order Inserted.',
        //   [
        //     // {
        //     //   text: "Cancel",
        //     //   onPress: () => console.log("Cancel Pressed"),
        //     //   style: "cancel"onPress={() => this.props.navigation.navigate('MJP_one')}
        //     // },
        //     {text: 'OK', onPress: () => this.insertIntoOrderMaster()},
        //   ],
        //   {cancelable: false},
        // );

        //  insert into master main
        // AsyncStorage.getItem('app_order_id').then((keyValue) => {
        //     var a = JSON.parse(keyValue)
        //        db.getTotalamountOfOrder(a).then((data1) => {
        //     db.getOrderDataFromTempOrderMaster(a, "0").then((data) => {

        //         this.setState({ MasterorderData: data })

        //         for (let i = 0; i < this.state.MasterorderData.length; i++) {

        //             db.checkOrderInTempOrderMasterMain(this.state.MasterorderData[i].id, "0").then((item_data) => {

        //                 if (item_data.length === 0) {

        //                     var date = new Date().getDate();
        //                     var month = new Date().getMonth() + 1;
        //                     var year = new Date().getFullYear();
        //                     datess = year + '-' + month + '-' + date
        //                     //var  newDate = moment(datess, 'yyyy-MM-dd').format('yyyy-MMM-dd')
        //                     newDate = moment().format('YYYY-MMM-DD')

        //                     db.insertOrderMastersss(this.state.MasterorderData[0].id, this.state.MasterorderData[0].Current_date_time, this.state.MasterorderData[0].entity_type, this.state.MasterorderData[0].entity_id,
        //                         this.state.MasterorderData[0].latitude, this.state.MasterorderData[0].longitude, data1[0].TotalAmount, this.state.from_date, this.state.from_date,
        //                         "0", this.state.MasterorderData[0].user_id, this.state.remark, "1", "N", datess, "", newDate)

        //                 } else {

        //                     // Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,order_id,collection_type
        //                     db.updateMasterMain(this.state.MasterorderData[0].Current_date_time,
        //                         this.state.MasterorderData[0].entity_type, this.state.MasterorderData[0].entity_id,
        //                         this.state.MasterorderData[0].latitude,
        //                         this.state.MasterorderData[0].longitude,
        //                         data1[0].TotalAmount, this.state.from_date, this.state.from_date, this.state.MasterorderData[0].id, "0")

        //                 }
        //             })

        //             db.deleteTempOrderDetails(this.state.MasterorderData[0].entity_id, "0").then((data) => {
        //                 AsyncStorage.setItem('outletName', "");
        //                 AsyncStorage.setItem('outletId', "");
        //                 AsyncStorage.setItem('beatName', "");
        //                 AsyncStorage.setItem('beatId', "");
        //                 AsyncStorage.setItem('distributorName', "");
        //                 AsyncStorage.setItem('SearchString', "");

        //                 db.getInsertedsTempOrder(a).then((getdata) => {

        //                     this.setState({ BrandList: getdata })

        //                 })
        //                 AsyncStorage.setItem('outletName', "");
        //                 AsyncStorage.setItem('outletId', "");
        //                 AsyncStorage.setItem('beatName', "");
        //                 AsyncStorage.setItem('beatId', "");
        //                 AsyncStorage.setItem('distributorName', "");
        //                 AsyncStorage.setItem('SearchString', "");

        //             })
        //             db.deleteTempOrderMater(this.state.MasterorderData[0].entity_id, "0").then((getdata) => {

        //             })
        //             AsyncStorage.setItem('outletName', "");
        //             AsyncStorage.setItem('outletId', "");
        //             AsyncStorage.setItem('beatName', "");
        //             AsyncStorage.setItem('beatId', "");
        //             AsyncStorage.setItem('distributorName', "");
        //             AsyncStorage.setItem('SearchString', "");

        //             Actions.CreateNewOrderFirst();
        //         }

        //     })
        // })
        // })
      });
    });

   //  delete from TABLE_TEMP_ORDER_DETAILS where order_id IN (select id from TABLE_TEMP_OrderMaster where entity_id = '%@' and collection_type = '%@')",entity_id,collection_type
  }

  insertIntoOrderMaster() {
    AsyncStorage.getItem('app_order_id').then((keyValue) => {
        var a = JSON.parse(keyValue)
        AsyncStorage.getItem('ActivityStart').then((keyValue) => {
            // this.setState({ outletId: JSON.parse(keyValue) })
            var ActivityStart = JSON.parse(keyValue)
            db.getTotalamountOfOrder(a).then((data1) => {
                db.getOrderDataFromTempOrderMaster(a, "0").then((data) => {

                    this.setState({ MasterorderData: data })
    
                    for (let i = 0; i < this.state.MasterorderData.length; i++) {
    
                        db.checkOrderInTempOrderMasterMain(this.state.MasterorderData[i].id, "0").then((item_data) => {
                            var date = new Date().getDate();
                            var month = new Date().getMonth() + 1;
                            var year = new Date().getFullYear();
                            datess = year + '-' + month + '-' + date
                            var hours = new Date().getHours(); //Current Hours
                            var min = new Date().getMinutes(); //Current Minutes
                            var sec = new Date().getSeconds(); //Current Seconds
                           
                          var ActivityEnd = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
                             
                            //var  newDate = moment(datess, 'yyyy-MM-dd').format('yyyy-MMM-dd')
                            newDate = moment().format('YYYY-MMM-DD')
                            if (item_data.length === 0) {
    
                                db.insertOrderMastersss(this.state.MasterorderData[0].id, this.state.MasterorderData[0].Current_date_time, this.state.MasterorderData[0].entity_type, this.state.MasterorderData[0].entity_id,
                                    this.state.MasterorderData[0].latitude, this.state.MasterorderData[0].longitude, data1[0].TotalAmount, this.state.from_date, this.state.from_date,
                                    "0", this.state.MasterorderData[0].user_id, this.state.remark, "1", "N", datess, "", selectedStartDate,"0",ActivityStart,ActivityEnd)
    
                            } else {
    
                                // Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,order_id,collection_type
                                db.updateMasterMain(this.state.MasterorderData[0].Current_date_time,
                                    this.state.MasterorderData[0].entity_type, this.state.MasterorderData[0].entity_id,
                                    this.state.MasterorderData[0].latitude,
                                    this.state.MasterorderData[0].longitude,
                                    data1[0].TotalAmount, this.state.from_date, this.state.from_date, this.state.MasterorderData[0].id, "0",selectedStartDate,datess,ActivityEnd)
    
    
                            }
                        })
    
                        db.deleteTempOrderDetails(this.state.MasterorderData[0].entity_id, "0").then((data) => {
                            AsyncStorage.setItem('outletName', "");
                            AsyncStorage.setItem('outletId', "");
                            AsyncStorage.setItem('beatName', "");
                            AsyncStorage.setItem('beatId', "");
                            AsyncStorage.setItem('distributorName', "");
                            AsyncStorage.setItem('SearchString', "");
    
                            db.getInsertedsTempOrder(a).then((getdata) => {
    
                                this.setState({ BrandList: getdata })
    
                            })
                            AsyncStorage.setItem('outletName', "");
                            AsyncStorage.setItem('outletId', "");
                            AsyncStorage.setItem('beatName', "");
                            AsyncStorage.setItem('beatId', "");
                            AsyncStorage.setItem('distributorName', "");
                            AsyncStorage.setItem('SearchString', "");
    
    
    
                        })
                        db.deleteTempOrderMater(this.state.MasterorderData[0].entity_id, "0").then((getdata) => {
    
                        })
                        AsyncStorage.setItem('outletName', "");
                        AsyncStorage.setItem('outletId', "");
                        AsyncStorage.setItem('beatName', "");
                        AsyncStorage.setItem('beatId', "");
                        AsyncStorage.setItem('distributorName', "");
                        AsyncStorage.setItem('SearchString', "");
    
    
                      //  Actions.CreateNewOrderFirst();
                    }
    
                })
            })
           })
      
       
    })
}
  changeAmount(value) {
    //  alert("in change amount")
    this.setState({amount: value});
  }

  componentWillMount() {
  //  this._componentFocused();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused,
    );

    this.props.navigation.addListener('didBlur', () => {
      // user has navigated away from this screen
    });
  }
  _componentFocused = () => {
    //getPrevOrdersDayNo
    db.getPrevOrdersDayNo().then(data => {
      var prod = [];
      prod = data;
      prod.map((Value, i) => {
        this.setState({PREVIOUSDAYORDERDAYS: Value.Value});
      });
    });
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    datess = year + '-' + month + '-' + date;

    newDate = moment().format('DD-MMM-YYYY');
    selectedStartDate = newDate;
    selectedStartDate1 = newDate;

    AsyncStorage.getItem('outletId').then(keyValue => {
      this.setState({outletId: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('outletName').then(keyValue => {
      this.setState({outletName: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('app_order_id').then(keyValue => {
      var a = JSON.parse(keyValue);

      db.getInsertedsTempOrder(a).then(getdata => {
        this.setState({BrandList: getdata});
        var amountss = 0;
        for (var i = 0; i < this.state.BrandList.length; i++) {
          amountss += parseInt(this.state.BrandList[i].Amount);
          this.state.total = amountss;
          this.setState({total: amountss});
        }
      });
      //    [{"to_date":"","from_date":"4/4/2020 19:44:39","large_Unit":"0","small_Unit":"0","Amount":"750.5","quantity_one":"25","id":4,"bpc":"12","quantity_two":"2","rate":"3","item_Name":"{0061}DYC  750 ML X 12 42.8 %","item_id":"78","order_id":"442020194439"}]
    });
  };
  onChangeTextRemark(val) {
    this.setState({remark: val});
  }

  onDateChange(dates) {
    var d = new Date(dates);

    var maxDate = moment(d)
      .utc()
      .format('DD-MMM-YYYY');

    selectedStartDate = maxDate;
  }
  onDateChange1(dates) {
    var d = new Date(dates);

    var maxDate = moment(d)
      .utc()
      .format('DD-MMM-YYYY');

    selectedStartDate1 = maxDate;
  }

  calenderpopup = () => {
    const {navigation} = this.props;
    this.setState({visiblecal: true});
  };
  calenderpopup1 = () => {
    const {navigation} = this.props;
    this.setState({visiblecal1: true});
  };

  applicablePopUp = () => {
    const {navigation} = this.props;
    this.setState({visible: true});
  };

  ordersavePopUp = () => {
    const {navigation} = this.props;
    this.setState({visiblepopup: true});
  };

  renderPopup(){
    return(

                  <TouchableOpacity onPress={this.ordersavePopUp.bind(this)}>
                    <View>
                      {/* <Button
                                                title="Show Dialog"
                                                onPress={() => {
                                                this.setState({ visible: true });
                                                }}
                                            /> */}
                      <Dialog
                        visible={this.state.visiblepopup}
                        dialogAnimation={new SlideAnimation({
                          slideFrom: 'bottom',
                        })}
                        onTouchOutside={() => {
                          this.setState({visiblepopup: true});
                        }}
                        width={wp('90')}
                        dialogTitle={
                          <DialogTitle
                            title="Meeting Module"
                          
                            style={{
                              backgroundColor: '#F7F7F8',
                              height : wp('15'),
                              alignItems :'center'
                             
                            }}
                            hasTitleBar={false}
                            align="left"
                          />
                        }
                        footer={
                          <DialogFooter>
                            <DialogButton
                              text="OK"
                              textStyle={{color: 'white'}}
                              style={{backgroundColor: '#46BE50'}}
                              onPress={() => {
                                this.setState({visiblepopup: false});
                                Actions.Dashboard();
                               // this.insertIntoOrderMaster();
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <View style={styles.appliSchemesMainContainer}>
                            <View style={styles.appliSchemesRowContainer}>
                              {/* <View style={styles.roundedtext}>
                                <Image
                                  style={{tintColor: '#EAA304'}}
                                  source={require('../../assets/Icons/Schemes_drawer.png')}
                                />
                              </View> */}

                              <Text style={styles.appliSchemeTextStyle}>
                              Order Saved Successfully..
                              </Text>
                            </View>
                          </View>
                         
                        </DialogContent>
                      </Dialog>
                    </View>

                    {/* <Image
                      style={styles.appliSchemesArrowStyle}
                      source={require('../../assets/Icons/right_arrow_blue.png')}
                    /> */}
                  </TouchableOpacity>
               
    )
}

  SchemesArrow() {
    if (this.state.collapsed == false) {
      return (
        <View>
          <Image
            style={styles.sublistIconStyle}
            source={require('../../assets/Icons/Add_white.png')}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={styles.sublistIconStyle}
            source={require('../../assets/Icons/minus_white.png')}
          />
        </View>
      );
    }
  }

  setamount = amount => {
    this.setState({amount: amount});
  };

  ParentCalled(am) {
    //   alert(am)
    AsyncStorage.getItem('outletId').then(keyValue => {
      this.setState({outletId: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('outletName').then(keyValue => {
      this.setState({outletName: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('app_order_id').then(keyValue => {
      var a = JSON.parse(keyValue);
      db.getInsertedsTempOrder(a).then(getdata => {
        this.setState({
          BrandList: getdata,
        });
        var amountss = 0;
        for (var i = 0; i < this.state.BrandList.length; i++) {
          amountss += parseInt(this.state.BrandList[i].Amount);
          this.state.total = amountss;
          this.setState({total: amountss});
        }
      });
    });
  }

  returnBrand() {
    const {navigation} = this.props;
    //  if (this.state.BrandList) {
    return this.state.BrandList.map((item, i) => {
      //this.setState({amount:item.Amount})
      this.state.amount = item.Amount;
      this.state.from_date = item.from_date;
      return (
        <View style={styles.orderSerchResultMainContainer}>
          <Collapse
            onToggle={() => this.setState({collapsed: !this.state.collapsed})}>
            <CollapseHeader style={styles.collapseHeaderStyle}>
              <View style={styles.brandNameContainer}>
                <Text style={styles.brandNameTextContainer}>
                  {item.item_Name}
                </Text>
              </View>
              <View style={styles.sublistExtendIconAmountContainer}>
                <Text style={styles.sublistAmountTextStyle}>
                  {this.state.amount}
                </Text>
                <View>{this.SchemesArrow()}</View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <ListItem>
                <EditInlineOnOrderPreview
                  navigation={navigation}
                  box={item.quantity_one}
                  unit={item.quantity_two}
                  freeBox={item.small_Unit}
                  freeUnit={item.large_Unit}
                  enteredRate={item.rate}
                  amount={item.Amount}
                  setamount={this.setamount.bind(this)}
                  bpc={item.bpc}
                  from_date={item.from_date}
                  to_date={item.to_date}
                  orderId={item.order_id}
                  ItemId={item.item_id}
                  itemName={item.item_Name}
                  outletId={this.state.outletId}
                  ParentCalled={this.ParentCalled.bind(this)}
                  refresh={this.refreshDelete.bind(this)}
                />
              </ListItem>
            </CollapseBody>
          </Collapse>
        </View>
      );
    });
  }

  render() {
    const startDate = selectedStartDate
      ? selectedStartDate.toString()
      : newDate;
    const minDate = new Date(Date.now()); // Min date
    const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Max date

    const startDate1 = selectedStartDate1
      ? selectedStartDate1.toString()
      : newDate;
    const minDate1 = new Date(
      Date.now() - this.state.PREVIOUSDAYORDERDAYS * 24 * 60 * 60 * 1000,
    ); // Min date
    const maxDate1 = new Date(Date.now()); // Max date

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.container}>
              <View style={styles.totalOrderContainer}>
                <Text style={styles.totalOrderValueText}>
                  {'TOTAL ORDER VALUE {INR}'}
                </Text>
                <Text style={styles.totalOrderValuesValueText}>
                  {/* {this.props.createOrder.totalOrderValue} */}
                  {this.state.total}
                </Text>
              </View>

              <View style={styles.orderDateContainer}>
                <Text style={styles.orderDateText}>ORDER DATE</Text>
                <View style={styles.dateCalendarRowContainer}>
                  <Text style={styles.orderDatesDate}>{startDate1}</Text>
                  <TouchableOpacity onPress={this.calenderpopup1.bind(this)}>
                    <View>
                      <Dialog
                        visible={this.state.visiblecal1}
                        onTouchOutside={() => {
                          this.setState({visiblecal1: false});
                        }}
                        previousTitle="<"
                        previousTitleStyle={{color: '#fff'}}
                        nextTitle=">"
                        nextTitleStyle={{color: '#f00'}}
                        width={wp('93')}
                        footer={
                          <DialogFooter>
                            <DialogButton
                              text="OK"
                              textStyle={{color: 'white'}}
                              style={{backgroundColor: '#46BE50'}}
                              onPress={() => {
                                this.setState({visiblecal1: false});
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <CalendarPicker
                            previousTitle="Previous"
                            nextTitle="Next"
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            textStyle={{
                              fontFamily: 'Cochin',
                              color: '#000000',
                            }}
                            startFromMonday={true}
                            minDate={minDate1}
                            maxDate={maxDate1}
                            onDateChange={this.onDateChange1}
                          />
                        </DialogContent>
                      </Dialog>
                    </View>

                    <Image
                      style={styles.calendarImg}
                      source={require('../../assets/Icons/Calendar_normal.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Store Name and History */}
            <View style={{flex: 0.1}}>
              <View style={styles.storeInfoMainContainer}>
                <View style={styles.storeTextContainer}>
                  <Text style={styles.storeNameText}>
                    {this.state.outletName}
                  </Text>
                </View>

                <View style={styles.historyTextContainer}>
                  <Text style={styles.historyText}>HISTORY</Text>
                </View>
              </View>
            </View>

            {/* Dash Line */}
            <View style={styles.dashLineContainer}>
              <Dash
                style={styles.dashLineStyle}
                dashLength={2}
                dashColor="#ADA2A2"
              />
            </View>

            {/* Order Preview */}
            <View style={{flex: 0.1}}>
              <View style={styles.orderPreivewContainer}>
                <View style={styles.OrderPreviewTextContainer}>
                  <Text style={styles.orderPreviewText}>Order Preview</Text>
                </View>

                <View style={styles.amountINRTextContainer}>
                  <Text style={styles.amountINRText}>Amount in INR</Text>
                </View>
              </View>
            </View>

            {this.returnBrand()}

            {/* Dash Line Below Order Preview*/}
            <View style={styles.dashLineContainerBelowOrderPreview}>
              <Dash
                style={styles.dashLineStyle}
                dashLength={2}
                dashColor="#ADA2A2"
              />
            </View>

            {/* Applicable Schemes */}
            <View style={styles.applicableSchemesMainContainer}>
              <View style={styles.applicableSchemesCardContainer}>
                <View style={styles.applicableSchemesIconLabelContainer}>
                  <View style={styles.roundedtext}>
                    <Image
                      style={{tintColor: '#EAA304'}}
                      source={require('../../assets/Icons/Schemes_drawer.png')}
                    />
                  </View>

                  <Text style={styles.appliSchemesTextStyle}>
                    Applicable Schemes( 13 )
                  </Text>
                </View>
                <View style={styles.appliSchemesArrowContainer}>
                  <TouchableOpacity onPress={this.applicablePopUp.bind(this)}>
                    <View>
                      {/* <Button
                                                title="Show Dialog"
                                                onPress={() => {
                                                this.setState({ visible: true });
                                                }}
                                            /> */}
                      <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                          this.setState({visible: false});
                        }}
                        width={wp('90')}
                        footer={
                          <DialogFooter>
                            <DialogButton
                              text="OK"
                              textStyle={{color: 'white'}}
                              style={{backgroundColor: '#46BE50'}}
                              onPress={() => {
                                this.setState({visible: false});
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <View style={styles.appliSchemesMainContainer}>
                            <View style={styles.appliSchemesRowContainer}>
                              <View style={styles.roundedtext}>
                                <Image
                                  style={{tintColor: '#EAA304'}}
                                  source={require('../../assets/Icons/Schemes_drawer.png')}
                                />
                              </View>

                              <Text style={styles.appliSchemeTextStyle}>
                                Applicable Schemes( 12 )
                              </Text>
                            </View>
                          </View>
                          {/* Scheme Description */}
                          <View style={styles.schemesDescriptionMainContainer}>
                            <Text style={styles.descriptionTextStyle}>
                              Dummy Scheme Description.Dummy Scheme Description.
                              Dummy Scheme Description.Dummy Scheme Description.
                              Dummy Scheme Description.
                            </Text>
                          </View>

                          <View style={styles.validityDateMainContainer}>
                            <Text style={styles.validityTextStyle}>
                              Validity
                            </Text>
                            <Text style={styles.validytyDateTextStyle}>
                              12 Feb 2020
                            </Text>
                          </View>
                        </DialogContent>
                      </Dialog>
                    </View>

                    <Image
                      style={styles.appliSchemesArrowStyle}
                      source={require('../../assets/Icons/right_arrow_blue.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            
            </View>
          
            {/* Dash Line Below Applicable Schemes*/}
            <View style={styles.dashLineContainerBelowApplicableSchemes}>
              <Dash
                style={styles.dashLineStyle}
                dashLength={2}
                dashColor="#ADA2A2"
              />
            </View>

            {/* Expected Delivery Date */}
            <View style={styles.expectedDeliveryDateContainer}>
              <Text style={styles.expectedDeliveryDateTextStyle}>
                EXPECTED DELIVERY DATE
              </Text>
            </View>

            <View style={styles.expectedDeliveryDateCardMainContainer}>
              <View style={styles.expectedDeliveryDateCardStyle}>
                <View style={styles.expectedDeliDateSelfContainer}>
                  <Text style={styles.expectedDeliDateTextStyle}>
                    <Text>{startDate}</Text>
                  </Text>
                </View>
                <View style={styles.expectedDeliveryDateCalendarContainer}>
                  <TouchableOpacity onPress={this.calenderpopup.bind(this)}>
                    <View>
                      <Dialog
                        visible={this.state.visiblecal}
                        onTouchOutside={() => {
                          this.setState({visiblecal: false});
                        }}
                        previousTitle="<"
                        previousTitleStyle={{color: '#fff'}}
                        nextTitle=">"
                        nextTitleStyle={{color: '#f00'}}
                        width={wp('93')}
                        footer={
                          <DialogFooter>
                            <DialogButton
                              text="OK"
                              textStyle={{color: 'white'}}
                              style={{backgroundColor: '#46BE50'}}
                              onPress={() => {
                                this.setState({visiblecal: false});
                              }}
                            />
                          </DialogFooter>
                        }>
                        <DialogContent>
                          <CalendarPicker
                            previousTitle="Previous"
                            nextTitle="Next"
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            textStyle={{
                              fontFamily: 'Cochin',
                              color: '#000000',
                            }}
                            startFromMonday={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            onDateChange={this.onDateChange}
                          />
                        </DialogContent>
                      </Dialog>
                    </View>
                    <Image
                      style={styles.expecDeliCalenderStyle}
                      source={require('../../assets/Icons/Calendar_normal.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Remarks */}
            <View style={styles.remarkMainContainer}>
              <Text style={styles.remarkTextStyle}>REMARKS</Text>
            </View>
            <View style={styles.remarkTextViewContainer}>
              <TextInput
                multiline={true}
                textAlignVertical="top"
                style={styles.remarkTextInputStyle}
                onChangeText={text => this.onChangeTextRemark(text)}
              />
            </View>

            <View style={{marginVertical: hp('2')}} />
          </ScrollView>

          {/* Confirm Order Button */}
          {/* <View>
                    <TouchableOpacity >
                        <ConfirmOrderButton/>
                    </TouchableOpacity>
                </View> */}

          <View style={{flexDirection: 'row'}}>
          
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={e => this.saveClickHandler(e)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>SAVE</Text>
              </View>
              {this.renderPopup()}
            </TouchableOpacity>
           
           
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={e => this.discardClickHandler(e)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>DISCARD</Text>
              </View>
            </TouchableOpacity>
          
          </View>

        
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    createOrder: state.createOrder,
  };
};

const mapDispatchToProps = dispatch => ({
  orderValue: val => {
    dispatch(TOTAL_ORDER_VALUE(val));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewOrderPreview);

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#221818',
  },

  roundedtext: {
    width: 25,
    height: 25,
    // flexWrap:"wrap",
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: wp('5'),
  },

  totalOrderContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  totalOrderValueText: {
    color: '#796A6A',
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
    marginTop: hp('3%'),
    fontFamily: 'Proxima Nova',
    marginLeft: wp('5%'),
  },

  totalOrderValuesValueText: {
    color: 'white',
    fontSize: wp('3%'),
    marginTop: hp('1%'),
    marginLeft: wp('5%'),
    fontFamily: 'Proxima Nova',
    marginBottom: hp('2'),
  },

  orderDateContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  orderDateText: {
    color: '#796A6A',
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
    marginTop: hp('3%'),
    marginRight: wp('19%'),
    fontFamily: 'Proxima Nova',
  },

  dateCalendarRowContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  orderDatesDate: {
    color: '#796A6A',
    fontSize: wp('3%'),
    marginTop: hp('1%'),
    marginRight: wp('3%'),
    fontFamily: 'Proxima Nova',
    marginBottom: hp('2'),
  },

  calendarImg: {
    marginRight: wp('10'),
    marginTop: hp('1%'),
    marginBottom: hp('2'),
  },

  storeInfoMainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  storeTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  historyTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  storeNameText: {
    color: '#796A6A',
    //    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    marginTop: hp('3%'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova',
    fontSize: 16,
  },

  historyText: {
    color: '#3955CB',
    //   fontSize: wp('3%'),
    fontWeight: 'bold',
    marginTop: hp('3.5%'),
    fontFamily: 'Proxima Nova',
    marginRight: wp('9%'),
    fontSize: 10,
  },

  dashLineContainer: {
    flex: 1,
    marginTop: hp('2'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('89'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  /////////////

  orderPreivewContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  OrderPreviewTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  orderPreviewText: {
    color: '#796A6A',
    //  fontSize: wp('3%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },

  amountINRTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  amountINRText: {
    color: '#796A6A',
    fontSize: wp('2%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    fontFamily: 'Proxima Nova',
    marginRight: wp('9%'),
  },

  orderSerchResultMainContainer: {
    flex: 1,
    marginVertical: wp('3'),
  },

  collapseHeaderStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#362828',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('9'),
    width: wp('88'),
    borderWidth: hp('0.2'),
    marginHorizontal: wp('4'),
    alignSelf: 'center',
  },

  brandNameContainer: {
    flex: 2.5,
    alignItems: 'flex-start',
  },

  brandNameTextContainer: {
    marginLeft: wp('5'),
    fontFamily: 'Proxima Nova',
    fontSize: wp('3'),
    color: '#FFFFFF',
    // fontSize: RFValue(13),
    justifyContent: 'center',
    fontSize: 12,
  },

  sublistExtendIconAmountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  sublistAmountTextStyle: {
    marginRight: wp('3'),
    fontFamily: 'Proxima Nova',
    //   fontSize: RFValue(13),
    color: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 12,
  },

  sublistIconStyle: {
    marginRight: wp('4'),
    alignSelf: 'center',
    height: hp('4'),
    width: wp('8'),
  },

  appliSchemesMainContainer: {
    flex: 1,
    marginVertical: wp('10'),
  },

  appliSchemesRowContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  appliSchemeTextStyle: {
    marginLeft: wp('2'),
    fontFamily: 'Proxima Nova',
    fontSize: wp('4'),
    color: '#3955CB',
  },

  applicableSchemesMainContainer: {
    flex: 1,
    marginVertical: wp('4'),
  },

  applicableSchemesCardContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('9'),
    width: wp('88'),
    borderWidth: hp('0.2'),
    marginHorizontal: wp('4'),
    alignSelf: 'center',
  },

  applicableSchemesIconLabelContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  appliSchemesTextStyle: {
    marginLeft: wp('2'),
    fontFamily: 'Proxima Nova',
    //    fontSize: wp('3'),
    color: '#3955CB',
    fontSize: 12,
  },

  appliSchemesArrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  appliSchemesArrowStyle: {
    marginRight: wp('4'),
  },

  expectedDeliveryDateContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: hp('3'),
    marginVertical: wp('4'),
  },

  expectedDeliveryDateTextStyle: {
    color: '#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //  fontSize: wp('3%'),
    fontSize: 10,
  },

  expectedDeliveryDateCardMainContainer: {
    flex: 1,
    marginVertical: wp('-2'),
  },

  expectedDeliveryDateCardStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('9'),
    width: wp('88'),
    borderWidth: hp('0.2'),
    marginHorizontal: wp('4'),
    alignSelf: 'center',
  },

  expectedDeliDateSelfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  expectedDeliDateTextStyle: {
    marginLeft: wp('4'),
    fontFamily: 'Proxima Nova',
    //  fontSize: wp('3'),
    color: '#8C7878',
    fontSize: 12,
  },

  expectedDeliveryDateCalendarContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  expecDeliCalenderStyle: {
    marginRight: wp('5'),
    tintColor: '#8C7878',
    height: hp('5'),
    width: wp('6'),
  },

  remarkMainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: hp('3'),
    marginVertical: wp('8'),
  },

  remarkTextStyle: {
    color: '#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //    fontSize: wp('3%'),
    fontSize: 10,
  },

  remarkTextViewContainer: {
    flex: 1,
    marginVertical: hp('-3'),
    marginHorizontal: wp('5'),
    alignSelf: 'center',
    // padding:1,
  },

  remarkTextInputStyle: {
    height: hp('15'),
    width: wp('88'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('2'),
    backgroundColor: '#ffffff',
    padding: 5,
    fontSize: 12,
  },

  dashLineContainerBelowOrderPreview: {
    flex: 1,
    marginTop: hp('4'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineContainerBelowApplicableSchemes: {
    flex: 1,
    marginTop: hp('2'),
    alignContent: 'center',
    alignItems: 'center',
  },

  schemesDescriptionMainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: hp('10'),
    marginLeft: wp('5'),
    marginRight: wp('3'),
  },

  descriptionTextStyle: {
    color: '#796A6A',
    fontSize: wp('3%'),
    fontFamily: 'Proxima Nova',
  },

  validityDateMainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: hp('4'),
    marginHorizontal: wp('5'),
  },

  validityTextStyle: {
    color: '#362828',
    fontSize: wp('3.5%'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  button: {
    width: wp('47'),
    height: hp('8'),
    backgroundColor: '#46BE50',
    paddingVertical: 15,
    justifyContent: 'center',
    marginLeft: hp('1'),
    //   marginHorizontal: hp('1'),
    borderRadius: wp('2'),
    marginVertical: wp('1'),
  },

  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },
  button: {
    width: wp('47'),
    height: hp('8'),
    backgroundColor: '#46BE50',
    paddingVertical: 15,
    justifyContent: 'center',
    marginLeft: hp('1'),
    //   marginHorizontal: hp('1'),
    borderRadius: wp('2'),
    marginVertical: wp('1'),
  },

  buttonText: {
    fontSize: 16,
    // color: '#796A6A',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },
  validytyDateTextStyle: {
    color: '#796A6A',
    fontSize: wp('3%'),
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
  },
});
