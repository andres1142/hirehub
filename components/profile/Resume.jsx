import { ScrollView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { AuthStore } from "../../store";

import { JobCard } from "./JobCard";

function Resume({canEdit}) {
    const [resume, setResume] = useState([])
    
    return (
        <ScrollView
            className={'rounded-xl'}
            showsVerticalScrollIndicator={false}>
            <JobCard canEdit={canEdit}/>
            <JobCard canEdit={canEdit}/>
            <JobCard canEdit={canEdit}/>
            <JobCard canEdit={canEdit}/>
        </ScrollView>
    )
}

export { Resume }