

import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
// import AppBottom from "./AppBottom"
import DrawerView from "./DrawerView"
// import SettingsScreen from "../screens/CommandSetup"
import HomeScreen from "../screens/Home"
import TransaksiScreen from "../screens/Transaksi"
import ProdukScreen from "../screens/Produk"
import TambahProdukScreen from "../screens/TambahProduk"
import RekBankScreen from "../screens/RekeningBank"
import ProfilScreen from "../screens/Profil"

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
            <Drawer.Screen 
                name="Transaksi" 
                component={TransaksiScreen}
            />
            <Drawer.Screen 
                name="Produk" 
                component={ProdukScreen}
            />
            <Drawer.Screen 
                name="ProdukEditor"
                component={TambahProdukScreen}
            />
            <Drawer.Screen 
                name="RekBank"
                component={RekBankScreen}
            />
            <Drawer.Screen 
                name="Profil"
                component={ProfilScreen}
            />
        </Drawer.Navigator>
    )
}