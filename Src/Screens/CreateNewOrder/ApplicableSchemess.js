import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import {Button} from 'react-native';
import {connect} from 'react-redux';

import Database from './../../utility/Database';

const db = new Database();
import moment from 'moment';

export class ApplicableSchemess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reopen: true,
      InProcessOrder: [],
      DeliveredOrder: [],
      Shop_det: [],
      total_data: [],
      isRefreshing: false,
      // TotalOrder:[],
      TotalOrder: [
        {
          id: 1,
          total_amount: 1000,
          check_date: 15,
        },
        {
          id: 2,
          total_amount: 2000,
          check_date: 16,
        },
        {
          id: 3,
          total_amount: 3000,
          check_date: 17,
        },
      ],

      TotalOrderLen: 0,
      InProcessOrderLen: 0,
      DeliveredOrderLen: 0,
      name: '',
      active: false,
      JSONObj: {},
    };

    ////
  }

  static navigationOptions = {
    title: 'Applicable Schemes',
    headerStyle: {backgroundColor: '#796A6A'},
    headerTintColor: '#ffffff',
  };
  componentWillMount() {
    // this.setState({reopen:false});
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // console.log("component will mount called");
    // setTimeout(() => {
    //     // this.setState({
    //     //   loading: false,
    //     // })
    //     this._componentFocused();
    //    }, 1000)
    // this._componentFocused();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused,
    );
  }
  _refresh() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  _componentFocused = () => {
    console.log('u are entering focused');
    this.setState({Shop_det: []});
    AsyncStorage.getItem('username').then(keyValue => {
      this.setState({name: JSON.parse(keyValue)});
    });
    db.getAllOrders().then(data => {
      console.log('getTotalOrderFromDB', JSON.stringify(data));
      this.setState({Shop_det: data});
      console.log('TotalOrder', this.state.Shop_det);
      this.state.TotalOrderLen = data.length;
      this.setState({TotalOrderLen: data.length});
      this.props.orderTotal(this.state.TotalOrderLen);
      // data.map((item, i) => {
      //     db.getCustomerShopName(item.entity_id,item.id).then((data1)=>{
      //         console.log("side order shop-details",data1);
      //         this.state.Shop_det.push(data1);
      //         console.log("shop data final",this.state.Shop_det);
      //       //  User.orderidvar=data[0].id;

      //         })
      // })
      // for(var i=0;i<data.length;i++){
      //    console.log("you have entered in for loop");
      //    console.log("entity_type in for loop",data[i].entity_type);

      //     if(data[i].entity_type==1)
      //    // &&( this.state.Shop_det.entity_id==!data[i].entity_id ||this.state.Shop_det==[])
      //     {
      //         console.log("successfull if");
      //         db.getCustomerShopName(data[i].entity_id,data[i].id).then((data)=>{
      //         console.log("side order shop-details",data);
      //         this.state.Shop_det.push(data);
      //         console.log("shop data final",this.state.Shop_det);
      //         User.orderidvar=data[0].id;

      //         })
      //     }
      //     else if(data[i].entity_type==2)
      //     {

      //     }

      // }
    });
  };

  _renderViewForFlatlist() {
    console.log('here in flatlist');
    if (this.state.Shop_det.length > 0) {
      return this.state.Shop_det.map((item, i) => {
        return (
          <View style={styles.orderDetailsMainContainer}>
            {/* Header Background */}

            <View style={styles.orderHeaderBGContainer}>
              <View style={styles.ordHeaderRowContainer}>
                <View style={styles.orderLabelContainer}>
                  <Text style={styles.orderLabelTextStyle}>{item.Party}</Text>
                </View>
                <View style={styles.amtContainer}>
                  <Text style={styles.amtTextStyle}>{item.AREA}</Text>
                </View>
              </View>
            </View>
            {/* Below Header White Background */}
            <View style={styles.oredrDetaileWhiteBG}>
              <View style={styles.orderDateRowContainer}>
                <View style={styles.orderDateColContainer}>
                  <Text style={styles.ordDateLabelStyle}>ORDER DATE</Text>
                  <Text style={styles.orderDateDateStyle}>
                    {moment(item.Current_date_time).format('DD-MMM-YYYY')}
                  </Text>
                </View>
                <View style={styles.salesColContainer}>
                  <Text style={styles.salesLabelStyle}>ORDER ID</Text>
                  {/* {this.renderName(item.user_id)} */}
                  <Text style={styles.salesNameStyle}>{item.id}</Text>
                </View>
                <View style={styles.salesColContainer1}>
                  <Text style={styles.salesLabelStyle}>AMOUNT</Text>
                  {/* {this.renderName(item.user_id)} */}
                  <Text style={styles.salesNameStyle}>{item.total_amount}</Text>
                </View>
              </View>
              {/* Dash line */}
              <View style={styles.ordDetDashContainer}>
                <Dash
                  style={styles.ordDetDashStyle}
                  dashLength={2}
                  dashColor="#E6DFDF"
                />
              </View>
              {/* {this._renderView(item)} */}
            </View>
          </View>
        );
      });
    } else {
      return <View />;
    }
  }
  render() {
    return (
      <View style={{flex: 10}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Store Name and Right Arrow */}
          <View style={{flex: 0.1, marginTop: hp('1')}}>
            <View style={styles.brandNameContainer}>
              <View style={styles.brandTextContainer}>
                <Text style={styles.brandNameText}>BRAND NAME</Text>
              </View>

              <View style={styles.rightArrowContainer}>
                <TouchableOpacity>
                  <Image
                    style={{marginRight: wp('4')}}
                    source={require('../../assets/Icons/right_arrow_front.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Dash Line Below Brand Name*/}
          <View style={styles.dashLineContainerBelowBrandName}>
            <Dash
              style={styles.dashLineStyle}
              dashLength={2}
              dashColor="#ADA2A2"
            />
          </View>

          {/* Applicable Schemes */}
          <View style={{flex: 1, marginVertical: wp('4')}}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View style={styles.roundedtext} />

              <Text
                style={{
                  marginLeft: wp('2'),
                  fontFamily: 'Proxima Nova',
                  fontSize: wp('3'),
                  color: '#3955CB',
                }}>
                Applicable Schemes( 15 )
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginVertical: hp('-3'),
              }}>
              <TouchableOpacity>
                {/* onPress={() =>
                  this.props.navigation.navigate('ApplicableSchemess')
                } */}
                <Image
                  style={{marginRight: wp('5'), tintColor: '#3955CB'}}
                  source={require('../../assets/Icons/right_arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* //////////////////////listview */}
          {this._renderViewForFlatlist()}

          {/* Scheme Description */}
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginVertical: hp('10'),
              marginLeft: wp('5'),
              marginRight: wp('3'),
            }}>
            <Text
              style={{
                color: '#796A6A',
                fontSize: wp('3%'),
                fontFamily: 'Proxima Nova',
              }}>
              Dummy Scheme Description.Dummy Scheme Description. Dummy Scheme
              Description.Dummy Scheme Description. Dummy Scheme
              Description......
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginVertical: hp('4'),
              marginHorizontal: wp('5'),
            }}>
            <Text
              style={{
                color: '#362828',
                fontSize: wp('3.5%'),
                fontFamily: 'Proxima Nova',
                fontWeight: 'bold',
              }}>
              Validity
            </Text>
            <Text
              style={{
                color: '#796A6A',
                fontSize: wp('3%'),
                fontFamily: 'Proxima Nova',
                marginTop: hp('1'),
              }}>
              12 Feb 2020
            </Text>
          </View>
        </ScrollView>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity>
            <View style={styles.buttonOk}>
              <Text style={styles.buttonTextOk}> OK </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('CreateNewOrderPreview')
            }>
            <View style={styles.buttonCancel}>
              <Text style={styles.buttonTextCancel}> CANCEL </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicableSchemess);

const styles = StyleSheet.create({
  totalShopsMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  processColContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  inProcessCountTextStyle: {
    color: '#221818',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('12'),
    fontFamily: 'Proxima Nova',
  },

  inProcessHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('5'),
    fontFamily: 'Proxima Nova',
  },

  deliveredColContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  deliveredCountTextStyle: {
    color: '#221818',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp('7'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  deliveredHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('2'),
    fontFamily: 'Proxima Nova',
  },

  totalCountMainContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  totalCountTextStyle: {
    color: '#221818',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: wp('13'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  totalCountHeadingTextStyle: {
    color: '#8C7878',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginRight: wp('11'),
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
    marginTop: hp('1'),
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

  orderDetailsMainContainer: {
    marginTop: hp('3'),
  },

  orderHeaderBGContainer: {
    backgroundColor: '#796A6A',
    height: hp('8'),
    width: wp('90'),
    borderTopLeftRadius: wp('2'),
    borderTopRightRadius: wp('2'),
    marginTop: hp('-1'),
    alignSelf: 'center',
    justifyContent: 'center',
  },

  ordHeaderRowContainer: {
    flexDirection: 'row',
  },

  orderLabelContainer: {
    flex: 2.5,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  orderLabelTextStyle: {
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
    justifyContent: 'center',
  },

  amtTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    marginRight: wp('4'),
  },

  oredrDetaileWhiteBG: {
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

  orderDateRowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  orderDateColContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('4'),
  },

  ordDateLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },

  orderDateDateStyle: {
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
  salesColContainer1: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('2'),
  },

  salesLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },

  salesNameStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    marginTop: hp('1'),
  },

  ordDetDashContainer: {
    // flex:1,
    marginTop: hp('-5'),
    alignContent: 'center',
    alignItems: 'center',
  },

  ordDetDashStyle: {
    width: wp('85'),
    height: hp('1'),
  },

  deliveryMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  deliveryColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('4'),
  },

  deliveryLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },

  deliveryStatusContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: hp('-2'),
  },

  deliverySeparateContainer: {
    flexDirection: 'row',
    marginTop: hp('3'),
  },

  deliveryStusMainContainer: {
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  deliveryStatusColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('4'),
  },

  statusPinkBG: {
    backgroundColor: '#0FB4AD',
    justifyContent: 'center',
    marginRight: hp('3'),
    borderColor: '#CC1167',
    height: hp('4'),
    width: wp('22'),
    borderRadius: wp('5'),
  },

  statusTextStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    fontWeight: 'bold',
    padding: 10,
  },

  deliveredDateStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
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
  brandNameContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  brandTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  rightArrowContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  brandNameText: {
    color: '#796A6A',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    marginTop: hp('3%'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova',
  },

  rightArrowContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: hp('3%'),
    marginRight: wp('3'),
  },

  dashLineContainerBelowBrandName: {
    flex: 1,
    marginTop: hp('3'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('89'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  roundedtext: {
    width: 25,
    height: 25,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 / 2,
    backgroundColor: '#EAA304',
    borderColor: '#EAA304',
    borderWidth: 3,
    marginLeft: wp('5'),
  },

  buttonOk: {
    width: wp('44'),
    height: hp('8'),
    backgroundColor: '#46BE50',
    marginVertical: hp('3'),
    paddingVertical: hp('2'),
    borderRadius: 8,
    marginHorizontal: wp('3'),
  },

  buttonTextOk: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },

  buttonCancel: {
    width: wp('43'),
    height: hp('8'),
    backgroundColor: '#FFFFFF',
    marginVertical: hp('3'),
    paddingVertical: hp('2'),
    borderRadius: 8,
    borderColor: '#796A6A',
    borderWidth: wp('0.3'),
    marginHorizontal: wp('3'),
  },

  buttonTextCancel: {
    fontSize: 14,
    color: '#796A6A',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },
});
