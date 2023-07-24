import { useRootNavigationState,
        SplashScreen,
        useRouter,
        useSegments
} from "expo-router";
import { AuthStore, setUserData } from "../store";
import React from "react";
import { View } from "react-native";

const Index = () => {
    const segments = useSegments();
    const router = useRouter();

    const navigationState = useRootNavigationState();

    const { initialized, isLoggedIn } = AuthStore.useState();

    React.useEffect(() => {
        if (!navigationState?.key || !initialized) {
            return
        }

        const inAuthGroup = segments[0] === "(auth)";

        // If the user is not signed in and the initial segment is not anything
        // segment is not anything in the auth group.
        if ( !isLoggedIn && !inAuthGroup) {
            // Redirect to the login page.
            router.replace("/login");
        } else if (isLoggedIn) {
            // go to tabs root.
            setUserData(AuthStore.getRawState().user);
            router.replace("/(tabs)/home");
        }
    }, [initialized, segments, navigationState?.key]);

    return <View>{!navigationState?.key ? <SplashScreen/> : <></>}</View>;
};
export default Index;
