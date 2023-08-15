import { View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { PencilSquareIcon, CheckIcon, XMarkIcon } from "react-native-heroicons/solid";
import { AuthStore, updateDescription } from "../../store";
import { DiscardChanges } from "./modals";


function Description() {
    const navigation = useNavigation()

    const [description, setDescription] = useState(AuthStore.getRawState().data?.description)
    const [isDiscardChangesModalOpen, setIsDiscardChangesModalOpen] = useState(false)
    const [editing, setEditing] = useState(false)




    // Modal Functions: Discard Changes
    function toggleDiscardChanges() {
        setIsDiscardChangesModalOpen(!isDiscardChangesModalOpen)
    }

    /**
     * This function is called when the user presses the "Discard" button in the Discard Changes modal.
     */
    function discardChanges() {
        setDescription(AuthStore.getRawState().data?.description)
        setEditing(false)
        toggleDiscardChanges()
    }

    /**  
     *  This function is called when the user presses the "Save" button in the Discard Changes modal. 
     */
    function saveChanges() {
        updateDescription(description)
        setEditing(!editing)
    }


    //Listens when the user changes to a different tab. This will upload all the changes if they are different to the database
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setEditing(false);
        })
        return unsubscribe
    }, [navigation])


    return (
        <View className={'relative bg-primary py-2 mx-3 px-3 rounded-xl'}>

            <View className={`absolute -top-4 -right-3 flex-none justify-center items-center`}>
                {
                    editing === false ?
                        <View>
                            <TouchableOpacity
                                className={`flex-none items-center justify-center w-[26px] h-[26px] bg-white rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={() => setEditing(!editing)}>
                                <PencilSquareIcon color={'#9BC8E3'} size={20} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View className={'flex-row'}>
                            {/*Cancel Button*/}
                            <TouchableOpacity
                                className={`flex-none items-center justify-center w-[26px] h-[26px] bg-red-400 rounded-full 
                                            border-solid border-0.5 border-secondary shadow-sm shadow-slate-400`}
                                onPress={toggleDiscardChanges}>
                                <XMarkIcon color={'white'} size={20} />
                            </TouchableOpacity>

                            {/*Save Button*/}
                            <TouchableOpacity
                                className={`flex-none ml-1 items-center justify-center w-[26px] h-[26px] bg-lime-600 rounded-full 
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
                value={description}
                onChangeText={text => setDescription(text)}
                multiline={true}
                style={{ fontFamily: 'MotivaThin' }} />


            {
                /*Discard Charges Modal*/
                isDiscardChangesModalOpen ?
                    <DiscardChanges toggleDiscardChanges={toggleDiscardChanges} discardChanges={discardChanges} />
                    : null
            }
        </View>
    )
}


export { Description };