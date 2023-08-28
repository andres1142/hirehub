import { getDoc, doc, addDoc, collection } from "firebase/firestore";
import { firestore } from "../config/firebase.config";


async function fetchUserData(user) {
    try {
        const userStoredData = await getDoc(doc(firestore, "users", user.uid))
        return userStoredData.data()
    } catch (e) {
        console.log(e)
    }
}

async function uploadJobPost(title, description, hourlyWage, owner, zipCode) {
    try {
        await addDoc(collection(firestore, "jobPosts"), {
            title: title,
            description: description,
            hourlyWage: hourlyWage,
            owner: owner,
            zipCode: zipCode,
            applicants: [],

        })
    } catch (e) {
        console.log(e)
    }
}

export {
    fetchUserData,
    uploadJobPost
}