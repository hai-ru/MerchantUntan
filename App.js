import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from "./src/contexts/AppContext";
import SplashScreen from './src/screens/Splash';
import LoginScreen from './src/screens/Login';
// import AppDrawer from './src/components/AppDrawer';
// import AppBottom from './src/components/AppBottom';

const Stack = createNativeStackNavigator();

export default () => {
  return(
    <NavigationContainer>
        <AppProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name="AppDrawer" component={AppDrawer} /> */}
          </Stack.Navigator>
        </AppProvider>
    </NavigationContainer>
  )
}