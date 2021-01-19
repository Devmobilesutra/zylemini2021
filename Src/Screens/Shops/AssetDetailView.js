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
  BackHandler,
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

import {
  ASSET_INFO,
  ASSET_INFO_FLAG,
  QR_CODE,
} from '../../Redux/actions/AssetsAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
const db = new Database();

var asetInfoPipe;
var Asset_Id_url;
var allocatedToNames = '';
var assetsType = '',
  CustomerID = '',
  ScanFlag = '',
  assetQRcode = '',
  sizeSqFeet = '',
  manufacturedBy = '',
  modelNo = '',
  serialNo = '',
  installationDate = '',
  allocatedTo = '',
  assetID = '',
  assetName = '';

var app_order_id;
var Scan_status_flag = '',
  Asset_info_flag = '',
  ChechAssetstext = '',
  default_dist = '';
export class AssetDetailView extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      assetsType: '',
      manufacturedBy: '',
      modelNo: '',
      serialNo: '',
      installationDate: '',
      allocatedToName: '',

      allocatedtoFalse: false,
      fileList: [],
      InfoString: [],
    };
  }

  //   static navigationOptions = {
  //     title: 'Audit Asset : Step 2/3',
  //     color: 'white',
  //     headerStyle: {
  //       backgroundColor: '#221818',
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       color: '#fff',
  //       marginLeft: wp('-1.5'),
  //       fontSize: 12,
  //       fontWeight: 'bold',
  //     },

  //     headerLeft: (
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           alignSelf: 'center',
  //         }}>
  //         <TouchableOpacity onPress={() => Actions.ScanQRCode()}>
  //           <Image
  //             style={{marginLeft: wp('4')}}
  //             source={require('../../assets/Icons/Back_White.png')}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //   };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  componentDidMount() {
    console.log('ggggggggggggggggggggggg', this.props.AssetID);
    // if(this.props.qrStrings){
    //     this.props.qrcode(this.props.qrStrings)

    // }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    db.checkQrCodeDataInDb(this.props.AssetID).then(data => {
      //         [{"AssetID": "1",
      //  "AssetInformation": "Asset Name: IR/PUNE/MAY 18/3 || Asset Type: WallBay || Model No: ABC Company || SizeSqFeet: 24", "AssetQRcode": "IR/PUNE/MAY 18/3",
      //          "CustomerID": "8418", "ScanFlag": "", "id": 1}]
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          this.setState({InfoString: data[0].AssetInformation.split('||')});
          // InfoString=data[0].AssetInformation.split('||')
          assetID = data[0].AssetID;
          assetQRcode = data[0].AssetQRcode;
          CustomerID = data[0].CustomerID;
          ScanFlag = data[0].ScanFlag;
        }
        //["Asset Name: IR/PUNE/MAY 18/3 ", " Asset Type: WallBay ", " Model No: ABC Company ", " SizeSqFeet: 24"]
        //  alert(this.state.InfoString.length)
        var assetNameValue = this.state.InfoString[0];
        assetName = assetNameValue.split(':')[1];

        var assetTypeValue = this.state.InfoString[1];
        assetsType = assetTypeValue.split(':')[1];

        var assetModelValue = this.state.InfoString[2];
        modelNo = assetModelValue.split(':')[1];

        var assetsizeValue = this.state.InfoString[3];
        sizeSqFeet = assetsizeValue.split(':')[1];

        db.getCustomerName(CustomerID).then(data => {
          if (data.length) {
            for (var i = 0; i < data.length; i++) {
              allocatedToNames = data[i].Party;
              // asetInfoPipe=assetID+"||"+assetQRcode+"||"+CustomerID+"||"+ScanFlag+"||"+assetName+"||"+modelNo+"||"+sizeSqFeet+"||"+allocatedToNames
              this.props.assetsInfo(
                assetID,
                assetQRcode,
                CustomerID,
                ScanFlag,
                assetName,
                assetsType,
                modelNo,
                sizeSqFeet,
                allocatedToNames,
              );
            }
          }
        });
        Asset_Id_url = assetID;
      } else {
        assetID = '';
        (assetQRcode = ''),
          (CustomerID = ''),
          (ScanFlag = ''),
          (assetName = ''),
          (assetsType = ''),
          (modelNo = ''),
          (sizeSqFeet = ''),
          (allocatedToNames = '');
        Asset_Id_url = assetID;
        Scan_status_flag = '4';
        Asset_info_flag = '';
        ChechAssetstext = 'This asset does not exists.';
        default_dist = '';
        //  asetInfoPipe=assetID+"||"+assetQRcode+"||"+CustomerID+"||"+ScanFlag+"||"+assetName+"||"+modelNo+"||"+sizeSqFeet+"||"+allocatedToNames
        this.props.assetsInfo(
          assetID,
          assetQRcode,
          CustomerID,
          ScanFlag,
          assetName,
          assetsType,
          modelNo,
          sizeSqFeet,
          allocatedToNames,
        );
        //alert(ChechAssetstext)
      }
    });
    //Check customer valid or not:
    if (this.props.shops.shopId == this.props.assets.CustomerID) {
      Scan_status_flag = '1';
      Asset_info_flag = '';
      this.state.allocatedtoFalse = false;
      this.setState({allocatedtoFalse: false});
      this.props.assetsInfoFlag(Scan_status_flag, Asset_info_flag);
    } else {
      Scan_status_flag = '2';
      Asset_info_flag = '';
      this.setState({allocatedtoFalse: true});
      this.props.assetsInfoFlag(Scan_status_flag, Asset_info_flag);
    }
  }

  _renderInfoView = () => {
    //  for (var i =0; i<this.state.InfoString.length; i++){
    return this.state.InfoString.map((info, index) => {
      ////console.log("info::",this.state.InfoString[2])
      return (
        <View>
          <View style={styles.assetTypeMainContainer}>
            <View style={styles.assetTypeLabelColContainer}>
              <Text style={styles.assetTypeleLabelStyle}>
                {/* {this.state.InfoString[3].split(':')[0]} */}
                {info.split(':')[0]}
              </Text>
            </View>

            <View style={styles.assetTypesColContainer}>
              <Text style={styles.assetTypesTextStyle}>
                {/* {this.state.InfoString[3].split(':')[1]} */}
                {info.split(':')[1]}
              </Text>
            </View>
          </View>

          <View style={styles.dashLineContainer}>
            <Dash
              style={styles.dashLineStyle}
              dashLength={2}
              dashColor="#ADA2A2"
            />
          </View>
        </View>
      );
    });
  };

  _renderAllocatedView = () => {
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
      <View style={{flex: 1, marginLeft: wp('6'), flexDirection: 'row'}}>
        <View style={{flex: 0.4, flexDirection: 'column', marginTop: hp('3')}}>
          <Text
            style={{
              color: '#796A6A',
              fontSize: RFValue(13),
              fontFamily: 'Proxima Nova',
              fontWeight: 'bold',
            }}>
            ALLOCATED TO
          </Text>
        </View>
        <View style={{flexDirection: 'column', marginTop: hp('3')}}>
          {/* {this.renderDot()} */}
          <Image
            style={{tintColor: '#E23333'}}
            source={require('../../assets/Icons/Help.png')}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: hp('3'),
          }}>
          <Text
            style={{
              color: '#796A6A',
              fontSize: RFValue(13),
              fontFamily: 'Proxima Nova',
              marginLeft: wp('8'),
            }}>
            {allocatedToName}
          </Text>
        </View>
      </View>
    );
  };
  renderDot() {
    if (this.state.allocatedtoFalse) {
      return (
        <View
          style={{
            width: 25,
            height: 25,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25 / 2,
            backgroundColor: 'red',
            borderColor: 'red',
            // borderWidth: 3,
            marginRight: wp('3'),
          }}
        />
      );
    } else {
      return <View />;
    }
  }
  _componentFocused = () => {};
  cancelClickHandler() {
    this.props.assetsInfoFlag('', '');
    this.props.qrcode('');
    this.props.assetsInfo('', '', '', '', '', '', '', '', '');
    Actions.ScanQRCode();
  }
  confirmClickHandler() {
    //assetID,assetQRcode,CustomerID,ScanFlag,assetName,assetsType,modelNo,sizeSqFeet,allocatedToNames)
    // INSERT INTO AssetPlacementVerification(OrderID,AssetID,QRCode,ScanStatus,AssetInformation,Remark) VALUES (?,?,?,?,?,?)
    Actions.AuditAssetStep3({fileList: this.state.fileList});
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
            aaaa
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
              <View style={styles.headerMainContainer}>
                <View style={styles.headerInnerContainer}>
                  <View style={styles.imgColContainer}>
                    <Image
                      style={styles.imgStyle}
                      source={require('../../assets/Icons/Shop_card_watermark.png')}
                    />
                  </View>
                  <View style={styles.shopNameAddMainContainer}>
                    <Text style={styles.shopNameTextStyle}>
                      {this.props.shops.shopname}
                    </Text>
                    <Text style={styles.shopAddTextStyle}>
                      {this.props.shops.ShopAreas}
                    </Text>
                  </View>
                </View>
              </View>

              {this._renderInfoView()}
              {/* Allocated To */}
              {this._renderAllocatedView()}
              {/* <View style={{ flex: 1, marginLeft: wp('6'), flexDirection: 'row', }}>
                                <View style={{ flex: 0.4, flexDirection: 'column', marginTop: hp('3'), }}>
                                    <Text style={{
                                        color: '#796A6A', fontSize: RFValue(13), fontFamily: 'Proxima Nova',
                                        fontWeight: 'bold',
                                    }}>
                                        ALLOCATED TO
                        </Text>
                                </View>
                                <View style={{ flexDirection: 'column', marginTop: hp('3'), }}>
                                 
                                    <Image style={{tintColor:'#E23333'}}
                                        source={require('../../assets/Icons/Help.png')} />

                                </View>
                                <View style={{ flex: 0.5, flexDirection: 'column', alignItems: 'center', marginTop: hp('3'), }}>
                                    <Text style={{
                                        color: '#796A6A', fontSize: RFValue(13), fontFamily: 'Proxima Nova', marginLeft: wp('8'),
                                    }}>
                                        {allocatedToName}
                                    </Text>
                                </View>
                            </View> */}
              {/* Dash Line */}
              <View style={styles.dashLineContainer}>
                <Dash
                  style={styles.dashLineStyle}
                  dashLength={2}
                  dashColor="#ADA2A2"
                />
              </View>
            </View>
            <View style={{marginTop: hp('5')}} />
          </ScrollView>
          {/*  */}
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    shops: state.shops,
    assets: state.assets,
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
)(AssetDetailView);

const styles = StyleSheet.create({
  headerMainContainer: {
    flex: 0.3,
    backgroundColor: '#210305',
  },

  headerInnerContainer: {
    flexDirection: 'row',
    marginTop: hp('2'),
    marginLeft: wp('5'),
    marginBottom: hp('2'),
  },

  imgColContainer: {
    flexDirection: 'row',
    marginTop: hp('3.3'),
    marginLeft: hp(1),
  },

  imgStyle: {
    height: hp('6'),
    width: wp('9'),
    tintColor: 'grey',
  },

  shopNameAddMainContainer: {
    flexDirection: 'column',
    marginTop: hp('3'),
    marginLeft: wp('5'),
  },

  shopNameTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },

  shopAddTextStyle: {
    color: '#796A6A',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    marginTop: hp('1'),
  },

  assetTypeMainContainer: {
    flex: 1,
    marginTop: hp('3'),
    marginLeft: wp('6'),
    flexDirection: 'row',
  },

  assetTypeLabelColContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  assetTypeleLabelStyle: {
    color: '#796A6A',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
  },

  assetTypesColContainer: {
    flex: 0.8,
    flexDirection: 'column',
    alignItems: 'center',
  },

  assetTypesTextStyle: {
    color: '#796A6A',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    alignSelf: 'flex-start',
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

  OODMainContainer: {
    flex: 1,
  },

  OODTextStyle: {
    color: '#796A6A',
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('6'),
    marginTop: hp('3'),
  },

  imagesFrompHOTO: {
    height: hp('18'),
    width: wp('40'),
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('7'),
    marginRight: wp('2'),
    marginTop: hp('1'),
  },
});
