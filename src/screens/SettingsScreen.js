import React, { useState } from "react";
import { Text, StatusBar, SafeAreaView, Platform, StyleSheet, TouchableHighlight, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import auth from '@react-native-firebase/auth';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { defaultCustomAlert, ModalContents, showToast } from '../components/global';
import { Colors, Images } from "../styles";
import { MY_FONT_BOLD, MY_FONT_REGULAR, SHOW_LOG } from "../constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const SettingsScreen = () => {

    /* navigation */
    const navigation = useNavigation();

    /* translation */
    const { t , i18n } = useTranslation();

    /* stats */
    const [isLangPopUpShow, setLangPopUpShow] = useState(false);

    const setLanguage = (code) => {
        (SHOW_LOG) && console.log('language set up to : ',code);
        showToast(t('common:language_changed'));
        setLangPopUpShow(false);

        return i18n.changeLanguage(code);
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
            .signOut()
            .then(() => showToast('Your are signed out!'));
            // setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    /* custom action bar for android */
    const showCustomActBar = () => {        
        return(
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.replace('Main')}>
                    <IoniconsIcon name="arrow-back" size={25} color={Colors.colorBlueLight} />
                </TouchableOpacity>

                <View style={styles.textBtn}>
                    <Text style={styles.textHeaderSetting}>{t('common:textLable_Settings')}</Text>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            {/* status bar */}
            {(Platform.OS == 'ios')
                    ? <StatusBar hidden />
                    : <StatusBar translucent backgroundColor={Colors.colorBlueLight}/>
            }

            {(Platform.OS == 'android') && showCustomActBar()}

            {/* change language button */}
            <TouchableHighlight 
                style={styles.btnContainer}
                underlayColor={Colors.grayLight}
                onPress={() => setLangPopUpShow(true)}
            >
                <>
                    <View style={styles.iconBtn}>
                        <Image source={Images.ic_language} style={{height:25, width:25}}/>
                    </View>

                    <View style={styles.textBtn}>
                        <Text style={[styles.textBtnStyle, {color: Colors.black}]}>{t('common:textLable_changeLanguage')}</Text>
                    </View>
                </>
            </TouchableHighlight>

            {/* change language button */}
            <TouchableHighlight 
                style={styles.btnContainer}
                underlayColor={Colors.grayLight}
                onPress={() => {
                    defaultCustomAlert({ 
                        title : t('common:titleDialog_LogOutConfirm'),
                        subTitle : t('common:messageDialog_LogoutConfirm'),
                        positiveBtnText : t('common:text_yes'),
                        negativeBtnText : t('common:text_no'),
                        positiveOnPress : () => {
                            signOut();
                            navigation.navigate('Login');
                        },
                        negativeOnPress : () => {
                            (SHOW_LOG) && console.log('cancel delete loc');
                        }
                    });
                }}
            >
                <>
                    <View style={styles.iconBtn}>
                        <MCIcon name="subdirectory-arrow-right" size={25} color={Colors.red} />
                    </View>

                    <View style={styles.textBtn}>
                        <Text style={[styles.textBtnStyle, {color: Colors.red}]}>{t('common:textLable_LogOut')}</Text>
                    </View>
                </>
            </TouchableHighlight>

            {/* change language pop up */}
            <ModalContents
                show={isLangPopUpShow}
                onClose={() => setLangPopUpShow(false)}
                content={(
                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <TouchableHighlight underlayColor={Colors.grayLight} style={styles.modalBtnContainer} onPress={() => setLanguage('en')}>
                                <Text style={styles.text_modalBtnLable}>{'English'}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={Colors.grayLight} style={styles.modalBtnContainer} onPress={() => setLanguage('id')}>
                                <Text style={styles.text_modalBtnLable}>{'Indonesia'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        backgroundColor: Colors.white
    },

    btnContainer : {
        width:"100%", 
        flexDirection:'row',
    },

    iconBtn : {
        height: 62, 
        width:"15%", 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center'
    },

    textBtn : {
        width:'85%', 
        height:62, 
        alignSelf:'center', 
        justifyContent:'center', 
        alignItems:'center'
    },

    textBtnStyle : {
        fontSize : 17,
        textAlign : 'left',
        alignSelf:'flex-start',
        marginLeft:12,
        fontFamily: MY_FONT_REGULAR
    },

    /* pop up change language */
    modal: {
        backgroundColor : Colors.white,
        height : 100,
    },

    modalContainer : {
        width:'100%',
        height:"100%",
        flexDirection:'column'
    },

    modalBtnContainer : {
        flex:1, justifyContent:'center'
    },

    text_modalBtnLable : {
        fontSize:18,
        color:Colors.black,
        textAlign:'left',
        marginStart:20,
        fontFamily: MY_FONT_REGULAR
    },

    textHeaderSetting : {
        fontSize : 20,
        color : Colors.colorBlueLight,
        textAlign : 'left',
        marginLeft:4,
        alignSelf:'flex-start',
        fontFamily: MY_FONT_BOLD  
    },
})

export default SettingsScreen;