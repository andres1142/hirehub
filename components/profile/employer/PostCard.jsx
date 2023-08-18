import { View, Text } from 'react-native';

function PostCard({ description, applicants, title}) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Text>{applicants}</Text>
        </View>
    )
}

export { PostCard };