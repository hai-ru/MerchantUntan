import { useNavigation } from "@react-navigation/native"
import React, { useContext } from "react"
import { View, Text,Image, TouchableNativeFeedback } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import { AppContext } from "../contexts/AppContext"
import style from "../styles"
import helper from "../helpers/helper.js"

const ProdukItem = props => {
    const navigation = useNavigation()
    const { setActionProduk } = useContext(AppContext)
    const {data} = props

    let image = require("../assets/images/placeholder-images-image_large.webp")
    if( helper.validURL(data.picture) ){
        image = {uri:data.picture}
    }

    return(
        <TouchableNativeFeedback onPress={()=>{
            setActionProduk("Ubah")
            navigation.navigate("ProdukEditor",{
                data:data
            })
        }}>
            <View style={{
                width:"48%",
                borderWidth:1,
                borderColor:style.color.border,
                borderRadius:8,
                elevation:2,
                backgroundColor:"#FFFFFF",
                marginTop:15
            }}>
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
    )
}

export default ProdukItem