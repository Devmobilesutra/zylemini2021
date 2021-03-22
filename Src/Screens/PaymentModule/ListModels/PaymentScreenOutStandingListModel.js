import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Dash from 'react-native-dash';
import Card from '../Components/Card';
import Dimen from '../utils/Dimen';
import Colors from '../utils/Colors';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//let addition = 0;

export default function PaymentScreenOutStandingListModel(props) {
  let item = props.item.item;

  // addition = addition + parseInt(item.total_amount);
  // console.log('ADDITION:: ', addition);

  return (
    //   <Card>
    //     <View style={styles.MainConatiner}>
    //       <View style={styles.HeadingConatiner}>
    //         <Text
    //           style={{
    //             marginLeft: 15,
    //             fontWeight: 'bold',
    //             color: Colors.White,
    //             textTransform: 'uppercase',
    //             maxWidth: 210,
    //             //fontSize: Dimen.FontSizeSmall,
    //             fontFamily: 'Proxima Nova',
    //           }}>
    //           {item.Party}
    //         </Text>
    //         <Text style={styles.AreaTextStyle}>{item.AREA}</Text>
    //       </View>
    //       <View style={styles.SubHeaadingContainer}>
    //         <View>
    //           <Text style={styles.SubHeadingStyle}>ORDER DATE</Text>
    //           <Text style={styles.Text2Style}>
    //             {moment(item.Current_date_time).format('DD-MMM-YYYY')}
    //           </Text>
    //         </View>
    //         <View style={styles.OrderAndAmountContainer}>
    //           <Text style={styles.SubHeadingStyle}>ORDER ID</Text>
    //           <Text style={styles.Text2Style}>{item.id}</Text>
    //         </View>
    //         <View style={{marginLeft: 50}}>
    //           <Text style={styles.SubHeadingStyle}>AMOUNT</Text>
    //           <Text style={styles.Text2Style}>{item.total_amount}</Text>
    //         </View>
    //       </View>

    //       <Dash dashLength={2} dashColor="#ADA2A2" />
    //       <View style={styles.LastRowContainer}>
    //         <View>
    //           <Text
    //             style={{
    //               //fontWeight: 'bold',
    //               fontSize: 12,
    //               fontFamily: 'Proxima Nova',
    //             }}>
    //             DELIVERY
    //           </Text>
    //           <TouchableOpacity style={styles.InProgressButtonContainer}>
    //             <Text
    //               style={{
    //                 fontSize: 12,
    //                 color: Colors.White,
    //                 //fontWeight: 'bold',
    //                 fontFamily: 'Proxima Nova',
    //               }}>
    //               In Progress
    //             </Text>
    //           </TouchableOpacity>
    //         </View>

    //         <View>
    //           <TouchableWithoutFeedback
    //             onPress={() => {
    //               props.OnPressViewDetail();
    //             }}>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 alignItems: 'center',
    //                 marginTop: 20,
    //               }}>
    //               <Text
    //                 style={{
    //                   fontSize: Dimen.FontSizeSmall,
    //                   color: Colors.BluButtonColor,
    //                   //fontWeight: 'bold',
    //                   fontFamily: 'Proxima Nova',
    //                 }}>
    //                 View Details
    //               </Text>
    //               <Image
    //                 style={{height: 25, width: 25}}
    //                 source={require('../Assets/Images/right_arrow.png')}
    //               />
    //             </View>
    //           </TouchableWithoutFeedback>
    //         </View>
    //       </View>
    //     </View>
    //   </Card>
    /////////////////////////////////////////////////////////////////
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
        <View style={styles.deliveryStatusContainer}>
          <View style={styles.deliverySeparateContainer}>
            <View style={styles.deliveryColContainer}>
              <Text style={styles.deliveryLabelStyle}>DELIVERY</Text>
            </View>
          </View>

          <View style={styles.deliveryStusMainContainer}>
            <View style={styles.deliveryStatusColContainer}>
              <View style={styles.statusPinkBG}>
                <Text style={styles.statusTextStyle}>In Progress</Text>
              </View>
            </View>
            <View style={styles.viewDetailsMainContainer}>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.viewDetailesLabelContainer}>
                  <Text style={styles.viewDetaileTextStyle}>View Details</Text>
                </View>
                <View style={styles.viewDetailesArrowContainer}>
                  <Image
                    style={styles.viewDetailsArrowStyle}
                    source={require('../../../assets/Icons/right_arrow_front.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // MainConatiner: {
  //   borderRadius: 5,
  //   height: 210,
  //   overflow: 'hidden',
  // },
  // HeadingConatiner: {
  //   height: 60,
  //   backgroundColor: Colors.TexthintColor2,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // AreaTextStyle: {
  //   marginRight: 15,
  //   fontSize: Dimen.FontSizeSmall,
  //   fontWeight: 'bold',
  //   color: Colors.White,
  //   maxWidth: 100,
  //   //backgroundColor: 'green',
  // },
  // OrderAndAmountContainer: {marginLeft: 30},
  // SubHeadingStyle: {
  //   color: Colors.Black,
  //   //fontWeight: 'bold',
  //   fontSize: Dimen.FontSizeSmall,
  //   fontFamily: 'Proxima Nova',
  // },
  // Text2Style: {
  //   marginTop: 5,
  //   fontFamily: 'Proxima Nova',
  //   color: Colors.TextColor2,
  //   fontSize: Dimen.FontSizeSmall,
  // },
  // Line: {
  //   borderWidth: 0.5,
  //   borderColor: Colors.TexthintColor2,
  //   marginLeft: 5,
  //   marginRight: 5,
  // },
  // SubHeaadingContainer: {
  //   flexDirection: 'row',
  //   margin: 10,
  // },
  // LastRowContainer: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   flex: 1,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   justifyContent: 'space-between',
  // },
  // InProgressButtonContainer: {
  //   height: 30,
  //   width: 90,
  //   marginTop: 10,
  //   backgroundColor: Colors.ButtonColor,
  //   borderRadius: 15,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  ////////////////////////////////////////////////////////////////////

  processColContainer: {
    flex: 0.3,
    flexDirection: 'row',
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
  surveysTakenCountStyle: {
    color: '#221818',
    fontSize: 20,
    marginLeft: wp('3'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
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
    //fontFamily:'Proxima Nova',
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
