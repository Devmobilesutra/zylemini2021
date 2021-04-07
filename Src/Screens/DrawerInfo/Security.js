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

export default class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Security Notice',
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
      <ScrollView>
        <View style={{}}>
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
                color: 'black',
                fontSize: 13,
                alignContent: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>SECURITY NOTICE</Text>
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                Smile Automation Pvt Ltd
              </Text>{' '}
              has implemented the most advanced technologies. The purpose of
              this statement is to assure you that your data is protected in the
              best way possible. Also, we would like to establish transparency
              regarding our security infrastructure and practices. SAPL provides
              the highest level system security thank to its hosting and
              technical infrastructure. Network, data and physical security
              standards are met and updated according to the fast changing
              world. We take the measures below regarding security;
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>SSL</Text>
              {'\n'}
              SSL used in SAPL servers enables the encryption of the data flow
              between the users and the system.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Accessing User Data</Text>
              {'\n'}
              Unless you permit, no one can access your account. SAPL support
              team can access your account only If you make a support request.
              {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>User Passwords</Text>
              {'\n'}
              We expect our users to create powerful passwords and keeping your
              password for yourself is your responsibility.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                Physical Security, Network Security, and the Firewall
              </Text>
              {'\n'}
              Physical Security, Network Security, and the firewall
              infrastructure of our app and our user information databases are
              stored in a data centre . They provide us with the most advanced
              firewalls in the industry.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Data Sharing</Text>
              {'\n'}
              Transferring of the data is only possible with your permission. We
              never share data with partners that have a rather low-security
              level.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Backup Plan</Text>
              {'\n'}
              Our backup planning works on a daily basis, in the case of
              technical issues. For your data safety, {'\n'}• Don’t share your
              password with anyone {'\n'}• Don’t write down your password and
              leave it available for others {'\n'}• Update your App{'\n'} • Sync
              data regularly
              {'\n'}What we do in the case of Security Breaches{'\n'}
              It’s not possible to be completely safe on the internet, and we
              can’t guarantee a %100 percent safety. When we are aware of a
              breach though, we notify the affected user to take the necessary
              steps.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Your Responsibilities</Text>
              {'\n'}
              It’s also your responsibility to keep your account information
              safe, using unique passwords. Please make sure that your devices
              are properly protected.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>Information we collect</Text>
              {'\n'}
              When you register to SAPL, we ask you to provide certain personal
              information, including a valid email address. We collect only
              Email and DisplayName information from third parties.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                How do we use the Information collected?
              </Text>
              {'\n'}
              The information we collect is used to maintain, protect and
              improve the service we provide. This information is controlled by
              that service or as authorized by you via your privacy settings at
              that service.{'\n'}
              {'\n'}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
