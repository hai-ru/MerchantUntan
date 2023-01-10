import { useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { RefreshControl, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import IconFA from "react-native-vector-icons/FontAwesome5"
import Toast from 'react-native-toast-message'

import Cards from "../components/Cards"
import Header from "../components/MyHeader"
import style from "../styles"
import { AppContext } from "../contexts/AppContext"
import Modals from "../components/Modals"
import MyTextInput from "../components/MyTextInput"
import DropDownPicker from "react-native-dropdown-picker"
import MyButton from "../components/MyButton"

const RekeningBank = props => {

    const { BankList,BankCo,BankStore } = useContext(AppContext)

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)
    const [bankUp,setBankUp] = useState(false)
    const [list,setList] = useState([])
    
    const [bankPickerOpen,setBankPickerOpen] = useState(false)
    const [bankList,setBankList] = useState([])

    const [bankCoId,setBankCoId] = useState(0)

    const [bankId,setBankId] = useState(0)
    const [bankName,setBankName] = useState("")
    const [bankPlaceholder,setBankPlaceholder] = useState("")
    const [bankAccount,setBankAccount] = useState("")

    const fetchData = async () => {
        setLoading(true)
        const result = await BankList()
        const resultBank = await BankCo()
        setLoading(false)
        if(!result.status || !resultBank.status) return;
        setList(result.data)
        const list = resultBank.data.map((item)=>{
            return {"label":item.bank_name,"value":item.id};
        })
        setBankList(list)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const _refresh = () => {
        fetchData()
    }

    const simpan = async () => {
        if(loading) return;
        const input = {
            'id':bankId,
            'bank_name':bankName,
            'bank_account':bankAccount,
            'bank_placeholder':bankPlaceholder,
            'tipe':"merchant",
        }
        setLoading(true)
        const result = await BankStore(input)
        setLoading(false)
        if(!result.status) return Toast.show({
            type: 'error',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });

        fetchData();

        setBankUp(false)

        return Toast.show({
            type: 'success',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });
        
    }

    const deleteData = async (id) => {
        if(loading) return;
        const input = {
            'id':bankId,
            'bank_name':bankName,
            'bank_account':bankAccount,
            'bank_placeholder':bankPlaceholder,
            'tipe':"merchant",
            "delete":1
        }
        setLoading(true)
        const result = await BankStore(input)
        setLoading(false)
        if(!result.status) return Toast.show({
            type: 'error',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });

        fetchData();

        setBankUp(false)

        return Toast.show({
            type: 'success',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });
        
    }

    const editData = item => {
        setBankId(item.id)
        setBankName(item.bank_name)
        setBankPlaceholder(item.bank_placeholder)
        setBankAccount(item.bank_account)
        const res = bankList.find(v => v.label === item.bank_name)
        if(res) setBankCoId(res.value)
        setBankUp(true)
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
            <Modals
                visible={bankUp}
                close={()=>setBankUp(false)}
                title="Data Bank Merchant"
            >
                <View>
                    <DropDownPicker
                        searchable={true}
                        searchPlaceholder="Cari..."
                        searchContainerStyle={{
                            borderBottomColor:"#e8e8e8"
                        }}
                        searchTextInputStyle={{
                            borderColor:"#e8e8e8"
                        }}
                        disabled={loading}
                        open={bankPickerOpen}
                        value={bankCoId}
                        items={bankList}
                        setOpen={setBankPickerOpen}
                        setValue={setBankCoId}
                        onSelectItem={v=>setBankName(v.label)}
                        placeholder="Pilih Bank"
                        style={{
                            borderColor:"#e8e8e8",
                            borderRadius:5,
                            marginBottom:15,
                        }}
                        dropDownContainerStyle={{
                            borderColor:"#e8e8e8",
                        }}
                        placeholderStyle={{
                            color:"gray"
                        }}
                        zIndex={999}
                    />
                    <MyTextInput 
                        placeholder="Nomor Rekening"
                        onChangeText={setBankAccount}
                        value={bankAccount}
                        keyboardType="decimal-pad"
                    />
                    <MyTextInput 
                        placeholder="Atas Nama"
                        onChangeText={setBankPlaceholder}
                        value={bankPlaceholder}
                    />
                    <MyButton
                     onPress={simpan} 
                     text="Simpan"
                     loading={loading}
                    />
                </View>
            </Modals>
            <Header
                text="Rekening Bank"
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
                        setBankId(0)
                        setBankName("")
                        setBankPlaceholder("")
                        setBankAccount("")
                        setBankUp(true)
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
                paddingHorizontal:20
            }}>

                <Text style={[styles.hello,
                    {
                        marginTop:10,
                        fontWeight:"500",
                        fontSize:17
                    }
                ]}>Daftar Rekening Bank</Text>
                {
                    list.map((item,index) => {
                        return(
                            <Cards
                                style={styles.payment_text}
                                textColor="#000000"
                                key={`rekbank_${index}`}
                            >
                                <View style={{
                                    flexDirection:"row",
                                    paddingVertical:8,
                                    paddingHorizontal:15
                                }}>
                                    <View style={{
                                        flexGrow:1
                                    }}>
                                        <Text>{item.bank_name}</Text>
                                        <Text>{item.bank_account}</Text>
                                        <Text>{item.bank_placeholder}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={()=>editData(item)}>
                                            <IconFA name="pencil-alt" size={16} style={{marginBottom:22}} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>deleteData(item.id)}>
                                            {
                                                loading ?
                                                <ActivityIndicator size="small" />
                                                :
                                                <IconFA name="trash" size={16} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
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

export default RekeningBank