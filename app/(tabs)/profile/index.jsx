import { useRouter, Stack  } from "expo-router";
import {SafeAreaView, ScrollView, TouchableOpacity, Text} from "react-native";
import { AuthStore, appSignOut } from "../../../store";

function Index() {
    const router = useRouter();

    return (
        <SafeAreaView className={'flex-1 bg-secondary'}>
            <Text>
                Profile
            </Text>
        </SafeAreaView>
    )
}

export default Index;
