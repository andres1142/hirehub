import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { AuthStore, appSignOut, setUserData } from "../../../store";
import { PlusIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { fetchUserData } from "../../../utils/databaseHandler";
import { CreatePost } from "../../../components/home/modals";

function Index() {
    const [data, setData] = useState({isCompany: false});
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
    const router = useRouter();
    

    function toggleCreatePostModal() {
        setIsCreatePostModalOpen(!isCreatePostModalOpen);
    }

    async function handleLogOut() {
        const resp = await appSignOut();
        if (!resp?.error) {
            router.replace("/(auth)/login");
        } else {
            console.log(resp.error);
            alert("Logout Error", resp.error?.message);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const user = AuthStore.getRawState().user;
            try {
                const result = await fetchUserData(user);
                setData(result);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchData();
    }, []);

    

    return (
        <SafeAreaView className={'relative flex-1 items-center bg-secondary'}>
            {/*Search Bar*/}
            <View className={'relative w-5/6 my-7'}>
                <TextInput
                    style={styles.generalFont}
                    className={'bg-primary h-12 px-4 rounded-full'}
                    placeholder={'Search Job Offerings'}
                    placeholderTextColor={'gray'}
                />
                <View className={'absolute right-4 h-full flex-none justify-center'}>
                    <MagnifyingGlassIcon color={'gray'} />
                </View>
            </View>

            {/*Job Offerings*/}
            <ScrollView>
                <TouchableOpacity onPress={handleLogOut}>
                    <Text>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </ScrollView>


            {
                /*Create Post Button*/
                data.isCompany ?
                    <TouchableOpacity
                        className={`absolute w-14 h-14 bottom-20 right-5 bg-primary flex-none justify-center items-center 
                                rounded-full shadow-sm shadow-slate-600`}
                        onPress={toggleCreatePostModal}>
                        <PlusIcon color={'#9BC8E3'} size={40} />
                    </TouchableOpacity>
                    :
                    null
            }

            {/*Create Post Modal*/
                isCreatePostModalOpen ?
                    <CreatePost toggleCreateModal={toggleCreatePostModal} />
                    : null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    generalFont: {
        fontFamily: 'MotivaLight',
    }
})

export default Index;
