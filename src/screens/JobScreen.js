import React, { useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, FlatList, Keyboard, Linking, 
         Platform, RefreshControl, StatusBar, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SearchBar } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { JobsEndpoints } from '../axios';
import { Colors, Size } from "../styles";
import { MY_FONT_BOLD, MY_FONT_REGULAR, SHOW_LOG } from "../constants";
import { showToast } from "../components/global";

const JobScreen = props => {

    /* navigation */
    const navigation = useNavigation();

    /* translation */
    const { t , i18n } = useTranslation();

    /* state */
    const [currPage, setCurrPage] = useState(1);
    const [listData, setListData] = useState([]);
    const [refreshing, setRefresh] = useState(false);
    const [isLoadingList, setLoadingList] = useState(false);
    const [isListReachLimit, setListReachLimit] = useState(false);

    //search part
    const [listSearchData, setListSearchData] = useState([]);
    const [isSearching, setSearching] = useState(false);
    const [typing, setTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [searchingValue, setSearchingValue] = useState('');

    /* global var */
    let backClickCount = 0;

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


    useEffect(() => {
        loadAPI(currPage);
    }, [])

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
    
    const loadAPI = async (page) => {
        setLoadingList(true);

        (SHOW_LOG) && console.log('current page : ', page);

        let requestPayload = {
            page: page
        }

        let responseObject = await JobsEndpoints.showJobList(requestPayload);
        if(responseObject.status === 200){
            /* prevent load more loop */
            if (responseObject.data.length === 0){
                setListReachLimit(true);
            }

            /* concat list with response */
            let data           = listData;
            let listDataConcat = data.concat(responseObject.data);

            setListData(listDataConcat);
            setLoadingList(false);
        }else{
            setLoadingList(false);
        }

        setRefresh(false);
    }

    const loadSearchJobAPI = async (text, page) => {
        setLoadingList(true);

        (SHOW_LOG) && console.log('current page : ', page);

        let requestPayload = {
            page: page,
            keyword: text
        }

        let responseObject = await JobsEndpoints.searchJob(requestPayload);
        if(responseObject.status === 200){
            /* prevent load more loop */
            if (responseObject.data.length === 0){
                setListReachLimit(true);
            }

            /* concat list with response */
            let data           = listSearchData;
            let listDataConcat = data.concat(responseObject.data);

            setListSearchData(listDataConcat);
            setLoadingList(false);
        }else{
            setLoadingList(false);
        }

        setRefresh(false);
    }

    /* get keyword that typed by user on the searchbar */
    const updateSearchValueState = (search) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setCurrPage(0); //reset page
        setListSearchData([...new Array(0).fill({})]);
        setTyping(false);
        setSearching(true);
        setSearchingValue(search);
        setTypingTimeout(
            setTimeout(() => {
                (search !== '') 
                ? (
                    loadSearchJobAPI(search, 1)
                  ) 
                : ( 
                    setSearching(false)
                  )
                Keyboard.dismiss()
            }, 1500)
        );
    }

    /* rendering footer loading activity indicator under the list */
    const renderFooter = () => {
        return (
            // Footer View with Loader
            <View style={styles.footer}>
                {isLoadingList ? (
                    <ActivityIndicator color={Colors.colorBlueLight} style={{margin: 15}} size='large' />
                ) : null}
            </View>
        );
    };

    const handleLoadMore = async () => {
        if (!isLoadingList) {
            if (!isListReachLimit){
                setCurrPage(currPage + 1);

                if(isSearching){
                    loadSearchJobAPI(searchingValue.trim(), currPage);
                }else{
                    loadAPI(currPage);
                }
            }
        }
    }

    const renderItem = ({ item, index }) => {
        return(
            <TouchableHighlight
                underlayColor={Colors.grayLight}
                style={styles.rowItemContainer}
                onPress={() => Linking.openURL(item.url)}
            >
                <View style={{ flexDirection: 'row', borderRadius: 10, padding: 10 }}>
                    <View style={{ flex: 2, backgroundColor: Colors.colorBlueLight, borderRadius: 10, justifyContent: 'center', marginRight: 10 }}>
                        <MCIcon name="office-building" size={40} color={Colors.white} style={{ textAlign: 'center'}} />
                    </View>
                    <View style={{ flex: 5, backgroundColor: 'white' }}>
                        <Text numberOfLines={2} style={{ fontFamily: MY_FONT_BOLD, color: Colors.black, fontSize: Size.scaleFont(16), marginBottom: 10 }}>{(item.title === null) ? '' : item.title}</Text>
                        <Text numberOfLines={2} style={{ fontFamily: MY_FONT_REGULAR, color: Colors.colorGreyText, fontSize: Size.scaleFont(14), marginBottom: 5 }}>{item.company}</Text>
                        <Text style={{ fontFamily: MY_FONT_REGULAR, color: Colors.colorGreyText, fontSize: Size.scaleFont(14) }}>{item.location}</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <MCIcon name="chevron-right" size={32} color={Colors.red} style={{ textAlign: 'center'}} />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    const renderSearchForm = () => {
        return(
            <View style={{width:'100%', height:'8%', paddingHorizontal:8, marginTop: Size.scaleSize(20)}}>
                <SearchBar
                    round
                    style = {{fontSize: 14, fontFamily: MY_FONT_REGULAR}}
                    placeholder={'search here'}
                    containerStyle={Platform.OS === 'ios' ? styles.outsideContainerSearchIOS : styles.outsideContainerSearch}
                    inputContainerStyle={styles.insideContainerSearch}
                    onChangeText={(text) => updateSearchValueState(text)}
                    onFocus={() => {
                        setSearching(true);
                        setTyping(true);
                    }}
                    onClear={() => {
                        setSearching(false);
                    }}
                    onCancel={() => setSearching(false)}
                    value={searchingValue}
                />
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

            {/* search bar */}
            {renderSearchForm()}

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={(isSearching) ? listSearchData : listData}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                scrollEnabled={true}
                style={{ marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}
                refreshControl={<RefreshControl
                    colors={[`${Colors.colorBlueLight}`]} 
                    progressViewOffset={10}
                    refreshing={refreshing}
                />}
            />
        </SafeAreaView>
    )
}

const elevationShadowStyle = (elevation) => {
    return {
        elevation,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0.5 * elevation },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * elevation,
    };
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: Size.scaleSize(15)
    },

    rowItemContainer: {
        margin: Size.scaleSize(10), 
        borderRadius: 10, 
        borderColor: Colors.colorClosedGrey, 
        borderWidth:1, 
        backgroundColor: Colors.white, 
        ...elevationShadowStyle(3)
    },

    rowItemGroup: {
        flexDirection: 'column',
        height: 200
    },

    text_rowItemTitle: {
        textAlign:'center', 
        fontFamily: MY_FONT_BOLD, 
        color: Colors.black, 
        fontSize: Size.scaleFont(14)
    },

    rowItemBottomInfo: {
        width: Size.scaleSize(150), 
        flex: 1, 
        padding: 10, 
        alignItems: 'center'
    },

    rowItemImage: {
        height: Size.scaleSize(200), 
        width: Size.scaleSize(150), 
        borderRadius: 10
    },

    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    /* search part */
    insideContainerSearch : {
        height : 32,
        backgroundColor : 'transparent',
        borderRadius : 16,
        borderWidth : 1,
        borderBottomWidth : 1,
        borderStyle : 'solid'
    },

    outsideContainerSearchIOS : {
        width : "100%",
        backgroundColor : 'transparent',
        borderBottomColor : 'transparent',
        borderTopColor : 'transparent'
    },

    outsideContainerSearch : {
        width : "100%",
        height: "100%",
        backgroundColor : 'transparent',
        borderBottomColor : 'transparent',
        borderTopColor : 'transparent'
    },

    imageContainer: {
        height: "100%",
        flex:1.5,
        // width:120,
        borderColor: Colors.colorClosedGrey,
        borderWidth:1,
        borderRadius:8,
    },
})

export default JobScreen;