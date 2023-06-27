import { useState } from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {getAuthentication} from "../../firebaseConfig";
import {createUserWithEmailAndPassword} from "firebase/auth";

function Form({isCompany}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [profilePic, setProfilePic] = useState(null)

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
                    user = userCredential.user;
                    debugger
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            if (user === undefined) {
                alert('Invalid Credentials')
            } else {
                alert('Welcome')
            }
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
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

                <Text
                    onPress={() => alert('Upload Picture')}
                    className={'pb-4 text-center'}>Upload Picture</Text>
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
