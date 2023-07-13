import { Tabs } from "expo-router";
import { Text } from "react-native";
import { UserIcon, HomeIcon, ChatBubbleBottomCenterTextIcon } from "react-native-heroicons/outline"

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}
        >
            <Tabs.Screen
                name="messages"
                options={{
                    tabBarBadge: 3,
                    tabBarBadgeStyle: { backgroundColor: '#9BC8E3', color: 'white'},
                    tabBarIcon: () => <ChatBubbleBottomCenterTextIcon color={'#9BC8E3'}/>,
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: () => <HomeIcon color={'#9BC8E3'}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: () => <UserIcon color={'#9BC8E3'}/>,
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;
