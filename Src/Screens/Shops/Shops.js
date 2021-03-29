import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  FlatList,
  BackHandler,
  AsyncStorage,
  Modal
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {Dropdown} from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements'
import {
  TOTAL_SHOPS,
  SHOP_INFO,
  SHOP_VISITED_TODAY,
} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import axios from 'axios';
import Database from './../../utility/Database';
import User from './../../utility/User';
import Loader from './../../components/LoaderSync';
const db = new Database();
import Communications from 'react-native-communications';
// either import the whole module and call as Communications.phonecall('0123456789', true)
// or can import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { phonecall('0123456789', true) }}
import {FloatingAction} from 'react-native-floating-action';
import {SafeAreaView} from 'react-native';
var open;
const data = [
  {
    value: 'Route 1',
  },
  {
    value: 'Route 2',
  },
  {
    value: 'Route 3',
  },
  {
    value: 'Route 4',
  },
  {
    value: 'Route 5',
  },
  {
    value: 'Route 6',
  },
];

const actions = [
  {
    text: 'Add New Shop',
    color: 'transperent',
    name: 'bt_accessibility',
    position: 1,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 10},
    buttonSize: 0,
  },
];
let countvisited = 0;
export class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
      cardView: false,
      modalVisible: false,
      getRouteId: '',
      routeData: [],
      selectedRouteId: '',
      selectedRouteName: '',
      ShopsArray: [],
      totalshoplen: 0,
      totalVisited: 0,
      totalvisitedlen: 0,
      entity_idArr: [],
      totalVisitedArray: [],
      active: false,
      ParentAreaArray: [],
      selectedArea: 'Select Area',
      selectedAreaName : 'Select Area',
      isLoading: false,
      messagetext: '',
      // cardView: false ,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const {state} = navigation;

    if (params.cardView == true) {
      return {
        title: '   Shops',
        color: 'white',
        headerStyle: {
          backgroundColor: '#221818',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
          marginLeft: wp('-1'),
        },
        headerRight: (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={() => params.handelCardView()}>
              <View>
                <Image
                  style={{
                    marginRight: hp('4'),
                    height: hp('3'),
                    width: wp('4'),
                    color: '#2FC36E',
                    tintColor: '#2FC36E',
                  }}
                  source={require('../../assets/Icons/Card_View.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => params.handelListView()}>
              <View>
                <Image
                  style={{
                    marginRight: hp('4'),
                    height: hp('3'),
                    width: wp('4'),
                    color: '#8C7878',
                    tintColor: '#8C7878',
                  }}
                  source={require('../../assets/Icons/List_View_Selected.png')}
                />
              </View>
            </TouchableOpacity>

            <Image
              style={{
                marginRight: hp('2'),
                marginBottom: hp('0.5'),
                height: hp('4'),
                width: wp('6'),
              }}
              source={require('../../assets/Icons/SearchHeader.png')}
            />
          </View>
        ),

        headerLeft: (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.drawerMenu()}>
              <Image
                style={{marginLeft: wp('4')}}
                source={require('../../assets/Icons/Back_White.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      };
    } else if (params.listView == true) {
      return {
        title: '   Shops',
        color: 'white',
        headerStyle: {
          backgroundColor: '#221818',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
          marginLeft: wp('-1'),
        },
        headerRight: (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={() => params.handelCardView()}>
              <View>
                <Image
                  style={{
                    marginRight: hp('4'),
                    height: hp('3'),
                    width: wp('4'),
                  }}
                  source={require('../../assets/Icons/Card_View.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => params.handelListView()}>
              <View>
                <View>
                  <Image
                    style={{
                      marginRight: hp('4'),
                      height: hp('3'),
                      width: wp('4'),
                    }}
                    source={require('../../assets/Icons/List_View_Selected.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <Image
              style={{
                marginRight: hp('2'),
                marginBottom: hp('0.5'),
                height: hp('4'),
                width: wp('6'),
              }}
              source={require('../../assets/Icons/SearchHeader.png')}
            />
          </View>
        ),

        headerLeft: (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={() => Actions.drawerMenu()}>
              <Image
                style={{marginLeft: wp('4')}}
                source={require('../../assets/Icons/Back_White.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      };
    }
  };

  _componentFocused = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;

    db.getOnlineParentAreaData().then((data) => {
      this.setState({
          ParentAreaArray: data
      })
  })

    AsyncStorage.getItem('routeName').then(keyValue => {
      // this.state.selectedRouteName=  JSON.parse(keyValue)
      this.setState({selectedRouteName: JSON.parse(keyValue)});
    });
    AsyncStorage.getItem('routeId').then(keyValue => {
      //  this.state.selectedBeatId=  JSON.parse(keyValue)
      this.setState({selectedBeatId: JSON.parse(keyValue)});
      this.setState({ShopsArray: []});
      db.getOutletArrayRoute(JSON.parse(keyValue)).then(data => {
        this.state.ShopsArray = data;
        this.setState({ShopsArray: data});
        //console.log("shopArray=",this.state.ShopsArray)
        this.state.totalshoplen = this.state.ShopsArray.length;
        this.setState({totalshoplen: this.state.ShopsArray.length});
      });

      this.setState({entity_idArr: []});
      this.state.totalvisitedlen = 0;
      this.setState({totalvisitedlen: 0});
      db.getCustomerId(JSON.parse(keyValue)).then(data => {
        this.state.entity_idArr = data;
        this.setState({entity_idArr: data});
        //console.log(JSON.stringify(this.state.entity_idArr))

        for (var i = 0; i < this.state.entity_idArr.length; i++) {
          db.getTotalVisitedCount(
            datess,
            this.state.entity_idArr[i].CustomerId,
          ).then(data => {
            if (data.length > 0) {
              this.setState({totalvisitedlen: this.state.totalvisitedlen + 1});
            }
            //console.log(this.state.totalvisitedlen)
          });
        }
      });
    });
  };
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    Actions.drawerMenu();
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  cardViewFunction = () => {
    this.props.navigation.setParams({
      cardView: true,
    });
    this.props.navigation.setParams({
      listView: false,
    });
  };

  listViewFunction = () => {
    this.props.navigation.setParams({
      cardView: false,
    });
    this.props.navigation.setParams({
      listView: true,
    });
  };

  _renderEntity() {
    const beat = []
    const BeatId =[];
  //  console.log('distributorArray : '+JSON.stringify(this.state.distributorArray))
    for (var i = 0; i < this.state.ParentAreaArray.length; i++) {
        beat.push({
            value: this.state.ParentAreaArray[i].Area
        })
        BeatId.push({
            value: this.state.ParentAreaArray[i].AreaId
        })
    }
  //  console.log('beat id : '+JSON.stringify(BeatId))

  //  const array = [{"Distributor":"CSD BANGALORE","DistributorID":"789"},{"Distributor":"KARNATAKA STATE BEVERAGES","DistributorID":"1409"},{"Distributor":"KSBCL - ATTIBELE","DistributorID":"437"},{"Distributor":"KSBCL - BAGALKOT","DistributorID":"1"},{"Distributor":"KSBCL - BAGALKUNTE","DistributorID":"2"},{"Distributor":"KSBCL - BAGALKUNTE-2","DistributorID":"1165"},{"Distributor":"KSBCL - BANGARPET","DistributorID":"3"},{"Distributor":"KSBCL - BANNERGHATTA ROAD","DistributorID":"4"}]
    
    return (
        <Dropdown
            containerStyle={styles.dropDownContainer}
            animationDuration={0}
            rippleCentered={true}
            itemColor='#ADA2A2'
            rippleOpacity={0}
            fontSize={11}
            //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
            value='Select Area'
            pickerStyle={{ width: wp('78') }}
            dropdownPosition={-5.5}
            dropdownOffset={{ top: 20, left: 18, }}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            data={beat}
         //   onChangeText={(value) => { this.onChangeHandlerDistributor(value) }}
            onChangeText={(value, index, data) => this.onChangeHandlerArea(BeatId[index].value,value)}
        />
    )
}

onChangeHandlerArea = (areaId,value) => {
    this.setState({ selectedArea: areaId })
    this.setState({ selectedAreaName : value})
    console.log('dist id : '+areaId)
  //  this.setState({selectedDistName : name})
}

  componentWillMount() {
    this.props.navigation.setParams({
      cardView: this.state.cardView,
    });

    this.props.navigation.setParams({
      listView: this.state.listView,
    });

    this.props.navigation.setParams({
      handelCardView: this.cardViewFunction.bind(this),
    });

    this.props.navigation.setParams({
      handelListView: this.listViewFunction.bind(this),
    });

    this.setState({routeData: []});
    db.getRouteData().then(data => {
      //  beatdata = data
      //console.log("beatdata========",JSON.stringify(data))

      this.setState({routeData: data});
    });
    //console.log("componentDidMount callee")

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused,
    );
  }
  _renderRoute() {
    const beat = [];
    for (var i = 0; i < this.state.routeData.length; i++) {
      beat.push({
        value: this.state.routeData[i].RouteName,
      });
    }
    return (
      <Dropdown
        placeholder="Select Route"
        value={this.state.selectedRouteName}
        itemCount={4}
        dropdownPosition={-6}
        containerStyle={styles.dropDownContainer}
        rippleCentered={true}
        pickerStyle={{width: wp('90.1')}}
        itemColor="#ADA2A2"
        inputContainerStyle={{borderBottomColor: 'transparent'}}
        data={beat}
        fontSize={12}
        dropdownOffset={{top: 15, left: 15}}
        animationDuration={0}
        fontFamily="Proxima Nova"
        onChangeText={value => {
          this.onChangeHandlerRoute(value);
        }}
      />
    );
  }

  onChangeHandlerRoute = value => {
    this.setState({selectedRouteName: value});
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;
    AsyncStorage.setItem('routeName', JSON.stringify(value));
    AsyncStorage.setItem('beatName', JSON.stringify(value));
    db.getRouteId(this.state.selectedRouteName).then(data => {
      const abc = JSON.parse(data);
      let result = abc.map(a => a.RouteID);
      var getRouteId = '';
      getRouteId = result;
    //  alert(getRouteId)
      this.setState({getRouteId: result});
      AsyncStorage.setItem('routeId', JSON.stringify(getRouteId));
      this.state.selectedBeatId = getRouteId;
      this.setState({selectedBeatId: getRouteId});
      this.setState({ShopsArray: []});
      db.getOutletArrayRoute(this.state.getRouteId).then(data => {
        this.state.ShopsArray = data;
        this.setState({ShopsArray: data});
        //console.log("shopArray=",this.state.ShopsArray)
        this.state.totalshoplen = this.state.ShopsArray.length;
        this.setState({totalshoplen: this.state.ShopsArray.length});
      });

      this.setState({entity_idArr: []});
      this.state.totalvisitedlen = 0;
      this.setState({totalvisitedlen: 0});
      db.getCustomerId(getRouteId).then(data => {
        this.state.entity_idArr = data;
        this.setState({entity_idArr: data});
        //console.log(JSON.stringify(this.state.entity_idArr))

        for (var i = 0; i < this.state.entity_idArr.length; i++) {
          db.getTotalVisitedCount(
            datess,
            this.state.entity_idArr[i].CustomerId,
          ).then(data => {
            if (data.length > 0) {
              this.setState({totalvisitedlen: this.state.totalvisitedlen + 1});
            }
            //console.log(this.state.totalvisitedlen)
          });
        }
      });
    });
    ///////////////////////////////////////////////////visited logic

    ///////////////////////////////end....../////////////////////////
  };

  setModalVisible = (bools) => {

    this.setState({ modalVisible: bools })
}

checkAreaSelected(){
  if(this.state.selectedArea == 'Select Area'){
    alert('Please Select Area')
  }else{
    this.setModalVisible(false)
    this.syncNowFunction();
  }
}


syncNowFunction() {
  console.log('I am sync now : '+this.state.selectedArea);
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
                        // for (
                        //   let i = 0;
                        //   i < response.data.Data.Order.Orders.length;
                        //   i++
                        // ) {
                        //   db.updateOrderMasterSyncFlag(
                        //     response.data.Data.Order.Orders[i]
                        //       .MobileGenPrimaryKey,
                        //   );
                        //   db.updateOrderDetailSyncFlag(
                        //     response.data.Data.Order.Orders[i]
                        //       .MobileGenPrimaryKey,
                        //   );
                        //   db.updateimageDetailSyncFlag(
                        //     response.data.Data.Order.Orders[i]
                        //       .MobileGenPrimaryKey,
                        //   );
                        //   db.updateDiscountSyncFlag(
                        //     response.data.Data.Order.Orders[i]
                        //       .MobileGenPrimaryKey,
                        //   );
                        //   db.updateNewPartyOutletSyncFlag(
                        //     response.data.Data.Order.Orders[i]
                        //       .MobileGenPrimaryKey,
                        //   );

                        //   db.updateNewPartyImageDetailSyncFlag(
                        //     response.data.Data.Order.Orders[i]
                        //       .MobileGenPrimaryKey,
                        //   );
                        // }
                        db.deleteOrderMaster();
                        db.deleteOrderDetails();
                        db.deletenewpartyoutlet();
                        db.deletenewpartyImageoutlet();
                        db.deleteImagesDetails();
                        db.deleteTABLE_DISCOUNT();
                        //  alert('Data Sync Successfull');
                        Alert.alert(
                          'ZyleminiPlus',
                          response.data.Data.Order.Status,
                          [
                            // {
                            //   text: "Cancel",
                            //   onPress: () => console.log("Cancel Pressed"),
                            //   style: "cancel"onPress={() => this.props.navigation.navigate('MJP_one')}
                            // },
                            {text: 'OK', onPress: () => this.GetNewData()},
                          ],
                          {cancelable: false},
                        );
                      }
                    } catch (error) {}

                    //  alert(response.data.Data.Order.Status);
                  } else {
                    //console.log("count is..........", count)
                    //  alert("in else")
                    // if(count>0){
                    //
                    // }else{
                    //     alert("There is No data for Sync")
                    // }
                    //  alert("Sync Failed Please Try Again!")
                  }
                  this.setState({isLoading: false});
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
    AreaId : this.state.selectedArea
  };
  // alert(User.GetUrl);
  console.log(User.GetUrl);
  console.log('header : '+JSON.stringify(headers1))
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
            this.setState({isLoading: false});
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



ButtonClickCheckFunction = () => {

    this.setModalVisible(true)
}

  navigate = (shopid,party) => {
    AsyncStorage.setItem('shopId', JSON.stringify(shopid));
    AsyncStorage.setItem('outletName', JSON.stringify(party));
    AsyncStorage.setItem('outletId', JSON.stringify(shopid));
    Actions.Info({shopId: shopid});
  };
  cardListViewsView = () => {
    const {navigation} = this.props;
    const {params = {}} = navigation.state;
    const {state} = navigation;

    if (params.listView == true) {
      return (
        <FlatList
          data={this.state.ShopsArray}
          renderItem={({item}) => (
            <View style={styles.shopListMainContainer}>
              <TouchableOpacity  onPress={()=>this.navigate( item.id,item.party)}>
              {/* <TouchableOpacity onPress={() => Actions.Info({shopId: item.id})}> */}
                <View style={styles.shopDetailBackStyle}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.imageStyles}
                      source={require('../../assets/Icons/shopImg.png')}
                    />
                  </View>
                  <View style={styles.shopDetailsContainer}>
                    <Text style={styles.shopNameTextStyle}>{item.party}</Text>
                    <Text style={styles.shopAddressTextStyle}>
                      {item.Outlet_Info.split('||')[0]}
                    </Text>
                    {/* <Text style={styles.shopDistanceTextStyle}>
                      1 Km Away ETA 5Mins
                    </Text> */}
                  </View>
                  <View style={styles.callContainer}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        backgroundColor: '#e6ebe7',
                        borderRadius: 20,
                        width: 28,
                        height: 26,
                      }}
                      onPress={() =>
                        Communications.phonecall('0123456789', true)
                      }>
                      <Text style={styles.callTextStyle}> Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          //  keyExtractor={item => item.id}
        />
      );
    } else if (params.cardView == true) {
      return (
        <FlatList
          data={this.state.ShopsArray}
          renderItem={({item}) => (
            <View style={styles.shopListMainContainerCard}>
              <TouchableOpacity onPress={() => Actions.Info({shopId: item.id})}>
                <View style={styles.shopListBackContainerCard}>
                  <View style={styles.shopNameAddContainerCard}>
                    <Text style={styles.shopNameTextStyleCard}>
                      {item.party}
                    </Text>
                  </View>
                  <View style={styles.shopNameAddContainerCard}>
                    <Text style={styles.shopDistanceTextStyleCard}>
                      {item.Outlet_Info.split('||')[0]} 
                      {/* 1Km Away ETA 5 mins */}
                    </Text>
                  </View>
                  <View style={styles.imgBackContainerCard}>
                    <Image
                      style={styles.imageStylesCard}
                      source={require('../../assets/Icons/shopImg.png')}
                      // source={require('../../assets/Icons/Shop_card_watermark.png')}
                    />
                  </View>
                  <View style={styles.NCMContainerCard}>
                    <View style={styles.navContainerCard}>
                      <TouchableOpacity>
                        <Text style={styles.navTextStyleCard}>Navigate</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.callContainerCard}>
                      <TouchableOpacity
                        // style={{backgroundColor: 'red'}}
                        onPress={() =>
                          Communications.phonecall('0123456789', true)
                        }>
                        <Text style={styles.callTextStyleCard}>Call</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.msgContainerCard}>
                      <TouchableOpacity
                        onPress={() =>
                          Communications.text('0123456789', 'Test Text Here')
                        }>
                        <Text style={styles.msgTextStyleCard}>Message</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      );
    }
  };

  render() {
    return (
      <View style={{flex: 10}}>
         <Loader
          loading={this.state.isLoading}
          message={this.state.messagetext}
        />
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{
            height: hp('90'),
            width: wp('100'),
            resizeMode: 'cover',
            justifyContent: 'center',
          }}>


                    <Modal
                        style={{
                            flex: 1,
                            padding: 5,
                        }}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false)
                        }}>
                        <ImageBackground
                            source={require('../../assets/Icons/android_BG.png')}
                            style={{ height: hp('95'), width: wp('100'), resizeMode: 'cover', justifyContent: 'center', }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ flexDirection: 'column', justifyContent : 'center'}}>
                                    <Text style={styles.modalText}>Confirm Your Location</Text>
                                        <View style={{
                                            marginBottom: 20,
                                            textAlign: "center",
                                            fontWeight: 'bold',
                                            color: '#CC1167',
                                            fontSize: 16,
                                            
                                        }}>
                                            {/* <Icon
                                                size={24}
                                                name='create'
                                                color='#CC1167' /> */}

                              
                                 <Image style={styles.mapIconStyle}
                                    source = {require('../../assets/Icons/location_checkin.png')}/>
                               
                          </View>
                          <View style={{
                                            width: wp('14'),
                                            height: hp('4'),
                                            borderRadius: 150,
                                            textAlign: "center",
                                            alignSelf :'center',
                                            backgroundColor: "#796A6A",
                                            opacity : 0.05,
                                            marginTop : hp('-5'),
                                            transform: [{ scaleX: 2 }],
                                            
                                        }}></View>
                                       
                                    </View>


                                    {/* <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>CHOOSE CITY</Text>
                                        {this._renderEntity()}
                                    </View> */}

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>CHOOSE AREA</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={{
                                        width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute',
                                        bottom: 50
                                    }}>
                                        <TouchableHighlight
                                            style={styles.openButton}
                                            onPress={() => {
                                             this.checkAreaSelected()
                                          
                                            }}
                                        >
                                            <Text style={styles.textStyleModal}>CONFIRM</Text>
                                        </TouchableHighlight>

                                        <TouchableOpacity
                                            onPress={() => {
                                              this.setModalVisible(false)
                                            }}
                                        >
                                            <Text style={styles.textStyleModal1}>CANCEL</Text>
                                        </TouchableOpacity>


                                    </View>

                                </View>
                            </View>
                        </ImageBackground>
                    </Modal>


          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.headerMainContainer}>
              <Text style={styles.todaysRouteTextStyle}>TODAY'S ROUTE</Text>
              {this._renderRoute()}
            </View>

            {/*Total Shops  */}
            <View style={styles.totalShopsMainContainer}>
              <View style={styles.totalShopColContainer}>
                <Text style={styles.totalShopCountTextStyle}>
                  {this.state.totalshoplen}
                </Text>
                <Text style={styles.totalShopHeadingTextStyle}>
                  Total Shops
                </Text>
              </View>
              <View style={styles.shopVisitedColContainer}>
                <Text style={styles.shopVisitedCountTextContainer}>
                  {this.state.totalvisitedlen}
                </Text>
                <Text style={styles.shopVisitedHeadingTextStyle}>
                  Shop Visited Today
                </Text>
              </View>
              {/* Filter Icon */}
              <View style={styles.filterIconContainer}>
                {/* <Image
                  source={require('../../assets/Icons/filter_list_shop.png')}
                  style={styles.filterIconStyle}
                /> */}
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

            {/* ///////////////////////////////////////////////// */}

            {this.cardListViewsView()}
            <View style={{marginBottom: 30}} />
          </ScrollView>

          <TouchableOpacity
                        style={styles.SubmitButtonStyle}

                         onPress={this.ButtonClickCheckFunction}
                         >
                        <View style={{ alignSelf: "center", textAlign: 'center', lineHeight: 56 }}
                        >
                           <Image
              style={{
                marginLeft:  wp('1'),
               // marginRight:  wp('1'),
                height: hp('4.2'),
                width: wp('7.5'),
                alignSelf: 'center',
              }}
              source={require('../../assets/Icons/location_check.png')}
              color="white"
              // onPress={() => navigation.openDrawer() }
              // onPress={() => navigation.toggleDrawer()}
            />
                        </View>
                        <Text style={styles.TextStyle}> {this.state.selectedAreaName} </Text>

                    </TouchableOpacity>

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
              if ((name = 'bt_accessibility')) {
                AsyncStorage.getItem('routeId').then(keyValue => {
                  if (JSON.parse(keyValue)) {
                    AsyncStorage.setItem('outletName', '');
                    AsyncStorage.setItem('ownerName', '');
                    AsyncStorage.setItem('address', '');

                    Actions.AddNewShop();
                    this.setState({
                      active: !this.state.active,
                    });
                  } else {
                    alert('Please Select Route First');
                  }
                });
              }
            }}
            onPressMain={() => {
              if (this.state.active == false) {
                this.setState({
                  active: !this.state.active,
                });
                //  BackHandler.addEventListener('hardwareBackPress', () => Actions.T());
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
          
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    shops: state.shops,
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
)(Shops);

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
    shadowColor: "#00000029",
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
  textAlign: 'center', fontSize: 14, fontFamily: 'Proxima Nova', alignSelf: "center", textAlign: 'center', lineHeight: 56


},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
modalView: {
  width: hp('50'),
  height: hp('90'),
  backgroundColor: "white",
  borderRadius: 10,
  marginTop: hp('2'),
  marginBottom: hp('2'),
  marginLeft: hp('2'),
  marginRight: hp('2'),
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
openButton: {
  backgroundColor: "#2FC36E",
  borderRadius: 24,
  elevation: 2, width: 132,
  height: 40,
  marginBottom: hp('2'), textAlign: "center", alignSelf: 'center', justifyContent: 'center', textAlign: 'center'
},
openButton1: {
  backgroundColor: "green",
  borderRadius: 25,
  padding: 10,
  elevation: 2,
  marginBottom: hp('2'),
},
textStyleModal: {
  color: "white",
  padding: 5,
  fontWeight: "bold",
  textAlign: "center", alignSelf: 'center', fontWeight: 'bold', fontSize: 12,

},
textStyleModal1: {
  color: "#362828",
  padding: 5,
  fontWeight: "bold",
  textAlign: "center", alignSelf: 'center', fontWeight: 'bold', fontSize: 12, marginTop: hp('1')

},

modalText: {
  marginBottom: 20,
  textAlign: "center",
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
  marginHorizontal: wp('1'), fontSize: 10
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
  borderBottomColor: '#2FC36E'
},
mapIconStyle:{
  alignSelf:'center',
  height: hp('5'),
  width: wp('8'),
  // width:  wp('25'),
  // height: hp('12'),
},
});
