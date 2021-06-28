import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  BackHandler,
  AsyncStorage,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {Dropdown} from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import {
  TOTAL_SHOPS,
  SHOP_INFO,
  SHOP_VISITED_TODAY,
} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
const db = new Database();
import Communications from 'react-native-communications';
import {Searchbar} from 'react-native-paper';

export default class PendingOrder extends Component {
  state = {
    Cust_array: [],
    entity_id: '',
  };

  // @refresh reset
  static navigationOptions = {
    title: 'Outlet Visit Report',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      marginLeft: hp('3'),
      fontSize: 18,
      fontWeight: 'bold',
    },
    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => Actions.TabBarReports()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
        <Image
          style={{marginLeft: wp('2')}}
          source={require('../../assets/Icons/Shop.png')}
        />
      </View>
    ),
  };
  componentDidMount() {
    this.GetAllData();
  }
  GetAllData() {
    db.getDataForActivity().then(data => {
      console.log('data for activity', data);

      for (var i = 0; i < data.length; i++) {
        if ((data[i].entity_type = 1)) {
          console.log('entity id getttt', this.state.entity_id);
          db.getdatafromcust(data[i].entity_id).then(data => {
            this.setState({
              Cust_array: this.state.Cust_array.concat(data),
            });
            console.log('data for display', this.state.Cust_array);
          });
        } else if ((data[i].entity_type = 0)) {
          db.getdatafromdist(data[i].entity_id).then(data => {
            this.setState({
              Cust_array: this.state.Cust_array.concat(data),
            });
            console.log('data for display', this.state.Cust_array);
          });
        }
      }
    });
  }
  renderParty() {
    return this.state.Cust_array.map((item, index) => (
      <TouchableOpacity
        onPress={() =>
          Actions.Activities({Party: item.Party, entity_id: item.CustomerId})
        }>
        <View style={styles.collapseHeaderStyle}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageStyles}
              source={require('../../assets/Icons/shopImg.png')}
            />
          </View>

          <View style={styles.shopDetailsContainer}>
            <Text style={styles.shopNameTextStyle}>{item.Party}</Text>
            <Text style={styles.shopAddressTextStyle}>{item.AREA}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  }
  render() {
    return (
      <View style={{flex: 10}}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.headerMainContainer}>
              <Searchbar
                style={styles.searchbarContainerStyle}
                placeholder="Search Outlet"
                theme={false}
                icon={false}
                // value={this.state.search}
                // onChangeText={input => {
                //     this.setState({ search: input });
                //     this.SearchFilterFunction(input)
                // }
                //  }
              />
            </View>
            {/* //////////////////////////////////////////////////////////////////////////////// */}

            <View style={styles.totalShopsMainContainer}>
              <View style={styles.processColContainer}>
                <Text style={styles.inProcessHeadingTextStyle}>
                  {/* Total orderInProcess */}
                  Total Orders
                </Text>
                <Text style={styles.surveysTakenCountStyle}>
                  {/* {this.state.TotalOrderLen} */}00
                </Text>
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
            {/* ////////////////////////////////////////////////////////////////// */}

            <View style={styles.searchResultContainer}>
              <Text style={styles.searchResultTextStyle}>Recent Outlets</Text>
            </View>
            {this.renderParty()}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerMainContainer: {
    flex: 0.3,
    backgroundColor: '#221818',
  },
  totalShopsMainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('2'),
  },

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
    fontSize: RFValue(20),
    marginLeft: wp('3'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  todaysRouteTextStyle: {
    color: '#ADA2A2',
    fontSize: RFValue(11),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('4'),
  },
  searchbarContainerStyle: {
    height: hp('8'),
    width: wp('88'),
    borderColor: '#E6DFDF',
    borderWidth: wp('0.4'),
    borderRadius: wp('2'),
    marginTop: hp('1'),
    alignSelf: 'center',
    elevation: 0,
    marginBottom: hp('2'),
    fontSize: 12,
  },
  searchResultContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: hp('3'),
    marginTop: wp('2'),
    marginTop: hp('3'),
    marginBottom: hp('1'),
  },

  searchResultTextStyle: {
    color: '#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    // fontSize: RFValue(11),
    fontSize: 12,
  },

  searchResultsResulContainer: {
    flex: 1,
    marginTop: wp('4'),
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  imageStyles: {
    marginLeft: wp('5'),
    height: hp('8'),
    width: wp('16'),
  },

  shopDetailsContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: hp('-3'),
    marginLeft: wp('4'),
  },

  shopNameTextStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    // fontSize:wp('4'),
    marginTop: hp('3'),
    fontSize: 14,
  },

  shopAddressTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    // fontSize:wp('3'),
    fontSize: 10,
    marginVertical: wp('3.1'),
  },
  collapseHeaderStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('13'),
    width: wp('90'),
    borderWidth: hp('0.2'),
    marginHorizontal: wp('4'),
    marginTop: hp('1.5'),
  },
});
