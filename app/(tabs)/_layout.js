import { Tabs } from "expo-router";
import { View, Dimensions, StyleSheet } from "react-native";
import { UserIcon, HomeIcon, ChatBubbleBottomCenterTextIcon } from "react-native-heroicons/outline"

const width = Dimensions.get('window').width
const MARGIN = 16
const TAB_BAR_WIDTH = width - MARGIN * 2
const TAB_WIDTH = TAB_BAR_WIDTH / 3

const TabsLayout = () => {
    return (
        <View className={'flex-1 pb-8 bg-secondary'}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBarContainer,
                    tabBarItemStyle: styles.tabBarItem,
                    tabBarActiveBackgroundColor: '#CCE3F1',
                }}
            >
                <Tabs.Screen
                    name="messages"
                    options={{
                        tabBarBadge: 3,
                        tabBarBadgeStyle: {
                            backgroundColor: '#9BC8E3', color: 'white'},
                        tabBarIcon: ({focused}) => <ChatBubbleBottomCenterTextIcon color={!focused? '#9BC8E3': 'white'}/>,
                    }}
                />
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarIcon: ({focused}) => <HomeIcon color={!focused? '#9BC8E3': 'white'}/>,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({focused}) => <UserIcon color={!focused? '#9BC8E3': 'white'}/>,
                    }}
                />

            </Tabs>
        </View>
    )
}


const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        width: TAB_BAR_WIDTH,
        height: 60,
        position: 'absolute',
        backgroundColor: '#EBF3F7',
        marginHorizontal: MARGIN,
        paddingBottom: 0,
        borderRadius: 20,
    },
    tabBarItem: {
        width: TAB_WIDTH,
        borderRadius: 20,
    }
})

export default TabsLayout;
