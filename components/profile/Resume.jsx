import { ScrollView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { AuthStore } from "../../store";

import { JobCard } from "./JobCard";

function Resume() {
    const [resume, setResume] = useState([])

    return (
        <ScrollView>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
        </ScrollView>
    )
}

export { Resume }