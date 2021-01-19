import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {Dropdown} from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import RNFS from 'react-native-fs';
import {
  ASSET_INFO,
  ASSET_INFO_FLAG,
  QR_CODE,
} from '../../Redux/actions/AssetsAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
const db = new Database();

const data = [
  {
    value: 'Working',
  },
  {
    value: 'Not Working',
  },
];

var AuditDate = '';
export class AuditAssetStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      remark: [],
      userLatitude: 0,
      userLongitude: 0,
      hasMapPermission: '',
      condition: '',
    };
  }
  static navigationOptions = {
    title: 'Audit Asset : Step 3/3',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      marginLeft: wp('-1.5'),
      fontSize: 12,
      fontWeight: 'bold',
    },

    headerLeft: (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => Actions.ScanQRCode()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };
  componentWillMount() {
    console.log('ggggggggggggggggggggggg', this.props.AssetID);
    db.checkQrCodeDataInDb(this.props.AssetID).then(data => {
      console.log('lllllllllll', data);
    });
    this.requestFineLocation();
  }

  remarkChangeHandler(text) {
    this.setState({remark: text});
  }
  onSelectedCondition = value => {
    //alert(value)
    this.setState({condition: value});
  };

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

    Geolocation.getCurrentPosition(pos => {
      this.setState({
        userLatitude: pos.coords.latitude,
        userLongitude: pos.coords.longitude,
      });
    });
  }

  submitClickHandler() {
    var app_order_id = '';
    var currentDateTime = '';
    var currentDateTimeFilename = '';

    if (this.state.remark.length > 0) {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      currentDateTime =
        year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec;
      //console.log("current datetime=", currentDateTime)
      app_order_id =
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
      app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, '');
      var date =
        year + '-' + month + '-' + date + 'T' + hours + ':' + min + ':' + sec;
      currentDateTimeFilename = currentDateTime + '.jpg';

      var datess = year + '-' + month + '-' + date;
      //var  newDate = moment(datess, 'yyyy-MM-dd').format('yyyy-MMM-dd')
      var newDate = moment().format('YYYY-MMM-DD');
      AuditDate = moment().format('DD-MMM-YYYY');
      for (let i = 0; i < this.state.fileList.length; i++) {
        db.insertImagesDetails(
          app_order_id,
          currentDateTime,
          currentDateTimeFilename,
          this.state.fileList[i].url.uri,
          'N',
        );
      }
      db.inserOrderMasterEntryForAsset(
        app_order_id,
        currentDateTime,
        '1',
        this.props.shops.shopId,
        this.state.userLatitude,
        this.state.userLongitude,
        '',
        '',
        '',
        '5',
        this.props.dashboard.userId,
        '',
        1,
        'N',
        newDate,
        '',
        '',
      );
      db.insertAssetData(
        app_order_id,
        this.props.assets.assetID,
        this.props.assets.assetQRcode,
        this.props.assets.Scan_status_flags,
        '',
        this.state.remark,
        this.state.condition,
        AuditDate,
      ).then(data => {
        Actions.Info();
      });
    } else {
      alert('Please write remark');
    }
  }

  cancelClickHandler() {
    this.props.assetsInfoFlag('', '');
    this.props.qrcode('');
    this.props.assetsInfo('', '', '', '', '', '', '', '', '');
    Actions.ScanQRCode();
  }
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
    this.setState({fileList: newDataImg});
  };

  renderItem = ({item, indx}) => {
    return (
      <View>
        <Image
          style={{
            height: hp('18'),
            width: wp('40'),
            borderRadius: wp('2'),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: wp('7'),
            marginRight: wp('2'),
            marginTop: hp('1'),
          }}
          source={item.url}
        />
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

  render() {
    const {
      assetID,
      assetQRcode,
      CustomerID,
      ScanFlag,
      assetName,
      assetsType,
      modelNo,
      sizeSqFeet,
      allocatedToName,
    } = this.props.assets;

    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {/* Header */}
              <View style={styles.container}>
                <View style={styles.assetTypeContainer}>
                  <Text style={styles.assetTypeLabelStyle}>ASSET TYPE</Text>
                  <Text style={styles.assetTypesTextStyle}>{assetsType}</Text>
                </View>

                <View style={styles.modelContainer}>
                  <Text style={styles.modelLabelStyle}>MODEL</Text>
                  <Text style={styles.modelNoStyle}>{modelNo}</Text>
                </View>
              </View>

              {/* Add Photos */}
              <View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: '#796A6A',
                      fontSize: RFValue(13),
                      fontFamily: 'Proxima Nova',
                      fontWeight: 'bold',
                      marginLeft: wp('6'),
                      marginTop: hp('3'),
                    }}>
                    ADD PICTURES
                  </Text>
                </View>
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
                    <View style={{flexDirection: 'column', marginTop: hp('2')}}>
                      <TouchableOpacity
                        // onPress={() =>Actions.camera()}
                        onPress={this.onClickAddImage}>
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
              </View>

              {/* Dash Line */}
              <View style={styles.dashLineContainer}>
                <Dash
                  style={styles.dashLineStyle}
                  dashLength={2}
                  dashColor="#ADA2A2"
                />
              </View>

              {/* Current Location */}
              <View style={{marginTop: hp('1')}}>
                <View style={styles.nameMainContainer}>
                  <Text style={styles.nameTextStyle}>CONDITION</Text>
                </View>
                <View style={styles.nameTextBoxMainContainer}>
                  <Dropdown
                    placeholder="Select"
                    itemCount={4}
                    containerStyle={styles.dropDownContainer}
                    pickerStyle={{width: wp('89.2')}}
                    rippleCentered={true}
                    itemColor="#ADA2A2"
                    fontSize={11}
                    inputContainerStyle={{borderBottomColor: 'transparent'}}
                    value={this.state.condition}
                    data={data}
                    dropdownPosition={-3.4}
                    dropdownOffset={{top: 15, left: 18}}
                    rippleOpacity={0}
                    onChangeText={value => {
                      this.onSelectedCondition(value);
                    }}
                  />
                </View>
              </View>

              {/* Remark */}
              <View>
                <View style={styles.remarkMainContainer}>
                  <Text style={styles.remarkTextStyle}>REMARKS</Text>
                </View>
                <View style={styles.remarkTextViewContainer}>
                  <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    style={styles.remarkTextInputStyle}
                    onChangeText={text => this.remarkChangeHandler(text)}
                    value={this.state.remark}
                  />
                </View>
              </View>

              <View style={{marginTop: hp('10')}} />
            </View>
          </ScrollView>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.submitClickHandler()}>
              <View
                style={{
                  backgroundColor: '#46BE50',
                  height: hp('8'),
                  width: wp('90'),
                  borderRadius: wp('2'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: RFValue(14),
                    fontWeight: 'bold',
                    fontFamily: 'Proxima Nova',
                  }}>
                  SUBMIT
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.cancelClickHandler()}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: hp('3'),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: RFValue(14),
                    fontWeight: 'bold',
                    fontFamily: 'Proxima Nova',
                  }}>
                  CANCEL
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    shops: state.shops,
    assets: state.assets,
    dashboard: state.dashboard,
  };
};
const mapDispatchToProps = dispatch => ({
  assetsInfo: (
    assetID,
    assetQRcode,
    CustomerID,
    ScanFlag,
    assetName,
    assetsType,
    modelNo,
    sizeSqFeet,
    allocatedToName,
  ) => {
    dispatch(
      ASSET_INFO(
        assetID,
        assetQRcode,
        CustomerID,
        ScanFlag,
        assetName,
        assetsType,
        modelNo,
        sizeSqFeet,
        allocatedToName,
      ),
    );
  },
  assetsInfoFlag: (Scan_status_flag, Asset_info_flag) => {
    dispatch(ASSET_INFO_FLAG(Scan_status_flag, Asset_info_flag));
  },
  qrcode: qrString => {
    dispatch(QR_CODE(qrString));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditAssetStep3);

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#210305',
  },

  assetTypeContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  assetTypeLabelStyle: {
    color: '#796A6A',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: hp('3%'),
    fontFamily: 'Proxima Nova',
    marginLeft: wp('5%'),
  },

  assetTypesTextStyle: {
    color: 'white',
    fontSize: 10,
    marginTop: hp('1%'),
    marginLeft: wp('5%'),
    fontFamily: 'Proxima Nova',
    marginBottom: hp('2'),
  },

  modelContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },

  modelLabelStyle: {
    color: '#796A6A',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: hp('3%'),
    marginRight: wp('30'),
    fontFamily: 'Proxima Nova',
  },

  modelNoStyle: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: hp('1%'),
    marginRight: wp('20'),
    fontFamily: 'Proxima Nova',
    marginBottom: hp('2'),
  },

  dashLineContainer: {
    // flex:1,
    marginTop: hp('3'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('88'),
    height: hp('1'),
    color: '#ADA2A2',
  },
  dashLineContainer: {
    // flex:1,
    marginTop: hp('3'),
    alignContent: 'center',
    alignItems: 'center',
  },

  dashLineStyle: {
    width: wp('88'),
    height: hp('1'),
    color: '#ADA2A2',
  },

  nameMainContainer: {
    flex: 1,
  },

  nameTextStyle: {
    color: '#796A6A',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('5'),
    marginTop: hp('2'),
  },

  nameTextBoxMainContainer: {
    flex: 1,
    marginTop: hp('1.5'),
  },

  dropDownContainer: {
    borderColor: '#E6DFDF',
    borderRadius: wp('2'),
    width: wp('90'),
    height: hp('9'),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: hp('2'),
    borderWidth: wp('0.3'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 15,
  },

  remarkMainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: hp('3'),
    marginVertical: wp('8'),
  },

  remarkTextStyle: {
    color: '#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: wp('3%'),
  },

  remarkTextViewContainer: {
    flex: 1,
    marginVertical: hp('-3'),
    marginHorizontal: wp('5'),
    alignSelf: 'center',
    // padding:1,
  },

  remarkTextInputStyle: {
    height: hp('15'),
    width: wp('88'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('2'),
    backgroundColor: '#ffffff',
    padding: 5,
  },
});
