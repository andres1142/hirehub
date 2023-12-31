import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { addResumeEntry } from '../../../store';
import { XMarkIcon } from 'react-native-heroicons/solid'
import { BlurView } from 'expo-blur';
import { useState } from 'react';


function CreateEntry({ toggleCreateModal }) {
    const [title, setTitle] = useState('')
    const [timePeriod, setTimePeriod] = useState('')
    const [description, setDescription] = useState('')

    const handleAddEntry = () => {
        try {  
            addResumeEntry({ title: title, date: timePeriod, description: description })
            toggleCreateModal()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View className={'flex-1 justify-center items-center'}>
            <Modal
                animationType='fade'
                transparent={true}
            >
                <BlurView intensity={40} tint="light" className={'w-full h-full'}>
                    <View className={'flex-1 justify-center items-center'}>
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
                                    Add Experience
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
                                className={'mb-6 px-3 h-9 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={'Time (e.g. May 2021 - Present)'}
                                placeholderTextColor={'gray'}
                                value={timePeriod}
                                onChangeText={text => setTimePeriod(text)}
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

                            <TouchableOpacity
                                className={'bg-lime-600 px-3 py-1 rounded-lg shadow-sm shadow-slate-500'}
                                onPress={handleAddEntry}
                            >
                                <Text className={'text-primary'}>
                                    Add
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
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

export default CreateEntry;