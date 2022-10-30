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
import moment from "moment"
import DatePicker from 'react-native-date-picker'
import ProdukItem from "../components/ProdukItem"
import MyTextInput from "../components/MyTextInput"

const TambahProduk = props => {

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)

    const _refresh = () => {
        setLoading(true)
        setTimeout(()=>setLoading(false),2000)
    }

    let product_mock = [1,2,3,4,5]

    return(
        <View style={{flex:1}}>  
            <Header
                text="Tambah Produk"
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
                contentContainerStyle={styles.sv_container}
                refreshControl={
                    <RefreshControl
                    refreshing={loading}
                    onRefresh={_refresh}
                    />
                }
            >
                
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