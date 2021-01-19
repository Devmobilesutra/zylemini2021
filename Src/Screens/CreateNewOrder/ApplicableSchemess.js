import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Dash from 'react-native-dash';
import { Button } from 'react-native';
import { connect } from 'react-redux'
 


export class ApplicableSchemess extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = {
    title: 'Applocable Schemes',
     headerStyle: { backgroundColor: '#796A6A' },
    headerTintColor: '#ffffff', 
   
    }

    render() {
  
        return (
           <View style = {{ flex: 10 }}>
              <ScrollView
                 showsVerticalScrollIndicator={false}
              >
                {/* Store Name and Right Arrow */}
                 <View style = {{ flex:0.1, marginTop:hp('1'), }}>
                    <View style= {styles.brandNameContainer}>
                        <View style= {styles.brandTextContainer}>
                            <Text  style = {styles.brandNameText}>
                               BRAND NAME
                            </Text>
                        </View>

                        <View style= {styles.rightArrowContainer}>
                              <TouchableOpacity>
                                        <Image style={{ marginRight:wp('4') }} 
                                                    source = {require('../../assets/Icons/right_arrow_front.png')}/>
                              </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Dash Line Below Brand Name*/}
                <View style={styles.dashLineContainerBelowBrandName}>
                  <Dash style={styles.dashLineStyle}
                    dashLength = {2}
                    dashColor = '#ADA2A2'
                  />
                </View>

                {/* Applicable Schemes */}
                <View style={{flex:1,marginVertical: wp('4')}}>
                    <View style={{ flex:1, alignItems: 'flex-start',flexDirection: 'row',  justifyContent: 'flex-start',
                                        alignItems: 'center',}}>
                                <View style={styles.roundedtext}></View>

                                <Text style= {{marginLeft:wp('2'),fontFamily: 'Proxima Nova', fontSize: wp('3'), color:'#3955CB'}}>
                                     Applicable Schemes( 12 )
                                </Text>
                          </View>
                          <View style={{ flex:1, alignItems: 'flex-end', flexDirection:'row', justifyContent:'flex-end', alignItems: 'center',
                                            marginVertical:hp('-3')}}>
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('ApplicableSchemess')}>
                                        <Image style={{ marginRight:wp('5'), tintColor:'#3955CB' }} 
                                                    source = {require('../../assets/Icons/right_arrow.png')}/>
                                    </TouchableOpacity>
                        </View>
                </View>


                {/* Scheme Description */}
                <View style={{flex:1 ,alignItems:'flex-start', justifyContent:'center',marginVertical:hp('10'), 
                                marginLeft:wp('5'), marginRight:wp('3')}}>
                        <Text style={{ color: '#796A6A', fontSize: wp('3%'), fontFamily: 'Proxima Nova', }}>
                            Dummy Scheme Description.Dummy Scheme Description. Dummy Scheme Description.Dummy 
                            Scheme Description. Dummy Scheme Description.
                        </Text>
                </View>

                <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', justifyContent:'center',
                                marginVertical:hp('4'), marginHorizontal:wp('5')}}>
                    <Text style={{ color: '#362828', fontSize: wp('3.5%'), fontFamily: 'Proxima Nova', fontWeight: 'bold', }}>
                        Validity
                    </Text>
                    <Text style={{ color: '#796A6A', fontSize: wp('3%'), fontFamily: 'Proxima Nova', marginTop:hp('1')}}>
                         12 Feb 2020
                    </Text>
                </View>

              </ScrollView>

              <View style={{ flex:1, flexDirection:'row', }}>
                <TouchableOpacity>
                    <View style={styles.buttonOk}>
                            <Text style={styles.buttonTextOk} > OK </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateNewOrderPreview')}>
                  <View style={styles.buttonCancel}>
                        <Text style={styles.buttonTextCancel} > CANCEL </Text>
                 </View>
                 </TouchableOpacity>
              </View>



            </View>
        );
    }
}

const mapStateToProps = (state) => {
  return {
     
  };
};

const mapDispatchToProps = dispatch => ({
  
    
    
      

})
export default connect(mapStateToProps, mapDispatchToProps)(ApplicableSchemess)


const styles = StyleSheet.create({
  brandNameContainer: {
      flex:1, 
      flexDirection:'row',
  },

  brandTextContainer: {
    flex: 0.5, 
    flexDirection:'column', 
  },

  rightArrowContainer: {
    flex: 0.5, 
    flexDirection:'column', 
    alignItems:'flex-end',
  },

  brandNameText: {
      color: '#796A6A', 
      fontSize: wp('3.5%'), 
      fontWeight: 'bold', 
      marginTop: hp('3%'), 
      marginLeft: wp('6%'), 
      fontFamily: 'Proxima Nova',
  },
  
   rightArrowContainer: {
    flex: 0.5, 
    flexDirection:'column', 
    alignItems:'flex-end',
     marginTop: hp('3%'), 
     marginRight: wp('3'),
  },

    dashLineContainerBelowBrandName: {
      flex:1, 
      marginTop:hp('3'), 
      alignContent: 'center', 
      alignItems: 'center',
  },

    dashLineStyle: {
      width:wp('89'), 
      height:hp('1'), 
      color: '#ADA2A2',
  },

   roundedtext: {
      width: 25,
      height: 25, 
      flexWrap:"wrap",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25 / 2,
      backgroundColor: "#EAA304",
      borderColor: '#EAA304',
      borderWidth: 3,
      marginLeft:wp('5')
    },

    buttonOk: {
      width: wp('44'),
      height: hp('8'),
      backgroundColor: '#46BE50',
      marginVertical: hp('3'),
      paddingVertical: hp('2'),
      borderRadius: 8,
      marginHorizontal: wp('3'),

    },

     
    buttonTextOk: {
      fontSize: 14,
      color: '#ffffff',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
    },

     buttonCancel: {
      width: wp('43'),
      height: hp('8'),
      backgroundColor: '#FFFFFF',
      marginVertical: hp('3'),
      paddingVertical: hp('2'),
      borderRadius: 8,
      borderColor: '#796A6A',
      borderWidth: wp('0.3'),
      marginHorizontal: wp('3'),

    },

     
    buttonTextCancel: {
      fontSize: 14,
      color: '#796A6A',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontFamily: 'Proxima Nova',
    },

})