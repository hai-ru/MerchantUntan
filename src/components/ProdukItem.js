import { useNavigation } from "@react-navigation/native"
import React, { useContext, useState } from "react"
import { View, Text,Image, TouchableNativeFeedback,Alert, ActivityIndicator } from "react-native"
import Toast from 'react-native-toast-message'

// import Icon from "react-native-vector-icons/AntDesign"
import IconF from "react-native-vector-icons/FontAwesome5"
import { AppContext } from "../contexts/AppContext"
import style from "../styles"
import helper from "../helpers/helper.js"

const ProdukItem = props => {
    const navigation = useNavigation()
    const { setActionProduk, ProdukStore } = useContext(AppContext)
    const {data,refresh} = props

    const [loading,setLoading] = useState(false)

    let image = require("../assets/images/placeholder-images-image_large.webp")
    if( helper.validURL(data.picture) ){
        image = {uri:data.picture}
    }

    const deleteData = async (id) => {
        if(loading) return;
        setLoading(true)
        const result = await ProdukStore({
            "product_id":id,
            "delete":true
        })
        setLoading(false)
        refresh()
        Toast.show({
            type: 'success',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });
    }

    return(
            <View style={{
                width:"48%",
                borderWidth:1,
                borderColor:style.color.border,
                borderRadius:8,
                elevation:2,
                backgroundColor:"#FFFFFF",
                marginTop:15
            }}>
                <TouchableNativeFeedback onPress={()=>deleteData(data.id)}>
                    <View style={{
                        position:"absolute",
                        right:-5,
                        top:-5,
                        zIndex:9999,
                        backgroundColor:style.color.primary,
                        padding:10,
                        borderRadius:100
                    }}>
                        {
                            loading ? 
                            <ActivityIndicator color="#FFFFFF" />
                            :
                            <IconF name="trash" color="#FFFFFF" />
                        }
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>{
                    if(loading) return;
                    setActionProduk("Ubah")
                    navigation.navigate("ProdukEditor",{
                        data:data
                    })
                }}>
                    <View>
                        <Image 
                            source={image}
                            style={{
                                height:200,
                                width:"100%",
                                resizeMode:"cover"
                            }}
                        />
                        <View style={{
                            padding:10
                        }}>
                            <Text style={{
                                color:"#000000"
                            }}>{data.name}</Text>
                            <Text style={{ 
                                fontWeight:"500",
                                color:"#000000",
                                marginVertical:10
                            }}>Rp. {data.price}</Text>
                            {/* <Text>
                                <Icon 
                                    color={style.color.star_color} 
                                    name="star" 
                                    size={16}
                                /> 
                                {" "} 5.0 | Terlayani (5000)
                            </Text> */}
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
    )
}

export default ProdukItem