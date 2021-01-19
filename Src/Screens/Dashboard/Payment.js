import React, { Component } from 'react';
import { View, Text, StyleSheet, Select, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
                removeOrientationListener as rol} from 'react-native-responsive-screen';


class Payment extends Component {
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
                                PAYMENTS
                            </Text>
                        </View>

                        <View style= {{ flex: 0.5, flexDirection:'column', alignItems:'flex-end' }}>
                            <Text  style = {{  color: 'blue', fontSize: wp('3%'), fontWeight: 'bold', marginTop: hp('3%'), 
                                                type: 'font-awesome', marginRight: wp('5%')}}>
                                See The Shop List
                            </Text>
                        </View>
                    </View>

                <View style= {{ flexDirection:'row' }}>
                     <Text  style = {{  color: 'red', fontSize: wp('8%'), fontWeight: 'bold', marginTop: hp('3%'), 
                                    marginLeft: wp('5%'), type: 'font-awesome' }}>
                        20,000
                    </Text>

                     <Text  style = {{  color: 'black', fontSize: wp('3%'), marginTop: hp('5%'),
                                            marginLeft: hp('3%'), type: 'font-awesome', alignContent: 'flex-end' }}>
                        Total Outstanding
                    </Text>
                </View>
            </View>

            <View style = {{ flex:0.1 }}>
                {/* middle gray line */}
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', backgroundColor: '#d9dbda', height: hp('0.3%'),
                            width: wp('1000%'), marginTop:hp('4%'),}}>
                </View>
            </View>
        </View>
         );
    }
}
 
export default Payment;
