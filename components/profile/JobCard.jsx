import { View, Text } from "react-native";

function JobCard() {
    return (
        <View className={'bg-primary my-4 p-3 rounded-lg shadow-lg'}>
            <View className={'flex-row justify-between'}>
                <View className={'flex-row'}>
                    <Text className={'font-bold'}>
                        Title:
                    </Text>
                    <Text>
                        Software Engineer
                    </Text>
                </View>

                <Text>
                    May: 2021 - Present
                </Text>
            </View>

            <View>
                <Text className={'font-bold'}>
                    Description:
                </Text>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </Text>
            </View>

        </View>
    )
}

export { JobCard }