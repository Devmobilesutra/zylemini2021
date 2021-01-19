import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground,FlatList,BackHandler,AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { TOTAL_SHOPS,SHOP_INFO,SHOP_VISITED_TODAY} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
import Communications from 'react-native-communications';
import { Searchbar } from 'react-native-paper';
export default class OutletPerformance extends Component {



    static navigationOptions = {

        title: 'Outlet Performance',
        color: 'white',
        headerStyle: {
            backgroundColor: '#221818'
        },
                headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff', marginLeft: hp('3'),fontSize:18,fontWeight:'bold'  
        },
        headerLeft: (
            <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
                <TouchableOpacity   onPress={() =>Actions.TabBarReports() }>  
                    <Image  style={{marginLeft:wp('4'),}}
                        source = {require('../../assets/Icons/Back_White.png')}
                    />
                </TouchableOpacity>
                <Image style={{ marginLeft: wp('2'), }}
                            source={require('../../assets/Icons/Shop.png')}
                        />
            </View>
        ),  
    }
    
    render() {
        return (
            <View style = {{ flex: 10 }}>
            <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                     style={{flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
            >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style = {styles.headerMainContainer}>
                   
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

                <View style={styles.searchResultContainer}>
                        <Text style={styles.searchResultTextStyle} >
                            Recent Outlets
                            </Text>
                    </View>

                    <View style={styles.collapseHeaderStyle}>
                    <View style={styles.imageContainer}>
                            <Image style={styles.imageStyles} 
                                source = {require('../../assets/Icons/shopImg.png')}/>
                        </View>
                         <View style={styles.shopDetailsContainer}>
                            <Text style={styles.shopNameTextStyle}>
                               Outlet Name
                            </Text >
                            <Text style={styles.shopAddressTextStyle}>
                            Kothrud,pune
                            </Text>
                            {/* <Text style={styles.shopDistanceTextStyle}>
                                1 Km Away     ETA 5Mins
                            </Text> */}
                        </View>
                      </View>

                      <View style={styles.collapseHeaderStyle}>
                    <View style={styles.imageContainer}>
                            <Image style={styles.imageStyles} 
                                source = {require('../../assets/Icons/shopImg.png')}/>
                        </View>
                         <View style={styles.shopDetailsContainer}>
                            <Text style={styles.shopNameTextStyle}>
                               Outlet Name
                            </Text >
                            <Text style={styles.shopAddressTextStyle}>
                            Kothrud,pune
                            </Text>
                            {/* <Text style={styles.shopDistanceTextStyle}>
                                1 Km Away     ETA 5Mins
                            </Text> */}
                        </View>
                      </View>
                      <View style={styles.collapseHeaderStyle}>
                    <View style={styles.imageContainer}>
                            <Image style={styles.imageStyles} 
                                source = {require('../../assets/Icons/shopImg.png')}/>
                        </View>
                         <View style={styles.shopDetailsContainer}>
                            <Text style={styles.shopNameTextStyle}>
                               Outlet Name
                            </Text >
                            <Text style={styles.shopAddressTextStyle}>
                               Kothrud,pune
                            </Text>
                            {/* <Text style={styles.shopDistanceTextStyle}>
                                1 Km Away     ETA 5Mins
                            </Text> */}
                        </View>
                      </View>
                </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
headerMainContainer:{ 
    flex:0.3,
    backgroundColor: '#221818', 
},

todaysRouteTextStyle:{ 
    color:'#ADA2A2', 
    fontSize:RFValue(11), 
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold', 
    marginLeft: wp('6'), 
    marginTop:hp('4'), 
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
    marginBottom:hp('2'), fontSize:12
},
searchResultContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: hp('3'),
    marginTop: wp('2'),
    marginTop: hp('3'),
    marginBottom:hp('1')
},

searchResultTextStyle: {
    color: '#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
   // fontSize: RFValue(11),
   fontSize:12
},

searchResultsResulContainer: {
    flex: 1,
    marginTop: wp('4')
},
imageContainer: { 
    flex:1, 
    alignItems: 'flex-start',
  },

  imageStyles: { 
    marginLeft: wp('5'),
    height:hp('8'),
    width:wp('16'),
  },

  shopDetailsContainer: { 
    flex:3, 
    flexDirection:'column', 
    alignItems: 'flex-start',
    marginTop: hp('-3'),
    marginLeft: wp('4'),
  },

  shopNameTextStyle: { 
    color:'#796A6A',  
    fontWeight: 'bold',
    fontFamily:'Proxima Nova', 
   // fontSize:wp('4'),
    marginTop: hp('3'),
    fontSize:14
  },

  shopAddressTextStyle: { 
    color:'#796A6A', 
    fontFamily:'Proxima Nova', 
   // fontSize:wp('3'), 
   fontSize:10,
    marginVertical:wp('3.1'),
  },
  collapseHeaderStyle: {
    alignItems:'center' ,
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'), 
    height: hp('13'), 
    width: wp('90'),
    borderWidth: hp('0.2'), 
    marginHorizontal: wp('4'),
    marginTop:hp('1.5')
  },

})