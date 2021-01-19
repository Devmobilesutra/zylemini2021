import React, {Component} from 'react';
import {StyleSheet, View, Text,PermissionsAndroid, ImageBackground, TouchableOpacity, ScrollView, Image,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { TOTAL_SHOPS,SHOP_INFO,SHOP_VISITED_TODAY} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();


var radio_props = [
    {label: 'Audit Existing Asset', value: 0 },
    {label: 'Add New Asset', value: 1 },
    {label: 'Replace Asset', value: 2 },
    {label: 'Discard Asset', value: 3 }
];

export  class AssetUpdate extends Component {
constructor(props) {
    super(props);
    this.state = { 
        value: 0,
     };
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}



static navigationOptions = {
  title: 'Asset',
  color: 'white',
    headerStyle: {
        backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff', marginLeft: wp('-1.5'),fontSize:18,fontWeight:'bold'
    },

  headerLeft: (
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.Info() }>  
                <Image  style={{marginLeft:wp('5'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
            
        </View>
 )                               
}

nextNavigation =  () => {
    if(this.state.value == 0) {
        return(
            Actions.ScanQRCode()
        );
    }
    if(this.state.value == 3) {
        return(
            Actions.ScanQRCodeForDiscard()
        );
    }
    if(this.state.value == 1) {
        return(
            Actions.ScanQRCodeForAddAsset()
        );
    }
    
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
           
            
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
        //  alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      
      
    }
    }
  
  
componentWillMount(){
    this.open_QR_Code_Scanner()
}
componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.Info();
     return true;
   }
  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
   
}


render() {
    const { checked } = this.state;
    return (
    <View style={{flex:1}}>
        <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
        > 
        <ScrollView
                    showsVerticalScrollIndicator={false}
        >
        <View>

           {/* Header */}
            <View style = {styles.headerMainContainer}>
                <View style={styles.headerInnerContainer}>
                    <View style={styles.imgColContainer}>
                        <Image style={styles.imgStyle}
                            source={require('../../assets/Icons/Shop_card_watermark.png')}/>
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

            {/* Choose Action */}
            <View style={styles.chooseActionMainContainer}>
                <View style={styles.chooseBGContainer}>
                    <Text style={styles.chooseTextStyle}>
                        Choose the action
                    </Text>

                    {/* Line  */}
                    <View
                        style={styles.middleLineStyle}
                    />

                    {/* Radio Options */}
                    <View style={{ marginTop:hp('2'), marginLeft:wp('4')}}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={'#E6DFDF'}
                            buttonInnerColor={'#E6DFDF'}
                            selectedButtonColor={'#E6DFDF'}
                            buttonSize={10}
                            buttonOuterSize={22}
                            radioStyle={{marginTop: hp('3')}}
                            labelStyle={{fontSize: 12, color: 'black', marginLeft:wp('5')}}
                            animation={true}
                            onPress={(value) => {this.setState({value:value})}}
                        />
                    </View>   
                </View>
            </View>

            {/* Next Button */}
            <View style={styles.nextButtonMainContainer}>
                <TouchableOpacity onPress={this.nextNavigation}>
                    <View style={styles.nextButtonBG}>
                        <Text style={styles.nextLabelStyle}>
                            NEXT
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
        </ScrollView>
        </ImageBackground>
    </View>
    );
}
}


const mapStateToProps = (state) => {
    return {
     
      shops: state.shops,
      dashboard: state.dashboard,
    };
  };
  const mapDispatchToProps = dispatch => ({
    shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds));                                },
  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(AssetUpdate)
  

const styles = StyleSheet.create({

headerMainContainer: { 
    flex:0.3, 
    backgroundColor: '#221818', 
},

headerInnerContainer:{
    flexDirection:'row', 
    marginTop:hp('2'), 
    marginLeft:wp('5'), 
    marginBottom:hp('2'),
},

imgColContainer:{
    flexDirection:'row',marginTop:hp('3.3'),marginLeft:hp(1)
},

imgStyle:{
    height: hp('6'), 
    width:wp('9'), 
    tintColor:'grey',
},

shopNameAddMainContainer:{
    flexDirection:'column',
    marginTop:hp('3'), 
    marginLeft:wp('5'),
},

shopNameTextStyle:{ 
    color: '#FFFFFF', 
    fontSize:16, 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
},

shopAddTextStyle:{ 
    color: '#796A6A', 
    fontSize:12,
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    marginTop:hp('1'),
},

chooseActionMainContainer:{
    marginTop: hp('5'), 
    justifyContent:'center', 
    alignItems:'center',
},

chooseBGContainer:{
    backgroundColor:'#FFFFFF', 
    height:hp('43'), 
    width:wp('90'), 
    borderRadius:wp('2'),
    borderColor:'#d5d7db', 
    borderWidth:wp('0.1'),
},

chooseTextStyle:{  
    color: '#221818', 
    fontSize:12, 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova', 
    marginTop:hp('2'), 
    marginLeft:wp('4'),
},

middleLineStyle: {
    width:wp('75'),    
    borderBottomColor: '#E6DFDF',
    borderBottomWidth: wp('0.3'),
    alignSelf:'center',
    marginTop: hp('3'),
},

nextButtonMainContainer:{
    marginTop:hp('13'), 
    alignItems:'center', 
    justifyContent:'center',
},

nextButtonBG:{
    backgroundColor:'#221818', 
    height:hp('9'), 
    width:wp('90'), 
    borderRadius:wp('2'), 
    alignItems:'center',
    justifyContent:'center',
},

nextLabelStyle:{ 
    color: '#FFFFFF', 
    fontSize:RFValue(15), 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
},

});