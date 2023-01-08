import React from "react";
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import { Colors } from "../styles";
import { MY_FONT_REGULAR } from "../constants";
import { Jobs, Settings } from "../screens";

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigation = props => {

    const { t } = useTranslation();

    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
                name="HomeTab" 
                component={JobStack} 
                options={({ route }) => ({
                    tabBarLabel: ({ focused }) => {
                        return <Text 
                            style={{
                                fontSize    : (focused) ? 14 : 12, 
                                color       : (focused) ? Colors.colorBlueLight : Colors.colorGreyText, 
                                fontFamily  : MY_FONT_REGULAR
                            }}>{'Home'}
                        </Text>
                    },
                    tabBarIcon: ({ color, size }) => (
                        <EntypoIcon name="home" size={size} color={color} />
                    ),
                })}
            />
            <Tab.Screen 
                name="SettingsTab" 
                component={SettingsStack} 
                options={{
                    tabBarLabel: ({ focused }) => {
                        return <Text 
                            style={{
                                fontSize    : (focused) ? 14 : 12, 
                                color       : (focused) ? Colors.colorBlueLight : Colors.colorGreyText, 
                                fontFamily  : MY_FONT_REGULAR
                            }}>{t('navigate:setting')}
                        </Text>
                    },
                    tabBarIcon: ({ color, size }) => (
                        <IoniconsIcon name="settings-sharp" size={size} color={color} />
                    ) 
                }}
            />
        </Tab.Navigator>
    )
}

const JobStack = props => { 
    const { t } = useTranslation();

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Jobs"
                component={Jobs}
                options={{ 
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

const SettingsStack = props => { 
    const { t } = useTranslation();

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Settings" 
                component={Settings}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default MainNavigation;