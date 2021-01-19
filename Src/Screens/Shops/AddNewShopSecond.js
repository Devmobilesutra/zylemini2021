import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, FlatList,ImageBackground,AsyncStorage,PermissionsAndroid} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import NextButton from '../../components/NextButton'
import { Dropdown } from 'react-native-material-dropdown';
import { ActionSheet,Root } from 'native-base';
import { TOTAL_SHOPS} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
var app_order_id
var curentDatetime
var data1,data2,data3,data4

const data = [{
    value: 'Shop 1',
    }, {
    value: 'Shop 2',
    }, 
];
export class AddNewShopSecond extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        contactPersonName:'',
        contactPersonMob:'',
        ShopType:'',
        ShopId:'',
        ShopArea:'',
        ShopRegNo:''


        };
    }

    static navigationOptions = {
        title: 'Add New Party',
        color: 'white',
          headerStyle: {
              backgroundColor: '#221818'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff', marginLeft: wp('-2'),fontSize:20,fontWeight:'bold'
          },
      
        headerLeft: (
              <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
                  <TouchableOpacity   onPress={() =>Actions.AddNewShop() }>  
                      <Image  style={{marginLeft:wp('4'),}}
                          source = {require('../../assets/Icons/Back_White.png')}
                      />
                  </TouchableOpacity> 
              </View>
       )
                                     
      }
      
      
    componentWillMount(){
       
 }
  NextButton = () => {
   
   // if (this.state.ShopType) {
     if (this.state.ShopId) {
//if(this.state.ShopArea){
            if(this.state.ShopRegNo){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    app_order_id = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
    app_order_id = app_order_id.replace(/[|&:$%@"/" "()+,]/g, "");
    curentDatetime=year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec
    
    //console.log(app_order_id)
  //  alert(app_order_id)
  db.insertNewShopnewpartyoutlet(app_order_id,this.props.BeatID,this.props.outletNAme,this.state.contactPersonMob,this.props.OwnerName,this.props.address,"",
 this.props.userLatitude,this.props.userLongitude,"N",curentDatetime,this.state.ShopType,this.state.ShopRegNo,this.state.ShopId ,this.state.contactPersonName ,this.state.ShopArea)
 
 var counts=0
//  alert(this.state.fileList.length)
 for(let i=0;i<this.props.fileList.length;i++){
    counts++    
     db.insertNewPartyImages(app_order_id,"N",this.props.fileList[i].url.uri)
     Actions.Shops()
 } 
 
     }else{
 alert("Enter ShopReg No.")
     }
 //}
//  else{
//      alert("Enter ShopArea")    
//      }
// 
 }else{
     alert("Enter ShopId")
 }
 Actions.Shops()
//}
//  else{
//     alert("Enter ShopType")
// }
 
 }

    render() {
        return (
           
               // <TouchableOpacity onPress={this.NextButton.bind(this)}>
               <View>
               <ImageBackground
                      source={require('../../assets/Icons/android_BG.png')}
                      style={{height:hp('89'), width:wp('100'), resizeMode: 'cover',  justifyContent: 'center',}}
               >
                  <ScrollView
                      showsVerticalScrollIndicator={false}
                  >
                      {/* Contact Person */}
                      <View style={styles.contactPersonMainContainer}>
                          <Text style={styles.contactPersonLabelStyle}>
                              CONTACT PERSON
                          </Text>
                      </View>
      
                      {/* Name */}
                      <View>
                          <View style={styles.nameMainContainer}>
                              <Text style={styles.nameTextStyle}>
                                  NAME
                              </Text>
                          </View>
                          <View style={styles.nameTextBoxMainContainer}>
                              <TextInput
                                      placeholder= "Type Here"
                                      style={styles.nameTextBoxSelfContainer}
                                       onChangeText={text => this.setState({contactPersonName:text})}
                                  />
                          </View>
                      </View>
      
                       {/* Mobile No */}
                      <View>
                          <View style={styles.nameMainContainer}>
                              <Text style={styles.nameTextStyle}>
                                  MOBILE NO.
                              </Text>
                          </View>
                          <View style={styles.nameTextBoxMainContainer}>
                              <TextInput
                                      placeholder= "Type Here"
                                       keyboardType= "numeric"
                                      style={styles.nameTextBoxSelfContainer}
                                      onChangeText={text => this.setState({contactPersonMob:text})}
                                  />
                          </View>
                      </View>
      
                      {/* Middle Gray Line */}
                      <View style={{marginTop:hp('3')}}>
                          <View style={{height:hp('1'), width:wp('100'), backgroundColor:'#E6DFDF', }}></View>
                      </View>
      
                      {/* Shop Type */}
                      <View style={{marginTop:hp('1')}}>
                          <View style={styles.nameMainContainer}>
                              <Text style={styles.nameTextStyle}>
                                  SHOP TYPE
                              </Text>
                          </View>
                          <View style={styles.nameTextBoxMainContainer}>
                              <Dropdown
                              value={this.state.ShopType}
                              placeholder= 'Select'
                              itemCount = {4} 
                              containerStyle={styles.dropDownContainer}
                              pickerStyle={{width:wp('89.2')}}
                              rippleCentered={true}
                              itemColor = '#ADA2A2'
                              inputContainerStyle={{ borderBottomColor: 'transparent' }}
                              data = {data}
                              dropdownPosition={-3.4}
                              dropdownOffset={{top:20, left:18,}}
                              rippleOpacity={0}
                              onChangeText={(value) => { this.setState({ShopType: value})}}
                          />
                          </View>
                      </View>
      
                      {/* Shop Id */}
                      <View>
                          <View style={styles.nameMainContainer}>
                              <Text style={styles.nameTextStyle}>
                                  SHOP ID
                              </Text>
                          </View>
                          <View style={styles.nameTextBoxMainContainer}>
                              <TextInput
                                      placeholder= "Type Here"
                                      //  keyboardType= "numeric"
                                      style={styles.nameTextBoxSelfContainer}
                                      onChangeText={text => this.setState({ShopId:text})}
                                  />
                          </View>
                      </View>
      
                      {/* Shop Area */}
                      <View>
                          <View style={styles.nameMainContainer}>
                              <Text style={styles.nameTextStyle}>
                                  SHOP AREA
                              </Text>
                          </View>
                          <View style={styles.nameTextBoxMainContainer}>
                              <Dropdown
                              value={this.state.ShopArea}
                              placeholder= 'Select'
                              itemCount = {4} 
                              containerStyle={styles.dropDownContainer}
                              pickerStyle={{width:wp('89.2')}}
                              rippleCentered={true}
                              itemColor = '#ADA2A2'
                              inputContainerStyle={{ borderBottomColor: 'transparent' }}
                              data = {data}
                              dropdownPosition={-3.4}
                              dropdownOffset={{top:20, left:18,}}
                              rippleOpacity={0}
                              onChangeText={(value) => { this.setState({ShopArea:value}) }}
                          />
                          </View>
                      </View>
      
                      {/* Shop Registration no */}
                      <View>
                          <View style={styles.nameMainContainer}>
                              <Text style={styles.nameTextStyle}>
                                  REGISTRATION NO.
                              </Text>
                          </View>
                          <View style={styles.nameTextBoxMainContainer}>
                              <TextInput
                                      placeholder= "Type Here"
                                      // keyboardType= "numeric"
                                      style={styles.nameTextBoxSelfContainer}
                                      onChangeText={text => this.setState({ShopRegNo:text})}
                                  />
                          </View>
                      </View>
      
                  <View style={{marginTop:hp('10')}}></View>
                  </ScrollView>
                      {/* Register Button */}
                      <TouchableOpacity onPress={this.NextButton.bind(this)}>
                          <View>
                              <View style={styles.button}>
                                  <Text style={styles.buttonText} > REGISTER </Text>
                              </View>
                          </View>
                      </TouchableOpacity>
               </ImageBackground>
              </View>
          
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewShopSecond)

const styles = StyleSheet.create({
    contactPersonMainContainer:{
        marginTop:hp('4'),
        marginLeft:wp('5'),
    },

    contactPersonLabelStyle:{ 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
    },

    nameMainContainer: {
        flex:1,
    },

    nameTextStyle: { 
        color:'#796A6A', 
        fontSize:10, 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        marginLeft: wp('5'),
        marginTop:hp('3'),
    },

    nameTextBoxMainContainer:{
        flex:1, 
        marginTop:hp('1.5')
    },

    nameTextBoxSelfContainer:{ 
        height: hp('9'), 
        width:wp('90'), 
        borderColor: '#E6DFDF', 
        borderWidth: 1,
        borderRadius:wp('2') , 
        backgroundColor: '#ffffff',
        alignSelf:'center', 
        padding: 15,
    },

    dropDownContainer : {
        borderColor:'#E6DFDF', 
        borderRadius: wp('2'), 
        width: wp('90'), 
        height: hp('9'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal:hp('2'), 
        borderWidth:wp('0.3'), 
        alignSelf:'center',
        padding: -1,
    },

    button: {
        width: wp('100'),
        height: hp('8'),
        backgroundColor: '#46BE50',
        marginVertical: 1,
        paddingVertical: 15,
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
       alignItems: 'center',
       justifyContent: 'center',
      
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

});
