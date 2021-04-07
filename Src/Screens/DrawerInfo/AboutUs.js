import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';

import Logo from '../../components/Logo';

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'About Us',
    color: 'white',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
    },

    //  headerLeft: <Icon  name="ios-arrow-round-back" size={20} color="white"    padding='20'
    //               onPress={ () => { Actions.Dashboard() }}   />

    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => Actions.drawerMenu()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    Actions.drawerMenu();
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  render() {
    return (
      // <ImageBackground
      //   source={require('../../assets/Icons/splashBottom.png')}
      //   style={{
      //     // flex: 1,
      //     height: hp('90%'),
      //     width: wp('100%'),
      //     // resizeMode: 'cover',
      //     // justifyContent: 'center',
      //   }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />
          <Text style={styles.versionTextStyle}>Version 1.2.8</Text>

          <Text
            style={{
              fontSize: 13,
              marginLeft: 15,
              marginRight: 15,
              color: '#696969',
            }}>
            {'\n'}
            Zylemini+ is a mobile app for the Sales Team in the field and in
            office. It generally works off-line and hence not dependent on
            Internet Connection always. The App synchronizes data with Cloud
            periodically and the frequency can be set. It delivers the Sales
            reports of Zylem on mobile so that Sales team is updated on-the-go.
            The reports cover Shop-wise Sales, Product-wise Sales, Target vs
            Achievement report and the status of data collection. It also
            enables collection of data in the field such as Sales, Stock, Photos
            of the place and location of the user. For a more demanding user,
            there is a provision for Advanced reports which are more complex.
            These can be delivered from the cloud.
          </Text>

          {/* <Text style={styles.TCTextStyle}>Terms & Conditions</Text> */}
          <Text
            style={styles.TCTextStyle}
            onPress={() =>
              Linking.openURL('https://sapl.net/privacy-disclaimer/')
            }>
            Terms & Conditions
          </Text>
        </ScrollView>
      </View>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp('100'),
    width: wp('100'),
    // backgroundColor: '',
  },

  versionTextStyle: {
    // color: 'white',
    fontSize: 13,
    fontFamily: 'Proxima Nova',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: hp('3'),
  },

  TCTextStyle: {
    color: 'blue',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: hp('3'),
  },
});
