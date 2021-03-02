/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  AsyncStorage,
  Dimensions,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DeviceInfo from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import {Value} from 'react-native-reanimated';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Database from './../utility/Database';
import SQLite from 'react-native-sqlite-storage';
import Loader from '../components/Loader';
const db = new Database();

db.initDB();
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      isLogged: '',
      isLoading: '',
      tokens: '',
    };

    //  this._bootstrapAsync();
  }
  performTimeConsumingTask = async () => {
    console.log('hnadjasidaidaidasidasidjasijdnasidnasidjnai');
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
        console.log('aaalllaaareee');
      }, 3000),
    );
  };
  // componentWillMount() {
  //   console.log('in authLoading/////////............');
  //   const devices = DeviceInfo.getUniqueId();
  //   //console.log( "devices=",devices)
  //   AsyncStorage.setItem('deviceId', JSON.stringify(devices));
  //   // this._bootstrapAsync()
  // }

  // _bootstrapAsync = async () => {

  //   //console.log("in _bootstrapAsync")

  //   const data = this.performTimeConsumingTask();
  //   if (data !== null) {
  //   AsyncStorage.getItem('isLogged').then((keyValue) => {
  //     //console.log('isLogged value==',JSON.parse(keyValue));
  //    if(JSON.parse(keyValue)==true && JSON.parse(keyValue)!=undefined){
  //     Actions.App({type: "reset"})
  //    }else{
  //     Actions.Auth({type: "reset"})
  //    }
  //   }, (error) => {
  //     //console.log(error) //Display error
  //   });
  // }
  // }

  onStoreButtonPress = () => {
    SQLite.deleteDatabase(
      {
        name: 'ZyleminiPlusDatabase.db',
        location: 'default',
      },
      function(res) {
        if (res === 'database removal error') {
          // if not successfully deleted
          console.log('database removal error');
        } else if (res === 'database removed') {
          // if successfully deleted
          console.log('database removed');
          db.initDB();
        }
      },
    );
    if (Platform.OS === 'ios') {
      Linking.openURL('https://itunes.apple.com/app/id1321198947?mt=8');
    } else {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.zyleminiplus',
      );
    }
  };

  // async componentWillMount(){
  //   AsyncStorage.getItem('JWTToken').then(keyValue => {
  //     const tok = JSON.parse(keyValue);
  //     this.setState({tokens: tok});
  //     console.log('token : '+this.state.tokens);
  //   });
  //   try{
  //     const check = await checkVersion({
  //       version: DeviceInfo.getVersion(), // app local version
  //       iosStoreURL: 'ios app store url',
  //       androidStoreURL: 'https://play.google.com/store/apps/details?id=com.zyleminiplus',
  //      // country: 'jp' // default value is 'jp'
  //     });
  // console.log('app version : '+check.result +" : "+check.remote +" : local "+check.local + " deviceinfo : "+DeviceInfo.getVersion())
  //     if(check.result === "new"){
  //       // if app store version is new
  //     //  this.setState({isLatest : false})
  //     this.syncNowFunction();

  //       // Alert.alert(
  //       //   "ZyleminiPlus",
  //       //   'App Update Available.',
  //       //   [
  //       //     // {
  //       //     //   text: "Cancel",
  //       //     //   onPress: () => console.log("Cancel Pressed"),
  //       //     //   style: "cancel"onPress={() => this.props.navigation.navigate('MJP_one')}
  //       //     // },
  //       //     { text: "Update",
  //       //     style: 'cancel',
  //       //     onPress: () => this.onStoreButtonPress() }
  //       //   ],
  //       //   { cancelable: false }
  //       // );

  //     }else{
  //       setTimeout(() => {
  //       //  this.setState({isLatest : true})
  //         try {
  //           const devices = DeviceInfo.getUniqueId();
  //           AsyncStorage.setItem('deviceId', JSON.stringify(devices));

  //           AsyncStorage.getItem('isLogged').then(
  //             keyValue => {
  //               db.initDB();
  //               //  Actions.Auth({type: "reset"})
  //               /////////////////////////////////////
  //               if (JSON.parse(keyValue) == true && JSON.parse(keyValue) != null) {
  //                 Actions.App({type: 'reset'});
  //               } else {
  //                 Actions.Auth({type: 'reset'});
  //               }

  //               ////////////////////////
  //             },
  //             error => {
  //               //console.log(error) //Display error
  //             },
  //           );
  //         } catch {
  //           console.error();
  //         }
  //       }, 4000);

  //     }
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  async componentDidMount() {
    setTimeout(() => {
      try {
        AsyncStorage.setItem('deviceId', JSON.stringify(devices));
        const devices = DeviceInfo.getUniqueId();

        AsyncStorage.getItem('isLogged').then(
          keyValue => {
            //  Actions.Auth({type: "reset"})
            /////////////////////////////////////
            if (JSON.parse(keyValue) == true && JSON.parse(keyValue) != null) {
              Actions.App({type: 'reset'});
            } else {
              Actions.Auth({type: 'reset'});
            }

            ////////////////////////
          },
          error => {
            //console.log(error) //Display error
          },
        );
      } catch {
        console.error();
      }
    }, 4000);

    // console.log('in componentDidMount');
    // const devices = DeviceInfo.getUniqueId();
    // //console.log( "devices=",devices)
    // AsyncStorage.setItem('deviceId', JSON.stringify(devices));
    // // this._bootstrapAsync()
    // const data = this.performTimeConsumingTask().then(data => {
    //   if (data !== null) {
    //     AsyncStorage.getItem('isLogged').then(
    //       keyValue => {
    //         //  Actions.Auth({type: "reset"})
    //         /////////////////////////////////////
    //         if (JSON.parse(keyValue) == true && JSON.parse(keyValue) != null) {
    //           Actions.App({type: 'reset'});
    //         } else {
    //           Actions.Auth({type: 'reset'});
    //         }

    //         ////////////////////////
    //       },
    //       error => {
    //         //console.log(error) //Display error
    //       },
    //     );
    //   }
    // });
    // console.log('this is data', data);
  }

  syncNowFunction() {
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
              // alert(count)

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

                const url =
                  'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData';
                axios
                  .post(url, this.state.JSONObj, {
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

                          Alert.alert(
                            'ZyleminiPlus',
                            'App Update Available.',
                            [
                              // {
                              //   text: "Cancel",
                              //   onPress: () => console.log("Cancel Pressed"),
                              //   style: "cancel"onPress={() => this.props.navigation.navigate('MJP_one')}
                              // },
                              {
                                text: 'Update',
                                style: 'cancel',
                                onPress: () => this.onStoreButtonPress(),
                              },
                            ],
                            {cancelable: false},
                          );
                        }
                      } catch (error) {}

                      //  alert(response.data.Data.Order.Status);
                    } else {
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
                AsyncStorage.getItem('isLogged').then(
                  keyValue => {
                    db.initDB();
                    //  Actions.Auth({type: "reset"})
                    /////////////////////////////////////
                    if (
                      JSON.parse(keyValue) == true &&
                      JSON.parse(keyValue) != null
                    ) {
                      Actions.App({type: 'reset'});
                    } else {
                      Actions.Auth({type: 'reset'});
                    }

                    ////////////////////////
                  },
                  error => {
                    //console.log(error) //Display error
                  },
                );
              }
            });
          });
        });
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoView}>
          <Loader
            loading={this.state.isLoading}
            message={'Sending Data To server..'}
          />
          <ImageBackground
            source={require('../assets/Icons/splashBottom.png')}
            style={{
              // flex: 1,
              height: hp('100%'),
              width: wp('100%'),
              // resizeMode: 'cover',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: hp('12'),
              }}>
              {/* <Image style={{width: wp('29'), height: hp('18')}} */}
              <Image
                style={styles.logo}
                source={require('../assets/Icons/zylemini_logo.png')}
              />
              <Text style={{marginTop: 10}}>Salesforce Automation App</Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: hp('19'),
    height: hp('23'),
    // resizeMode: 'center',
  },
};

export default SplashScreen;
