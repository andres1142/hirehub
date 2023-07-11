import { useState } from 'react';
import { useRouter, Stack } from "expo-router";
import {View, Text, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { AuthStore, appSignIn } from "../../store";

function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogIn() {
        try {
            const result = await appSignIn(email, password);
            if (result?.user) {
                router.replace('/(tabs)/home');
            } else {
                alert('Invalid credentials');
            }
        } catch (e) {
            console.error("Error logging in", e)
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-secondary justify-center'>
            <Stack.Screen
                options={{animation: 'none'}}
            />

            <View >
                <View className='flex-none items-center'>
                    <Text style={{ fontFamily: 'Lobster' }} className={'pb-20 text-7xl text-white shadow-sm shadow-black'}>HireHub</Text>
                </View>


                <View className={'px-12'}>
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
                    <TouchableOpacity
                        onPress={handleLogIn}
                        className='mb-14 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'>
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
                        onPress={() => { router.push('/register') }}
                        className='mb-6 h-10 flex-none justify-center items-center  rounded-full bg-slate-500'  >
                        <Text className='text-lg text-white'>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Login;
