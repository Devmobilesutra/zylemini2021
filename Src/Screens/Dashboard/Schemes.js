import React, {Component} from 'react';
import {View, Text, StyleSheet, Select, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

class Schemes extends Component {
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <Text
              style={{
                color: 'black',
                fontSize: wp('3%'),
                fontWeight: 'bold',
                marginTop: hp('3%'),
                marginLeft: wp('3%'),
                type: 'font-awesome',
              }}>
              SCHEMES
            </Text>
          </View>

          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: wp('2.5%'),
                fontWeight: 'bold',
                marginTop: hp('3%'),
                type: 'font-awesome',
                marginRight: wp('8%'),
              }}>
              Explore
            </Text>
          </View>
        </View>

        <View style={{flex: 0.1, flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'column',
                backgroundColor: '#9ddde0',
                height: hp('15%'),
                width: wp('50%'),
                borderRadius: 10,
                marginTop: hp('4%'),
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  color: 'white',
                }}>
                Dummy Scheme Title
              </Text>
              <Text>Brand Name</Text>
              <Text>Validaity</Text>
            </View>
          </View>

          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'column',
                backgroundColor: '#94e3aa',
                height: hp('15%'),
                width: wp('45%'),
                marginTop: hp('4%'),
                marginLeft: wp('5%'),
              }}
            />
          </View>
        </View>

        <View style={{flex: 0.1}}>
          {/* middle gray line */}
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#d9dbda',
              height: hp('0.3 %'),
              width: wp('100%'),
              marginTop: hp('4%'),
            }}
          />
        </View>
      </View>
    );
  }
}

export default Schemes;
