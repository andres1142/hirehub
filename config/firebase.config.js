import { initializeApp } from "firebase/app";
import { getStorage }  from "firebase/storage";
import { getFirestore} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence} from "firebase/auth/react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Constants  from "expo-constants";

export const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const storage = getStorage(app);

const firestore = getFirestore(app);

export { app, auth, storage, firestore }
