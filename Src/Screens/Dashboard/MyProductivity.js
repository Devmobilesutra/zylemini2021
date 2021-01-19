import React, { Component } from 'react';
import { View, Text, StyleSheet, Select, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
        removeOrientationListener as rol} from 'react-native-responsive-screen';


class MyProductivity extends Component {
    state = {  }

componentDidMount() {
    lor(this);
}
  
componentWillUnmount() {
    rol();
  }
    render() { 
        return ( 
        <View style = {{ flex:10 }}>
            <View style = {{ flex:0.1 }}>
                    <View style= {{ flex:1, flexDirection:'row' }}>
                        <View style= {{ flex: 0.5, flexDirection:'column', }}>
                            <Text  style = {{  color: 'black', fontSize: wp('3%'), fontWeight: 'bold', marginTop: hp('3%'), 
                                            marginLeft: wp('3%'), type: 'font-awesome' }}>
                                 MY PRODUCTIVITY
                            </Text>
                        </View>

                        <View style= {{ flex: 0.5, flexDirection:'column', alignItems:'flex-end' }}>
                            <Text  style = {{  color: 'blue', fontSize: wp('3%'), fontWeight: 'bold', marginTop: hp('3%'), 
                                                type: 'font-awesome', marginRight: wp('5%')}}>
                                See The Shop List
                            </Text>
                        </View>  
                    </View>
                <View style= {{ flex: 1, flexDirection:'row' }}>
                    <View style= {{ flex: 0.5, flexDirection:'column', }}>
                        <Text  style = {{  color: '#53b06d', fontSize: wp('8%'), fontWeight: 'bold', marginTop: hp('3%'), 
                                        marginLeft: wp('7%'), type: 'font-awesome' }}>
                            78%
                        </Text>   
                    </View>

                    <View style= {{ flex: 1, flexDirection:'column',alignItems:'flex-start' }}>
                        <Text  style = {{  color: 'black', fontSize: wp('3%'), marginTop: hp('5%'), 
                                            type: 'font-awesome', alignContent: 'flex-end' }}>
                            As On 30 NOV 2019
                        </Text>
                    </View>
                </View>          
            </View>

             <View style = {{ flex:0.1 }}> 
                {/* middle gray line */}
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', height: hp('1%'),
                            width: wp('100%'), marginTop:hp('4%'),}}>
                </View>
            </View>
        </View>
         );
    }
}
 
export default MyProductivity;
