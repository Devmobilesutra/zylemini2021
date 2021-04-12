import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function DilogFilter(props) {
    return (
        < View >
            <Dialog

                visible={props.ShowDilog}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                onTouchOutside={() => {
                    console.log("HIDE:: ")

                    props.HideDilog();
                }}
                width={wp('100')}
                height={hp('63')}
                dialogStyle={{
                    marginTop: hp('45'), borderTopRightRadius: wp('0'),
                    borderTopLeftRadius: wp('0'),
                }}
            >
                <DialogContent>
                    {/* HEADER FILTER by view */}
                    <View style={{
                        backgroundColor: '#F8F4F4', height: hp('10'),
                        width: wp('104'), flexDirection: 'row',
                        marginLeft: wp('-4'), alignItems: 'center',
                    }}>
                        <Text style={{
                            flexDirection: 'column', alignItems: 'flex-start',
                            color: '#8C7878', fontWeight: 'bold',
                            fontFamily: 'Proxima Nova', flex: 1,
                            fontSize: RFValue(13), marginLeft: wp('6'),
                        }}>
                            Filter by
                                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end', marginRight: wp('8')
                        }}>
                            <Text style={{
                                marginRight: wp('5'), alignSelf: 'center',
                                color: '#ADA2A2', fontWeight: 'bold',
                                fontFamily: 'Proxima Nova',
                                fontSize: RFValue(13),
                            }}>
                                CLEAR
                                            </Text>
                            <Image source={require('../../../assets/Icons/filter_list_shop.png')}
                                style={{ height: hp('4'), alignSelf: 'center', }}>
                            </Image>
                        </View>
                    </View>
                    {/* Recent */}
                    <View style={{ marginTop: hp('3.5'), marginLeft: wp('2') }}>
                        <Text style={{
                            color: '#362828',
                            fontFamily: 'Proxima Nova', fontSize: RFValue(13),
                        }}>
                            Recent
                                        </Text>
                    </View>
                    {/* Month */}
                    <View style={{
                        marginTop: hp('4'), flexDirection: 'row', alignItems: 'center',
                        marginLeft: wp('2')
                    }}>
                        <Text style={{
                            color: '#362828',
                            fontFamily: 'Proxima Nova', fontSize: RFValue(13),
                        }}>
                            Month
                                        </Text>
                        <View style={{
                            backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('7'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#FFFFFF', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                All
                                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={require('../../../assets/Icons/left_arrow.png')}
                                style={{ marginLeft: wp('3'), height: hp('4'), alignSelf: 'center', }}>
                            </Image>
                            <Text style={{
                                color: '#ADA2A2', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(13),
                                alignSelf: 'center', marginHorizontal: wp('6 '),
                            }}>
                                December
                                            </Text>
                            <Image source={require('../../../assets/Icons/right_arrow_filterCal.png')}
                                style={{ height: hp('4'), alignSelf: 'center', }}>
                            </Image>
                        </View>
                    </View>
                    {/* Year */}
                    <View style={{
                        marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
                        marginLeft: wp('2')
                    }}>
                        <Text style={{
                            color: '#362828',
                            fontFamily: 'Proxima Nova', fontSize: RFValue(13),
                        }}>
                            Year
                        </Text>

                        <View style={{
                            backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('10'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#FFFFFF', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                All
                                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Image source={require('../../../assets/Icons/left_arrow.png')}
                                style={{ marginLeft: wp('3'), height: hp('4'), alignSelf: 'center', }}>
                            </Image>
                            <Text style={{
                                color: '#ADA2A2', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(13),
                                alignSelf: 'center', marginHorizontal: wp('10'),
                            }}>
                                2019
                                            </Text>
                            <Image source={require('../../../assets/Icons/right_arrow_filterCal.png')}
                                style={{ height: hp('4'), alignSelf: 'center', }}>
                            </Image>
                        </View>
                    </View>
                    {/* Amount */}
                    <View style={{
                        marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
                        marginLeft: wp('2')
                    }}>
                        <Text style={{
                            color: '#362828',
                            fontFamily: 'Proxima Nova', fontSize: RFValue(13),
                        }}>
                            Amount
                                        </Text>
                        <TouchableOpacity onPress={() => {
                            props.HighToLow();
                        }}>
                            <View style={{
                                backgroundColor: '#FFFFFF', borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                                flexDirection: 'column', marginLeft: wp('5'),
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#796A6A', fontFamily: 'Proxima Nova',
                                    fontWeight: 'bold', fontSize: RFValue(12),
                                    alignSelf: 'center',
                                }}>
                                    High to Low
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            props.LowToHigh();
                        }}>
                            <View style={{
                                backgroundColor: '#FFFFFF', borderColor: '#796A6A',
                                borderWidth: wp('0.3'),
                                borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                                flexDirection: 'column', marginLeft: wp('2'),
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: '#796A6A', fontFamily: 'Proxima Nova',
                                    fontWeight: 'bold', fontSize: RFValue(12),
                                    alignSelf: 'center',
                                }}>
                                    Low to High
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Delivery */}
                    <View style={{
                        marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
                        marginLeft: wp('2')
                    }}>
                        <Text style={{
                            color: '#362828',
                            fontFamily: 'Proxima Nova', fontSize: RFValue(13),
                        }}>
                            Delivery
                                        </Text>
                        <View style={{
                            backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('5'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#FFFFFF', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                All
                                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: '#FFFFFF', borderColor: '#0FB4AD',
                            borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('2'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#0FB4AD', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                In Progress
                                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: '#FFFFFF', borderColor: '#2FC36E',
                            borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('2'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#2FC36E', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                Delivered
                                            </Text>
                        </View>
                    </View>
                    {/* Payment */}
                    <View style={{
                        marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
                        marginLeft: wp('2')
                    }}>
                        <Text style={{
                            color: '#362828',
                            fontFamily: 'Proxima Nova', fontSize: RFValue(13),
                        }}>
                            Payment
                                        </Text>
                        <View style={{
                            backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('4'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#FFFFFF', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                All
                                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: '#FFFFFF', borderColor: '#2FC36E',
                            borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('2'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#2FC36E', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                Paid
                                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: '#FFFFFF', borderColor: '#E23333',
                            borderWidth: wp('0.3'),
                            borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
                            flexDirection: 'column', marginLeft: wp('2'),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#E23333', fontFamily: 'Proxima Nova',
                                fontWeight: 'bold', fontSize: RFValue(12),
                                alignSelf: 'center',
                            }}>
                                Outstanding
                                            </Text>
                        </View>
                    </View>
                </DialogContent>
            </Dialog>
        </View >
    )
}

const styles = StyleSheet.create({})







//     < Modal visible = { true} transparent = { true} >
//         <View style={{
//             backgroundColor: '#F8F4F4',
//             height: hp('10'),
//             width: wp('104'),
//             flexDirection: 'row',
//             marginLeft: wp('-4'),
//             alignItems: 'center',
//         }}>
//             <Text style={{
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 color: '#8C7878',
//                 fontWeight: 'bold',
//                 fontFamily: 'Proxima Nova',
//                 flex: 1,
//                 fontSize: RFValue(13),
//                 marginLeft: wp('6'),
//             }}>
//                 Filter by
//                                         </Text>
//             <View style={{
//                 flexDirection: 'row',
//                 alignItems: 'flex-end',
//                 marginRight: wp('8')
//             }}>
//                 <Text style={{
//                     marginRight: wp('5'),
//                     alignSelf: 'center',
//                     color: '#ADA2A2',
//                     fontWeight: 'bold',
//                     fontFamily: 'Proxima Nova',
//                     fontSize: RFValue(13),
//                 }}>
//                     CLEAR
//                                             </Text>
//                 <Image source={require('../../../assets/Icons/filter_list_shop.png')}
//                     style={{ height: hp('4'), alignSelf: 'center', }}>
//                 </Image>
//             </View>
//         </View>
// {/* Recent */ }
// <View style={{ marginTop: hp('3.5'), marginLeft: wp('2') }}>
//     <Text style={{
//         color: '#362828',
//         fontFamily: 'Proxima Nova', fontSize: RFValue(13),
//     }}>
//         Recent
//                                         </Text>
// </View>
// {/* Month */ }
// <View style={{
//     marginTop: hp('4'),
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: wp('2')
// }}>
//     <Text style={{
//         color: '#362828',
//         fontFamily: 'Proxima Nova', fontSize: RFValue(13),
//     }}>
//         Month
//                                         </Text>
//     <View style={{
//         backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('7'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#FFFFFF', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             All
//                                             </Text>
//     </View>
//     <View style={{ flexDirection: 'row', }}>
//         <Image source={require('../../../assets/Icons/left_arrow.png')}
//             style={{ marginLeft: wp('3'), height: hp('4'), alignSelf: 'center', }}>
//         </Image>
//         <Text style={{
//             color: '#ADA2A2', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(13),
//             alignSelf: 'center', marginHorizontal: wp('6 '),
//         }}>
//             December
//                                             </Text>
//         <Image source={require('../../../assets/Icons/right_arrow_filterCal.png')}
//             style={{ height: hp('4'), alignSelf: 'center', }}>
//         </Image>
//     </View>
// </View>
// {/* Year */ }
// <View style={{
//     marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
//     marginLeft: wp('2')
// }}>
//     <Text style={{
//         color: '#362828',
//         fontFamily: 'Proxima Nova', fontSize: RFValue(13),
//     }}>
//         Year
//                                         </Text>
//     <View style={{
//         backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('10'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#FFFFFF', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             All
//                                             </Text>
//     </View>
//     <View style={{ flexDirection: 'row', }}>
//         <Image source={require('../../../assets/Icons/left_arrow.png')}
//             style={{ marginLeft: wp('3'), height: hp('4'), alignSelf: 'center', }}>
//         </Image>
//         <Text style={{
//             color: '#ADA2A2', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(13),
//             alignSelf: 'center', marginHorizontal: wp('10'),
//         }}>
//             2019
//                                             </Text>
//         <Image source={require('../../../assets/Icons/right_arrow_filterCal.png')}
//             style={{ height: hp('4'), alignSelf: 'center', }}>
//         </Image>
//     </View>
// </View>
// {/* Amount */ }
// <View style={{
//     marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
//     marginLeft: wp('2')
// }}>
//     <Text style={{
//         color: '#362828',
//         fontFamily: 'Proxima Nova', fontSize: RFValue(13),
//     }}>
//         Amount
//                                         </Text>
//     <View style={{
//         backgroundColor: '#FFFFFF', borderColor: '#796A6A',
//         borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('5'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#796A6A', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             High to Low
//                                             </Text>
//     </View>
//     <View style={{
//         backgroundColor: '#FFFFFF', borderColor: '#796A6A',
//         borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('2'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#796A6A', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             Low to High
//                                             </Text>
//     </View>
// </View>
// {/* Delivery */ }
// <View style={{
//     marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
//     marginLeft: wp('2')
// }}>
//     <Text style={{
//         color: '#362828',
//         fontFamily: 'Proxima Nova', fontSize: RFValue(13),
//     }}>
//         Delivery
//                                         </Text>
//     <View style={{
//         backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('5'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#FFFFFF', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             All
//                                             </Text>
//     </View>
//     <View style={{
//         backgroundColor: '#FFFFFF', borderColor: '#0FB4AD',
//         borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('2'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#0FB4AD', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             In Progress
//                                             </Text>
//     </View>
//     <View style={{
//         backgroundColor: '#FFFFFF', borderColor: '#2FC36E',
//         borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('2'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#2FC36E', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             Delivered
//                                             </Text>
//     </View>
// </View>
// {/* Payment */ }
// <View style={{
//     marginTop: hp('3'), flexDirection: 'row', alignItems: 'center',
//     marginLeft: wp('2')
// }}>
//     <Text style={{
//         color: '#362828',
//         fontFamily: 'Proxima Nova', fontSize: RFValue(13),
//     }}>
//         Payment
//                                         </Text>
//     <View style={{
//         backgroundColor: '#796A6A', borderColor: '#796A6A', borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('4'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#FFFFFF', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             All
//                                             </Text>
//     </View>
//     <View style={{
//         backgroundColor: '#FFFFFF', borderColor: '#2FC36E',
//         borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('2'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#2FC36E', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             Paid
//                                             </Text>
//     </View>
//     <View style={{
//         backgroundColor: '#FFFFFF', borderColor: '#E23333',
//         borderWidth: wp('0.3'),
//         borderRadius: wp('5.5'), height: hp('4.5'), width: wp('23'),
//         flexDirection: 'column', marginLeft: wp('2'),
//         justifyContent: 'center'
//     }}>
//         <Text style={{
//             color: '#E23333', fontFamily: 'Proxima Nova',
//             fontWeight: 'bold', fontSize: RFValue(12),
//             alignSelf: 'center',
//         }}>
//             Outstanding
//                                             </Text>
//     </View>
// </View>
//         </Modal >