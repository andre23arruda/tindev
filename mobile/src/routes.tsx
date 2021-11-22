import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// screens
import Login from './screens/Login'
import Main from './screens/Main'
import User from './screens/User'


const AppStack = createStackNavigator()

function AppScreens() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={ Login } />

                <AppStack.Screen name="Main" component={ Main } />

                <AppStack.Screen name="User" component={ User } />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens