import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useState } from 'react';


function CreateEntry({ toggleCreateModal }) {

    return (
        <View className={'flex-1 justify-center items-center'}>
            <Modal
                animationType='fade'
                transparent={true}
            >
                <BlurView intensity={40} tint="light" className={'w-full h-full'}>
                    <View className={'flex-1 justify-center items-center'}>
                        <View className={'bg-primary w-3/4 h-3/5 flex-none justify-center items-center rounded-xl'}>
                            <Text>
                                Hello World
                            </Text>
                            <TouchableOpacity
                                onPress={toggleCreateModal}
                            >
                                <Text>
                                    Close
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>

    )
}

export default CreateEntry;