import { useRouter, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Image, View, TouchableOpacity, Text } from "react-native";
import { AuthStore } from "../../../store";
import { PlusIcon, PencilIcon, CheckIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Description, Resume } from "../../../components/profile";
import { CreateEntry, DiscardChanges } from "../../../components/profile/modals";

function Index() {
    const [canEdit, setCanEdit] = useState(false);
    const [isDiscardChangesModalOpen, setIsDiscardChangesModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigation = useNavigation();

    function toggleCreateModal() {
        setIsCreateModalOpen(!isCreateModalOpen);
    }

    function toggleDiscardChanges() {
        setIsDiscardChangesModalOpen(!isDiscardChangesModalOpen);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            console.log('blur')
        })
        return unsubscribe
    }, [navigation])

    return (
        <SafeAreaView className={'flex-auto bg-secondary'}>

            <View className={'flex-none mx-7 mt-10 items-center'}>
                <View className={'w-34 h-34 flex-none justify-center items-center rounded-full border-4 border-primary'}>
                    <Image
                        className={'w-32 h-32 bg-primary rounded-full'}
                        source={{ uri: AuthStore.getRawState().user?.photoURL }}
                    />
                </View>
                <Text
                    style={{ fontFamily: 'MotivaMedium' }}
                    className={'text-white my-5 text-3xl'}>
                    {AuthStore.getRawState().user?.displayName}
                </Text>

                {
                    AuthStore.getRawState().data?.isCompany ?
                        <Text>
                            Company Description:
                        </Text>
                        :
                        <View className={'w-full mb-5'}>
                            <Text
                                style={{ fontFamily: 'MotivaRegular' }}
                                className={'mb-4 text-left text-bold text-xl'}>
                                About Me:
                            </Text>
                            <Description toggleDiscardChanges={toggleDiscardChanges}/>
                        </View>
                }

                {!AuthStore.getRawState().data?.isCompany ?
                    <View className={'w-full h-[360px]'}>
                        <View className={'mb-4 flex-row justify-between'}>
                            <Text
                                style={{ fontFamily: 'MotivaRegular' }}
                                className={'text-left text-bold text-xl'}>
                                Previous Experience:
                            </Text>

                            <View
                                className={'flex-none justify-between items-center'}>

                                {
                                    canEdit === false ?
                                        <View className={'flex-row'}>
                                            {/*Create Button*/}
                                            <TouchableOpacity
                                                onPress={toggleCreateModal}
                                                className={`mx-1 flex-none justify-center items-center bg-white rounded-full w-[26px] h-[26px]
                                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}>
                                                <PlusIcon color={'#9BC8E3'} size={20} />
                                            </TouchableOpacity>

                                            {/*Edit Button*/}
                                            <TouchableOpacity
                                                onPress={() => setCanEdit(!canEdit)}
                                                className={`flex-none justify-center items-center bg-white rounded-full w-[26px] h-[26px]
                                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}>
                                                <PencilIcon color={'#9BC8E3'} size={18} />
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View className={'flex-row'}>
                                            {/*Cancel Button*/}
                                            <TouchableOpacity
                                                onPress={toggleDiscardChanges}
                                                //onPress={() => setCanEdit(!canEdit)}
                                                className={`mx-1 flex-none justify-center items-center bg-red-400 rounded-full w-[26px] h-[26px]
                                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}>
                                                <XMarkIcon color={'white'} size={20} />
                                            </TouchableOpacity>

                                            {/*Save Button*/}
                                            <TouchableOpacity
                                                onPress={() => setCanEdit(!canEdit)}
                                                className={`flex-none justify-center items-center bg-lime-600 rounded-full w-[26px] h-[26px]
                                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}>
                                                <CheckIcon color={'white'} size={18} />
                                            </TouchableOpacity>
                                        </View>
                                }

                            </View>
                        </View>

                        <Resume canEdit={canEdit} />
                    </View>
                    : null
                }


                {/*Create Entry Modal*/
                    isCreateModalOpen ?
                        <CreateEntry toggleCreateModal={toggleCreateModal} />
                        : null
                }

                {/*Discard Charges Modal*/
                    isDiscardChangesModalOpen ?
                        <DiscardChanges toggleDiscardChanges={toggleDiscardChanges} />
                        : null
                }
            </View>
        </SafeAreaView>
    )
}

export default Index;