import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";


const Layout = () => {
    const [fontsLoaded] = useFonts({
        Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
        MotivaBold: require("../assets/fonts/MotivaSansBold.ttf"),
        MotivaLight: require("../assets/fonts/MotivaSansLight.ttf"),
        MotivaMedium: require("../assets/fonts/MotivaSansMedium.ttf"),
        MotivaRegular: require("../assets/fonts/MotivaSansRegular.ttf"),
        MotivaThin: require("../assets/fonts/MotivaSansThin.ttf"),
        MotivaLightItalic: require("../assets/fonts/MotivaSansLightItalic.ttf"),
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
