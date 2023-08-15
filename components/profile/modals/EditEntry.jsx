import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid'
import { BlurView } from 'expo-blur';
import { useState } from 'react';


function EditEntry({ toggleEditEntryModal, handleSaveEditEntry, title, timePeriod, description }) {
    const [displayTitle, setDisplayTitle] = useState(title)
    const [displayTimePeriod, setDisplayTimePeriod] = useState(timePeriod)
    const [displayDescription, setDisplayDescription] = useState(description)

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
                                    onPress={toggleEditEntryModal}
                                    className={'flex-none items-center justify-center w-[30px] h-[30px] bg-red-400 rounded-full'}>
                                    <XMarkIcon size={24} color={'white'} />
                                </TouchableOpacity>
                            </View>

                            <View className={'flex-none mb-10'}>
                                <Text className={'text-xl'} style={{ fontFamily: 'MotivaMedium' }}>
                                    Edit Experience
                                </Text>
                            </View>

                            <TextInput
                                style={styles.generalFont}
                                className={'mb-6 px-3 h-9 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={displayTitle}
                                placeholderTextColor={'gray'}
                                value={displayTitle}
                                onChangeText={setDisplayTitle}
                            />
                            <TextInput
                                style={styles.generalFont}
                                className={'mb-6 px-3 h-9 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={displayTimePeriod}
                                placeholderTextColor={'gray'}
                                value={displayTimePeriod}
                                onChangeText={setDisplayTimePeriod}
                            />
                            <TextInput
                                style={styles.generalFont}
                                className={'mb-6 px-3 h-20 w-5/6 bg-white rounded-xl shadow-sm shadow-slate-500'}
                                placeholder={displayDescription}
                                placeholderTextColor={'gray'}
                                value={displayDescription}
                                onChangeText={setDisplayDescription}
                                blurOnSubmit={true}
                                numberOfLines={3}
                                multiline
                            />

                            <TouchableOpacity
                                className={'bg-lime-600 px-3 py-1 rounded-lg shadow-sm shadow-slate-500'}
                                onPress={() => handleSaveEditEntry(displayTitle, displayTimePeriod, displayDescription)}
                            >
                                <Text className={'text-primary'}>
                                    Save Changes
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

export default EditEntry;