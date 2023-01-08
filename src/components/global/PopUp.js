import React from 'react';
import { View, ActivityIndicator, Platform, StyleSheet, Text, ToastAndroid, Alert } from 'react-native';
import Toast from 'react-native-root-toast';

import { MY_FONT_REGULAR } from '../../constants';
import { Colors, Size } from '../../styles';

/* show toast notification */ 
export const showToast = (message) => {
    if (Platform.OS == 'ios') {
        Toast.show(message, {
            duration: Toast.durations.SHORT, 
            shadow: true,
            animation: true,
            textStyle:{alignSelf:'center'}
        })
    } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}

/* show circle laoding */ 
export const showCircleLoading = (message) => {
    return(
        <View style={styles.activityIndicatorStyle}>
            {/* circle loading */}
            <ActivityIndicator
                color   = {Colors.colorBlueLight}
                size    = "large"
            />

            {/* text message when loading */}
            {(message !== undefined) &&
                <Text style={{
                    color: Colors.colorBlueLight,
                    fontFamily: MY_FONT_REGULAR,
                    fontSize: Size.scaleFont(16),
                    marginTop: Size.scaleSize(10),
                    alignSelf: 'center'
                }}>{message}</Text>
            }
        </View>
    )
}

/* custom alert with default style */
export const defaultCustomAlert = ({ title, subTitle, positiveBtnText, negativeBtnText, positiveOnPress, negativeOnPress }) => {
    Alert.alert(title, subTitle,
        [
            {
                text: negativeBtnText,
                onPress: negativeOnPress,
                // style: "cancel"
            },
            {   text: positiveBtnText, 
                onPress: positiveOnPress 
            }
        ]
    );
}

const styles = StyleSheet.create({
    activityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    }
})