import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';



function CreateEntry({ toggleCreateModal }) {

    return (
        <View className={'flex-1 justify-center items-center mt-22'}>
            <Modal
                animationType='fade'
                transparent={true}
            >
                <View className={'flex-1 justify-center items-center mt-22'}>
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
            </Modal>
        </View>

    )
}

export default CreateEntry;