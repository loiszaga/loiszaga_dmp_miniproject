import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { Colors } from '../../styles';
import { DotIndicator } from 'react-native-indicators';

export const SpinnerLoader = ({ show }) => {

    if(!show){
        return (
            <View style={styles.background}>
                <View style={styles.container}/>
            </View>
        )
    }

    return (
        <View>
            <Spinner
                visible={true}
                customIndicator = {<DotIndicator color={Colors.colorBlueLight} count={3} />}
                overlayColor={'rgba(200,200,200,0.6)'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    container: {
        backgroundColor: 'transparent',
        bottom: 0,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    }
})