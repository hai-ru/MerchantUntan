import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import IconAn from "react-native-vector-icons/AntDesign"
import Header from "../components/MyHeader"
import style from "../styles"
// import IconEn from "react-native-vector-icons/Entypo"
// import { AppContext } from "../contexts/AppContext"
// import AsyncStorage from "@react-native-async-storage/async-storage"
import MyTextInput from "../components/MyTextInput"
import MyButton from "../components/MyButton"
import { AppContext } from "../contexts/AppContext"

const TambahProduk = props => {

    const {action_produk} = useContext(AppContext)

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)

    const _refresh = () => {
        setLoading(true)
        setTimeout(()=>setLoading(false),2000)
    }

    const simpan = () => navigation.navigate("Produk")

    return(
        <View style={{flex:1}}>  
            <Header
                text={`${action_produk} Produk`}
                leftCom={
                    <TouchableOpacity onPress={()=> navigation.navigate("Produk")}>
                        <IconAn 
                            name="arrowleft"
                            size={20}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                }
            />
            <ScrollView 
                contentContainerStyle={[
                    styles.sv_container,
                    {
                        paddingHorizontal:20
                    }
                ]}
                refreshControl={
                    <RefreshControl
                    refreshing={loading}
                    onRefresh={_refresh}
                    />
                }
            >
                <TouchableNativeFeedback onPress={()=>Alert.alert("Tambah Foto")}>
                    <View style={{
                        marginVertical:20,
                        alignSelf:"center",
                        height:200,
                        width:"48%",
                        borderWidth:1,
                        borderColor:style.color.border,
                        borderRadius:8,
                        elevation:2,
                        backgroundColor:"#FFFFFF",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <Icon name="camera" size={40} />
                        <Text>Foto Produk</Text>
                    </View>
                </TouchableNativeFeedback>
                
                <MyTextInput 
                    placeholder="Nama Produk"
                />

                <MyTextInput 
                    placeholder="Harga Produk"
                />

                <MyTextInput 
                    placeholder="Deskripsi Produk"
                    multiline={true}
                    style={{
                        height:100,
                        textAlignVertical:"top"
                    }}
                />

                <MyButton 
                    text="Simpan"
                    onPress={simpan}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
   hello:{
    color:style.color.text
   },
   sv_container:{
        backgroundColor:"#FFFFFF",
        flexGrow:1
   },
   payment_text:{
        backgroundColor:"#FFFFFF"
    },
    date_txt_container:{
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:5,
        backgroundColor:"#ffffff",
        borderColor:"gray"
    },
    date_txt:{color:"black"},
    range_container:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10
    },
})

export default TambahProduk