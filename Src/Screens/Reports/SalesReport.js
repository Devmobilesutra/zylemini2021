import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, FlatList, BackHandler, Dimensions, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import { Icon } from 'react-native-elements'
const db = new Database();
import Communications from 'react-native-communications';
import moment from 'moment';
import { pascalCase } from "change-case";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// either import the whole module and call as Communications.phonecall('0123456789', true)
// or can import single methods and call straight via the method name
// import { web, phonecall } from 'react-native-communications';
// e.g. onPress={() => { phonecall('0123456789', true) }}

import { FloatingAction } from "react-native-floating-action";
import User from '../../utility/User';
import SaleReportChild from './SaleReportChild';
var ytdData=[]
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
export class SalesReport extends Component {
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
            selectedDist: 'ALL',
            selectedDistName :'',
            NOOFDECIMAL :'',
            controllId: '',
            selectedProduct: 'FOCUS',
            defaultUOM: '',
            selectedUOM: '',
            currentMonth: '',
            TotalMonthlySales : '',
            prev1Month: '',
            prev2Month: '',BransListArray12:[],y:''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);

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
                color: '#fff', marginLeft: hp('3'), fontSize: 18, fontWeight: 'bold'
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
        const beat = []
        const BeatId =[];
      //  console.log('distributorArray : '+JSON.stringify(this.state.distributorArray))
        for (var i = 0; i < this.state.distributorArray.length; i++) {
            beat.push({
                value: this.state.distributorArray[i].Distributor
            })
            BeatId.push({
                value: this.state.distributorArray[i].DistributorID
            })
        }
      //  console.log('beat id : '+JSON.stringify(BeatId))

      //  const array = [{"Distributor":"CSD BANGALORE","DistributorID":"789"},{"Distributor":"KARNATAKA STATE BEVERAGES","DistributorID":"1409"},{"Distributor":"KSBCL - ATTIBELE","DistributorID":"437"},{"Distributor":"KSBCL - BAGALKOT","DistributorID":"1"},{"Distributor":"KSBCL - BAGALKUNTE","DistributorID":"2"},{"Distributor":"KSBCL - BAGALKUNTE-2","DistributorID":"1165"},{"Distributor":"KSBCL - BANGARPET","DistributorID":"3"},{"Distributor":"KSBCL - BANNERGHATTA ROAD","DistributorID":"4"}]
        
        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                rippleOpacity={0}
                fontSize={11}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                value='ALL'
                pickerStyle={{ width: wp('78') }}
                dropdownPosition={-5.5}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={beat}
             //   onChangeText={(value) => { this.onChangeHandlerDistributor(value) }}
                onChangeText={(value, index, data) => this.onChangeHandlerDistributor(BeatId[index].value,value)}
            />
        )
    }

    onChangeHandlerDistributor = (distId,value) => {
        this.setState({ selectedDist: distId })
        console.log('dist id : '+distId)
      //  this.setState({selectedDistName : name})
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
                dropdownPosition={-5.5}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={beat}
                onChangeText={(value) => { this.onChangeHandlerProduct(value) }}
            />
        )
    }

    onChangeHandlerProduct = (value) => {

        //  AsyncStorage.setItem('distributorName', JSON.stringify(value));
console.log('selected prodcut : '+value)
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

        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                rippleOpacity={0}
                fontSize={11}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                placeholder="CASES"
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
        this.setState({ defaultUOM: value }) 
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.setParams({
            handleFilterPress: this._handleFilterPress.bind(this)
        });
        this.getdata()
    }
    getdata(){  
        var month = new Date().getMonth() + 1;  
        var curr = moment().month(new Date().getMonth()).format("MMM");
        var prev1 = moment().month(new Date().getMonth() - 1).format("MMM");
        var prev2 = moment().month(new Date().getMonth() - 2).format("MMM");
        console.log('current mnt : '+curr +" prev1 : "+prev1 + " prev 2 : "+prev2 +" month : "+ month)
        console.log('month : '+ moment().month(new Date().getMonth() - 2).format('M'))
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

        db.getTotalMonthlySales(month).then((data) => {
            this.setState({TotalMonthlySales : data.sales})
        })

        db.getNOOFDECIMAL().then((data) =>{
            this.setState({ NOOFDECIMAL: data.Value })
        })
        console.log('selectedUOM : '+this.state.selectedUOM);
        if(this.state.selectedUOM){
            this.setState({ defaultUOM: this.state.selectedUOM })
            db.ConversionUOMFormula(pascalCase(this.state.defaultUOM)).then((data) => {
                ConversionFormula = data.ConversionUomFormula
                if (ConversionFormula == "VALUE" || ConversionFormula == "9LCASE" || ConversionFormula == "VOLUME" || ConversionFormula == "POINTS" || ConversionFormula == "KG") {
                    ConversionFormula2 = ConversionFormula
                }
                else {
                    ConversionFormula2 = 'sum(' + ConversionFormula + ')'
                }

            }) 
        }else{
            db.getDefaultUOM().then((data) => {
                this.setState({ defaultUOM: data.Value })
                User.DefaultUOM= data.Value
                   alert(this.state.defaultUOM)
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
        }
        
        db.getUOMList().then((data) => {
            var str = data.Value
            var res = str.split(",");
            this.setState({ UOMListArray: res })

        })
        db.getControlId(this.props.comboclassifiction).then((data) => {
            this.setState({ controllId: data.ControlId })      
            db.getAllBrandList(this.state.controllId).then((data) => {
                this.setState({ BransListArray12: [] })
                this.state.films1 =[];
                this.state.films1.push({ "BRAND": "FOCUS" })
                this.state.films1.push({ "BRAND": "ALL" })
                this.setState({ BransListArray12: [] })
                this.setState({ BransListArray12: data })
                this.setState({
                    BransListArrayFilterFinal: [...this.state.films1, ...this.state.BransListArray12]
                })
            })
            console.log('this.state.selectedDist : '+this.state.selectedDist);
            
                if((this.state.selectedProduct == 'FOCUS' || this.state.selectedProduct == 'ALL') && this.state.selectedDist == 'ALL')
            {
          //    alert("111")
                 db.getAllBrandList1(this.state.controllId, '1',this.state.selectedProduct).then((data) => {                
            //    db.getAllBrandList(this.state.controllId).then((data) => {
                //console.log("3333333333=",data)
                console.log("brands of all",data);
                    this.setState({ BransListArray: [] })                   
                    this.setState({ BransListArray: data })
                   
                })
            }else if((this.state.selectedProduct == 'FOCUS' || this.state.selectedProduct == 'ALL') && this.state.selectedDist != 'ALL'){
              //  alert("222")
              console.log('this.state.selectedDist in if : '+this.state.selectedDist);
                db.getAllBrandList2(this.state.controllId, '1',this.state.selectedDist,this.state.selectedProduct).then((data) => {
                    this.setState({ BransListArray: [] })
                    this.setState({ BransListArray: data })                    
              })
      
            }else if((this.state.selectedProduct != 'FOCUS' || this.state.selectedProduct != 'ALL') && this.state.selectedDist == 'ALL'){
             
                db.getAllBrandList3(this.state.controllId, this.state.selectedProduct).then((data) => {
                   // alert(JSON.stringify(data))
                    this.setState({ BransListArray: [] })
                    this.setState({ BransListArray: data })                        
                })
            }else if((this.state.selectedProduct != 'FOCUS' || this.state.selectedProduct != 'ALL') && this.state.selectedDist != 'ALL'){
             
                db.getAllBrandList4(this.state.controllId,this.state.selectedProduct,this.state.selectedDist).then((data) => {
                                this.setState({ BransListArray: [] })
                                this.setState({ BransListArray: data })                 
                       })
            }
            
        //     else if(this.state.selectedProduct == 'ALL' && this.state.selectedDist == 'ALL'){
        //         alert("444")
        //         db.getAllBrandList4(this.state.controllId).then((data) => {
        //             this.setState({ BransListArray: [] })
        //             this.setState({ BransListArray: data })                 
        //    })
                
        // }  else if (this.state.selectedProduct != 'ALL' && this.state.selectedDist != 'ALL'){
        //     db.getAllBrandList5(this.state.controllId,this.state.selectedProduct,this.state.selectedDist).then((data) => {
        //         this.setState({ BransListArray: [] })
        //         this.setState({ BransListArray: data })                 
        //      })
        // }  

    })
    }
    _handleFilterPress() {

        this.setModalVisiblefilter(true)
    }
    setModalVisiblefilter = (bools) => {

        this.setState({ modalVisiblefilter: bools })
    }
    renderItem = ({ item }) => {


    }

    returnText1(brandId) {
        var qty1
        var month = new Date().getMonth() + 1
       
        if (month == 0 && this.state.selectedDist == "ALL") {
            db.getDataforytd(brandId, month, ConversionFormula2).then((datas) => {
                var ytds
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = 0.00
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>8768</Text>
                    </View>
                )

            })
        }
        else if (month == 0 && this.state.selectedDist != "ALL") {
            //(brandId,selectedbarand,selecteddist,ConversionUOMFormula) 
            db.getDataforytd1(brandId, this.state.selectedProduct, this.state.selectedDist, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>5555</Text>
                    </View>
                )

            })

        }
        else if (this.state.selectedDist == "ALL") {
            db.getDataforytd2(brandId, month, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>5555</Text>
                    </View>
                )

            })

        }
        else {
            //brandId,ConversionFormula,month,selectedbrand,selecteddist) 
            db.getDataforytd3(brandId, ConversionFormula2, month, this.state.selectedProduct, this.state.selectedDist).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{console.log("khvjvh................", ytds)}5555</Text>
                    </View>
                )

            })

        }


   
    }
    returnText2(brandId) {
        var qty2 = ''
        var month = new Date().getMonth()
        if (month == 0 && this.state.selectedDist == "ALL") {
            db.getDataforytd(brandId, month, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = 0.00
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}></Text>
                    </View>
                )

            })
        }
        else if (month == 0 && this.state.selectedDist != "ALL") {
            //(brandId,selectedbarand,selecteddist,ConversionUOMFormula) 
            db.getDataforytd1(brandId, this.state.selectedProduct, this.state.selectedDist, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}></Text>
                    </View>
                )

            })

        }
        else if (this.state.selectedDist == "ALL") {
            db.getDataforytd2(brandId, month, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}></Text>
                    </View>
                )

            })

        }
        else {
            //brandId,ConversionFormula,month,selectedbrand,selecteddist) 
            db.getDataforytd3(brandId, ConversionFormula2, month, this.state.selectedProduct, this.state.selectedDist).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}></Text>
                    </View>
                )

            })

        }

    }
    returnText3=(brandId)=> {
        var qty3 = ''
        var month = new Date().getMonth() - 1
        var ytds ='0.00'
      if (month == 0 && this.state.selectedDist == "ALL") {
            db.getDataforytd(brandId, month, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = 0.00
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)            
                                  

            })
            // return (                   
            //     <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>687689</Text>)
        }
        else if (month == 0 && this.state.selectedDist != "ALL") {
            //(brandId,selectedbarand,selecteddist,ConversionUOMFormula) 
            db.getDataforytd1(brandId, this.state.selectedProduct, this.state.selectedDist, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
               
            })
            // return (
            //     <View>
            //         <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>333</Text>
            //     </View>
            // )


        }
        else if (this.state.selectedDist == "ALL") {
            db.getDataforytd2(brandId, month, ConversionFormula2).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
              

            })
            // return (
            //     <View>
            //         <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>444</Text>
            //     </View>
            // )
        }
        else {
            //brandId,ConversionFormula,month,selectedbrand,selecteddist) 
            db.getDataforytd3(brandId, ConversionFormula2, month, this.state.selectedProduct, this.state.selectedDist).then((datas) => {
                ytds = JSON.parse(datas[0].qty)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
              
            })
            // return (
            //     <View>
            //         <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>555</Text>
            //     </View>
            // )


        }
    
        return (                   
        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{ytds}</Text>
            )

    }


    _returnText4=(brandId)=> {
        var ytds=0.00
         var data=[]
        var month = 0      
     
        if (month == 0 && this.state.selectedDist == "ALL") {
            var ytds=0.00
        //   db.getDataforytd(brandId, month, ConversionFormula2).then((datas) => {
              
        //         if (data[0].qty == 'null') {
        //         ytds = 0.00
        //         } else {
        //         ytds = JSON.parse(datas[0].qty)
        //      //   this.setState({y:JSON.parse(datas[0].qty)})
        //             console.log("ytd=............." + ytds)                
                      
        //         }
        //         //console.log("in if...............", ytds)
        //         return (
        //             <View>
        //                 <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>9798</Text>
        //             </View>
        //         )
    

        //     })
       
          db.getDataforytd(brandId, month, ConversionFormula2).then((data) => {
                          console.log("govindaaaaaaaaaaaaaaaaaaaaa+=="+JSON.stringify(data))
           this.setState({y:data.qty})
           return (
            <View>
                <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{this.state.y}</Text>
            </View>
                  )         
          })
       
       // alert(db.getDataforytd(brandId, month, ConversionFormula2))
            //        if (data[0].qty == 'null') {
            //     ytds = 0.00
            //     } else {
            //     ytds = data[0].qty
            //  //   this.setState({y:JSON.parse(datas[0].qty)})
            //         console.log("ytdmeme=............." + ytds)                
                      
            //     }
         

        }
        else if (month == 0 && this.state.selectedDist != "ALL") {
            //(brandId,selectedbarand,selecteddist,ConversionUOMFormula) 
            db.getDataforytd1(brandId, this.state.selectedProduct, this.state.selectedDist, ConversionFormula2).then((datas) => {
                alert(ytds)
                if (data[0].qty == 'null') {
                  ytds = '0.00'
                } else {
                   ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{ytds}</Text>
                    </View>
                )

            })

        }
        else if (this.state.selectedDist == "ALL") {
            db.getDataforytd2(brandId, month, ConversionFormula2).then((datas) => {
                alert(ytds)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{ytds}</Text>
                    </View>
                )

            })

        }
        else {
            //brandId,ConversionFormula,month,selectedbrand,selecteddist) 
            db.getDataforytd3(brandId, ConversionFormula2, month, this.state.selectedProduct, this.state.selectedDist).then((datas) => {
               alert(ytds)
                if (data[0].qty == 'null') {
                    ytds = '0.00'
                } else {
                    ytds = JSON.parse(datas[0].qty)
                    //console.log("ytd=............." + ytds)
                }
                //console.log("in if...............", ytds)
                return (
                    <View>
                        <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{ytds}</Text>
                    </View>
                )

            })

        
    }
  
        

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
                                    <View style={{ flexDirection: 'row'}}>
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

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>DISTRIBUTORS</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>UNIT OF MEASUREMENT</Text>
                                        {this._renderEntityUOM()}
                                    </View>

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
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.headerMainContainer}>
                            <View style={styles.headerMainContainer11}>
                                <Text style={styles.todaysRouteTextStyle} >
                                    PRODUCTS/BRANDS
                </Text>
                                <Text style={styles.todaysRouteTextStylebelow} >
                                    All({this.state.BransListArray.length})
                </Text>
                            </View>
                            <View style={styles.headerMainContainer1}>
                                <Text style={styles.todaysRouteTextStyle} >
                                    DISTRIBUTORS
                </Text>
                                <Text style={styles.todaysRouteTextStylebelow} >
                                    All({this.state.distributorArray.length})
                </Text>
                            </View>
                            <View style={styles.headerMainContainer1}>
                                <Text style={styles.todaysRouteTextStyle} >
                                    UOM
                </Text>
                                <Text style={styles.todaysRouteTextStylebelow} >
                                    {this.state.defaultUOM}
                                </Text>
                            </View>

                        </View>

                        {/*Total Shops  */}
                        <View style={styles.totalShopsMainContainer}>
                            <View style={styles.totalShopColContainer}>
                                <Text style={styles.totalShopCountTextStyle}>
                                    Monthly Total Sales
                    </Text>
                                <Text style={styles.totalShopHeadingTextStyle}>
                                   {this.state.TotalMonthlySales}
                    </Text>

                            </View>

                            {/* Filter Icon */}
                            <View style={styles.filterIconContainer}>
                                <View style={styles.shopVisitedColContainer}>
                                    <Text style={styles.shopVisitedCountTextContainer}>
                                        Total % Change(Q2)
                    </Text>
                                    <View style={{ flexDirection: 'row', marginLeft: hp('1.6') }}>
                                        <Text style={styles.shopVisitedHeadingTextStyle}>
                                            +10%
                    </Text>
                                        <View style={styles.TriangleShapeCSS} />

                                    </View>

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
                                    <SaleReportChild
                                    //  month={month}
                                     brandid={item.BRANDID}
                                     currentMonth={this.state.currentMonth}
                                     prev1Month={this.state.prev1Month}
                                     prev2Month={this.state.prev2Month}
                                     selectedProduct={this.state.selectedProduct}
                                     selectedDist={this.state.selectedDist}                                   
                                      ConversionFormula2={ConversionFormula2}
                                      ControlId ={this.state.controllId}
                                      NOOFDECIMAL ={this.state.NOOFDECIMAL}
                                    //  achi={item.achi}
                                    //  brandlistarr={this.state.BransListArray}
                                    />
                                    </View>
                                )
                            }

                            }
                            keyExtractor={(item => item.BRANDID)}

                        />
                        {/* {this.state.BransListArray.map((item, index) => (

                            <View style={styles.collapseHeaderStyle}>
                                <View style={{ flex: 1, marginLeft: wp('4'), marginTop: wp('3'), }} >
                                    <Text style={styles.brandnameTextStyle} >
                                        {item.BRAND}
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
                                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>May20</Text>
                                        <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0000000</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'column' }}>
                                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>June20</Text>
                                        <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0000000</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'column' }}>
                                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>July20</Text>
                                        <Text style={{ color: '#362828', fontSize: 12, fontFamily: 'Proxima Nova' }}>0000000</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>YTD</Text>
                                        {this._returnText4(item.BRANDID)}
                                    </View>

                                </View>
                            </View>
                        ))} */}
                    </ScrollView>
                    
                    <TouchableOpacity
                        style={styles.SubmitButtonStyle}

                        onPress={this.ButtonClickCheckFunction} >
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
export default connect(mapStateToProps, mapDispatchToProps)(SalesReport)

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
        fontFamily: 'Proxima Nova',

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
        fontFamily: 'Proxima Nova', marginLeft: hp('-0')
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
        color: '#2FC36E',
        fontSize: 18,
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

    TriangleShapeCSS: {
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 15,
        borderStyle: 'solid',
        marginTop: hp('1'),
        marginLeft: hp('1'),
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#2FC36E'
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
