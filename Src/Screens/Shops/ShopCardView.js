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
import {Dropdown} from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import {FloatingAction} from 'react-native-floating-action';
import {TOTAL_SHOPS} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
const db = new Database();
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
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
];

export default class ShopCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Shopssjnsrfsfsjxsfjy',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
    },
    // headerRight: <Image  source = {require('../../Assets/Icons/SearchHeader.png')}
    //                 source = {require('../../Assets/Icons/Card_View.png')}
    // />,
    headerRight: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {/* <TouchableOpacity  onPress={(cardView)=>this.setState({cardView:!this.state.cardView})}>     */}
        <TouchableOpacity>
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
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.Shops()}>
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
            style={{marginLeft: wp('4'), marginRight: 10}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };
  render() {
    return (
      <View style={{flex: 10}}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={styles.BGImgStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.HeaderContainer}>
              <Text style={styles.todaysRouteTextStyle}>TODAY'S ROUTE</Text>
              <Dropdown
                value={'Route 1'}
                itemCount={4}
                dropdownOffset={{top: 10}}
                containerStyle={styles.dropDownContainer}
                rippleCentered={true}
                itemColor="#ADA2A2"
                // fontSize = '10'
                inputContainerStyle={{borderBottomColor: 'transparent'}}
                data={data}
                dropdownPosition={-5.6}
                dropdownOffset={{top: 20, left: 18}}
                fontSize={RFValue(15)}
                fontFamily="Proxima Nova"
              />
            </View>

            {/*Total Shops  */}
            <View style={styles.totalShopsMainContainer}>
              <View style={styles.totalShopColContainer}>
                <Text style={styles.totalShopCountTextStyle}>24</Text>
                <Text style={styles.totalShopsHeaderTextStyle}>
                  Total Shops
                </Text>
              </View>
              <View style={styles.visitedColumnContainer}>
                <Text style={styles.visitedCountTextStyle}>10</Text>
                <Text style={styles.visitedHedingTextStyle}>
                  Shop Visited Today
                </Text>
              </View>
              {/* Filter Icon */}
              <View style={styles.filterContainer}>
                <Image
                  source={require('../../assets/Icons/filter_list_shop.png')}
                  style={styles.filterIconStyle}
                />
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

            {/* Shop LIST Card VIEW */}
            <View style={styles.shopListMainContainer}>
              <TouchableOpacity onPress={() => Actions.Info()}>
                <View style={styles.shopListBackContainer}>
                  <View style={styles.shopNameAddContainer}>
                    <Text style={styles.shopNameTextStyle}>Shop Name</Text>
                  </View>
                  <View style={styles.shopNameAddContainer}>
                    <Text style={styles.shopDistanceTextStyle}>
                      Kothrud 1Km Away ETA 5 mins
                    </Text>
                  </View>
                  <View style={styles.imgBackContainer}>
                    <Image
                      style={styles.imageStyles}
                      source={require('../../assets/Icons/Shop_card_watermark.png')}
                    />
                  </View>
                  <View style={styles.NCMContainer}>
                    <View style={styles.navContainer}>
                      <TouchableOpacity>
                        <Text style={styles.navTextStyle}>Navigate</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.callContainer}>
                      <TouchableOpacity>
                        <Text style={styles.callTextStyle}>Call</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.msgContainer}>
                      <TouchableOpacity>
                        <Text style={styles.msgTextStyle}>Message</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <FloatingAction
            open={open}
            color="#a10d59"
            actions={actions}
            buttonSize={hp('9.5')}
            floatingIcon={require('../../assets/Icons/Floating.png')}
            iconWidth={wp(20)}
            iconHeight={hp(16)}
            // iconWidth={wp(5)}
            // iconHeight={hp(3)}
            shadow="null"
            overlayColor="#221818"
            showBackground={true}
            onStateChange={this._onStateChange}
            onPressItem={name => {
              // Actions.CreateNewOrderFirst()
              if ((name = 'bt_accessibility')) {
                Actions.AddNewShop();
              }
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BGImgStyle: {
    height: hp('89'),
    width: wp('100'),
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  HeaderContainer: {
    flex: 0.3,
    backgroundColor: '#210305',
  },

  todaysRouteTextStyle: {
    color: '#ADA2A2',
    fontSize: RFValue(11),
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
    fontSize: RFValue(22),
    fontWeight: 'bold',
    marginLeft: wp('11'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  totalShopsHeaderTextStyle: {
    color: '#8C7878',
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('6%'),
    fontFamily: 'Proxima Nova',
  },

  visitedColumnContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  visitedCountTextStyle: {
    color: '#221818',
    fontSize: RFValue(22),
    fontWeight: 'bold',
    marginLeft: wp('8'),
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  visitedHedingTextStyle: {
    color: '#8C7878',
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('-2'),
    fontFamily: 'Proxima Nova',
  },

  filterContainer: {
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

  shopListBackContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    height: hp('42'),
    width: wp('90'),
    borderWidth: hp('0.3'),
    marginHorizontal: wp('4'),
  },

  shopNameAddContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: wp('6'),
  },

  shopNameTextStyle: {
    color: '#796A6A',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(17),
    marginTop: hp('2'),
  },

  shopDistanceTextStyle: {
    color: '#796A6A',
    fontFamily: 'Proxima Nova',
    fontSize: RFValue(11),
    marginTop: wp('3'),
  },
  imgBackContainer: {
    backgroundColor: '#F8F4F4',
    borderRadius: wp('2'),
    height: hp('18'),
    width: wp('80'),
    marginTop: hp('3'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyles: {
    marginLeft: wp('5'),
    height: hp('8'),
    width: wp('15'),
  },

  NCMContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  navContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  navTextStyle: {
    color: '#3955CB',
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginLeft: wp('6'),
    fontFamily: 'Proxima Nova',
  },

  callContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  callTextStyle: {
    color: '#3955CB',
    fontSize: RFValue(13),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    marginLeft: wp('5'),
  },

  msgContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  msgTextStyle: {
    color: '#3955CB',
    fontSize: RFValue(13),
    fontWeight: 'bold',
    marginRight: wp('6'),
    fontFamily: 'Proxima Nova',
  },
});
