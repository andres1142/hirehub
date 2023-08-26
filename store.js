import { Store, registerInDevtools, createAsyncAction, successResult, errorResult } from 'pullstate'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'
import { auth, firestore, storage } from './config/firebase.config'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { fetchUserData } from './utils/databaseHandler';


// Create a store with an initial state
export const AuthStore = new Store({
    isLoggedIn: false,
    initialized: false,
    user: null,
    data: null,    // Can change
    dataCopy: null, // In case we want to undo changes
})

// Listen for auth state changes
const unsub = onAuthStateChanged(auth, (user) => {
    AuthStore.update((store) => {
        store.user = user
        store.isLoggedIn = !!user
        store.initialized = true
        store.data = user ? store.data : null
        store.dataCopy = user ? store.dataCopy : null
    })
})

/**
 * Signs in the user and updates the AuthStore
 *  
 * @param {string} email
 * @param {string} password
 *  
 * @returns {*} user or error
 */

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

/**
 * Signs out the user and updates the AuthStore
 * 
 * @param {*} user
 * 
 * @returns {*} user or error
 */

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

/**
 * Creates a new user in the authentication service and stores the data in the database.
 * 
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @param {string} description
 * @param {string} zipCode
 * @param {boolean} isCompany
 * @param {string} profilePic
 * 
 * @returns {*} user or error
 */

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

/**
 * Uploads the profile picture to the storage and sets the data of the user in the database.
 * 
 * @param {*} user
 * @param {string} name
 * @param {string} description
 * @param {string} zipCode
 * @param {boolean} isCompany
 * @param {string} profilePic
 * 
 * @returns {string} photoURL
 */

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


        if (isCompany) {
            await setDoc(doc(firestore, "users", user.uid),
                {
                    description: description,
                    zipCode: zipCode,
                    isCompany: isCompany,
                    posts: []
                }
            )
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
        } else {
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
        }



        return photoURL
    } catch (e) {
        console.log(e)
    }
}

/**
 * Sets the data of the user in the AuthStore
 * 
 * @param {*} user 
 */

const setUserData = async (user) => {
    try {
        const data = await fetchUserData(user)
        AuthStore.update((store) => {
            store.data = data
            store.dataCopy = data
        })
    } catch (e) {
        console.log(e)
    }
}

/** 
 * Updates the description of the user in the AuthStore
 * 
 * @param {string} description
*/

const updateDescription = async (description) => {
    AuthStore.update((store) => {
        store.data.description = description
    })
}

/**
 *  Updates the resume of the user in the AuthStore
 *  
 * @param {array} resumeList
 */

const updateResume = async (resumeList) => {
    AuthStore.update((store) => {
        store.data.resume = resumeList
    })
}

/**
 * Adds a new entry to the resume of the user in the AuthStore
 *  
 * @param {object} resume
 */

const addResumeEntry = (resume) => {
    resume.index = AuthStore.getRawState().data.resume.length
    let updatedResume = []
    for (let i = 0; i < AuthStore.getRawState().data.resume.length; i++) {
        updatedResume.push(AuthStore.getRawState().data.resume[i])
    }
    updatedResume.push(resume)

    AuthStore.update((store) => {
        store.data.resume = updatedResume
    })
}


/**
 * Updates the data of the user in the database if there are changes present in the AuthStore 
 */

const updateData = async () => {
    if (JSON.stringify(AuthStore.getRawState().data) !== JSON.stringify(AuthStore.getRawState().dataCopy)) {
        try {
            if (AuthStore.getRawState().data.isCompany) {
                await updateDoc(doc(firestore, "users", AuthStore.getRawState().user.uid), {
                    description: AuthStore.getRawState().data.description,
                    posts: AuthStore.getRawState().data.posts
                })

                AuthStore.update((store) => {
                    store.dataCopy.description = store.data.description,
                        store.dataCopy.posts = store.data.posts
                })
            } else {
                await updateDoc(doc(firestore, "users", AuthStore.getRawState().user.uid), {
                    description: AuthStore.getRawState().data.description,
                    resume: AuthStore.getRawState().data.resume
                })

                AuthStore.update((store) => {
                    store.dataCopy.description = store.data.description,
                        store.dataCopy.resume = store.data.resume
                })
            }
        } catch (e) {
            console.log(e)
        }
    } else {
        console.log("No changes")
    }
}


registerInDevtools({ AuthStore })

export { appSignIn, appSignOut, appSignUp, setUserData, updateData, addResumeEntry, updateResume, updateDescription }
