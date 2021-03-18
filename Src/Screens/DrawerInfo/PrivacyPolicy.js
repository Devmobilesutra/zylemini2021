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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';

export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Privacy Policy',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
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
      <View style={{}}>
        <Image
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          source={require('../../assets/Icons/sapl.png')}
        />
        {/* <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 12}}>
          Privacy policy
        </Text>
        <Text
          style={{
            color: '#E6DFDF',
            fontSize: 18,
          }}>
          Privacy policy
        </Text> */}

        <View>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              alignContent: 'center',
              justifyContent: 'center',
              marginLeft: 5,
              marginRight: 5,
            }}>
            © copyrights 2016 Smile Automation Pvt. Ltd, all rights reserved.
            all material published remains the exclusive copyright of Smile
            Automation Pvt. Ltd. no contents, including text, designs,
            photographs, videos, maps, plans, drawings etc. may be reproduced in
            whole or in part without the written consent of Smile Automation
            Pvt. Ltd. In addition, no material or contents may be reproduced on
            the world wide web by techniques of mirroring, framing, posting,
            etc. without the written consent of Smile Automation Pvt. Ltd. Smile
            Automation Pvt. Ltd.’s Privacy Policy Statement on www.sapl.net and
            www.sapl.net is strongly committed to protecting the of its users,
            consumers, products and services. Throughout the Internet, our
            primary goal is to contribute to providing a safe and secure
            environment for visitors just looking for information. Your email
            address is safe with us. We will not sell, rent, lease, give, or
            offer your email to anyone, anytime, ever.
          </Text>
        </View>
      </View>
    );
  }
}
