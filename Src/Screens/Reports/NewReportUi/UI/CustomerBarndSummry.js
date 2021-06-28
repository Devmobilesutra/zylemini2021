
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    Image, TouchableOpacity, ImageBackground, FlatList, BackHandler, AsyncStorage,
    TouchableWithoutFeedback, TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Database from '../../../../utility/Database'
const db = new Database();
import { Searchbar } from 'react-native-paper';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
    DialogTitle,
} from 'react-native-popup-dialog';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { FloatingAction } from 'react-native-floating-action';
import { Platform } from 'react-native';

var newDate;
const minDate1 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
const maxDate1 = new Date(Date.now());



export default class CustomerBarndSummry extends Component {
    state = {
        Cust_array: [],
        entity_id: '',
        visibaleCallOne: false,
        date: ""
    }

    // @refresh reset
    static navigationOptions = {
        title: 'Customer Barnd Summary',
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
                    <Image style={{ marginLeft: wp('4'), }}
                        source={require('../../../../assets/Icons/Back_White.png')}
                    />
                </TouchableOpacity>
                <Image style={{ marginLeft: wp('2'), }}
                    source={require('../../../../assets/Icons/Shop.png')}
                />
            </View>
        ),
    }
    componentDidMount() {
        this.GetAllData();
        newDate = moment().format('DD-MMM-YYYY');
        this.setState({ data: newDate });
    }




    GetAllData() {
        db.getDataForActivity().then((data) => {

            console.log("data for activity", data);

            for (var i = 0; i < data.length; i++) {
                if (data[i].entity_type = 1) {

                    console.log("entity id getttt", this.state.entity_id);
                    db.getdatafromcust(data[i].entity_id).then((data) => {
                        this.setState({
                            Cust_array: this.state.Cust_array.concat(data),

                        })
                        console.log("data for display", this.state.Cust_array)
                    })
                }
                else if (data[i].entity_type = 0) {

                    db.getdatafromdist(data[i].entity_id).then((data) => {
                        this.setState({
                            Cust_array: this.state.Cust_array.concat(data)
                        })
                        console.log("data for display", this.state.Cust_array);

                    })
                }
            }


        })
    }
    renderParty() {
        return (
            this.state.Cust_array.map((item, index) => (
                <TouchableOpacity onPress={() => Actions.Activities({ Party: item.Party, entity_id: item.CustomerId })}>
                    <View style={styles.collapseHeaderStyle}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.imageStyles}
                                source={require('../../../../assets/Icons/shopImg.png')} />
                        </View>
                        <View style={styles.shopDetailsContainer} >

                            <Text style={styles.shopNameTextStyle}>
                                {item.Party}
                            </Text>
                            <Text style={styles.shopAddressTextStyle}>
                                {item.AREA}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )))

    }


    onDateChange1(dates) {
        var d = new Date(dates);
        var maxDate = moment(d).utc().format('DD-MMM-YYYY');

        //setDate(maxDate);
    };
    render() {


        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../../assets/Icons/android_BG.png')}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.headerMainContainer} >
                            <Searchbar
                                style={styles.searchbarContainerStyle}
                                placeholder="Search Outlet"
                                theme={false}
                                icon={false}
                            // value={this.state.search}
                            // onChangeText={input => {
                            //     this.setState({ search: input });
                            //     this.SearchFilterFunction(input)
                            // }
                            //  }
                            />

                            <View style={{ paddingVertical: 5, paddingHorizontal: 22 }}>
                                <Text
                                    style={{
                                        fontSize: Dimen.FontSizeSmall,
                                        color: "white",
                                    }}>
                                    SELECT DATE RANGE
                                </Text>
                                <View style={{ flex: 1, flexDirection: 'row', }}>

                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            //setVisiblecal1(true);
                                            this.setState({ visibaleCallOne: true })
                                        }}>
                                        <View style={styles.CheckDateTextinput}>
                                            <TextInput style={{ flex: 1 }} placeholder="Date" editable={false}>
                                                From
                                            </TextInput>

                                            <Image
                                                style={{ height: 20, width: 20, alignSelf: 'center' }}
                                                source={require('../../../../assets/Icons/Calendar_normal.png')}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ width: 10 }} />
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            //setVisiblecal1(true);
                                            this.setState({ visibaleCallOne: true })
                                        }}>
                                        <View style={styles.CheckDateTextinput}>
                                            <TextInput style={{ flex: 1 }} placeholder="Date" editable={false}>
                                                To
                                            </TextInput>

                                            <Image
                                                style={{ height: 20, width: 20, alignSelf: 'center' }}
                                                source={require('../../../../assets/Icons/Calendar_normal.png')}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>

                        </View>

                        <View style={styles.searchResultContainer}>
                            <Text style={styles.searchResultTextStyle} >
                                Recent Outlets
                            </Text>
                        </View>
                        {this.renderParty()}
                        <Dialog
                            visible={this.state.visibaleCallOne}
                            onTouchOutside={() => {
                                this.setState({ visibaleCallOne: false })
                            }}
                            previousTitle="<"
                            previousTitleStyle={{ color: '#fff' }}
                            nextTitle=">"
                            nextTitleStyle={{ color: '#f00' }}
                            width={wp('93')}
                            overlayBackgroundColor={'false'}
                            dialogTitle={
                                <DialogTitle
                                    title="Calander"
                                    style={{ backgroundColor: '#46BE50' }}
                                    textStyle={{ color: 'white' }}
                                />
                            }
                            footer={
                                <DialogFooter>
                                    <DialogButton
                                        text="OK"
                                        textStyle={{ color: 'white' }}
                                        style={{ backgroundColor: '#46BE50' }}
                                        onPress={() => {
                                            this.setState({ visibaleCallOne: false })
                                        }}
                                    />
                                </DialogFooter>
                            }>
                            <DialogContent>
                                <CalendarPicker
                                    previousTitle="Previous"
                                    nextTitle="Next"
                                    todayBackgroundColor="#e6ffe6"
                                    selectedDayColor="#66ff33"
                                    selectedDayTextColor="#000000"
                                    scaleFactor={375}
                                    textStyle={{
                                        fontFamily: 'Cochin',
                                        color: '#000000',
                                        fontSize: 12,
                                    }}
                                    startFromMonday={true}
                                    minDate={minDate1}
                                    //maxDate={maxDate1}
                                    onDateChange={date => {
                                        this.onDateChange1(date);
                                    }}
                                />
                            </DialogContent>
                        </Dialog>


                    </ScrollView>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            Actions.AdvanceFilter();
                        }}
                    >
                        <View style={{
                            position: "absolute",
                            height: 70,
                            width: 70,
                            borderRadius: 35,
                            backgroundColor: '#e75480',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bottom: "5%",
                            right: "10%",
                        }}></View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
        )


    }
}



const styles = StyleSheet.create({
    headerMainContainer: {
        backgroundColor: '#221818',
        paddingVertical: 10
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
        //marginTop: hp('1'),
        //marginBottom: hp('2'),
        alignSelf: 'center',
        elevation: 0,
        fontSize: 12
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
        color: '#8C7878',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        // fontSize: RFValue(11),
        fontSize: 12
    },

    searchResultsResulContainer: {
        flex: 1,
        marginTop: wp('4')
    },
    imageContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },

    imageStyles: {
        marginLeft: wp('5'),
        height: hp('8'),
        width: wp('16'),
    },

    shopDetailsContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: hp('-3'),
        marginLeft: wp('4'),
    },

    shopNameTextStyle: {
        color: '#796A6A',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        // fontSize:wp('4'),
        marginTop: hp('3'),
        fontSize: 14
    },

    shopAddressTextStyle: {
        color: '#796A6A',
        fontFamily: 'Proxima Nova',
        // fontSize:wp('3'),
        fontSize: 10,
        marginVertical: wp('3.1'),
    },
    collapseHeaderStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6DFDF',
        borderRadius: wp('2'),
        height: hp('13'),
        width: wp('90'),
        borderWidth: hp('0.2'),
        marginHorizontal: wp('4'),
        marginTop: hp('1.5')
    },
    CheckDateTextinput: {
        flex: 1,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        flexDirection: 'row',
    },

})