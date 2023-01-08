import React, { useEffect, useState } from "react";
import { Animated, Text, StatusBar, SafeAreaView, Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import firebaseApp from '@react-native-firebase/app';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors, Strings } from "../styles";
import { firebase_config, MY_FONT_BOLD, MY_FONT_REGULAR } from "../constants";

const SplashScreen = (props) => {

    /* navigation */
    const navigation = useNavigation();

    const { t } = useTranslation();

    /* stats */
    const [progressStatus, setProgressStatus] = useState(0);
    const [animState, setAnimState] = useState(new Animated.Value(0))

    /* animation initialize */
    useEffect(() => {
        initializeFirebase();
    }, [])

    useEffect(() => {
        animState.addListener(({value})=> {  
            setProgressStatus(parseInt(value, 10));
        });  
        Animated.timing(animState, {  
              toValue         : 100,  
              duration        : 1500, 
              useNativeDriver : true
        }).start();

        return () => {
            Animated.timing(animState).stop();
            animState.removeAllListeners();
        }
    }, []);
 
    /* animation update */
    useEffect(() => {
        (progressStatus == 100) && navigateToNextPage();
    }, [progressStatus]);

    /* get firebase token from library for iOS */
    const initializeFirebase = async () => {
        if(firebaseApp.apps.length == 0){
            firebaseApp.initializeApp(firebase_config);
        }
    }

    /* moving to next page */
    const navigateToNextPage = () => {
        navigation.replace('Login');
    }

    return(
        <SafeAreaView style={styles.container}>
            {/* status bar */}
            {(Platform.OS == 'ios')
                    ? <StatusBar hidden />
                    : <StatusBar translucent backgroundColor={Colors.white}/>
            }

            {/* title text app & logo */}
            <View style={styles.title_logo_container}>
                <MCIcon name="briefcase" size={120} color={Colors.colorBlueLight} />
                <Text style={styles.text_splash}>{Strings.text_app_name}</Text>
            </View>

            {/* bottom copyright info */}
            <View style={styles.copyright_container}>
                <Text style={[styles.text_colorDefault, { fontSize: 14, fontFamily: MY_FONT_REGULAR }]}>{t('common:developed_by')}<Text style={[styles.text_colorDefault, { fontSize: 18, fontFamily: MY_FONT_BOLD }]}>{t('common:developer')}</Text></Text>
            </View>

            {/* Loading Bar */}
            <Animated.View style={[ styles.progressbar, {width: progressStatus +"%"} ]} />      
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: Colors.white
    },

    title_logo_container : { alignSelf: 'center', alignItems: 'center' },

    copyright_container : { position: 'absolute', bottom: 20, alignSelf: 'center' },

    text_splash : {
        fontSize: 32,
        fontFamily: MY_FONT_BOLD,
        color: Colors.colorBlueLight,
        textAlign: 'center'
    },

    text_colorDefault : {
        color: Colors.black
    },

    progressbar: {  
        height: 8,  
        backgroundColor: Colors.colorBlueLight,
        position: 'absolute',
        bottom: 0,
    },
})

export default SplashScreen;