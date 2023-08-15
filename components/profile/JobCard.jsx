import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { PencilSquareIcon, MinusIcon } from "react-native-heroicons/solid";
import { RemoveCard, EditEntry } from "./modals";

function JobCard({ resumeList, setResumeList, canEdit, index, title, timePeriod, description, handleRemoveItem }) {

    const [isRemoveCardModalOpen, setRemoveCardModalOpen] = useState(false)
    const [isEditEntryModalOpen, setEditEntryModalOpen] = useState(false)

    function toggleRemoveModal() {
        setRemoveCardModalOpen(!isRemoveCardModalOpen)
    }

    function toggleEditEntryModal() {
        setEditEntryModalOpen(!isEditEntryModalOpen)
    }

    function handleRemove() {
        toggleRemoveModal()
        handleRemoveItem(index)
    }

    function handleSaveEditEntry(newTitle, newTimePeriod, newDescription) {
        toggleEditEntryModal()
        let temp = []
        // Creates an array version of the data 
        for (let i = 0; i < resumeList.length; i++) {
            temp.push({ ...resumeList[i] })
        }
        temp[index] = {...resumeList[index], title: newTitle, date: newTimePeriod, description: newDescription }
        setResumeList(temp)
    }

    return (
        <View className={'relative bg-primary mx-3 mb-4 p-3 rounded-lg shadow-lg'}>

            {canEdit === true ?
                <View className={`absolute -bottom-3 -right-3 flex-row justify-center items-center`}>
                    {/*Remove Card Button*/}
                    <TouchableOpacity className={`flex-none justify-center items-center mr-1 w-[26px] h-[26px] rounded-full 
                                    border-solid border-0.5 border-secondary shadow-sm shadow-slate-400 bg-red-400`}
                        onPress={toggleRemoveModal}>

                        <MinusIcon color={'white'} size={20} />
                    </TouchableOpacity>
                    {/*Edit Card Button*/}
                    <TouchableOpacity className={`flex-none justify-center items-center w-[26px] h-[26px] rounded-full border-solid  
                                    border-0.5 border-secondary shadow-sm shadow-slate-400 bg-white`}
                        onPress={toggleEditEntryModal}>

                        <PencilSquareIcon color={'#9BC8E3'} size={20} />
                    </TouchableOpacity>
                </View>
                : null
            }

            <View className={'flex-row justify-between'}>
                <View className={'flex-row flex-1'}>

                    <Text style={{ fontFamily: 'MotivaBold' }} numberOfLines={1} className={'pb-1'}>
                        {title}
                    </Text>
                </View>

                <Text style={{ fontFamily: 'MotivaLightItalic' }}>
                    {timePeriod}
                </Text>
            </View>

            <Text style={{ fontFamily: 'MotivaLight' }} className={'pb-0.5'}>
                {description}
            </Text>

            {
                /*Discard Charges Modal*/
                isRemoveCardModalOpen ?
                    <RemoveCard toggleRemoveModal={toggleRemoveModal} handleRemove={handleRemove} />
                    : null
            }
            {
                /*EditEntry Modal*/
                isEditEntryModalOpen ?
                    <EditEntry toggleEditEntryModal={toggleEditEntryModal} handleSaveEditEntry={handleSaveEditEntry} title={title} timePeriod={timePeriod} description={description} />
                    : null
            }
        </View>
    )
}

export { JobCard }