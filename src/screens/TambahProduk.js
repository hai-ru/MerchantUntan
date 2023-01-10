import { useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { RefreshControl,ActivityIndicator, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, Image } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import IconAn from "react-native-vector-icons/AntDesign"
import ImagePicker from 'react-native-image-crop-picker'
import AsyncStorage from "@react-native-async-storage/async-storage"
import DropDownPicker from "react-native-dropdown-picker"
import Toast from 'react-native-toast-message'

import Header from "../components/MyHeader"
import style from "../styles/"
import MyTextInput from "../components/MyTextInput"
import MyButton from "../components/MyButton"
import { AppContext } from "../contexts/AppContext"
import Modals from "../components/Modals"
import helper from "../helpers/helper"

const TambahProduk = props => {

    const {
        action_produk,
        uploadFile,
        getFileExtension,
        KategoriData,
        ProdukStore,
    } = useContext(AppContext)

    const navigation = useNavigation()
    const [loading,setLoading] = useState(false)
    
    const [pictureUp,setPictureUp] = useState(false)
    const [picture_url,setPictureUrl] = useState("")
    const [open, setOpen] = useState(false);

    const [id,setID] = useState(0)
    const [nama,setNama] = useState("")
    const [harga,setHarga] = useState("")
    const [description,setDescription] = useState("")
    const [categoryList,setCategoryList] = useState([])
    const [category,setCategory] = useState(null)


    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        console.log("data >> ",props.route.params)
        if(props.route.params.data){
            const {data} = props.route.params
            setNama(data.name)
            setDescription(data.description)
            setHarga(data.price)
            setPictureUrl(data.picture)
            setCategory(data.category_id)
            setID(data.id)
        } else {
            clearForm()
        }
    },[props.route.params])

    const fetchData = async () => {
        setLoading(true)
        const result = await KategoriData()
        setLoading(false)
        if(!result.status) return;
        console.log(result)
        const list = result.data.map(item => {return {"label": item.name, "value": item.id}})
        list.unshift({"label": "Pilih Kategori Produk", "value": null})
        setCategoryList(list)
    }

    const clearForm = () => {
        setNama("")
        setDescription("")
        setHarga("")
        setPictureUrl("")
        setCategory(null)
        setID(0)
    }

    const picture_size = {
        width:300,
        height:400
    }

    const _refresh = () => {
        setLoading(true)
        setTimeout(()=>setLoading(false),2000)
    }

    const validation = json => {
        let callback = {status:true,message:"OK"}
        if(helper.isNull(json.category_id)){
            callback.status = false;
            callback.message = "Silahkan pilih kategori produk";
            setOpen(true)
        }
        if(helper.isNull(json.name)){
            callback.status = false;
            callback.message = "Silahkan isi nama produk";
        }
        if(helper.isNull(json.price)){
            callback.status = false;
            callback.message = "Silahkan isi harga produk";
        }
        if(helper.isNull(json.picture)){
            callback.status = false;
            callback.message = "Silahkan pilih foto";
        }
        return callback;
    }

    const simpan = async () => {
        if(loading) return;
        const tipe = await AsyncStorage.getItem("tipe")
        const input = {
            "product_id":id,
            "name":nama,
            "description":description,
            "picture":picture_url,
            "price":harga,
            "category_id":category,
            "tipe":tipe
        }
        const v = validation(input);
        if(!v.status) 
        return Toast.show({
            type: 'error',
            text1: 'Informasi',
            text2: v.message,
            position:"bottom"
        });

        let price = parseInt(harga);
        price = isNaN(price) ? 0 : price;
        setHarga(price)
        input.price = price

        setLoading(true)
        const result = await ProdukStore(input)
        setLoading(false)
        if(!result.status) return;


        Toast.show({
            type: 'success',
            text1: 'Informasi',
            text2: result.message,
            position:"bottom"
        });
        navigation.navigate("Produk",{})
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
                text={`${action_produk} Produk`}
                leftCom={
                    <TouchableOpacity onPress={()=> navigation.navigate("Produk")}>
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
                        picture_url !== "" ?
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
                                <Text>Foto Produk</Text>
                            </View>
                        }
                    </View>
                </TouchableNativeFeedback>

                <DropDownPicker
                    disabled={loading}
                    open={open}
                    value={category}
                    items={categoryList}
                    setOpen={setOpen}
                    setValue={setCategory}
                    placeholder="Pilih Kategori Produk"
                    style={{
                        borderColor:"#e8e8e8",
                        borderRadius:5,
                        marginBottom:15,
                    }}
                    dropDownContainerStyle={{
                        borderColor:"#e8e8e8",
                    }}
                    placeholderStyle={{
                        color:"gray"
                    }}
                    zIndex={999}
                />
                
                <MyTextInput 
                    placeholder="Nama Produk"
                    onChangeText={setNama}
                    value={nama}
                />

                <MyTextInput 
                    placeholder="Harga Produk (Rp)"
                    keyboardType="decimal-pad"
                    onChangeText={text=>{
                        text = text.replace(/\D/g, "");
                        setHarga(text)
                    }}
                    value={harga+""}
                />

                <MyTextInput 
                    placeholder="Deskripsi Produk"
                    multiline={true}
                    onChangeText={setDescription}
                    value={description}
                    style={{
                        height:100,
                        textAlignVertical:"top"
                    }}
                />

                <MyButton
                    loading={loading} 
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

export default TambahProduk