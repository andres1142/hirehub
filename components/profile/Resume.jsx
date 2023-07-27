import { FlatList  } from "react-native";
import { useState, useEffect } from "react";
import { AuthStore } from "../../store";
import { JobCard } from "./JobCard";

function Resume({canEdit}) {
    const [data, setData] = useState(AuthStore.getRawState().data.resume)

    useEffect(() => {
        setData(AuthStore.getRawState().data.resume)
    }, [AuthStore.getRawState().data.resume])
    
    return (
        <FlatList
            className={'rounded-xl'}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <JobCard canEdit={canEdit} title={item.title} timePeriod={item.date} description={item.description}/>}
            keyExtractor={item => item.index}
        />
    )
}

export { Resume }