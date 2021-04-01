//packages
import React, {useEffect, Component} from 'react';
import {Platform, CameraRoll} from 'react-native';
import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  Router,
  Scene,
  Actions,
  ActionConst,
  Stack,
  Drawer,
} from 'react-native-router-flux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Root} from 'native-base';
import moment from 'moment';

import Login from './Src/Screens/Login';
import Dashboard from './Src/Screens/Dashboard/Dashboard';

import CreateNewOrderFirst from './Src/Screens/CreateNewOrder/CreateNewOrderFirst';
import CreateNewOrderSecond from './Src/Screens/CreateNewOrder/CreateNewOrderSecond';
import FilterPage from './Src/Screens/CreateNewOrder/FilterPage';
import CreateNewOrderPreview from './Src/Screens/CreateNewOrder/CreateNewOrderPreview';
import ApplicableSchemess from './Src/Screens/CreateNewOrder/ApplicableSchemess';
import AddOutlet from './Src/Screens/CreateNewOrder/AddNewOutlet';

import Splash from './Src/Screens/SplashScreen';
import SideMenu from './Src/components/SideMenu';

import Info from './Src/Screens/Shops/Info';
import Orders from './Src/Screens/Shops/Orders';
import Payments from './Src/Screens/Shops/Payments';
import Assets from './Src/Screens/Shops/Assets';
import Surveys from './Src/Screens/Shops/Surveys';
import meetings from './Src/Screens/Shops/meetings';
import MJP_Start from './Src/Screens/Shops/MJP_Start';
import MJP_CancelShop from './Src/Screens/Shops/MJP_CancelShop';
import Schemes from './Src/Screens/Dashboard/Schemes';
import AddNewShop from './Src/Screens/Shops/AddNewShop';
import AddNewShopSecond from './Src/Screens/Shops/AddNewShopSecond';
import ShopCardView from './Src/Screens/Shops/ShopCardView';
import Shops from './Src/Screens/Shops/Shops';
import ShopDetail from './Src/Screens/Shops/ShopDetail';
import Schemess from './Src/Screens/Shops/Schemes';
import OrderViewDetails from './Src/Screens/Shops/OrderViewDetails';

import PrivacyPolicy from './Src/Screens/DrawerInfo/PrivacyPolicy';
import AboutUs from './Src/Screens/DrawerInfo/AboutUs';

import AssetUpdate from './Src/Screens/Assets/AssetUpdate';
import ScanQRCode from './Src/Screens/Assets/ScanQRCode';
import Manual from './Src/Screens/Assets/Manual';
import AuditExistingAssets from './Src/Screens/Assets/AuditExistingAssets';

import AssetDetailView from './Src/Screens/Shops/AssetDetailView';
import AuditAssetStep2 from './Src/Screens/Assets/AuditAssetStep2';
import AuditAssetStep3 from './Src/Screens/Assets/AuditAssetStep3';
import AssetDiscardTabBar from './Src/Screens/Assets/AssetDiscardTabBar';
import ScanQRCodeForDiscard from './Src/Screens/Assets/ScanQRCodeForDiscard';
import manualForDiscard from './Src/Screens/Assets/manualForDiscard';
import DiscardAssetStep2 from './Src/Screens/Assets/DiscardAssetStep2';
import DiscardAssetStep3 from './Src/Screens/Assets/DiscardAssetStep3';
import AddNewAssetTabBar from './Src/Screens/Assets/AddNewAssetTabBar';
import ScanQRCodeForAddAsset from './Src/Screens/Assets/ScanQRCodeForAddAsset';
import ManualForAddAsset from './Src/Screens/Assets/ManualForAddAsset';
import AddNewAssetStep2 from './Src/Screens/Assets/AddNewAssetStep2';

import AvailableSurveys from './Src/Screens/Surveys/AvailableSurveys';
import SurveysTabBar from './Src/Screens/Surveys/SurveysTabBar';
import History from './Src/Screens/Surveys/History';
import DetailViewSurveyBrowser from './Src/Screens/Surveys/DetailViewSurveyBrowser';
import ServeyHeader from './Src/Screens/Surveys/ServeyHeader';
import sideordernav from './Src/Screens/SideOrder/sideordernav';

import DataCollectionStep1 from './Src/Screens/DataCollection/DataCollectionStep1';
import DataCollectionStep2 from './Src/Screens/DataCollection/DataCollectionStep2';
import DataCollectionStep3 from './Src/Screens/DataCollection/DataCollectionStep3';
import Datacards from './Src/Screens/DataCollection/Datacards';
import ReportsNav from './Src/Screens/Reports/ReportsNav';
import MyReport from './Src/Screens/Reports/MyReport';
import Team from './Src/Screens/Reports/Team';
import DailyActivity from './Src/Screens/Reports/DailyActivity';
import SalesReport from './Src/Screens/Reports/SalesReport';
import OutletPerformance from './Src/Screens/Reports/OutletPerformance';
import TargetVsAchivement from './Src/Screens/Reports/TargetVsAchivement';
import DataUpload from './Src/Screens/Reports/DataUpload';
import OutletVisitReports from './Src/Screens/Reports/OutletVisitReports';
import TargetNavBar from './Src/Screens/Reports/TargetNavBar';
import Month1 from './Src/Screens/Reports/Month1';
import Month2 from './Src/Screens/Reports/Month2';
import Month3 from './Src/Screens/Reports/Month3';
import {color} from 'react-native-reanimated';
import SalesReportTeam from './Src/Screens/Reports/SalesReportTeam';
import TargetVsAchevementTeamGraph from './Src/Screens/Reports/TargetVsAchevementTeamGraph';
import {Manual1} from './Src/Screens/Assets/Manual1';
import sideorder from './Src/Screens/SideOrder/sideorder';
import preorders from './Src/Screens/SideOrder/preorders';
import OrderHistory from './Src/Screens/SideOrder/OrderHistory';
import sideordrDetails from './Src/Screens/SideOrder/sideordrDetails';
import SideorderEdit from './Src/Screens/SideOrder/SideorderEdit';
import sideordermedit from './Src/Screens/SideOrder/sideordermedit';
import sideorderEdittNew from './Src/Screens/SideOrder/sideorderEdittNew';
import editpreview from './Src/Screens/SideOrder/editpreview';
import Activities from './Src/Screens/Reports/Activities';
import MJP_one from './Src/Screens/MJP/MJP_one';
import MJP_two from './Src/Screens/MJP/MJP_two';
import MJP_Cancel from './Src/Screens/MJP/MJP_Cancel';
import ViewDrafts from './Src/Screens/MJP/ViewDrafts';
import ResourceLanding from './Src/Screens/Resources/ResourceLanding';
import ResourceWebView from './Src/Screens/Resources/ResourceWebView';
//Payment module
import Payments1 from './Src/Screens/PaymentModule/Payments1';
import AcceptPayment from './Src/Screens/PaymentModule/AcceptPayment';
import AcceptPayment2 from './Src/Screens/PaymentModule/AcceptPayment2';
import AcceptPayment3 from './Src/Screens/PaymentModule/AcceptPayment3';

var curr = moment()
  .month(new Date().getMonth())
  .format('MMM');
var prev1 = moment()
  .month(new Date().getMonth() - 1)
  .format('MMM');
var prev2 = moment()
  .month(new Date().getMonth() - 2)
  .format('MMM');

export default class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          {/* <Scene key="AuthLoading" component={AuthLoading} title="AuthLoading"  hideNavBar={true}/> */}
          <Scene
            key="Splash"
            component={Splash}
            title="SplashScreen"
            hideNavBar={true}
          />

          <Scene key="Auth" hideNavBar={true}>
            <Scene
              key="login"
              component={Login}
              title="Login"
              hideNavBar={true}
            />
          </Scene>
          <Scene
            key="MJP_one"
            component={MJP_one}
            title="MJP_one"
            hideNavBar={true}
          />
          <Scene
            key="MJP_two"
            component={MJP_two}
            title="MJP_two"
            hideNavBar={true}
          />
          <Scene
            key="MJP_Cancel"
            component={MJP_Cancel}
            title="MJP_Cancel"
            hideNavBar={true}
          />
          <Scene
            key="MJP_Start"
            component={MJP_Start}
            title="MJP_Start"
            hideNavBar={true}
          />
          <Scene
            key="MJP_CancelShop"
            component={MJP_CancelShop}
            title="MJP_CancelShop"
            hideNavBar={true}
          />
           <Scene
                key="ResourceLanding"
                component={ResourceLanding}
                title="ResourceLanding"
                hideNavBar={true}
              />
               <Scene
                key="ResourceWebView"
                component={ResourceWebView}
                title="ResourceWebView"
                hideNavBar={true}
              />
          <Scene
            key="ViewDrafts"
            component={ViewDrafts}
            title="ViewDrafts"
            hideNavBar={true}
          />
          <Scene key="App">
            <Drawer
              hideNavBar
              key="drawerMenu"
              contentComponent={SideMenu}
              drawerWidth={wp('100')}
              drawerPosition="left">
              <Scene key="Dashboard" component={Dashboard} />

              <Scene key="Shops" component={Shops} title="  Shops" />

              <Scene key="AvailableSurveys" component={AvailableSurveys} />
            </Drawer>
            {/* <Scene key="ForgetUserIdOrPass" component={ForgetUserIdOrPass} title="ForgetUserIdOrPass" hideNavBar={true}/> */}
            <Scene
              key="Dashboard"
              component={Dashboard}
              title="Dashboard"
              hideNavBar={true}
            />
            <Scene
              key="CreateNewOrderFirst"
              component={CreateNewOrderFirst}
              title="Create New Order"
              back={false}
            />
            <Scene
              key="CreateNewOrderSecond"
              component={CreateNewOrderSecond}
              title="CreateNewOrderSecond"
              back={false}
            />
            <Scene
              key="CreateNewOrderPreview"
              component={CreateNewOrderPreview}
              title="CreateNewOrderPreview"
              hideNavBar={false}
            />
            <Scene
              key="AddOutlet"
              component={AddOutlet}
              title="AddOutlet"
              back={true}
            />
            <Scene key="FilterPage" component={FilterPage} title="FilterPage" />
            <Scene
              key="ApplicableSchemess"
              component={ApplicableSchemess}
              title="ApplicableSchemess"
            />
            <Scene
              key="login"
              component={Login}
              title="Login"
              hideNavBar={true}
            />
            {/* ////////////// */}
            <Scene key="Shops" component={Shops} title="  Shops" />
            <Scene
              key="AddNewShop"
              component={AddNewShop}
              title="Add New Party"
            />
            <Scene
              key="AddNewShopSecond"
              component={AddNewShopSecond}
              title="Add New Party"
            />
            <Scene
              key="ShopCardView"
              component={ShopCardView}
              title="  Shops"
            />
            <Scene
              key="AssetDetailView"
              component={AssetDetailView}
              title="AssetDetailView"
              hideNavBar={true}
            />

            <Scene
              key="OrderViewDetails"
              component={OrderViewDetails}
              title="Order Details"
            />
            {/* <Scene key="camera" component={cam}  /> */}

            <Scene key="AssetUpdate" component={AssetUpdate} title="Assets" />
            <Scene
              key="AuditAssetStep2"
              component={AuditAssetStep2}
              title="Audit Asset : Step 2/3"
            />
            <Scene
              key="AuditAssetStep3"
              component={AuditAssetStep3}
              title="Audit Asset : Step 3/3"
            />

            <Scene
              key="DiscardAssetStep2"
              component={DiscardAssetStep2}
              title="Discard Asset : Step 2/3"
            />
            <Scene
              key="DiscardAssetStep3"
              component={DiscardAssetStep3}
              title="Discard Asset : Step 3/3"
            />

            <Scene
              key="AddNewAssetStep2"
              component={AddNewAssetStep2}
              title="Add Asset : Step 3/3"
            />

            <Scene
              key="DetailViewSurveyBrowser"
              component={DetailViewSurveyBrowser}
              title="Survey Name"
              navBar={ServeyHeader}
            />

            <Scene key="AboutUs" component={AboutUs} title="AboutUs" />
            <Scene
              key="PrivacyPolicy"
              component={PrivacyPolicy}
              title="PrivacyPolicy"
            />

            <Scene
              key="Manual1"
              component={Manual1}
              title="Manual1"
              hideNavBar={true}
            />

            <Scene
              key="TabBar"
              tabs={true}
              tabBarStyle={styles.tabBar}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('21.1')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(18),
                height: hp('3'),
              }}
              indicatorStyle={{backgroundColor: '#CC1167', height: hp('0.8')}}
              activeBackgroundColor="white"
              // lazy

              navBar={ShopDetail}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="Info"
                initial={true}
                component={Info}
                title="INFO"
                hideNavBar={true}
              />
              <Scene
                key="Orders"
                component={Orders}
                title="ORDERS"
                hideNavBar={true}
              />
              <Scene
                key="Payments"
                component={Payments}
                title="PAYMENTS"
                hideNavBar={true}
              />
              <Scene
                key="Assets"
                component={Assets}
                title="ASSETS"
                hideNavBar={true}
              />
              <Scene
                key="Surveys"
                component={Surveys}
                title="SURVEYS"
                hideNavBar={true}
              />
              <Scene
                key="Schemes"
                component={Schemess}
                title="SCHEMES"
                hideNavBar={true}
              />
              <Scene
                key="meetings"
                component={meetings}
                title="meetings"
                hideNavBar={true}
              />
            </Scene>

            {/* Tab Bar for Audit Asset */}
            <Scene
              key="TabBarScanQRManual"
              tabs={true}
              tabBarStyle={styles.TabBarScanQRManual}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('50')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(30),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#FFFFFF',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              navBar={AuditExistingAssets}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="ScanQRCode"
                initial={true}
                component={ScanQRCode}
                title="ScanQRCode"
                hideNavBar={true}
              />
              <Scene
                key="Manual"
                component={Manual}
                title="Manual"
                hideNavBar={true}
              />
            </Scene>

            {/* Tab Bar for Discard Asset */}
            <Scene
              key="TabBarDiscardAsset"
              tabs={true}
              tabBarStyle={styles.TabBarDiscardAsset}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('50')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(30),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#FFFFFF',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              // lazy
              navBar={AssetDiscardTabBar}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="ScanQRCodeForDiscard"
                initial={true}
                component={ScanQRCodeForDiscard}
                title="Scan QR Code "
                hideNavBar={true}
              />
              <Scene
                key="manualForDiscard"
                component={manualForDiscard}
                title="Manual"
                hideNavBar={true}
              />
            </Scene>

            {/* Tab Bar for Add New Asset */}
            <Scene
              key="AddNewAssetTabBar"
              tabs={true}
              tabBarStyle={styles.AddNewAssetTabBar}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('50')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(30),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#FFFFFF',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              // lazy
              navBar={AssetDiscardTabBar}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="ScanQRCodeForAddAsset"
                initial={true}
                component={ScanQRCodeForAddAsset}
                title="Scan QR Code "
                hideNavBar={true}
              />
              <Scene
                key="ManualForAddAsset"
                component={ManualForAddAsset}
                title="Manual"
                hideNavBar={true}
              />
            </Scene>

            {/* Tab bar for Surveys */}
            <Scene
              key="TabBarSurveys"
              tabs={true}
              tabBarStyle={styles.TabBarSurveys}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('50')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(35),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#CC1167',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              // lazy
              navBar={SurveysTabBar}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="AvailableSurveys"
                initial={true}
                component={AvailableSurveys}
                title="Available Surveys"
                hideNavBar={true}
              />
              <Scene
                key="History"
                component={History}
                title="History"
                hideNavBar={true}
              />
            </Scene>

            <Scene
              key="DataCollectionStep1"
              component={DataCollectionStep1}
              title="Data Collection : Step 1/3"
            />
            <Scene
              key="DataCollectionStep2"
              component={DataCollectionStep2}
              title="Data Collection : Step 2/3"
            />
            <Scene
              key="DataCollectionStep3"
              component={DataCollectionStep3}
              title="Data Collection : Step 3/3"
            />
            <Scene key="Datacards" component={Datacards} title="Data Cards" />

            <Scene
              key="TabBarReports"
              tabs={true}
              tabBarStyle={styles.TabBarScanQRManual}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('50')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(30),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#a10d59',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              navBar={ReportsNav}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="My Report"
                initial={true}
                component={MyReport}
                title="My Reports"
                hideNavBar={true}
              />
              <Scene
                key="Team"
                component={Team}
                title="Team"
                hideNavBar={true}
              />
            </Scene>
            <Scene
              key="DailyActivity"
              component={DailyActivity}
              title="DailyActivity"
            />
            <Scene
              key="SalesReport"
              component={SalesReport}
              title="SalesReport"
            />
            <Scene
              key="OutletPerformance"
              component={OutletPerformance}
              title="OutletPerformance"
            />
            <Scene
              key="TargetVsAchivement"
              component={TargetVsAchivement}
              title="TargetVsAchivement"
            />
            <Scene key="DataUpload" component={DataUpload} title="DataUpload" />
            <Scene
              key="OutletVisitReports"
              component={OutletVisitReports}
              title="OutletVisitReports"
            />
            <Scene
              key="SalesReportTeam"
              component={SalesReportTeam}
              title="SalesReportTeam"
            />
            <Scene
              key="TargetVsAchevementTeamGraph"
              component={TargetVsAchevementTeamGraph}
              title="TargetVsAchevementTeamGraph"
            />
            <Scene
              key="SideorderEdit"
              component={SideorderEdit}
              title="SideorderEdit"
            />
            <Scene
              key="sideordrDetails"
              component={sideordrDetails}
              title="sideordrDetails"
            />
            <Scene
              key="sideordermedit"
              component={sideordermedit}
              title="sideordermedit"
            />
            <Scene
              key="sideorderEdittNew"
              component={sideorderEdittNew}
              title="sideorderEdittNew"
            />
            <Scene
              key="editpreview"
              component={editpreview}
              title="editpreview"
            />
            <Scene key="Activities" component={Activities} title="Activities" />

            {/* <Scene
              key="sideorder"
              tabs={true}
              tabBarStyle={styles.TabBarSurveys}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('50')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(35),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#CC1167',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              // lazy
              navBar={sideordernav}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="sideorder"
                component={sideorder}
                title="IN-PROCESS"
                hideNavBar={true}
              />
              <Scene
                key="preorders"
                component={History}
                title="PRE-OREDERS"
                hideNavBar={true}
              />
             
            </Scene> */}

            <Scene
              key="siderorderTab"
              tabs={true}
              tabBarStyle={styles.TabBarSurveys}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('35')}}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(35),
                height: hp('3'),
              }}
              indicatorStyle={{
                backgroundColor: '#CC1167',
                height: hp('0.5'),
                alignSelf: 'center',
              }}
              activeBackgroundColor="white"
              // lazy
              navBar={sideordernav}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="sideorder"
                component={sideorder}
                title="IN-PROCESS"
                hideNavBar={true}
              />
              <Scene
                key="preorders"
                component={preorders}
                title="PRE-ORDERS"
                hideNavBar={true}
              />
              <Scene
                key="OrderHistory"
                component={OrderHistory}
                title="HISTORY"
                hideNavBar={true}
              />
              {/* <Scene key='History' component={History} title='HISTORY' hideNavBar={true} /> */}
            </Scene>

            <Scene
              key="TabBarTargetAchi"
              tabs={true}
              tabBarStyle={styles.TabBarSurveys1}
              default="Main"
              hideNavBar={false}
              swipeEnabled
              scrollEnabled
              showLabel={true}
              tabBarPosition="top"
              tabStyle={{width: wp('35')}}
              activeTintColor={'#362828'}
              labelStyle={{
                fontFamily: 'Proxima Nova',
                width: wp(30),
                height: hp('3'),
                color: '#362828',
                backgroundColor: 'transparent',
              }}
              indicatorStyle={{
                backgroundColor: '#362828',
                height: 2,
                color: '#362828',
                alignSelf: 'center',
              }}
              activeBackgroundColor="red"
              // lazy
              navBar={TargetNavBar}
              headerMode="screen"
              wrap={false}>
              <Scene
                key="Month1"
                initial={true}
                component={Month1}
                title={curr}
                hideNavBar={true}
              />
              <Scene
                key="Month2"
                component={Month2}
                title={prev1}
                hideNavBar={true}
              />
              <Scene
                key="Month3"
                component={Month3}
                title={prev2}
                hideNavBar={true}
              />
            </Scene>
          </Scene>

          <Scene key="Payments1" component={Payments1} hideNavBar={true} />
          <Scene
            key="AcceptPayment"
            component={AcceptPayment}
            hideNavBar={true}
          />
          <Scene
            key="AcceptPayment2"
            component={AcceptPayment2}
            hideNavBar={true}
          />
          <Scene
            key="AcceptPayment3"
            component={AcceptPayment3}
            hideNavBar={true}
          />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#221818',
  },
  navBarTitle: {
    color: '#FFFFFF',
  },
  barButtonTextStyle: {
    color: '#FFFFFF',
  },
  barButtonIconStyle: {
    tintColor: '#FFFFFF',
  },

  tabBar: {
    // marginTop:hp('30'),
    backgroundColor: '#221818',
  },

  TabBarAuditAsset: {
    backgroundColor: 'grey',
  },

  TabBarSurveys: {
    // marginTop:hp('30'),
    backgroundColor: '#221818',
  },
  TabBarSurveys1: {
    // marginTop:hp('30'),
    backgroundColor: 'white',
    color: 'white',
    //marginLeft:hp('2'),marginRight:hp('2')
  },

  TabBarDiscardAsset: {
    backgroundColor: '#796A6A',
  },

  AddNewAssetTabBar: {
    backgroundColor: '#796A6A',
  },
  TabBarScanQRManual: {
    // marginTop:hp('30'),
    backgroundColor: '#796A6A',
  },
});
