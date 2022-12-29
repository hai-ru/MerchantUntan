import React, { useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation, CommonActions } from "@react-navigation/native"
import Toast from 'react-native-toast-message';

import MyButton from "../components/MyButton"
import MyTextInput from "../components/MyTextInput"
import style from "../styles"
import {AppContext} from "../contexts/AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = props => {

    const navigation = useNavigation()

    const {
        setType,
        setForgot,
        LoginData
    } = useContext(AppContext)

    
    const [passwordShow,setPasswordShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const _login = async () =>{

        setLoading(true)
        const response = await LoginData({
            email:username,
            password:password
        })
        setLoading(false)

        if(!response?.status)
        return Toast.show({
            type: 'error',
            text1: 'Informasi',
            text2: response.message,
            position:"bottom"
        });

        await AsyncStorage.setItem("token",response.token)
        await AsyncStorage.setItem("tipe",response.merchant.tipe)

        navigation?.dispatch(
            CommonActions.reset({
                index:0,
                routes: [
                    { name: 'AppDrawer' }
                ]
            })
        )
    }

    return(
        <View>

            <View>
                <MyTextInput
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

            <TouchableOpacity onPress={()=>setForgot(true)}>
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
                <TouchableOpacity onPress={()=>setType(true)}>
                    <Text style={{
                        color:style.color.primary,
                        textDecorationLine:"underline",
                    }}>
                        Daftar disini
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
} 

export default LoginForm