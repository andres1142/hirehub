import {View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform} from "react-native";
import { useState } from 'react';
import {Stack} from "expo-router";

import { Form } from "../../components/Register";


function Register() {
    const [isCompany, setIsCompany] = useState(false)
    const [didUserClick, setDidUserClick] = useState(false)

    return (
        <SafeAreaView className='flex-1 bg-secondary justify-center'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View>
                    <Text className='pb-5 text-center text-xl'>
                        Register as:
                    </Text>

                    <View className='flex-row justify-around'>
                        <TouchableOpacity className={`h-9 px-4 flex-none justify-center items-center shadow-xl shadow-slate-700 rounded-full
                                                     ${isCompany && didUserClick ? 'bg-slate-400' : 'bg-slate-500' }`}
                                          onPress={() => {
                                              setIsCompany(true)
                                              setDidUserClick(true)}}>
                            <Text className='text-xl text-white'>Company</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={`h-9 px-4 flex-none justify-center items-center  shadow-xl shadow-slate-700 rounded-full 
                                                     ${!isCompany && didUserClick ? 'bg-slate-400' : 'bg-slate-500' }`}
                                        onPress={() => {
                                            setIsCompany(false)
                                            setDidUserClick(true)}}>

                            <Text className='text-xl text-white'>Individual</Text>
                        </TouchableOpacity>
                    </View>

                        {
                            didUserClick ? <Form isCompany={isCompany}/> : null
                        }

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default Register;
