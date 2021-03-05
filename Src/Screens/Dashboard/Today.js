import React, {Component} from 'react';
import {View, Text, StyleSheet, Select, ScrollView, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

class Today extends Component {
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
        <View style={{flex: 1}}>
          <Text
            style={{
              color: 'grey',
              fontSize: wp('3%'),
              fontWeight: 'bold',
              marginTop: hp('2%'),
              marginBottom: hp('2'),
              marginLeft: wp('6%'),
              type: 'font-awesome',
            }}>
            TODAY
          </Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', marginLeft: wp('6')}}>
                <Image
                  style={{height: hp('4.2'), width: wp('7.5')}}
                  source={require('../../assets/Icons/Shop2.png')}
                />

                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                    Target shops
                  </Text>
                  <Text
                    style={{
                      color: '#E23333',
                      fontSize: 18,
                      type: 'font-awesome',
                    }}>
                    20
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginLeft: wp('18')}}>
                <Image
                  style={{height: hp('4.2'), width: wp('7.5')}}
                  source={require('../../assets/Icons/Orders2.png')}
                />

                <View style={{flexDirection: 'column', marginLeft: 5}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                    {' '}
                    order booked
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
          </View>
          <View>
            <View style={{flexDirection: 'row', marginLeft: wp('6')}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: hp('4.2'), width: wp('7.5')}}
                  source={require('../../assets/Icons/Survey2.png')}
                />

                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                    Shop Covered
                  </Text>
                  <Text
                    style={{
                      color: '#2FC36E',
                      fontSize: 18,
                      type: 'font-awesome',
                    }}>
                    04
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginLeft: wp('16')}}>
                <Image
                  style={{height: hp('4.2'), width: wp('7.5')}}
                  source={require('../../assets/Icons/Payment2.png')}
                />

                <View style={{flexDirection: 'column', marginLeft: 5}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
                    {' '}
                    Payment collected
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
          </View>
        </View>

        <View style={{flex: 0.1}}>
          {/* middle gray line */}
          <View
            style={{
              alignItems: 'flex-start',
              flexDirection: 'row',
              backgroundColor: '#d9dbda',
              height: hp('0.5%'),
              width: wp('100%'),
              marginTop: hp('4%'),
            }}
          />
        </View>
      </View>
    );
  }
}

export default Today;
