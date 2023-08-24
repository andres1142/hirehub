import { View, Text, FlatList } from 'react-native';
import { PostCard } from './PostCard';
import { useState, useEffect } from 'react';
import { AuthStore } from '../../../store';

function PreviousPosts() {
    const [postList, setPostList] = useState(AuthStore.getRawState().data?.posts);

    return (
        <View className={'h-[330px]'}>
            <Text
                    style={{ fontFamily: 'MotivaRegular' }}
                    className={'mb-4 text-left text-bold text-xl'}>
                    Previous Posts:
                </Text>
            {
                postList.length > 0 ?
                    <FlatList
                        className={'rounded-xl'}
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

export { PreviousPosts };