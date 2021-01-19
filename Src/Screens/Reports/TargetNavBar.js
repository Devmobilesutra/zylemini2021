import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, BackHandler, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import User from '../../utility/User';
export default class TargetNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}}
  
    render() {
        return (
            <View>
                <View style={styles.mainContainer}>
                    <View style={styles.backArrowContainer}>
                        <TouchableOpacity onPress={() => Actions.TabBarReports()} style={styles.backArrowStyle}>
                            <Image
                                source={require('../../assets/Icons/Back_White.png')}
                            />
                        </TouchableOpacity>
                        <Image style={{                           
                            marginTop: hp('1.3'), marginLeft: hp('1'),
                        }}
                            source={require('../../assets/Icons/Shop.png')}
                        />
                        <Text style={styles.assetLabelStyle}>Target Vs Achivements </Text>
                        <Image style={styles.searchIconStyle}
                            source={require('../../assets/Icons/SearchHeader.png')} />
                    </View>


                    <View style={styles.headerMainContainer}>
                        <View style={styles.headerMainContainer11}>
                            <Text style={styles.todaysRouteTextStyle} >
                                PRODUCTS/BRANDS
                </Text>
                            <Text style={styles.todaysRouteTextStylebelow} >
                                All({User.BrandCount})
                </Text>
                        </View>
                        <View style={styles.headerMainContainer1}>
                            <Text style={styles.todaysRouteTextStyle} >
                                UOM
                </Text>
                            <Text style={styles.todaysRouteTextStylebelow} >
                            {User.DefaultUOM}
                </Text>
                        </View>
                        <View style={styles.headerMainContainer1}>
                            <Text style={styles.todaysRouteTextStyle} >

                            </Text>
                            <Text style={styles.todaysRouteTextStylebelow} >

                            </Text>
                        </View>
                    </View>

                </View>




            </View>
        )
    }
}


const styles = StyleSheet.create({

    mainContainer: {
        flexDirection: 'column',
        backgroundColor: '#221818',
        color: '#fff', height: hp('18'),

    },

    backArrowContainer: {
        flexDirection: "row",
        alignItems: 'flex-start',
        flex: 2,
        alignSelf: 'flex-start',
        marginTop: hp('1'),
    },

    backArrowStyle: {
     //  flex: 1,
        marginTop: hp('1.5'), marginLeft: hp('2'),

    },

    assetLabelStyle: {
        flex: 8,
        color: '#F8F4F4',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        alignSelf: 'center',
        marginLeft: wp('-3'),textAlign:'center',marginTop:wp('-1')
    },

    searchIconStyle: {

        marginLeft: hp('7'),
        marginRight: hp('2'),
        marginTop: hp('0.2'),
        height: 24,
        width: 24,
        alignSelf: 'center',
    },
    headerMainContainer: {
        flex: 3,
        backgroundColor: '#221818',
        flexDirection: 'row',
        marginLeft: wp('7'), marginTop: hp('2'),

    },
    headerMainContainer1: {
        flex: 1,
        backgroundColor: '#221818',
        flexDirection: 'column', alignItems: 'flex-start',

        // marginTop: hp('2'),
        // marginBottom: hp('2'),
    },
    headerMainContainer11: {
        flex: 1.5,
        backgroundColor: '#221818',
        flexDirection: 'column', alignItems: 'flex-start',

        // marginTop: hp('2'),
        // justifyContent: 'center',
        //  marginBottom: hp('2'),
        // paddingBottom:hp('2')

    },

    todaysRouteTextStyle: {
        color: '#796A6A',
        fontSize: 10,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',

    },
    todaysRouteTextStylebelow: {

        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', marginTop: hp('1')
    },

});