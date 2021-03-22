import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from '../utils/Colors';

export default function HistryorderFilter(props) {
  return (
    <View style={{height: 80, flexDirection: 'row'}}>
      <View style={styles.PreviousOrderContainer}>
        <Text style={styles.OutStandingHint}>Previous Order</Text>
      </View>

      <View style={styles.AmountContainer2}>
        <Text style={styles.AmountTextStyle}>{props.Amount}</Text>
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 30, width: 30, marginBottom: 30}}
          source={require('../Assets/Images/filter_list_icon.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PreviousOrderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AmountContainer2: {
    flex: 1.5,
    justifyContent: 'center',
  },
  AmountTextStyle: {
    color: Colors.PinkCoor,
    fontWeight: 'bold',
    fontSize: 20,
    marginStart: 10,
  },
  OutStandingHint: {
    color: Colors.TexthintColor2,
    //fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 13,
    fontFamily: 'Proxima Nova',
  },
});
