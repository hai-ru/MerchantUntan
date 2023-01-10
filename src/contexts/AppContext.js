import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { CommonActions, useNavigation } from "@react-navigation/native";

const AppContext = createContext()

const main_link = "https://merchant.untanpay.com/api/v1/"

const AppProvider = (props) => { 

    const [action_produk,setActionProduk] = useState("Tambah")
    const [type,setType] = useState(false)
    const [forgotPass,setForgot] = useState(false)

    const navigation = useNavigation()
    
    const connection = async (path = "",data = {}) => {
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
            navigation?.dispatch(
                CommonActions.reset({
                    index:0,
                    routes: [
                        { name: 'Login' }
                    ]
                })
            )
            return false;
        })
    }

    const initFirebase = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
        const token = await messaging().getToken()
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

    const ProdukData = params => {
        return connection("product-merchant",params);
    }

    const KategoriData = params => {
        return connection("product-merchant/category",params);
    }

    const ProdukStore = params => {
        return connection("product-merchant/store",params);
    }

    const BankList = params => {
        return connection("bank-merchant",params);
    }
    const BankCo = params => {
        return connection("bank",params);
    }
    
    const BankStore = params => {
        return connection("bank-merchant/store",params);
    }

    const ProfilData = params => {
        return connection("myprofile",params);
    }

    const getFileExtension = filename => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    const uploadFile = async (path,type) => {

        const photo = {
            uri: path,
            type: type,
            name: 'file.'+type,
        };
          
        let form = new FormData();
        form.append("file", photo);

        const token = await AsyncStorage.getItem("token") ?? ""

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization' : 'Bearer '+token,
        }
          
        return fetch(
        main_link + 'upload',
        {
            body: form,
            method: "POST",
            headers: headers
        }
        ).then((response) => response.json())
        .catch((error) => {
            // alert("ERROR ",error)
            console.log("ERROR >> ",error)
            return false;
        })
        .then((responseData) => {
            return responseData;
        });
    }
    
    const values = {
        initFirebase,
        type,setType,
        forgotPass,setForgot,
        action_produk,setActionProduk,
        LoginData,
        HomeData,
        TransaksiData,
        ProdukData,
        uploadFile,
        getFileExtension,
        KategoriData,
        ProdukStore,
        BankList,
        BankCo,
        BankStore,
        ProfilData
    }

    return(
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}