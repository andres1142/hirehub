import { useRouter, Stack } from "expo-router";
import { SafeAreaView, Image, View, TouchableOpacity, Text } from "react-native";
import { AuthStore } from "../../../store";

import { Description, Resume } from "../../../components/profile";

function Index() {
    const router = useRouter();

    return (
        <SafeAreaView className={'flex-auto bg-secondary'}>

            <View className={'flex-none mx-7 mt-10 items-center'}>
                <View className={'w-50 h-50 flex-none justify-center items-center rounded-full border-4 border-primary'}>
                    <Image
                        className={'w-48 h-48 bg-primary rounded-full border-3'}
                        source={{ uri: AuthStore.getRawState().user?.photoURL }}
                    />
                </View>
                <Text className={'text-white my-5 text-4xl'}>
                    {AuthStore.getRawState().user?.displayName}
                </Text>

                {
                    AuthStore.getRawState().data?.isCompany ?
                        <Text>
                            Company Description:
                        </Text>
                        :
                        <View className={'w-full'}>
                            <Text className={'text-left text-bold text-lg'}>
                                About me:
                            </Text>
                            <Description />
                        </View>
                }

                {!AuthStore.getRawState().data?.isCompany ?
                    <View className={'w-full'}>
                        <Text className={'text-left text-bold text-lg'}>Previous Experience</Text>
                        <Resume />
                    </View>
                    : null
                }


            </View>

        </SafeAreaView>
    )
}

export default Index;
