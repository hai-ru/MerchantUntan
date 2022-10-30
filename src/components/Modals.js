import React from "react";
import Modal from "react-native-modal";
import {View,Text,StyleSheet, TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/AntDesign";

const Modals = props => {

    return(
        <Modal
            isVisible={props.visible}
            backdropColor="rgba(0, 0, 0,0.8)"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            onBackdropPress={props.close}
        >
             <View style={styles.content}>
                <TouchableOpacity 
                    onPress={props.close}
                    style={styles.close_icon}
                >
                    <Icon name="close" size={30} />
                </TouchableOpacity>
                <Text style={styles.title}>{props.title}</Text>
                {props.children}
            </View>
        </Modal>
    )
}

export default Modals


const styles = StyleSheet.create({
    content: {
      backgroundColor: 'white',
      padding: 22,
      borderRadius: 4,
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        color:"black",
        textAlign:"center",
        marginBottom:10
    },
    close_icon:{
        alignSelf:"flex-end"
    },
});