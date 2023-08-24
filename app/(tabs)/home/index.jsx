import { useRouter, Stack } from "expo-router";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native";
import { AuthStore, appSignOut } from "../../../store";
import { PlusIcon } from "react-native-heroicons/solid";

function Index() {
    const router = useRouter();

    const handleLogOut = async () => {
        const resp = await appSignOut();
        if (!resp?.error) {
            router.replace("/(auth)/login");
        } else {
            console.log(resp.error);
            alert("Logout Error", resp.error?.message);
        }
    }

    return (
        <SafeAreaView className={'relative flex-1 bg-secondary'}>
            <ScrollView>
                <TouchableOpacity onPress={handleLogOut}>
                    <Text>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {
                AuthStore.getRawState().data?.isCompany ?
                    <TouchableOpacity className={`absolute w-14 h-14 bottom-20 right-5 bg-primary flex-none justify-center items-center 
                                                rounded-full shadow-sm shadow-inner shadow-slate-600`}>
                        <PlusIcon color={'#9BC8E3'} size={40} />
                    </TouchableOpacity>
                    :
                    null
            }

        </SafeAreaView>
    )
}

export default Index;
