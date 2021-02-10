import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default class LoaderSync extends Component {
    render(){
        const {
            loading,
            message,
            ...attributes
        } = this.props;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={loading} />
                             <Text>{message}</Text>
                    </View>
                   
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
       

    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 90,
        width: 220,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'space-around'
    }
});


// let { hasError, isLogged, isLoading } = this.props;
//         return (
//             <View style={styles.container}>
//                 <Loader loading={isLoading} />