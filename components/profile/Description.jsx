import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { PencilSquareIcon, CheckIcon, XMarkIcon } from "react-native-heroicons/solid";
import { AuthStore } from "../../store";


function Description({ toggleDiscardChanges }) {
    const [editing, setEditing] = useState(false)

    function discardDescriptionChanges() {
        setEditing(false)
        console.log('Discarding Changes')
        toggleDiscardChanges()
    }

    return (
        <View className={'relative bg-primary py-2 mx-3 px-3 rounded-xl'}>

            <View className={`absolute -top-4 -right-3 flex-none justify-center items-center`}>
                {
                    editing === false ?
                        <View>
                            <TouchableOpacity
                                className={`flex-none items-center justify-center bg-black w-[26px] h-[26px] bg-white rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={() => setEditing(!editing)}>
                                <PencilSquareIcon color={'#9BC8E3'} size={20} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View className={'flex-row'}>
                            {/*Cancel Button*/}
                            <TouchableOpacity
                                className={`flex-none items-center justify-center bg-black w-[26px] h-[26px] bg-red-400 rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={() => discardDescriptionChanges}>
                                <XMarkIcon color={'white'} size={20} />
                            </TouchableOpacity>

                            {/*Save Button*/}
                            <TouchableOpacity
                                className={`flex-none ml-1 items-center justify-center bg-black w-[26px] h-[26px] bg-lime-600 rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={() => setEditing(!editing)}>
                                <CheckIcon color={'white'} size={20} />
                            </TouchableOpacity>
                        </View>
                }
            </View>


            <TextInput
                className={'p-0'}
                editable={editing}
                multiline={true}
                style={{ fontFamily: 'MotivaThin' }}>
                {AuthStore.getRawState().data?.description}
            </TextInput>
        </View>
    )
}


export { Description };