import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import IconAn from "react-native-vector-icons/AntDesign"
import Header from "../components/MyHeader"
import style from "../styles"
// import IconEn from "react-native-vector-icons/Entypo"
// import { AppContext } from "../contexts/AppContext"
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import moment from "moment"
// import DatePicker from 'react-native-date-picker'
import ProdukItem from "../components/ProdukItem"
import MyTextInput from "../components/MyTextInput"
import { AppContext } from "../contexts/AppContext"

const Produk = props => {

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)
    // const [searchLoading,setSearchLoading] = useState(false)
    const [productList,setProduct] = useState([])

    const {ProdukData,setActionProduk} = useContext(AppContext)

    const _refresh = () => {
        fetchData()
    }

    const fetchData = async () => {
        setLoading(true)
        const result = await ProdukData({})
        setLoading(false)
        if(!result || !result?.status)
        return null
        setProduct(result?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[props.route.params])

    const timeout = useRef(null)
    const [search,setSearch] = useState("")

    const searchProduk = text => {
        clearTimeout(timeout.current);
        setSearch(text)
        if(text === "") searchData("")
    }

    const searchData = async (text) => {
        // setSearchLoading(true)
        setLoading(true)
        const result = await ProdukData({search:text})
        setLoading(false)
        // setSearchLoading(false)
        if(!result || !result?.status)
        return null
        setProduct(result?.data)
    }

    useEffect(()=>{
        if(search !== ""){
            timeout.current = setTimeout(()=>{
                searchData(search)
            }, 500);
        }
    },[search])

    return(
        <View style={{flex:1}}>  
            <Header
                text="Produk"
                leftCom={
                    <TouchableOpacity onPress={()=> navigation.toggleDrawer()}>
                        <Icon 
                            name="menu"
                            size={20}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                }
                rightCom={
                    <TouchableOpacity onPress={()=> {
                        setActionProduk("Tambah")
                        navigation.navigate("ProdukEditor",{})
                    }}>
                        <View style={{
                            backgroundColor:"#FFFFFF",
                            borderRadius:5,
                            flexDirection:"row",
                            padding:5
                        }}>
                            <Icon 
                                name="plus"
                                size={20}
                                color={style.color.primary}
                            />
                            <Text style={{
                                color:style.color.primary
                            }}>Tambah</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
            <View style={{
                flexDirection:"row",
                padding:10
            }}>
                <MyTextInput
                    leftCom={<Icon name="search" />}
                    rightCom={
                        loading ?
                        <ActivityIndicator />
                        :
                        search !== "" ?
                        <TouchableOpacity onPress={()=>searchProduk("")}>
                            <IconAn name="closecircle" />
                        </TouchableOpacity>
                        : 
                        <View/>
                    }
                    placeholder="Cari Nama Produk"
                    containerStyle={{
                        width:"100%",
                        marginRight:10,
                        marginBottom:0
                    }}
                    onChangeText={searchProduk}
                    value={search}
                />
                {/* <TouchableOpacity>
                    <Text style={{
                        color:"red",
                        marginTop:15
                    }}>Batal</Text>  
                </TouchableOpacity> */}
            </View>
            <ScrollView 
                contentContainerStyle={styles.sv_container}
                refreshControl={
                    <RefreshControl
                    refreshing={loading}
                    onRefresh={_refresh}
                    />
                }
            >
                <View style={{
                    flexGrow:1,
                    flexWrap:"wrap",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center",
                    paddingHorizontal:20
                }}>
                    { productList.map((item,index) => {
                        return(
                            <ProdukItem 
                                key={`produckt_${index}`}
                                data={item}
                            />
                        )
                    })}
                </View>
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

export default Produk