import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {FloatingAction} from 'react-native-floating-action';
import {Actions} from 'react-native-router-flux';
import {Fab, Button, Icon} from 'native-base';
import TodaysRoute from './TodaysRoute';
import Today from './Today';
import Payment from './Payment';
import {Dropdown} from 'react-native-material-dropdown';
import Schemes from './Schemes';
import MyProductivity from './MyProductivity';
import Sales from './Sales';
import Repo from './Repo';
import SideMenu from '../../components/SideMenu';
import Loader from './../../components/LoaderSync';
import {USER_ID} from '../../Redux/actions/DashboardAction';
import {PARENT_LOGIN} from '../../Redux/actions/DashboardAction';
import {SELECT_AREA} from '../../Redux/actions/DashboardAction';
import utilss from '../../utility/usableFunctions';
const utils = new utilss();
import {connect} from 'react-redux';
import axios from 'axios';
import Database from './../../utility/Database';
import {color} from 'react-native-reanimated';
import User from '../../utility/User';
import {BlurView} from '@react-native-community/blur';
const db = new Database();
//const sm = new SideMenu();

const actions = [
  {
    text: 'Accept Payment',
    color: 'transperent',
    name: 'accept_payment',
    position: 4,
    textColor: 'black',
    textStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 5,
      marginHorizontal: 23,
    },
    buttonSize: 0,
  },
  {
    text: 'Create New Order',
    color: 'transperent',
    name: 'bt_accessibility',
    position: 3,
    textColor: 'black',
    textStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginHorizontal: 18,
      marginTop: 5,
    },
    buttonSize: 0,
  },
  {
    text: 'Add New Shop',
    color: 'transperent',
    name: 'add_shop',
    position: 2,
    textColor: 'black',
    textStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginHorizontal: 29,
      marginTop: 5,
    },
    buttonSize: 0,
  },
  {
    text: 'Data Collection',
    color: 'transperent',
    name: 'collection',
    position: 1,
    textColor: 'black',
    textStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginHorizontal: 26,
      marginTop: 5,
    },
    buttonSize: 0,
  },
  {
    text: 'Create New Meeting',
    color: 'transperent',
    name: 'bt_meet',
    position: 0,
    textColor: 'black',
    textStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginHorizontal: 18,
      marginTop: 5,
    },
    buttonSize: 0,
  },
];
var open;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      deviceId: '',
      open: false,
      active: false,
      modalVisible: false,
      ParentAreaArray: [],
      selectedArea: 0,
      selectedAreaName: 'Select Area',
      isLoading: false,
      messagetext: '',
      tokens: '',
      ParentCheckflag: '',
    };

    //  this.getUserData = this.getUserData.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      color: 'white',
      headerStyle: {
        backgroundColor: '#221818',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      //  headerRight: <Image source = {require('../../Assets/Icons/Search.png')}/>,
      // <Icon style={{ marginLeft: wp('4%') }} name="search" size={30} color="#fff" />
      headerLeft: (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: wp('3%'), marginTop: 5}}
            onPress={() => Actions.drawerToggle()}>
            <Image
              // style={{backgroundColor: 'red'}}
              source={require('../../assets/Icons/menu_white.png')}
              color="white"
              // onPress={() => navigation.openDrawer() }
              // onPress={() => navigation.toggleDrawer()}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: wp('52%')}}
            onPress={() => params.onPressSync()}>
            <Image
              style={{height: hp('4.2'), width: wp('7.5'), marginTop: 2}}
              source={require('../../assets/Icons/synck.png')}
              // color="white"

              // onPress={() => navigation.openDrawer() }
              // onPress={() => navigation.toggleDrawer()}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: wp('5%'), marginTop: 2}}
            onPress={() => params.onPressMethod()}>
            <Image
              style={{height: hp('4.2'), width: wp('7.5')}}
              source={require('../../assets/Icons/location_check.png')}
              color="white"
              // onPress={() => navigation.openDrawer() }
              // onPress={() => navigation.toggleDrawer()}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={{marginLeft: wp('6.3%'), marginTop: 6}}>
            <Image
              style={{height: hp('3.7'), width: wp('6.2')}}
              source={require('../../assets/Icons/Search.png')}
              color="white"
              // onPress={() => navigation.openDrawer() }
              // onPress={() => navigation.toggleDrawer()}
            />
          </TouchableOpacity> */}
        </View>
      ),
    };
  };

  getUserData() {
    alert('in getUserdata........');
    // db.getUserData().then((data) => {
    //     //console.log("getUserData=",JSON.stringify(data))
    // })
  }
  _onStateChange(open) {}
  componentWillMount() {
    //   db.getUserData().then((data) => {
    //     //console.log("getUserData=",JSON.stringify(data))
    // })
    // sm.SyncNow();
    // BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick,);

    AsyncStorage.getItem('JWTToken').then(keyValue => {
      const tok = JSON.parse(keyValue);
      this.setState({tokens: tok});
    });

    AsyncStorage.getItem('username').then(
      keyValue => {
        const username = JSON.parse(keyValue);
        this.setState({username: username});
      },
      error => {
        //console.log(error) //Display error
      },
    );
    AsyncStorage.getItem('password').then(
      keyValue => {
        const pass = keyValue;
        this.setState({password: pass});
      },
      error => {
        //console.log(error) //Display error
      },
    );
    AsyncStorage.getItem('deviceId').then(
      keyValue => {
        const deviceId = JSON.parse(keyValue);
        this.setState({deviceId: deviceId});
      },
      error => {
        //console.log(error) //Display error
      },
    );
  }

  ShowSelectAreaPopup = () => {
    console.log('in select popup ' + this.props.dashboard.parentlogin);
    db.getOnlineParentAreaData().then(data => {
      console.log('area : ' + JSON.stringify(data));
      this.setState({
        ParentAreaArray: data,
      });
    });
    if (this.props.dashboard.parentlogin == true) {
      this.setModalVisible(true);
    }

    //  this.setState({modalVisible : true})
  };
  SyncNowPress = () => {
    console.log('in select SyncNowPress ' + this.props.dashboard.parentlogin);

    // if(this.props.dashboard.selectarea == 0)
    // {
    //   alert('Please Select Area')
    // }else{
    //   this.syncNowFunction();
    // }

    AsyncStorage.getItem('userIds').then(keyValue => {
      var userid = JSON.parse(keyValue);
      this.props.userid(JSON.parse(keyValue));
      db.getParentLoginData(userid).then(data => {
        console.log('parent data : ' + JSON.stringify(data));
        if (data.length > 0) {
          if (this.props.dashboard.selectarea == 0) {
            alert('Please Select Area');
          } else {
            this.syncNowFunction();
          }
        } else {
          console.log('in else');
          this.syncNowFunction();
        }
      });
    });
  };
  checkAreaSelected() {
    if (this.state.selectedArea == 0) {
      alert('Please Select Area');
    } else {
      this.setModalVisible(false);
      this.syncNowFunction();
    }
  }

  syncNowFunction() {
    console.log('I am sync now : ' + this.state.selectedArea);
    var OrderMaster = [];
    var OrderDetails = [];
    var Discount = [];
    var ImageDetails = [];
    var NewPartyImageDetails = [];
    var AssetDetails = [];
    var NewPartyOutlet = [];
    var NewPartyTargetId = [];
    this.state.isLoading = true;
    this.setState({isLoading: true});
    this.setState({messagetext: 'Sending Data to server..'});
    this.setState({JSONObj: {}});
    db.getOrderMasterSyncData('N').then(data => {
      if (data.length > 0) {
        console.log('ordermaster for sync', JSON.stringify(data));
        OrderMaster.push(data);
        this.state.JSONObj['OrderMaster'] = data;
      }
      db.getOrderDetailsSyncData().then(data => {
        if (data.length > 0) {
          console.log('orderdetails for sync', JSON.stringify(data));
          OrderDetails = data;
          this.state.JSONObj['OrderDetails'] = data;
        }

        db.getNewPartyOutletSyncData().then(data => {
          if (data.length > 0) {
            console.log('New Party for sync', JSON.stringify(data));
            NewPartyOutlet = data;
            this.state.JSONObj['NewParty'] = data;
          }
        });
        this.state.newPartyImagedetails1 = [];
        db.getNewPartyImageDetailsyncData().then(data => {
          if (data.length > 0) {
            this.setState({newPartyImagedetails1: data});
            this.state.newPartyImagedetails1.map((item, key) => {
              var bytess;
              this.state.newPartyImagedetails = [];
              RNFS.readFile(item.ImagePath, 'base64').then(res => {
                bytess = res;
                this.state.newPartyImagedetails.push({
                  // ID: item.ID,
                  Id: item.id,
                  //   ImageDatetime: item.ImageDateTime,
                  ImageName: item.ImageName,
                  data: bytess,
                });
              });
            });
            NewPartyImageDetails = this.state.newPartyImagedetails;
            this.state.JSONObj[
              'NewPartyImage'
            ] = this.state.newPartyImagedetails;
          }
        });

        db.getnewPartyTargetId().then(data => {
          if (data.length > 0) {
            console.log(
              'New getnewPartyTargetId for sync',
              JSON.stringify(data),
            );
            NewPartyTargetId = data;
            this.state.JSONObj['newPartyTargetId'] = data;
          }
        });

        db.getDiscountSyncData().then(data => {
          if (data.length > 0) {
            console.log('discount for sync', JSON.stringify(data));
            Discount = data;
            this.state.JSONObj['Discount'] = data;
          }
          this.state.ImageDetails1 = [];
          db.getImageDetailsyncData().then(data => {
            if (data.length > 0) {
              this.setState({ImageDetails1: data});
              this.state.ImageDetails1.map((item, key) => {
                var bytess;
                this.state.ImageDetails = [];
                RNFS.readFile(item.ImageBytes, 'base64').then(res => {
                  bytess = res;
                  this.state.ImageDetails.push({
                    ID: item.ID,
                    OrderID: item.OrderID,
                    ImageDatetime: item.ImageDateTime,
                    ImageName: item.ImageName,
                    ImageBytes: bytess,
                  });
                });
              });
              ImageDetails = this.state.ImageDetails;
              this.state.JSONObj['ImageDetails'] = this.state.ImageDetails;
            }
            db.getAssetDetailData().then(data => {
              if (data.length > 0) {
                //console.log("asset=", JSON.stringify(data))
                AssetDetails = data;
                this.state.JSONObj['AssetDetails'] = data;
              }
              ////////////////////////////////////////////////////////////
              //console.log("rjjjjjjjjjjjjjjj..........", this.state.JSONObj)
              var count;
              count = Object.keys(this.state.JSONObj).length;
              // alert(count);

              if (count > 0) {
                //console.log("ssdds=========", this.state.tokens)
                const headers = {
                  authheader: this.state.tokens,
                };
                var datas = {
                  OrderMaster: OrderMaster,
                  OrderDetails: OrderDetails,
                  Discount: Discount,
                  ImageDetails: ImageDetails,
                  AssetDetails: AssetDetails,
                };
                console.log(
                  'boduy of postApi=',
                  JSON.stringify(this.state.JSONObj),
                );

                //  //console.log("boduy of postApi2=", datas)
                //   const url = 'http://zylemdemo.com/ZyleminiPlusCoreAPI/api/Data/PostData'

                // testing
                //  const url =  'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData';
                //live
                //    const url = 'https://zyleminiplus.com/ZyleminiPlusCoreAPI/api/Data/PostData'
                // alert('User is ', User.posturl);
                axios
                  .post(User.posturl, this.state.JSONObj, {
                    headers: headers,
                  })
                  .then(response => {
                    console.log(
                      'response of post=',
                      JSON.stringify(response.data),
                    );
                    console.log('status code :' + response.status);
                    var responss = [];
                    // /{"Data":{"Order":{"Status":"Data saved successfully.",
                    //"Orders":[{"OrderStatus":"Order Existed","OrderId":"78",
                    //"MobileGenPrimaryKey":"167202012142"},
                    //{"OrderStatus":"Order Existed","OrderId":"79","MobileGenPrimaryKey":"167202012551"}]},"NewParty":null,"NewPartyTargetId":null,"PreviousData":null}}
                    // LOG  count is.......... 3
                    if (response.data.Data.Order) {
                      //  alert("in if")
                      //
                      try {
                        if (response.data.Data.Order.hasOwnProperty('Orders')) {
                          // alert("in ifffff")
                          console.log(
                            'orders :' + response.data.Data.Order.Orders.length,
                          );
                          this.setState({isLoading: false});
                          this.GetNewData();
                          db.deleteOrderMaster();
                          db.deleteOrderDetails();
                          db.deletenewpartyoutlet();
                          db.deletenewpartyImageoutlet();
                          db.deleteImagesDetails();
                          db.deleteTABLE_DISCOUNT();
                          //  alert('Data Sync Successfull');
                          // Alert.alert(
                          //   'ZyleminiPlus',
                          //   response.data.Data.Order.Status,
                          //   [
                          //     // {
                          //     //   text: "Cancel",
                          //     //   onPress: () => console.log("Cancel Pressed"),
                          //     //   style: "cancel"onPress={() => this.props.navigation.navigate('MJP_one')}
                          //     // },
                          //     {text: 'OK', onPress: () => this.GetNewData()},
                          //   ],
                          //   {cancelable: false},
                          // );
                        }
                      } catch (error) {}

                      //  alert(response.data.Data.Order.Status);
                    } else {
                      this.setState({isLoading: false});
                      this.GetNewData();
                    }
                    //  this.setState({isLoading: false});
                  })
                  .catch(error => {
                    //console.log("error post=", error)
                    this.setState({isLoading: false});
                    alert(error);
                  });
              } else {
                this.setState({isLoading: false});
                this.GetNewData();
              }

              ///////////////////////////////////////////////////
            });
          });
        });
      });
    });
  }

  async GetNewData() {
    this.setState({isLoading: true});
    this.setState({messagetext: 'Getting Data from server..'});
    // testing
    //   const url1 = 'http://sapltest.com/ZyleminiPlusAPI/api/Data/GetData';

    // live
    //   const url1 = "https://zyleminiplus.com/ZyleminiPlusCoreAPI/api/Data/GetData";

    //console.log("url is===", url1)
    //console.log("aaaaaaa========",response.data.Token)

    let keyValue = await AsyncStorage.getItem('JWTToken');
    const tok = JSON.parse(keyValue);
    this.setState({tokens: tok});

    // alert(tok);
    const headers1 = {
      authheader: tok,
      AreaId: this.props.dashboard.selectarea,
    };
    // alert(User.GetUrl);
    console.log(User.GetUrl);
    console.log('header : ' + JSON.stringify(headers1));
    axios
      .get(User.GetUrl, {
        headers: headers1,
      })
      .then(res => {
        // alert(res.data);
        //  //console.log("rajani data1=",JSON.stringify(res))
        if (res.data) {
          const data = JSON.stringify(res.data);
          console.log('rajani data=', JSON.stringify(data));

          // db.insertAllData(data)
          //   dispatch(dispatchAll(data))
          //  dispatch(insertAllData(data))
          db.insertAllData(data).then(results => {
            // alert(results)
            if (results) {
              // dispatch(loginIsLoading(false));
              // Actions.App()
              this.props.parentLogin(false);
              this.setState({isLoading: false});
              Actions.App();
            }
          });
        } else {
          alert('Invalid Credentials');
          this.setState({isLoading: false});
        }
      })
      .catch(error => {
        //console.log("errr")

        //console.log('error ' + error);
        alert(error);
        this.setState({isLoading: false});
      });
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.props.navigation.setParams({onPressMethod: this.ShowSelectAreaPopup});
    this.props.navigation.setParams({onPressSync: this.SyncNowPress});
    AsyncStorage.getItem('userIds').then(keyValue => {
      var userid = JSON.parse(keyValue);
      this.props.userid(JSON.parse(keyValue));
      db.getParentLoginData(userid).then(data => {
        console.log('parent data : ' + JSON.stringify(data));
        if (data.length > 0) {
          db.getPItemForParentLogin().then(data => {
            if (data.length > 0) {
              this.props.parentLogin(false);
            } else {
              console.log('in else pitem');
              this.props.parentLogin(true);
            }
          });

          // this.setState({ParentCheckflag : 'true'})
        } else {
          console.log('in else');
          //  this.props.selectarea(areaId)
          this.props.parentLogin(false);
        }
      });
    });
    db.getOnlineParentAreaData().then(data => {
      console.log('area : ' + JSON.stringify(data));
      this.setState({
        ParentAreaArray: data,
      });
    });
    console.log('parent login : ' + this.props.dashboard.parentlogin);
    // this._componentFocused();
    // this._sub = this.props.navigation.addListener(
    //   'didFocus',
    //   this._componentFocused,
    // );
  }

  _componentFocused() {
    //  AsyncStorage.getItem('userIds').then((keyValue) => {
    //  //console.log("UserIddd=",JSON.parse((keyValue)))
    //  this.props.userid(keyValue)
    //   })
    // AsyncStorage.getItem('username').then((keyValue) => {
    // //console.log("Name",JSON.parse((keyValue)))
    //     var user=keyValue
    //     this.setState({username:user})
    //   }, (error) => {
    //     //console.log(error) //Display error
    //   });
    //   AsyncStorage.getItem('password').then((keyValue) => {
    //     var pass=keyValue
    //     this.setState({password:pass})
    //   }, (error) => {
    //     //console.log(error) //Display error
    //   });
    //   AsyncStorage.getItem('deviceId').then((keyValue) => {
    //     var user=keyValue
    //     this.setState({deviceId:user})
    //   }, (error) => {
    //     //console.log(error) //Display error
    //   });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    // Registered function to handle the Back Press
    // We are generating an alert to show the back button pressed
    // BackHandler.exitApp();
    Alert.alert(
      'Confirm Exit',
      'Do you want to Exit App?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  _logOut = async () => {
    alert('hii');
  };

  renderFABIcon = () => {
    if (this.state.active) {
      return (
        <Icon
          name="ios-close"
          style={{fontSize: 45, color: '#FFFFFF', position: 'absolute'}}
          color="#07B26A"
        />
      );
    } else {
      return (
        <Icon
          name="ios-add"
          style={{fontSize: 45, color: '#FFFFFF', position: 'absolute'}}
          color="#07B26A"
        />
      );
    }
  };

  setModalVisible = bools => {
    this.setState({modalVisible: bools});
  };

  _renderEntity() {
    const beat = [];
    const BeatId = [];
    //  console.log('distributorArray : '+JSON.stringify(this.state.distributorArray))
    for (var i = 0; i < this.state.ParentAreaArray.length; i++) {
      beat.push({
        value: this.state.ParentAreaArray[i].Area,
      });
      BeatId.push({
        value: this.state.ParentAreaArray[i].AreaId,
      });
    }
    //  console.log('beat id : '+JSON.stringify(BeatId))

    //  const array = [{"Distributor":"CSD BANGALORE","DistributorID":"789"},{"Distributor":"KARNATAKA STATE BEVERAGES","DistributorID":"1409"},{"Distributor":"KSBCL - ATTIBELE","DistributorID":"437"},{"Distributor":"KSBCL - BAGALKOT","DistributorID":"1"},{"Distributor":"KSBCL - BAGALKUNTE","DistributorID":"2"},{"Distributor":"KSBCL - BAGALKUNTE-2","DistributorID":"1165"},{"Distributor":"KSBCL - BANGARPET","DistributorID":"3"},{"Distributor":"KSBCL - BANNERGHATTA ROAD","DistributorID":"4"}]

    return (
      <Dropdown
        containerStyle={styles.dropDownContainer}
        animationDuration={0}
        rippleCentered={true}
        itemColor="#ADA2A2"
        rippleOpacity={0}
        fontSize={11}
        //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
        value="Select Area"
        pickerStyle={{width: wp('78')}}
        dropdownPosition={-5.5}
        dropdownOffset={{top: 20, left: 18}}
        inputContainerStyle={{borderBottomColor: 'transparent'}}
        data={beat}
        //   onChangeText={(value) => { this.onChangeHandlerDistributor(value) }}
        onChangeText={(value, index, data) =>
          this.onChangeHandlerArea(BeatId[index].value, value)
        }
      />
    );
  }

  onChangeHandlerArea = (areaId, value) => {
    AsyncStorage.setItem('AreaSelected', value);
    this.setState({selectedArea: areaId});
    this.setState({selectedAreaName: value});

    this.props.selectarea(areaId);
    console.log('dist id : ' + areaId);
    //  this.setState({selectedDistName : name})
  };

  render() {
    return (
      <View style={{flex: 10}}>
        <Loader
          loading={this.state.isLoading}
          message={this.state.messagetext}
        />
        <Modal
          style={{
            flex: 1,
            padding: 5,
          }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <ImageBackground
            source={require('../../assets/Icons/android_BG.png')}
            style={{
              height: hp('95'),
              width: wp('100'),
              resizeMode: 'cover',
              justifyContent: 'center',
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{flexDirection: 'column', justifyContent: 'center'}}>
                  <Text style={styles.modalText}>Confirm Your Location</Text>
                  <View
                    style={{
                      marginBottom: 20,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#CC1167',
                      fontSize: 16,
                    }}>
                    {/* <Icon
                                                size={24}
                                                name='create'
                                                color='#CC1167' /> */}

                    <Image
                      style={styles.mapIconStyle}
                      source={require('../../assets/Icons/location_checkin.png')}
                    />
                  </View>
                  <View
                    style={{
                      width: wp('14'),
                      height: hp('4'),
                      borderRadius: 150,
                      textAlign: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#796A6A',
                      opacity: 0.05,
                      marginTop: hp('-5'),
                      transform: [{scaleX: 2}],
                    }}
                  />
                </View>

                {/* <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>CHOOSE CITY</Text>
                                        {this._renderEntity()}
                                    </View> */}

                <View style={styles.textDropdownContainer}>
                  <Text style={styles.headingTitleText}>CHOOSE AREA</Text>
                  {this._renderEntity()}
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 50,
                  }}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                      this.checkAreaSelected();
                    }}>
                    <Text style={styles.textStyleModal}>CONFIRM</Text>
                  </TouchableHighlight>

                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(false);
                    }}>
                    <Text style={styles.textStyleModal1}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Modal>

        {this.props.dashboard.parentlogin == true ? (
          <View style={{flex: 8}}>
            <View style={{flex: 0.3, backgroundColor: '#221818'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('6%'),
                  type: 'font-awesome',
                  marginTop: hp('4%'),
                  marginLeft: wp('2%'),
                  marginBottom: hp('3%'),
                }}>
                Hello, {this.state.username}
              </Text>
            </View>

            <ScrollView>
              {/* Header */}

              <View style={{opacity: 0.5}}>
                <TodaysRoute />
                {/* <Today /> */}
                <Payment />
                {/* <BlurView
              style={{ position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0}}
              blurType="light"
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
            /> */}
              </View>
              {/* <Image
                style={{height: hp('40'), width: wp('100')}}
                source={require('../../assets/Icons/graph.png')}
              /> */}
              {/* <Sales />
              <Repo />
              <Schemes />
              <MyProductivity /> */}
            </ScrollView>
            <FloatingAction
              open={open}
              color="#a10d59"
              //  actions={actions}
              buttonSize={hp('9.5')}
              floatingIcon={
                this.state.active == false
                  ? require('../../assets/Icons/Floating.png')
                  : require('../../assets/Icons/FAB_Close_Menu.png')
              }
              iconWidth={wp(20)}
              iconHeight={hp(16)}
              // iconWidth={wp(5)}
              // iconHeight={hp(3)}
              shadow="null"
              overlayColor="#221818"
              showBackground={true}
              // onPressItem={name => {
              //   if (name == 'bt_accessibility') {
              //     AsyncStorage.setItem('outletName', '');
              //     AsyncStorage.setItem('outletId', '');
              //     AsyncStorage.setItem('beatName', '');
              //     AsyncStorage.setItem('beatId', '');
              //     AsyncStorage.setItem('distributorName', '');
              //     AsyncStorage.setItem('SearchString', '');
              //     //console.log(`selected button: ${name}`);
              //     //  alert(name)
              //     User.FlagForNavigation = 'Dashboard';
              //     Actions.CreateNewOrderFirst();
              //     this.setState({
              //       active: !this.state.active,
              //     });
              //   } else if (name == 'collection') {
              //     AsyncStorage.setItem('outletNameDC', '');
              //     AsyncStorage.setItem('outletIdDC', '');
              //     AsyncStorage.setItem('beatNameDC', '');
              //     AsyncStorage.setItem('beatIdDC', '');
              //     AsyncStorage.setItem('SearchStringDC', '');
              //     Actions.DataCollectionStep1();
              //     this.setState({
              //       active: !this.state.active,
              //     });
              //   } else if (name == 'add_shop') {
              //     //  Actions.AddNewShop();
              //     Actions.Shops();
              //   }
              // }}
              // onPressMain={() => {
              //   if (this.state.active == false) {
              //     this.setState({
              //       active: !this.state.active,
              //     });
              //     // BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
              //   } else {
              //     this.setState({
              //       active: !this.state.active,
              //     });
              //   }
              // }}
              // onPressBackdrop={() => {
              //   if (this.state.active == false) {
              //     this.setState({
              //       active: !this.state.active,
              //     });
              //     //BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
              //   } else {
              //     this.setState({
              //       active: !this.state.active,
              //     });
              //   }
              // }}
            />
          </View>
        ) : (
          <View style={{flex: 8}}>
            <View style={{flex: 0.3, backgroundColor: '#221818'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('6%'),
                  type: 'font-awesome',
                  marginTop: hp('4%'),
                  marginLeft: wp('2%'),
                  marginBottom: hp('3%'),
                }}>
                Hello, {this.state.username}
              </Text>
            </View>
            <ScrollView>
              {/* Header */}

              <View>
                <TodaysRoute />
                {/* <Today /> */}
                <Payment />
              </View>
              {/* <Image
                style={{height: hp('40'), width: wp('100')}}
                source={require('../../assets/Icons/graph.png')}
              /> */}
              {/* <Sales />
              <Repo />
              <Schemes />
              <MyProductivity /> */}
            </ScrollView>
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
              // iconWidth={wp(5)}
              // iconHeight={hp(3)}
              shadow="null"
              overlayColor="#221818"
              showBackground={true}
              onPressItem={name => {
                if (name == 'bt_accessibility') {
                  AsyncStorage.setItem('outletName', '');
                  AsyncStorage.setItem('outletId', '');
                  AsyncStorage.setItem('beatName', '');
                  AsyncStorage.setItem('beatId', '');
                  AsyncStorage.setItem('distributorName', '');
                  AsyncStorage.setItem('SearchString', '');
                  //console.log(`selected button: ${name}`);
                  //  alert(name)
                  User.FlagForNavigation = 'Dashboard';
                  Actions.CreateNewOrderFirst();
                  this.setState({
                    active: !this.state.active,
                  });
                } else if (name == 'collection') {
                  AsyncStorage.setItem('outletNameDC', '');
                  AsyncStorage.setItem('outletIdDC', '');
                  AsyncStorage.setItem('beatNameDC', '');
                  AsyncStorage.setItem('beatIdDC', '');
                  AsyncStorage.setItem('SearchStringDC', '');
                  Actions.DataCollectionStep1();
                  this.setState({
                    active: !this.state.active,
                  });
                } else if (name == 'add_shop') {
                  //  Actions.AddNewShop();
                  Actions.Shops();
                } else if (name == 'bt_meet') {
                  //  Actions.AddNewShop();
                  Actions.Create_meet();
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
                  // BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
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
                  //BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
                } else {
                  this.setState({
                    active: !this.state.active,
                  });
                }
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
  };
};
const mapDispatchToProps = dispatch => ({
  userid: val => {
    dispatch(USER_ID(val));
  },
  parentLogin: val => {
    dispatch(PARENT_LOGIN(val));
  },
  selectarea: val => {
    dispatch(SELECT_AREA(val));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
const styles = StyleSheet.create({
  headerMainContainer: {
    flex: 0.3,
    backgroundColor: '#221818',
  },

  todaysRouteTextStyle: {
    color: '#ADA2A2',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('4'),
  },

  dropDownContainer: {
    borderWidth: wp('0.5'),
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    width: wp('90'),
    height: hp('9'),
    marginTop: hp('2'),
    paddingRight: wp('3%'),
    marginVertical: hp('5'),
    marginHorizontal: wp('5'),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: hp('2'),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 15,
    fontSize: 11,
  },

  totalShopsMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  totalShopColContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  totalShopCountTextStyle: {
    color: '#221818',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('11'),
    fontFamily: 'Proxima Nova',
  },

  totalShopHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova',
  },

  shopVisitedColContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  shopVisitedCountTextContainer: {
    color: '#221818',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('8'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  shopVisitedHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('-2'),
    fontFamily: 'Proxima Nova',
  },

  filterIconContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: hp('1'),
  },

  filterIconStyle: {
    justifyContent: 'center',
    height: hp('4'),
    width: wp('8'),
    marginRight: wp('5'),
  },

  dashLineContainer: {
    flex: 1,
    marginTop: hp('2.5'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('100'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  shopListMainContainer: {
    marginTop: hp('3'),
  },

  shopDetailBackStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: wp('2'),
    height: hp('18'),
    width: wp('90'),
    borderWidth: hp('0.3'),
    marginHorizontal: wp('4'),
  },

  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  imageStyles: {
    marginLeft: wp('5'),
    height: hp('10'),
    width: hp('10'),
  },

  shopDetailsContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: hp('-3'),
    marginLeft: wp('15'),
  },

  shopNameTextStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginTop: hp('2'),
  },

  shopAddressTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    marginTop: wp('3'),
  },

  shopDistanceTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    marginTop: wp('3'),
  },

  callContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: wp('5'),
  },

  callTextStyle: {
    color: '#3955CB',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  shopListMainContainerCard: {
    marginTop: hp('3'),
  },

  shopListBackContainerCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('42'),
    width: wp('90'),
    borderWidth: hp('0.3'),
    marginHorizontal: wp('4'),
  },

  shopNameAddContainerCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: wp('6'),
  },

  shopNameTextStyleCard: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginTop: hp('2'),
  },

  shopDistanceTextStyleCard: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    marginTop: wp('3'),
  },
  imgBackContainerCard: {
    backgroundColor: '#F8F4F4',
    borderRadius: wp('2'),
    height: hp('18'),
    width: wp('80'),
    marginTop: hp('3'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStylesCard: {
    // marginLeft: wp('4'),
    height: hp('17'),
    width: wp('22'),
  },

  NCMContainerCard: {
    flex: 1,
    flexDirection: 'row',
  },

  navContainerCard: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  navTextStyleCard: {
    color: '#3955CB',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: wp('6'),
    fontFamily: 'Proxima Nova',
  },

  callContainerCard: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  callTextStyleCard: {
    color: '#3955CB',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    // marginLeft: wp('5'),
  },

  msgContainerCard: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  msgTextStyleCard: {
    color: '#3955CB',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: wp('6'),
    fontFamily: 'Proxima Nova',
  },
  SubmitButtonStyle: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: 180,
    height: 56,
    lineHeight: 56,
    marginHorizontal: hp('3'),
    marginVertical: hp('2'),
    // borderColor: '#00000029',
    // borderWidth: hp('0.3'),
    borderRadius: 48,
    textAlign: 'center',
    bottom: 25,
    backgroundColor: '#ffffff',
    shadowColor: '#00000029',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  TextStyle: {
    color: '#CC1167',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 56,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: hp('50'),
    height: hp('50'),
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: hp('2'),
    marginBottom: hp('2'),
    marginLeft: hp('2'),
    marginRight: hp('2'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2FC36E',
    borderRadius: 24,
    elevation: 2,
    width: 132,
    height: 40,
    marginBottom: hp('2'),
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  openButton1: {
    backgroundColor: 'green',
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    marginBottom: hp('2'),
  },
  textStyleModal: {
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textStyleModal1: {
    color: '#362828',
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: hp('1'),
  },

  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#CC1167',
    fontSize: 16,
    marginTop: hp('4'),
  },
  textDropdownContainer: {
    alignItems: 'flex-start',
    marginRight: hp('2'),
    marginLeft: hp('2'),
  },
  headingTitleText: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    marginHorizontal: wp('1'),
    fontSize: 10,
  },

  dropDownContainer: {
    borderWidth: wp('0.5'),
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    width: wp('78'),
    height: hp('8'),
    marginTop: hp('1'),
    marginVertical: hp('3'),
    marginHorizontal: wp('1'),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: hp('2'),
    alignSelf: 'center',
    padding: -1,
  },

  TriangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderStyle: 'solid',
    marginTop: hp('1'),
    marginLeft: hp('1'),
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2FC36E',
  },
  mapIconStyle: {
    alignSelf: 'center',
    height: hp('5'),
    width: wp('8'),
    // width:  wp('25'),
    // height: hp('12'),
  },
});
