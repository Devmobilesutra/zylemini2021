import React, {Component} from 'react';
import {View, Text, StyleSheet, Select, ScrollView, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

class Payment extends Component {
  state = {};

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }
  render() {
    return (
      <View style={{flex: 10}}>
        <View style={{flexDirection: 'row', marginTop: hp('3%')}}>
          <View style={{flexDirection: 'row', marginLeft: wp('6')}}>
            <Image
              style={{height: hp('4.2'), width: wp('7.5')}}
              source={require('../../assets/Icons/Payment2.png')}
            />

            <View style={{flexDirection: 'column', marginLeft: 10}}>
              <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                Otstanding Payments
              </Text>
              <Text
                style={{
                  color: '#E23333',
                  fontSize: 18,
                  type: 'font-awesome',
                }}>
                20,000
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginLeft: wp('4')}}>
            <Image
              style={{height: hp('4.2'), width: wp('7.5')}}
              source={require('../../assets/Icons/Calendar.png')}
            />

            <View style={{flexDirection: 'column', marginLeft: 5}}>
              <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                Today’s Meetings
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
        <View>
          {/* middle gray line */}
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#d9dbda',
              height: hp('0.5%'),
              width: wp('100%'),
              marginTop: hp('3%'),
            }}
          />
        </View>
      </View>
    );
  }
}

export default Payment;
