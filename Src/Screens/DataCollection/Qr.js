import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Linking,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import {CameraKitCameraScreen} from 'react-native-camera-kit';
//zy13m1n1@2019
//zyleminiuat
//IR/PUNE/MAY 18/3
import {
  ASSET_INFO,
  ASSET_INFO_FLAG,
  QR_CODE,
} from '../../Redux/actions/AssetsAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
const db = new Database();

var qrStringi = '';
export class Qr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      Start_Scanner: true,
      isCameraPer: true,
      a: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    if (!this.state.isCameraPer) {
      //   this.open_QR_Code_Scanner()
    }
    //console.log("componentDidMount callee")
    this._componentFocused();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused,
    );
  }

  componentWillMount() {
    this.open_QR_Code_Scanner();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    Actions.AssetUpdate();
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  _componentFocused = () => {};
  nextNavigation = () => {
    this.setState({a: 'bbbb'});

    if (qrStringi) {
      // Actions.AuditAssetStep2({qrStrings: qrStringi});
      console.log('quququququququrrr', qrStringi);
    } else {
      alert('Please Scan qr code First');
    }
  };

  openLink_in_browser = () => {
    Linking.openURL(this.state.QR_Code_Value);
  };

  onQR_Code_Scan_Done = QR_Code => {
    console.log('done in done');
    qrStringi = QR_Code;
    this.state.QR_Code_Value = QR_Code;
    // alert(QR_Code)
    this.setState({QR_Code_Value: QR_Code});
    this.props.qrcode(qrStringi);
    this.setState({Start_Scanner: false});
    console.log('qrcode doneeeeee', qrStringi);
    if (QR_Code) {
      this.props.qrcode(QR_Code);
      // Actions.AuditAssetStep2({qrStrings: qrStringi});
      console.log('qrcode doneeeeee', qrStringi);
    } else {
      alert('Please Scan qr code First');
    }
  };

  open_QR_Code_Scanner = () => {
    var that = this;

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera App Permission',
              message: 'Camera App needs access to your camera ',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.setState({isCameraPer: true});
            that.setState({QR_Code_Value: ''});
            that.setState({Start_Scanner: true});
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({QR_Code_Value: ''});
      that.setState({Start_Scanner: true});
    }
  };

  render() {
    return (
      <View style={{flex: 1, flexDirectin: 'column'}}>
        <View style={{flex: 4, alignItems: 'flex-start', marginTop: hp('-25')}}>
          <CameraKitCameraScreen
            style={{
              flex: 3,
              backgroundColor: 'grey',
            }}
            showFrame={true}
            scanBarcode={true}
            laserColor={'#221818'}
            frameColor={'#796A6A'}
            colorForScannerFrame={'#796A6A'}
            onReadCode={event =>
              this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
            }
          />
        </View>
        {/* <View style={{flex:1,  marginTop:hp('30')}}>
             
              <View style={styles.confirmButtonMainContainer}>
                  <TouchableOpacity   onPress={this.nextNavigation} >
                      <View style={styles.confirmButtonInnerContainer}>
                          <Text style={styles.confirmTextStyle}>
                                  CONFIRM
                          </Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </View> */}
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
  qrcode: qrString => {
    dispatch(QR_CODE(qrString));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Qr);

const styles = StyleSheet.create({
  confirmButtonMainContainer: {
    marginTop: hp('3'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('5'),
  },

  confirmButtonInnerContainer: {
    backgroundColor: '#221818',
    //  backgroundColor:'grey',
    height: hp('9'),
    width: wp('90'),
    borderRadius: wp('2'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmTextStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(15),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },

  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14,
  },
});
