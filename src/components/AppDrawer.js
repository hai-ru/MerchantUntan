

import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
// import AppBottom from "./AppBottom"
import DrawerView from "./DrawerView"
// import SettingsScreen from "../screens/CommandSetup"
import HomeScreen from "../screens/Home"

const Drawer = createDrawerNavigator()

export default () => {
    return(
        <Drawer.Navigator 
            drawerContent={props => <DrawerView {...props} />}
            drawerPosition="right"
            screenOptions={{
                headerShown: false
            }}
        >
            {/* <Drawer.Screen name="AppBottom" component={AppBottom} /> */}
            <Drawer.Screen 
                name="Home" 
                component={HomeScreen}
            />
        </Drawer.Navigator>
    )
}