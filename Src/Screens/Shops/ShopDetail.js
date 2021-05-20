import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Router, Scene, Stack, Drawer, Tabs} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import {FloatingAction} from 'react-native-floating-action';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import {
  TOTAL_SHOPS,
  SHOP_INFO,
  SHOP_VISITED_TODAY,
} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
import Geolocation from 'react-native-geolocation-service';
const db = new Database();

var pressed = false;
const actions = [
  {
    text: 'Create New Order',
    color: 'transperent',
    name: 'bt_create',
    position: 4,
    textColor: 'black',
    textStyle: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
  {
    text: 'Accept Payment',
    color: 'transperent',
    name: 'bt_payment',
    position: 3,
    textColor: 'black',
    textStyle: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
  {
    text: 'Take A Survey',
    color: 'transperent',
    name: 'bt_survey',
    position: 2,
    textColor: 'black',
    textStyle: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
  {
    text: 'Audit Assets',
    color: 'transperent',
    name: 'bt_assets',
    position: 1,
    textColor: 'black',
    textStyle: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
];

var app_order_id;
var curentDatetime;
export class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '',
      sname: '',
      ssname: '',
      todaysDate: '',

      userLatitude: '',
      userLongitude: '',

      aa: '',
      CheckInText: 'CHECK IN',
      ShopId: '',
    };
  }

  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getUserPosition();
        } else {
          this.requestFineLocation();
        }
      } else {
        this.getUserPosition();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async getUserPosition() {
    Geolocation.getCurrentPosition(pos => {
      //  alert(pos.coords.latitude)
      this.state.userLatitude = pos.coords.latitude;
      this.state.userLongitude = pos.coords.longitude;
      this.setState({
        userLatitude: pos.coords.latitude,
        userLongitude: pos.coords.longitude,
      });
      console.log('my lat', this.state.userLatitude);
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    return ture;
  }
  //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  async componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;
    this.setState({todaysDate: datess});

    this.state.sname = this.props.shops.shopname;
    console.log('sopppppppppppnameeeeeeee', this.state.sname);

    await AsyncStorage.setItem('shopname', this.state.sname);
  }

  componentwillMount() {
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.requestFineLocation();

    // //console.log("componentDidMount callee")
    // this._componentFocused();

    // this._sub = this.props.navigation.addListener(
    //     'didFocus',
    //     this._componentFocused

    // );

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;
    this.state.todaysDate = datess;
    this.setState({todaysDate: datess});
    AsyncStorage.getItem('shopId').then(keyValue => {
      this.setState({ShopId: JSON.parse(keyValue)});
      db.CheckTodaysRecordForShopCheckIn(
        this.state.todaysDate,
        JSON.parse(keyValue),
        '4',
      ).then(data => {
        if (data.length == 0) {
          this.setState({CheckInText: 'CHECK IN'});
        } else {
          this.setState({CheckInText: 'CHECK OUT'});
        }
      });
    });
  }

  CheckInMethod = () => {
    this.setState({visible: false});
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    app_order_id =
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, '');
    curentDatetime =
      year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
    //remain to insert colu==DefaultDistributorId,ExpectedDeliveryDate
    db.insertRecordInOrderMasterForShopCheckIn(
      app_order_id,
      curentDatetime,
      '1',
      this.state.ShopId,
      this.state.userLatitude,
      this.state.userLongitude,
      '0',
      '',
      '',
      '4',
      this.props.dashboard.userId,
      '1',
      'N',
      '',
      this.state.todaysDate,
      '0',
      this.state.todaysDate,
      '0',
      curentDatetime,
      '',
    ).then(data => {
      pressed = true;
      this.setState({CheckInText: 'CHECK OUT'});
    });
  };

  CheckoutMethod = () => {
    AsyncStorage.getItem('shopId').then(keyValue => {
      db.CheckRecordForShopCheckIn2(JSON.parse(keyValue), '4').then(data => {
        const lastItem = data[data.length - 1];
        //console.log("\n \n \n \n \n DATA GAME123:::    ", lastItem.ActivityStart, "\n \n \n \n \n")
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var CheckoutcurentDatetime =
          year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
        //change color of button
        db.updateCheckoutOrderMaster(
          '4',
          this.state.ShopId,
          lastItem.ActivityStart,
          CheckoutcurentDatetime,
          this.state.userLatitude,
          this.state.userLongitude,
        ).then(data => {
          console.log('\n \n \n \n \n CHECK-OUTs::: ', data, '\n \n \n');
          pressed = true;
        });
        this.setState({CheckInText: 'CHECK IN'});
        alert('Checkout Successfully..');
      });
    });
  };

  applicablePopUp = () => {
    const {navigation} = this.props;
    this.setState({visible: true, app_order_id: ''});
    // alert('hii')
  };
  ConfirmClickHandler = () => {
    // this.requestFineLocation()
    let {shopsVisitedToday} = this.props.shops;
    AsyncStorage.getItem('shopId').then(keyValue => {
      // this.setState({ outletId: JSON.parse(keyValue) })
    });
    this.setState({visible: false});
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;
    this.state.todaysDate = datess;
    this.setState({todaysDate: datess});
    db.CheckTodaysRecordForShopCheckIn(
      this.state.todaysDate,
      this.state.ShopId,
      '4',
    ).then(data => {
      if (data.length == '0') {
        //console.log("innn if CheckTodaysRecordForShopCheckIn")
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        app_order_id =
          date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
        app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, '');
        curentDatetime =
          year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;

        //remain to insert colu==DefaultDistributorId,ExpectedDeliveryDate
        db.insertRecordInOrderMasterForShopCheckIn(
          app_order_id,
          curentDatetime,
          '1',
          this.state.ShopId,
          this.state.userLatitude,
          this.state.userLongitude,
          '0',
          '',
          '',
          '4',
          this.props.dashboard.userId,
          '1',
          'N',
          '',
          this.state.todaysDate,
          '0',
          this.state.todaysDate,
          '0',
          curentDatetime,
          '',
        ).then(data => {
          pressed = true;
          this.setState({CheckInText: 'CHECK OUT'});
        });
      } else {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var CheckoutcurentDatetime =
          year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
        //change color of button
        db.updateCheckoutOrderMaster(
          '4',
          this.state.ShopId,
          this.state.todaysDate,
          CheckoutcurentDatetime,
          this.state.userLatitude,
          this.state.userLongitude,
        ).then(data => {
          pressed = true;
        });
        this.setState({CheckInText: 'CHECK IN'});
        alert('Checkout Successfully..');
      }
    });
  };

  render() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;
    db.CheckTodaysRecordForShopCheckInforColor(datess, this.state.ShopId).then(
      data => {
        if (data.length == 0) {
          pressed = false;
        } else {
          pressed = true;
        }
      },
    );
    return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.backArrowContainer}>
            <TouchableOpacity
              onPress={() => {
                this.state.CheckInText == 'CHECK OUT'
                  ? alert('Please Check Out first')
                  : Actions.Shops();
              }}>
              <Image
                style={styles.backArrowStyle}
                source={require('../../assets/Icons/Back_White.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.checkInPopUpMainContainer}>
            <TouchableOpacity
              onPress={() => {
                this.ConfirmClickHandler();
              }}>
              {/* onPress={this.applicablePopUp.bind(this)} */}

              <View>
                <Dialog
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({visible: false});
                  }}
                  width={wp('90')}>
                  <DialogContent>
                    <View style={styles.dialogContenetContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({visible: false});
                        }}>
                        <View style={styles.closeDialogCrossContainer}>
                          <Image
                            style={styles.closeDialogCrossImgStyle}
                            source={require('../../assets/Icons/FAB_Close_Menu.png')}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.mapIconContainer}>
                        <Image
                          style={styles.mapIconStyle}
                          source={require('../../assets/Icons/FAB_Close_Menu.png')}
                        />
                      </View>
                      <View style={styles.checkingInTextContainer}>
                        <Text style={styles.checkInTextStyle}>
                          You are Checking-In
                        </Text>
                      </View>
                      <View style={styles.storeNameContainer}>
                        <Text style={styles.storeNameTextStyle}>
                          {this.props.shops.shopname}
                        </Text>
                      </View>
                      {/* style={[
                styles.button,
                this.state.pressed ? { backgroundColor: "green" } : {}
            ]} */}
                      <View style={styles.confirmButtonMainContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            this.ConfirmClickHandler();
                          }}>
                          <View
                            style={[
                              styles.confrimButtonBGStyle,
                              pressed
                                ? {backgroundColor: 'red'}
                                : {backgroundColor: '#46BE50'},
                            ]}>
                            <Text style={styles.confirmButtonTextStyle}>
                              CONFIRM
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{marginTop: hp('1')}} />
                    </View>
                  </DialogContent>
                </Dialog>
              </View>

              <View style={styles.checkInLableBGStyle}>
                <Text style={styles.checkInLabelTextStyle}>
                  {this.state.CheckInText}
                </Text>
              </View>
            </TouchableOpacity>

            <Image
              style={styles.editIconStyle}
              source={require('../../assets/Icons/edit.png')}
            />
          </View>
        </View>
        <View>
          {/* Header */}
          <View style={styles.shopNameBG}>
            <Text style={styles.shopNameTextStyle}>
              {this.props.shops.shopname}
            </Text>
            <Text style={styles.shopAddressTextStyle}>
              {this.props.shops.ShopAreas}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    shops: state.shops,
    dashboard: state.dashboard,
  };
};
const mapDispatchToProps = dispatch => ({
  shopVisited: visiteds => {
    dispatch(SHOP_VISITED_TODAY(visiteds));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopDetail);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#221818',
    color: '#fff',
    height: hp('8'),
  },

  backArrowContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    alignSelf: 'center',
  },

  backArrowStyle: {
    marginLeft: wp('4'),
  },

  checkInPopUpMainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  dialogContenetContainer: {
    flexDirection: 'column',
  },

  closeDialogCrossContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  closeDialogCrossImgStyle: {
    alignSelf: 'flex-end',
  },

  mapIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('-5'),
  },

  mapIconStyle: {
    alignSelf: 'center',
  },

  checkingInTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkInTextStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: RFValue(13),
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
  },

  storeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storeNameTextStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: RFValue(13),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('0.5'),
  },

  confirmButtonMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('4'),
  },

  confrimButtonBGStyle: {
    borderRadius: wp('8'),
    height: hp('7'),
    width: wp('50'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmButtonTextStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: RFValue(13),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  checkInLableBGStyle: {
    backgroundColor: '#CC1167',
    justifyContent: 'center',
    marginRight: hp('3'),
    borderColor: '#CC1167',
    height: hp('4'),
    width: wp('23'),
    borderRadius: wp('5'),
  },

  checkInLabelTextStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue('10'),
    fontWeight: 'bold',
    padding: 10,
  },

  editIconStyle: {
    marginRight: hp('2'),
    height: hp('4'),
    width: wp('6'),
  },

  shopNameBG: {
    backgroundColor: '#210305',
  },

  shopNameTextStyle: {
    color: '#F8F4F4',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('2'),
  },

  shopAddressTextStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('1'),
    marginBottom: hp('5'),
  },
});
