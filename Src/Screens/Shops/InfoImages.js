import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TOTAL_SHOPS} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();


class InfoImages extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
             {/* Horizontal Images */}
            <View>
                <View style={{alignItems:'center' ,flexDirection:'row',backgroundColor: '#FFFFFF', 
                                    borderColor: '#E6DFDF', justifyContent:'center', alignSelf:'center',
                                    borderRadius: wp('2'), height: hp('26'),  width: wp('100'),}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    > 
                        <Image  style={{marginLeft:hp('3'), marginBottom:hp('0.5'), height:hp('20'), width:wp('40'),
                                        borderRadius:wp('2')}}
                                            source = {require('../../Assets/ShopInfoImg/Koala.jpg')}
                        />
                        <Image  style={{marginLeft:hp('3'), marginBottom:hp('0.5'), height:hp('20'), width:wp('40'),
                                        borderRadius:wp('2')}}
                                            source = {require('../../Assets/ShopInfoImg/Desert.jpg')}
                        />
                        <Image  style={{marginLeft:hp('3'), marginBottom:hp('0.5'), height:hp('20'), width:wp('40'),
                                        borderRadius:wp('2')}}
                                            source = {require('../../Assets/ShopInfoImg/Hydrangeas.jpg')}
                        />
                        <Image  style={{marginLeft:hp('3'), marginBottom:hp('0.5'), height:hp('20'), width:wp('40'),
                                        borderRadius:wp('2')}}
                                            source = {require('../../Assets/ShopInfoImg/Penguins.jpg')}
                        />
                    </ScrollView>
                </View>
      
            
        );
    }
}

export default InfoImages;