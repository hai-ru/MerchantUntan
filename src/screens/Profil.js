import { useFocusEffect, useNavigation } from "@react-navigation/native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View,Image } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import IconAn from "react-native-vector-icons/AntDesign"
import ImagePicker from 'react-native-image-crop-picker'
import Toast from 'react-native-toast-message'
// import { AppContext } from "../contexts/AppContext"
// import AsyncStorage from "@react-native-async-storage/async-storage"

import MyTextInput from "../components/MyTextInput"
import MyButton from "../components/MyButton"
import { AppContext } from "../contexts/AppContext"
import Header from "../components/MyHeader"
import style from "../styles"
import Modals from "../components/Modals"
import helper from "../helpers/helper"

const Profil = props => {

    const {getFileExtension, uploadFile, ProfilData} = useContext(AppContext)

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)

    const [pictureUp,setPictureUp] = useState(false)
    const [picture_url,setPictureUrl] = useState("")

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [hp,setNohp] = useState("")
    const [merchant,setMerchant] = useState("")
    const [merchantDescription,setMerchantDescription] = useState("")

    const picture_size = {
        width:300,
        height:400
    }

    const filepicker = (type) => {
        if(type){
            ImagePicker.openPicker({
                width: picture_size.width,
                height: picture_size.height,
                cropping: true
            })
            .then(image => {
                console.log(image);
                fileUploader(image);
            })
            .catch(e => console.log("image failed >> ",e))
        } else {
            ImagePicker.openCamera({
                width: picture_size.width,
                height: picture_size.height,
                cropping: true,
            })
            .then(image => {
                fileUploader(image);
            })
            .catch(e => console.log("image failed >> ",e))
        }
    }

    const fileUploader = async (image) => {
        const type_file = getFileExtension(image.path);
        setLoading(true)
        const result = await uploadFile(image.path,"image/"+type_file);
        setLoading(false)
        // console.log(result,type_file,image);
        if(!result) return;
        setPictureUrl(result.data.url)
        setPictureUp(false)
    }

    const fetchData = async () => {
        setLoading(true)
        const result = await ProfilData({update:0})
        setLoading(false)
        if(!result.status) return;
        console.log(result)
        setPictureUrl(result.merchant.image)
        setName(result.user.name)
        setEmail(result.user.email)
        setNohp(result.user.no_hp)
        setMerchant(result.merchant.name)
        setMerchantDescription(result.merchant.description)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const _refresh = () => {
        // setLoading(true)
        // setTimeout(()=>setLoading(false),2000)
        fetchData();
    }

    const validation = json => {
        let callback = {status:true,message:"OK"}
        if(helper.isNull(json.name)){
            callback.status = false;
            callback.message = "Silahkan isi nama lengkap";
            setOpen(true)
        }
        if(helper.isNull(json.email)){
            callback.status = false;
            callback.message = "Silahkan isi email";
        }
        if(helper.isNull(json.hp)){
            callback.status = false;
            callback.message = "Silahkan isi nomor handphone";
        }
        if(helper.isNull(json.merchant_name)){
            callback.status = false;
            callback.message = "Silahkan isi nama merchant";
        }
        return callback;
    }

    const simpan = async () => {
        if(loading) return;
        const input = {
            "name":name,
            "email":email,
            "hp":hp,
            "merchant_name":merchant,
            "merchant_description":merchantDescription,
            "update":1,
            "image":picture_url,
        }
        const v = validation(input);
        if(!v.status) 
        return Toast.show({
            type: 'error',
            text1: 'Informasi',
            text2: v.message,
            position:"bottom"
        });

        setLoading(true)
        const result = await ProfilData(input)
        setLoading(false)
        if(!result.status) return;
        console.log(result)

        Toast.show({
            type: 'success',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });

        // navigation.goBack();
    }

    return(
        <View style={{flex:1}}>  
            <Modals
                visible={pictureUp}
                close={()=>setPictureUp(false)}
                title="Pilih metode pengambilan gambar"
            >
                {
                    loading ?
                        <View>
                            <ActivityIndicator
                                size="large"
                                color={style.color.primary}
                            />
                            <Text style={{
                                textAlign:"center"
                            }}>Sedang memuat...</Text>
                        </View>
                    :
                    <View>
                        <MyButton
                            onPress={()=>filepicker(false)} 
                            text="Buka Kamera"
                            btnStyle={{
                                marginBottom:10,
                                flexDirection:"row"
                            }}
                            leftCom={
                                <Icon 
                                    name="camera" 
                                    size={24}
                                    color="#FFFFFF"
                                    style={{marginRight:10}}
                                />
                            }
                        />
                        <MyButton
                            onPress={()=>filepicker(true)} 
                            text="Pilih dari Galeri"
                            btnStyle={{
                                marginBottom:10,
                                flexDirection:"row"
                            }}
                            leftCom={
                                <Icon 
                                    name="image" 
                                    size={24}
                                    color="#FFFFFF"
                                    style={{marginRight:10}}
                                />
                            }
                        />
                    </View>
                }
            </Modals>
            
            <Header
                text={`Profil saya`}
                leftCom={
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <IconAn 
                            name="arrowleft"
                            size={20}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>
                }
            />
            <ScrollView 
                contentContainerStyle={[
                    styles.sv_container,
                    {
                        paddingHorizontal:20
                    }
                ]}
                refreshControl={
                    <RefreshControl
                    refreshing={loading}
                    onRefresh={_refresh}
                    />
                }
            >
                <TouchableNativeFeedback onPress={()=>{
                    // Alert.alert("Tambah Foto")
                    setPictureUp(true)
                }}>
                    <View style={{
                        marginVertical:20,
                        height:200,
                        width:"48%",
                        borderWidth:1,
                        borderColor:style.color.border,
                        borderRadius:8,
                        elevation:2,
                        backgroundColor:"#FFFFFF",
                        alignSelf:"center",
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        {
                            picture_url !== null &&
                            picture_url !== ""
                            ?
                            <View style={{
                                flex:1,
                                height:"100%",
                                width:"100%",
                            }}>
                                <View style={{
                                    height:40,
                                    width:40,
                                    backgroundColor:style.color.primary,
                                    borderRadius:100,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    position:"absolute",
                                    right:-10,
                                    top:-10,
                                    zIndex:99
                                }}>
                                    <Icon name="camera" size={20} color="#FFFFFF" />
                                </View>
                                <Image 
                                    source={{uri:picture_url}}
                                    style={{
                                        flex:1,
                                        height:"100%",
                                        width:"100%",
                                        borderRadius:8,
                                    }}
                                />
                            </View>
                            :
                            <View style={{
                                flex:1,
                                height:"100%",
                                width:"100%",
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                <Icon name="camera" size={40} />
                                <Text style={{
                                    textAlign:"center",
                                    marginTop:10
                                }}>Foto/Logo{`\n`}Toko</Text>
                            </View>
                        }
                    </View>
                </TouchableNativeFeedback>
                
                <MyTextInput 
                    placeholder="Nama Lengkap"
                    onChangeText={setName}
                    value={name}
                />

                <MyTextInput 
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                />

                <MyTextInput 
                    placeholder="No. HP"
                    onChangeText={setNohp}
                    value={hp}
                />

                <MyTextInput 
                    placeholder="Nama Merchant"
                    onChangeText={setMerchant}
                    value={merchant}
                />

                <MyTextInput 
                    onChangeText={setMerchantDescription}
                    value={merchantDescription}
                    placeholder="Deskripsi Merchant"
                    multiline={true}
                    style={{
                        height:100,
                        textAlignVertical:"top"
                    }}
                />

                <MyButton 
                    text="Simpan"
                    onPress={simpan}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
   hello:{
    color:style.color.text
   },
   sv_container:{
        backgroundColor:"#FFFFFF",
        flexGrow:1
   },
   payment_text:{
        backgroundColor:"#FFFFFF"
    },
    date_txt_container:{
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:5,
        backgroundColor:"#ffffff",
        borderColor:"gray"
    },
    date_txt:{color:"black"},
    range_container:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10
    },
})

export default Profil