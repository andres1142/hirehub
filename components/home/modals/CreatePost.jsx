import { View, Text, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid'
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { uploadJobPost } from '../../../utils/databaseHandler';

function CreatePost({ toggleCreateModal }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hourlyRate, setHourlyRate] = useState('')

    function handlePostJobOffer() {
        uploadJobPost(title, description, hourlyRate, AuthStore.getRawState().user.uid, AuthStore.getRawState().data.zipCode);
        toggleCreateModal();
    }

    return (
        <View className={'flex-1 justify-center items-center'}>
            <Modal
                animationType='fade'
                transparent={true}
            >
                <BlurView intensity={40} tint="light" className={'w-full h-full'}>

                    <KeyboardAvoidingView className={'flex-1 justify-center items-center'}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View className={'relative bg-primary w-3/4 py-10 flex-none justify-center items-center rounded-xl'}>

                            {/*Close Button*/}
                            <View className={'absolute -top-3 -right-3'}>
                                <TouchableOpacity
                                    onPress={toggleCreateModal}
                                    className={'flex-none items-center justify-center w-[30px] h-[30px] bg-red-400 rounded-full'}>
                                    <XMarkIcon size={24} color={'white'} />
                                </TouchableOpacity>
                            </View>

                            <View className={'flex-none mb-10'}>
                                <Text className={'text-xl'} style={{ fontFamily: 'MotivaMedium' }}>
                                    Create Job Offering
                                </Text>
                            </View>

                            <TextInput
                                style={styles.generalFont}
                                className={'mb-6 px-3 h-9 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={'Title'}
                                placeholderTextColor={'gray'}
                                value={title}
                                onChangeText={text => setTitle(text)}
                            />

                            <TextInput
                                style={styles.generalFont}
                                className={'mb-6 px-3 h-20 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={'Short Description'}
                                placeholderTextColor={'gray'}
                                value={description}
                                onChangeText={text => setDescription(text)}
                                blurOnSubmit={true}
                                numberOfLines={3}
                                multiline
                            />

                            <TextInput
                                style={styles.generalFont}
                                className={'mb-6 px-3 h-9 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={'Hourly Rate'}
                                placeholderTextColor={'gray'}
                                value={hourlyRate}
                                onChangeText={text => setHourlyRate(text)}
                            />

                            <TouchableOpacity
                                className={'bg-lime-600 px-3 py-1 rounded-lg shadow-sm shadow-slate-500'}
                                onPress={handlePostJobOffer}
                            >
                                <Text className={'text-primary'}>
                                    Create Post
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                </BlurView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    generalFont: {
        fontFamily: 'MotivaRegular',
    }
})

export { CreatePost }