import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Cards from "../components/Cards"
import Header from "../components/MyHeader"
import style from "../styles"
// import IconEn from "react-native-vector-icons/Entypo"
// import { AppContext } from "../contexts/AppContext"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import moment from "moment"
// import {getPOST,getCounter} from "../contexts/constants"

const Home = props => {

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)
    
    const [name,setName] = useState("Heru")
    const [toko,setToko] = useState("Kantin X")

    return(
        <ScrollView 
            contentContainerStyle={styles.sv_container}
            refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={()=>{
                    //   setRefresh(true)
                    setLoading(true)
                    // getinfo()
                  }}
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
                ]}>Selamat Datang, {name}</Text>
                <Text style={styles.hello}>{toko}</Text>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    flexWrap:"wrap"
                }}>
                    <Cards
                        iconName="money-bill-wave"
                        title="Saldo"
                        value="Rp. 0"
                    />
                    <Cards
                        iconName="shopping-cart"
                        title="Transaksi Hari Ini"
                        value="0"
                    />
                </View>

                <Text style={[styles.hello,
                    {
                        marginTop:10,
                        fontWeight:"500",
                        fontSize:17
                    }
                ]}>Pembayaran Terakhir</Text>
                <Cards
                    title="Dari : x"
                    value="Rp. 0"
                    style={styles.payment_text}
                    textColor="#000000"
                />
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
        backgroundColor:"#FFFFFF"
    }
})

export default Home