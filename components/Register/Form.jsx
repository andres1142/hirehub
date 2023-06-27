import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Platform} from "react-native";
import {getAuthentication} from "../../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Form({isCompany}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [profilePic, setProfilePic] = useState({image: null, loading: false})

    const[error, setError] = useState('')


    const handleCreateAccount = () => {
        debugger
        setError(checkFields())
        console.log(error)
        if (error.length === 0) {
            let user
            const auth = getAuthentication()
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user
                    debugger
                })
                .catch((error) => {
                    setError(error.code)
                });
            if (user === undefined) {
                alert('Invalid Credentials')
            } else {

            }
        }
    }

    const handleUploadPicture = async () => {
        try {
            await pickImage()
        } catch (e) {
            console.log(e)
        }
    }

    const pickImage = async () => {
        setProfilePic({image: null, loading: true})
        if (await checkPermissions()) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            })
            debugger
            console.log(result.assets[0])
            if (!result.canceled) {
                setProfilePic({image: result.assets[0].uri, loading: false})
            }
            console.log(profilePic)
        }
    }

    const checkPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!')
                setProfilePic({image: null, loading: false})
                return false
            }
            return true
        }
    }

    const checkFields= () => {
        if(email.length === 0 || password.length === 0 || confirmPass.length === 0
            || name.length === 0 || description.length === 0 || zipCode.length === 0) {
            return 'Please fill out all fields'
        }
        if (password !== confirmPass) {
            return 'Passwords do not match'
        }
    }

    return (
        <View className={'px-12 mt-5'}>
            <View>
                <TextInput
                    className='mb-6 px-3 h-9 bg-white rounded-full shadow-md  shadow-slate-500'
                    placeholder={isCompany ? 'Company Name' : 'Name'}
                    placeholderTextColor='gray'
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <TextInput
                    className='mb-6 px-3 h-9 bg-white rounded-full shadow-md shadow-slate-500'
                    placeholder='Email'
                    placeholderTextColor='gray'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    className='mb-6 px-3 h-9 bg-white rounded-full shadow-md  shadow-slate-500'
                    placeholder='Password'
                    placeholderTextColor='gray'
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    className='mb-6 px-3 h-9 bg-white rounded-full shadow-md  shadow-slate-500'
                    placeholder='Confirm Password'
                    placeholderTextColor='gray'
                    value={confirmPass}
                    secureTextEntry
                    onChangeText={text => setConfirmPass(text)}
                />
                <TextInput
                    className='mb-6 px-3 h-9 bg-white rounded-full shadow-md  shadow-slate-500'
                    placeholder='Zip Code'
                    placeholderTextColor='gray'
                    value={zipCode}
                    maxLength={5}
                    onChangeText={text => setZipCode(text)}
                />
                <TextInput
                    className='mb-8 px-3 h-20 bg-white rounded-2xl shadow-md  shadow-slate-500'
                    placeholder={isCompany ? 'Company Description' : 'Description & Hobbies'}
                    placeholderTextColor='gray'
                    multiline
                    numberOfLines={3}
                    blurOnSubmit={true}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

                {
                    profilePic.loading ? <Text>Loading...</Text> : null
                }
                <Text
                    onPress={handleUploadPicture}
                    className={'pb-4 text-center'}>
                        {profilePic.image === null ? isCompany ? "Upload Logo or Profile Picture" : "Upload Picture" : "Image Uploaded"}
                </Text>
            </View>

            <TouchableOpacity
                onPress={handleCreateAccount}
                className='mb-6 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'  >
                <Text className='text-lg text-white'>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

export { Form }
