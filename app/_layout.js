import { Stack } from "expo-router";
import { useFonts } from "expo-font";


export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "app",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
    });
    
    if (!fontsLoaded) {
    return null;
    }

    return (
        <Stack initialRouteName="app">
            <Stack.Screen name="app" />
        </Stack>
    )
};

export default Layout;