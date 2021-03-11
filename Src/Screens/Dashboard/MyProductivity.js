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
const db = new Database();

const list = [
  {
    surveyname: 'Survey Name',
    company: 'Company / Brand Name',
    date: '22 Dec 2019',
    time: '3.30 PM',
  },
  {
    surveyname: 'Survey Name',
    company: 'Company / Brand Name',
    date: '22 Dec 2019',
    time: '3.30 PM',
  },
  {
    surveyname: 'Survey Name',
    company: 'Company / Brand Name',
    date: '22 Dec 2019',
    time: '3.30 PM',
  },
];

class MyProductivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      AvailableSurve: '',
      userLatitude: '',
      userLongitude: '',
      hasMapPermission: '',
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
    this.setState({hasMapPermission: true});
    // this.locationWatchId = Geolocation.getCurrentPosition(
    Geolocation.getCurrentPosition(pos => {
      //  alert(pos.coords.latitude)
      this.setState({
        userLatitude: pos.coords.latitude,
        userLongitude: pos.coords.longitude,
      });
      //console.log(this.state.userLatitude)
    });
  }

  TakeServeyPage(item) {
    this.getUserPosition();
    this.props.serveyInfos(
      item.SurveyName,
      item.CompanyName,
      item.PublishedDate,
      item.TimeRequired,
      item.SurveyURL,
    );

    Actions.DetailViewSurveyBrowser({serveyUrl: item.SurveyURL});
  }
  componentWillMount() {
    db.getAvailableServey().then(data => {
      //console.log("aaaaaaaaa=="+JSON.stringify(data))
      this.setState({list: data});
      this.setState({AvailableSurve: data.length});
    });
  }

  render() {
    return (
      <View style={{}}>
        <View style={{flex: 0.1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: wp('3%'),
                  fontWeight: 'bold',
                  marginTop: hp('3%'),
                  marginLeft: wp('3%'),
                  type: 'font-awesome',
                }}>
                MY PRODUCTIVITY
              </Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              <Text
                style={{
                  color: '#53b06d',
                  fontSize: wp('8%'),
                  fontWeight: 'bold',
                  marginTop: hp('1%'),
                  marginLeft: wp('7%'),
                  type: 'font-awesome',
                }}>
                78%
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: wp('3%'),
                  marginTop: hp('5%'),
                  type: 'font-awesome',
                  alignContent: 'flex-end',
                }}>
                As On 30 NOV 2019
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 0.1}}>
          {/* middle gray line */}
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#d9dbda',
              height: hp('0.3 %'),
              width: wp('100%'),
              marginTop: hp('1%'),
            }}
          />
        </View>

        {/* ///////////////////////////// */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/*No of Surveys */}
          {/* <View style={styles.surveyTakenAvilableMainContainer}>
                            <View style={styles.surveyTakenRowContainer}>
                                <Text style={styles.surveysTakenLabelStyle}>
                                    Available Survey
                    </Text>
                                <Text style={styles.surveysTakenCountStyle}>
                                    {this.state.AvailableSurve}
                                </Text>
                            </View>
                            <View style={styles.filterIconContainer}>
                                <Image source={require('../../assets/Icons/filter_list_shop.png')}
                                    style={styles.filterIconStyle}>
                                </Image>
                            </View>
                        </View> */}

          {/* Dash Line */}
          {/* <View style={styles.dashLineContainer}>
                            <Dash style={styles.dashLineStyle}
                                dashLength={2}
                                dashColor='#ADA2A2'
                            />
                        </View> */}

          {/* History Card */}
          <View style={styles.pastSurveysCardContainer}>
            {this.state.list.map((item, index) => (
              <View style={styles.pastSurveysCardBG}>
                <View style={styles.pastSurveyimageContainer}>
                  {/* <View style={{}}> */}
                  <ImageBackground
                    style={styles.pastSurveyimageStyles}
                    source={require('../../assets/Icons/SurveyCard.png')}>
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: RFValue(25),
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                        marginTop: hp('2'),
                      }}>
                      {item.SurveyName[0]}
                    </Text>
                  </ImageBackground>
                  {/* </View> */}
                </View>
                <View style={styles.pastSurveyContainer}>
                  <Text style={styles.pastSurveyNameTextStyle}>
                    {item.SurveyName}
                  </Text>
                  <Text style={styles.companyNameTextStyle}>
                    {item.CompanyName}
                  </Text>
                  <Text style={styles.dateTimeTextStyle}>
                    {item.PublishedDate}
                  </Text>
                  <View style={styles.cardDashLineMainContainer}>
                    <Dash
                      style={styles.cardDashStyle}
                      dashLength={2}
                      dashColor="#E6DFDF"
                    />
                  </View>
                  <View style={styles.buttonMainContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        this.TakeServeyPage(item);
                      }}>
                      <View style={styles.buttonBGStyle}>
                        <Text style={styles.buttonTextStyle}>TAKE SURVEY</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={{marginTop: hp('15')}} />
        </ScrollView>
        <View style={{flex: 0.1}}>
          {/* middle gray line */}
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#d9dbda',
              height: hp('0.3 %'),
              width: wp('100%'),
              marginTop: hp('4%'),
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    servey: state.servey,
    login: state.login,
  };
};
const mapDispatchToProps = dispatch => ({
  serveyInfos: (
    SurveyName,
    CompanyName,
    PublishedDate,
    TimeRequired,
    SurveyURL,
  ) => {
    dispatch(
      SERVEY_INFO(
        SurveyName,
        CompanyName,
        PublishedDate,
        TimeRequired,
        SurveyURL,
      ),
    );
  },
});
export default MyProductivity;
const styles = StyleSheet.create({
  surveyTakenAvilableMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
    justifyContent: 'center',
  },

  surveyTakenRowContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: wp('-2'),
  },

  surveysTakenLabelStyle: {
    color: '#221818',
    fontSize: RFValue(13),
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
  },

  surveysTakenCountStyle: {
    color: '#221818',
    fontSize: RFValue(20),
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('5'),
  },

  filterIconContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: hp('1'),
    justifyContent: 'center',
  },

  filterIconStyle: {
    justifyContent: 'center',
    height: hp('5'),
    width: wp('6'),
    marginRight: wp('5'),
    // marginTop: hp('1'),
  },

  dashLineContainer: {
    flex: 1,
    marginTop: hp('2'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('100'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  pastSurveysCardContainer: {
    marginTop: hp('2'),
    flexDirection: 'row',
  },

  pastSurveysCardBG: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderWidth: wp('0.3'),
    borderRadius: wp('1.5'),
    height: hp('30'),
    width: wp('90'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5'),
    marginLeft: 10,
    marginRight: 10,
  },

  pastSurveyimageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  pastSurveyimageStyles: {
    marginLeft: wp('5'),
    height: hp('9'),
    width: wp('16'),
  },

  pastSurveyContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: hp('-1'),
    marginLeft: wp('7'),
  },

  pastSurveyNameTextStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(17),
    marginTop: hp('3'),
  },

  companyNameTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(10),
    marginTop: wp('2.5'),
  },

  dateTimeTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(10),
    marginTop: wp('2.5'),
  },
  surveyTakenAvilableMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
    justifyContent: 'center',
  },

  noOfSurveysColContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: wp('3'),
  },

  noOfSurveysLabelStyle: {
    color: '#221818',
    fontSize: RFValue(13),
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
  },

  noOfSurveysCountContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('6'),
  },

  noOfSurveysCountStyle: {
    color: '#221818',
    fontSize: RFValue(20),
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  filterIconContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: hp('1'),
    justifyContent: 'center',
  },

  filterIconStyle: {
    justifyContent: 'center',
    height: hp('5'),
    width: wp('6'),
    marginRight: wp('5'),
    // marginTop: hp('1'),
  },

  dashLineContainer: {
    flex: 1,
    marginTop: hp('2'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('100'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  surveyCardMainContainer: {
    marginTop: hp('1'),
  },

  surveyCardCardBG: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderColor: '#E6DFDF',
    alignSelf: 'center',
    borderRadius: wp('2'),
    height: hp('56'),
    width: wp('90'),
    borderWidth: hp('0.2'),
    marginTop: hp('2'),
  },

  surveyNameTextStyle: {
    marginTop: hp('2'),
    marginLeft: wp('3'),
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(14),
  },

  surveyImgBG: {
    marginTop: hp('3'),
    backgroundColor: '#F8F4F4',
    alignSelf: 'center',
    height: hp('25'),
    width: wp('81'),
    borderRadius: wp('1'),
    justifyContent: 'center',
  },

  surveyImgStyle: {
    alignSelf: 'center',
    height: hp('9'),
  },

  PCRMainContainer: {
    marginTop: hp('2'),
    flexDirection: 'row',
    marginLeft: wp('4'),
  },

  publishColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  publishLabelTextStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
  },

  publishDateTextStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(13),
    marginTop: hp('1.5'),
  },

  companyMainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('-3'),
  },

  companyLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
  },

  companyNameStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(13),
    marginTop: hp('1.5'),
  },

  timeReqMainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: wp('5'),
  },

  timeReqLabelStyle: {
    color: '#362828',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(12),
    alignSelf: 'flex-start',
  },

  timeReqTimeStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(13),
    marginTop: hp('1.5'),
    alignSelf: 'flex-start',
  },

  cardDashLineMainContainer: {
    marginTop: hp('2'),
    alignContent: 'center',
    alignItems: 'center',
  },

  cardDashStyle: {
    width: wp('50'),
    height: hp('1'),
  },

  buttonMainContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  buttonBGStyle: {
    backgroundColor: '#2FC36E',
    borderRadius: wp('7'),
    height: hp('4'),
    width: wp('45'),
    justifyContent: 'center',
  },

  buttonTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(10),
    alignSelf: 'center',
  },
});
