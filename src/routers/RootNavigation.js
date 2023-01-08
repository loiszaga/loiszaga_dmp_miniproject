import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash, Login } from "../screens";
import MainNavigation from './MainNavigation';

const Stack = createStackNavigator();

const RootNavigation = props => { 
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Splash" 
                        component={Splash}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Login" 
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Main" 
                        component={MainNavigation}
                        options={{ headerShown:false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default RootNavigation;