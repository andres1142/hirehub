import { View, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { PencilSquareIcon, CheckIcon, XMarkIcon } from "react-native-heroicons/solid";
import { AuthStore, undoDescriptionChanges, updateDescription } from "../../store";
import { DiscardChanges } from "./modals";


function Description() {
    const [description, setDescription] = useState(AuthStore.getRawState().data?.description)
    const [isDiscardChangesModalOpen, setIsDiscardChangesModalOpen] = useState(false)
    const [editing, setEditing] = useState(false)


    useEffect(() => {
        setDescription(AuthStore.getRawState().data?.description)
    }, [AuthStore.getRawState().data])


    function toggleDiscardChanges() {
        setIsDiscardChangesModalOpen(!isDiscardChangesModalOpen)
    }

    function discardChanges() {
        setEditing(!editing)
        undoDescriptionChanges()
        toggleDiscardChanges()
    }

    function saveChanges() {
        updateDescription(description)
        setEditing(!editing)
    }
    return (
        <View className={'relative bg-primary py-2 mx-3 px-3 rounded-xl'}>

            <View className={`absolute -top-4 -right-3 flex-none justify-center items-center`}>
                {
                    editing === false ?
                        <View>
                            <TouchableOpacity
                                className={`flex-none items-center justify-center bg-black w-[26px] h-[26px] bg-white rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={() => setEditing(!editing)}>
                                <PencilSquareIcon color={'#9BC8E3'} size={20} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View className={'flex-row'}>
                            {/*Cancel Button*/}
                            <TouchableOpacity
                                className={`flex-none items-center justify-center bg-black w-[26px] h-[26px] bg-red-400 rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={toggleDiscardChanges}>
                                <XMarkIcon color={'white'} size={20} />
                            </TouchableOpacity>

                            {/*Save Button*/}
                            <TouchableOpacity
                                className={`flex-none ml-1 items-center justify-center bg-black w-[26px] h-[26px] bg-lime-600 rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={saveChanges}>
                                <CheckIcon color={'white'} size={20} />
                            </TouchableOpacity>
                        </View>
                }
            </View>


            <TextInput
                className={'p-0'}
                editable={editing}
                multiline={true}
                style={{ fontFamily: 'MotivaThin' }}>
                {description}
            </TextInput>


            {/*Discard Charges Modal*/
                isDiscardChangesModalOpen ?
                    <DiscardChanges toggleDiscardChanges={toggleDiscardChanges} discardChanges={discardChanges} />
                    : null
            }
        </View>
    )
}


export { Description };