import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import Dash from 'react-native-dash';
import {FloatingAction} from 'react-native-floating-action';
import {TOTAL_SHOPS} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
import User from '../../utility/User';
const db = new Database();
var open;
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

export class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: '',
      active: false,
    };
  }
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
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  paymentfilterPopUp = () => {
    const {navigation} = this.props;
    this.setState({visible: true});
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{
            width: wp('100'),
            height: hp('70'),
            resizeMode: 'cover',
            justifyContent: 'center',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/*Total Shops  */}
            <View style={styles.totalOutstandingMainContainer}>
              <View style={styles.outstandinColContainer}>
                <Text style={styles.outstandinCountTextStyle}>23,00,000</Text>
                <Text style={styles.outstandinHeadingTextStyle}>
                  Total Outstanding ( In INR )
                </Text>
              </View>
              {/* Filter Icon */}
              <View style={styles.filterIconContainer}>
                <TouchableOpacity onPress={this.paymentfilterPopUp.bind(this)}>
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
                      height={hp('63')}
                      dialogStyle={{
                        marginTop: hp('45'),
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
                              fontSize: RFValue(13),
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
                                fontSize: RFValue(13),
                              }}>
                              CLEAR
                            </Text>
                            <Image
                              source={require('../../assets/Icons/filter_list_shop.png')}
                              style={{height: hp('4'), alignSelf: 'center'}}
                            />
                          </View>
                        </View>
                        {/* Recent */}
                        <View
                          style={{marginTop: hp('3.5'), marginLeft: wp('2')}}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: RFValue(13),
                            }}>
                            Recent
                          </Text>
                        </View>
                        {/* Month */}
                        <View
                          style={{
                            marginTop: hp('4'),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: wp('2'),
                          }}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: RFValue(13),
                            }}>
                            Month
                          </Text>
                          <View
                            style={{
                              backgroundColor: '#796A6A',
                              borderColor: '#796A6A',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('7'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              All
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={require('../../assets/Icons/left_arrow.png')}
                              style={{
                                marginLeft: wp('3'),
                                height: hp('4'),
                                alignSelf: 'center',
                              }}
                            />
                            <Text
                              style={{
                                color: '#ADA2A2',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(13),
                                alignSelf: 'center',
                                marginHorizontal: wp('6 '),
                              }}>
                              December
                            </Text>
                            <Image
                              source={require('../../assets/Icons/right_arrow_filterCal.png')}
                              style={{height: hp('4'), alignSelf: 'center'}}
                            />
                          </View>
                        </View>
                        {/* Year */}
                        <View
                          style={{
                            marginTop: hp('3'),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: wp('2'),
                          }}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: RFValue(13),
                            }}>
                            Year
                          </Text>
                          <View
                            style={{
                              backgroundColor: '#796A6A',
                              borderColor: '#796A6A',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('10'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              All
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={require('../../assets/Icons/left_arrow.png')}
                              style={{
                                marginLeft: wp('3'),
                                height: hp('4'),
                                alignSelf: 'center',
                              }}
                            />
                            <Text
                              style={{
                                color: '#ADA2A2',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(13),
                                alignSelf: 'center',
                                marginHorizontal: wp('10'),
                              }}>
                              2019
                            </Text>
                            <Image
                              source={require('../../assets/Icons/right_arrow_filterCal.png')}
                              style={{height: hp('4'), alignSelf: 'center'}}
                            />
                          </View>
                        </View>
                        {/* Amount */}
                        <View
                          style={{
                            marginTop: hp('3'),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: wp('2'),
                          }}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: RFValue(13),
                            }}>
                            Amount
                          </Text>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#796A6A',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('5'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#796A6A',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              High to Low
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
                              marginLeft: wp('2'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#796A6A',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              Low to High
                            </Text>
                          </View>
                        </View>
                        {/* Delivery */}
                        <View
                          style={{
                            marginTop: hp('3'),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: wp('2'),
                          }}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: RFValue(13),
                            }}>
                            Delivery
                          </Text>
                          <View
                            style={{
                              backgroundColor: '#796A6A',
                              borderColor: '#796A6A',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('5'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              All
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#0FB4AD',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('2'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#0FB4AD',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              In Progress
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#2FC36E',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('2'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#2FC36E',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              Delivered
                            </Text>
                          </View>
                        </View>
                        {/* Payment */}
                        <View
                          style={{
                            marginTop: hp('3'),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: wp('2'),
                          }}>
                          <Text
                            style={{
                              color: '#362828',
                              fontFamily: 'Proxima Nova',
                              fontSize: RFValue(13),
                            }}>
                            Payment
                          </Text>
                          <View
                            style={{
                              backgroundColor: '#796A6A',
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
                                color: '#FFFFFF',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              All
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#2FC36E',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('2'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#2FC36E',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              Paid
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#E23333',
                              borderWidth: wp('0.3'),
                              borderRadius: wp('5.5'),
                              height: hp('4.5'),
                              width: wp('23'),
                              flexDirection: 'column',
                              marginLeft: wp('2'),
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#E23333',
                                fontFamily: 'Proxima Nova',
                                fontWeight: 'bold',
                                fontSize: RFValue(12),
                                alignSelf: 'center',
                              }}>
                              Outstanding
                            </Text>
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

            <View style={styles.invoiceMainContainer}>
              {/* Header Background */}
              <View style={styles.invoiceHeaderBGContainer}>
                <View style={styles.invHeaderRowContainer}>
                  <View style={styles.invoiceLabelContainer}>
                    <Text style={styles.invoiceLabelTextStyle}>
                      INVOICE 102235
                    </Text>
                  </View>
                  <View style={styles.amtContainer}>
                    <Text style={styles.amtTextStyle}>40,000 INR</Text>
                  </View>
                </View>
              </View>
              {/* Below Header White Background */}
              <View style={styles.invoiceDetaileWhiteBG}>
                <View style={styles.invoiceDateRowContainer}>
                  <View style={styles.invoiceDateColContainer}>
                    <Text style={styles.invDateLabelStyle}>INVOICE DATE</Text>
                    <Text style={styles.invoiceDateDateStyle}>20 Dec 2020</Text>
                  </View>
                  <View style={styles.salesColContainer}>
                    <Text style={styles.salesLabelStyle}>SALESMAN</Text>
                    <Text style={styles.salesNameStyle}>Kumar Subramanyam</Text>
                  </View>
                </View>
                {/* Dash line */}
                <View style={styles.invDetDashContainer}>
                  <Dash
                    style={styles.invDetDashStyle}
                    dashLength={2}
                    dashColor="#E6DFDF"
                  />
                </View>

                {/* Delivery */}
                <View style={styles.paymentMainContainer}>
                  <View style={styles.paymentColContainer}>
                    <Text style={styles.paymentLabelStyle}>PAYMENT DATE</Text>
                  </View>
                </View>

                <View style={styles.paymentDateContainer}>
                  <View style={styles.paymentDateColContainer}>
                    {/* <View style={styles.statusPinkBG}>
                                    <Text style={styles.statusTextStyle}>
                                        In Progress
                                    </Text>
                                </View> */}
                    <Text style={styles.paymentDateStyle}>30 Dec 2019</Text>
                  </View>
                  <View style={styles.viewDetailsMainContainer}>
                    <TouchableOpacity>
                      <View style={styles.viewDetailesLabelContainer}>
                        <Text style={styles.viewDetaileTextStyle}>
                          View Details
                        </Text>
                      </View>
                      <View style={styles.viewDetailesArrowContainer}>
                        <Image
                          style={styles.viewDetailsArrowStyle}
                          source={require('../../assets/Icons/right_arrow_front.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

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
              User.FlagForNavigation = 'Payments';
              Actions.CreateNewOrderFirst();
              this.setState({
                active: !this.state.active,
              });
              // }
            }}
            onPressMain={() => {
              if (this.state.active == false) {
                this.setState({
                  active: !this.state.active,
                });
                //  BackHandler.addEventListener('hardwareBackPress', () => Actions.TabBar());
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
)(Payments);

const styles = StyleSheet.create({
  totalOutstandingMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  outstandinColContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  outstandinCountTextStyle: {
    color: '#E23333',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('15'),
    fontFamily: 'Proxima Nova',
  },

  outstandinHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('5'),
    fontFamily: 'Proxima Nova',
  },

  filterIconContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    // marginTop:hp('1'),
  },

  filterIconStyle: {
    justifyContent: 'center',
    height: hp('4'),
    width: wp('8'),
    marginRight: wp('5'),
    alignSelf: 'center',
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

  invoiceMainContainer: {
    marginTop: hp('3'),
  },

  invoiceHeaderBGContainer: {
    backgroundColor: '#796A6A',
    height: hp('8'),
    width: wp('90'),
    borderTopLeftRadius: wp('2'),
    borderTopRightRadius: wp('2'),
    marginTop: hp('-1'),
    alignSelf: 'center',
    justifyContent: 'center',
  },

  invHeaderRowContainer: {
    flexDirection: 'row',
  },

  invoiceLabelContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  invoiceLabelTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginLeft: wp('4'),
  },

  amtContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  amtTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginRight: wp('4'),
  },

  invoiceDetaileWhiteBG: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderColor: '#E6DFDF',
    alignSelf: 'center',
    borderBottomLeftRadius: wp('2'),
    borderBottomRightRadius: wp('2'),
    height: hp('24'),
    width: wp('90'),
    borderWidth: hp('0.2'),
    borderTopWidth: hp('0'),
  },

  invoiceDateRowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  invoiceDateColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('4'),
  },

  invDateLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  invoiceDateDateStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1'),
  },

  salesColContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('2'),
  },

  salesLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  salesNameStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1'),
  },

  invDetDashContainer: {
    // flex:1,
    marginTop: hp('1'),
    alignContent: 'center',
    alignItems: 'center',
  },

  invDetDashStyle: {
    width: wp('85'),
    height: hp('1'),
  },

  paymentMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  paymentColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('4'),
  },

  paymentLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
  },

  paymentDateContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('-4'),
  },

  paymentDateColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('4'),
  },

  paymentDateStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('0.5'),
  },

  viewDetailsMainContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  viewDetailesLabelContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  viewDetaileTextStyle: {
    color: '#3955CB',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginRight: wp('9'),
    marginTop: hp('0.5'),
  },

  viewDetailesArrowContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: hp('0'),
    marginRight: wp('4'),
  },

  viewDetailsArrowStyle: {
    tintColor: '#3955CB',
    height: hp('3.5'),
    width: wp('3.5'),
  },
});
