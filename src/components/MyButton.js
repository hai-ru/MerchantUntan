import React from "react"
import { TouchableNativeFeedback,View,Text, StyleSheet, ActivityIndicator } from "react-native"
import theme from "../styles"

export default props => {
    
    if(props.loading)
    return(
        <View style={[
            styles.outbtn,
            props.btnStyle ?? {},
            {
                backgroundColor:theme.color.primary,
                flexDirection:"row",
                alignItems:"center"
            }
        ]}>
                <ActivityIndicator color="#FFFFFF" size="small" /> 
                <Text style={[styles.txtBtn,props.txtStyle ?? {}]}>
                    {" "} Loading
                </Text>
        </View>
    )
    
    return(
        <TouchableNativeFeedback 
            onPress={props.onPress}
        >
            <View style={[styles.outbtn,props.btnStyle ?? {}]}>
                {props.leftCom ?? null}
                <Text style={[styles.txtBtn,props.txtStyle ?? {}]}>{props.text}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    outbtn:{
        backgroundColor:theme.color.primary,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:10,
        paddingVertical:18,
        borderRadius:5
    },
    txtBtn:{
        color:"#FFFFFF",
        fontWeight:"bold",
        fontSize:15
    }
})