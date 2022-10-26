import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import IconEn from "react-native-vector-icons/Entypo"
import Header from "../components/MyHeader"
import { AppContext } from "../contexts/AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import {getPOST,getCounter} from "../contexts/constants"

const Home = props => {

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)

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
                text="Home"
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
   btn_action_container:{
        alignItems:"center",
        justifyContent:"center",
        borderRightWidth:1,
        padding:15,
        flex:1,
        borderColor:"#e0e0e0",
        borderRightWidth:1
    },
    btn_action_txt:{
        color:"black",
        textAlign:"center"
    },
    btn_action_cta_container:{
        backgroundColor:"#FFFFFF",
        marginTop:20,
        borderRadius:5,
        elevation:2,
        flexDirection:"row"
    },
    ticket_container:{
        backgroundColor:"#FFFFFF",
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:15,
        marginHorizontal:20
    },
    ticket_logo_container:{
        backgroundColor:"green",
        height:"100%",
        padding:15,
        alignItems:"center",
        paddingTop:"8%",
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    },
    ticket_txt_container:{
        flexGrow:1,
        flexShrink:1,
        padding:15,
    },
    ticket_txt:{
        color:"black",
        marginBottom:10,
    },
    ticket_nomor:{
        fontSize:25,
        fontWeight:"bold"
    },
    ticket_tgl:{
        fontSize:14,
        fontWeight:"bold"
    },
    data_antrian:{
        color:"black",
        fontWeight:"bold",
        fontSize:20,
        marginBottom:10,
        marginHorizontal:25,
        marginTop:20
    },
    sv_container:{ 
        flexGrow: 1,
        // paddingHorizontal:25
    },
    main_card_container:{
        marginTop:30,
        borderRadius:5,
        backgroundColor:"#FFFFFF",
        elevation:1
    },
    main_card_header:{
        backgroundColor:"green",
        padding:10,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    main_card_header_text:{
        color:"#FFFFFF",
        fontSize:20,
        textAlign:"center"
    },
    main_card_footer:{
        backgroundColor:"green",
        padding:10,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
    main_card_footer_text:{
        textAlign:"center",
        color:"#FFFFFF"
    },
    main_card_body:{padding:20},
    normal_text:{
        textAlign:"center",
        color:"black"
    },
    current_no:{
        textAlign:"center",
        color:"black",
        fontSize:40,
        fontWeight:"bold",
        marginTop:15
    }
})

export default Home