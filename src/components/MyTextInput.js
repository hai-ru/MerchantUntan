import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

export default props => {
    return(
        <View style={[styles.container,props.containerStyle ?? {}]}>
            {props.leftCom}
            <TextInput 
                {...props}
                style={[styles.input,props.style ?? {}]}
            />
            {props.rightCom}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFFFFF",
        marginBottom:15,
        paddingHorizontal:15,
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        borderColor:"#e8e8e8",
        borderWidth:1
    },
    input:{
        flexGrow:1
    }
})