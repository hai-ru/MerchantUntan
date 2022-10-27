
import { useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { Alert, Button, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import MyButton from "../components/MyButton"
import MyTextInput from "../components/MyTextInput"
import { AppContext } from "../contexts/AppContext"
import style from "../styles"
// import Pengaturan from "../components/Pengaturan"
// import CONST from "../contexts/constants"
// import DropDownPicker from "react-native-dropdown-picker"
// import AsyncStorage from "@react-native-async-storage/async-storage"


export default props => {

    const navigation = useNavigation()

    const {
        // tcpRef,status,
    } = useContext(AppContext)

    
    const [passwordShow,setPasswordShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const _login = async () =>{
        navigation.navigate("AppDrawer")
    }

    return(
        <ImageBackground
            source={require("../assets/images/splash.jpeg")}
            style={{
                flex:1
            }}
        >
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
                    <View>
                        <MyTextInput
                            // placeholder="Nomor Handphone"
                            placeholder="Email"
                            value={username}
                            onChangeText={ text => setUsername(text)}
                        />
                        <MyTextInput
                            placeholder="Kata Sandi"
                            secureTextEntry={!passwordShow}
                            value={password}
                            onChangeText={ text => setPassword(text)}
                            rightCom={
                                <TouchableOpacity onPress={()=>setPasswordShow(!passwordShow)}>
                                    <Icon name={!passwordShow ? "eye" : "eye-off"} size={20} />
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={{color:"#FFFFFF",textAlign:"right"}}>Lupa Password ?</Text>
                    </TouchableOpacity>

                    <MyButton
                        loading={loading}
                        onPress={_login} 
                        text="Masuk"
                        btnStyle={{
                            paddingVertical:15,
                            marginTop:20
                        }}
                    />

                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"center",
                        marginTop:20
                    }}>
                        <Text style={{
                            color:"#FFFFFF",
                        }}
                        >
                            Tidak punya akun? {" "}
                        </Text>
                        <TouchableOpacity>
                            <Text style={{
                                color:style.color.primary,
                                textDecorationLine:"underline",
                            }}>
                                Daftar disini
                            </Text>
                        </TouchableOpacity>
                    </View>

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