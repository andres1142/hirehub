import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";


const Layout = () => {
    const [fontsLoaded] = useFonts({
        Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
    });

    if (!fontsLoaded) {
    return <SplashScreen />
    }

    return (
        <Stack screenOptions={{
            headerShown: false
        }}/>
    )
};

export default Layout;
