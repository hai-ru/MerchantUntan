import React from "react"
import { View, Text,Image } from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import style from "../styles"

export default props => {
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
            <Image 
                source={{uri:"https://merchant.untanpay.com/storage/photo_product/iEMssKHmyyRhOcQTmV0tiLo1kSxf9sVVBKvfZfYA.jpeg"}}
                style={{
                    height:200,
                    width:"100%",
                    resizeMode:"contain"
                }}
            />
            <View style={{
                padding:10
            }}>
                <Text style={{
                    color:"#000000"
                }}>Nama Produk</Text>
                <Text style={{ 
                    fontWeight:"500",
                    color:"#000000",
                    marginVertical:10
                }}>Rp. 0</Text>
                <Text>
                    <Icon 
                        color={style.color.star_color} 
                        name="star" 
                        size={16}
                    /> 
                    {" "} 5.0 | Terlayani (5000)
                </Text>
            </View>
        </View>
    )
}