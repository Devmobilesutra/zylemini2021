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
import {
  Router,
  Scene,
  Stack,
  Drawer,
  Tabs,
  Lightbox,
} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';

import Info from './Info';
import Orders from './Orders';
import Payments from './Payments';
import Assets from './Assets';
import Surveys from './Surveys';
import Schemes from './Schemes';

export default class TabBar extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {  };
  // }

  static navigationOptions = {
    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => Actions.Shops()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    //console.log("componentDidMount callee")

    this._componentFocused();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    // Actions.Info();
    // console.log('info back button pressed');
    return true;
  }

  render() {
    return (
      // <View>
      <Router>
        {/* <Lightbox> */}
        {/* <Stack key="Tabbar"  panHandlers={null} > */}
        {/* <Stack> */}
        <Scene
          key="TabBar"
          tabs={true}
          tabBarStyle={styles.tabBar}
          default="Main"
          swipeEnabled
          scrollEnabled
          showLabel={true}
          tabBarPosition="top"
          tabStyle={{width: wp('21.1')}}
          labelStyle={{
            fontFamily: 'Proxima Nova',
            width: wp(15),
            height: hp('3'),
          }}
          indicatorStyle={{backgroundColor: '#CC1167', height: hp('0.8')}}
          activeBackgroundColor="white"
          //navBar={MediaNavBar}
          // lazy
          headerMode="screen"
          wrap={false}
          hideNavBar={true}>
          {/* <Stack> */}
          <Scene
            key="Info"
            initial={true}
            component={Info}
            title="INFO"
            onBack={() => {
              Actions.Info();
            }}
            back={true}
          />
          <Scene
            key="Orders"
            component={Orders}
            title="ORDERS"
            onBack={() => {
              Actions.Info();
            }}
            back={true}
          />
          <Scene
            key="Payments"
            component={Payments}
            title="PAYMENTS"
            onBack={() => {
              Actions.Info();
            }}
            back={true}
          />
          <Scene
            key="Assets"
            component={Assets}
            title="ASSETS"
            onBack={() => {
              Actions.Info();
            }}
            back={true}
          />
          <Scene
            key="Surveys"
            component={Surveys}
            title="SURVEYS"
            onBack={() => {
              Actions.Info();
            }}
            back={true}
          />
          <Scene
            key="Schemes"
            component={Schemes}
            title="SCHEMES"
            onBack={() => {
              Actions.Shops();
            }}
            back={true}
          />
          <Scene
            key="Datacards"
            component={Datacards}
            title="Data card"
            onBack={() => {
              Actions.Shops();
            }}
            back={true}
          />
          {/* </Stack> */}
        </Scene>

        {/* </Stack> */}
        {/* </Lightbox>  cx--7 */}
      </Router>
      //   </View>
      // <View>
      // <Text>Hii</Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    backgroundColor: '#221818',
    // borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    // justifyContent:'space-between'
  },
});
