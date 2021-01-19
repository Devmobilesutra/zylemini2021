import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';



import {ASSET_INFO,ASSET_INFO_FLAG,QR_CODE} from '../../Redux/actions/AssetsAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
export  class AddNewAssetTabBar extends Component {
constructor(props) {
    super(props);
    this.state = {  };
}

render() {
     return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.backArrowContainer}>
              <TouchableOpacity   onPress={() =>Actions.AssetUpdate() }>  
                  <Image  style={styles.backArrowStyle}
                      source = {require('../../assets/Icons/Back_White.png')}
                  />
              </TouchableOpacity>
            <Text style={styles.assetLabelStyle}> Asset </Text>
          </View>
         
        </View>

        <View>
            {/* Header */}
            <View style = {styles.shopNameBG}>
                <View style={styles.shopNameIMGContainer}>
                    <View style={styles.shopImgContainer}>
                        <Image style={styles.shopImgStyle}
                            source={require('../../assets/Icons/Shop_card_watermark.png')}/>
                    </View>
                    <View style={styles.shopNameAddContainer}>
                        <Text style={styles.shopNameTextStyle}>
                            Mangalam Shop
                        </Text>
                         <Text style={styles.shopAddressTextStyle}>
                            Kothrud, Pune
                        </Text>
                    </View>
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddNewAssetTabBar)


const styles = StyleSheet.create({

  mainContainer:{
    flexDirection:'row',
    backgroundColor: '#221818', 
    color: '#fff', 
    height:hp('8'),
  },

  backArrowContainer: {
    flexDirection:"row", 
    alignItems:'flex-start',
    flex:1,
    alignSelf:'center',
  },

  backArrowStyle:{
    marginLeft:wp('4'),
  },

  assetLabelStyle:{ 
    color: '#FFFFFF', 
    fontSize:RFValue(16), 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    alignSelf:'center', 
    marginLeft:wp('7'),
  },

  shopNameBG:{ 
    backgroundColor: '#210305', 
  },

  shopNameIMGContainer:{
    flexDirection:'row', 
    marginTop:hp('2'), 
    marginLeft:wp('5'), 
    marginBottom:hp('2'),
  },

  shopImgContainer:{
    flexDirection:'column',
  },

  shopImgStyle:{
    height: hp('10'), 
    width:wp('15'), 
    tintColor:'grey',
  },

  shopNameAddContainer:{
    flexDirection:'column',
    marginTop:hp('3'), 
    marginLeft:wp('5'),
  },

  shopNameTextStyle:{ 
    color: '#FFFFFF', 
    fontSize:RFValue(15), 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },

  shopAddressTextStyle:{ 
    color: '#796A6A', 
    fontSize:RFValue(12), 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova', 
    marginTop:hp('1'),
  }, 

});
