import { useNavigation } from "expo-router";
import { AuthStore, updateResume, updateData } from "../../store";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { PlusIcon, PencilIcon, CheckIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { CreateEntry, DiscardChanges } from "./modals";
import { JobCard } from "./JobCard";

function Resume() {
    const [resumeList, setResumeList] = useState(AuthStore.getRawState().data?.resume);
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

    function saveResumeChanges() {
        setCanEdit(false);
        updateResume(resumeList);
    }

    function discardChanges() {
        setResumeList(AuthStore.getRawState().data?.resume);
        setCanEdit(false);
        toggleDiscardChanges();
    }

    function handleRemoveItem(index) {
        let temp = []
        // Creates an array version of the data 
        for (let i = 0; i < resumeList.length; i++) {
            temp.push({ ...resumeList[i] })
        }
        temp.splice(index, 1)
        // Resets the index of the array
        for (let i = 0; i < temp.length; i++) {
            temp[i].index = i
        }
        setResumeList(temp)
    }

    //Listens when the user changes to a different tab. This will upload all the changes if they are different to the database
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            updateData()
            setCanEdit(false);
        })
        return unsubscribe
    }, [navigation])

    // Updates the resumeList when the user updates their resume
    useEffect(() => {
        setResumeList(AuthStore.getRawState().data?.resume)
    }, [AuthStore.getRawState().data?.resume])


    return (
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
                                    className={`mx-1 flex-none justify-center items-center bg-red-400 rounded-full w-[26px] h-[26px]
                                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}>
                                    <XMarkIcon color={'white'} size={20} />
                                </TouchableOpacity>

                                {/*Save Button*/}
                                <TouchableOpacity
                                    onPress={saveResumeChanges}
                                    className={`flex-none justify-center items-center bg-lime-600 rounded-full w-[26px] h-[26px]
                                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}>
                                    <CheckIcon color={'white'} size={18} />
                                </TouchableOpacity>
                            </View>
                    }

                    {/*Create Entry Modal*/
                        isCreateModalOpen ?
                            <CreateEntry toggleCreateModal={toggleCreateModal} />
                            : null
                    }

                    {
                        /*Discard Charges Modal*/
                        isDiscardChangesModalOpen ?
                            <DiscardChanges toggleDiscardChanges={toggleDiscardChanges} discardChanges={discardChanges} />
                            : null
                    }

                </View>
            </View>

            <FlatList
                className={'rounded-xl'}
                showsVerticalScrollIndicator={false}
                data={resumeList}
                renderItem={({ item }) =>
                    <JobCard
                        canEdit={canEdit}
                        index={item.index}
                        title={item.title}
                        timePeriod={item.date}
                        description={item.description}
                        handleRemoveItem={handleRemoveItem}
                    />
                }
                keyExtractor={item => item.index}
            />
        </View>
    )
}

export { Resume }