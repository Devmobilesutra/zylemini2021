import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from '../Components/Card';
import Dimen from '../utils/Dimen';
import Colors from '../utils/Colors';
import moment from 'moment';

export default function PaymentScreenPrviousOrderListModel(props) {
  let item = props.item.item;

  return (
    // <Card>
    <View style={styles.MainConatiner}>
      <View style={styles.HeadingConatiner}>
        <Text
          style={{
            marginLeft: 15,
            fontWeight: 'bold',
            color: Colors.White,
            maxWidth: 210,
            fontFamily: 'Proxima Nova',
            fontSize: Dimen.FontSizeNormal,
          }}>
          {item.Party}
        </Text>
        <Text style={styles.AreaTextStyle}>{item.AREA}</Text>
      </View>
      <View
        style={{
          borderLeftWidth: 1.5,
          borderRightWidth: 1.5,
          borderBottomWidth: 1.5,
          borderColor: '#E6DFDF',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <View style={styles.SubHeaadingContainer}>
          <View>
            <Text style={styles.SubHeadingStyle}>ORDER DATE</Text>
            <Text style={styles.Text2Style}>
              {moment(item.Current_date_time).format('DD-MMM-YYYY')}
            </Text>
          </View>
          <View style={styles.OrderAndAmountContainer}>
            <Text style={styles.SubHeadingStyle}>ORDER ID</Text>
            <Text style={styles.Text2Style}>{item.id}</Text>
          </View>
          <View style={{marginLeft: 50}}>
            <Text style={styles.SubHeadingStyle}>AMOUNT</Text>
            <Text style={styles.Text2Style}>{item.total_amount}</Text>
          </View>
        </View>

        <View style={styles.LastRowContainer}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                              props.OnPressViewDetail(item);
                              
                              
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: Dimen.FontSizeSmall,
                    color: Colors.BluButtonColor,
                    //fontWeight: 'bold',
                    fontFamily: 'Proxima Nova',
                  }}>
                  View Details
                </Text>
                <Image
                  style={{height: 25, width: 25}}
                  source={require('../Assets/Images/right_arrow.png')}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
    // </Card>
  );
}

const styles = StyleSheet.create({
  MainConatiner: {
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
  },
  HeadingConatiner: {
    height: 60,
    backgroundColor: Colors.TexthintColor2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  AreaTextStyle: {
    marginRight: 15,
    fontSize: Dimen.FontSizeSmall,
    fontWeight: 'bold',
    color: Colors.White,
    maxWidth: 100,
    fontFamily: 'Proxima Nova',
  },
  OrderAndAmountContainer: {marginLeft: 30},
  SubHeadingStyle: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: Dimen.FontSizeVerySmall,
    fontFamily: 'Proxima Nova',
  },
  Text2Style: {
    marginTop: 5,
    fontFamily: 'Proxima Nova',
    fontSize: Dimen.FontSizeSmall,
    color: Colors.TextColor2,
  },
  Line: {
    borderWidth: 0.5,
    borderColor: Colors.TexthintColor2,
    marginLeft: 5,
    marginRight: 5,
  },
  SubHeaadingContainer: {
    flexDirection: 'row',
    margin: 15,
  },
  LastRowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
  },
  InProgressButtonContainer: {
    height: 30,
    width: 90,
    marginTop: 10,
    backgroundColor: Colors.ButtonColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
