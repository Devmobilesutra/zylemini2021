import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Dimen from '../utils/Dimen';
import Colors from '../utils/Colors';

export default function Header(props) {
  const [Outstanding, setOutstanding] = React.useState(true);
  const [History, setHistory] = React.useState(false);

  const OutstandingTouch = () => {
    setOutstanding(true);
    setHistory(false);
  };
  const Historytouch = () => {
    setOutstanding(false);
    setHistory(true);
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeadingConatiner}>
        <View style={styles.HeaderContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.Goback();
            }}>
            <Image
              style={styles.BackButtonStyle}
              source={require('../Assets/Images/back_btn.png')}
            />
          </TouchableWithoutFeedback>

          <Text
            style={{
              fontSize: Dimen.FontSizeHeader,
              //fontWeight: 'bold',
              color: 'white',
              fontFamily: 'Proxima Nova',
            }}>
            Payments
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            props.OnSearchPress();
          }}>
          <Image
            style={{height: 20, width: 20, alignSelf: 'center'}}
            source={require('../Assets/Images/search1.png')}
          />
        </TouchableWithoutFeedback>
      </View>

      <View style={{height: 60, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 4,
            borderBottomColor: Outstanding === true ? Colors.PinkCoor : 'black',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              OutstandingTouch();
            }}>
            <Text
              style={{
                color: Outstanding === true ? 'white' : Colors.TexthintColor2,
                //fontWeight: 'bold',
                fontSize: Dimen.FontSizeVerySmall,
                fontFamily: 'Proxima Nova',
              }}
              onPress={() => {
                OutstandingTouch();
                props.Outstanding();
              }}>
              OUTSTANDING
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 4,
            borderBottomColor: History === true ? Colors.PinkCoor : 'black',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Historytouch();
            }}>
            <Text
              style={{
                color: History === true ? 'white' : Colors.TexthintColor2,
                //fontWeight: 'bold',
                fontSize: Dimen.FontSizeVerySmall,
                fontFamily: 'Proxima Nova',
              }}
              onPress={() => {
                Historytouch();
                props.Histry();
              }}>
              HISTORY
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'black',
    height: Dimen.HeaderBackGraoundHeight,
    justifyContent: 'space-between',
  },
  HeadingConatiner: {
    marginTop: Dimen.MarginTop,
    height: 30,
    flexDirection: 'row',
    marginLeft: Dimen.HeaderMargin,
    marginRight: Dimen.HeaderMargin,
    justifyContent: 'space-between',
  },
  BackButtonStyle: {
    height: Dimen.BackButtonSize,
    width: Dimen.BackButtonSize,
    resizeMode: 'stretch',
    marginEnd: 10,
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
