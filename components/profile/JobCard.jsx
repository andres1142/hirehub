import { View, Text } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/solid";

function JobCard() {
    return (
        <View className={'relative bg-primary mx-3 mb-4 p-3 rounded-lg shadow-lg'}>
            <View className={`absolute -bottom-3 -right-3 flex-none justify-center items-center w-[26px] h-[26px] 
                            rounded-full border-solid border-0.5 border-secondary shadow-sm shadow-slate-400 bg-white`}>
                <PencilSquareIcon color={'#9BC8E3'} size={20} />
            </View>

            <View className={'flex-row justify-between'}>
                <View className={'flex-row flex-1'}>
                    <Text style={{ fontFamily: 'MotivaBold' }}
                        numberOfLines={1}
                        className={'pb-1'}>
                        Software Engineer
                    </Text>
                </View>

                <Text style={{ fontFamily: 'MotivaLightItalic' }}>
                    May 2021 - Present
                </Text>
            </View>

            <Text
                style={{ fontFamily: 'MotivaLight' }}
                className={'pb-0.5'}>
                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis
                blanditiis repellendus etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus.
            </Text>

        </View>
    )
}

export { JobCard }