import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { PencilSquareIcon, CheckIcon } from "react-native-heroicons/solid";
import { AuthStore } from "../../store";


function Description() {
    const [resume, setResume] = useState(AuthStore)
    const [editing, setEditing] = useState(false)

    return (
        <View className={'relative bg-primary py-2 mx-3 px-3 rounded-xl'}>

            <View className={`absolute -top-3 -right-3 flex-none justify-center items-center w-[26px] h-[26px] 
                            rounded-full border-solid border-0.5 border-secondary shadow-sm shadow-slate-400 
                            ${!editing ? 'bg-white' : 'bg-lime-600'}`}>
                {
                    !editing ?
                        <TouchableOpacity
                            onPress={() => setEditing(!editing)}>
                            <PencilSquareIcon color={'#9BC8E3'} size={20} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => setEditing(!editing)}>
                            <CheckIcon color={'white'} size={20} />
                        </TouchableOpacity>
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