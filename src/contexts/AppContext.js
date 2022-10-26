import React, { createContext, 
    // useCallback, useRef, useState 
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
// import { CommonActions, useNavigation } from "@react-navigation/native";
// import { Alert } from "react-native";
// import PushNotification from "react-native-push-notification";
// import TcpSocket from 'react-native-tcp-socket';

const AppContext = createContext()


const AppProvider = (props) => { 

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
    }
    
    const values = {
        initFirebase
    }

    return(
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}