import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, FlatList, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { ActionSheet,Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import {ASSET_INFO,ASSET_INFO_FLAG,QR_CODE} from '../../Redux/actions/AssetsAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();

const data = [{
    value: 'Shop 1',
    }, {
    value: 'Shop 2',
    }, 
];

export  class DiscardAssetStep3 extends Component {
constructor(props) {
    super(props);
    this.state = {  };
}

static navigationOptions = {
  title: 'Discard Asset : Step 3/3',
  color: 'white',
    headerStyle: {
        backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff', marginLeft: wp('-1.5'),fontSize:12,fontWeight:'bold'
    },

    headerLeft: (
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.Manual() }>  
                <Image  style={{marginLeft:wp('4'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
        </View>
    )                               
}

onClickAddImage=()=>{
    const BUTTONS=['Take photo','Choose','cancel']
    ActionSheet.show({options:BUTTONS,cancelButtonIndex:2,title:"select photo"},
    buttonIndex=>{
        switch(buttonIndex){
            case 0:  
                this.takePhotoFromCamera()
                break;

            case 1:    
                this.takePhotoFromLibrary()
                break;
              
            default:break;
          }
    })
}

takePhotoFromCamera=()=>{
    ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            // cropping: true,
    }).then(image => {
        this.onSelectedImage(image)
        //console.log(image);
    });
}

takePhotoFromLibrary=()=>{
    ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            // cropping: true
    }).then(image => {
        this.onSelectedImage(image)
        //console.log(image);
    });
}

onSelectedImage=(image)=>{
    let newDataImg=this.state.fileList;
    const source={uri:image.path};
    let item={
        id:Date.now(),
        url:source,
        content:image.data
    }
    newDataImg.push(item);
    this.setState({fileList:newDataImg})
}

renderItem=({item,indx})=>{
      return(
          <View>
              <Image style={{ 
                            height:hp('18'), 
                            width:wp('40'),
                            borderRadius:wp('2'), 
                            justifyContent:'center',
                            alignItems:'center',
                            marginLeft:wp('7'),
                            marginRight:wp('2'),
                            marginTop:hp('1'),
                        }}
              source={item.url}
              ></Image>
          </View>
      )
}


showPhoto() {
    let{content}=styles
    let{fileList}=this.state
        return (
            <Root>
            <View>
                <FlatList
                horizontal={true}
                data={fileList}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=>index.toString()}
                extraData={this.state}
               />
            </View>
            </Root>
        )
}


render() {
    return (
        <View style={{flex:1}} >
        <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
        > 
        <ScrollView
                    showsVerticalScrollIndicator={false}
        >
            <View>
                
                {/* Header */}
                <View style = {styles.container}>
                    <View style= {styles.assetTypeContainer}>
                        <Text  style = {styles.assetTypeLabelStyle}>
                            ASSET TYPE
                        </Text>
                        <Text  style = {styles.assetTypesTextStyle} >
                            Refrigerator
                        </Text>
                    </View>

                    <View style= {styles.modelContainer}>
                        <Text  style = {styles.modelLabelStyle}>
                            MODEL
                        </Text>
                        <Text  style = {styles.modelNoStyle}>
                            MD Cool 15455  
                        </Text>
                    </View>
                </View>

                {/* Add Photos */}
                <View>
                    <View style={{ flex:1,}}>
                        <Text style={styles.addPicturesTextStyle}>
                            ADD PHOTOS
                        </Text>
                    </View>
                    <View style={styles.addPictureContainer}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.addIconContainer}>
                                <TouchableOpacity 
                                            // onPress={() =>Actions.camera()}
                                            onPress={this.onClickAddImage}
                                            >
                                    <Image  style={styles.addIconStyle}
                                                    source = {require('../../assets/Icons/Add_Images.png')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'column'}}>
                                {this.showPhoto()}
                            </View>
                        </ScrollView>
                    </View>  
                </View> 

                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                {/* Current Location */}
                <View style={{marginTop:hp('1')}}>
                    <View style={styles.nameMainContainer}>
                        <Text style={styles.nameTextStyle}>
                            CURRENT LOCATION
                        </Text>
                    </View>
                    <View style={styles.nameTextBoxMainContainer}>
                        <Dropdown
                        placeholder= 'Select'
                        itemCount = {4} 
                        containerStyle={styles.dropDownContainer}
                        pickerStyle={{width:wp('89.2')}}
                        rippleCentered={true}
                        itemColor = '#ADA2A2'
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                        data = {data}
                        fontSize={11}
                        dropdownPosition={-3.4}
                        dropdownOffset={{top:20, left:18,}}
                        rippleOpacity={0}
                    />
                    </View>
                </View>

                {/* CONDITION */}
                <View style={{marginTop:hp('1')}}>
                    <View style={styles.nameMainContainer}>
                        <Text style={styles.nameTextStyle}>
                            CONDITION
                        </Text>
                    </View>
                    <View style={styles.nameTextBoxMainContainer}>
                        <Dropdown
                        placeholder= 'Select'
                        itemCount = {4} 
                        containerStyle={styles.dropDownContainer}
                        pickerStyle={{width:wp('89.2')}}
                        rippleCentered={true}
                        itemColor = '#ADA2A2'
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                        data = {data}
                        fontSize={11}
                        dropdownPosition={-3.4}
                        dropdownOffset={{top:20, left:18,}}
                        rippleOpacity={0}
                    />
                    </View>
                </View>

                 {/*  REASON */}
                <View style={{marginTop:hp('1')}}>
                    <View style={styles.nameMainContainer}>
                        <Text style={styles.nameTextStyle}>
                            REASON
                        </Text>
                    </View>
                    <View style={styles.nameTextBoxMainContainer}>
                        <Dropdown
                        placeholder= 'Select'
                        itemCount = {4} 
                        containerStyle={styles.dropDownContainer}
                        pickerStyle={{width:wp('89.2')}}
                        rippleCentered={true}
                        itemColor = '#ADA2A2'
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                        data = {data}
                        fontSize={11}
                        dropdownPosition={-3.4}
                        dropdownOffset={{top:20, left:18,}}
                        rippleOpacity={0}
                    />
                    </View>
                </View>

                {/* Remark */}
                <View>
                    <View style={styles.remarkMainContainer}>
                        <Text style= {styles.remarkTextStyle} >
                            REMARKS
                        </Text>
                    </View>
                    <View style={styles.remarkTextViewContainer}>
                        <TextInput
                      multiline={true}
                      textAlignVertical='top'
                            style={styles.remarkTextInputStyle}
                            // onChangeText={text => onChangeText(text)}

                        />
                    </View>
                </View>

            <View style={{marginTop:hp('10')}}></View>
            </View>
        </ScrollView>
            <View style={styles.buttonsMainContainer}>
                    <TouchableOpacity >
                        <View style={styles.reqToDiscardButtonContainer}>
                            <Text style={styles.reqToDiscardButtonTextStyle}>
                                REQUEST TO DISCARD
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={styles.cancelButtonContainer}>
                            <Text style={styles.cancelButtonTextStyle}>
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

const mapStateToProps = (state) => {
    return {
     
     
    };
  };
  const mapDispatchToProps = dispatch => ({
    
  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(DiscardAssetStep3)
  

const styles = StyleSheet.create({

    container : {
        flex:5, 
        flexDirection:'row',
        backgroundColor: '#210305'
     },

    assetTypeContainer: {
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'flex-start',
    },

    assetTypeLabelStyle: {
        color: '#796A6A', 
        fontSize:10,
        fontWeight: 'bold',
        marginTop: hp('3%'), 
        fontFamily: 'Proxima Nova', 
        marginLeft: wp('5%'),
    },

    assetTypesTextStyle: {
        color: 'white', 
        fontSize:12,
        marginTop: hp('1%'), 
        marginLeft: wp('5%'),
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('2')
    },

    modelContainer: {
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'center',
    },

    modelLabelStyle: {
        color: '#796A6A', 
        fontSize:10,
        fontWeight: 'bold', 
        marginTop: hp('3%'), 
        marginRight: wp('30'), 
        fontFamily: 'Proxima Nova',
    },

    modelNoStyle: {
        color: '#FFFFFF', 
        fontSize:12,
        marginTop: hp('1%'), 
        marginRight: wp('20'), 
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('2') ,
    },

    addPicturesTextStyle:{ 
        color:'#796A6A', 
        fontSize:10, 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        marginLeft: wp('6'),
        marginTop:hp('3'),
    },

    addPictureContainer:{
        flexDirection:'row', 
        marginTop:hp('2'),
        marginLeft:wp('4'),
    },

    addIconContainer:{
        flexDirection:'column', 
        marginTop:hp('2'),
    },

    addIconStyle:{
        height:hp('7'), 
        width:wp('12'),
    },
    
    
    dashLineContainer: {
        // flex:1, 
        marginTop:hp('3'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('88'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },
    dashLineContainer: {
        // flex:1, 
        marginTop:hp('3'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('88'), 
        height:hp('1'), 
        color: '#ADA2A2',
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
        marginTop:hp('2'),
    },

    nameTextBoxMainContainer:{
        flex:1, 
        marginTop:hp('1.5')
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
        justifyContent: 'center', alignContent: 'center', alignSelf: 'center',
        textAlign: 'center',
        padding: 15,
    },

      remarkMainContainer: {
    flex:1, 
    alignItems:'flex-start', 
    marginHorizontal: hp('3'),
    marginVertical: wp('8'),
    
  },

  remarkTextStyle: {
    color:'#8C7878',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    fontSize: 10, 
  },

  remarkTextViewContainer: {
    flex:1, 
    marginVertical:hp('-3'), 
    marginHorizontal:wp('5'),
    alignSelf:'center',
    // padding:1,
  },

  remarkTextInputStyle: { 
    height: hp('15'),
    width:wp('88'), 
    borderColor: '#E6DFDF', 
    borderWidth: 1, 
    borderRadius:wp('2') , 
    backgroundColor: '#ffffff',
    padding:5,
  },

    buttonsMainContainer:{
        flexDirection:'column', 
        alignItems:'center',
    },

    reqToDiscardButtonContainer:{   
        backgroundColor:'red', 
        height:hp('8'), 
        width:wp('90'), 
        borderRadius:wp('2'), 
        alignItems:'center',
        justifyContent:'center',
    },

    reqToDiscardButtonTextStyle:{ 
        color: '#ffffff', 
        fontSize:12 ,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    cancelButtonContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:hp('3'),
    },

    cancelButtonTextStyle:{ 
        color: 'black', 
        fontSize:12, 
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },


});