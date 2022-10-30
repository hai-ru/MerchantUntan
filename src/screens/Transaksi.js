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
import moment from "moment"
import DatePicker from 'react-native-date-picker'

const Transaksi = props => {

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const [type,setType] = useState(0)
    const [date,setDate] = useState({
        start: moment(),
        end: moment().add(7,"days")
    })

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

                    const diff = moment(dates.end).diff(moment(dates.start), 'days');
                    console.log("diff",diff)
                    if(diff >= limit_chart)
                    return Alert.alert("Info","Maksimal "+limit_chart+" hari");

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