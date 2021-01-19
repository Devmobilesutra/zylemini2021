import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, FlatList} from 'react-native';
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

export  class DiscardAssetStep2 extends Component {
constructor(props) {
    super(props);
    this.state = { 
        fileList: [],
    };
}

static navigationOptions = {
  title: 'Discard Asset : Step 2/3',
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
              <Image style={styles.imagesFrompHOTO}
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
                <View style = {styles.headerMainContainer}>
                    <View style={styles.headerInnerContainer}>
                        <View style={styles.imgColContainer}>
                            <Image style={styles.imgStyle}
                                source={require('../../assets/Icons/Shop_card_watermark.png')}/>
                        </View>
                        <View style={styles.shopNameAddMainContainer}>
                            <Text style={styles.shopNameTextStyle}>
                                Mangalam Shop
                            </Text>
                            <Text style={styles.shopAddTextStyle}>
                                Kothrud, Pune
                            </Text>
                        </View>
                    </View>  
                </View>
                {/* Asset Type */}
                <View style= {styles.assetTypeMainContainer}>
                    <View style= {styles.ATColContainer}>
                        <Text  style = {styles.ATLableStyle}>
                            ASSET TYPE
                        </Text>
                    </View>
                    <View style= {styles.ATTypesColContainer}>
                        <Text  style = {styles.ATTypesStyle}>
                           Refrigerator
                        </Text>
                    </View>
                </View>
                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                {/* MANUFACTURED BY*/}
                <View style= {styles.MBMainContainer}>
                    <View style= {styles.MBColContainer}>
                        <Text  style = {styles.MBLabelStyle}>
                            MANUFACTURED BY
                        </Text>
                    </View>
                    <View style= {styles.MBTypesColContainer}>
                        <Text  style = {styles.MBTypesStyle}>
                           Bosch
                        </Text>
                    </View>
                </View>
                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                 {/* MODEL */}
                <View style= {styles.ModelMainContainer}>
                    <View style= {styles.modelColContainer}>
                        <Text  style = {styles.modelLabelStyle}>
                            MODEL
                        </Text>
                    </View>
                    <View style= {styles.modelNoContainer}>
                        <Text  style = {styles.modelNoStyle}>
                            MD Cool 15455
                        </Text>
                    </View>
                </View>
                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                 {/* SERIAL NUMBER */}
                <View style= {styles.SNMainContainer}>
                    <View style= {styles.SNColContainer}>
                        <Text  style = {styles.SNLabelStyle}>
                            SERIAL NUMBER
                        </Text>
                    </View>
                    <View style= {styles.SNNoColContainer}>
                        <Text  style = {styles.SNNoNosStyle}>
                            SRNO12345678910
                        </Text>
                    </View>
                </View>
                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                {/* Installation Date */}
                <View style= {styles.IDMainContainer}>
                    <View style= {styles.IDLabelContainer}>
                        <Text  style = {styles.IDLabelStyle}>
                            Installation Date
                        </Text>
                    </View>
                    <View style= {styles.IDDatesContainer}>
                        <Text  style = {styles.IDDatesStyle}>
                            20/12/2016
                        </Text>
                    </View>
                </View>
                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                {/* Allocated To */}
                <View style={styles.ALTMainContainer}>
                    <View style= {styles.ALToLabelContainer}>
                        <Text  style = {styles.ALToLabelStyle}>
                            ALLOCATED TO
                        </Text>
                    </View>

                    <View style= {{flexDirection:'column',}}>
                       <View style={styles.ALToRedDaughtStyle}></View>
                    </View>

                    <View style= {styles.ALToShopContainer}>
                        <Text  style = {styles.ALToShopStyle}>
                            Mangalam Shop Warje, Pune
                        </Text>
                    </View>  
                </View>
                 {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                    <Dash style={styles.dashLineStyle}
                        dashLength = {2}
                        dashColor = '#ADA2A2'
                    />
                </View>

                 <View>
                    <View style={styles.OODMainContainer}>
                        <Text style={styles.OODTextStyle}>
                            ADD PICTURES
                        </Text>
                    </View>
                    <View style={styles.addPicturesContainer}>
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

            </View>
            <View style={{marginTop:hp('5')}}></View>
        </ScrollView>
            {/* Confirm Cancel Button */}
            <View style={styles.ButtonsMainContainer}>
                <TouchableOpacity onPress={() => Actions.DiscardAssetStep3()}>
                    <View style={styles.ConfirmBGStyle}>
                        <Text style={styles.ConfirmTextStyle}>
                            CONFIRM ASSET DETAILS
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={styles.CancelBGStyle}>
                        <Text style={styles.CancelTextStyle}>
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
  export default connect(mapStateToProps, mapDispatchToProps)(DiscardAssetStep2)
  

const styles = StyleSheet.create({

    headerMainContainer: { 
        flex:0.3, 
        backgroundColor: '#210305', 
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

    assetTypeMainContainer:{ 
        flex:1, 
        flexDirection:'row',   
        marginTop:hp('2.5'), 
    },

    ATColContainer:{ 
        flex: 0.5, 
        flexDirection:'column', 
    },

    ATLableStyle:{  
        color:'#796A6A', 
        fontSize:10, 
        fontWeight: 'bold', 
        fontFamily: 'Proxima Nova', 
        marginLeft:wp('6'),
    },

    ATTypesColContainer:{ 
        flex: 1, 
        flexDirection:'column', 
        alignItems:'center', 
    },

    ATTypesStyle:{ 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
       
    },

    dashLineContainer: {
        // flex:1, 
        marginTop:hp('2.5'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('88'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },

    MBMainContainer:{ 
        flex:1, 
        flexDirection:'row',   
        marginTop:hp('2.5'), 
    },

    MBColContainer:{ 
        flex: 0.5, 
        flexDirection:'column', 
    },

    MBLabelStyle:{  
        color:'#796A6A', 
        fontSize:10, 
        fontWeight: 'bold', 
        fontFamily: 'Proxima Nova', 
        marginLeft:wp('6'),
    },

    MBTypesColContainer:{ 
        flex: 1, 
        flexDirection:'column', 
        alignItems:'center' ,
    },

    MBTypesStyle:{ 
        color:'#796A6A', 
        fontSize:10, 
        fontFamily: 'Proxima Nova',
       
        marginRight:wp('8'),
    },

    ModelMainContainer:{ 
        flex:1, 
        flexDirection:'row',   
        marginTop:hp('2.5'), 
    },

    modelColContainer:{ 
        flex: 0.5, 
        flexDirection:'column', 
    },

    modelLabelStyle:{  
        color:'#796A6A', 
        fontSize:10, 
        fontWeight: 'bold', 
        fontFamily: 'Proxima Nova', 
        marginLeft:wp('6'),
    },

    modelNoContainer:{ 
        flex: 0.9, 
        flexDirection:'column', 
        alignItems:'center', 
    },

    modelNoStyle:{ 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
   
    },

    SNMainContainer:{ 
        flex:1, 
        flexDirection:'row',  
        marginTop:hp('2.5'), 
    },

    SNColContainer:{ 
        flex: 0.5, 
        flexDirection:'column', 
    },

    SNLabelStyle:{  
        color:'#796A6A', 
        fontSize:10, 
        fontWeight: 'bold', 
        fontFamily: 'Proxima Nova', 
        marginLeft:wp('6'),
    },

    SNNoColContainer:{ 
        flex: 0.9, 
        flexDirection:'column', 
        alignItems:'center', 
    },

    SNNoNosStyle:{ 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
     
        marginLeft:wp('5'),
    },

    IDMainContainer:{ 
        flex:1, 
        flexDirection:'row',   
        marginTop:hp('2.5'), 
    },

    IDLabelContainer:{ 
        flex: 0.5, 
        flexDirection:'column', 
    },

    IDLabelStyle:{  
        color:'#796A6A', 
        fontSize:10, 
        fontWeight: 'bold', 
        fontFamily: 'Proxima Nova', 
        marginLeft:wp('6'),
    },

    IDDatesContainer:{ 
        flex: 1, 
        flexDirection:'column', 
        alignItems:'center',
    },

    IDDatesStyle:{ 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
  
    },

    ALTMainContainer:{  
        flex:1,  
        flexDirection:'row',
        marginTop:hp('2.5'), 
    },

    ALToLabelContainer:{ 
        flex: 0.4, 
        flexDirection:'column', 
        marginLeft:wp('6'),
    },

    ALToLabelStyle:{ 
        color:'#796A6A', 
        fontSize:10, 
        fontFamily: 'Proxima Nova', 
        fontWeight: 'bold',  
    },

    ALToRedDaughtStyle:{
        width: 25,
        height: 25, 
        flexWrap:"wrap",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25 / 2,
        backgroundColor: "red",
        borderColor: 'red',
        marginRight:wp('3'),
    },

    ALToShopContainer:{ 
        flex: 0.5, 
        flexDirection:'column', 
        alignItems:'center',
        marginTop:wp('-1'),
    },

    ALToShopStyle:{ 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
        marginLeft:wp('8'),
     
    },

    ButtonsMainContainer:{
        flexDirection:'column', 
        alignItems:'center',
    },

    ConfirmBGStyle:{   
        backgroundColor:'#221818', 
        height:hp('8'), 
        width:wp('90'), 
        borderRadius:wp('2'),
        alignItems:'center',
        justifyContent:'center',
    },

    ConfirmTextStyle:{ 
        color: '#FFFFFF', 
        fontSize:12, 
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    CancelBGStyle:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:hp('3'),
    },

    CancelTextStyle:{ 
        color: 'black', 
        fontSize:12, 
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    

    OODMainContainer: {
        flex:1,
    },

    OODTextStyle: { 
        color:'#796A6A', 
        fontSize:12, 
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', 
        marginLeft: wp('6'),
        marginTop:hp('3'),
    },

    addPicturesContainer:{
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

    imagesFrompHOTO: {
        height:hp('18'), 
        width:wp('40'),
        borderRadius:wp('2'), 
        justifyContent:'center',
        alignItems:'center',
        marginLeft:wp('7'),
        marginRight:wp('2'),
        marginTop:hp('1'),
    },

});
