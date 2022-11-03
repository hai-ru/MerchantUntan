import React, { createContext, 
    useCallback, useRef, useState 
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
// import { CommonActions, useNavigation } from "@react-navigation/native";
// import { Alert } from "react-native";
// import PushNotification from "react-native-push-notification";
// import TcpSocket from 'react-native-tcp-socket';

const AppContext = createContext()

const main_link = "https://merchant.untanpay.com/api/v1/"

const connection = async (path = "",data = {}) => {
    console.log("data >> ",data)
    const token = await AsyncStorage.getItem("token") ?? ""
    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+token,
    }

    return fetch(main_link+path, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(r => r.json())
    .then(response => {
        return response;
    })
    .catch(e => {
        console.log(e);
        return false;
    })
}

const AppProvider = (props) => { 

    const [action_produk,setActionProduk] = useState("Tambah")
    const [type,setType] = useState(false)
    const [forgotPass,setForgot] = useState(false)

    const initFirebase = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
        const token = await messaging().getToken()
        console.log("token",token)
        await AsyncStorage.setItem("fcm_token",token)
        return token;
    }

    const LoginData = params => {
        return connection("logged",params);
    }

    const HomeData = params => {
        return connection("wallet-merchant",params);
    }

    const TransaksiData = params => {
        return connection("trx-merchant",params);
    }
    
    const values = {
        initFirebase,
        type,setType,
        forgotPass,setForgot,
        action_produk,setActionProduk,
        LoginData,
        HomeData,
        TransaksiData
    }

    return(
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}