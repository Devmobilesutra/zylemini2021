import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, BackHandler, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
export  class ServeyHeader extends Component {
    render() {
        return (
            <View style={styles.mainContainer1}>
                <View style={styles.mainContainer}>
                   <View style={styles.backArrowContainer}>
                        <TouchableOpacity onPress={() => Actions.AvailableSurveys()}>
                            <Image style={styles.backArrowStyle}
                                source={require('../../assets/Icons/Back_White.png')}
                            />
                        </TouchableOpacity> 
                        <Text style={styles.assetLabelStyle}> Take Survey </Text>
                    </View>
                    </View>
                   
                    <View style={styles.container}>
                        <View style={styles.companyBrandContainer}>
                            <Text style={styles.companyBrandTextStyle}>
                          {this.props.servey.CompanyName}
                     </Text>
                            <Text style={styles.publishDateStyle} >
                                Published on {this.props.servey.PublishedDate}
        </Text>
                        </View>
                        <View style={styles.timeRequiredRowContainer}>
                            <Text style={styles.timeRequiredTextStyle}>
                                Time Required: {this.props.servey.TimeRequired}
                      </Text>
                        </View>
                    </View>
                    <View/>
<View>
   
</View>
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        servey:state.servey
     
    };
  };
  const mapDispatchToProps = dispatch => ({
    
  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(ServeyHeader)

const styles = StyleSheet.create({
                    container : {
                    flex:5,
        flexDirection:'row',
        backgroundColor: '#210305'
    },

    companyBrandContainer: {
                    flex:0.7,
        flexDirection:'column',
        alignItems: 'flex-start',
        marginLeft: wp('6')
    },

    companyBrandTextStyle: {
                    color: '#796A6A',
        fontSize:RFValue(12),
        fontWeight: 'bold',
        marginTop: hp('3%'),
        fontFamily: 'Proxima Nova',
        marginLeft: wp('5%'),
    },

    publishDateStyle: {
                    color: '#796A6A',
        fontSize:RFValue(12),
        marginTop: hp('1%'),
        marginLeft: wp('5%'),
        fontFamily: 'Proxima Nova',
        marginBottom:hp('2')
    },


    timeRequiredRowContainer: {
                    flex:0.4,
        flexDirection:'row',
        alignItems: 'flex-end',
        marginLeft: wp('4'),
    },

    timeRequiredTextStyle: {
                    color: '#796A6A',
        fontSize:RFValue(12),
        marginTop: hp('1%'),
        marginRight: wp('5%'),
        fontFamily: 'Proxima Nova',
        marginBottom:hp('2') ,
    },

    blueCardMainContainer:{
                    marginTop:hp('2'),
        alignItems:'center',
    },

    blueCardInnerContainer:{
                    height:hp('100'),
        width:wp('100'),

        borderRadius:wp('2'),
    },

    surveyImgContainer:{
                    alignItems:'center',
    },

    surveyImgStyle:{
                    height:hp('12'),
        width:wp('15'),
        marginTop:hp('10'),
    },

    questionLableContainer:{
                    marginTop:hp('1'),
        marginLeft:wp('4'),
        marginRight: wp('2'),
    },

    questionLableStyle:{
                    color: 'white',
        fontSize:RFValue(15),
        fontFamily: 'Proxima Nova',
    },

    questionContainer:{
                    marginTop:hp('1'),
        marginLeft:wp('4'),
        marginRight: wp('2'),
    },

    questionStyle:{
                    color: 'white',
        fontSize:RFValue(20),
        fontWeight:'bold',
        fontFamily: 'Proxima Nova',
    },

    middleLineStyle:{
                    width:wp('70'),
        borderBottomColor: 'black',
        borderBottomWidth: wp('0.1'),
        alignSelf:'center',
        marginTop: hp('2.5')
    },
    WebViewStyle: {
                    justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 40,
      },
      ActivityIndicatorStyle: {
                    flex: 1,
        justifyContent: 'center',
      },

  mainContainer:{
                    flexDirection:'row',
    backgroundColor: '#221818',
    color: '#fff',
   paddingTop:hp('2'),
   paddingBottom:hp('2')

   
  },
  
  mainContainer1:{
    flexDirection:'column',
backgroundColor: '#221818',
color: '#fff',
height:hp('18'),

},


  backArrowContainer: {
                    flexDirection:"row",
    alignItems:'flex-start',
    flex:1,
    alignSelf:'center',
  },

  backArrowStyle:{
                    marginLeft:wp('4'),
  },

  assetLabelStyle:{
                    color: '#FFFFFF',
    fontSize:RFValue(20),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    alignSelf:'center',
    marginLeft:wp('7'),
  },

  searchIconStyle:{
                    marginRight:hp('2'),
    marginBottom:hp('0.5'), 
    height:hp('4'), 
    width:wp('6'),
    alignSelf:'center',
  },


});