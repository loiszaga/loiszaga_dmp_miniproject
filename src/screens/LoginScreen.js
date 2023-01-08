import React, { useEffect, useState } from "react";
import { Text, StatusBar, SafeAreaView, Platform, StyleSheet, View, BackHandler } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

import { Colors, Size, Strings } from "../styles";
import { MY_FONT_BOLD, MY_FONT_REGULAR, SHOW_LOG } from "../constants";
import { useTranslation } from "react-i18next";
import { Button, showToast, SpinnerLoader } from "../components/global";

const LoginScreen = props => {

    /* navigation */
    const navigation = useNavigation();

    /* translation */
    const { t } = useTranslation();

    /* stats */
    const [loading, setLoading] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);
    const [user, setUser] = useState([]);

    /* global var */
    let backClickCount = 0;

    useEffect(() => {
        setupGoogleSignin();
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        const focusListener = props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                ((backClickCount == 1) ? BackHandler.exitApp() : backPressCounter());
                return true;
            });
        });

        return () => {
            props.navigation.removeListener('focus', focusListener);
        }
    }, [])

    const setupGoogleSignin = async () => {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true })
            await GoogleSignin.configure({
                scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
                webClientId:
                  '717375972903-qao2g3krl3agu5r9d007avu4vg7ephhb.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            });
    
            // const user = await GoogleSignin.getCurrentUser();
            // console.log('curr user : ',user);
        }
        catch (err) {
          console.log("Google signin error", err.code, err.message);
        }
    }

    const signINProcess = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const { idToken } = await GoogleSignin.signIn();
          setloggedIn(true);
    
          const credential = auth.GoogleAuthProvider.credential(idToken);

          await auth().signInWithCredential(credential);
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (user) setloggedIn(true);
        if (user) navigation.navigate("Main");
        setLoading(false);
        (SHOW_LOG) && console.log('curr user : ',user);
    }

    /* backpress counter for exit app */
    const backPressCounter = () => {
        if (backClickCount === 0) {
            backClickCount = 1;

            showToast(t('common:exit_confirmation'));
        }
        setTimeout(() => {
            backClickCount = 0;
        }, 2000);
    }
    
    return(
        <SafeAreaView style={styles.container}>
            {/* status bar */}
            {(Platform.OS == 'ios')
                    ? <StatusBar hidden />
                    : <StatusBar translucent backgroundColor={Colors.colorBlueLight}/>
            }

            {/* loading screen */}
            <SpinnerLoader show={loading}/>

            {/* title text app */}
            <View style={styles.titleContainer}>
                <Text style={styles.text_title}>{Strings.text_app_name}</Text>
                <Text style={styles.text_subTitle}>{t('common:text_dreamjob')}</Text>
            </View>
            
            {/* button login */}
            <View style={styles.btnContainer}>
                <GoogleSigninButton
                    style={{width: Size.scaleSize(192), height: Size.scaleSize(48)}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => {
                        setLoading(true);
                        signINProcess();
                    }}
                />

                <Text style={styles.text_or}>{`- ${t('common:text_or')} -`}</Text>

                <Button
                    title={'Facebook'}
                    onPress={() => showToast('Coming Soon')}
                    style={{ height : '100%', width: '100%', justifyContent: 'center' }}
                    containerStyle={{ width: '50%', height: Size.scaleSize(48) }}
                />
            </View>

            {/* bottom copyright info */}
            <View style={styles.copyright_container}>
                <Text style={[styles.text_colorDefault, { fontSize: 14, fontFamily: MY_FONT_REGULAR }]}>{t('common:developed_by')}<Text style={[styles.text_colorDefault, { fontSize: 18, fontFamily: MY_FONT_BOLD }]}>{t('common:developer')}</Text></Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: Colors.white
    },

    titleContainer : {
        marginBottom: Size.scaleSize(30), alignItems: 'center'
    },

    btnContainer : {
        width: '100%', alignItems: 'center'
    },

    text_title : {
        fontSize: Size.scaleFont(32),
        fontFamily: MY_FONT_BOLD,
        color: Colors.colorBlueLight,
        textAlign: 'center',
    },

    text_subTitle : {
        fontFamily: MY_FONT_REGULAR, 
        color: Colors.black, 
        fontSize: Size.scaleFont(16),
        textAlign: 'center'
    },

    text_colorDefault : {
        color: Colors.black
    },

    text_or : {
        fontFamily: MY_FONT_REGULAR, color: Colors.black, fontSize: Size.scaleFont(16), marginVertical: Size.scaleSize(20), textTransform: 'uppercase'
    },

    copyright_container : { position: 'absolute', bottom: 20, alignSelf: 'center' },
})

export default LoginScreen;