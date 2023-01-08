import React from "react";
import { StyleSheet, TouchableHighlight, View, Text } from "react-native";
import { MY_FONT_BOLD } from "../../constants";
import { Colors, Size } from "../../styles";

export const Button = ({ title, onPress, underlayColor, containerStyle, style, textStyle, disabled, disableStyle }) => {
    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <TouchableHighlight 
                disabled={disabled}
                style={[styles.button, style, disabled && disableStyle]}
                underlayColor={underlayColor? underlayColor : "rgba(0,0,0,0.2)"}
                onPress={onPress}
            >
                <View>
                    <Text allowFontScaling={false} style={[styles.buttonText, textStyle]}>{title}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        height: Size.scaleSize(50),
        backgroundColor: Colors.colorBlueLight,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText : {
        fontFamily: MY_FONT_BOLD, 
        color: Colors.white, 
        fontSize: Size.scaleFont(16), 
        textAlign: 'center', 
        padding: Size.scaleSize(10)
    }
})