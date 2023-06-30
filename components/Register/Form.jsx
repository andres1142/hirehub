import * as ImagePicker from 'expo-image-picker';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Platform} from "react-native";
import {PaperClipIcon} from "react-native-heroicons/outline";
import {useState} from "react";
import {getAuthentication, getStorage, getFirestore} from "../../firebaseConfig";

import {createUserWithEmailAndPassword} from "firebase/auth";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {collection, addDoc} from "firebase/firestore";


function Form({isCompany}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [profilePic, setProfilePic] = useState({image: null, loading: false})

    const[error, setError] = useState('')


    const handleCreateAccount = async () => {
        setError(checkFields())
        console.log(error)
        if (error.length === 0) {
            let user
            const auth = getAuthentication()
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user
                })
                .catch((error) => {
                    setError(error.message)
                });

            if (user === undefined) {
                alert(error)
            } else {
                await storeUserData(user)
            }
        }
    }

    const storeUserData = async (user) => {
        const storage = getStorage()
        const storageRef = ref(storage, 'users/' + user.uid + '/profilePicture')
        try {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", profilePic.image, true);
                xhr.send(null);
            });
            const result = await uploadBytes(storageRef, blob);
            blob.close()

            const downloadURL = await getDownloadURL(storageRef)
            console.log(downloadURL)

            debugger
            const db = getFirestore()
            const docRef = await addDoc(collection(db,'users'),{
                name: name,
                email: email,
                description: description,
                zipCode: zipCode,
                profilePicture: downloadURL,
                isCompany: isCompany
            })
                .then(() => {
                    console.log("Document successfully written!");
                    alert('Account Created')
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
        } catch (e) {
            console.log(e)
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
        if (email.indexOf('@') === -1) {
            return 'Invalid Email'
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

            <TouchableOpacity
                onPress={handleCreateAccount}
                className='mb-6 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'  >
                <Text className='text-lg text-white'>Create Account</Text>
            </TouchableOpacity>
        </View>
    )
}

export { Form }
