import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, Dimensions, FlatList, BackHandler, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { Icon } from 'react-native-elements'
//import { ISFILTER } from '../../Redux/actions/ReportAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Communications from 'react-native-communications';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#01C6FD",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#00D4BD",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true // optional
};
const data1 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20000, 45000, 28000, 80000, 99000, 43000],
            color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Sales Report"] // optional
};
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
        textStyle: { fontSize: 15, marginHorizontal: 10 },
        buttonSize: 0,
    },
];
let countvisited = 0
export class SalesReportTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {

            active: false,
            modalVisible: false,
            modalVisiblefilter: false,
            // cardView: false ,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.setModalVisiblefilter = this.setModalVisiblefilter.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        const { state } = navigation

        return {
            title: 'Sales Report',
            color: 'white',
            headerStyle: {
                backgroundColor: '#221818'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff', marginLeft: hp('3'), fontSize: 18, fontWeight: 'bold'
            },
            headerRight: (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>

                    <TouchableOpacity onPress={state.params.handleFilterPress}>

                        <View>
                            <Image style={{
                                marginRight: hp('4'), height: hp('3'), width: wp('4'), color: '#2FC36E',

                            }}
                                source={require('../../assets/Icons/Sort_by.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <Image style={{ marginRight: hp('2'), marginBottom: hp('0.5'), height: hp('4'), width: wp('6'), }}
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
                        source={require('../../assets/Icons/Shop.png')}
                    />
                </View>
            ),
        }

    }







    _renderEntity() {
        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                pickerStyle={{ width: wp('87.3') }}
                rippleOpacity={0}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                placeholder="Select"
                dropdownPosition={-3.6}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={entity}
                onChangeText={(value) => { this.onChangeHandlerEntity(value) }}
            />
        )
    }


    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.setParams({
            handleFilterPress: this._handleFilterPress.bind(this)
        });
    }
    setModalVisible = (bools) => {
        this.setState({ modalVisible: bools })
    }
    setModalVisiblefilter = (bools) => {
        console.log(bools)
        this.setState({ modalVisiblefilter: bools })
    }
    _handleFilterPress() {
        //alert("ghchg")
        this.setModalVisiblefilter(true)
    }

    ButtonClickCheckFunction = () => {
        this.setModalVisible(true)
    }
  

  
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        Actions.drawerMenu();
        return true;
    }



    render() {
        const { navigation } = this.props;
        const { params = {} } = navigation.state;
        const { state } = navigation;
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}  >

                    {/* ////////////////////////////////modal start */}
                    <Modal
                        style={{
                            flex: 1,
                            padding: 5

                        }}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false)
                        }}>
                        <ImageBackground
                            source={require('../../assets/Icons/android_BG.png')}
                            style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{
                                            marginBottom: 20,
                                            textAlign: "center",
                                            fontWeight: 'bold',
                                            color: '#CC1167',
                                            fontSize: 16,
                                            marginTop: hp('4'), marginLeft: hp('-18'), marginRight: hp('2')
                                        }}>
                                            <Icon
                                                size={24}
                                                name='create'
                                                color='#CC1167' />

                                        </View>

                                        <Text style={styles.modalText}>Change Selection</Text>
                                    </View>


                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>PRODUCTS</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>DISTRIBUTORS</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>UNIT OF MEASUREMENT</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={{
                                        width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute',
                                        bottom: 50
                                    }}>
                                        <TouchableHighlight
                                            style={styles.openButton}
                                            onPress={() => {
                                                this.setModalVisible(false)
                                            }}
                                        >
                                            <Text style={styles.textStyleModal}>CONFIRM</Text>
                                        </TouchableHighlight>

                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setModalVisible(false)
                                            }}
                                        >
                                            <Text style={styles.textStyleModal1}>CANCEL</Text>
                                        </TouchableHighlight>


                                    </View>

                                </View>
                            </View>
                        </ImageBackground>
                    </Modal>

                    {/* /////////////////////////////////////////////////////////end */}


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
                                <View style={{flex:1.5,    width: windowWidth,flexDirection:'row',backgroundColor:'#F8F4F4',alignItems:'center',justifyContent:'center',}}>
                                    <Text style={{flex:1,color:'#8C7878',fontSize:12,marginLeft:hp('4')}}>Sort By</Text>
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
                                <View style={{flex:5,flexDirection:'column',backgroundColor:'#FFFFFF',   width: windowWidth,alignItems:'flex-start',justifyContent:'flex-start',marginTop:hp('2')}}>

                                <Text style={{color:'#362828',fontSize:12,marginTop:hp('2'),marginLeft:hp('4')}}>Top Performing Brand First</Text>
                                <Text style={{color:'#362828',fontSize:12,marginTop:hp('2'),marginLeft:hp('4')}}>Lowest Performing Brand First</Text>
                                <Text style={{color:'#362828',fontSize:12,marginTop:hp('2'),marginLeft:hp('4')}}>Arrange from A TO Z</Text>
                                <Text style={{color:'#362828',fontSize:12,marginTop:hp('2'),marginLeft:hp('4')}}>Arrange from Z TO A</Text>
                                <Text style={{color:'#362828',fontSize:12,marginTop:hp('2'),marginLeft:hp('4')}}>Customer Classification</Text>

                                </View>
                            </View>
                        </View>
                    </Modal>


                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.headerMainContainer}>
                            <View style={styles.headerMainContainer11}>
                                <Text style={styles.todaysRouteTextStyle} >
                                    PRODUCTS/BRANDS
                </Text>
                                <Text style={styles.todaysRouteTextStylebelow} >
                                    All(20)
                </Text>
                            </View>
                            <View style={styles.headerMainContainer1}>
                                <Text style={styles.todaysRouteTextStyle} >
                                    DISTRIBUTORS
                </Text>
                                <Text style={styles.todaysRouteTextStylebelow} >
                                    All(30)
                </Text>
                            </View>
                            <View style={styles.headerMainContainer1}>
                                <Text style={styles.todaysRouteTextStyle} >
                                    UOM
                </Text>
                                <Text style={styles.todaysRouteTextStylebelow} >
                                    Cases
                </Text>
                            </View>

                        </View>

                        <LineChart
                            data={data1}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />

                        {/*monthly   */}
                        <View style={styles.totalShopsMainContainer}>

                            <View style={styles.totalShopColContainer}>
                                <Text style={styles.totalShopCountTextStyle}>
                                    Monthly Total Sales
                    </Text>
                                <Text style={styles.totalShopHeadingTextStyle}>
                                    60,000
                    </Text>

                            </View>

                            {/* Filter Icon */}
                            <View style={styles.filterIconContainer}>
                                <View style={styles.shopVisitedColContainer}>
                                    <Text style={styles.shopVisitedCountTextContainer}>
                                        Total % Change(Q2)
                    </Text>
                                    <Text style={styles.shopVisitedHeadingTextStyle}>
                                        +10%
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

                        <View style={styles.collapseHeaderStyle}>
                            <View style={{ flex: 1, marginLeft: wp('4'), marginTop: wp('3'), }} >
                                <Text style={styles.brandnameTextStyle} >
                                    Brand Name
                </Text>
                            </View>
                            <View style={styles.invDetDashContainer}>
                                <Dash style={styles.invDetDashStyle}
                                    dashLength={2}
                                    dashColor='#E6DFDF'
                                />
                            </View>
                            <View style={{ flex: 2, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row', }}>
                                <View style={{ flex: 2, flexDirection: 'column', justifyContent: "flex-start" }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova' }}>May20</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0000000</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova' }}>June20</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0000000</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova' }}>July20</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0000000</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova' }}>YTD</Text>
                                    <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0.08</Text>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.SubmitButtonStyle}

                        onPress={this.ButtonClickCheckFunction}
                    >
                        <View style={{ alignSelf: "center", textAlign: 'center', lineHeight: 56 }}
                        >
                            <Icon

                                size={24}
                                name='create'
                                color='#CC1167' />
                        </View>

                        <Text style={styles.TextStyle}> Change Selection </Text>

                    </TouchableOpacity>
                </ImageBackground>
            </View >
        );
    }
}


const mapStateToProps = (state) => {
    return {
     //   reports: state.reports,
    };
};
const mapDispatchToProps = dispatch => ({
  //  isFilter: (bool) => { dispatch(ISFILTER(bool)); },
}
)
export default connect(mapStateToProps, mapDispatchToProps)(SalesReportTeam)

const styles = StyleSheet.create({

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
    headerMainContainer11: {
        flex: 1.5,
        backgroundColor: '#221818',
        flexDirection: 'column',
        marginLeft: wp('10'),
        marginTop: hp('2'),
        justifyContent: 'center', marginBottom: hp('2'),

    },

    todaysRouteTextStyle: {
        color: '#796A6A',
        fontSize: 10,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',

    },
    todaysRouteTextStylebelow: {

        color: 'white',
        fontSize: 12,
        marginTop: hp('1'),
        fontWeight: 'bold', fontFamily: 'Proxima Nova'
    },
    dropDownContainer: {
        borderWidth: wp('0.5'),
        borderColor: '#E6DFDF',
        borderRadius: wp('2%'),
        width: wp('50'),
        height: hp('5'),

        backgroundColor: '#FFFFFF',

    },

    totalShopsMainContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('2'),
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
        marginLeft: hp('0'),
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
        fontWeight: 'bold',
    },

    shopVisitedHeadingTextStyle: {
        color: 'black',
        fontSize: RFValue(22),
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova',

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
        borderWidth: hp('0.3'),
        marginHorizontal: wp('4.6'),
        marginTop: hp('1'),
    },
    brandnameTextStyle: {

        color: '#221818',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
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

    SubmitButtonStyle: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',

        width: 200,
        height: 56,
        lineHeight: 56,
        marginHorizontal: hp('5'),
        marginVertical: hp('2'),
        // borderColor: '#00000029',
        // borderWidth: hp('0.3'),
        borderRadius: 48,
        textAlign: 'center',
        bottom: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#00000029",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },

    TextStyle: {
        color: '#CC1167',
        textAlign: 'center', fontSize: 14, fontFamily: 'Proxima Nova', alignSelf: "center", textAlign: 'center', lineHeight: 56


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
        backgroundColor: "#2FC36E",
        borderRadius: 24,
        elevation: 2, width: 132,
        height: 40,
        marginBottom: hp('2'), textAlign: "center", alignSelf: 'center', justifyContent: 'center', textAlign: 'center'
    },
    openButton1: {
        backgroundColor: "green",
        borderRadius: 25,
        padding: 10,
        elevation: 2,
        marginBottom: hp('2'),
    },
    textStyleModal: {
        color: "white",
        padding: 5,
        fontWeight: "bold",
        textAlign: "center", alignSelf: 'center', fontWeight: 'bold', fontSize: 12,

    },
    textStyleModal1: {
        color: "#362828",
        padding: 5,
        fontWeight: "bold",
        textAlign: "center", alignSelf: 'center', fontWeight: 'bold', fontSize: 12, marginTop: hp('1')

    },

    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#CC1167',
        fontSize: 16,
        marginTop: hp('4'),
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
        marginHorizontal: wp('1'), fontSize: 10
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: hp('47'),
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
        backgroundColor: "#2FC36E",
        borderRadius: 24,
        elevation: 2, width: 132,
        height: 40,
        marginBottom: hp('2'), textAlign: "center", alignSelf: 'center', justifyContent: 'center', textAlign: 'center'
    },
    openButton1: {
        backgroundColor: "green",
        borderRadius: 25,
        padding: 10,
        elevation: 2,
        marginBottom: hp('2'),
    },
    textStyleModal: {
        color: "white",
        padding: 5,
        fontWeight: "bold",
        textAlign: "center", alignSelf: 'center', fontWeight: 'bold', fontSize: 12,

    },
    textStyleModal1: {
        color: "#362828",
        padding: 5,
        fontWeight: "bold",
        textAlign: "center", alignSelf: 'center', fontWeight: 'bold', fontSize: 12, marginTop: hp('1')

    },

    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#CC1167',
        fontSize: 16,
        marginTop: hp('4'),
    },
    textDropdownContainer: {

        alignItems: 'flex-start',
        marginRight: hp('2'),
        marginLeft: hp('2'),

    },
    centeredViewnew: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        bottom: 0,
        marginBottom: hp('-2')
    },
    modalViewnew: {
        flex: 0.40,
        flexDirection: 'column',
        width: windowWidth,
        height: 225,
        backgroundColor: "white",
   marginLeft:2,
   marginRight:2,
       
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