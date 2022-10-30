import React, { useContext, useEffect, useState } from "react"
import { Alert, Button, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"

import MyButton from "../components/MyButton"
import MyTextInput from "../components/MyTextInput"
import style from "../styles"
import {AppContext} from "../contexts/AppContext"

export default props => {

    const navigation = useNavigation()

    const {
        setType,
        setForgot
    } = useContext(AppContext)

    
    const [passwordShow,setPasswordShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const _login = async () =>{
        navigation.navigate("AppDrawer")
    }

    return(
        <View>

            <View>
                <MyTextInput
                    placeholder="Nama Lengkap"
                    value={username}
                    onChangeText={ text => setUsername(text)}
                />
                <MyTextInput
                    placeholder="Email"
                    value={username}
                    onChangeText={ text => setUsername(text)}
                />
                <MyTextInput
                    placeholder="Nomor Handphone"
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

            <MyButton
                loading={loading}
                onPress={_login} 
                text="Daftar"
                btnStyle={{
                    paddingVertical:15,
                    marginTop:20
                }}
            />

            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                marginVertical:20
            }}>
                <Text style={{
                    color:"#FFFFFF",
                }}
                >
                    Sudah punya akun? {" "}
                </Text>
                <TouchableOpacity onPress={()=>setType(false)}>
                    <Text style={{
                        color:style.color.primary,
                        textDecorationLine:"underline",
                    }}>
                        Masuk disini
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={()=>setForgot(true)}>
                <Text style={{
                    color:style.color.primary,
                    textDecorationLine:"underline",
                    textAlign:"center"
                }}>Lupa Password ?</Text>
            </TouchableOpacity>
            
        </View>
    )
} 