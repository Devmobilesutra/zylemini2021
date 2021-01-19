import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux'


import Database from './../../utility/Database'
import { onChange } from 'react-native-reanimated';
import { Actions } from 'react-native-router-flux';
import Autocomplete from 'react-native-autocomplete-input';
const db = new Database();

import SublistExtended from './SublistExtended';
import ShopDetailExtended from './ShopDetailExtended'



export class ShopDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {ShopName:'',
            info: [],Area:'',Address:'',Contact:'', collapsed:false,
        };
    }


  
    
    componentWillMount(){

      this._componentFocused();

     this._sub = this.props.navigation.addListener(
            'didFocus',
            this._componentFocused

        );
     
           }


    _componentFocused = () => {

      var outletId =''
      var InfoString=''
      var shop=''
     outletId = this.props.id
 //console.log("outId==",outletId)



 db.getOutletInfo(outletId).then((data) => {
     for(var i=0;i<data.length;i++){
         shop=data[0].Party
      InfoString=data[0].Outlet_Info
         //console.log("Sras==",data[0].Outlet_Info)
     }

var nameArr = InfoString.split('||');
var Areas=InfoString.split('||')[0]
var Addresss=InfoString.split('||')[1]
var Contacts=InfoString.split('||')[2]


this.setState({ShopName:shop})
this.setState({Area:Areas})
this.setState({Address:Addresss})
this.setState({Contact:Contacts})
 })   

      
    }
    ToggleArrow(){

        if( this.state.collapsed == false){
            return(
              <View>
                  <Image style={styles.rightArrowStyle} 
                        source = {require('../../assets/Icons/right_arrow_front.png')}/>
              </View>
          )
        }
        else {
            return(
              <View>
                    <Image style={styles.rightArrowStyle} 
                        source = {require('../../assets/Icons/right_arrow.png')}/>
              </View>
            )
        }
      }
    
    
    rendershops() {
        const { navigation } = this.props;
        // return this.state.shopname.map((item, i) => {
            return (
                <View style={styles.Container}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >
                    <Collapse 
                       onToggle={( )=>this.setState({collapsed:!this.state.collapsed})}
                    >
                    <CollapseHeader style={styles.collapseHeaderStyle}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.imageStyles} 
                                source = {require('../../assets/Icons/shopImg.png')}/>
                        </View>
                         <View style={styles.shopDetailsContainer}>
                            <Text style={styles.shopNameTextStyle}>
                                {this.state.ShopName}
                            </Text >
                            <Text style={styles.shopAddressTextStyle}>
                               {this.state.Area}
                            </Text>
                            {/* <Text style={styles.shopDistanceTextStyle}>
                                1 Km Away     ETA 5Mins
                            </Text> */}
                        </View>
                        <View style={styles.rightArrowContainer}>
                            {this.ToggleArrow()}
                                        
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <ListItem style={styles.cardContainer} >
                        {/* <ShopDetailExtended navigation={navigation}/> */}

                        <View >

                    <View style= {styles.ownerRowContainer}>
                        <View style= {styles.ownerContainer}>
                            <Text  style = {styles.ownerTextStyle}>
                                OWNER
                            </Text>
                            <Text  style = {styles.ownaerNameTextStyle}>
                                Roopkumar Singh
                            </Text>
                        </View>
                        <View style= {styles.shopTypeContainer}>
                            <Text  style = {styles.shopTypeHeaderTextStyle}>
                                SHOP TYPE
                            </Text>
                            <Text  style = {styles.shopTypeTextStyle}>
                                General Store
                            </Text>
                        </View>
                    </View>

                    <View style={styles.ownerBottomContainer}>
                       <Text  style = {styles.ownerBottomTextStyle}>
                                OWNER
                        </Text>
                    </View>

                    <View style={styles.addressContainer}>
                        <Text  style = {styles.addressTextContainer}>
                                Block 1, Commercial Complex, Street Name, Nearby Landmark.
                                Kothrud, Pune, Maharashtra, India
                        </Text>
                    </View>
                
                </View>
                        </ListItem>
                    </CollapseBody>
                    </Collapse>  
                </ScrollView>
            </View>
            )
      //  }
     //   )

    }

    render() {    
       
       
        return (
           <View style={{  marginTop:hp('1'),  marginTop:wp('1'),}}>
                {this.rendershops()}
                </View>

        );
    }
}



const mapStateToProps = (state) => {
    return {
     
    };
};

const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail)

const styles = StyleSheet.create({

   
  Container:{
    flex:1,
    marginTop:hp('1'),
    marginTop:wp('4'),
    // marginLeft:wp('-2'),
    justifyContent: 'flex-start',
   
    alignContent:'flex-start'
  },

  collapseHeaderStyle: {
    alignItems:'center' ,
    flexDirection:'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6DFDF',  
      borderTopEndRadius: wp('2'), 
      borderTopLeftRadius: wp('2'), 
    height: hp('20'), 
    // width: hp('44'),
     width: wp('88'),
    borderWidth: hp('0.3'), 
    // marginHorizontal: wp('4'),
  },

  imageContainer: { 
    flex:1, 
    alignItems: 'flex-start',
  },

  imageStyles: { 
    marginLeft: wp('5'),
    height:hp('10'),
    width:wp('19'),
  },

  shopDetailsContainer: { 
    flex:1.5, 
    flexDirection:'column', 
    alignItems: 'flex-start',
    marginTop: hp('-3'),
    marginLeft: wp('4'),
  },

  shopNameTextStyle: { 
    color:'#796A6A',  
    fontWeight: 'bold',
    fontFamily:'Proxima Nova', 
    fontSize:14,
    marginTop: hp('3'),
  },

  shopAddressTextStyle: { 
    color:'#796A6A', 
    fontFamily:'Proxima Nova', 
    fontSize:10, 
    marginVertical:wp('3'),
  },

  shopDistanceTextStyle: { 
    color:'#796A6A', 
    fontFamily:'Proxima Nova', 
    fontSize:wp('3'),
  },
  
  rightArrowContainer: { 
    flex:1, 
    alignItems: 'flex-end', 
    flexDirection:'row',
    marginTop:hp('-8'),
    marginRight:wp('6')
  },

  rightArrowStyle : { 
    marginLeft: wp('20'),
  },

  cardContainer: {
      
    flex:1,
        backgroundColor: '#FFFFFF',
        justifyContent:'center',
        borderColor: '#E6DFDF',
        borderBottomEndRadius: wp('2'), 
        borderBottomLeftRadius: wp('2'), 
            height: hp('28'), 
            width: wp('88'),
           //  width: hp('44'),
        marginLeft:hp('-0.01'),
        borderRightWidth: hp('0.3'), 
        borderLeftWidth: hp('0.3'), 
        borderBottomWidth: hp('0.4'), 
    },

    ownerRowContainer: { 
        flex:1, 
        flexDirection:'row', 
    },

    ownerContainer: { 
        flex:0.5, 
        flexDirection:'column', 
    },

    ownerTextStyle: {  
        color: '#796A6A', 
        fontSize: 12, 
        fontWeight: 'bold',  
        marginLeft: wp('6'),  
        fontFamily:'Proxima Nova', 
        marginTop:hp('3'),  
    },

    ownaerNameTextStyle: {  
        color: '#796A6A', 
        fontSize: 10, 
        marginTop: hp('1'), 
        marginLeft: wp('6'),  
        fontFamily:'Proxima Nova', 
    },

    shopTypeContainer: { 
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'flex-end',
    },

    shopTypeHeaderTextStyle: {  
        color: '#796A6A', 
        fontSize: 12, 
        fontWeight: 'bold',   
        marginRight: wp('17'), 
        fontFamily:'Proxima Nova', 
        marginTop: hp('3'), 
    },

    shopTypeTextStyle: {  
        color: '#796A6A', 
        fontSize: 10, 
        marginTop: hp('1%'), 
        marginRight: wp('17'),  
        fontFamily:'Proxima Nova',  
    },

    ownerBottomContainer: {
        flex:1, 
        flexDirection:'column', 
        marginTop:hp('2'),
    },

    ownerBottomTextStyle: {  
        color: '#796A6A', 
        fontSize: 12, 
        fontWeight: 'bold',  
        marginLeft: wp('6'),  
        fontFamily:'Proxima Nova',
        marginTop:hp('3'),  
    },

    addressContainer: {
        flex:1,
    },

    addressTextContainer: {  
        color: '#796A6A', 
        fontSize: 10, 
        marginTop: hp('-1'), 
        marginLeft: wp('6'), 
        fontFamily:'Proxima Nova',
        marginRight:wp('0.7'),  
    },

})