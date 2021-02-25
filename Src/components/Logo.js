import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: hp('16'), height: hp('19')}}
          source={require('../assets/Icons/zylemini_logo.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp('15'),
  },
  // logoText: {
  //     marginVertical: 15,
  //     fontSize: 18,
  //     color: 'rgba(255, 255, 255, 0.7)'
  // }
});
