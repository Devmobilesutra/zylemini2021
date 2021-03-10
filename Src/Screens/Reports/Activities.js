import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, FlatList, BackHandler, AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { AccordionList } from "accordion-collapse-react-native";
import Accordion from 'react-native-collapsible/Accordion';
import { Avatar } from 'react-native-elements'
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { Thumbnail, Separator, List, ListItem, } from 'native-base';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
import moment from 'moment';
import Communications from 'react-native-communications';
import { Searchbar } from 'react-native-paper';
import { Fragment } from 'react';

const data1 = [{ time: '5.30 PM', field: 'Checked In' },
{ time: '5.30 PM', field: 'New Order Booked' },
{ time: '5.30 PM', field: 'Data Collected' },
{ time: '5.30 PM', field: 'Payment Collected' }
]
var collapseds = false
const data = [{
    value: 'Route 1',
}, {
    value: 'Route 2',
}, {
    value: 'Route 3',
}, {
    value: 'Route 4',
},
{
    value: 'Route 5',
},
{
    value: 'Route 6',
},
];

var month1 = moment().month(new Date().getMonth()).format("MMM");
var month2 = moment().month(new Date().getMonth() - 1).format("MMM");
var month3 = moment().month(new Date().getMonth() - 2).format("MMM");


export default class OutletVisitReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            list: [
                {
                    id: 1,
                    title: '28 Jul 2020,05.30 pm',
                    Salesperson: 'sheldon cooper',
                    body: [{ time: '5.30 PM', field: 'Checked In' },
                    { time: '5.30 PM', field: 'New Order Booked' },
                    { time: '5.30 PM', field: 'Data Collected' },
                    { time: '5.30 PM', field: 'Payment Collected' }
                    ]
                },
                {
                    id: 2,
                    title: '28 Aug 2020,05.30 pm',
                    Salesperson: 'xyz',
                    body: [{ time: '5.30 PM', field: 'Checked In' },
                    { time: '5.30 PM', field: 'New Order Booked' },
                    { time: '5.30 PM', field: 'Data Collected' },
                    { time: '5.30 PM', field: 'Payment Collected' }
                    ]
                }
            ],
            month1len: '0', month2len: '0', month3len: '0',
            formattedMonth:'',
            final_array:[],
            body_array:[{ time: '5.30 PM', field: 'Checked In' },
            { time: '5.30 PM', field: 'New Order Booked' },
            { time: '5.30 PM', field: 'Data Collected' },
            { time: '5.30 PM', field: 'Payment Collected' }
            
            ],
            myArray:[]
        };

       

    }
    static navigationOptions = {

        title: 'Outlet Visit Reports',
        color: 'white',
        headerStyle: {
            backgroundColor: '#221818'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff', marginLeft: hp('3'), fontSize: 18, fontWeight: 'bold'
        },
        headerLeft: (
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                <TouchableOpacity onPress={() => Actions.TabBarReports()}>
                    <Image style={{ marginLeft: wp('4') }}
                        source={require('../../assets/Icons/Back_White.png')}
                    />

                </TouchableOpacity>
                <Image style={{ marginLeft: wp('2'), }}
                    source={require('../../assets/Icons/Shop.png')}
                />
            </View>
        ),
    }
   
    componentDidMount(){
    
       console.log("data we want",this.props.entity_id);
db.checkIsOrderIdInDbAct(this.props.entity_id,'0').then((data)=>{
       this.setState({final_array:data})
           console.log("this is finalllll",data);

})

     
    }


    
    _renderRoute() {
        const beat = []
        for (var i = 0; i < data.length; i++) {
            beat.push({
                value: data[i].value
            })
        }
        return (
            <Dropdown
                placeholder="Select Route"
                //  value={this.state.selectedRouteName}
                itemCount={4}
                dropdownOffset={{ top: 10 }}
                containerStyle={styles.dropDownContainer}
                rippleCentered={true}
                itemColor='#ADA2A2'
                // fontSize = '10'
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={beat}
                dropdownPosition={-5.4}
                dropdownOffset={{ top: 20, left: 18, }}
                fontSize={RFValue(15)}
                fontFamily='Proxima Nova'
            //  onChangeText={(value) => { this.onChangeHandlerRoute(value) }}
            />
        )
    }

    ToggleArrow() {

        if (this.state.collapsed == false) {
            return (
                <View>
                    <Image style={styles.rightArrowStyle}
                        source={require('../../assets/Icons/right_arrow_front.png')} />
                </View>
            )
        }
        else {
            return (
                <View>
                    <Image style={styles.rightArrowStyle}
                        source={require('../../assets/Icons/right_arrow.png')} />
                </View>
            )
        }
    }

    _head(item) {
      
        return (
            <View style={styles.collapseHeaderStyle}>
                <View style={styles.shopDetailsContainer}>
                    <Text style={styles.shopNameTextStyle}>
                        {moment(item.Current_date_time).format('D MMM YYYY, hh:mm A')}
                    </Text >
                    <Text style={styles.ViewActivityTextStyle}>
                        View Activities
                            </Text >
                    <View style={styles.rightArrowContainer}>


                        <Image style={styles.rightArrowStyle}
                            source={collapseds
                                ? require('../../assets/Icons/right_arrow.png')
                                : require('../../assets/Icons/right_arrow_front.png')}
                        />
                        {/* <Image style={styles.rightArrowStyle}
                                source={require('../../assets/Icons/right_arrow_front.png')} /> */}

                    </View>

                </View>
                <View style={styles.invDetDashContainer}>
                    <Dash style={styles.invDetDashStyle}
                        dashLength={2}
                        dashColor='#E6DFDF'
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: wp('4'), }}>

                    <View style={styles.salesPContainer}>
                        {/* <Text style={styles.salesPTextStyle} >
                            Salesperson :   {item.Salesperson}
                        </Text> */}
                        <Text style={{
                            color: '#362828',

                            fontFamily: 'Proxima Nova',
                            fontSize: 12
                        }} >
                            {/* {item.Salesperson} */}
                        </Text>
                    </View>
                </View>
            </View>

        );
    }
    FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View></View>

        );
    };
    _body(item,collection_type) {
        // return (
        //     <View style={{ flex: 4 }}>
        //       <Text>{item.entity_id}</Text>
        //     </View>
        //   );
        if(collection_type==0)
        {return (
           
            <View style={styles.collapseHeaderStyle1}>
                <View style={{ flex: 1 }}>
                    <View style={styles.invDetDashContainerq}>
                        <Dash style={styles.invDetDashStyle}
                            dashLength={2}
                            dashColor='#E6DFDF'
                        />
                    </View>
                </View>

                <View style={{ flex: 4 }}>
                    
                        
                       
                            <ListItem style={{ height: hp('0.5'), height: wp('0.5'), width: hp('100'), width: wp('100'), borderWidth: 0, borderColor: 'transparent' }}>
                                {/* <View style={styles.ownerRowContainer}>
                                    <View style={styles.ownerContainer}> */}
                                <Text style={styles.ownerTextStyle}>
                                    
                                    {moment(item.ActivityStart,"YYYY-MM-DD hh:mm a").format('hh:mm A')}

                                </Text>
                     
                                {/* <Text style={styles.ownaerNameTextStyle}>
                                {item.collection_type=0 ? 0:"order booked"}
                                </Text> */}

                           
                    
                                <Text style={styles.ownaerNameTextStyle}>
                                order booking
                                </Text>



                            </ListItem>
                        
                 

                   

                </View>




            </View>

        );}
        else if(collection_type ==1)
        {
            return (
           
                <View style={styles.collapseHeaderStyle1}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.invDetDashContainerq}>
                            <Dash style={styles.invDetDashStyle}
                                dashLength={2}
                                dashColor='#E6DFDF'
                            />
                        </View>
                    </View>
    
                    <View style={{ flex: 4 }}>
                        
                            
                           
                                <ListItem style={{ height: hp('0.5'), height: wp('0.5'), width: hp('100'), width: wp('100'), borderWidth: 0, borderColor: 'transparent' }}>
                                    {/* <View style={styles.ownerRowContainer}>
                                        <View style={styles.ownerContainer}> */}
                                    <Text style={styles.ownerTextStyle}>
                                    {moment(item.ActivityStart,"YYYY-MM-DD hh:mm a").format('hh:mm A')}
    
                                    </Text>
                         
                                    {/* <Text style={styles.ownaerNameTextStyle}>
                                    {item.collection_type=0 ? 0:"order booked"}
                                    </Text> */}
    
                               
                        
                                    <Text style={styles.ownaerNameTextStyle}>
                                   Sales
                                    </Text>
    
    
    
                                </ListItem>
                            
                     
    
                       
    
                    </View>
    
    
    
    
                </View>
    
            );
        }
        else if(collection_type==2)
        {
            return (
           
                <View style={styles.collapseHeaderStyle1}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.invDetDashContainerq}>
                            <Dash style={styles.invDetDashStyle}
                                dashLength={2}
                                dashColor='#E6DFDF'
                            />
                        </View>
                    </View>
    
                    <View style={{ flex: 4 }}>
                        
                            
                           
                                <ListItem style={{ height: hp('0.5'), height: wp('0.5'), width: hp('100'), width: wp('100'), borderWidth: 0, borderColor: 'transparent' }}>
                                    {/* <View style={styles.ownerRowContainer}>
                                        <View style={styles.ownerContainer}> */}
                                    <Text style={styles.ownerTextStyle}>
                                    {moment(item.ActivityStart,"YYYY-MM-DD hh:mm a").format('hh:mm A')}
    
                                    </Text>
                         
                                    {/* <Text style={styles.ownaerNameTextStyle}>
                                    {item.collection_type=0 ? 0:"order booked"}
                                    </Text> */}
    
                               
                        
                                    <Text style={styles.ownaerNameTextStyle}>
                                    stock
                                    </Text>
    
    
    
                                </ListItem>
                            
                     
    
                       
    
                    </View>
    
    
    
    
                </View>
    
            );   
        }
        else if(collection_type==3)
        {
            return (
           
                <View style={styles.collapseHeaderStyle1}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.invDetDashContainerq}>
                            <Dash style={styles.invDetDashStyle}
                                dashLength={2}
                                dashColor='#E6DFDF'
                            />
                        </View>
                    </View>
    
                    <View style={{ flex: 4 }}>
                        
                            
                           
                                <ListItem style={{ height: hp('0.5'), height: wp('0.5'), width: hp('100'), width: wp('100'), borderWidth: 0, borderColor: 'transparent' }}>
                                    {/* <View style={styles.ownerRowContainer}>
                                        <View style={styles.ownerContainer}> */}
                                    <Text style={styles.ownerTextStyle}>
                                    {moment(item.ActivityStart,"YYYY-MM-DD hh:mm a").format('hh:mm A')}
    
                                    </Text>
                         
                                    {/* <Text style={styles.ownaerNameTextStyle}>
                                    {item.collection_type=0 ? 0:"order booked"}
                                    </Text> */}
    
                               
                        
                                    <Text style={styles.ownaerNameTextStyle}>
                                   visit
                                    </Text>
    
    
    
                                </ListItem>
                            
                     
    
                       
    
                    </View>
    
    
    
    
                </View>
    
            );   
        }
        else if(collection_type==4)
        {
            return (
           
                <View style={styles.collapseHeaderStyle1}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.invDetDashContainerq}>
                            <Dash style={styles.invDetDashStyle}
                                dashLength={2}
                                dashColor='#E6DFDF'
                            />
                        </View>
                    </View>
    
                    <View style={{ flex: 4 }}>
                        
                            
                           
                                <ListItem style={{ height: hp('0.5'), height: wp('0.5'), width: hp('100'), width: wp('100'), borderWidth: 0, borderColor: 'transparent' }}>
                                    {/* <View style={styles.ownerRowContainer}>
                                        <View style={styles.ownerContainer}> */}
                                    <Text style={styles.ownerTextStyle}>
                                    {moment(item.ActivityStart,"YYYY-MM-DD hh:mm a").format('hh:mm A')}
    
                                    </Text>
                         
                                    {/* <Text style={styles.ownaerNameTextStyle}>
                                    {item.collection_type=0 ? 0:"order booked"}
                                    </Text> */}
    
                               
                        
                                    <Text style={styles.ownaerNameTextStyle}>
                                    image
                                    </Text>
    
    
    
                                </ListItem>
                            
                     
    
                       
    
                    </View>
    
    
    
    
                </View>
    
            );    
        }
        else if(collection_type==5)
        {
            return (
           
                <View style={styles.collapseHeaderStyle1}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.invDetDashContainerq}>
                            <Dash style={styles.invDetDashStyle}
                                dashLength={2}
                                dashColor='#E6DFDF'
                            />
                        </View>
                    </View>
    
                    <View style={{ flex: 4 }}>
                        
                            
                           
                                <ListItem style={{ height: hp('0.5'), height: wp('0.5'), width: hp('100'), width: wp('100'), borderWidth: 0, borderColor: 'transparent' }}>
                                    {/* <View style={styles.ownerRowContainer}>
                                        <View style={styles.ownerContainer}> */}
                                    <Text style={styles.ownerTextStyle}>
                                    {moment(item.ActivityStart,"YYYY-MM-DD hh:mm a").format('hh:mm A')}
    
                                    </Text>
                         
                                    {/* <Text style={styles.ownaerNameTextStyle}>
                                    {item.collection_type=0 ? 0:"order booked"}
                                    </Text> */}
    
                               
                        
                                    <Text style={styles.ownaerNameTextStyle}>
                                    Asset verification
                                    </Text>
    
    
    
                                </ListItem>
                            
                     
    
                       
    
                    </View>
    
    
    
    
                </View>
    
            );    
        }
    }

  

    getList()
    {
   if(this.state.formattedMonth=month1 )
   {
    return(
        <Fragment>
         <View style={styles.searchResultContainer}>
    <Text style={styles.searchResultTextStyle} >
        {month1} ({this.state.month1len})
    </Text>
</View>
   <AccordionList
   list={this.state.final_array}
   header={this._head}
   body={this._body}
   keyExtractor={item => `${item.id}`}
/>
        </Fragment>
   
    )
    
   }  
   else if(this.state.formattedMonth=month2)
   {
       return(
        <Fragment>  
        <View style={styles.searchResultContainer}>
        <Text style={styles.searchResultTextStyle} >
        {month2} ({this.state.month2len})
        </Text>
        </View>
        <AccordionList
        list={this.state.list}
        header={this._head}
        body={this._body}
        keyExtractor={item => `${item.id}`}
        />
        </Fragment>
       )
   
   }   
   else if(this.state.formattedMonth=month3)
   {
   return(
    <Fragment> <View style={styles.searchResultContainer}>
    <Text style={styles.searchResultTextStyle} >
        {month3} ({this.state.month3len})
    </Text>
 </View>
 
 <AccordionList
    list={this.state.list}
    header={this._head}
    body={this._body}
    keyExtractor={item => `${item.id}`}
 /></Fragment>
   )
   

   }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.headerMainContainer}>
                            <View style={styles.searchResultContainer1}>
                                <Text style={{
                                    color: '#FFFFFFFF',
                                    fontWeight: 'bold',
                                    fontFamily: 'Proxima Nova',
                                    fontSize: 18,

                                }} >
                                    {this.props.Party}
                                   
                            </Text>
                            </View>
                            <View style={styles.searchResultContainer2}>
                                <Text style={styles.searchResultTextStyle} >
                                    CHOOSE SALES PERSON
                            </Text>
                            </View>
                            {this._renderRoute()}
                        </View>
                        {this.getList()}
                         </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        marginLeft: hp('5')
    },

    cardContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderColor: '#E6DFDF',
        marginLeft: hp('2.3'),
        height: hp('18'),
        width: wp('89.3'),
        borderLeftWidth: hp('0.3'),
        borderRightWidth: hp('0.3'),
        borderBottomWidth: hp('0.3'),
    },
    collapseHeaderStyle1: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderColor: '#00000029',
        height: hp('20'),
        width: wp('89.3'),
        borderLeftWidth: hp('0.2'),
        borderRightWidth: hp('0.2'),
        borderBottomWidth: hp('0.2'),
        marginHorizontal: wp('4.6'),
        // marginTop:hp('2')

    },
    ownerRowContainer: {
        flex: 1,
        flexDirection: 'row',
    },


    ownerContainer: {
        flex: 0.5,
        flexDirection: 'row',
    },

    ownerTextStyle: {
        color: '#8C7878',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    headerImgContainer: {
        flex: 0.7,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center', marginLeft: wp('5'),
    },

    headerImgStyle: {
        width: wp('23'),
        height: hp('13'),
    },
    ownaerNameTextStyle: {
        color: '#796A6A',
        fontSize: 12,

        marginLeft: wp('6'),
        fontFamily: 'Proxima Nova',
    },

    invDetDashContainer: {
        // flex:1,
        marginTop: hp('1'),
        alignContent: 'center',
        alignItems: 'center',
    },
    invDetDashContainerq: {
        // flex:1,
        marginTop: hp('0'),
        alignContent: 'center',
        alignItems: 'center',
    },

    invDetDashStyle: {
        width: wp('85'),
        height: hp('1'),
    },

    headerMainContainer: {
        flex: 0.3,
        backgroundColor: '#221818',
    },

    todaysRouteTextStyle: {
        color: '#ADA2A2',
        fontSize: RFValue(11),
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginLeft: wp('6'),
        marginTop: hp('4'),
    },
    searchbarContainerStyle: {
        height: hp('8'),
        width: wp('88'),
        borderColor: '#E6DFDF',
        borderWidth: wp('0.4'),
        borderRadius: wp('2'),
        marginTop: hp('1'),
        alignSelf: 'center',
        elevation: 0,
        marginBottom: hp('2'),
    },
    searchResultContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: hp('3'),
        marginTop: wp('2'),
        marginTop: hp('3'),
        marginBottom: hp('1')
    },

    searchResultTextStyle: {
        color: '#796A6A',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontSize: 12,

    },
    searchResultContainer1: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: hp('4'),
        marginBottom: hp('1.2')
    },
    searchResultContainer2: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: hp('3.5'),

        marginBottom: hp('0.6')
    },


    shopDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

        marginLeft: wp('4'),
    },

    shopNameTextStyle: {
        flex: 2.3,
        color: '#362828',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        //  fontSize: wp('4'),
        fontSize: 12

    },
    ViewActivityTextStyle: {
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flex: 1.5,
        color: '#3955CB',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        // fontSize: wp('4'),
        fontSize: 12

    },
    shopAddressTextStyle: {
        color: '#796A6A',
        fontFamily: 'Proxima Nova',
        fontSize: wp('3'),

    },
    shopDetailsContainer1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('-8'),

    },

    collapseHeaderStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderColor: '#00000029',
        height: hp('13'),
        width: wp('89.3'),
        borderLeftWidth: hp('0.2'),
        borderRightWidth: hp('0.2'),
        borderBottomWidth: hp('0.1'),
        borderTopWidth: hp('0.2'),
        marginHorizontal: wp('4.6'),
        marginTop: hp('1'),
        shadowColor: '#00000029', shadowOffset: { width: 10, height: 13 }, shadowOpacity: 100,
    },
    dropDownContainer: {
        borderWidth: wp('0.5'),
        borderColor: '#E6DFDF',
        borderRadius: wp('2%'),
        width: wp('90'),
        height: hp('9'),
        marginTop: hp('1'),
        paddingRight: wp('3%'),
        marginVertical: hp('3'),
        marginHorizontal: wp('4'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: hp('2'),
    },
    rightArrowStyle: {
        marginTop: hp('0.5'),
        tintColor: '#3955CB', marginRight: hp('3.5')
    },
    rightArrowContainer: {
        flex: 0.1,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',


    },
    invDetDashContainer: {
        // flex:1,
        marginTop: hp('1'),
        alignContent: 'center',
        alignItems: 'center',
    },

    invDetDashStyle: {
        width: wp('85'),
        height: hp('1'),
    },

    salesPContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',


    },

    salesPTextStyle: {
        color: '#796A6A',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontSize: 10

    },

})