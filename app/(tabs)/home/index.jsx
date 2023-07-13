import { useRouter, Stack  } from "expo-router";
import {SafeAreaView, ScrollView, TouchableOpacity, Text} from "react-native";
import { AuthStore, appSignOut } from "../../../store";

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
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity onPress={handleLogOut}>
                    <Text>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Index;
