import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, FlatList, Dimensions, BackHandler, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { AccordionList } from "accordion-collapse-react-native";
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
import { Separator } from 'native-base';
import moment from 'moment';
import Communications from 'react-native-communications';
// either import the whole module and call as Communications.phonecall('0123456789', true)
// or can import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { phonecall('0123456789', true) }}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { FloatingAction } from "react-native-floating-action";
var open
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



const entity = [{
    value: 'Retailer',
    id: 1
}, {
    value: 'Distributor',
    id: 2
},];
const actions = [
    {
        text: "Add New Shop",
        color: 'transperent',
        name: "bt_accessibility",
        position: 1,
        textColor: 'black',
        textStyle: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 10 },
        buttonSize: 0,
    },
];
let countvisited = 0
export class DataUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            active: false,
            modalVisible: false,
            modalVisiblefilter: false,
            distributor_data: [], AreaID: '',
            // cardView: false ,
            list: [
                {
                    id: 1,
                    title: 'Getting Started',
                    body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
                },
                {
                    id: 2,
                    title: 'Components',
                    body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
                }
            ],

        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     
        this.setModalVisiblefilter = this.setModalVisiblefilter.bind(this);

    }




    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const { state } = navigation

        return {
            title: 'Distributor Data Upload',
            color: 'white',
            headerStyle: {
                backgroundColor: '#221818'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: hp('3'),

            },
            headerRight: (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                    <TouchableOpacity onPress={state.params.handleFilterPress}>
                        <View>
                            <Image style={{ marginRight: hp('4'), height: hp('3'), width: wp('4') }}
                                source={require('../../assets/Icons/Sort_by.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <Image style={{ marginRight: hp('2'), marginBottom: hp('0.5'), height: hp('4'), width: wp('6.1'), }}
                        source={require('../../assets/Icons/SearchHeader.png')}
                    />

                </View>
            ),

            headerLeft: (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                    <TouchableOpacity onPress={() => Actions.TabBarReports()}>
                        <Image style={{ marginLeft: wp('4'), }}
                            source={require('../../assets/Icons/Back_White.png')}
                        />
                    </TouchableOpacity>
                    <Image style={{ marginLeft: wp('2'), }}
                        source={require('../../assets/Icons/Data_Upload1.png')}
                    />
                </View>
            ),
        }

    }


    _componentFocused = () => {

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        Actions.drawerMenu();
        return true;
    }
    componentDidMount() {

        AsyncStorage.getItem('AreaId').then((keyValue) => {
            this.setState({ AreaID: JSON.parse(keyValue) })
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.setParams({
            handleFilterPress: this._handleFilterPress.bind(this)
        });

        var result = [];
        for (var i = 0; i < 7; i++) {
            var date = new Date().getDate() - i; //Current Date
            var month1 = new Date().getMonth() + 1; //Current Month
            var month = moment().month(month1).format("MM");
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours          
            var date = date + '/' + month + '/' + year

            // d.setDate(d.getDate() - i);
            // result.push( formatDate(d) )
            result.push(date)

        }

        db.getDistributorDataStatus().then((data) => {
                console.log("data==", data)

            this.setState({ distributor_data: data })
        })
        //       

        //     int count = [distributor count];
        //     app.dist_count = [NSString stringWithFormat:@"%d",count];

        //      NSLog(@"dist = %@",distributor);


    }

    setModalVisiblefilter = (bools) => {
        //    console.log(bools)
        this.setState({ modalVisiblefilter: bools })
    }
    _handleFilterPress() {
        //alert("ghchg")
        this.setModalVisiblefilter(true)
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
        //  dist = (   { Area = Ulhasnagar;    Branch = INDIA;        Day1 = 0;        Day2 = 0;        Day3 = 0;        Day4 = 0;       
        // Day5 = 0;        Day6 = 0;        Day7 = 0;        Distributor = "RADHA WINES";        DistributorID = 142;       
        // LastInvoiceDate = "18-Mar-2020";        LastUploadDate = "20-03-2020";    },        
        //{        Area = Pune;        Branch = INDIA;        Day1 = 0;        Day2 = 0;        Day3 = 0;        Day4 = 0;        Day5 = 0;        Day6 = 0;        Day7 = 0;        Distributor = "ELKAY SPIRITS PVT LTD";        DistributorID = 144;        LastInvoiceDate = "19-Mar-2020";        LastUploadDate = "25-03-2020";    },
        return (
            <View style={styles.cardContainer}>
                <View style={{ flex: 2, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row' }} >
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <Text style={styles.brandnameTextStyle} >
                            {item.Distributor}
                        </Text>
                        <Text style={{
                            flex: 6,
                            color: '#221818',
                            fontSize: 10,
                            fontFamily: 'Proxima Nova', marginTop: hp('1')

                        }} >
                            {item.Area}
                        </Text>
                    </View>
                    <View style={styles.rightArrowContainer}>
                        <View>
                            <Image style={styles.rightArrowStyle}
                                source={require('../../assets/Icons/right_arrow_front.png')} />
                        </View>
                    </View>
                </View>
                <View style={styles.invDetDashContainer}>
                    <Dash style={styles.invDetDashStyle}
                        dashLength={2}
                        dashColor='#E6DFDF'
                    />
                </View>
                <View style={{ flex: 2.5, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row', }}>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: "flex-start" }}>
                        <Text style={styles.labels}>Last Updated</Text>
                        <Text style={styles.texts}>{item.LastUploadDate}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <Text style={styles.labels}>Last Invoice</Text>
                        <Text style={styles.texts}>{item.LastInvoiceDate}</Text>
                    </View>

                    <TouchableOpacity>
                        <View>
                            <Image style={{ marginRight: hp('4'), height: hp('3'), width: wp('4') }}
                                source={require('../../assets/Icons/filter_list_shop.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        );
    }


    _body(item) {
        var result = [];
        for (var i = 0; i < 7; i++) {
            var date = new Date().getDate() - i; //Current Date
            var month1 = new Date().getMonth() + 1; //Current Month
            var month = moment().month(month1).format("MM");
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours          
            var date = date + '/' + month + '/' + year

            // d.setDate(d.getDate() - i);
            // result.push( formatDate(d) )
            result.push(date)

        }
        //  dist = (   { Area = Ulhasnagar;    Branch = INDIA;        Day1 = 0;        Day2 = 0;        Day3 = 0;        Day4 = 0;       
        // Day5 = 0;        Day6 = 0;        Day7 = 0;        Distributor = "RADHA WINES";        DistributorID = 142;  

        return (
            <View style={styles.cardContainer1}>
                <View style={{ flex: 1, flexDirection: 'column', marginLeft: wp('4'), marginTop: wp('0') }}>
                    <View style={{ flex: 1, flexDirection: 'column', marginBottom: hp('2') }}>
                        <View style={styles.invDetDashContainer1}>
                            <Dash style={styles.invDetDashStyle1}
                                dashLength={2}
                                dashColor='#E6DFDF'
                            />
                        </View>
                        <Text style={styles.ScheduledTextStyle} >
                            Scheduled Upload date
                                   </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('2') }}>
                        <View style={{ flex: 1, flexDirection: 'column', marginTop: hp('-12') }}>
                            {/* {result.map((itemss, index) => ( */}
                            {/* { (status == "En attente") ? <View style={{ backgroundColor: 'blue', height: 50, width: 50 }}></View> : (status == "Annulé") ? <View style={{ backgroundColor: 'green', height: 50, width: 50 }}></View> : <View style={{ backgroundColor: 'red', height: 50, width: 50 }}></View> }  */}
                         
                         {(item.Day1==true)?<Text style={styles.datestyleyes}>{result[0]}</Text>:(item.Day1==false)?<Text style={styles.datestyle}>{result[0]}</Text>:<Text></Text>}
                         
                         {(item.Day2==true)?<Text style={styles.datestyleyes}>{result[1]}</Text>:(item.Day2==false)?<Text style={styles.datestyle}>{result[1]}</Text>:<Text></Text>}
                         {(item.Day3==true)?<Text style={styles.datestyleyes}>{result[2]}</Text>:(item.Day3==false)?<Text style={styles.datestyle}>{result[2]}</Text>:<Text></Text>}
                         {(item.Day4==true)?<Text style={styles.datestyleyes}>{result[3]}</Text>:(item.Day4==false)?<Text style={styles.datestyle}>{result[3]}</Text>:<Text></Text>}
                         {(item.Day5==true)?<Text style={styles.datestyleyes}>{result[4]}</Text>:(item.Day5==false)?<Text style={styles.datestyle}>{result[4]}</Text>:<Text></Text>}
                         {(item.Day6==true)?<Text style={styles.datestyleyes}>{result[5]}</Text>:(item.Day6==false)?<Text style={styles.datestyle}>{result[5]}</Text>:<Text></Text>}
                         {(item.Day7==true)?<Text style={styles.datestyleyes}>{result[6]}</Text>:(item.Day7==false)?<Text style={styles.datestyle}>{result[6]}</Text>:<Text></Text>}
                         


{/*                          
                            <Text style={[(item.Day1=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[0]}
                            </Text>
                            <Text style={[(item.Day2=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[1]}
                            </Text>
                            <Text style={[(item.Day7=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[2]}
                            </Text>
                            <Text style={[(item.Day7=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[3]}
                            </Text>
                            <Text style={[(item.Day7=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[4]}
                            </Text>
                            <Text style={[(item.Day7=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[5]}
                            </Text>
                            <Text style={[(item.Day7=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]} >
                                {result[6]}
                            </Text>
                          
                            <Text style={[(item.Day7=='true') ? styles.datestyleyes :(item.Day1=='false')? styles.datestyle :styles.blankview]}>
                                {result[7]}
                            </Text>
                               */}
                           
                            {/* { this._returnDay1Label(item.Day1,result) } */}
                            {/* { this.returnDay2Label(item.Day2,result) }
                            { this.returnDay3Label(item.Day3,result) }
                            { this.returnDay4Label(item.Day4,result) }
                             { this.returnDay5Label(item.Day5,result) }
                            { this.returnDay6Label(item.Day6,result) }
                            { this.returnDay7Label(item.Day7,result) } */}

                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', marginTop: hp('-10') }}>
                            {item.Day1 == true ?
                                <View style={styles.targetColContainer1}>
                                     <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> : item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                     <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                  

                                </View>:<View></View>
                            }
                            {item.Day2 == true ?
                                <View style={styles.targetColContainer1}>
                                     <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> :  item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                    <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                </View>:<View></View>
                            }
                            {item.Day3 == true ?
                                <View style={styles.targetColContainer1}>
                                     <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> :  item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                  <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                </View>:<View></View>
                            }
                            {item.Day4 == true ?
                                <View style={styles.targetColContainer1}>
                                    <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> :  item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                    <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                </View>:<View></View>
                            }
                            {item.Day5 == true ?
                                <View style={styles.targetColContainer1}>
                                     <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> :  item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                   <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                </View>:<View></View>
                            }
                            {item.Day6 == true ?
                                <View style={styles.targetColContainer1}>
                                     <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> :  item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                   <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                </View>:<View></View>
                            }

                            {item.Day7 == true ?
                                <View style={styles.targetColContainer1}>
                                      <Text style={styles.targetLabelStyle11}>
                                        Yes
                                   </Text>
                                </View> :  item.Day1==false?
                                <View style={styles.targetColContainer1}>
                                    <Text style={styles.targetLabelStyle1}>
                                        NO
                               </Text>
                                </View>:<View></View>
                            }


                            {/* {this.returnDay1View(item.Day1)}
                            {this.returnDay2View(item.Day2)}
                            {this.returnDay3View(item.Day3)}
                            {this.returnDay4View(item.Day4)}
                            {this.returnDay5View(item.Day5)}
                            {this.returnDay6View(item.Day6)}
                            {this.returnDay7View(item.Day7)} */}

                        </View>

                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle} >
                            {result[0]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle1}>
                                NO
                          </Text>
                        </View>  
                    </View>                 

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle11        } >
                            {result[1]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle11}>
                                Yes
                                   </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle} >
                            {result[2]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle1}>
                                NO
                          </Text>
                        </View>  
                    </View>                 

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle11        } >
                            {result[3]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle11}>
                                Yes
                                   </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle} >
                            {result[4]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle1}>
                                NO
                          </Text>
                        </View>  
                    </View>                 

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle11        } >
                            {result[5]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle11}>
                                Yes
                                   </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('-2') }}>
                        <Text style={styles.datestyle} >
                            {result[6]}
                        </Text>
                        <View style={styles.targetColContainer1}>
                            <Text style={styles.targetLabelStyle1}>
                                NO
                          </Text>
                        </View>  
                    </View>                 

                   */}


                </View>

            </View>
        );
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}
                >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisiblefilter}
                        onRequestClose={() => {
                            this.setModalVisiblefilter(false)
                        }}
                    >
                        <View style={styles.centeredViewnew}>
                            <View style={styles.modalViewnew}>
                                <View style={{ flex: 1.5, width: windowWidth, flexDirection: 'row', backgroundColor: '#F8F4F4', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ flex: 1, color: '#8C7878', fontSize: 12, marginLeft: hp('4') }}>Sort By</Text>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalVisiblefilter(false);
                                        }}                                >
                                        <View>
                                            <Image style={{
                                                marginRight: hp('4'), height: hp('3'), width: wp('4'), color: '#2FC36E'

                                            }}
                                                source={require('../../assets/Icons/Sort_by.png')}
                                            />
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ flex: 5, flexDirection: 'column', backgroundColor: '#FFFFFF', width: windowWidth, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: hp('2') }}>

                                    <Text style={{ color: '#362828', fontSize: 12, marginTop: hp('2'), marginLeft: hp('4') }}>Top Performing Brand First</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, marginTop: hp('2'), marginLeft: hp('4') }}>Lowest Performing Brand First</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, marginTop: hp('2'), marginLeft: hp('4') }}>Arrange from A TO Z</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, marginTop: hp('2'), marginLeft: hp('4') }}>Arrange from Z TO A</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, marginTop: hp('2'), marginLeft: hp('4') }}>Customer Classification</Text>

                                </View>
                            </View>
                        </View>
                    </Modal>


                    <ScrollView
                        showsVerticalScrollIndicator={false}           >

                        {/*Total Shops  */}
                        <View style={styles.totalShopsMainContainer}>
                            <View style={styles.totalShopColContainer}>
                                <Text style={styles.totalShopCountTextStyle}>
                                    Upload % Monthly
                    </Text>
                                <Text style={styles.totalShopHeadingTextStyle}>
                                    89%
                    </Text>

                            </View>

                            {/* Filter Icon */}
                            <View style={styles.filterIconContainer}>
                                <View style={styles.shopVisitedColContainer}>
                                    <Text style={styles.shopVisitedCountTextContainer}>
                                        No. of Distributors
                    </Text>
                                    <Text style={styles.shopVisitedHeadingTextStyle}>
                                        {this.state.distributor_data.length}
                                    </Text>

                                </View>
                            </View>
                        </View>

                        {/* Dash Line */}
                        <View style={styles.dashLineContainer}>
                            <Dash style={styles.dashLineStyle}
                                dashLength={2}
                                dashColor='#ADA2A2'
                            />
                        </View>

                        <AccordionList
                            list={this.state.distributor_data}
                            header={this._head}
                            body={this._body}
                            keyExtractor={item => `${item.DistributorID}`}
                        />


                    </ScrollView>
                </ImageBackground>
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shops: state.shops,
    };
};
const mapDispatchToProps = dispatch => ({
    shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds)); },
}
)
export default connect(mapStateToProps, mapDispatchToProps)(DataUpload)

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        //    borderColor: '#E6DFDF',
        //borderRadius: wp('2'),
        height: hp('15'),
        width: wp('91'),
        marginHorizontal: wp('4.6'),
        marginTop: hp('1'),
        marginBottom: hp('1'),
        shadowColor: "#00000029",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, overflow: 'hidden',
    },
    cardContainer1: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        //  borderColor: '#E6DFDF',
        // borderRadius: wp('2'),
        height: hp('30'),
        width: wp('91'),
        marginHorizontal: wp('4.6'),
        marginTop: hp('-0.9'),
        marginBottom: hp('1'),
        shadowColor: "#00000029",
        overflow: 'hidden',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },

    headerMainContainer: {
        flex: 1,
        backgroundColor: '#221818',
        flexDirection: 'row',
    },
    headerMainContainer1: {
        flex: 1,
        backgroundColor: '#221818',
        flexDirection: 'column',
        marginLeft: wp('6'),
        marginTop: hp('2'),
        marginBottom: hp('2'),
    },
    texts: {
        color: '#796A6A', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold', marginTop: hp('1')
    },
    labels: {
        color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova', fontWeight: 'bold'
    },
    headerMainContainer11: {
        flex: 1.5,
        backgroundColor: '#221818',
        flexDirection: 'column',
        marginLeft: wp('10'),
        marginTop: hp('2'),
        justifyContent: 'center', marginBottom: hp('2'),

    },

    todaysRouteTextStyle: {
        color: '#ADA2A2',
        fontSize: RFValue(11),
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',

    },
    todaysRouteTextStylebelow: {

        color: 'white',
        fontSize: RFValue(11),
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
    },
    dropDownContainer: {
        borderWidth: wp('0.5'),
        borderColor: '#E6DFDF',
        borderRadius: wp('2%'),
        width: wp('50'),
        height: hp('5'),

        backgroundColor: '#FFFFFF',

    },
    rightArrowStyle: {
        marginTop: hp('0.5'),
        tintColor: '#221818', marginRight: hp('2')
    },
    rightArrowContainer: {
        flex: 0.2,
        alignItems: 'flex-end', marginTop: hp('-1')



    },
    totalShopsMainContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('2'), marginLeft: hp('-3'),
    },

    totalShopColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    totalShopCountTextStyle: {
        color: '#362828',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    totalShopHeadingTextStyle: {
        color: '#362828',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova',
        marginLeft: hp('-1'),
    },

    shopVisitedColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    shopVisitedCountTextContainer: {
        color: '#362828',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', marginRight: hp('-1')
    },

    shopVisitedHeadingTextStyle: {
        color: '#362828',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova', marginLeft: hp('3'),

    },

    filterIconContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
    },

    dashLineContainer: {
        flex: 1,
        marginTop: hp('2.5'),
        alignContent: 'center',
        alignItems: 'center',
    },

    dashLineStyle: {
        width: wp('100'),
        height: hp('1'),
        color: '#ADA2A2',
    },
    collapseHeaderStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6DFDF',
        borderRadius: wp('2'),
        height: hp('15'),
        width: wp('89.3'),
        // borderWidth: hp('0.3'),
        marginHorizontal: wp('4.6'),
        marginTop: hp('1'),
    },
    collapseHeaderStyle1: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6DFDF',
        borderRadius: wp('2'),
        height: hp('15'),
        width: wp('89.3'),
        // borderWidth: hp('0.3'),
        marginHorizontal: wp('4.6'),
        marginTop: hp('-1'),

    },
    brandnameTextStyle: {
        flex: 6,
        color: '#221818',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',

    },
    ScheduledTextStyle: {

        color: '#796A6A',
        fontSize: 10,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold', marginTop: hp('1')

    },
    datestyle: {
        flex: 4,
        color: '#E23333',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
    },

    datestyle11: {
        flex: 4,
        color: '#2FC36E',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
    },
    datestyleyes: {
        flex: 4,
        color: '#2FC36E',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
    },
    targetColContainer1: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: wp('2'),
        marginTop: hp('-1')


    },

    targetLabelStyle1: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontSize: 9,
        borderRadius: 15,
        paddingTop: 3,
        paddingLeft: 18,
        paddingRight: 15,
        paddingBottom: 3,
        backgroundColor: '#E23333',
        marginRight: wp('3'),

    },
    targetLabelStyle11: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontSize: 9,
        borderRadius: 15,
        paddingTop: 3,
        paddingLeft: 18,
        paddingRight: 15,
        paddingBottom: 3,
        backgroundColor: '#2FC36E',
        marginRight: wp('3'),
    },

    yesNoStyle: {
        backgroundColor: 'red',
        borderRadius: hp('2'),
        flex: 1,
        color: 'white',
        fontSize: RFValue(13),
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
    },

    invDetDashContainer: {
        // flex:1, 
        marginTop: hp('1'),
        alignContent: 'center',
        alignItems: 'center',
    },
    invDetDashContainer1: {
        // flex:1, 
        // marginTop: hp('1'),
        alignContent: 'center',
        alignItems: 'center',
    },

    invDetDashStyle: {
        width: wp('85'),
        height: hp('1'),
    },
    invDetDashStyle1: {
        width: wp('85'),
        height: hp('1'),
    },

    SubmitButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp('5'),
        width: hp('30'),
        height: hp('9'),
        marginLeft: hp('11'),
        borderRadius: wp('10'),

    },

    TextStyle: {
        color: '#a10d59',
        textAlign: 'center', fontWeight: 'bold'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",



    },
    modalView: {
        width: hp('50'),
        height: hp('90'),
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: hp('2'),
        marginBottom: hp('2'),
        marginLeft: hp('2'),
        marginRight: hp('2'),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "green",
        borderRadius: 25,
        padding: 10,
        elevation: 2,
        marginTop: hp('2'),
        marginBottom: hp('2'),
    },
    openButton1: {
        backgroundColor: "green",
        borderRadius: 25,
        padding: 10,
        elevation: 2,
        marginBottom: hp('2'),
    },
    textStyleModal: {
        width: hp('20'),
        height: hp('4'),
        color: "white",
        padding: 5,
        fontWeight: "bold",
        textAlign: "center", alignSelf: 'center', fontWeight: 'bold',

    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#a10d59',
        fontSize: RFValue(15),
        marginTop: hp('2'),
    },
    textDropdownContainer: {

        alignItems: 'flex-start',
        marginRight: hp('2'),
        marginLeft: hp('2'),

    },
    textDropdownContainer2: {
        flexGrow: 1,
        marginTop: hp('0'),
        //   marginVertical: hp('1'),
        marginHorizontal: wp('4'),
    },
    textDropdownContainer3: {
        flexGrow: 1,
        marginTop: hp('3.5'),
        //   marginVertical: hp('1'),
        marginHorizontal: wp('4'),
    },

    headingTitleText: {
        color: '#796A6A',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        marginHorizontal: wp('1'),
    },

    dropDownContainer: {
        borderWidth: wp('0.5'),
        borderColor: '#E6DFDF',
        borderRadius: wp('2%'),
        width: wp('78'),
        height: hp('8'),
        marginTop: hp('1'),
        marginVertical: hp('3'),
        marginHorizontal: wp('1'),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: hp('2'),
        alignSelf: 'center',
        padding: -1,
    },
    centeredViewnew: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        bottom: 0,
        marginBottom: hp('-2')
    },
    blankview:{},
    modalViewnew: {
        flex: 0.40,
        flexDirection: 'column',
        width: windowWidth,
        height: 225,
        backgroundColor: "white",
        marginLeft: 2,
        marginRight: 2,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButtonnew: {

        borderRadius: 24,
        elevation: 2, width: 132,
        height: 40,
        marginBottom: hp('2'), textAlign: "center", alignSelf: 'center', justifyContent: 'center', textAlign: 'center'
    },
})