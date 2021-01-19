import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Router, Scene, Stack, Drawer, Tabs, Lightbox } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

import Info from './Info';
import Orders from './Orders';
import Payments from './Payments';
import Assets from './Assets';
import Surveys from './Surveys';
import Schemes from './Schemes';


export default class TabBar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  };
    // }

    static navigationOptions = {

     headerLeft: (
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.Shops() }>  
                <Image  style={{marginLeft:wp('4'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
            
        </View>
     )       
}

    render() {
        return (
            // <View>
        <Router>
         {/* <Lightbox> */}
            {/* <Stack key="Tabbar"  panHandlers={null} > */}
              {/* <Stack> */}
             <Scene key='TabBar' tabs={true} tabBarStyle={styles.tabBar} default='Main'  
                            swipeEnabled
                            scrollEnabled
                            showLabel={true}
                            tabBarPosition='top'
                            tabStyle={{width:wp('21.1')}}
                            labelStyle={{ fontFamily:'Proxima Nova',width:wp(15), height:hp('3'),}}
                            indicatorStyle={{ backgroundColor: '#CC1167', height:hp('0.8') }}
                            activeBackgroundColor="white"
                            //navBar={MediaNavBar}
                            // lazy
                            headerMode="screen"
                            wrap={false}
                            hideNavBar={true}
                           
             >
             {/* <Stack> */}
            <Scene key='Info' initial={true} component={Info} title='INFO' onBack={()=>{Actions.Shops()}} back={true}  />
            <Scene key='Orders' component={Orders}  title='ORDERS'   onBack={()=>{Actions.Shops()}} back={true} />
            <Scene key='Payments' component={Payments}  title='PAYMENTS'  onBack={()=>{Actions.Shops()}} back={true} />
            <Scene key='Assets' component={Assets}  title='ASSETS' onBack={()=>{Actions.Shops()}} back={true}  />
            <Scene key='Surveys' component={Surveys}  title='SURVEYS'  onBack={()=>{Actions.Shops()}} back={true} />
            <Scene key='Schemes' component={Schemes}  title='SCHEMES' onBack={()=>{Actions.Shops()}} back={true} />
             {/* </Stack> */}
            </Scene>
            
            {/* </Stack> */}
             {/* </Lightbox> */}
               </Router>
            //   </View>
        // <View>
        // <Text>Hii</Text>
        // </View>
        );
    }
}


const styles = StyleSheet.create({
tabBar: {
height: 50,
backgroundColor: '#221818',
// borderTopColor: 'darkgrey',
borderTopWidth: 1,
opacity: 0.98,
// justifyContent:'space-between'
}
});