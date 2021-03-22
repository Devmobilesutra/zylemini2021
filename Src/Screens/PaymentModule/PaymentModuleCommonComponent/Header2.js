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

export default function Header2(props) {
  let showSteps = props.ShowSteps;
  let showAandI = props.ShowAandI;
  let step = props.Step;

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
          <Text style={styles.HeadingText}>{props.children}</Text>
        </View>
        {showSteps ? (
          <Text style={styles.StepsStyle}>Step {step}/2</Text>
        ) : null}
      </View>

      {showAandI ? (
        <View style={styles.AmountAndInavoiceContainer}>
          <View>
            <Text style={styles.OutStandingAmountAndOredrHeadingText}>
              TOTAL OUTSTANDING AMOUNT
            </Text>
            <Text style={styles.AmountAndInvoicecsText}>
              {props.OutStandingAmount}
            </Text>
          </View>
          <View>
            <Text style={styles.OutStandingAmountAndOredrHeadingText}>
              NO. OF INVOICES
            </Text>
            <Text style={styles.AmountAndInvoicecsText}>
              {props.NoumberOfInvoices}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'black',
    //height: Dimen.HeaderBackGraoundHeight,
    justifyContent: 'space-between',
  },
  HeadingConatiner: {
    marginTop: Dimen.MarginTop,
    height: 30,
    flexDirection: 'row',
    marginLeft: Dimen.HeaderMargin,
    marginRight: Dimen.HeaderMargin,
    justifyContent: 'space-between',
    marginBottom: 20,
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
  HeadingText: {
    fontSize: Dimen.FontSizeHeader,
    //fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Proxima Nova',
  },
  StepsStyle: {
    color: Colors.White,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 3,
  },
  AmountAndInavoiceContainer: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 40,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  OutStandingAmountAndOredrHeadingText: {
    color: Colors.TexthintColor2,
    fontSize: Dimen.FontSizeVerySmall,
    //fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },
  AmountAndInvoicecsText: {
    color: Colors.White,
    fontSize: Dimen.FontSizeVeryLarge,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Proxima Nova',
  },
});
