import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Actions} from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-crop-picker';
import * as RNFS from 'react-native-fs';
import NextButton from '../../components/NextButton';
import {ActionSheet, Root} from 'native-base';
import {TOTAL_SHOPS} from '../../Redux/actions/ShopAction';
import {connect} from 'react-redux';
import Database from './../../utility/Database';
const db = new Database();

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export class AddNewShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      outletNAme: '',
      OwnerName: '',
      address: '',
      hasMapPermission: false,
      userLatitude: '',
      userLongitude: '',
      BeatID: '',
      location: '',
    };
  }

  static navigationOptions = {
    title: 'Add New Party',
    color: 'white',
    headerStyle: {
      backgroundColor: '#221818',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff',
      marginLeft: wp('-2'),
      fontSize: 20,
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
        <TouchableOpacity onPress={() => Actions.Shops()}>
          <Image
            style={{marginLeft: wp('4')}}
            source={require('../../assets/Icons/Back_White.png')}
          />
        </TouchableOpacity>
      </View>
    ),
  };

  OutletNameChangeHandler = text => {
    this.state.outletNAme = text;
    this.setState({outletNAme: text});
  };

  OwnerNameChangeHandler = text => {
    this.state.OwnerName = text;
    this.setState({OwnerName: text});
  };

  AddressChangeHandler = text => {
    this.state.address = text;
    this.setState({address: text});
  };
  onChangeLocation = text => {
    this.setState({location: text});
    if (text) {
      if (this.state.hasMapPermission) {
        this.getUserPosition();
      } else {
        this.requestFineLocation();
      }
    }
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
    // this.locationWatchId = Geolocation.getCurrentPosition(
    Geolocation.getCurrentPosition(pos => {
      //  alert(pos.coords.latitude)
      this.setState({
        userLatitude: pos.coords.latitude,
        userLongitude: pos.coords.longitude,
      });
      //console.log(this.state.userLatitude)
    });
  }

  getLocation = () => {
    this.requestFineLocation();
  };
  //////////////////////////////camerea code////////////////////

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
  NextButton = () => {
    AsyncStorage.setItem('location', JSON.stringify(this.state.location));
    AsyncStorage.setItem('outletName', JSON.stringify(this.state.outletNAme));
    AsyncStorage.setItem('ownerName', JSON.stringify(this.state.OwnerName));
    AsyncStorage.setItem('address', JSON.stringify(this.state.address));

    if (this.state.outletNAme) {
      if (this.state.address) {
        if (this.state.OwnerName) {
          //    var date = new Date().getDate(); //Current Date
          //    var month = new Date().getMonth() + 1; //Current Month
          //    var year = new Date().getFullYear(); //Current Year
          //    var hours = new Date().getHours(); //Current Hours
          //    var min = new Date().getMinutes(); //Current Minutes
          //    var sec = new Date().getSeconds(); //Current Seconds
          //    app_order_id = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
          //    app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, "");
          //    curentDatetime=year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec

          //    //console.log(app_order_id)
          //    alert(app_order_id)
          // db.insertNewShopnewpartyoutlet(app_order_id,this.state.BeatID,this.state.outletNAme,"",
          //this.state.OwnerName,this.state.address,"",
          // this.state.userLatitude,this.state.userLongitude,"N",curentDatetime)

          // var counts=0
          // alert(this.state.fileList.length)
          // for(let i=0;i<this.state.fileList.length;i++){
          //    counts++
          //     //console.log("countssssssssssssssss",counts)
          //     db.insertNewPartyImages(app_order_id,"N",this.state.fileList[i].url.uri)
          // }
          Actions.AddNewShopSecond({
            BeatID: this.state.BeatID,
            outletNAme: this.state.outletNAme,
            OwnerName: this.state.OwnerName,
            address: this.state.address,
            userLatitude: this.state.userLatitude,
            userLongitude: this.state.userLongitude,
            fileList: this.state.fileList,
          });
        } else {
          alert('Enter OwnerName');
        }
      } else {
        alert('Enter address');
      }
    } else {
      alert('Enter outlateName');
    }

    //insert query
    // newpartyoutlet(OrderID,BitID,OutletName,ContactNo,OwnersName,OutletAddress,Remark,Latitude,
    //     Longitude,Is_Sync,AddedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)  add new shop data insert qurery
  };

  componentWillMount() {
    AsyncStorage.getItem('routeId').then(keyValue => {
      this.setState({BeatID: JSON.parse(keyValue)});
    });
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this._componentFocused();
      //Put your Data loading function here instead of my this.LoadData()
    });
  }
  _componentFocused() {
    // AsyncStorage.setItem('outletName', JSON.stringify(this.state.outletNAme));
    // AsyncStorage.setItem('ownerName', JSON.stringify(this.state.OwnerName));
    // AsyncStorage.setItem('address', JSON.stringify(this.state.address));

    AsyncStorage.getItem('location').then(keyValue => {
      if (JSON.parse(keyValue)) {
        //  alert(JSON.parse(keyValue))
        this.setState({location: JSON.parse(keyValue)});
      }
    });

    AsyncStorage.getItem('outletName').then(keyValue => {
      if (JSON.parse(keyValue)) {
        //  alert(JSON.parse(keyValue))
        this.setState({outletNAme: JSON.parse(keyValue)});
      }
    });

    AsyncStorage.getItem('ownerName').then(keyValue => {
      if (JSON.parse(keyValue)) {
        //  alert(JSON.parse(keyValue))
        this.setState({OwnerName: JSON.parse(keyValue)});
      }
    });
    AsyncStorage.getItem('address').then(keyValue => {
      if (JSON.parse(keyValue)) {
        //  alert(JSON.parse(keyValue))

        this.setState({address: JSON.parse(keyValue)});
      }
    });
  }
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../../assets/Icons/android_BG.png')}
          style={{
            height: hp('89'),
            width: wp('100'),
            resizeMode: 'cover',
            justifyContent: 'center',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>OUTLET NAME</Text>
              </View>

              <View style={styles.OODTextBoxMainContainer}>
                <TextInput
                  //multiline= {}
                  placeholder="Type Here"
                  style={styles.OODTextBoxSelfContainer}
                  onChangeText={text => this.OutletNameChangeHandler(text)}
                  //  value={this.state.outletNAme}
                />
              </View>
            </View>

            <View>
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>OWNER NAME</Text>
              </View>

              <View style={styles.OODTextBoxMainContainer}>
                <TextInput
                  //multiline= {}
                  placeholder="Type Here"
                  style={styles.OODTextBoxSelfContainer}
                  onChangeText={text => this.OwnerNameChangeHandler(text)}
                  // value={this.state.OwnerName}
                />
              </View>
            </View>

            <View>
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>ADDRESS</Text>
              </View>

              <View style={styles.OODTextBoxMainContainer}>
                <TextInput
                  //multiline= {}
                  placeholder="Type Here"
                  style={styles.OODTextBoxSelfContainer}
                  onChangeText={text => this.AddressChangeHandler(text)}
                  // value={this.state.address}
                />
              </View>
            </View>

            <View style={styles.AddLocMainContainer}>
              <View style={styles.AddLocRowContainer}>
                <View style={styles.AddLocTextContainer}>
                  <Text style={styles.AddLocTextStyle}>ADD LOCATION</Text>
                </View>

                <View style={styles.deviceLocationColContainer}>
                  <Text style={styles.deviceLocTextStyle}>
                    Turn on the device location
                  </Text>
                </View>
              </View>

              <View style={styles.addLocTextBoxMainCont}>
                <View style={styles.addLocTextBoxColCont}>
                  <TextInput
                    placeholder="Type Here"
                    style={styles.addLocTextBoxStyle}
                    onChangeText={text => this.state.coords.latitude}
                    value={this.state.location}
                  />
                </View>
                <View style={styles.addLocBGStyle}>
                  <TouchableOpacity onPress={this.getLocation}>
                    <Image
                      style={styles.addLocImgStyle}
                      source={require('../../assets/Icons/geo_location.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.OODMainContainer}>
                <Text style={styles.OODTextStyle}>ADD PICTURES</Text>
              </View>

              {/* <View style={styles.horiIMGSMainCont}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                       
                            <TouchableOpacity 
                               
                                >
                                <View style={styles.imgBG}>
                                    <Image  styles={styles.imgStyle}
                                        source = {require('../../assets/Icons/Add_Images.png')}/>
                                   
                                </View>
                            </TouchableOpacity>
                      

                        <TouchableOpacity
                           
                        >
                            <View style={styles.imgBG}>
                                
                                <Image  styles={styles.imgStyle}
                                    source = {require('../../assets/Icons/Add_Images.png')}/>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={Actions.reactNativeCamera}>
                            <View style={styles.imgBG}>
                                <Image  styles={styles.imgStyle}
                                    source = {require('../../assets/Icons/Add_Images.png')}/>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.lastIMGBG}>
                            <Image  styles={styles.imgStyle}
                                source = {require('../../assets/Icons/Add_Images.png')}/>
                        </View>
                    </ScrollView> 
                </View> */}

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
                  <View style={{flexDirection: 'column', marginTop: hp('7')}}>
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
            </View>

            <View style={{marginTop: hp('6')}} />
          </ScrollView>
          {/* Next Button */}
          <View>
            <TouchableOpacity onPress={this.NextButton.bind(this)}>
              <NextButton />
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
  };
};
const mapDispatchToProps = dispatch => ({
  //    userid: (val) => { dispatch(USER_ID(val));
  //                                  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewShop);

const styles = StyleSheet.create({
  OODMainContainer: {
    flex: 1,
  },

  OODTextStyle: {
    color: '#796A6A',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('5'),
    marginTop: hp('3'),
  },

  OODTextBoxMainContainer: {
    flex: 1,
    marginTop: hp('1.5'),
  },

  OODTextBoxSelfContainer: {
    height: hp('9'),
    width: wp('89'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('2'),
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    padding: 15,
    fontSize: 12,
  },

  AddLocMainContainer: {
    flexDirection: 'column',
  },

  AddLocRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  AddLocTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  AddLocTextStyle: {
    color: '#796A6A',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    fontWeight: 'bold',
    marginLeft: wp('5'),
    marginTop: hp('3'),
  },

  deviceLocationColContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  deviceLocTextStyle: {
    flex: 1,
    color: '#796A6A',
    fontSize: 10,
    fontFamily: 'Proxima Nova',
    marginTop: hp('3'),
    alignItems: 'flex-end',
    marginRight: wp('6'),
  },

  addLocTextBoxMainCont: {
    marginTop: hp('1.5'),
    flexDirection: 'row',
    alignSelf: 'center',
  },

  addLocTextBoxColCont: {
    flexDirection: 'column',
  },

  addLocTextBoxStyle: {
    height: hp('9'),
    width: wp('80'),
    borderColor: '#E6DFDF',
    borderWidth: 1,
    borderRadius: wp('2'),
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#E6DFDF',
    borderRadius: wp('2%'),
    borderRightWidth: hp('0'),
    borderTopRightRadius: wp('0'),
    borderBottomRightRadius: wp('0'),
  },

  addLocBGStyle: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: hp('9'),
    width: wp('8'),
    justifyContent: 'center',
    borderRightWidth: hp('0.18'),
    borderTopWidth: hp('0.18'),
    borderBottomWidth: hp('0.18'),
    borderTopRightRadius: wp('2'),
    borderTopLeftRadius: wp('0'),
    borderBottomRightRadius: wp('2'),
    borderBottomLeftRadius: wp('0'),
    borderColor: '#E6DFDF',
  },

  addLocImgStyle: {
    height: hp('4'),
    width: wp('8'),
    alignSelf: 'center',
    marginRight: wp('3'),
  },

  horiIMGSMainCont: {
    flex: 1,
    marginTop: hp('3'),
    marginLeft: wp('3'),
  },

  imgBG: {
    backgroundColor: '#E6DFDF',
    height: hp('18'),
    width: wp('40'),
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2'),
  },

  imgStyle: {
    alignSelf: 'center',
  },

  lastIMGBG: {
    backgroundColor: '#E6DFDF',
    height: hp('18'),
    width: wp('40'),
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2'),
    marginRight: wp('2'),
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

  itemImage: {
    backgroundColor: '#2F455C',
    height: 150,
    width: 60,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginRight: 50,
  },
  //   btn:{
  //       backgroundColor:'#0080ff',
  //       height:50,
  //       width:60,
  //       alignItems:'center',
  //       justifyContent:'center'
  //   }
});
