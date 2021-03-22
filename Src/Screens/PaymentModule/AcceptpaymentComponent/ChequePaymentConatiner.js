import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    Alert,
    TouchableOpacity,
} from 'react-native';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
    DialogTitle,
} from 'react-native-popup-dialog';
import CalendarPicker from 'react-native-calendar-picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import moment from 'moment';
import Dash from 'react-native-dash';
import Colors from '../utils/Colors';
import Dimen from '../utils/Dimen';

var newDate;

export default function ChequePaymentConatiner(props) {
    const [visiblecal1, setVisiblecal1] = useState(false);
    const [date, setDate] = useState('');

    useEffect(() => {
        // var date = new Date().getDate();
        // var month = new Date().getMonth() + 1;
        // var year = new Date().getFullYear();
        // //datess = year + '-' + month + '-' + date;
        newDate = moment().format('DD-MMM-YYYY');

        console.log('DATA:: ===================', newDate);
        setDate(newDate);
    }, []);

    const onDateChange1 = dates => {
        var d = new Date(dates);
        var maxDate = moment(d)
            .utc()
            .format('DD-MMM-YYYY');

        setDate(maxDate);
    };

    let DATA = props.PickedAndClickedImage;

    const ListModel = props => {
        let item = props.item.item.url;
        let uri = item.uri;

        return (
            <View
                style={{
                    height: 100,
                    width: 130,
                    borderWidth: 1,
                    borderColor: Colors.BorderColor2,
                    borderRadius: 5,
                    overflow: 'hidden',
                    marginRight: 10,
                }}>
                <Image
                    style={{ height: 100, width: 130, resizeMode: 'stretch' }}
                    source={{ uri: uri }}
                />
            </View>
        );
    };
    const minDate1 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const maxDate1 = new Date(Date.now()); // Max date

    return (
        <View style={styles.MainConatainer}>
            <View style={styles.FirstRow}>
                <View style={styles.CashHeadingConatainer}>
                    <View style={styles.HeadingNumberConatainer}>
                        <Text style={{ color: Colors.White }}>2</Text>
                    </View>
                    <Text style={{ marginLeft: 10 }}>CHEQUE</Text>
                </View>
                <View style={styles.PlaceholdeContiner}>
                    <TextInput placeholder="Enter Amount" />
                </View>
            </View>

            <View style={styles.CheckDateAndChequeNumaberConatiner}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Text style={styles.ChequeNoText}>CHEQUE NO</Text>
                    <View style={styles.CheckNoTextInput}>
                        <TextInput placeholder="Type here" />
                    </View>
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                        style={{
                            fontSize: Dimen.FontSizeSmall,
                            color: Colors.TexthintColor2,
                        }}>
                        CHEQUE DATE
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setVisiblecal1(true);
                        }}>
                        <View style={styles.CheckDateTextinput}>
                            <TextInput style={{ flex: 1 }} placeholder="Date" editable={false}>
                                {date}
                            </TextInput>

                            <Image
                                style={{ height: 20, width: 20, alignSelf: 'center' }}
                                source={require('../Assets/Images/calander.png')}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={styles.ChequeNoText}>BANK NAME</Text>
                <View style={styles.CheckNoTextInput}>
                    <TextInput placeholder="Type here" />
                </View>
            </View>

            <Text style={styles.AddChequephotoText}>ADD CHEQUE PHOTO</Text>

            <View style={styles.AddButtonAndFlatlistConatainer}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        props.PickImageForCheck();
                    }}>
                    <View style={styles.AddbuttonView}>
                        <Image
                            style={{ height: 40, width: 40 }}
                            source={require('../Assets/Images/add_button.png')}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <FlatList
                    style={{ marginLeft: 10 }}
                    horizontal={true}
                    data={DATA}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => <ListModel item={item} />}
                />
            </View>
            {/* /////////////////// */}

            <Dialog
                visible={visiblecal1}
                onTouchOutside={() => {
                    setVisiblecal1(false);
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
                                setVisiblecal1(false);
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
                            onDateChange1(date);
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Dash style={{ marginTop: 25 }} dashLength={2} dashColor="#ADA2A2" />
        </View>
    );
}

const styles = StyleSheet.create({
    MainConatainer: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    FirstRow: {
        height: 50,
        flexDirection: 'row',
    },
    CashHeadingConatainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    HeadingNumberConatainer: {
        height: 35,
        width: 35,
        borderRadius: 18,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PlaceholdeContiner: {
        flex: 1,
        backgroundColor: Colors.White,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.BorderColor2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    AddButtonAndFlatlistConatainer: {
        height: 100,
        marginTop: 10,
        flexDirection: 'row',
    },
    AddbuttonView: {
        height: 100,
        width: 130,
        borderWidth: 1,
        borderColor: Colors.BorderColor2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddChequephotoText: {
        fontSize: Dimen.FontSizeSmall,
        marginTop: 5,
        color: Colors.TexthintColor2,
    },
    CheckDateAndChequeNumaberConatiner: {
        flexDirection: 'row',
        height: 70,
        marginTop: 5,
        marginBottom: 5,
    },
    ChequeNoText: {
        fontSize: Dimen.FontSizeSmall,
        color: Colors.TexthintColor2,
    },
    CheckNoTextInput: {
        flex: 1,
        backgroundColor: Colors.White,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.BorderColor2,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
    },
    CheckDateTextinput: {
        flex: 1,
        backgroundColor: Colors.White,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.BorderColor2,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        flexDirection: 'row',
    },

    ///////////////////////////////

    CalenderImgContainer: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
