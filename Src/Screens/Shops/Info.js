import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
  PermissionsAndroid,
  BackHandler,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {FAB, Portal, Provider} from 'react-native-paper';
import {FloatingAction} from 'react-native-floating-action';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {ActionSheet, Root} from 'native-base';
import {
  TOTAL_SHOPS,
  SHOP_INFO,
  SHOP_VISITED_TODAY,
} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Database from './../../utility/Database';
import User from './../../utility/User';
const db = new Database();
var open;
var curentDatetime;

const actions = [
  {
    text: 'Create New Order',
    color: 'transperent',
    name: 'bt_create',
    position: 2,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 10},
    buttonSize: 0,
  },
  {
    text: 'Accept Payment',
    color: 'transperent',
    name: 'bt_payment',
    position: 3,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 15},
    buttonSize: 0,
  },
  {
    text: 'Take A Survey',
    color: 'transperent',
    name: 'bt_survey',
    position: 4,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 22},
    buttonSize: 0,
  },
  {
    text: 'Audit Assets',
    color: 'transperent',
    name: 'bt_assets',
    position: 1,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
  {
    text: 'Data Collection',
    color: 'transperent',
    name: 'bt_dc',
    position: 1,
    textColor: 'black',
    textStyle: {fontSize: 14, fontWeight: 'bold', marginHorizontal: 25},
    buttonSize: 0,
  },
];
var outletId = '';
var InfoString = '';
var shop = '';
var NewPartyImageDetails = [];
var Latitude,
  Longitude,
  RegisterOn,
  Owner,
  Contact,
  ShopType,
  RegistrationNo,
  ShopId,
  ContactPerson,
  ShopArea,
  Address;
export class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShopName: '',
      Area: '',
      Address: '',
      Contact: '',
      Latitude: '',
      Longitude: '',
      RegisterOn: '',
      Owner: '',
      MobileNo: '',
      ShopType: '',
      RegistrationNo: '',
      ShopId: '',
      ContactPerson: '',
      hasMapPermission: true,
      userLatitude: 0,
      userLongitude: 0,
      totalVisited: '',
      active: false,
      newPartyImagedetails1: [],
      newPartyImagedetails: [],
      fileList: [],
    };

    //  alert(this.props.shopId)
    this.props.navigation.setParams({
      shopId: this.props.shopId,
    });

    //  [{"ShopArea":"","ContactPerson":"Abc","ShopId":"12","RegistrationNo":"Yshdhdd","ShopType":"",
    //"MobileNo":"9767296769","RegisteredOn":"2020-7-7 15:59:25","Longitude":"73.810024","Latitude":"18.4942002",
    //"Outlet_Info":"Zbxjd","Party":"Rajani","id":"772020155925"}]
    db.getOutletInfo(this.props.shopId).then(data => {
      //console.log("my data==",JSON.stringify(data))
      for (var i = 0; i < data.length; i++) {
        Latitude = data[0].Latitude;
        Longitude = data[0].Longitude;
        ShopArea = data[0].ShopArea;
        Address = data[0].Outlet_Info;
        Contact = data[0].MobileNo;
        Owner = data[0].Owner;
        RegisterOn = data[0].RegisteredOn;
        RegistrationNo = data[0].RegistrationNo;
        ShopType = data[0].ShopType;
        ShopId = data[0].ShopId;
        ContactPerson = data[0].ContactPerson;
        shop = data[0].Party;
        InfoString = data[0].Outlet_Info;
        //console.log("Sras==",data[0].Outlet_Info)
      }
      if (InfoString.includes('||')) {
        var nameArr = InfoString.split('||');
        var Areas = InfoString.split('||')[0];
        var Addresss = InfoString.split('||')[1];
        var Contacts = InfoString.split('||')[2];
        // alert(Addresss)
        //console.log(Addresss)
        this.props.saveShopInfo(
          Areas,
          shop,
          Addresss,
          Contacts,
          this.props.shopId,
        );
        AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
        this.setState({ShopName: shop});
        this.setState({Area: Areas});
        this.setState({Address: Addresss});
        this.setState({Contact: Contacts});
      } else {
        this.setState({
          ShopName: shop,
          Area: ShopArea,
          Address: Address,
          Contact: Contact,
          Owner: Owner,
          RegisterOn: RegisterOn,
          RegistrationNo: RegistrationNo,
          ShopType: ShopType,
          ShopId: ShopId,
          ContactPerson: ContactPerson,
        });
        this.props.saveShopInfo(
          this.state.Area,
          shop,
          this.state.Address,
          this.state.Contact,
          this.props.shopId,
        );
        AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
      }
      // var nameArr = InfoString.split('||');
      // var Areas=InfoString.split('||')[0]
      // var Addresss=InfoString.split('||')[1]
      // var Contacts=InfoString.split('||')[2]
      // // alert(Addresss)
      // //console.log(Addresss)
      // this.props.saveShopInfo(Areas,shop,Addresss,Contacts,this.props.shopId)
      // this.setState({ShopName:shop})
      // this.setState({Area:Areas})
      // this.setState({Address:Addresss})
      // this.setState({Contact:Contacts})
    });
  }

  async requestFineLocation() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getUserPosition();
        } else {
          this.requestFineLocation();
        }
      } else {
        this.getUserPosition();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async getUserPosition() {
    this.setState({hasMapPermission: true});
    // this.locationWatchId = Geolocation.getCurrentPosition(
    Geolocation.getCurrentPosition(pos => {
      //alert(pos.coords.latitude)
      this.setState({
        userLatitude: pos.coords.latitude,
        userLongitude: pos.coords.longitude,
      });
      console.log(
        this.state.userLatitude + ' long : ' + this.state.userLongitude,
      );
      Geocoder.init('AIzaSyA2z_MFnYb-A_V2YXjxl7gzZ4I9eOEWmBM');
      Geocoder.from(pos.coords.latitude, pos.coords.longitude)
        .then(json => {
          console.log('Geocode : ' + json);
          var addressComponent = json.results[0].address_components;
        })
        .catch(error => console.log(error));
      //console.log(this.state.userLatitude)
    });
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    //console.log("componentDidMount callee")
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

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
  //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  _componentFocused = () => {
    this.requestFineLocation();
    AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
    //    db.getOutletInfo(this.props.shopId).then((data) => {
    //      //console.log("my data==+==========================================================",JSON.stringify(data))
    //     for(var i=0;i<data.length;i++){
    //         shop=data[0].Party
    //      InfoString=data[0].Outlet_Info

    //     }

    // var nameArr = InfoString.split('||');
    // var Areas=InfoString.split('||')[0]
    // var Addresss=InfoString.split('||')[1]
    // var Contacts=InfoString.split('||')[2]
    // // alert(Addresss)
    // //console.log(Contacts)

    // this.props.saveShopInfo(Areas,shop,Addresss,Contacts,this.props.shopId)
    // this.setState({ShopName:shop})
    // this.setState({Area:Areas})
    // this.setState({Address:Addresss})
    // this.setState({Contact:Contacts})
    // })

    db.getOutletInfo(this.props.shopId).then(data => {
      //console.log("my data==",JSON.stringify(data))
      for (var i = 0; i < data.length; i++) {
        Latitude = data[0].Latitude;
        Longitude = data[0].Longitude;
        ShopArea = data[0].ShopArea;
        Address = data[0].Outlet_Info;
        Contact = data[0].MobileNo;
        Owner = data[0].Owner;
        RegisterOn = data[0].RegisteredOn;
        RegistrationNo = data[0].RegistrationNo;
        ShopType = data[0].ShopType;
        ShopId = data[0].ShopId;
        ContactPerson = data[0].ContactPerson;
        shop = data[0].Party;
        InfoString = data[0].Outlet_Info;
        //console.log("Sras==",data[0].Outlet_Info)
      }
      if (InfoString.includes('||')) {
        var nameArr = InfoString.split('||');
        var Areas = InfoString.split('||')[0];
        var Addresss = InfoString.split('||')[1];
        var Contacts = InfoString.split('||')[2];
        // alert(Addresss)
        //console.log(Addresss)
        this.props.saveShopInfo(
          Areas,
          shop,
          Addresss,
          Contacts,
          this.props.shopId,
        );
        AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
        this.setState({ShopName: shop});
        this.setState({Area: Areas});
        this.setState({Address: Addresss});
        this.setState({Contact: Contacts});
      } else {
        this.setState({
          ShopName: shop,
          Area: ShopArea,
          Address: Address,
          Contact: Contact,
          Owner: Owner,
          RegisterOn: RegisterOn,
          RegistrationNo: RegistrationNo,
          ShopType: ShopType,
          ShopId: ShopId,
          ContactPerson: ContactPerson,
        });
        this.props.saveShopInfo(
          this.state.Area,
          shop,
          this.state.Address,
          this.state.Contact,
          this.props.shopId,
        );
        AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
      }
      // this.state.newPartyImagedetails = [];
      NewPartyImageDetails = [];
      db.getNewPartyImageDetailForInfo(this.props.shopId).then(data => {
        console.log('new party len : ' + data.length);
        if (data.length > 0) {
          //  this.setState({newPartyImagedetails1: data});
          console.log('new party : ' + JSON.stringify(data));

          data.map((item, key) => {
            var bytess;
            this.state.newPartyImagedetails = [];
            console.log('image path : ' + item.ImagePath);
            RNFS.readFile(item.ImagePath, 'base64').then(res => {
              bytess = res;
              this.state.newPartyImagedetails.push({
                data: bytess,
              });
              NewPartyImageDetails = this.state.newPartyImagedetails;
              console.log(
                'new party Images base 64 : ' +
                  JSON.stringify(NewPartyImageDetails),
              );
            });
          });
        }
      });
      // var nameArr = InfoString.split('||');
      // var Areas=InfoString.split('||')[0]
      // var Addresss=InfoString.split('||')[1]
      // var Contacts=InfoString.split('||')[2]
      // // alert(Addresss)
      // //console.log(Addresss)
      // this.props.saveShopInfo(Areas,shop,Addresss,Contacts,this.props.shopId)
      // this.setState({ShopName:shop})
      // this.setState({Area:Areas})
      // this.setState({Address:Addresss})
      // this.setState({Contact:Contacts})
    });

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var datess = year + '-' + month + '-' + date;
  };

  onClickAddImage = () => {
    const BUTTONS = ['Take photo', 'Choose', 'cancel'];
    ActionSheet.show(
      {options: BUTTONS, cancelButtonIndex: 2, title: 'select photo'},
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
            break;

          case 1:
            this.takePhotoFromLibrary();
            break;
          default:
            break;
        }
      },
    );
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      // cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      this.onSelectedImage(image);
      //console.log(image);
    });
  };

  takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // cropping: true
      //  includeBase64 : true
      compressImageQuality: 0.5,
    }).then(image => {
      this.onSelectedImage(image);
      //console.log(image);
    });
  };

  onSelectedImage = image => {
    let newDataImg = this.state.fileList;
    const source = {uri: image.path};
    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
    };
    newDataImg.push(item);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    curentDatetime =
      year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
    var currentDateTimeFilename = curentDatetime + '.jpg';
    db.insertNewPartyImages(
      this.props.shopId,
      'N',
      currentDateTimeFilename,
      item.url.uri,
    );
    this.setState({fileList: newDataImg});
  };

  renderItem = ({item, indx}) => {
    //console.log("urlopf images=",JSON.stringify(this.state.fileList))
    return (
      <View>
        <Image style={styles.imagesFrompHOTO} source={item.url} />
      </View>
    );
  };

  showPhoto() {
    let {content} = styles;
    let {fileList} = this.state;
    return (
      <Root>
        <View>
          <FlatList
            horizontal={true}
            data={fileList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          />
        </View>
      </Root>
    );
  }

  _renderViewForImages() {
    // if(NewPartyImageDetails.length > 0){
    return NewPartyImageDetails.map((item, i) => {
      return (
        <Image
          style={styles.horiImageStyles}
          source={{uri: `data:image/jpeg;base64,${item.data}`}}
        />
      );
    });
  }

  render() {
    const {userLatitude, userLongitude} = this.state;

    let polyline = null;
    let marker = null;
    var base64Icon =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

    marker = (
      <Marker
        coordinate={{
          latitude: this.state.userLatitude,
          longitude: this.state.userLongitude,
        }}
        style={{
          height: 50,
          width: 50,
        }}
      />
    );
    return (
      <View>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={styles.backgroundImgStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Horizontal Images */}
            <View>
              {NewPartyImageDetails.length > 0 ? (
                <View style={styles.horiImagesMainContainer}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this._renderViewForImages()}
                  </ScrollView>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp('2'),
                    marginLeft: wp('4'),
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginTop: hp('7'),
                      }}>
                      <TouchableOpacity onPress={this.onClickAddImage}>
                        <Image
                          style={{height: hp('7'), width: wp('12')}}
                          source={require('../../assets/Icons/Add_Images.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      {this.showPhoto()}
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Address */}
            <View>
              <View style={styles.addressMainContainer}>
                <Text style={styles.addressHeaderTextStyle}>ADDRESS</Text>

                <Text style={styles.addressTextStyle}>
                  {this.state.Address}
                </Text>

                {/* <Text style={styles.addressTextStyle}>
                        Pincode: 411 055
                    </Text> */}

                <View style={styles.mapImgStyle}>
                  <MapView
                    ref={this.map}
                    showsUserLocation
                    followsUserLocation
                    style={styles.map}
                    region={{
                      latitude: userLatitude,
                      longitude: userLongitude,

                      // latitude: 18.499880,
                      // longitude: 73.810669,
                      latitudeDelta: 0.2,
                      longitudeDelta: 0.2,
                    }}>
                    {marker}
                  </MapView>
                </View>
                {/* <Image  style={styles.mapImgStyle}
                                            source = {require('../../assets/Icons/MapImg2.png')}
                    /> */}
                <TouchableOpacity>
                  <Text style={styles.navigateTextStyle}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Owner Details */}
            <View>
              <View style={styles.ownerDetailMainContainer}>
                {/* Owner */}
                <View style={styles.ownerColumnContainer}>
                  <Text style={styles.ownerHeaderTextStyles}>OWNER</Text>
                  <Text style={styles.ownerNameTextStyle}>
                    {this.state.Owner}
                  </Text>
                </View>
                {/* Middle Line */}
                <View style={styles.middleLineStyle} />
                {/* Mob No. */}
                <View style={styles.mobNoMainContainer}>
                  <View style={styles.mobNoInnerContainer}>
                    <Text style={styles.mobNoTextStyle}>
                      {this.state.Contact}
                    </Text>
                  </View>
                  <View style={styles.messageColumnContainer}>
                    <TouchableOpacity>
                      <Text style={styles.messageTextStyle}>Message</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.callColumnContainer}>
                    <TouchableOpacity>
                      <Text style={styles.callTextStyle}>Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Middle Line */}
                <View style={styles.middleLineStyle} />
                {/* owner's email  */}
                {/* <Text style={styles.emailTextStyle}>
                            Owneremail@gmail.com
                    </Text> */}
              </View>
            </View>

            {/* Conract Person */}
            <View>
              <View style={styles.contactPersonMainContainer}>
                {/* Contact Person */}
                <View style={styles.contactPersonColumnContainer}>
                  <Text style={styles.contactPersonTextStyle}>
                    Contact Person
                  </Text>
                  <Text style={styles.contactPersonNameStyle}>
                    {this.state.ContactPerson}
                  </Text>
                </View>
                {/* Middle Line */}
                <View style={styles.middleLineStyle} />
                {/* Mob No. */}
                <View style={styles.CPMobNoMainContainer}>
                  <View style={styles.CPMobInnerContainer}>
                    <Text style={styles.CPMobNoTextStyle}>
                      {this.state.Contact}
                    </Text>
                  </View>
                  <View style={styles.CPMessageContainer}>
                    <TouchableOpacity>
                      <Text style={styles.CPMessageTextStyle}>Message</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.CPCallContainer}>
                    <TouchableOpacity>
                      <Text style={styles.CPCallTextStyle}>Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Registration View */}
            <View>
              <View style={styles.registrationMainContainer}>
                {/* Registration no */}
                <View style={styles.regiNoRowContainer}>
                  <View style={styles.regNoColContainer}>
                    <Text style={styles.regNoTextStyle}>REGISTRATION NO.</Text>
                    <Text style={styles.regNameTextStyle}>
                      {this.state.RegistrationNo}
                    </Text>
                  </View>
                  <View style={styles.shopIdColContainer}>
                    <Text style={styles.shopIdTextContainer}>SHOP ID</Text>
                    <Text style={styles.shopNameTextStyle}>
                      {this.state.ShopId}
                    </Text>
                  </View>
                </View>
                {/* Middle Line */}
                <View style={styles.middleLineStyle} />
                {/* Shop Area */}
                <View style={styles.shopAreaRowContainer}>
                  <View style={styles.shopAreaColContainer}>
                    <Text style={styles.areaHeaderTextContainer}>
                      SHOP AREA
                    </Text>
                    <Text style={styles.areaCountTextStyle}>
                      {this.state.Area}
                    </Text>
                  </View>
                  <View style={styles.typeColContainer}>
                    <Text style={styles.typeHeaderTextStyle}>TYPE</Text>
                    <Text style={styles.typeTextStyle}>
                      {this.state.ShopType}
                    </Text>
                  </View>
                </View>
                {/* Registered On */}
                <View style={styles.regOnColContainer}>
                  <Text style={styles.regOnHeaderStyle}>REGISTERED ON</Text>
                  <Text style={styles.regOnDateTextStyle}>
                    {this.state.RegisterOn}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{height: hp('10')}} />
          </ScrollView>

          <FloatingAction
            open={open}
            color="#a10d59"
            actions={actions}
            buttonSize={hp('9.5')}
            floatingIcon={
              this.state.active == false
                ? require('../../assets/Icons/Floating.png')
                : require('../../assets/Icons/FAB_Close_Menu.png')
            }
            iconWidth={wp(20)}
            iconHeight={hp(16)}
            // iconWidth={wp(5)}
            // iconHeight={hp(3)}
            shadow="null"
            overlayColor="#221818"
            showBackground={true}
            onPressItem={name => {
              if (name == 'bt_assets') {
                Actions.AssetUpdate();
                this.setState({
                  active: !this.state.active,
                });
              } else if (name == 'bt_dc') {
                AsyncStorage.setItem('beatId', '');
                AsyncStorage.setItem('distributorName', '');
                AsyncStorage.setItem('SearchString', '');

                User.FlagForNavigation = 'Info';
                Actions.DataCollectionStep1();
                this.setState({
                  active: !this.state.active,
                });
              } else if (name == 'bt_create') {
                // AsyncStorage.setItem('outletName', "");
                //  AsyncStorage.setItem('outletId', "");
                // AsyncStorage.setItem('beatName', "");
                AsyncStorage.setItem('beatId', '');
                AsyncStorage.setItem('distributorName', '');
                AsyncStorage.setItem('SearchString', '');

                User.FlagForNavigation = 'Info';
                Actions.CreateNewOrderFirst();
                this.setState({
                  active: !this.state.active,
                });
              } else if (name == 'bt_survey') {
                Actions.AssetUpdate();
                this.setState({
                  active: !this.state.active,
                });
              }
            }}
            onPressMain={() => {
              if (this.state.active == false) {
                this.setState({
                  active: !this.state.active,
                });
                //  BackHandler.addEventListener('hardwareBackPress', () => Actions.TabBar());
              } else {
                this.setState({
                  active: !this.state.active,
                });
              }
            }}
            onPressBackdrop={() => {
              if (this.state.active == false) {
                this.setState({
                  active: !this.state.active,
                });
                //BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
              } else {
                this.setState({
                  active: !this.state.active,
                });
              }
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    shops: state.shops,
  };
};
const mapDispatchToProps = dispatch => ({
  saveShopInfo: (Areas, shop, Addresss, Contacts, shopId) => {
    dispatch(SHOP_INFO(Areas, shop, Addresss, Contacts, shopId));
  },
  shopVisited: visiteds => {
    dispatch(SHOP_VISITED_TODAY(visiteds));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Info);

const styles = StyleSheet.create({
  backgroundImgStyle: {
    // height:hp('163'),
    width: wp('100'),
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  horiImagesMainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',
    justifyContent: 'center',
    alignSelf: 'center',
    height: hp('26'),
    width: wp('100'),
    marginBottom: hp('1'),
  },

  horiImageStyles: {
    marginLeft: hp('3'),
    marginBottom: hp('0.5'),
    height: hp('20'),
    width: wp('40'),
    borderRadius: wp('2'),
  },

  addressMainContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginBottom: hp('1'),
    borderColor: '#E6DFDF',
    height: hp('49'),
    width: wp('100'),
  },

  addressHeaderTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('3'),
  },

  addressTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginLeft: wp('6'),
    marginTop: hp('1'),
    marginRight: hp('1'),
  },

  mapImgStyle: {
    height: hp('25'),
    width: wp('88'),
    marginTop: hp('2'),
    borderRadius: wp('2'),
    alignSelf: 'center',
  },

  navigateTextStyle: {
    color: '#3955CB',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('2'),
    alignSelf: 'center',
  },

  ownerDetailMainContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginBottom: hp('1'),
    borderColor: '#E6DFDF',
    height: hp('28'),
    width: wp('100'),
  },

  ownerColumnContainer: {
    flexDirection: 'column',
  },

  ownerHeaderTextStyles: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('3'),
  },

  ownerNameTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginLeft: wp('6'),
    marginTop: hp('1'),
  },

  middleLineStyle: {
    width: wp('90'),
    borderBottomColor: '#E6DFDF',
    borderBottomWidth: wp('0.5'),
    alignSelf: 'center',
    marginTop: hp('2.5'),
  },

  mobNoMainContainer: {
    flexDirection: 'row',
    marginTop: hp('3'),
  },

  mobNoInnerContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  mobNoTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginLeft: wp('6'),
  },

  messageColumnContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  messageTextStyle: {
    color: '#3955CB',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
  },

  callColumnContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  callTextStyle: {
    color: '#3955CB',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginRight: wp('8'),
  },

  emailTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginLeft: wp('6'),
    marginTop: hp('2.5'),
  },

  contactPersonMainContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginBottom: hp('1'),
    borderColor: '#E6DFDF',
    height: hp('20'),
    width: wp('100'),
  },

  contactPersonColumnContainer: {
    flexDirection: 'column',
  },

  contactPersonTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('3'),
  },

  contactPersonNameStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginLeft: wp('6'),
    marginTop: hp('1'),
  },

  CPMobNoMainContainer: {
    flexDirection: 'row',
    marginTop: hp('3'),
  },

  CPMobInnerContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  CPMobNoTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginLeft: wp('6'),
  },

  CPMessageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  CPMessageTextStyle: {
    color: '#3955CB',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
  },

  CPCallContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  CPCallTextStyle: {
    color: '#3955CB',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginRight: wp('8'),
  },

  registrationMainContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginBottom: hp('1'),
    borderColor: '#E6DFDF',
    height: hp('33'),
    width: wp('100'),
  },

  regiNoRowContainer: {
    flexDirection: 'row',
  },

  regNoColContainer: {
    flexDirection: 'column',
  },

  regNoTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('3'),
    marginLeft: wp('6%'),
  },

  regNameTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
    marginLeft: wp('6%'),
  },

  shopIdColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  shopIdTextContainer: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('3'),
  },

  shopNameTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
    marginRight: wp('5'),
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  shopAreaRowContainer: {
    flexDirection: 'row',
  },

  shopAreaColContainer: {
    flexDirection: 'column',
  },

  areaHeaderTextContainer: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('3'),
    marginLeft: wp('6%'),
  },

  areaCountTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
    marginLeft: wp('6%'),
  },

  typeColContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  typeHeaderTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('2.5'),
    marginLeft: wp('8'),
  },

  typeTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
    marginLeft: wp('20'),
  },

  regOnColContainer: {
    flexDirection: 'column',
  },

  regOnHeaderStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginTop: hp('3'),
    marginLeft: wp('6%'),
  },

  regOnDateTextStyle: {
    color: '#362828',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
    marginLeft: wp('6%'),
  },
  imagesFrompHOTO: {
    height: hp('18'),
    width: wp('40'),
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2'),
    marginTop: hp('1'),
  },
});
