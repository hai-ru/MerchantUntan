import React, { useContext, useState } from "react"
import {View,Text,TouchableOpacity, Image, ScrollView, StyleSheet, Alert} from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Entypo"
// import Pengaturan from "./Pengaturan"
// import ChangePassword from "./ChangePassword"
import { AppContext } from "../contexts/AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

const DrawerView = props => {
    const navigation = useNavigation()
    const {
        // showChangePass,setShowChangePass,tcpRef
    } = useContext(AppContext)

    const [pengaturan,setPenganturan] = useState(false)
    const [,setShowChangePass] = useState(false)

    const logout = async () => {
        await AsyncStorage.removeItem("username")
        await AsyncStorage.removeItem("password")
        await AsyncStorage.removeItem("post")
        await AsyncStorage.removeItem("call")
        tcpRef?.current?.destroy()
        navigation?.dispatch(
            CommonActions.reset({
                index:0,
                routes: [
                    { name: 'Login' }
                ]
            })
        )
    }

    return (
        <View style={{flex:1}}>
            {/* <Pengaturan 
                visible={pengaturan} 
                close={()=>setPenganturan(false)}
            /> */}
            <ChangePassword
                visible={showChangePass} 
                close={()=>setShowChangePass(false)}
            />
            <View style={{
                padding:15,
                flexDirection:"row",
                flexShrink:1,
                alignItems:"center",
                backgroundColor:"green",
                paddingTop:40
            }}>
                <Image 
                    source={require("../images/logo-untan.jpeg")}
                    style={{
                        height:75,
                        width:75,
                        marginRight:5
                    }}
                />
                <View style={{
                    flexShrink:1
                }}>
                    <Text style={{
                        fontSize:16,
                        fontWeight:"bold",
                        color:"white"
                    }}>Aplikasi Antrian{"\n"}Puskesmas Selakau Timur</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={{
                flex:1,
                paddingHorizontal:16,
                paddingVertical:20
            }}>
                <TouchableOpacity onPress={()=>setShowChangePass(true)}>
                    <Text style={styles.menu_txt}>
                        <Icon size={16} name="lock" />
                        {" "} Ganti Password
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setPenganturan(true)}>
                    <Text style={styles.menu_txt}>
                        <Icon size={16} name="cog" />
                        {" "} Pengaturan
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Command")}>
                    <Text style={styles.menu_txt}>
                        <Icon size={16} name="browser" />
                        {" "} Command
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                    <Text style={styles.menu_txt}>
                        <Icon size={16} name="log-out" />
                        {" "} Keluar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Aplikasi Puskesmas Selakau Timur",
                        "Aplikasi Antrian Puskesmas Selakau Timur \n\n"+
                        "Dibuat oleh : CV. IT KONSULTAN\n"+
                        "Tahun : 2022\n"+
                        "Support : +6282255985321"
                    )
                }}>
                    <Text style={styles.menu_txt}>
                        <Icon size={16} name="info-with-circle" />
                        {" "} Tentang Aplikasi
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default DrawerView

const styles = StyleSheet.create({
    menu_txt:{
        color:"black",
        fontSize:16,
        marginBottom:20
    }
})