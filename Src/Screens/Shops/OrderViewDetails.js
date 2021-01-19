import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import Dash from 'react-native-dash';
import OrderViewDetailsExpanded from './OrderViewDetailsExpanded ';
import { TOTAL_SHOPS,SHOP_INFO,SHOP_VISITED_TODAY} from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();


var list = []



export  class OrderViewDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { list:[],totalOrderVal:'',
        visible: '',
        collapsed:false, };
    }

static navigationOptions = {
  title: 'Order Details',
  color: 'white',
    headerStyle: {
        backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff'
    },

  //  headerLeft: <Icon  name="ios-arrow-round-back" size={20} color="white"    padding='20'  
  //               onPress={ () => { Actions.Dashboard() }}   />

  headerLeft: (
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.Orders() }>  
                <Image  style={{marginLeft:wp('4'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
            
        </View>
 )
                               
}

SchemesArrow(){
    if( this.state.collapsed == false){
      return(
          <View>
            <Image style={styles.sublistIconStyle} 
                source = {require('../../assets/Icons/Add_white.png')}/>
          </View>
        )
    }
    else {
      return(
          <View>
            <Image style={styles.sublistIconStyle}  
                  source = {require('../../assets/Icons/minus_white.png')}/>
          </View>
        )
    }
  }

componentWillMount(){
    db.getTotalOrderDetails(this.props.OrderId).then((data)=>{
        this.state.list=data;       
        this.setState({list:data})
        //console.log("rj**********************************",JSON.stringify(this.state.list))
        this.state.totalOrderVal=data.length
        this.setState({totalOrderVal:data.length})

    })
}
render() {
    const { navigation } = this.props;
    return (
         <View style = {{ flex: 10 }}>
            <ImageBackground
                source={require('../../assets/Icons/android_BG.png')}
                 style={{height:hp('89'), width:wp('100'), resizeMode: 'cover',  justifyContent: 'center',}}
            >
              <ScrollView
                 showsVerticalScrollIndicator={false}
              >
               {/* Header */}
                <View style = {styles.container}>
                    <View style= {styles.totalOrderContainer}>
                        <Text  style = {styles.totalOrderValueText}>
                            TOTAL ORDER VALUE
                        </Text>
                        <Text  style = {styles.totalOrderValuesValueText} >
                        {this.state.totalOrderVal}
                        </Text>
                    </View>
                </View>

                 {/* Store Name and History */}
                 <View style = {{ flex:0.1 }}>
                    <View style= {styles.storeInfoMainContainer}>
                        <View style= {styles.storeTextContainer}>
                            <Text  style = {styles.storeNameText}>
                            {this.props.shops.shopname}
                            </Text>
                        </View>

                        <View style= {styles.historyTextContainer}>
                            <Text  style = {styles.historyText}>
                                HISTORY
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Dash Line */}
                <View style={styles.dashLineContainer}>
                  <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
                </View>

                 {/* Orders */}
                <View style = {{ flex:0.1 }}>
                    <View style= {styles.orderPreivewContainer}>
                        <View style= {styles.OrderPreviewTextContainer}>
                            <Text  style = {styles.orderPreviewText}>
                                Orders  
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Orders */}
                 <View style={styles.orderSerchResultMainContainer}>
                 {
                       this.state.list.map((item, index) => (
                        <Collapse 
                        onToggle={( )=>this.setState({collapsed:!this.state.collapsed})}
                      >
                      <CollapseHeader style={styles.collapseHeaderStyle }>
                          <View style={ styles.brandNameContainer }>
                                          <Text style= {styles.brandNameTextContainer}>
                                          {item.item_Name}
                                          </Text>
                          </View>
                          <View style={styles.sublistExtendIconAmountContainer}>
                                          <Text style= {styles.sublistAmountTextStyle}>
                                          {item.Amount}
                                          </Text>
                                          <View>
                                          {this.SchemesArrow()}
                                          </View>
                                          {/* <Image style={styles.sublistIconStyle} 
                                                source = {require('../../Assets/Icons/Add_white.png')}/> */}
                          </View>
                      </CollapseHeader>
                      <CollapseBody>
                          <ListItem >
                          <OrderViewDetailsExpanded navigation={navigation}
                                                       OrderId={this.props.OrderId}
                                                       item_id={item.item_id}/>
                          </ListItem>
                      </CollapseBody>
                      </Collapse>  
                    // <View style={styles.collapseHeaderStyle }>
                    //     <View style={ styles.brandNameContainer }>
                    //                     <Text style= {styles.brandNameTextContainer}>
                    //                      {item.item_Name}
                    //                     </Text>
                    //     </View>
                    //     <View style={styles.sublistExtendIconAmountContainer}>
                    //                     <Text style= {styles.sublistAmountTextStyle}>
                    //                     {item.Amount}
                    //                     </Text>
                    //                     <View>
                    //                     {/* {this.SchemesArrow()} */}
                    //                     </View>
                    //                     {/* <Image style={styles.sublistIconStyle} 
                    //                           source = {require('../../Assets/Icons/Add_white.png')}/> */}
                    //     </View> 
                    // </View>
                     ))
                    }       
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
    //shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds));                                },
  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(OrderViewDetails)
  
const styles = StyleSheet.create({
    container : {
        flex:5, 
        flexDirection:'row',
        backgroundColor: '#210305'
    },
    totalOrderContainer: {
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'flex-start',
    },

    totalOrderValueText: {
        color: '#796A6A', 
        fontSize: wp('2.5%'),
        fontWeight: 'bold',
        marginTop: hp('4'), 
        fontFamily: 'Proxima Nova', 
        marginLeft: wp('5%'),
    },
  
    totalOrderValuesValueText: {
        color: 'white', 
        fontSize: wp('3%'), 
        marginTop: hp('1%'), 
        marginLeft: wp('5%'),
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('4'),
    },

    storeInfoMainContainer: {
        flex:1, 
        flexDirection:'row',
    },

    storeTextContainer: {
        flex: 0.5, 
        flexDirection:'column', 
    },

    historyTextContainer: {
        flex: 0.5, 
        flexDirection:'column', 
        alignItems:'flex-end',
    },

    storeNameText: {
        color: '#796A6A', 
        fontSize: wp('3.5%'), 
        fontWeight: 'bold', 
        marginTop: hp('3%'), 
        marginLeft: wp('6%'), 
        fontFamily: 'Proxima Nova',
    },

    historyText: {
        color: '#3955CB', 
        fontSize: wp('3%'), 
        fontWeight: 'bold', 
        marginTop: hp('3%'), 
        fontFamily: 'Proxima Nova', 
        marginRight: wp('9%'),
    },

        dashLineContainer: {
        flex:1, 
        marginTop:hp('2'), 
        alignContent: 'center', 
        alignItems: 'center',
    },

    dashLineStyle: {
        width:wp('92'), 
        height:hp('1'), 
        color: '#ADA2A2',
    },
      
    orderPreivewContainer: {
        flex:1, 
        flexDirection:'row',
    },

    OrderPreviewTextContainer: {
        flex: 0.5, 
        flexDirection:'column', 
    },

    orderPreviewText: {
        color: '#796A6A', 
        fontSize: wp('3%'), 
        fontWeight: 'bold', 
        marginTop: hp('1%'), 
        marginLeft: wp('6%'), 
        fontFamily: 'Proxima Nova',
    },

     orderSerchResultMainContainer: {
    flex:1,
    marginVertical: wp('3'),
  },

  collapseHeaderStyle: {
    alignItems:'center' ,
    flexDirection:'row',
    backgroundColor: '#362828',
    borderColor: '#E6DFDF',
    borderRadius: wp('2'), 
    height: hp('9'),
    width: wp('90'),
    borderWidth: hp('0.2'), 
    marginHorizontal: wp('4'),
    alignSelf:'center',
  },
 
    brandNameContainer: { 
        flex:2.5,
        alignItems: 'flex-start',
    },

    brandNameTextContainer: {
        marginLeft:wp('5'),
        fontFamily: 'Proxima Nova', 
        fontSize: wp('3'), 
        color:'#FFFFFF',
        fontSize:RFValue(13),
        justifyContent:'center',
    },

    sublistExtendIconAmountContainer: { 
        flex:1, 
        alignItems: 'flex-end', 
        flexDirection:'row', 
        justifyContent:'flex-end',
    },

    sublistAmountTextStyle: {
        marginRight:wp('3'),
        fontFamily: 'Proxima Nova', 
        fontSize:RFValue(13),
        color:'#FFFFFF',
        alignSelf:'center',
    },

});

