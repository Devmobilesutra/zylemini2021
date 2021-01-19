import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Dash from 'react-native-dash';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import {Actions} from 'react-native-router-flux';
import {FloatingAction} from 'react-native-floating-action';
import moment from 'moment';
import {TOTAL_SHOPS} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
import AuditAssetStep3 from '../Assets/AuditAssetStep3';
const db = new Database();
const newArray = [];
var datas2 = [];
var open, ShopId;
var arr = [];
const actions = [
  {
    text: 'Create New Order',
    color: 'transperent',
    name: 'bt_create',
    position: 4,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 10},
    buttonSize: 0,
  },
  {
    text: 'Accept Payment',
    color: 'transperent',
    name: 'bt_payment',
    position: 3,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 15},
    buttonSize: 0,
  },
  {
    text: 'Take A Survey',
    color: 'transperent',
    name: 'bt_survey',
    position: 2,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 22},
    buttonSize: 0,
  },
  {
    text: 'Audit Assets',
    color: 'transperent',
    name: 'bt_assets',
    position: 1,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
];

// "insert into AssetPlacementVerification(OrderID,AssetID,QRCode,ScanStatus,AssetInformation,Remark) VALUES (?,?,?,?,?,?)",
// "params":["1152020153442","1","IR/PUNE/MAY 18/3","2","","Hssh"]}]})
var newDate;
var idListArray = [];
export class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '',
      totalAssetNo: '',
      datass2: [],
      aa: [],
      active: false,
      TotalAssset: [],
      TotalAssetLen: 0,
    };
  }

  filterPopUp = () => {
    const {navigation} = this.props;
    this.setState({visible: true});
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    Actions.Shops();
    return true;
  }
  //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this._componentFocused();
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused,
    );
  }
  _componentFocused() {
    //shopId
    AsyncStorage.getItem('userIds').then(keyValue => {
      console.log(JSON.parse(keyValue));
      ShopId = JSON.parse(keyValue);
    });
    db.getOrderIdForAssetList('5', ShopId).then(data => {
      this.setState({TotalAssetLen: data.length});
      console.log('id array====', JSON.stringify(data));
      this.state.TotalAssset = [];
      this.setState({TotalAssset: []});
      for (var i = 0; i < data.length; i++) {
        db.getAseetListInfo(data[i].id).then(data1 => {
          for (let j = 0; j < data1.length; j++) {
            this.state.TotalAssset.push(data1[0]);
          }

          //  this.state.TotalAssset.push(data1);
          // this.setState({ aa: arr })

          // this.setState((prevState) => {
          //     return {
          //         TotalAssset: [...prevState.TotalAssset, data1],
          //         //  opdschdule.push

          //     }
          //  });
          console.log(
            'for loop array====',
            JSON.stringify(this.state.TotalAssset),
          );
          this.setState({aa: arr});
        });
        // for (let j = 0; j < data1.length; j++) {
        //     arr.push(data1[j]);
        //     this.setState({aa:data1[j]})
        //     console.log("arr++++++++++===========================",JSON.stringify(arr))
        // }
        //  this.setState({TotalAssset:arr})

        //  this.setState({TotalAssset:arr})
      }

      console.log('Rajani', this.state.TotalAssset);
    });
  }

  render() {
    console.log(
      'Rajanifinallllllllllllllllllllllllll',
      this.state.TotalAssset[0],
    );
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/*Total Shops  */}
            <View style={styles.totalAssetsMainContainer}>
              <View style={styles.assetsColContainer}>
                <Text style={styles.assetsCountTextStyle}>
                  {this.state.TotalAssetLen}
                </Text>
                <Text style={styles.assetsHeadingTextStyle}>
                  Total No. Of Assets
                </Text>
              </View>
              {/* Filter Icon */}
              <View style={styles.filterIconContainer}>
                <TouchableOpacity onPress={this.filterPopUp.bind(this)}>
                  <View style={{flex: 1}}>
                    <Dialog
                      visible={this.state.visible}
                      dialogAnimation={
                        new SlideAnimation({
                          slideFrom: 'bottom',
                        })
                      }
                      onTouchOutside={() => {
                        this.setState({visible: false});
                      }}
                      width={wp('100')}
                      height={hp('45')}
                      dialogStyle={{
                        marginTop: hp('55'),
                        borderTopRightRadius: wp('0'),
                        borderTopLeftRadius: wp('0'),
                      }}>
                      <DialogContent>
                        {/* HEADER FILTER by view */}
                        <View
                          style={{
                            backgroundColor: '#F8F4F4',
                            height: hp('10'),
                            width: wp('104'),
                            flexDirection: 'row',
                            marginLeft: wp('-4'),
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              color: '#8C7878',
                              fontWeight: 'bold',
                              fontFamily: 'Proxima Nova',
                              flex: 1,
                              fontSize: 12,
                              marginLeft: wp('6'),
                            }}>
                            Filter by
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              marginRight: wp('8'),
                            }}>
                            <Text
                              style={{
                                marginRight: wp('5'),
                                alignSelf: 'center',
                                color: '#ADA2A2',
                                fontWeight: 'bold',
                                fontFamily: 'Proxima Nova',
                                fontSize: 12,
                              }}>
                              CLEAR
                            </Text>
                            <Image
                              source={require('../../assets/Icons/filter_list_shop.png')}
                              style={{height: hp('5'), alignSelf: 'center'}}
                            />
                          </View>
                        </View>
                        {/* Recent date */}
                        <View
                          style={{marginTop: hp('3.5'), marginLeft: wp('2')}}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: 12,
                            }}>
                            Recent( Date Installed )
                          </Text>
                        </View>
                        {/* Asset Type */}
                        <View
                          style={{marginTop: hp('3.5'), marginLeft: wp('2')}}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: 12,
                            }}>
                            Asset Type
                          </Text>
                        </View>
                        {/* All tabs */}
                        <View
                          style={{
                            marginTop: hp('2'),
                            flexDirection: 'column',
                            marginLeft: wp('2'),
                          }}>
                          {/* First Line */}
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                backgroundColor: '#796A6A',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                All
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                marginLeft: wp('4'),
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Refrigerator
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                marginLeft: wp('4'),
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Storage Unit
                              </Text>
                            </View>
                          </View>

                          {/* Second Line */}
                          <View
                            style={{flexDirection: 'row', marginTop: hp('2')}}>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Television
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                marginLeft: wp('4'),
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Kiosk
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                marginLeft: wp('4'),
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Kiosk
                              </Text>
                            </View>
                          </View>

                          {/* Third Line */}
                          <View
                            style={{flexDirection: 'row', marginTop: hp('2')}}>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Television
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'),
                                height: hp('4.5'),
                                width: wp('23'),
                                flexDirection: 'column',
                                marginLeft: wp('4'),
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#796A6A',
                                  fontFamily: 'Proxima Nova',
                                  fontWeight: 'bold',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                Canopy
                              </Text>
                            </View>
                          </View>
                        </View>
                      </DialogContent>
                    </Dialog>
                  </View>
                  <Image
                    source={require('../../assets/Icons/filter_list_shop.png')}
                    style={styles.filterIconStyle}
                  />
                </TouchableOpacity>
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

            {/* Assets List */}
            {/* {this._renderAssetList()} */}
            <FlatList
              //  data={newArray}
              data={this.state.TotalAssset}
              renderItem={({item}) => (
                //[{"Remark":"Xbxb","ScanFlag":"","AssetInformation":"Asset Name: IR/PUNE/MAY 18/3 || Asset Type: WallBay || Model No: ABC Company || SizeSqFeet: 24",
                //"CustomerID":"8418","id":1,"AssetQRcode":"IR/PUNE/MAY 18/3","AssetID":"1"},
                //{"Remark":"Hzjx","ScanFlag":"","AssetInformation":"Asset Name: IR/PUNE/MAY 18/4 || Asset Type: WallBay || Model No: ABC Company || SizeSqFeet: 24","CustomerID":"10715","id":2,"AssetQRcode":"IR/PUNE/MAY 18/4","AssetID":"2"},{"Remark":"Gjk","ScanFlag":"","AssetInformation":"Asset Name: IR/PUNE/MAY 18/4 || Asset Type: WallBay || Model No: ABC Company || SizeSqFeet: 24","CustomerID":"10715","id":2,"AssetQRcode":"IR/PUNE/MAY 18/4","AssetID":"2"}]
                <View style={styles.assetListMainContainer}>
                  {/* Header Asset is */}
                  <View style={styles.cardHeaderBGContainer}>
                    <Text style={styles.assetIdTextStyle}>
                      ASSET ID : {item.AssetID}
                    </Text>
                  </View>
                  {/* Below Header White BG */}
                  <View style={styles.cardWhiteBGContainer}>
                    {/* Images Gray BG */}
                    <View style={styles.imgBGContainer}>
                      <Image
                        style={styles.imgStyle}
                        source={require('../../assets/Icons/shopImg.png')}
                      />
                    </View>
                    {/* Installation Audit Condition */}
                    <View style={styles.IACMainContainer}>
                      <View style={styles.instColContainer}>
                        <Text style={styles.instLabelTextStyle}>
                          INSTALLATION DATE
                        </Text>
                        <Text style={styles.instDateTextStyle}>
                          20 Dec 2016
                        </Text>
                      </View>
                      <View style={styles.lastAudMainContainer}>
                        <Text style={styles.lastAudLabelStyle}>LAST AUDIT</Text>
                        <Text style={styles.lastAuditDatStyle}>
                          {item.AuditDate}
                        </Text>
                      </View>
                      <View style={styles.conditionMainContainer}>
                        <Text style={styles.conditionLabelStyle}>
                          CONDITION
                        </Text>
                        <Text style={styles.conditionStatusStyle}>
                          {item.Condition}
                        </Text>
                      </View>
                    </View>

                    {/* Dash line */}
                    <View style={styles.cardDashLineMainContainer}>
                      <Dash
                        style={styles.cardDashStyle}
                        dashLength={2}
                        dashColor="#E6DFDF"
                      />
                    </View>

                    <View style={styles.ABMMainContainer}>
                      <View style={styles.assetTypeColContainer}>
                        <Text style={styles.assetTypeLabelStyle}>
                          ASSET TYPE
                        </Text>
                        <Text style={styles.assetsTypeTextStyle}>
                          {item.AssetInformation.split('||')[1].split(':')[1]}
                        </Text>
                      </View>
                      <View style={styles.brandColContainer}>
                        <Text style={styles.brandLabelStyle}>BRAND</Text>
                        <Text style={styles.brandsTypeTextStyle}>
                          {item.AssetInformation.split('||')[2].split(':')[1]}
                        </Text>
                      </View>
                      <View style={styles.modelNoColContainer}>
                        <Text style={styles.modelNoLabelStyle}>MODEL NO</Text>
                        <Text style={styles.modelNosNoStyle}>
                          {item.AssetQRcode}
                        </Text>
                      </View>
                    </View>
                    {/* })
    } */}
                    {/* View Detailes */}
                    <View style={styles.viewDetailsMainContainer}>
                      <View style={styles.viewDetailsRowContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            Actions.AssetDetailView({
                              AssetID: item.AssetQRcode,
                              IDno: item.AssetID,
                            });
                            // this.props.navigation.navigate('AuditAssetStep3', {
                            //   AssetID: item.AssetID,
                            // });
                          }}>
                          <Text style={styles.viewDetailsLabelStyle}>
                            View Details
                          </Text>
                          {/* </View>
                            <View style={{flex:1, flexDirection:'column',alignItems:'flex-end',justifyContent:'flex-end', }}> */}
                          {/* <Image
                            style={styles.viewDetailesArrowStyle}
                            source={require('../../assets/Icons/right_arrow_front.png')}
                          /> */}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />

            <View style={{height: hp('10')}} />
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
              // if(name = "bt_create"){
              if (name == 'bt_assets') {
                Actions.AssetUpdate();
                this.setState({
                  active: !this.state.active,
                });
              } else if (name == 'bt_create') {
                AsyncStorage.setItem('outletName', '');
                AsyncStorage.setItem('outletId', '');
                AsyncStorage.setItem('beatName', '');
                AsyncStorage.setItem('beatId', '');
                AsyncStorage.setItem('distributorName', '');
                AsyncStorage.setItem('SearchString', '');

                Actions.CreateNewOrderFirst();
                this.setState({
                  active: !this.state.active,
                });
              } else if (name == 'bt_survey') {
                Actions.AssetUpdate();
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
                //   BackHandler.addEventListener('hardwareBackPress', () => Actions.TabBar());
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
  //    userid: (val) => { dispatch(USER_ID(val));
  //                                  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Assets);

const styles = StyleSheet.create({
  totalAssetsMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  assetsColContainer: {
    flex: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  assetsCountTextStyle: {
    color: '#221818',
    fontSize: 18,
    fontWeight: 'bold',
    // marginLeft: wp('15'),
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
  },

  assetsHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    alignSelf: 'center',
    // marginLeft: wp('5'),
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
    marginBottom: hp('1'),
  },

  dashLineContainer: {
    flex: 1,
    marginTop: hp('3'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('100'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  assetListMainContainer: {
    marginTop: hp('3'),
  },

  cardHeaderBGContainer: {
    backgroundColor: '#796A6A',
    height: hp('8'),
    width: wp('90'),
    borderTopLeftRadius: wp('2'),
    borderTopRightRadius: wp('2'),
    marginTop: hp('-1'),
    alignSelf: 'center',
    justifyContent: 'center',
  },

  assetIdTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginLeft: wp('4'),
  },

  cardWhiteBGContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderColor: '#E6DFDF',
    alignSelf: 'center',
    borderBottomLeftRadius: wp('2'),
    borderBottomRightRadius: wp('2'),
    height: hp('56'),
    width: wp('90'),
    borderWidth: hp('0.2'),
    borderTopWidth: hp('0'),
  },

  imgBGContainer: {
    marginTop: hp('3'),
    backgroundColor: '#F8F4F4',
    alignSelf: 'center',
    height: hp('25'),
    width: wp('81'),
    borderRadius: wp('1'),
    justifyContent: 'center',
  },

  imgStyle: {
    alignSelf: 'center',
    height: hp('20'),
  },

  IACMainContainer: {
    marginTop: hp('2'),
    flexDirection: 'row',
    marginLeft: wp('4'),
  },

  instColContainer: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  instLabelTextStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  instDateTextStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1.5'),
  },

  lastAudMainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    //  marginRight: wp('1'),
  },

  lastAudLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  lastAuditDatStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1.5'),
  },

  conditionMainContainer: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  conditionLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    alignSelf: 'flex-start',
  },

  conditionStatusStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1.5'),
    alignSelf: 'flex-start',
  },

  cardDashLineMainContainer: {
    marginTop: hp('3'),
    alignContent: 'center',
    alignItems: 'center',
  },

  cardDashStyle: {
    width: wp('85'),
    height: hp('1'),
  },

  ABMMainContainer: {
    marginTop: hp('2'),
    flexDirection: 'row',
    marginLeft: wp('4'),
  },

  assetTypeColContainer: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  assetTypeLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  assetsTypeTextStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1.5'),
  },

  brandColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    // marginRight: wp('1'),
  },

  brandLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  brandsTypeTextStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1.5'),
    marginLeft: hp('-0.4'),
  },

  modelNoColContainer: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: wp('0'),
  },

  modelNoLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    alignSelf: 'flex-start',
  },

  modelNosNoStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1.5'),
    alignSelf: 'flex-start',
  },

  viewDetailsMainContainer: {
    marginTop: hp('4'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: wp('20'),
    // backgroundColor: 'red',
  },

  viewDetailsRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  viewDetailsLabelStyle: {
    color: '#3955CB',
    // fontWeight:'normal',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    alignSelf: 'flex-end',
  },

  viewDetailesArrowStyle: {
    tintColor: '#3955CB',
    height: hp('1.9'),
  },
});
