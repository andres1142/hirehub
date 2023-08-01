import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { AuthStore } from "../../store";
import { JobCard } from "./JobCard";

function Resume({ canEdit, resumeList, setResumeList }) {

    handleRemoveItem = (index) => {
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

    return (
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
    )
}

export { Resume }