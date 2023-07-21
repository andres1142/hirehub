import * as ImagePicker from 'expo-image-picker';
import { View,
        Text,
        TextInput,
        TouchableOpacity,
        ActivityIndicator,
        Platform
} from "react-native";
import { appSignUp } from "../../store";
import { useRouter} from "expo-router";
import { PaperClipIcon } from "react-native-heroicons/outline";
import { useState } from "react";

import {createUserWithEmailAndPassword} from "firebase/auth";



function Form({isCompany}) {
    const router = useRouter()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [profilePic, setProfilePic] = useState({image: null, loading: false})

    const[error, setError] = useState('')

    const handleCreateAccount = async () => {
        const curError = checkFields()
        console.log(curError)
        if(curError?.length === 0) {
            try {
                const result = await appSignUp(email, password, name, description, zipCode, isCompany, profilePic.image)
                if (result?.user) {
                    router.replace('/(tabs)/home')
                } else {
                    setError(result?.error)
                }
            } catch (e) {
                console.log(e)
                setError(e.message)
            }
        } else {
            setError(curError)
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
            if (!result.canceled) {
                setProfilePic({image: result.assets[0].uri, loading: false})
            }
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
            || name.length === 0 || description.length === 0 || zipCode.length === 0 || profilePic.image === null) {
            return 'Please fill out all fields'
        }
        if (email.indexOf('@') === -1) {
            return 'Invalid Email'
        }
        if (password !== confirmPass) {
            return 'Passwords do not match'
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters'
        }
        if (zipCode.length !== 5) {
            return 'Invalid Zip Code'
        }
        return ''
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
                    //Check if profile pic is loading or not
                    profilePic.loading ?
                        <View className={'pb-4'}>
                            <ActivityIndicator color={'#EBF3F7'}/>
                        </View>
                        :
                        <TouchableOpacity
                            className={'flex-row justify-center'}
                            onPress={handleUploadPicture}>

                            <View
                                className={'px-0.5'}>
                                <PaperClipIcon color={profilePic.image === null ? 'black': 'white'} size={20}/>
                            </View>
                            <View
                                className={'pb-4'}>
                                { profilePic.image === null && !profilePic.loading ?
                                    <Text
                                        className={'text-center'}>
                                        {
                                            isCompany ? "Upload Logo or Profile Picture" : "Upload Picture"
                                        }
                                    </Text>
                                    :
                                    <Text
                                        className={'pb-4 text-center text-primary'}>
                                        Picture Uploaded
                                    </Text>
                                }
                            </View>
                        </TouchableOpacity>
                }
            </View>

            {
                error.length > 0 ? <Text className={'text-red-500 text-center'}>{error}</Text> : null
            }

            <TouchableOpacity
                onPress={handleCreateAccount}
                className='mb-6 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'  >
                <Text className='text-lg text-white'>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

export { Form }
