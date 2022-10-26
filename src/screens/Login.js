
import { useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { Alert, Button, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import MyButton from "../components/MyButton"
import MyTextInput from "../components/MyTextInput"
// import Pengaturan from "../components/Pengaturan"
import { AppContext } from "../contexts/AppContext"
// import CONST from "../contexts/constants"
// import DropDownPicker from "react-native-dropdown-picker"
// import AsyncStorage from "@react-native-async-storage/async-storage"


export default props => {

    const navigation = useNavigation()

    const {
        // tcpRef,status,
    } = useContext(AppContext)

    // const [pengaturan,setPenganturan] = useState(false)
    const [passwordShow,setPasswordShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    // const [postOpen,setPostOpen] = useState(false)
    // const [postVal,setPostVal] = useState("")
    // const [postData,setPost] = useState([
    //     {
    //         "label":"APOTIK",
    //         "value":"POST0"
    //     },
    //     {
    //         "label":"LABORATORIUM",
    //         "value":"POST1"
    //     },
    //     {
    //         "label":"PENDAFTARAN RJ",
    //         "value":"POST2"
    //     },
    //     {
    //         "label":"BPJS KESEHATAN",
    //         "value":"POST3"
    //     },
    //     {
    //         "label":"CUSTOMER SERVICE",
    //         "value":"POST4"
    //     },
    //     {
    //         "label":"POLI GIGI",
    //         "value":"POST5"
    //     },
    //     {
    //         "label":"POLI ANAK",
    //         "value":"POST6"
    //     },
    //     {
    //         "label":"POLI MATA",
    //         "value":"POST7"
    //     },
    //     {
    //         "label":"POLI KULIT",
    //         "value":"POST8"
    //     },
    //     {
    //         "label":"POLI THT",
    //         "value":"POST9"
    //     },
    // ])

    // const [callOpen,setCallOpen] = useState(false)
    // const [callVal,setCall] = useState("")
    // const [counter,setCounter] = useState([
    //     {
    //         "label":"Counter A",
    //         "value":"CALL#1"
    //     },
    //     {
    //         "label":"Counter B",
    //         "value":"CALL#2"
    //     },
    //     {
    //         "label":"Counter C",
    //         "value":"CALL#3"
    //     },
    //     {
    //         "label":"Counter D",
    //         "value":"CALL#4"
    //     },
    //     {
    //         "label":"Counter E",
    //         "value":"CALL#5"
    //     },
    //     {
    //         "label":"Counter F",
    //         "value":"CALL#6"
    //     },
    //     {
    //         "label":"Counter G",
    //         "value":"CALL#7"
    //     },
    //     {
    //         "label":"Counter H",
    //         "value":"CALL#8"
    //     },
    //     {
    //         "label":"Counter I",
    //         "value":"CALL#9"
    //     },
    //     {
    //         "label":"Counter J",
    //         "value":"CALL#10"
    //     }
    // ])

    const _login = async () =>{
        navigation.navigate("AppDrawer")
    //     if(status === 0){
    //         return Alert.alert("Info","Anda belum terkoneksi ke server",[
    //             {
    //                 text:"Pengaturan",
    //                 onPress:()=>setPenganturan(true)
    //             },
    //             {
    //                 text:"Ok"
    //             }
    //         ])
    //     }
    //     const fcm_token = await AsyncStorage.getItem("fcm_token")
    //     const message = "SYS|LOGIN|REQ|CALLER!"+postVal+"!"+callVal+"!"+username+"!"+password+"!"+fcm_token
    //     setLoading(true)
    //     tcpRef.current.write(message);
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
                    <MyButton
                        loading={loading}
                        onPress={_login} 
                        text="Masuk"
                        btnStyle={{
                            paddingVertical:15,
                            marginTop:20
                        }}
                    />
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