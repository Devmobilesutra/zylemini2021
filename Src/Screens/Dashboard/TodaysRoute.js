import React, {Component} from 'react';
import {
  View,
  Button,
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
export class TodaysRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
      cardView: false,
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
      new_len: '',
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

  async componentWillMount() {
    var d = await AsyncStorage.getItem('totallenght');
    this.setState({new_len: d});

    this.setState({routeData: []});
    db.getRouteData().then(data => {
      //  beatdata = data
      //console.log("beatdata========",JSON.stringify(data))

      this.setState({routeData: data});
    });
    //console.log("componentDidMount callee")
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
        placeholder="Route"
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

  navigate = (shopid, party) => {
    AsyncStorage.setItem('shopId', JSON.stringify(shopid));
    AsyncStorage.setItem('outletName', JSON.stringify(party));
    AsyncStorage.setItem('outletId', JSON.stringify(shopid));
    Actions.Info({shopId: shopid});
  };

  render() {
    return (
      <View style={{}}>
        {/* Header */}
        <View style={styles.headerMainContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'grey',
                fontSize: wp('3%'),
                fontWeight: 'bold',
                marginTop: hp('2%'),

                marginLeft: wp('6%'),
                type: 'font-awesome',
              }}>
              TODAY'S ROUTE
            </Text>
            <Text
              style={{
                color: 'blue',
                fontSize: wp('2.5%'),
                fontWeight: 'bold',
                marginTop: hp('2%'),
                marginLeft: hp('19%'),
              }}>
              See the Shop List
            </Text>
          </View>
          {this._renderRoute()}
        </View>

        {/*Total Shops  */}
        {/* <View style={styles.totalShopsMainContainer}>
          <View style={styles.totalShopColContainer}>
            <Text style={styles.totalShopCountTextStyle}>
              {this.state.totalshoplen}
            </Text>
            <Text style={styles.totalShopHeadingTextStyle}>Total Shops</Text>
          </View>
          <View style={styles.shopVisitedColContainer}>
            <Text style={styles.shopVisitedCountTextContainer}>
              {this.state.totalvisitedlen}
            </Text>
            <Text style={styles.shopVisitedHeadingTextStyle}>
              Shop Visited Today
            </Text>
          </View> */}
        {/* Filter Icon */}
        {/* <View style={styles.filterIconContainer}> */}

        {/* </View>
        </View> */}

        {/* Dash Line */}
        {/* <View style={styles.dashLineContainer}>
          <Dash
            style={styles.dashLineStyle}
            dashLength={2}
            dashColor="#ADA2A2"
          />
        </View> */}

        {/* ///////////////////////////////////////////////// */}
        <View style={{flex: 0.1}}>
          {/* middle gray line */}
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#d9dbda',
              height: hp('0.3%'),
              width: wp('100%'),
            }}
          />
        </View>
        <View style={{flex: 10}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: 'grey',
                fontSize: wp('3%'),
                fontWeight: 'bold',
                marginTop: hp('2%'),
                marginBottom: hp('2'),
                marginLeft: wp('6%'),
                type: 'font-awesome',
              }}>
              TODAY
            </Text>
          </View>

          <View style={{flexDirection: 'column'}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', marginLeft: wp('6')}}>
                  <Image
                    style={{height: hp('4.2'), width: wp('7.5')}}
                    source={require('../../assets/Icons/Shop2.png')}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text
                      style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                      Target shops
                    </Text>
                    <Text
                      style={{
                        color: '#E23333',
                        fontSize: 18,
                        type: 'font-awesome',
                      }}>
                      {this.state.totalshoplen}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', marginLeft: wp('18')}}>
                  <Image
                    style={{height: hp('4.2'), width: wp('7.5')}}
                    source={require('../../assets/Icons/Orders2.png')}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 5}}>
                    <Text
                      style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                      {' '}
                      Order booked
                    </Text>
                    <Text
                      style={{
                        color: '#E6DFDF',
                        fontSize: 18,
                      }}>
                      {' '}
                      {this.state.new_len}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row', marginLeft: wp('6')}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{height: hp('4.2'), width: wp('7.5')}}
                    source={require('../../assets/Icons/Survey2.png')}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text
                      style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                      Shop Covered
                    </Text>
                    <Text
                      style={{
                        color: '#2FC36E',
                        fontSize: 18,
                        type: 'font-awesome',
                      }}>
                      {this.state.totalvisitedlen}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', marginLeft: wp('16')}}>
                  <Image
                    style={{height: hp('4.2'), width: wp('7.5')}}
                    source={require('../../assets/Icons/Payment2.png')}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 5}}>
                    <Text
                      style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                      {' '}
                      Payment collected
                    </Text>
                    <Text
                      style={{
                        color: '#E6DFDF',
                        fontSize: 18,
                      }}>
                      {' '}
                      00
                    </Text>
                  </View>
                </View>
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
                height: hp('0.3%'),
                width: wp('100%'),
                marginTop: hp('4%'),
              }}
            />
          </View>
        </View>
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
)(TodaysRoute);

const styles = StyleSheet.create({
  headerMainContainer: {},

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
    marginTop: hp('1'),
    paddingRight: wp('3%'),
    marginVertical: hp('2'),
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
});
