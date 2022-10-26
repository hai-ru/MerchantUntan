import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation,CommonActions } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native"
import { AppContext } from "../contexts/AppContext"

export default props => {

    const navigation = useNavigation();

    const {
        initFirebase,
        // splashData,
        // tcpConnection,
        // tcpRef
    } = useContext(AppContext)
    
    const [status,setStatus] = useState("")
    const [loading,setLoading] = useState(false)
    const [retry,setRetry] = useState(0)

    const fetchData = async () => {
        setLoading(true)
        setStatus("Sedang memuat...")
        await initFirebase();
        // await splashData();
        // await tcpConnection();
        setLoading(false)

        // const username = await AsyncStorage.getItem("username")
        // const password = await AsyncStorage.getItem("password")
        // const post = await AsyncStorage.getItem("post")
        // const call = await AsyncStorage.getItem("call")
        // const fcm_token = await AsyncStorage.getItem("fcm_token")
        // // console.log("message",username)
        // if(username && password){
        //     const message = "SYS|LOGIN|REQ|CALLER!"+post+"!"+call+"!"+username+"!"+password+"!"+fcm_token
        //     if(tcpRef.current === null){
        //         const tryA = retry + 1;
        //         setRetry(tryA);
                
        //         if(tryA > 0)
        //         return navigation.navigate("Login")

        //         return fetchData()
        //     }
        //     return tcpRef?.current?.write(message)
        // }

        navigation?.dispatch(
            CommonActions.reset({
                index:0,
                routes: [
                    { name: 'Login' }
                ]
            })
        )
    }

    useEffect(()=>{
        fetchData();
    },[])
    
    return(
        <ImageBackground
            source={require("../assets/images/splash.jpeg")}
            style={{
                flex:1
            }}
        >
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={styles.container}>
                <View style={styles.logo_container}>
                    <Image
                        source={require("../assets/images/logo-untan.png")}
                        style={styles.logo_size}
                    />
                    <View style={{
                        flexShrink:1,
                        paddingLeft:10
                    }}>
                        <Text style={styles.title}>Aplikasi Merchant/Lab</Text>
                        <Text style={[styles.title,{
                            fontSize:25
                        }]}>Universitas Tanjungpura</Text>
                    </View>
                </View>
                {
                    loading &&
                    <View style={{
                        marginTop:25
                    }}>
                        <ActivityIndicator color="#FFFFFF" size="large" />
                        <Text style={{
                            textAlign:"center",
                            color:"#FFFFFF",
                            marginTop:15,
                            fontSize:14
                        }}>{status}</Text>
                    </View>
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.6)',
        paddingHorizontal:25,
        justifyContent:"center"
    },
    title:{
        color:"#FFFFFF",
        fontSize:20,
        fontWeight:"bold"
    },
    logo_container:{
        flexDirection:"row",
        alignItems:"center"
    },
    logo_size:{
        height:100,
        width:100,
    },
})