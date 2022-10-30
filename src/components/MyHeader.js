import { useNavigation } from "@react-navigation/native"
import React, { useContext } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { AppContext } from "../contexts/AppContext"
import theme from "../styles"


const Head = props => {
    
    // const navigation = useNavigation()

    const {status} = useContext(AppContext)

    return(
        <View style={styles.header_container}>
            {props.leftCom ?? <></>}
            <Text style={styles.header_txt}>{props.text ?? ""}</Text>
            {props.rightCom ?? <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    header_container:{
        paddingTop:40,
        paddingVertical:20,
        paddingHorizontal:20,
        backgroundColor:theme.color.primary,
        flexDirection:"row",
        alignItems:"center",
    },
    header_txt:{
        marginLeft:15,
        color:"#FFFFFF",
        fontWeight:"bold",
        fontSize:16,
        flexGrow:1
    },
})

export default Head