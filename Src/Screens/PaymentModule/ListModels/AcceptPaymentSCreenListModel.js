import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Dash from 'react-native-dash';
import Card from '../Components/Card';
import Dimen from '../utils/Dimen';
import Colors from '../utils/Colors';
import moment from 'moment';


let array = [];
let data = [];



export default function AcceptPaymentSCreenListModel(props) {
    let item = props.item.item;

    const [text, setText] = React.useState('');
    const [id, setId] = React.useState(null);

    const togle = () => {
        if (props.Amount === 0) {
            props.ShowSteps(false);
        } else {
            props.ShowSteps(true);
        }
    };

    function sumArray(array) {
        for (
            var
            index = 0,              // The iterator
            length = array.length,  // Cache the array length
            sum = 0;                // The total amount
            index < length;         // The "for"-loop condition
            sum += array[index++]   // Add number on each iteration
        );
        return sum;
    }


    return (
        // <Card>
        <View
            style={{
                borderRadius: 8,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#E6DFDF',
                marginBottom: 15,
                borderWidth: 1,
            }}>
            <View style={styles.HeadingConatiner}>
                <Text style={styles.ShopnameText}>{item.order_id}</Text>
                <Text style={styles.AreaTextStyle}>
                    {moment(item.Current_date_time).format('DD-MMM-YYYY')}
                </Text>
            </View>
            {/* <Dash dashLength={2} dashColor="#ADA2A2" /> */}

            <TextInput
                editable={false}
                style={{
                    padding: -5,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: Colors.BorderColor,
                    margin: 0,
                }}
                multiline={false}>
                ----------------------------------------------------------------------------
      </TextInput>

            <View style={styles.SubHeaadingContainer}>
                <View>
                    <Text style={styles.SubHeadingStyle}>INVOICE AMOUNT</Text>
                    <Text style={styles.Text2Style}>{item.Amount}</Text>
                </View>
                <View>
                    <Text style={styles.SubHeadingStyle}>DUE PAYMENT</Text>
                    <Text style={styles.DuePaymentTextStyle}>{item.Amount}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.SubHeadingStyle}>AMOUNT TO BE PAID</Text>
                    <View>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                height: 30,
                                width: 120,
                                marginTop: 5,
                                borderRadius: 5,
                                padding: 0,
                                paddingLeft: 10,
                                color: Colors.Black,
                                borderColor: Colors.Black,
                                fontFamily: 'Proxima Nova',
                            }}
                            keyboardType="numeric"
                            onChangeText={value => {
                                togle();
                                if (value === "") {
                                    array.splice(props.item.index, 1, 0);
                                } else {
                                    array.splice(props.item.index, 1, parseInt(value));
                                }
                                data.splice(props.item.index, 1, item);
                                if (value === "") {
                                    data = data.filter(v => v !== item);
                                }
                                props.GetItemDetail(data, sumArray(array))
                            }}
                        />

                    </View>
                </View>
            </View>
        </View>
        // </Card>

    );
}

const styles = StyleSheet.create({
    MainConatiner: {
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
    },
    HeadingConatiner: {
        height: 40,
        //backgroundColor: Colors.TexthintColor2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    AreaTextStyle: {
        marginRight: 15,
        fontSize: Dimen.FontSizeVerySmall,
        //fontWeight: 'bold',
        color: Colors.TexthintColor,
        fontFamily: 'Proxima Nova',
    },
    OrderAndAmountContainer: { marginLeft: 50 },
    SubHeadingStyle: {
        color: Colors.TexthintColor,
        //fontWeight: 'bold',
        fontSize: Dimen.FontSizeVerySmall,
        fontFamily: 'Proxima Nova',
    },
    Text2Style: {
        marginTop: 10,
        color: Colors.TexthintColor,
        fontFamily: 'Proxima Nova',
    },
    DuePaymentTextStyle: {
        marginTop: 10,
        color: Colors.Orange,
        fontFamily: 'Proxima Nova',
    },
    Line: {
        borderWidth: 0.5,
        borderColor: Colors.TexthintColor2,
        marginLeft: 5,
        marginRight: 5,
    },
    SubHeaadingContainer: {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
    },
    LastRowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    InProgressButtonContainer: {
        height: 30,
        width: 90,
        marginTop: 10,
        backgroundColor: Colors.ButtonColor,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ShopnameText: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: Colors.TextColor2,
    },
    LINESTYLE: {
        borderColor: Colors.Black,
        borderWidth: 1,
    },
    ////////////////////////////////////////
});

// let borderColor =
//   id === item.id && props.Amount !== '' ? Colors.LightGreen : Colors.White;
// let textinputborder =
//   id === item.id && props.Amount !== '' ? Colors.LightGreen : Colors.Black;

//setId(item.id);
