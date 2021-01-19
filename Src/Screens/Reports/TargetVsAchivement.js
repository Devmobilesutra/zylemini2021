import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, FlatList, BackHandler, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
import Communications from 'react-native-communications';
// either import the whole module and call as Communications.phonecall('0123456789', true)
// or can import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { phonecall('0123456789', true) }}
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
        textStyle: { fontSize: 15, marginHorizontal: 10 },
        buttonSize: 0,
    },
];
let countvisited = 0
export class TargetVsAchivement extends Component {
    constructor(props) {
        super(props);
        this.state = {

            active: false,
            modalVisible: false,
            modalVisiblefilter: false,
            distributorArray: [],
            BransListArray: [],
            BransListArrayFilter: [], BransListArrayFilterFinal: [], films1: [],
            UOMListArray: [],
            ProductsArray: [],
            selectedDist: '',
            controllId: '',
            selectedProduct: '',
            defaultUOM: '',
            selectedUOM: '',
            currentMonth: '',
            prev1Month: '',
            prev2Month: '', 
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const { state } = navigation

        return {
            title: 'Sales Report',
            color: 'white',
            headerStyle: {
                backgroundColor: '#221818'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff', marginLeft: wp('-2'), fontSize: 18,fontWeight:'bold'  ,marginTop:hp('1')
            },
            headerRight: (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>                 

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
                </View>
            ),
        }

    }

    _renderEntity() {
        const beat = []
        for (var i = 0; i < this.state.distributorArray.length; i++) {
            beat.push({
                value: this.state.distributorArray[i].Distributor
            })
        }
        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                rippleOpacity={0}
                fontSize={11}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                value={'ALL'}
                pickerStyle={{ width: wp('78') }}
                dropdownPosition={-5.5}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={beat}
                onChangeText={(value) => { this.onChangeHandlerDistributor(value) }}
            />
        )
    }

    onChangeHandlerDistributor = (value) => {
        this.setState({ selectedDist: value })
    }

    _renderEntityProduct() {
        const beat = []
        for (var i = 0; i < this.state.BransListArrayFilterFinal.length; i++) {
            beat.push({
                value: this.state.BransListArrayFilterFinal[i].BRAND
            })
        }

        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                rippleOpacity={0}
                fontSize={11}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                placeholder="Select"
                pickerStyle={{ width: wp('78') }}
                dropdownPosition={-9}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={beat}
                onChangeText={(value) => { this.onChangeHandlerProduct(value) }}
            />
        )
    }

    onChangeHandlerProduct = (value) => {

        //  AsyncStorage.setItem('distributorName', JSON.stringify(value));

        this.setState({ selectedProduct: value })
    }
    onChangeHandlerEntity = (value) => {


    }


    _renderEntityUOM() {
        const beat = []
        for (var i = 0; i < this.state.UOMListArray.length; i++) {
            beat.push({
                value: this.state.UOMListArray[i]
            })
        }
console.log(beat)
        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                rippleOpacity={0}
                fontSize={11}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                placeholder="Select"
                pickerStyle={{ width: wp('78') }}
                dropdownPosition={-5.5}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={beat}
                onChangeText={(value) => { this.onChangeHandlerUOM(value) }}
            />
        )
    }

    onChangeHandlerUOM = (value) => {
        this.setState({ selectedUOM: value })
    }
    setModalVisible = (bools) => {

        this.setState({ modalVisible: bools })
    }

  
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        Actions.drawerMenu();
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        var curr = moment().month(new Date().getMonth()).format("MMM");
        var prev1 = moment().month(new Date().getMonth() - 1).format("MMM");
        var prev2 = moment().month(new Date().getMonth() - 2).format("MMM");
        this.setState({
            currentMonth: curr,
            prev1Month: prev1,
            prev2Month: prev2
        })
        

        db.getDistributorData().then((data) => {
            this.setState({
                distributorArray: data
            })
            
        })
        db.getDefaultUOM().then((data) => {
            this.setState({ defaultUOM: data.Value })
               db.ConversionUOMFormula(pascalCase(this.state.defaultUOM)).then((data) => {
                ConversionFormula = data.ConversionUomFormula
                if (ConversionFormula == "VALUE" || ConversionFormula == "9LCASE" || ConversionFormula == "VOLUME" || ConversionFormula == "POINTS" || ConversionFormula == "KG") {
                    ConversionFormula2 = ConversionFormula
                }
                else {
                    ConversionFormula2 = 'sum(' + ConversionFormula + ')'
                }
            


            })
        })
        db.getUOMList().then((data) => {
            var str = data.Value
            var res = str.split(",");
            this.setState({ UOMListArray: res })

        })
        db.getControlId(this.props.comboclassifiction).then((data) => {
            this.setState({ controllId: data.ControlId })
            db.getAllBrandList(this.state.controllId).then((data) => {
             //   alert("aaa")
                this.setState({ BransListArray: [] })
                this.state.films1.push({ "BRAND": "FOCUS" })
                this.state.films1.push({ "BRAND": "ALL" })
                this.setState({ BransListArray: data })
                this.setState({
                    BransListArrayFilterFinal: [...this.state.films1, ...this.state.BransListArray]
                })
            })

        })

    }





    render() {
        return (
            <View style={{ flex: 1}}>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex:1, resizeMode: 'cover', justifyContent: 'center', }}
                >

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                       
                        {/*Total Shops  */}
                        <View style={styles.totalShopsMainContainer}>
                            <View style={styles.totalShopColContainer}>
                                <Text style={styles.totalShopCountTextStyle}>
                                  Total Yearly Target
                    </Text>
                                <Text style={styles.totalShopHeadingTextStyle}>
                                    60,00000
                    </Text>

                            </View>

                            {/* Filter Icon */}
                            <View style={styles.filterIconContainer}>
                                <View style={styles.shopVisitedColContainer}>
                                    <Text style={styles.shopVisitedCountTextContainer}>
                                    Target Achieved
                    </Text>
                                    <Text style={styles.shopVisitedHeadingTextStyle}>
                                      12,00000
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
                                    <Text>Target</Text>
                                    <Text>0000000</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column' }}>
                                    <Text>Achieved</Text>
                                    <Text>0000000</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column' }}>
                                    <Text>July20</Text>
                                    <Text>0000000</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text>YTD</Text>
                                    <Text>0.08</Text>
                                </View>

                            </View>
                        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(TargetVsAchivement)

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
        color: '#8C7878',
        fontSize: RFValue(13),
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    totalShopHeadingTextStyle: {
        color: 'black',
        fontSize: RFValue(22),
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova',
        marginLeft: hp('-3'),
    },

    shopVisitedColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    shopVisitedCountTextContainer: {
        color: '#8C7878',
        fontSize: RFValue(13),
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

        color: 'black',
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

    invDetDashStyle: {
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
        width: hp('47'),
        height: hp('90'),  
             backgroundColor: "white",
        borderRadius: 10,
        marginTop:hp('2'),  
        marginBottom:hp('2'),   
        marginLeft:hp('2'),   
        marginRight:hp('2'),   
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
        marginTop:hp('2'),
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
})