import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux'
export default class AddQuantityPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: '', };
    }
    render() {
        return (
            <View >
                <Button
                    title="Show Dialog" 
                    onPress={() => {
                    this.setState({ visible: true });
                    }}
                />
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                    this.setState({ visible: false });
                    }}
                >
                    <DialogContent>
                   <Text>Hiii</Text>
                    </DialogContent>
                </Dialog>
                </View>
            
        );
    }
}

