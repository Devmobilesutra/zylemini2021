import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableHighlight, Dimensions, FlatList, BackHandler, AsyncStorage, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import Dash from 'react-native-dash';
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import PureChart from 'react-native-pure-chart';
import Database from './../../utility/Database'
const db = new Database();
import Communications from 'react-native-communications';
import { color } from 'react-native-reanimated';

const entity = [{
    value: 'Retailer',
    id: 1
}, {
    value: 'Distributor',
    id: 2
},];
let sampleData = [
    {
        seriesName: 'Target',
        data: [
            { x: 'May', y: 30 },
            { x: 'June', y: 200 },
            { x: 'July', y: 170 }

        ],
        color: '#863131'
    },
    {
        seriesName: 'Achieved',
        data: [
            { x: 'May', y: 300 },
            { x: 'June', y: 100 },
            { x: 'July', y: 140 }
        ],
        color: '#46BE50'
    }
]
export default class TargetVsAchevementTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const { state } = navigation

        return {
            title: 'Target Vs Achievements',
            color: 'white',
            headerStyle: {
                backgroundColor: '#221818'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff', marginLeft: wp('-2'), fontSize: 18,fontWeight:'bold'  
            },
            headerRight: (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>


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
        return (
            <Dropdown
                containerStyle={styles.dropDownContainer}
                animationDuration={0}
                rippleCentered={true}
                itemColor='#ADA2A2'
                pickerStyle={{ width: wp('87.3') }}
                rippleOpacity={0}
                //  onSelect = {(index,value)=>{this.onClickDropDown(index,value)}}
                fontSize={11}
                placeholder="Select"
                dropdownPosition={-3.6}
                dropdownOffset={{ top: 20, left: 18, }}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={entity}
                onChangeText={(value) => { this.onChangeHandlerEntity(value) }}
            />
        )
    }

    onChangeHandlerEntity = (value) => {



    }
    setModalVisible = (bools) => {

        this.setState({ modalVisible: bools })
    }


    ButtonClickCheckFunction = () => {

        this.setModalVisible(true)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex:1,resizeMode: 'cover', justifyContent: 'center', }}
                >
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
                                        {this._renderEntity()}
                                    </View>

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>DISTRIBUTORS</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={styles.textDropdownContainer}>
                                        <Text style={styles.headingTitleText}>UNIT OF MEASUREMENT</Text>
                                        {this._renderEntity()}
                                    </View>

                                    <View style={{
                                        width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute',
                                        bottom: 50
                                    }}>
                                        <TouchableHighlight
                                            style={styles.openButton}
                                            onPress={() => {
                                                this.setModalVisible(false)
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

                    <View style={{ flex: 2, backgroundColor: '#221818', flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row', margin: hp('1'), alignItems: 'flex-start', justifyContent: 'center' }}>

                            <View style={{ width: hp('5.2'), height: hp('2'), marginTop: hp('0.5'), marginRight: hp('2'), borderRadius: 8, overflow: "hidden", borderWidth: 3, borderColor: "#863131", backgroundColor: '#863131' }}></View>
                            <Text style={{ color: 'white', marginRight: hp('9') }}>Target</Text>

                            <View style={{ width: hp('5.2'), height: hp('2'), marginTop: hp('0.5'), marginRight: hp('2'), borderRadius: 8, overflow: "hidden", borderWidth: 3, borderColor: "#46BE50", backgroundColor: '#46BE50' }}></View>
                            <Text style={{ color: 'white' }}>Achieved</Text>

                        </View>
                        <View style={{ flex: 9 }}>
                            <PureChart
                                type="bar"
                                data={sampleData}
                                defaultColumnWidth={70}
                                width='100%'
                                defaultColumnMargin={40}
                                height={200}

                                numberOfYAxisGuideLine={10}
                                backgroundColor={'#221818'}
                                // xAxisColor={'red'}
                                // yAxisColor={'red'}
                                labelColor={'white'}

                                color={'red'}

                                showEvenNumberXaxisLabel={false}
                            // style={{ borderColor: 'grey', borderWidth: 6, width: 100 }}
                            />
                        </View>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >

                        {/*Total Shops  */}
                        <View style={styles.totalShopsMainContainer1}>
                            <View style={styles.totalShopsMainContainer}>
                                <View style={styles.totalShopColContainer}>
                                    <Text style={styles.totalShopCountTextStyle}>
                                        Top Achievement Ratio
                    </Text>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={styles.totalShopHeadingTextStyle}>
                                            80%
                                </Text>
                                        <View style={styles.TriangleShapeCSS1head} />
                                    </View>


                                </View>

                                {/* Filter Icon */}
                             
                                    <View style={styles.shopVisitedColContainer}>
                                        <Text style={styles.totalShopCountTextStyle}>
                                            Average Rate
                    </Text>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={styles.totalShopHeadingTextStyle1}>
                                                +52%
                    </Text>
                                            <View style={styles.TriangleShapeCSShead} />
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
                            <View style={{ flex: 0.5, flexDirection: 'row' }}>
                                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: hp('2') }}>
                                    <Text style={{ color: '#362828', fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                                        Month
                    </Text>
                                    <Text style={styles.shopVisitedCountTextContainer}>
                                        (as On 31 Apr)
                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('0') }}>
                                    <Text style={{ flex: 1, marginLeft: hp('5'), color: '#362828', fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                                        Top Achievement Ratio
                    </Text>
                                    <Text style={{ flex: 1, color: '#362828', marginRight: hp('-10'), fontSize: 10, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                                        % Change
                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 2 }}>
                                <View style={styles.dashLineContainer}>
                                    <Dash style={styles.dashLineStyle}
                                        dashLength={2}
                                        dashColor='#ADA2A2'
                                    />
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column', marginTop: hp('1') }}>

                                    <View style={{ flex: 2, flexDirection: 'row' }}>
                                        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: hp('2') }}>
                                            <Text style={{ color: '#362828', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                                                20'July
                                 </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                                <Text style={{ color: '#2FC36E', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', marginRight: hp('2') }}>
                                                    +10%
                                </Text>
                                                {/* <Text style={{ color: '#2FC36E', fontSize: RFValue(13), fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}> */}
                                                <View style={styles.TriangleShapeCSS} />
                                                {/* </Text> */}
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                                <Text style={{ color: '#2FC36E', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', marginRight: hp('2') }}>
                                                    +10%
                                </Text>

                                                <View style={styles.TriangleShapeCSS} />

                                            </View>
                                        </View>
                                    </View>


                                    <View style={{ flex: 2, flexDirection: 'row', marginTop: hp('1') }}>
                                        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: hp('2') }}>
                                            <Text style={{ color: '#362828', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                                                20'July
                                 </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                                <Text style={{ color: '#E23333', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', marginRight: hp('1') }}>
                                                    +10%
                                </Text>
                                                <View style={styles.TriangleShapeCSS1} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                                <Text style={{ color: '#E23333', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', marginRight: hp('1') }}>
                                                    +10%
                                </Text>
                                                <View style={styles.TriangleShapeCSS1} />
                                            </View>
                                        </View>
                                    </View>


                                    <View style={{ flex: 2, flexDirection: 'row', marginTop: hp('1') }}>
                                        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: hp('2') }}>
                                            <Text style={{ color: '#362828', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                                                20'July
                                 </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                                <Text style={{ color: '#2FC36E', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', marginRight: hp('2') }}>
                                                    +10%
                                </Text>
                                                <View style={styles.TriangleShapeCSS} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: hp('1') }}>
                                                <Text style={{ color: '#2FC36E', fontSize: 12, fontWeight: 'bold', fontFamily: 'Proxima Nova', fontWeight: 'bold', marginRight: hp('2') }}>
                                                    +10%
                                </Text>
                                                <View style={styles.TriangleShapeCSS} />
                                            </View>
                                        </View>
                                    </View>


                                </View>
                                <View style={styles.dashLineContainer}>
                                    <Dash style={styles.dashLineStyle}
                                        dashLength={2}
                                        dashColor='#ADA2A2'
                                    />
                                </View>
                            </View>
                        </View>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    totalShopsMainContainer1: {
        flex: 1,
        flexDirection: 'column',
        marginTop: hp('1')

    },
    totalShopsMainContainer: {
        flex: 1,
        flexDirection: 'row',

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
        fontFamily: 'Proxima Nova',
    },

    totalShopHeadingTextStyle: {
        color: '#E23333',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova',
        marginLeft: hp('-3'),
    },
      totalShopHeadingTextStyle1: {
        color: '#2FC36E',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: hp('0.5'),
        fontFamily: 'Proxima Nova',
        marginLeft: hp('-2'),
    },

    shopVisitedColContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
    },

    shopVisitedCountTextContainer: {
        color: '#362828',
        fontSize: 10,
fontWeight:'bold',
        fontFamily: 'Proxima Nova',

    },
    shopVisitedCountTextContainer: {
        color: '#362828',
        fontSize: 10,

        fontFamily: 'Proxima Nova',

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
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 15,
        borderStyle: 'solid',

        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#2FC36E'
    },
    TriangleShapeCSS1: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 15,
        borderStyle: 'solid',
        marginTop: hp('0'),
        marginLeft: hp('1'),
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#E23333'
    },
    TriangleShapeCSShead: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 15,
        borderStyle: 'solid',
        marginLeft: hp('1'), marginTop: hp('1'),
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#2FC36E'
    },
    TriangleShapeCSS1head: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 15,
        borderStyle: 'solid',
        marginTop: hp('1'),
        marginLeft: hp('1'),
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#E23333'
    }
})