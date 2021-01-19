import React, { Component } from 'react';
import { View, Text, StyleSheet, Select, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
  removeOrientationListener as rol} from 'react-native-responsive-screen';





class Today extends Component {
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
               <View style = {{ flex:1 }}>
                <Text  style = {{  color: 'black', fontSize: wp('3%'), fontWeight: 'bold', marginTop: hp('2%'), 
                                    marginLeft: wp('3%'), type: 'font-awesome' }}>
                    TODAY
                </Text>

                <View style= {{ flex:1, flexDirection:'row' }}>
                    <View style= {{ flex:0.5, flexDirection:'column', alignItem:'center'}}>
                        <Text  style = {{  color: 'black', fontSize: wp('13%'), fontWeight: 'bold', marginTop: hp('-1%'), 
                                    marginLeft: wp('16%'), type: 'font-awesome',  }}>
                            20
                        </Text>
                        <Text  style = {{  color: 'black', fontSize: wp('3%'), marginTop: hp('-1%'), 
                                    marginLeft: wp('14%'), type: 'font-awesome',  }}>
                            Target Shop's
                        </Text>

                        <Text  style = {{  color: 'black', fontSize: wp('13%'), fontWeight: 'bold', marginTop: hp('1%'), 
                                    marginLeft: wp('16%'), type: 'font-awesome',  }}>
                            00
                        </Text>
                        <Text  style = {{  color: 'black', fontSize: wp('3%'), marginTop: hp('-1%'), 
                                    marginLeft: wp('14%'), type: 'font-awesome',  }}>
                            Order Booked
                        </Text>
                    </View>
                    <View style= {{ flex:0.5, flexDirection:'column', alignItem:'center', alignItems: 'flex-end'}}>
                        <Text  style = {{  color: 'black', fontSize: wp('13%'), fontWeight: 'bold', marginTop: hp('-1%'), 
                                     marginRight: wp('20%'),type: 'font-awesome',  }}>
                            00
                        </Text>
                        <Text  style = {{  color: 'black', fontSize: wp('3%'), marginTop: hp('-1%'), 
                                    marginRight: wp('19%'), type: 'font-awesome',  }}>
                            Shop Covered
                        </Text>
                        <Text  style = {{  color: 'black', fontSize: wp('13%'), fontWeight: 'bold', marginTop: hp('1%'), 
                                    marginRight: wp('20%'), type: 'font-awesome',  }}>
                            00
                        </Text>
                        <Text  style = {{  color: 'black', fontSize: wp('3%'), marginTop: hp('-1%'), 
                                   marginRight: wp('15%'), type: 'font-awesome',  }}>
                            Payment Collected
                        </Text>
                    </View>
                </View>
            </View>

             <View style = {{ flex:0.1 }}> 
                {/* middle gray line */}
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', backgroundColor: '#d9dbda', height: hp('0.5%'),
                            width: wp('100%'), marginTop:hp('4%'),}}>
                </View>
            </View>
        
        </View>
         );
    }
}
 
export default Today;
