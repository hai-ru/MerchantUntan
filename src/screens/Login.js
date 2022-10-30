
import React, { useContext, useEffect, useState } from "react"
import { Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native"
import ForgotPassword from "../components/ForgotPassword"
import LoginForm from "../components/Login"
import SignUp from "../components/SignUp"
import { AppContext } from "../contexts/AppContext"

// import DropDownPicker from "react-native-dropdown-picker"
// import AsyncStorage from "@react-native-async-storage/async-storage"


export default props => {

    const {type} = useContext(AppContext)

    return(
        <ImageBackground
            source={require("../assets/images/splash.jpeg")}
            style={{
                flex:1
            }}
        >
            <ForgotPassword />
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={styles.container}>
                <View>
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
                    <Text style={[styles.title,{
                        textAlign:"center",
                        marginTop:70,
                        marginBottom:15
                    }]}>Silahkan masukkan detail data</Text>
                    
                    { !type ? <LoginForm /> : <SignUp /> }

                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.6)',
        paddingTop:50,
        paddingHorizontal:25,
        alignItems:"center",
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
        width:100
    },
})