import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../utils/Colors';

export default function OrdersAndFilter(props) {
    return (
        <View style={{ height: 80, flexDirection: 'row' }}>
            <View style={styles.AmountContainer}>
                <Text style={styles.AmountTextStyle}>{props.outStandingOredr}</Text>
                <Text style={styles.OutStandingHint}>Outstandingorder</Text>
            </View>

            <View style={styles.AmountContainer2}>
                <Text style={styles.AmountTextStyle}>
                    {props.TotalOutStandingAmount}
                </Text>

                <Text style={styles.OutStandingHint}>
                    Total Outstandingorder (In INR)
        </Text>
            </View>
            <View
                style={{
                    flex: 0.4,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => {
                    props.VisibleDilog();
                }}>
                    <Image
                        style={{ height: 30, width: 30, marginBottom: 30 }}
                        source={require('../Assets/Images/filter_list_icon.png')}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    AmountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    AmountContainer2: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    AmountTextStyle: {
        color: Colors.PinkCoor,
        //fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Proxima Nova',
    },
    OutStandingHint: {
        color: Colors.TexthintColor2,
        //fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13,
        fontFamily: 'Proxima Nova',
    },
});
