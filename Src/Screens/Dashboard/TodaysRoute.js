import React, {Component} from 'react';
import {View, Text, StyleSheet, Select, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-material-dropdown';

class TodaysRoute extends Component {
  state = {};

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }
  render() {
    let data = [
      {
        value: 'Route 1',
      },
      {
        value: 'Route 2',
      },
      {
        value: 'Route 3',
      },
    ];
    return (
      <View style={{flex: 10}}>
        <View style={{flex: 0.5}}>
          <Text
            style={{
              color: 'black',
              fontSize: wp('3%'),
              fontWeight: 'bold',
              marginTop: hp('3%'),
              marginLeft: wp('3%'),
              type: 'font-awesome',
            }}>
            TODAY'S ROUTE
          </Text>
          <Dropdown
            // label='Select Route'
            placeholder="Select Route"
            dropdownOffset={{top: 15}}
            dropdownPosition={-4.3}
            dropdownOffset={{top: 10, left: 15}}
            containerStyle={{
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: wp('1%'),
              width: wp('90%'),
              marginTop: hp('1.5%'),
              marginLeft: wp('5%'),
              paddingRight: wp('2%'),
            }}
            rippleCentered={true}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            data={data}
          />

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 0.5, flexDirection: 'column', alignItem: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: wp('3%'),
                  fontWeight: 'bold',
                  marginTop: hp('2%'),
                  marginLeft: wp('3%'),
                  type: 'font-awesome',
                }}>
                Target Shop's
              </Text>
              <Text
                style={{
                  color: 'blue',
                  fontSize: wp('3%'),
                  fontWeight: 'bold',
                  marginTop: hp('2%'),
                  marginLeft: wp('3%'),
                  type: 'font-awesome',
                }}>
                See The Shop List
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
                  fontSize: wp('3%'),
                  fontWeight: 'bold',
                  marginTop: hp('2%'),
                  type: 'font-awesome',
                  marginRight: wp('5%'),
                }}>
                See More
              </Text>
            </View>
          </View>
        </View>

        <View style={{flex: 0.1}}>
          {/* middle gray line */}
          <View
            style={{
              backgroundColor: '#d9dbda',
              height: hp('0.5%'),
              width: wp('100%'),
              marginTop: hp('2%'),
            }}
          />
        </View>
      </View>
    );
  }
}

export default TodaysRoute;
