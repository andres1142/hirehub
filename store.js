import { Store, registerInDevtools } from 'pullstate'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'
import { app, auth, firestore, storage } from './config/firebase.config'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc ,getDoc, setDoc, updateDoc } from "firebase/firestore";

export const AuthStore = new Store({
    isLoggedIn: false,
    initialized: false,
    user: null,
    data: null,
    dataCopy: null,
})

const unsub = onAuthStateChanged(auth, (user) => {
    AuthStore.update((store) => {
        store.user = user
        store.isLoggedIn = !!user
        store.initialized = true
    })
})

const appSignIn = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        await setUserData(result.user)
        AuthStore.update((store) => {
            store.user = result.user
            store.isLoggedIn = !!result.user
        })
        return { user: auth.currentUser }
    } catch (error) {
        console.log(error)
        return { error: error }
    }
}

const appSignOut = async () => {
    try {
        await signOut(auth)

        AuthStore.update((store) => {
            store.user = null
            store.data = null
            store.dataCopy = null
            store.isLoggedIn = false
        })
        return { user: null }
    } catch (error) {
        console.log(error)
        return { error: error }
    }
}

const appSignUp = async (email, password, name, description, zipCode, isCompany, profilePic) => {
    try {

        const result = await createUserWithEmailAndPassword(auth, email, password)
        const photoURL = await storeUserData(auth.currentUser, name, description, zipCode, isCompany, profilePic)
        // add the displayName and photoURL to the user
        await updateProfile(result.user, { displayName: name, photoURL: photoURL })


        await setUserData(result.user)
        AuthStore.update((store) => {
            store.user = auth.currentUser;
            store.isLoggedIn = true;
        });
        return { user: auth.currentUser };
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}

const storeUserData = async (user, name, description, zipCode, isCompany, profilePic) => {
    let photoURL = null
    const storageRef = ref(storage, 'users/' + user.uid + '/profilePicture')
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", profilePic, true);
            xhr.send(null);
        });
        const result = await uploadBytes(storageRef, blob);
        blob.close()

        photoURL = await getDownloadURL(storageRef)



        await setDoc(doc(firestore, "users", user.uid), 
            {
                description: description,
                zipCode: zipCode,
                isCompany: isCompany,
                resume: []
            }
        )
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
        return photoURL
    } catch (e) {
        console.log(e)
    }
}

const setUserData = async (user) => {
    try {
        const userStoredData = await getDoc(doc(firestore, "users", user.uid))
        AuthStore.update((store) => {
            store.data = userStoredData.data()
            store.dataCopy = userStoredData.data()
        })
    } catch (e) {
        console.log(e)
    }
}

// TODO: Change this function to update all data.
const updateResume = async (resume) => {
    resume.index = AuthStore.getRawState().data.resume.length
    let updatedResume = []
    for (let i = 0; i < AuthStore.getRawState().data.resume.length; i++) {
        updatedResume.push(AuthStore.getRawState().data.resume[i])
    }
    updatedResume.push(resume)

    try {
        await updateDoc(doc(firestore, "users", AuthStore.getRawState().user.uid),{
            resume: updatedResume
        })
        AuthStore.update((store) => {
            store.data.resume = updatedResume
        })
    } catch (e) {
        console.log(e)
    } 
}


registerInDevtools({ AuthStore })

export { appSignIn, appSignOut, appSignUp, setUserData, updateResume }
