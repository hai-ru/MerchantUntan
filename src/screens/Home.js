import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Toast from 'react-native-toast-message';

import Cards from "../components/Cards"
import Header from "../components/MyHeader"
import { AppContext } from "../contexts/AppContext"
import style from "../styles"
// import IconEn from "react-native-vector-icons/Entypo"
// import { AppContext } from "../contexts/AppContext"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import moment from "moment"

const Home = props => {

    const navigation = useNavigation()
    
    const {HomeData} = useContext(AppContext)
    
    const [loading,setLoading] = useState(false)
    const [name,setName] = useState("")
    const [toko,setToko] = useState("")
    const [saldo,setSaldo] = useState("")
    const [trx,setTrx] = useState(0)
    const [trxList,setTrxList] = useState([])

    const fetchData = async () => {

        setLoading(true)
        const response = await HomeData()
        setLoading(false)

        if(!response || !response.status) 
        return Toast.show({
            type: 'error',
            text1: 'Informasi',
            text2: "Cek koneksi internet anda...",
            position:"bottom"
        });

        setName(response?.user?.name)
        setToko(response?.merchant?.name)
        setSaldo(response?.amount_text)
        setTrx(response?.transaction_count)
        setTrxList(response?.transaction)

    }

    useEffect(()=>{
        fetchData()
    },[])

    const _refresh = () => {
        fetchData()
    }

    return(
        <ScrollView 
            contentContainerStyle={styles.sv_container}
            refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={_refresh}
                />
              }
        >
            <Header
                text="Beranda"
                leftCom={
                    <TouchableOpacity onPress={()=> navigation.toggleDrawer()}>
                        <Icon 
                            name="menu"
                            size={20}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                }
            />
            <View style={{
                padding:20
            }}>
                <Text style={[styles.hello,
                    {
                        fontSize:20,
                        fontWeight:"500"
                    }
                ]}>Selamat Datang, {"\n"}{name}</Text>
                <Text style={styles.hello}>{toko}</Text>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    flexWrap:"wrap"
                }}>
                    <Cards
                        iconName="money-bill-wave"
                        title="Saldo"
                        value={`Rp. ${saldo}`}
                    />
                    <Cards
                        iconName="shopping-cart"
                        title="Transaksi Hari Ini"
                        value={trx}
                    />
                </View>

                <Text style={[styles.hello,
                    {
                        marginTop:10,
                        fontWeight:"500",
                        fontSize:17
                    }
                ]}>Pembayaran Terakhir</Text>

                {
                    trxList.map((item,index)=>{
                        return(
                            <Cards
                                key={`trx_item_${index}`}
                                style={styles.payment_text}
                            >
                                <Text style={{
                                    color:"#000000",
                                    flexGrow:1
                                }}>
                                    Terima dari :
                                    {" "}{item?.pengirim ?? "-"}
                                </Text>
                                <Text style={{
                                    color:"green"
                                }}>
                                    +Rp. {item?.nominal}
                                </Text>
                            </Cards>
                        )
                    })
                }
            </View>
        </ScrollView>
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
        backgroundColor:"#FFFFFF",
        padding:10
    }
})

export default Home