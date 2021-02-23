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
import Moment from 'react-moment';
import { pascalCase } from "change-case";
import Communications from 'react-native-communications';
var arr = [], getData = [], crData = [],rrdata=[],Tarr=[]
var result2
export default class Month1Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TargetVal: [],
            average :'',
           // Tarr: json.items
        }
    }

    componentDidMount() {
        /////////////////target data render//////////
        var target1 = "sum(Target)";
       
        // var newDate = moment(Date(this.props.month)).format('DD-MM-YYYY');
        console.log("new achiv  ",this.props.achi);
        console.log("new target  ",this.props.Target);
      
        // if (this.props.month == 0) {
        //     db.getTargetData(this.props.brandid, target1).then((data) => {
        //         this.setState({ TargetVal: data })

        //     })
        // }
        // else {
        //     console.log("sample month",this.props.month);
        //     var curr = moment().month(this.props.month-1).format("MMM");
        //     console.log("month trans",curr);
        //     var transMonth;
        //     var lastdate = new Date(2021, this.props.month, 0).getDate();
        //     console.log('last date of month : '+lastdate)
        //     transMonth= moment().month(curr).format("YYYY-MM-"+lastdate+"T00:00:00");
        //    console.log("transMonth",transMonth);
          
        //    Tarr=[];
        //     db.getTargetDatabymonth(this.props.brandid, target1, transMonth).then((data) => {
        //         console.log("target final data",data);
        //         Tarr.push(data)
        //        // Tarr=data;
        //       // this.setState({ TargetVal: JSON.stringify(data) })
        //  // Tarr=JSON.stringify(data);
        //  console.log("tarrr value",Tarr); 
        //  })
        // }
        /////////////////////////////////////////////////////////AchivedData//////////////////

        // console.log("aaaaaaaaaaaaaaaa=", this.props.brandlistarr)
        // var brandArray_data = []
        // brandArray_data = this.props.brandlistarr
        // var itemarr = []
        // db.getItemIdArray(this.props.brandid).then((data) => {
        //     itemarr = data
        // })
        // var sales = 0.0
        // var quantitys

        // var arr2 = []
        // for (var i = 0; i < itemarr.length; i++) {
        //     if (month == 0) {
        //         db.getTargetDataif(itemarr[i].ItemId).then((data) => {
        //             quantitys = data
        //             arr.push({ Quantity: data })
        //         })
        //     }
        //     else {
        //         db.getTargetDataelse(itemarr[i].ItemId, month).then((data) => {
        //             quantitys = data
        //             arr.push({ Quantity: data })
        //         })
        //     }
        //     db.getBPCdata(itemarr[i].ItemId).then((data) => {
        //         arr2.push({ BPC: data })
        //     })


        //     if (arr.length != 0) {
        //         var dataQuantity = arr[i].Quantity
        //         var dataBPC = arr2[i].BPC
        //         var val = dataQuantity / dataBPC;
        //         sales += val;
        //         salesarr.push(sales)
        //     }
        // }



        // for (var i = 0; i < brandArray_data.lenght; i++) {
        //     var brandData = brandArray_data[i]
        //     var _achivedata = division_data[i].Achieved;

        //     var month1 = this.props.month  //tab
        //     var month1 = new Date().getMonth() + 1
           
        //     if (month1 == month2) {
        //         result2 = currentdate - 1;
        //     }
        //     Else
        //     {
        //         result2 = numberOfDays_1;
        //     }
        //     brandID_1 = salesarr[i];
        //     var achievedValue = parseFloat(brandID_1) / result2;
        //     crData.push(achievedValue)
        
        // }




        // ///////////////per///////////////////////////////////
        // var target_data = []
        // if (this.props.month == 0) {
        //     db.getTargetData(this.props.brandid, target1).then((data) => {
        //         target_data.push(data)

        //     })
        // }
        // else {
        //     db.getTargetDatabymonth(this.props.brandid, target1, this.props.month).then((data) => {
        //         target_data.push(data)
        //     })
        // }
        // for (var i = 0; i < target_data.lenght; i++) {
        //     var target = target_data[i];
        //     var achive = salesarr[i];
        //     var rounded;
        //     var res = (achive / target) * 100;
        //     rounded = roundf(res);
        //     var tval1 = rounded1;
        //     var tval12;
        //     if (tval1 < 0) {
        //         tval12 = 0.0;
        //     }
        //     else {
        //         tval12 = tval1;
        //     }
        //     getData.push(tval12)
        //     console.log('get data '+ JSON.stringify(getData))


        //     var rr = (target - achive) / (30 - result2); //please check above value for reference result2 = number days which is selected month

        //     var month1 = new Date().getMonth() + 1
        //     if (month1== this.props.month) {
        //         if (rr < 0) {
        //             rr = 0;                  
        //            rrdata.push(rr)
        //         }
        //         else {
        //             rrdata.push(rr)
        //         }
        //     }
        //     else {
        //         var rr = 0;
        //         rrdata.push(rr)
        //     }
        // }



    }


  


render() {
    return (
        <View style={{ flex: 1, marginTop: hp('-3') }}>
            <View style={styles.invDetDashContainer}>
                <Dash style={styles.invDetDashStyle}
                    dashLength={2}
                    dashColor='#E6DFDF'
                />
            </View>

            <View style={{ flex: 2, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row', }}>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: "flex-start" }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>Target</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.target}</Text>
                    {/* {
                        
                        Tarr.map((item,i) => {
                          //  console.log('tarrget : '+JSON.stringify(Tarr));
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item.Target}</Text>
                            )

                        })
                    } */}

                </View>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>Achieved</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.achi}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>%</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.average}</Text>
                    {/* {
                        getData.map((item) => {
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item}</Text>
                            )
                         })

                    } */}
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>PR</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.RR}</Text>
                    {/* {
                        rrdata.map((item) => {
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item}</Text>
                            )

                        })

                    } */}
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ color: '#796A6A', fontSize: 10, fontWeight: 'bold' }}>CR</Text>
                    <Text style={{ color: '#362828', fontSize: 12 }}>{this.props.CR}</Text>
                    {/* {
                        crData.map((item) => {
                            return (
                                <Text style={{ color: '#362828', fontSize: 12 }}>{item}</Text>
                            )

                        })

                    } */}
                </View>

            </View>

        </View>
    )
}
}
const styles = StyleSheet.create({
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

})