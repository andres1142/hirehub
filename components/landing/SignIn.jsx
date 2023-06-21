import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleLogIn() {
        console.log(email)
        console.log(password)

        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <View >
            <View className='flex-none items-center'>
                <Text style={{ fontFamily: 'Lobster' }} className={'pb-20 text-7xl text-white shadow-sm shadow-black'}>HireHub</Text>
            </View>


            <View>
                <TextInput
                    className='mb-6 px-3 h-9 bg-white rounded-full shadow-md shadow-slate-500'
                    placeholder='Username'
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
                <TouchableOpacity
                    onPress={handleLogIn}
                    className='mb-6 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'>
                    <Text className='text-lg text-white'>Log In</Text>
                </TouchableOpacity>

                <View className='mb-6 flex-none items-center'>
                    <Text className='mb-1'>Forgot Password?</Text>
                    <Text className='mb-1 text-white'>Or</Text>

                    <View className='flex-row items-center'>
                        <View className='w-32 mr-5 border border-t border-white'></View>
                        <Text>Sign Up</Text>
                        <View className='w-32 ml-5 border border-t border-white'></View>
                    </View>
                </View>

                <TouchableOpacity
                    className='mb-6 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'  >
                    <Text className='text-lg text-white'>Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SignIn;
