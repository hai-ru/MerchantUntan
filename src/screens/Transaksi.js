import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Cards from "../components/Cards"
import Header from "../components/MyHeader"
import style from "../styles"
import moment from "moment/min/moment-with-locales";
import Lottie from 'lottie-react-native';

import DatePicker from 'react-native-date-picker'
import { AppContext } from "../contexts/AppContext"

const Transaksi = props => {
    
    moment.locale("id")

    const navigation = useNavigation()
    const {TransaksiData} = useContext(AppContext)

    const [loading,setLoading] = useState(false)
    const [trxList,setTrxList] = useState([])
    const [open,setOpen] = useState(false)
    const [type,setType] = useState(0)
    const [date,setDate] = useState({
        start: moment(),
        end: moment()
    })

    const fetchData = async () => {
        const format = "yyyy-MM-DD"
        const params = {
            start:date.start.format(format),
            end:date.end.format(format)
        }
        // console.log("params",params)
        const result = await TransaksiData(params)
        console.log("result",result)
        if(!result || !result?.status)
        return null

        setTrxList(result?.transaction)
    }

    useEffect(()=>{
        fetchData();
    },[])

    useEffect(()=>{
        fetchData();
    },[date])

    

    const _refresh = () => {
        setLoading(true)
        setTimeout(()=>setLoading(false),2000)
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
                text="Transaksi"
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

            <DatePicker
                modal
                mode="date"
                open={open}
                date={date.end.toDate()}
                onConfirm={(d) => {
                    setOpen(false)
                    let dates = {...date}
                    type === 0 ?
                    dates.start = moment(d)
                    :
                    dates.end = moment(d)
                    setDate(dates)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <View style={{
                padding:20
            }}>

                <Text style={[styles.hello,
                    {
                        marginTop:10,
                        fontWeight:"500",
                        fontSize:17
                    }
                ]}>Tanggal Transaksi</Text>

            <View style={styles.range_container}>
                <TouchableOpacity 
                    onPress={()=>{
                        setType(0)
                        setOpen(true)
                    }}
                    style={styles.date_txt_container}
                >
                    <Text style={styles.date_txt}>{date.start.format("DD/MM/yyyy")}</Text>
                </TouchableOpacity>
                <Text>{" - "}</Text>
                <TouchableOpacity 
                style={styles.date_txt_container}
                onPress={()=>{
                    setType(1)
                    setOpen(true)
                }}>
                    <Text style={styles.date_txt}>{date.end.format("DD/MM/yyyy")}</Text>
                </TouchableOpacity>
            </View>

                <Text style={[styles.hello,
                    {
                        marginTop:10,
                        fontWeight:"500",
                        fontSize:17
                    }
                ]}>Daftar Transaksi</Text>
                {
                    trxList?.length === 0 &&
                    <View>
                        <Lottie 
                            source={require("../assets/lotties/no-transaction-history.json")} 
                            autoPlay 
                            loop
                        />
                        <Text>Ayo buat transaksi pertama mu..</Text>
                    </View>
                }
                {
                    trxList?.map((item,index)=>{
                        return(
                            <Cards
                                key={`trx_item_${index}`}
                                style={styles.payment_text}
                            >
                                <Text style={{
                                    color:"#000000",
                                    flexGrow:1
                                }}>
                                    Jenis Transaksi : {item.jenis}
                                    {/* {" "}{item?.pengirim ?? "-"} */}
                                    {/* {" "}{item?.pengirim ?? "-"} */}
                                    {"\n\n"+moment(item.created_at).format("dddd, DD/MM/yyyy hh:mm:ss")}
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

export default Transaksi