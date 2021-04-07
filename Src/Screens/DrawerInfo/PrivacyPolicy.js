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
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Privacy Policy
              </Text>
              {'\n'}
              {'\n'}
              We value the trust you place in us and recognize the importance of
              secure transactions and information privacy. This Privacy Policy
              describes how SAPL Internet Private Limited and its affiliates
              (collectively “SAPL, we, our, us”) collect, use, share or
              otherwise process your personal information through SAPL website{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL('https://sapl.net')}>
                www.sapl.net
              </Text>
              , its mobile application, and m-site (hereinafter referred to as
              the “Platform”). By visiting the Platform, providing your
              information or availing our product/service, you expressly agree
              to be bound by the{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() =>
                  Linking.openURL('https://sapl.net/privacy-disclaimer/')
                }>
                Terms & Conditions
              </Text>{' '}
              of this Privacy Policy, the Terms of Use and the applicable
              service/product terms and conditions. If you do not agree, please
              do not access or use our Platform.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                1. Collection of Your Information
              </Text>{' '}
              {'\n'}When you use our Platform, we collect and store your
              information which is provided by you from time to time. In
              general, you can browse the Platform without telling us who you
              are or revealing any personal information about yourself. Once you
              give us your personal information, you are not anonymous to us.
              Where possible, we indicate which fields are required and which
              fields are optional. You always have the option to not provide
              information by choosing not to use a particular service, product
              or feature on the Platform. We may track your buying behaviour,
              preferences, and other information that you choose to provide on
              our Platform. We use this information to do internal research on
              our users' demographics, interests, and behaviour to better
              understand, protect and serve our users. This information is
              compiled and analysed on an aggregated basis. This information may
              include the URL that you just came from (whether this URL is on
              our Platform or not), which URL you next go to (whether this URL
              is on our Platform or not), your computer browser information, and
              your IP address. We collect personal information (such as email
              address, delivery address, name, phone number, credit card/debit
              card and other payment instrument details) from you when you set
              up an account or transact with us. While you can browse some
              sections of our Platform without being a registered member,
              certain activities (such as placing an order or consuming our
              online content or services) do require registration. We do use
              your contact information to send you offers based on your previous
              orders and your interests. If you choose to post messages on our
              message boards, chat rooms or other message areas or leave
              feedback or if you use voice commands to shop on the Platform, we
              will collect that information you provide to us. We retain this
              information as necessary to resolve disputes, provide customer
              support and troubleshoot problems as permitted by law. If you send
              us personal correspondence, such as emails or letters, or if other
              users or third parties send us correspondence about your
              activities or postings on the Platform, we may collect such
              information into a file specific to you. If you enrol into our
              SuperCoins Loyalty Program, we will collect and store your
              personal information such as name, contact number, email address,
              communication address, date of birth, gender, zip code, lifestyle
              information, demographic and work details which is provided by you
              to SAPL or a third-party business partner that operates
              online/offline establishments or platforms where you can earn
              SuperCoins for purchase of goods and services, and redeem
              SuperCoins. We will also collect your information related to your
              transactions on SAPL platform and such third-party business
              partner platforms. When such third-party business partner collects
              your personal information directly from you, you will be governed
              by their privacy policies. SAPL shall not be responsible for the
              third-party business partner’s privacy practices or the content of
              their privacy policies, and we request you to read their privacy
              policies prior to disclosing any information. SAPL has onboarded
              certain third-party business partners on the Platform who
              specialise in the categories like travel ticket reservations,
              booking online movie tickets, paying online bills and more
              (Ultra-Partners). If you use the services of Ultra-Partners, you
              will be redirected to Ultra-Partners websites/applications and
              your entry to Ultra-Partners websites/applications will be based
              on your SAPL login credentials after seeking your permissions to
              share the data further. SAPL shall not be responsible for the
              Ultra-Partner’s privacy practices or the content of their privacy
              policies, and we request you to read their privacy policies prior
              to disclosing any information. {'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                2. Use of Demographic / Profile Data / Your Information{' '}
              </Text>
              {'\n'}
              We use your personal information to provide the product and
              services you request.{'\n'} To the extent we use your personal
              information to market to you, we will provide you the ability to
              opt-out of such uses. We use your personal information to assist
              sellers and business partners in handling and fulfilling orders;
              enhancing customer experience; resolve disputes; troubleshoot
              problems; help promote a safe service; collect money; measure
              consumer interest in our products and services; inform you about
              online and offline offers, products, services, and updates;
              customize and enhance your experience; detect and protect us
              against error, fraud and other criminal activity; enforce our
              terms and conditions; and as otherwise described to you at the
              time of collection of information. With your consent, we will have
              access to your SMS, contacts in your directory, location and
              device information. We may also request you to provide your PAN,
              GST Number, Government issued ID cards/number and
              Know-Your-Customer (KYC) details to: (i) check your eligibility
              for certain products and services including but not limited to
              credit and payment products; (ii) issue GST invoice for the
              products and services purchased for your business requirements;
              (iii) enhance your experience on the Platform and provide you
              access to the products and services being offered by us, sellers,
              affiliates or lending partners. You understand that your access to
              these products/services may be affected in the event consent is
              not provided to us. In our efforts to continually improve our
              product and service offerings, we and our affiliates collect and
              analyse demographic and profile data about our users' activity on
              our Platform. We identify and use your IP address to help diagnose
              problems with our server, and to administer our Platform. Your IP
              address is also used to help identify you and to gather broad
              demographic information. We will occasionally ask you to
              participate in optional surveys conducted either by us or through
              a third party market research agency. These surveys may ask you
              for personal information, contact information, date of birth,
              demographic information (like zip code, age, or income level),
              attributes such as your interests, household or lifestyle
              information, your purchasing behaviour or history, preferences,
              and other such information that you may choose to provide. The
              surveys may involve collection of voice data or video recordings,
              the participation of which would purely be voluntary in nature. We
              use this data to tailor your experience at our Platform, providing
              you with content that we think you might be interested in and to
              display content according to your preferences.{'\n'}
              {'\n'}
              <Text style={{fontWeight: 'bold'}}>
                3. Sharing of personal information
              </Text>
              {'\n'} We may share personal information with our other corporate
              entities and affiliates for purposes of providing products and
              services offered by them.These entities and affiliates may share
              such information with their affiliates, business partners and
              other third parties for the purpose of providing you their
              products and services, and may market to you as a result of such
              sharing unless you explicitly opt-out. We may disclose your
              personal information to third parties, such as sellers, business
              partners. This disclosure may be required for us to provide you
              access to our products and services; for fulfilment of your
              orders; for enhancing your experience; for providing feedback on
              products; to collect payments from you; to comply with our legal
              obligations; to conduct market research or surveys; to enforce our
              Terms of Use; to facilitate our marketing and advertising
              activities; to analyse data; for customer service assistance; to
              prevent, detect, mitigate, and investigate fraudulent or illegal
              activities related to our product and services. We do not disclose
              your personal information to third parties for their marketing and
              advertising purposes without your explicit consent. We may
              disclose personal information if required to do so by law or in
              the good faith belief that such disclosure is reasonably necessary
              to respond to subpoenas, court orders, or other legal process. We
              may disclose personal information to law enforcement agencies,
              third party rights owners, or others in the good faith belief that
              such disclosure is reasonably necessary to: enforce our Terms of
              Use or Privacy Policy; respond to claims that an advertisement,
              posting or other content violates the rights of a third party; or
              protect the rights, property or personal safety of our users or
              the general public. We and our affiliates will share / sell some
              or all of your personal information with another business entity
              should we (or our assets) plan to merge with, or be acquired by
              that business entity, or re-organization, amalgamation,
              restructuring of business. Should such a transaction occur that
              other business entity (or the new combined entity) will be
              required to follow this Privacy Policy with respect to your
              personal information.{'\n'}
              {'\n'}
            </Text>
            {/* <Image
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={require('../../assets/Icons/sapl.png')}
            /> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}
