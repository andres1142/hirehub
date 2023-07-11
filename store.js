import { Store, registerInDevtools } from 'pullstate'
import { onAuthStateChanged,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
        updateProfile
} from 'firebase/auth'
import { app, auth } from './firebaseConfig'

export const AuthStore = new Store({
    isLoggedIn: false,
    initialized: false,
    user: null,
})

const unsub = onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChange", user)
    AuthStore.update((store) => {
        store.user = user
        store.isLoggedIn = !!user
        store.initialized = true
    })
})

const appSignIn = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        AuthStore.update((store) => {
            store.user = result.user
            store.isLoggedIn = !!result.user
        })
        return { user: auth.currentUser}
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
            store.isLoggedIn = false
        })
        return { user: null }
    } catch (error) {
        console.log(error)
        return { error: error }
    }
}

const appSignUp = async (email, password, displayName, pictureURL) => {
    try {
        // this will trigger onAuthStateChange to update the store..
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // add the displayName and photoURL to the user
        await updateProfile(result.user, { displayName: displayName, photoURL: pictureURL})

        AuthStore.update((store) => {
            store.user = auth.currentUser;
            store.isLoggedIn = true;
        });

        return { user: auth.currentUser };
    } catch (e) {
        return { error: e };
    }
}


const updatePicture = async (pictureURL) => {

}

registerInDevtools({AuthStore})

export { appSignIn, appSignOut, appSignUp }
