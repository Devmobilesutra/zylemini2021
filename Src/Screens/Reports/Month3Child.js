import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, FlatList, BackHandler, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import Database from './../../utility/Database'
const db = new Database();
import User from '../../utility/User'
import moment from 'moment';
import Moment from 'react-moment';
import { pascalCase } from "change-case";
import Communications from 'react-native-communications';
var arr = [], getData = [], crData = [],rrdata=[],Tarr=[]
var result2
export default class Month3Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TargetVal: [],
           // Tarr: json.items
        }
    }

    componentDidMount() {
       
        // var newDate = moment(Date(this.props.month)).format('DD-MM-YYYY');
        console.log("new target",this.props.Target);
      
        console.log("aaaaaaaaaaaaaaaa=", this.props.brandlistarr)
       }


  


render() {
    return (
        <View style={{ flex: 1, marginTop: hp('-3') }}>
            <View style={styles.invDetDashContainer}>
                <Dash style={styles.invDetDashStyle}
                    dashLength={2}
                    dashColor='#E6DFDF'
                />
            </View>

            <View style={{ flex: 2, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row', }}>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: "flex-start" }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>Target</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.target}</Text>
                    {/* {
                        
                        Tarr.map((item,i) => {
                          //  console.log('tarrget : '+JSON.stringify(Tarr));
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item.Target}</Text>
                            )

                        })
                    } */}

                </View>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>Achieved</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.achi}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>%</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.average}</Text>
                    {/* {
                        getData.map((item) => {
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item}</Text>
                            )

                        })

                    } */}
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>PR</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.RR}</Text>
                    {/* {
                        rrdata.map((item) => {
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item}</Text>
                            )

                        })

                    } */}
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>CR</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.CR}</Text>
                    {/* {
                        crData.map((item) => {
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item}</Text>
                            )

                        })

                    } */}
                </View>

            </View>

        </View>
    )
}
}
const styles = StyleSheet.create({
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

})