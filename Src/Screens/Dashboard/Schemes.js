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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.5, flexDirection: 'column'}}>
            <Text
              style={{
                color: 'grey',
                fontSize: wp('3%'),
                fontWeight: 'bold',
                marginTop: hp('2%'),
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
                marginTop: hp('2%'),
                type: 'font-awesome',
                marginRight: wp('8%'),
              }}>
              Explore
            </Text>
          </View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flex: 0.1, flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  backgroundColor: '#0FB4AD',
                  height: hp('15%'),
                  width: wp('60%'),
                  borderRadius: 10,
                  marginTop: hp('3%'),
                  marginLeft: wp('5%'),
                }}>
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    marginTop: hp('1%'),
                    alignItems: 'center',
                    color: 'white',
                  }}>
                  Dummy Scheme Title
                </Text>
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    alignItems: 'center',
                    color: 'white',
                  }}>
                  Brand Name
                </Text>
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    alignItems: 'center',
                    color: 'white',
                  }}>
                  Validaity
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'column',
                backgroundColor: '#2AA873',
                height: hp('15%'),
                width: wp('60%'),
                borderRadius: 10,
                marginTop: hp('3%'),
                marginLeft: wp('5%'),
                marginRight: wp('5%'),
              }}>
              <Text
                style={{
                  marginLeft: wp('5%'),
                  marginTop: hp('1%'),
                  alignItems: 'center',
                  color: 'white',
                }}>
                Dummy Scheme Title
              </Text>
              <Text
                style={{
                  marginLeft: wp('5%'),
                  alignItems: 'center',
                  color: 'white',
                }}>
                Brand Name
              </Text>
              <Text
                style={{
                  marginLeft: wp('5%'),
                  alignItems: 'center',
                  color: 'white',
                }}>
                Validaity
              </Text>
            </View>
          </View>
        </ScrollView>

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
