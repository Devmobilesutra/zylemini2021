import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import Dash from 'react-native-dash';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import {SERVEY_INFO} from '../../Redux/actions/ServeyAction';

import {connect} from 'react-redux';
import Database from './../../utility/Database';
import {Button} from 'react-native-paper';
const db = new Database();

export default class MyReport extends React.Component {
  render() {
    return (
      <View style={{marginLeft: 20, marginRight: 10}}>
        <Text
          style={{
            color: 'grey',
            fontSize: wp('3%'),
            fontWeight: 'bold',
            marginTop: hp('2%'),
            // marginLeft: wp('3%'),
            type: 'font-awesome',
          }}>
          REPORTS
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.SalesDetaileWhiteBG}
              onPress={() => Actions.TargetVsAchevementTeamGraph()}>
              <View style={styles.targetMainContainer}>
                <View style={styles.targetinnerContainer}>
                  <View style={styles.targetimageContainer1}>
                    <ImageBackground
                      style={styles.targetimageStyles1}
                      source={require('../../assets/Icons/Reports.png')}
                    />
                  </View>
                  <View style={{flex: 4}}>
                    <Text style={styles.targettextStyle1}>
                      Target Vs Achivements
                    </Text>
                  </View>
                </View>
                <View style={styles.targetColContainer1}>
                  <Text style={styles.targetLabelStyle1}>monthly</Text>
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
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: hp('3'),
                    marginTop: hp('2'),
                  }}>
                  <Text style={styles.TargetLabelStyle11}>Current Rate</Text>
                  <Text style={styles.TargetLabelStyle12}>8.1</Text>
                  <Text style={styles.TargetLabelStyle13}>Boxes Per day</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: hp('2'),
                  }}>
                  <Text style={styles.TargetLabelStyle11}>Required Rate</Text>
                  <Text style={styles.TargetLabelStyle12}>8</Text>
                  <Text style={styles.TargetLabelStyle13}>Boxes Per day</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: hp('2'),
                  }}>
                  <Text style={styles.TargetLabelStyle11}>Target Achieved</Text>
                  <Text style={styles.TargetLabelStyle12}>+ 85%</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* ///////////////////////////////////////////////// */}

            <TouchableOpacity
              style={styles.SalesDetaileWhiteBG}
              onPress={() => Actions.TargetVsAchevementTeamGraph()}>
              <View style={styles.targetMainContainer}>
                <View style={styles.targetinnerContainer}>
                  <View style={styles.targetimageContainer1}>
                    <ImageBackground
                      style={styles.targetimageStyles1}
                      source={require('../../assets/Icons/Reports.png')}
                    />
                  </View>
                  <View style={{flex: 4}}>
                    <Text style={styles.targettextStyle1}>
                      Target Vs Achivements
                    </Text>
                  </View>
                </View>
                <View style={styles.targetColContainer1}>
                  <Text style={styles.targetLabelStyle1}>monthly</Text>
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
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginLeft: hp('3'),
                    marginTop: hp('2'),
                  }}>
                  <Text style={styles.TargetLabelStyle11}>Current Rate</Text>
                  <Text style={styles.TargetLabelStyle12}>8.1</Text>
                  <Text style={styles.TargetLabelStyle13}>Boxes Per day</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: hp('2'),
                  }}>
                  <Text style={styles.TargetLabelStyle11}>Required Rate</Text>
                  <Text style={styles.TargetLabelStyle12}>8</Text>
                  <Text style={styles.TargetLabelStyle13}>Boxes Per day</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: hp('2'),
                  }}>
                  <Text style={styles.TargetLabelStyle11}>Target Achieved</Text>
                  <Text style={styles.TargetLabelStyle12}>+ 85%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  surveyTakenAvilableMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
    justifyContent: 'flex-start',
  },

  surveyTakenRowContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: wp('-12'),
  },

  surveysTakenLabelStyle: {
    color: '#362828',
    fontSize: RFValue(12),
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },
  pastSurveysCardContainer: {
    marginTop: hp('0'),
  },

  pastSurveysCardBG: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderWidth: wp('0.3'),
    borderRadius: wp('1.5'),
    height: hp('10'),
    width: wp('90'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5'),
  },

  pastSurveyimageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  pastSurveyimageStyles: {
    marginLeft: wp('2'),
    height: hp('5'),
    width: wp('10'),
    tintColor: '#796A6A',
  },

  pastSurveyContainer: {
    flex: 5,
    marginTop: hp('-2.8'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  pastSurveyNameTextStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //  fontSize: RFValue(17),
    marginTop: hp('2'),
    fontSize: 16,
  },

  cardDashLineMainContainer: {
    flex: 4,
    marginTop: hp('3.5'),
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    // fontSize: RFValue('13'),
    marginRight: wp('9'),
    marginTop: hp('0.8'),
    fontWeight: 'bold',
    fontSize: 12,
  },

  viewDetailesArrowContainer: {
    alignItems: 'flex-end',
    marginRight: wp('3'),
    marginBottom: hp('3.5'),
  },

  viewDetailsArrowStyle: {
    tintColor: '#3955CB',
    height: hp('4'),
    width: wp('4'),
  },
  //////////////////////////////////////////////
  SalesDetaileWhiteBG: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderColor: '#E6DFDF',
    alignSelf: 'center',
    borderRadius: wp('1.5'),
    height: hp('24'),
    width: wp('90'),
    borderWidth: wp('0.3'),
    alignItems: 'center',
    marginTop: hp('2'),
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 20,
  },
  SalesDetaileWhiteBGdata: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderColor: '#E6DFDF',
    alignSelf: 'center',
    borderRadius: wp('1.5'),
    height: hp('20'),
    width: wp('90'),
    //  height: 132,
    //  width: wp('90'),
    borderWidth: wp('0.3'),
    alignItems: 'center',
    marginTop: hp('2'),
    justifyContent: 'center',
    alignContent: 'center',
  },

  SalesDateRowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  SalesrowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp('1'),
  },

  invDateLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
  },

  SalestextStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //   fontSize: RFValue(17),
    marginTop: hp('1'),
    fontSize: 16,
    marginLeft: hp('-3'),
  },

  salesColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: wp('5'),
    marginTop: hp('1'),
  },

  salesLabelStyle: {
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //  fontSize: RFValue(12),
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#F8F4F4',
    marginRight: wp('3'),
    fontSize: 10,
  },

  salesNameStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
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

  TotalSaleMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  TotalSaleColContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp('5'),
  },

  TotalSaleLabelStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //    fontSize: RFValue(12),
    fontSize: 10,
  },

  TotalSaleMainAmount: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('-4'),
  },

  TotalSaleScondAmount: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('5'),
  },

  TotalSaleAmount: {
    color: 'black',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(17),
    marginTop: hp('0.5'),
    fontWeight: 'bold',
  },
  myButton: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'grey',
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
  },

  TotalChangeMainContainer: {
    flex: 1.1,
    flexDirection: 'column',
    marginLeft: wp('20'),
    marginTop: hp('-3'),
  },

  TotalChangeLabelContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: wp('5'),
  },

  TotalChangeTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    //   fontSize: RFValue('13'),
    fontWeight: 'bold',
    fontSize: 10,
  },

  TotalChangeArrowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp('3.5'),
    marginLeft: hp('-1'),
  },

  TotalChangeArrowStyle: {
    tintColor: 'green',
    height: hp('4'),
    width: wp('5'),
  },
  ///////////////////////////////////////////performace

  pastSurveyimageContainer1: {
    flex: 1,
    alignItems: 'flex-start',
  },

  pastSurveyimageStyles1: {
    marginLeft: wp('1'),
    height: hp('5'),
    marginTop: hp('2'),
    width: wp('10'),
    tintColor: '#796A6A',
  },

  pastSurveyContainer1: {
    flex: 6,
    marginTop: hp('-2.8'),
    alignItems: 'center',
    marginLeft: hp('-1'),
    justifyContent: 'flex-start',
  },

  TriangleShapeCSS: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 18,
    borderStyle: 'solid',
    marginTop: hp('0.2'),
    marginLeft: hp('1'),
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2FC36E',
  },

  pastSurveyNameTextStyle1: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    //   marginLeft:hp('-1'),
    marginTop: hp('2'),
    fontSize: 16,
  },

  cardDashLineMainContainer1: {
    flex: 4,
    marginTop: hp('3.5'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewDetailsMainContainer1: {
    flex: 1,
    flexDirection: 'column',
  },

  viewDetailesLabelContainer1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ////////////////////target css
  targetMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
    marginLeft: wp('2'),
  },

  targetinnerContainer: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp('1'),
  },
  targetimageContainer1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  targetimageStyles1: {
    marginLeft: wp('1'),
    height: hp('5'),
    width: wp('10'),
  },

  invDateLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
  },

  targettextStyle1: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 13,
    marginTop: hp('1'),
    marginRight: wp('4.5'),
    alignItems: 'flex-start',
    marginLeft: hp('0.3'),
  },

  targetColContainer1: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: wp('4'),
    marginTop: hp('1'),
  },

  targetLabelStyle1: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#F8F4F4',
    marginRight: wp('3'),
  },

  targetNameStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
    marginTop: hp('1'),
  },

  targetbelowMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  TargetLabelStyle11: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },
  TargetLabelStyle12: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 18,
  },
  TargetLabelStyle13: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },

  TotalSaleMainAmount: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('-4'),
  },

  TotalSaleScondAmount: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('5'),
  },

  TotalSaleAmount: {
    color: 'black',
    fontFamily: 'Proxima Nova',
    //  fontSize: RFValue(17),
    marginTop: hp('0.5'),
    fontWeight: 'bold',
    fontSize: 18,
    color: '#362828',
  },
  myButton: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: 'grey',
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
  },
  /////////////////////////////data upload

  DuMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  DuinnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp('1'),
  },
  DuimageContainer1: {
    flex: 1,
    alignItems: 'flex-start',
  },
  DuimageStyles1: {
    marginLeft: wp('2'),
    height: hp('5'),
    width: wp('10'),
  },

  DutextStyle1: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    marginTop: hp('1'),
    alignItems: 'flex-start',
  },

  DuColContainer1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: wp('2'),
    marginTop: hp('1'),
  },

  DuLabelStyle1: {
    color: 'grey',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#F5F5F5',
    marginRight: wp('3'),
  },

  DuNameStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
    marginTop: hp('1'),
  },
  DubelowMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

  DuColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('5'),
  },
});
