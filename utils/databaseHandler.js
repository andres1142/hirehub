import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../config/firebase.config";


async function fetchUserData(user) {
    try {
        const userStoredData = await getDoc(doc(firestore, "users", user.uid))
        console.log(userStoredData.data())
        return userStoredData.data()
    } catch (e) {
        console.log(e)
    }
}

export { fetchUserData }