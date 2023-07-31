import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';


function DiscardChanges({ toggleDiscardChanges, discardChanges}) {
    return (
        <View className={'flex-1 justify-center items-center'}>
            <Modal
                animationType='fade'
                transparent={true}
            >
                <BlurView intensity={40} tint="light" className={'w-full h-full'}>
                    <View className={'flex-1 justify-center items-center'}>
                        <View className={'relative bg-primary w-3/4 py-5 flex-none justify-center items-center rounded-xl'}>

                            <View className={'flex-none'}>
                                <Text className={'text-lg text-center'} style={{ fontFamily: 'MotivaLight' }}>
                                    Are you sure you want to discard your changes?
                                </Text>

                                <View className={'flex-row justify-around items-center my-3 '}>
                                    <TouchableOpacity
                                        className={'flex-none justify-center items-center bg-red-400 w-20 h-7 rounded-md shadow-sm shadow-slate-500'}
                                        onPress={discardChanges}>
                    
                                        <Text className={'text-white'}>Discard</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className={'flex-none justify-center items-center bg-slate-500 w-20 h-7 rounded-md shadow-sm shadow-slate-500'}
                                        onPress={toggleDiscardChanges}>

                                        <Text className={'text-white'}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    )
}

export default DiscardChanges;