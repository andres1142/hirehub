import { View, Text, FlatList } from 'react-native';
import { PostCard } from './PostCard';
import { useState, useEffect } from 'react';
import { AuthStore } from '../../../store';

function PreviousPost() {
    const [postList, setPostList] = useState(AuthStore.getRawState().data?.posts);

    return (
        <View>
            {
                postList.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={postList}
                        renderItem={({ item }) =>
                            < PostCard 
                                description={item.description}
                                applicants={item.applicants}
                                title={item.title}
                            />
                        }
                    />
                    :
                    <View>
                        <Text>There are no posts to display</Text>
                    </View>
            }
        </View>
    )
}

export { PreviousPost };