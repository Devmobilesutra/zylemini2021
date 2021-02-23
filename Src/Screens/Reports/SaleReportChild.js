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

export default class SaleReportChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TargetVal: '',
            ytds: [], a: '',qty1:[],qty2:[],qty3:[]
        }
    }

  async componentWillMount() {
        ///////////////////////////ytd//////////////////////


        var data = []
        var month = 0
        console.log('current mnt : '+this.props.currentMonth +" prev1 : "+this.props.prev1Month + " prev 2 : "+this.props.prev2Month +" this.props.selectedDist "+this.props.selectedDist)
            
      await  db.getDataforytd1ByVibha(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2,month,this.props.ControlId).then((data) => {
            //   this.state.ytds.push(data.qty)
            if (data.qty == null || data.qty== ''||data.qty== 0) {
                this.state.ytds.push('0.00')
            } else {
                this.state.ytds.push((data.qty).toFixed(this.props.NOOFDECIMAL))
            }
        })

// if (month == 0 && this.props.selectedDist == "ALL") {
//             db.getDataforytd(this.props.brandid, month, this.props.ConversionFormula2).then((data) => {
//               //   this.state.ytds.push(data.qty)
//                 if (data.qty == null || data.qty== ''||data.qty== 0) {
//                     this.state.ytds.push('0.00')
//                 } else {
//                     this.state.ytds.push(data.qty)
//                 }


//             })


//         }
//         else if (month == 0 && this.props.selectedDist != "ALL") {
//             db.getDataforytd1(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2).then((data) => {
               
//                 if (data.qty == null || data.qty== ''||data.qty== 0) {
//                     this.state.ytds.push('0.00')
//                 } else {
//                     this.state.ytds.push(data.qty)
//                 }

//             })

//         }
//         else if (this.state.selectedDist == "ALL") {
//             db.getDataforytd2(this.props.brandid, month, this.props.ConversionFormula2).then((data) => {
               
//                 if (data.qty == null || data.qty== ''||data.qty== 0) {
//                     this.state.ytds.push('0.00')
//                 } else {
//                     this.state.ytds.push(data.qty)
//                 }

//             })

//         }
//         else {
//            // db.getDataforytd3(this.props.brandid, this.props.ConversionFormula2, month, this.props.selectedProduct, this.props.selectedDist).then((data) => {                   
//             db.getDataforytd3(this.props.brandid, this.props.ConversionFormula2, month, this.props.brandid).then((data) => {
//                 if (data.qty == null || data.qty== ''||data.qty== 0) {
//                     this.state.ytds.push('0.00')
//                 } else {
//                     this.state.ytds.push(data.qty)
//                     console.log("qty in ytd",data.qty);
//                 }

//             })
//         }
        /////////////////////////////qty1
        console.log("month11111111111111")
       // var month1 = new Date().getMonth() + 1
        var month1 = moment().month(new Date().getMonth()).format('M')
        console.log('mont 1 : '+month1)
     await   db.getDataforytd1ByVibha(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2,month1,this.props.ControlId).then((data) => {
            //   this.state.ytds.push(data.qty)
            console.log("sales qty1",data.qty);
                    if (data.qty == null || data.qty== ''||data.qty== 0) {
                        this.state.qty1.push('0.00')
                    } else {
                        console.log("qty is not null",data.qty);
                        this.state.qty1.push((data.qty).toFixed(this.props.NOOFDECIMAL))
                    }
        })
        // if (month1 == 0 && this.props.selectedDist == "ALL") {
        //     db.getDataforytd(this.props.brandid, month1, this.props.ConversionFormula2).then((data) => {
        //         console.log("sales qty1",data.qty);
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty1.push('0.00')
        //         } else {
        //             console.log("qty is not null",data.qty);
        //             this.state.qty1.push(data.qty)
        //         }

        //     })
        // }
        // else if (month1 == 0 && this.props.selectedDist != "ALL") {
        //     db.getDataforytd1(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2).then((data) => {
        //         console.log("sales qty2",data.qty);
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty1.push('0.00')
        //         } else {
        //             console.log("qty is not null",data.qty);
        //             this.state.qty1.push(data.qty)
        //         }
        //     })

        // }
        // else if (this.props.selectedDist == "ALL") {
        //     db.getDataforytd2(this.props.brandid, month1, this.props.ConversionFormula2).then((data) => {
        //         console.log("sales qty3",data.qty);
        //         console.log("mont1 we are passing",month1);
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty1.push('0.00')
        //         } else {
        //             console.log("qty is not null",data.qty);
        //             this.state.qty1.push(data.qty)
        //         }
        //     })
        // }
        // else {
        //     db.getDataforytd3(this.props.brandid, this.props.ConversionFormula2, month1, this.props.brandid).then((data) => {
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty1.push('0.00')
        //         } else {
        //             console.log("qty in month1",data.qty);
        //             this.state.qty1.push(data.qty)
        //         }
        //     })
        // }
        /////////////////////////qty2///////
        console.log("month22222222222")
      
       // var month2 = new Date().getMonth()
       var month2 = moment().month(new Date().getMonth() - 1).format('M')
        console.log('mont 2 : '+month2)

    await    db.getDataforytd1ByVibha(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2,month2,this.props.ControlId).then((data) => {
            //   this.state.ytds.push(data.qty)
            console.log("sales qty1",data.qty);
            if (data.qty == null || data.qty== ''||data.qty== 0) {
                            this.state.qty2.push('0.00')
                        } else {
                            this.state.qty2.push((data.qty).toFixed(this.props.NOOFDECIMAL))
                        }
        })

        // if (month2 == 0 && this.props.selectedDist == "ALL") {
        //     console.log("if1");
        //     db.getDataforytd(this.props.brandid, month2, this.props.ConversionFormula2).then((data) => {
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty2.push('0.00')
        //         } else {
        //             this.state.qty2.push(data.qty)
        //         }

        //     })
        // }
        // else if (month2 == 0 && this.state.selectedDist != "ALL") {
        //     console.log("if2");
        //     db.getDataforytd1(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2).then((data) => {
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty2.push('0.00')
        //         } else {
        //             this.state.qty2.push(data.qty)
        //         }

        //     })

        // }
        // else if (this.state.selectedDist == "ALL") {
        //     console.log("if3");
        //     db.getDataforytd2(this.props.brandid, month2, this.props.ConversionFormula2).then((data) => {
        //         console.log("mont2 we are passing",month3);
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty2.push('0.00')
        //         } else {
        //             this.state.qty2.push(data.qty)
        //         }

        //     })

        // }
        // else {
        //     console.log("mont2 we are passing",month2);
        //     db.getDataforytd3(this.props.brandid, this.props.ConversionFormula2, month2,this.props.brandid).then((data) => {
        //         console.log("if4");
               
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty2.push('0.00')
        //         } else {
        //             console.log("qty in month2",data.qty);
        //             this.state.qty2.push(data.qty)
        //         }
        //     })

        // }


        console.log("month33333333")
        //////qty3//////////
      //  var month3 = new Date().getMonth() - 1
         var month3 = moment().month(new Date().getMonth() - 2).format('M')
        console.log('mont 3 : '+month3)

      await  db.getDataforytd1ByVibha(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2,month3,this.props.ControlId).then((data) => {
            //   this.state.ytds.push(data.qty)
            console.log("sales qty1",data.qty);
            if (data.qty == null || data.qty== ''||data.qty== 0) {
                            this.state.qty3.push('0.00')
                        } else {
                            this.state.qty3.push((data.qty).toFixed(this.props.NOOFDECIMAL))
                        }
        })

        //    if (month3 == 0 && this.props.selectedDist == "ALL") {
        //     db.getDataforytd(this.props.brandid, month3, this.props.ConversionFormula2).then((data) => {
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty3.push('0.00')
        //         } else {
        //             this.state.qty3.push(data.qty)
        //         }

        //     })

        // }
        // else if (month3 == 0 && this.state.selectedDist != "ALL") {
        //     db.getDataforytd1(this.props.brandid, this.props.selectedProduct, this.props.selectedDist, this.props.ConversionFormula2).then((data) => {
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty3.push('0.00')
        //         } else {
        //             this.state.qty3.push(data.qty)
        //         }
        //     })

        // }
        // else if (this.state.selectedDist == "ALL") {
        //     db.getDataforytd2(this.props.brandid, month3, this.props.ConversionFormula2).then((data) => {
        //         console.log("mont3 we are passing",month3);
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty3.push('0.00')
        //         } else {
        //             this.state.qty3.push(data.qty)
        //         }
        //     })

        // }
        // else {
        //     db.getDataforytd3(this.props.brandid, this.props.ConversionFormula2, month3,this.props.brandid ).then((data) => {
        //         if (data.qty == null || data.qty== ''||data.qty== 0) {
        //             this.state.qty3.push('0.00')
        //         } else {
        //             console.log("qty in month3",data.qty);
        //             this.state.qty3.push(data.qty)
        //         }
        //     })


        // }
        console.log('qty 3 render : '+this.state.qty3)


        /////////////////end./////////////////

        setTimeout(
            () => { this.setState({ a: 'uighih' }) },
            3000
        )


    }

    _renderYTDView = () => {

        return this.state.ytds.map((info, index) => {
            ////console.log("info::",this.state.InfoString[2])
            return (
                <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{info}</Text>
            )
        })
    }
    _renderQTY1View = () => {

        return this.state.qty1.map((info, index) => {
            ////console.log("info::",this.state.InfoString[2])
            return (
                <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{info}</Text>
            )
        })
    }
    _renderQTY2View = () => {

        return this.state.qty2.map((info, index) => {
            ////console.log("info::",this.state.InfoString[2])
            return (
                <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{info}</Text>
            )
        })
    }

    _renderQTY3View = () => {

        
        return this.state.qty3.map((info, index) => {
            ////console.log("info::",this.state.InfoString[2])
            return (
                <Text style={{ color: '#362828', fontSize: 15, fontFamily: 'Proxima Nova' }}>{info}</Text>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: hp('-6') }}>
                <View style={styles.invDetDashContainer}>
                    <Dash style={styles.invDetDashStyle}
                        dashLength={2}
                        dashColor='#E6DFDF'
                    />
                </View>
                <View style={{ flex: 2, marginLeft: wp('4'), marginTop: wp('3'), flexDirection: 'row', }}>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: "flex-start" }}>
                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>{this.props.currentMonth}</Text>
                        {this._renderQTY1View()}

                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>{this.props.prev1Month}</Text>
                        {this._renderQTY2View()}

                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>{this.props.prev2Month}</Text>
                        {this._renderQTY3View()}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ color: '#221818', fontSize: 10, fontFamily: 'Proxima Nova', fontWeight: 'bold' }}>YTD</Text>
                        {this._renderYTDView()}




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