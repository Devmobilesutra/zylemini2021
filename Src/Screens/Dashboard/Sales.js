import React, {Component} from 'react';
import {View, Text, StyleSheet, Select, ScrollView, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

class Sales extends Component {
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
            SALES
          </Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: wp('6'),
                  marginBottom: 10,
                }}>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 9}}>
                    Monthly Total Sales
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      type: 'font-awesome',
                    }}>
                    60,00000
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginLeft: wp('18')}}>
                <View style={{flexDirection: 'column', marginLeft: 5}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 9}}>
                    Total Yearly Target
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                    }}>
                    12,34,5678
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', marginLeft: wp('6')}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 9}}>
                    Total % Change ( Q2)
                  </Text>
                  <Text
                    style={{
                      color: '#2FC36E',
                      fontSize: 18,
                      type: 'font-awesome',
                    }}>
                    +10%
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginLeft: wp('16')}}>
                <View style={{flexDirection: 'column', marginLeft: 5}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'grey', fontSize: 9}}>
                    Yearly Target Achieved
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                    }}>
                    12,34,5678
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
              height: hp('0.3%'),
              width: wp('100%'),
              marginTop: hp('4%'),
            }}
          />
        </View>
      </View>
    );
  }
}

export default Sales;
