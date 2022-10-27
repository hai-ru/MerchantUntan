import React from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import {View,Text, StyleSheet} from "react-native"

export default props => {
    const textColor = props.textColor ?? "#FFFFFF"
    return(
        <View style={[
            styles.container,
            props.style ?? {}
        ]}>
            {
                props.iconName && 
                <Icon 
                    name={props.iconName}
                    color={textColor}
                    size={24}
                    style={styles.icon}
                />
            }
            <View style={styles.detail}>
                <Text style={[
                    styles.text_normal,
                    {
                        fontSize:15,
                        fontWeight:"500",
                        marginBottom:5,
                        color:textColor
                    }
                ]}>{props.title}</Text>
                <Text style={[
                    styles.text_normal,
                    {color:textColor}
                ]}>{props.value}</Text>
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#0074b7",
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        minWidth:"48%",
        marginTop:10,
        elevation:2
        // paddingHorizontal:10,
        // paddingVertical:5,
    },
    detail:{
        flexShrink:1,
        padding:10
    },
    text_normal:{
        color:"#FFFFFF"
    },
    icon:{
        backgroundColor:"#025d93",
        height:"100%",
        paddingTop:"10%",
        paddingHorizontal:10,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        justifyContent:"center",
        alignItems:"center"
    }
})