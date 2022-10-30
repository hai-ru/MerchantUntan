import React, { useContext, useEffect } from "react"
import {View,Text} from "react-native"
import { AppContext } from "../contexts/AppContext"
import Modals from "./Modals"
import MyButton from "./MyButton"
import MyTextInput from "./MyTextInput"

export default props => {

    const {
        forgotPass,setForgot
    } = useContext(AppContext)

    // useEffect(()=>console.log(forgotPass),[forgotPass])

    return(
        <Modals 
            visible={forgotPass}
            close={()=>setForgot(false)}
            title="Lupa Password"
        >
            <MyTextInput 
                placeholder="Email"
            />
            <MyButton
                // loading={loading}
                // onPress={_login} 
                text="Kirim"
                // btnStyle={{
                //     paddingVertical:15,
                //     marginTop:20
                // }}
            />
        </Modals>
    )
}