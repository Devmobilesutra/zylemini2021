import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Dimen from '../utils/Dimen';
import Colors from '../utils/Colors';

export default function BottomGreenbar(props) {
  const dataToBePass = props.DataToBePass;
  const navigation = props.Navigation;

  return (
    <View style={styles.BottomBarContainer}>
      <View style={{marginLeft: 10}}>
        <Text style={styles.TotalAmountToBePaid}>TOTLE AMOUNT TO BE PAID</Text>
        <Text style={{color: Colors.White}}>{props.Amount}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          props.OnNextClick();
        }}>
        <Text style={{marginRight: 10, color: Colors.White}}>NEXT</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  BottomBarContainer: {
    height: 60,
    backgroundColor: Colors.DarkGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TotalAmountToBePaid: {
    fontSize: Dimen.FontSizeVerySmall,
    color: Colors.White,
  },
});
