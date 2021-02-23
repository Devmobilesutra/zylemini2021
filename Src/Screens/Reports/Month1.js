import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, FlatList, BackHandler, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import Database from './../../utility/Database'
const db = new Database();
import User from '../../utility/User'
import moment from 'moment';
import { pascalCase } from "change-case";
import Communications from 'react-native-communications';
// either import the whole module and call as Communications.phonecall('0123456789', true)
// or can import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { phonecall('0123456789', true) }}
import { FloatingAction } from "react-native-floating-action";
import { Use } from 'react-native-svg';
import Month1Child from './Month1Child';
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



var ConversionFormula = ''
var ConversionFormula2 = ''

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
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
export class Month1 extends Component {
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
            selectedProduct: 'FOCUS',
            defaultUOM: '',
            selectedUOM: '',
            currentMonth: '',
            prev1Month: '',
            prev2Month: '',
            BransListArray22: [],
            NOOFDECIMAL :'',
            TotalTargetFinal :'0.00',
            TotalTarget :'0.00',



            Gedata: [],
            selfachivedata: [],
            crdata: [],
            selfdata2: [],
            target_data: [],
            rrdata: [],
            ge: "0.0",
            rr: "0.00",

            list: [
                {
                    id: 1,
                    BRAND: 'ABCD',
                    BRANDID: '111'
                },
                {
                    id: 2,
                    BRAND: 'xYz',
                    BRANDID: '222'
                }, {
                    id: 3,
                    BRAND: 'rrrrrrrrrr',
                    BRANDID: '333'
                },
                {
                    id: 4,
                    BRAND: 'aadadffs',
                    BRANDID: '44'
                }
            ],


        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        // var curr = moment().month(new Date().getMonth()).format("MMM");
        // var prev1 = moment().month(new Date().getMonth() - 1).format("MMM");
        // var prev2 = moment().month(new Date().getMonth() - 2).format("MMM");
        // this.setState({
        //     currentMonth: curr,
        //     prev1Month: prev1,
        //     prev2Month: prev2
        // })
    }




    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const { state } = navigation

        var curr = moment().month(new Date().getMonth()).format("MMM")
        var prev1 = moment().month(new Date().getMonth() - 1).format("MMM")
        var prev2 = moment().month(new Date().getMonth() - 2).format("MMM")
        return {
            title: curr,
            color: 'white',
            headerStyle: {
                backgroundColor: '#221818'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff', marginLeft: wp('-2'), fontSize: 18


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
                value='FOCUS'
                pickerStyle={{ width: wp('78') }}
                dropdownPosition={-3}
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




    setModalVisible = (bools) => {

        this.setState({ modalVisible: bools })
    }


    ButtonClickCheckFunction = () => {

        this.setModalVisible(true)
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
        // alert("rajjo")
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        this._sub = this.props.navigation.addListener(
            'didFocus',
            this._componentFocused

        );
        this.getdata()
    }
    getdata() {
        //  alert("aaa")
        console.log('month in 1 : '+month )
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
        db.getNOOFDECIMAL().then((data) =>{
            this.setState({ NOOFDECIMAL: data.Value })
        })
        db.getDefaultUOM().then((data) => {
            this.setState({ defaultUOM: data.Value })
            User.DefaultUOM = data.Value


            db.ConversionUOMFormula(pascalCase(this.state.defaultUOM)).then((data) => {
                ConversionFormula = data.ConversionUomFormula

                if (ConversionFormula == "VALUE" || ConversionFormula == "9LCASE" || ConversionFormula == "VOLUME" || ConversionFormula == "POINTS" || ConversionFormula == "KG") {
                    ConversionFormula2 = ConversionFormula
                    User.conversionFormula2 = ConversionFormula2
                }
                else {
                    ConversionFormula2 = 'sum(' + ConversionFormula + ')'
                    User.conversionFormula2 = 'sum(' + ConversionFormula + ')'
                }

            })
        })

        db.getTotalTarget(month).then((data) => {
            this.setState({ TotalTarget : (data.Target).toFixed(this.state.NOOFDECIMAL)})
        })

        db.getUOMList().then((data) => {
            var str = data.Value
            var res = str.split(",");
            this.setState({ UOMListArray: res })
        })
        console.log('report2_ComboClassification : '+User.report2_ComboClassification)

        db.getControlId(User.report2_ComboClassification).then((data) => {
            this.setState({ controllId: data.ControlId })

            //  var classification=this.props.Classification
            //  classification.split(',')

            // console.log("classsssssssssssssss=",this.props.classification)


            db.getAllBrandForFilters(this.state.controllId).then((data) => {
                this.state.films1 =[];
                this.state.films1.push({ "BRAND": "FOCUS" })
                this.state.films1.push({ "BRAND": "ALL" })
                this.setState({ BransListArray22: data })
                this.setState({
                    BransListArrayFilterFinal: [...this.state.films1, ...this.state.BransListArray22]
                })
                //  alert(JSON.stringify(this.state.BransListArrayFilterFinal))
            })
            var classification = User.report2_Classification
            var newclassification = classification.split('.')

            // db.getAllBrandListTVSAC(this.state.controllId,newclassification[1],User.conversionFormula2,'Yes').then((data) => {         
            //     this.setState({ BransListArray: [] })              
            //     this.setState({ BransListArray: data })

            // })

            //db.getDataforytd(brandId, month, Conver
            //     db.getTarget(this.state.BransListArray[i].BRANDID,month,ConversionFormula2).then((data) => {
            //         for (var j = 0; j < this.state.BransListArray.length; j++) {
            //             if (this.state.BransListArray[i].BRANDID == this.state.BransListArray[j].BRANDID) {


            //             }
            //         }

            //     })

            // db.getAchieved(this.state.BransListArray[i].BRANDID,month,ConversionFormula2,'Yes').then((data) => {
            //     console.log(data)


            // })
            // this.state.list2 = []
            // this.setState({ list2: data });
            // for (var i = 0; i < this.state.list.length; i++) {
            //   for (var j = 0; j < this.state.list2.length; j++) {
            //     if (this.state.list[i].ItemId == this.state.list2[j].item_id) {
            //       this.state.list[i].quantity_one = this.state.list2[j].quantity_one
            //       this.state.list[i].quantity_two = this.state.list2[j].quantity_two
            //       this.state.list[i].bottleQty = this.state.list2[j].bottleQty
            //     }
            //   }
            // }
            // this.setState({ list: this.state.list })
            // db.getpercent().then((data) => {

            // })
            // db.getPR().then((data) => {

            // })
            // db.getCR().then((data) => {

            // })


            // if (month == 0) {
            //   //  alert(User.conversionFormula2)
            //   month ='12';
            //   if(this.state.selectedProduct == 'FOCUS'){
            //     db.getAllBrandListTVSAC7(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
            //         console.log("myquerrrrrrrrrrrrrrrry======", JSON.stringify(data))
            //         this.setState({ BransListArray: [] })
            //         this.setState({ BransListArray: data })
            //         var targetarray =[];
            //         this.state.BransListArray.map((item,i)=>{
            //             db.getTotaltarget(item.BRANDID,month).then((data) =>{
            //                 console.log('array..... : '+JSON.stringify(data))
            //                 targetarray.push(data);
            //                 this.state.BransListArray[i].target = (data.Target).toFixed(this.state.NOOFDECIMAL);
            //                 var res = (item.achi / data.Target) * 100;
            //                 this.state.BransListArray[i].average =Math.round(res) ;
            //                 var daysInMonth = new Date(year, month, 0).getDate();
            //                 console.log('days in month : '+ daysInMonth)
            //                 var CR = (item.achi / daysInMonth);
            //                 console.log('days in cr : '+ CR)
            //                 this.state.BransListArray[i].CR =CR.toFixed(this.state.NOOFDECIMAL) ;
            //                 this.state.BransListArray[i].RR ='0' ;
            //                 this.setState({TargetArray : targetarray})
            //                 console.log("sonali2 with target array ",JSON.stringify(this.state.TargetArray));
            //                 console.log("sonali2 with target new",JSON.stringify(this.state.BransListArray));
            //             })

            //          })
                   
                 
            //         User.BrandCount = this.state.BransListArray.length
            //     })

            // }else if(this.state.selectedProduct == 'ALL'){
            //     db.getAllBrandListTVSAC6(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
            //         this.setState({ BransListArray: [] })
            //         this.setState({ BransListArray: data })
            //         var targetarray =[];
            //         this.state.BransListArray.map((item,i)=>{
            //             db.getTotaltarget(item.BRANDID,month).then((data) =>{
            //                 console.log('array..... : '+JSON.stringify(data))
            //                 targetarray.push(data);
            //                 this.state.BransListArray[i].target = (data.Target).toFixed(this.state.NOOFDECIMAL);
            //                 var res = (item.achi / data.Target) * 100;
            //                 this.state.BransListArray[i].average =Math.round(res) ;
            //                 var daysInMonth = new Date(year, month, 0).getDate();
            //                 console.log('days in month : '+ daysInMonth)
            //                 var CR = (item.achi / daysInMonth);
            //                 console.log('days in cr : '+ CR)
            //                 this.state.BransListArray[i].CR =CR.toFixed(this.state.NOOFDECIMAL) ;
            //                 this.state.BransListArray[i].RR ='0' ;
            //                 this.setState({TargetArray : targetarray})
            //                 console.log("sonali2 with target array ",JSON.stringify(this.state.TargetArray));
            //                 console.log("sonali2 with target new",JSON.stringify(this.state.BransListArray));
            //             })

            //          })
            //         User.BrandCount = this.state.BransListArray.length
            //     })

            // }else{
            //     db.getAllBrandListTVSAC5(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
            //         this.setState({ BransListArray: [] })
            //         this.setState({ BransListArray: data })
            //         var targetarray =[];
            //         this.state.BransListArray.map((item,i)=>{
            //             db.getTotaltarget(item.BRANDID,month).then((data) =>{
            //                 console.log('array..... : '+JSON.stringify(data))
            //                 targetarray.push(data);
            //                 this.state.BransListArray[i].target = (data.Target).toFixed(this.state.NOOFDECIMAL);
            //                 var res = (item.achi / data.Target) * 100;
            //                 this.state.BransListArray[i].average =Math.round(res) ;
            //                 var daysInMonth = new Date(year, month, 0).getDate();
            //                 console.log('days in month : '+ daysInMonth)
            //                 var CR = (item.achi / daysInMonth);
            //                 console.log('days in cr : '+ CR)
            //                 this.state.BransListArray[i].CR =CR.toFixed(this.state.NOOFDECIMAL) ;
            //                 this.state.BransListArray[i].RR ='0' ;
            //                 this.setState({TargetArray : targetarray})
            //                 console.log("sonali2 with target array ",JSON.stringify(this.state.TargetArray));
            //                 console.log("sonali2 with target new",JSON.stringify(this.state.BransListArray));
            //             })

            //          })
            //         User.BrandCount = this.state.BransListArray.length
            //     })

            // }
            //     console.log("in if brand list : "+JSON.stringify(this.state.BransListArray))
            // }
            // else {

                if(this.state.selectedProduct == 'FOCUS'){
                    db.getAllBrandListTVSAC7(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                        console.log("myquerrrrrrrrrrrrrrrry======", JSON.stringify(data))
                        this.setState({ BransListArray: [] })
                        this.setState({ BransListArray: data })
                        var targetarray =[];
                        var totalTarget ='0';
                        this.state.BransListArray.map((item,i)=>{
                            db.getTotaltarget(item.BRANDID,month).then((data) =>{
                                console.log('array..... : '+JSON.stringify(data))
                                targetarray.push(data);
                                this.state.BransListArray[i].target = (data.Target).toFixed(this.state.NOOFDECIMAL);
                                totalTarget = parseFloat(totalTarget) + parseFloat(item.achi);
                                var res = (item.achi / data.Target) * 100;
                                this.state.BransListArray[i].average =Math.round(res) ;
                                var daysInMonth = new Date(year, month, 0).getDate();
                                var date = new Date().getDate();
                                console.log('days in month : '+ daysInMonth + 'day of month : '+date)
                               var CR;
                               var RR;
                                if(date > 1){
                                     CR = (item.achi) / (date - 1) ;
                                    RR = (data.Target - item.achi) / (daysInMonth -(date -1))
                                }else{
                                    CR = '0'
                                    RR = (data.Target - item.achi) / (daysInMonth -(date -1)) 
                                }
                               
                                console.log('days in cr : '+ CR)
                                this.state.BransListArray[i].CR =CR.toFixed(this.state.NOOFDECIMAL) ;
                                this.state.BransListArray[i].RR =RR.toFixed(this.state.NOOFDECIMAL) ;
                                this.setState({TargetArray : targetarray})
                                this.setState({TotalTargetFinal : totalTarget.toFixed(this.state.NOOFDECIMAL)})
                                console.log("sonali2 with target array ",JSON.stringify(this.state.TargetArray));
                                console.log("sonali2 with target new",JSON.stringify(this.state.BransListArray));
                            })

                         })
                       
                     
                        User.BrandCount = this.state.BransListArray.length
                    })

                }else if(this.state.selectedProduct == 'ALL'){
                    db.getAllBrandListTVSAC6(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                        this.setState({ BransListArray: [] })
                        this.setState({ BransListArray: data })
                        var targetarray =[];
                        var totalTarget ='0';
                        this.state.BransListArray.map((item,i)=>{
                            db.getTotaltarget(item.BRANDID,month).then((data) =>{
                                console.log('array..... : '+JSON.stringify(data))
                                targetarray.push(data);
                                this.state.BransListArray[i].target = (data.Target).toFixed(this.state.NOOFDECIMAL);
                                totalTarget = parseFloat(totalTarget) + parseFloat(item.achi);
                                var res = (item.achi / data.Target) * 100;
                                this.state.BransListArray[i].average =Math.round(res) ;
                                var daysInMonth = new Date(year, month, 0).getDate();
                                var date = new Date().getDate();
                                console.log('days in month : '+ daysInMonth + 'day of month : '+date)
                               var CR;
                               var RR;
                                if(date > 1){
                                     CR = (item.achi) / (date - 1) ;
                                    RR = (data.Target - item.achi) / (daysInMonth -(date -1))
                                }else{
                                    CR = '0'
                                    RR = (data.Target - item.achi) / (daysInMonth -(date -1)) 
                                }
                               
                                console.log('days in cr : '+ CR)
                                this.state.BransListArray[i].CR =CR.toFixed(this.state.NOOFDECIMAL) ;
                                this.state.BransListArray[i].RR =RR.toFixed(this.state.NOOFDECIMAL) ;
                                this.setState({TargetArray : targetarray})
                                this.setState({TotalTargetFinal : totalTarget.toFixed(this.state.NOOFDECIMAL)})
                                console.log("sonali2 with target array ",JSON.stringify(this.state.TargetArray));
                                console.log("sonali2 with target new",JSON.stringify(this.state.BransListArray));
                            })

                         })
                        User.BrandCount = this.state.BransListArray.length
                    })

                }else{
                    db.getAllBrandListTVSAC5(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                        this.setState({ BransListArray: [] })
                        this.setState({ BransListArray: data })
                        var targetarray =[];
                        var totalTarget ='0';
                        this.state.BransListArray.map((item,i)=>{
                            db.getTotaltarget(item.BRANDID,month).then((data) =>{
                                console.log('array..... : '+JSON.stringify(data))
                                targetarray.push(data);
                                this.state.BransListArray[i].target = (data.Target).toFixed(this.state.NOOFDECIMAL);
                                totalTarget = parseFloat(totalTarget) + parseFloat(item.achi);
                                var res = (item.achi / data.Target) * 100;
                                this.state.BransListArray[i].average =Math.round(res) ;
                                var daysInMonth = new Date(year, month, 0).getDate();
                                var date = new Date().getDate();
                                console.log('days in month : '+ daysInMonth + 'day of month : '+date)
                               var CR;
                               var RR;
                                if(date > 1){
                                     CR = (item.achi) / (date - 1) ;
                                    RR = (data.Target - item.achi) / (daysInMonth -(date -1))
                                }else{
                                    CR = '0'
                                    RR = (data.Target - item.achi) / (daysInMonth -(date -1)) 
                                }
                               
                                console.log('days in cr : '+ CR)
                                this.state.BransListArray[i].CR =CR.toFixed(this.state.NOOFDECIMAL) ;
                                this.state.BransListArray[i].RR =RR.toFixed(this.state.NOOFDECIMAL) ;
                                this.setState({TargetArray : targetarray})
                                this.setState({TotalTargetFinal : totalTarget.toFixed(this.state.NOOFDECIMAL)})
                                console.log("sonali2 with target array ",JSON.stringify(this.state.TargetArray));
                                console.log("sonali2 with target new",JSON.stringify(this.state.BransListArray));
                            })

                         })
                        User.BrandCount = this.state.BransListArray.length
                    })

                }

                // if (this.state.selectedProduct != 'ALL' && this.state.selectedProduct != 'FOCUS') {
                //   //  alert("555")
                //     db.getAllBrandListTVSAC5(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                //         this.setState({ BransListArray: [] })
                //         this.setState({ BransListArray: data })
                //         User.BrandCount = this.state.BransListArray.length
                //     })

                // }
                // else if (this.state.selectedProduct == 'ALL' && this.state.selectedProduct != 'FOCUS') {
                //  //   alert("666")
                //     db.getAllBrandListTVSAC6(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                //         this.setState({ BransListArray: [] })
                //         this.setState({ BransListArray: data })
                //         User.BrandCount = this.state.BransListArray.length
                //     })

                // }
                // else if (this.state.selectedProduct != 'ALL' && this.state.selectedProduct == 'FOCUS') {
                //  //   alert("777")
                //     db.getAllBrandListTVSAC7(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                //         console.log("myquerrrrrrrrrrrrrrrry==", JSON.stringify(data))
                //         this.setState({ BransListArray: [] })
                //         this.setState({ BransListArray: data })
                //         console.log("sonali array",data);
                //         User.BrandCount = this.state.BransListArray.length
                //     })
                // }
                // else {
                //   //  alert("888")
                //     db.getAllBrandListTVSAC8(this.state.controllId, newclassification[1], User.conversionFormula2, 'Yes', this.state.selectedProduct, month).then((data) => {
                //         this.setState({ BransListArray: [] })
                //         this.setState({ BransListArray: data })
                //         User.BrandCount = this.state.BransListArray.length
                //     })

                // }
                console.log("in else brand list : "+JSON.stringify(this.state.BransListArray))
         //   }  // end of else month 0



        })

    }



    ButtonClic() {
        this.getdata()
        this.setModalVisible(false)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}
                >

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
                            style={{ height: hp('95'), width: wp('100'), resizeMode: 'cover', justifyContent: 'center', }}
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
                                        {this._renderEntityProduct()}
                                    </View>

                                    {/* <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>DISTRIBUTORS</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>UNIT OF MEASUREMENT</Text>
                                        {this._renderEntityUOM()}
                                    </View> */}

                                    <View style={{
                                        width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute',
                                        bottom: 50
                                    }}>
                                        <TouchableHighlight
                                            style={styles.openButton}
                                            onPress={() => {
                                                this.ButtonClic()

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


                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >

                        {/*Total Shops  */}
                        <View style={styles.totalShopsMainContainer}>
                            <View style={styles.totalShopColContainer}>
                                <Text style={styles.totalShopCountTextStyle}>
                                    Total Target
                    </Text>
                                <Text style={styles.totalShopHeadingTextStyle}>
                                    {this.state.TotalTarget}
                    </Text>
                            </View>


                            <View style={styles.totalShopColContainer}>
                                <View style={styles.TriangleShapeCSS} />

                                <Text style={{
                                    color: '#2FC36E',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    marginTop: hp('0.5'),
                                    fontFamily: 'Proxima Nova',
                                    marginLeft: hp('0.5'),
                                }}>
                                    00%
                    </Text>
                            </View>


                            {/* Filter Icon */}
                            <View style={styles.filterIconContainer}>
                                <View style={styles.shopVisitedColContainer}>
                                    <Text style={styles.shopVisitedCountTextContainer}>
                                        Target Achieved
                    </Text>
                                    <Text style={{
                                        color: '#362828',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        marginTop: hp('0.5'),
                                        fontFamily: 'Proxima Nova',
                                    }}>
                                        {this.state.TotalTargetFinal}
                    </Text>

                                </View>
                            </View>
                        </View>


                        <FlatList
                       
                            data={this.state.BransListArray}

                            renderItem={({ item, index }) => {
                                return (

                                    <View style={styles.collapseHeaderStyle}>
                                        <View style={{ flex: 1, marginLeft: wp('4'), marginTop: wp('3'), }} >
                                            <Text style={styles.brandnameTextStyle} >
                                            {item.BRAND}
                                            </Text>
                                        </View>

                                        <Month1Child
                                            month={month}
                                            brandid={item.BRANDID}
                                            achi={item.achi}
                                            target ={item.target}
                                            average ={item.average}
                                            CR = {item.CR}
                                            RR={item.RR}
                                            brandlistarr={this.state.BransListArray}
                                        />
                                        {/* <View style={{ flex: 2, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row', }}>
                                <View style={{ flex: 2, flexDirection: 'column', justifyContent: "flex-start" }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>Target</Text>
                                        {this.returnText1(item.BRANDID)}
                                    <Text style={{ color: '#362828', fontSize: 12 }}>0000000</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>Achieved</Text>
                                    <Text style={{ color: '#362828', fontSize: 12 }}>0000000</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>%</Text>
                                    <Text style={{ color: '#362828', fontSize: 12 }}>000</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>PR</Text>
                                    <Text style={{ color: '#362828', fontSize: 12 }}>0.08</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>CR</Text>
                                    <Text style={{ color: '#362828', fontSize: 12 }}>0.08</Text>
                                </View>

                            </View> */}
                                    </View>
                                )
                            }

                            }
                            keyExtractor={(item => item.BRANDID)}

                        />
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
        shops: state.shops,
    };
};
const mapDispatchToProps = dispatch => ({
    shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds)); },
}
)
export default connect(mapStateToProps, mapDispatchToProps)(Month1)

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
        marginLeft: hp('2'),
        marginRight: hp('3'),
        marginTop: hp('2'),
        marginBottom: hp('2'),
    },

    totalShopColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    totalShopCountTextStyle: {
        color: '#796A6A',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
    },

    totalShopHeadingTextStyle: {
        color: '#362828',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova',
        marginLeft: hp('-0'),
    },

    shopVisitedColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    shopVisitedCountTextContainer: {
        color: '#796A6A',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
    },

    shopVisitedHeadingTextStyle: {
        color: '#796A6A',
        fontSize: 10,
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
        marginTop: hp('1.5'),
        marginBottom: 2,
        borderRadius: 5,
        height: hp('15'),
        width: wp('89.3'),
        //  borderWidth: hp('0.3'),
        marginHorizontal: wp('4.6'),

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
    TriangleShapeCSS: {
        width: 0,
        height: 0,
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 18,
        borderStyle: 'solid',
        marginTop: hp('0.2'),
        marginLeft: hp('1'),
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#2FC36E'
    },
})