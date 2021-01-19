import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
 import { CameraKitCameraScreen, } from 'react-native-camera-kit';
 
import {ASSET_INFO,ASSET_INFO_FLAG,QR_CODE} from '../../Redux/actions/AssetsAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();


export  class ScanQRCodeForAddAsset extends Component {
constructor(props) {
    super(props);
    this.state = { 
        QR_Code_Value: '',
        Start_Scanner: true,
    };
}

openLink_in_browser = () => {
  Linking.openURL(this.state.QR_Code_Value); 
}

onQR_Code_Scan_Done = (QR_Code) => {
  this.setState({ QR_Code_Value: QR_Code });
  this.setState({ Start_Scanner: false });
}

open_QR_Code_Scanner=()=> {
  var that = this;
 
  if (Platform.OS === 'android') {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA, {
            'title': 'Camera App Permission',
            'message': 'Camera App needs access to your camera '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.setState({ QR_Code_Value: '' });
          that.setState({ Start_Scanner: true });
        } else {
          alert("CAMERA permission denied");
        }
      } catch (err) {
        alert("Camera permission err", err);
        console.warn(err);
      }
    }
    requestCameraPermission();
  } else {
    that.setState({ QR_Code_Value: '' });
    that.setState({ Start_Scanner: true });
  }
  }

render() {
       return (
        <View style={styles.container}>
            <View style={styles.kitContainer}>
              <CameraKitCameraScreen
              style={{
                  // flex: 1,
                  backgroundColor: 'grey'
                }}
                showFrame={true}
                scanBarcode={true}
                laserColor={'#221818'}
                frameColor={'grey'}
                // colorForScannerFrame={'black'}
                colorForScannerFrame = {'#221818'}
                onReadCode={event =>
                  this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
                }
              />
            </View>
            <View style={styles.buttonsContainer}>
                {/* CONFIRM Button */}
                <View style={styles.confirmButtonMainContainer}>
                    <TouchableOpacity  onPress={() => Actions.AddNewAssetStep2()} >
                        <View style={styles.confirmButtonInnerContainer}>
                            <Text style={styles.confirmTextStyle}>
                                    CONFIRM
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
   
   
  };
};
const mapDispatchToProps = dispatch => ({
  
}
)
export default connect(mapStateToProps, mapDispatchToProps)(ScanQRCodeForAddAsset)


const styles = StyleSheet.create({
  container:{
    flex:1, 
    flexDirection:'column',
  },

  kitContainer:{ 
    flex:2, 
    alignItems:'flex-start',
    marginTop: hp('-20'),
  },

  buttonsContainer:{
    flex:1,  
    marginTop:hp('30'),
  },

   confirmButtonMainContainer: {
    marginTop:hp('3'), 
    alignItems:'center', 
    justifyContent:'center',
    marginBottom:hp('5'),
  },

  confirmButtonInnerContainer:{
    backgroundColor:'#221818', 
    //  backgroundColor:'grey',
    height:hp('9'), 
    width:wp('90'), 
    borderRadius:wp('2'), 
    alignItems:'center',
    justifyContent:'center',
  },

  confirmTextStyle:{ 
    color: '#FFFFFF', 
    fontSize:RFValue(15), 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },

   
});
