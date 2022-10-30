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

const Produk = props => {

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
                    <TouchableOpacity onPress={()=> navigation.navigate("ProdukEditor")}>
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
                // alignItems:"center"
            }}>
                <MyTextInput 
                    leftCom={<Icon name="search" />}
                    rightCom={
                        <TouchableOpacity>
                            <IconAn name="closecircle" />
                        </TouchableOpacity>
                    }
                    placeholder="Cari Nama Produk"
                    containerStyle={{
                        width:"90%",
                        marginRight:10,
                        marginBottom:0
                    }}
                />
                <TouchableOpacity>
                    <Text style={{
                        color:"red",
                        marginTop:15
                    }}>Batal</Text>  
                </TouchableOpacity>
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
                    { product_mock.map((item,index) => {
                        return(
                            <ProdukItem key={`produckt_${index}`} />
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