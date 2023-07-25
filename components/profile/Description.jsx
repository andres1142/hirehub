import { View, Text } from "react-native";
import { useState } from "react";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { AuthStore } from "../../store";


function Description() {
    const [resume, setResume] = useState(AuthStore)
    
    return (
        <View className={'relative bg-primary py-2 mx-3 px-3 rounded-xl'}>

            <View className={`absolute -top-3 -right-3 flex-none justify-center items-center w-[26px] h-[26px] 
                            rounded-full border-solid border-0.5 border-secondary shadow-sm shadow-slate-400 bg-white`}>
                <PencilSquareIcon color={'#9BC8E3'} size={20} />
            </View>

            <Text
                style={{ fontFamily: 'MotivaThin' }}>
                {AuthStore.getRawState().data?.description}
            </Text>
        </View>
    )
}


export { Description };