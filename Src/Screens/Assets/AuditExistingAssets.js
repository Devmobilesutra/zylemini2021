
import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

import { TOTAL_SHOPS,SHOP_INFO,SHOP_VISITED_TODAY} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();


export class AuditExistingAssets extends Component {
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
                    <Image style={styles.imgStyle}
                            source={require('../../assets/Icons/Shop_card_watermark.png')}/>
                    </View>
                    <View style={styles.shopNameAddContainer}>
                        <Text style={styles.shopNameTextStyle}>
                        {this.props.shops.shopname}
                        </Text>
                         <Text style={styles.shopAddressTextStyle}>
                         {this.props.shops.ShopAreas}
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
   
    shops: state.shops,
    dashboard: state.dashboard,
  };
};
const mapDispatchToProps = dispatch => ({
 // shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds));                                },
}
)
export default connect(mapStateToProps, mapDispatchToProps)(AuditExistingAssets)

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
    marginLeft:wp('1'),
  },

  shopNameBG:{ 
    backgroundColor: '#221818', 
  },

  shopNameIMGContainer:{
    flexDirection:'row', 
    marginTop:hp('1'), 
    marginLeft:wp('5'), 
    marginBottom:hp('2'),
  },

  shopImgContainer:{
    flexDirection:'row',marginTop:hp('3'),marginLeft:hp(1)
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

  imgStyle:{
    height: hp('6'), 
    width:wp('9'), 
    tintColor:'grey',
},

  

});