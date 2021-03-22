import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Dash from 'react-native-dash';
import Colors from '../utils/Colors';
import Dimen from '../utils/Dimen';

export default function CashPaymentContainer(props) {
  let DATA = props.PickedAndClickedImage;

  const ListModel = props => {
    let item = props.item.item.url;
    let uri = item.uri;

    return (
      <View
        style={{
          height: 100,
          width: 130,
          borderWidth: 1,
          borderColor: Colors.BorderColor2,
          borderRadius: 5,
          overflow: 'hidden',
          marginRight: 10,
        }}>
        <Image
          style={{height: 100, width: 130, resizeMode: 'stretch'}}
          source={{uri: uri}}
        />
      </View>
    );
  };

  return (
    <View style={styles.MainConatainer}>
      <View style={styles.FirstRow}>
        <View style={styles.CashHeadingConatainer}>
          <View style={styles.HeadingNumberConatainer}>
            <Text style={{color: Colors.White}}>1</Text>
          </View>
          <Text style={{marginLeft: 10}}>Cash</Text>
        </View>
        <View style={styles.PlaceholdeContiner}>
          <TextInput placeholder="Enter Amount" />
        </View>
      </View>
      <Text
        style={{
          fontSize: Dimen.FontSizeSmall,
          marginTop: 5,
          color: Colors.TexthintColor2,
        }}>
        ADD RECEIPT PHOTO
      </Text>

      <View style={styles.AddButtonAndFlatlistConatainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.PickImageForCash();
          }}>
          <View style={styles.AddbuttonView}>
            <Image
              style={{height: 40, width: 40}}
              source={require('../Assets/Images/add_button.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <FlatList
          style={{marginLeft: 10}}
          horizontal={true}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => <ListModel item={item} />}
        />
      </View>

      <Dash style={{marginTop: 25}} dashLength={2} dashColor="#ADA2A2" />
    </View>
  );
}

const styles = StyleSheet.create({
  MainConatainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  FirstRow: {
    height: 50,
    flexDirection: 'row',
  },
  CashHeadingConatainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  HeadingNumberConatainer: {
    height: 35,
    width: 35,
    borderRadius: 18,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PlaceholdeContiner: {
    flex: 1,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.BorderColor2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  AddButtonAndFlatlistConatainer: {
    height: 100,
    marginTop: 10,
    flexDirection: 'row',
  },
  AddbuttonView: {
    height: 100,
    width: 130,
    borderWidth: 1,
    borderColor: Colors.BorderColor2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
