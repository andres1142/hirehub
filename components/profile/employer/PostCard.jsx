import { View, Text } from 'react-native';
import { UserIcon } from 'react-native-heroicons/solid';

function PostCard({ description, applicants, title }) {
    return (
        <View className={'relative bg-primary mb-4 mx-3 pt-2 pb-5 px-3 rounded-xl'}>
            <Text
                className={'mb-1'}
                style={{ fontFamily: 'MotivaMedium' }}>
                {title}
            </Text>
            <Text
                style={{ fontFamily: 'MotivaLight' }}>
                {description}
            </Text>
            {/*Applicants*/}
            <View className={'absolute bottom-1 right-2 flex-row mt-2'}>
                <Text className={'mr-1'}>{applicants}</Text>
                <UserIcon color={'black'} size={18} />
            </View>
        </View>
    )
}

export { PostCard };