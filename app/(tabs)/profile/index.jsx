import { Image, ImageBackground, View, TouchableOpacity, Text } from "react-native";
import { PencilIcon } from "react-native-heroicons/solid";
import { AuthStore } from "../../../store";
import { Description, Resume, PreviousPosts} from "../../../components/profile";

function Index() {

    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

    return (
        <View className={'flex-auto bg-secondary'}>
            <View className={'flex-none mx-7 items-center'}>
                {   /*Profile Picture if user or Banner + Representative Profile Picture*/
                    !AuthStore.getRawState().data?.isCompany ?
                        <View className={'relative mt-20 w-34 h-34 flex-none justify-center items-center rounded-full border-4 border-primary overflow-hidden'}>
                            <Image
                                className={'w-32 h-32 bg-primary rounded-full'}
                                source={{ uri: AuthStore.getRawState().user?.photoURL }}
                            />
                            {/*Edit picture Button*/}
                            <TouchableOpacity className={'absolute bottom-0 w-full h-6 bg-black opacity-60'}>
                                <Text
                                    className={'text-white text-center text-sm leading-6'}
                                    style={{ fontFamily: 'MotivaMedium' }}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <ImageBackground
                            source={image}
                            resizeMode="cover"
                            imageStyle={{ height: '100%', }}
                            className={'relative mb-14 bg-primary h-2/5 w-screen'}>
                            <View className={'absolute -bottom-16 w-screen flex-none items-center'}>
                                {/*Image container*/}
                                <View className={'w-32 h-32 rounded-full overflow-hidden'}>
                                    <Image
                                        className={'w-32 h-32 bg-primary rounded-full'}
                                        source={{ uri: AuthStore.getRawState().user?.photoURL }}
                                    />
                                    {/*Edit Profile picture picture Button*/}
                                    <TouchableOpacity className={'absolute bottom-0 w-full h-6 bg-black opacity-60'}>
                                        <Text
                                            className={'text-white text-center text-sm leading-6'}
                                            style={{ fontFamily: 'MotivaMedium' }}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/*Edit Banner Button*/}
                            <View className={'h-full w-full overflow-hidden'}>
                                <TouchableOpacity className={'absolute -bottom-10 -right-10 rotate-45 bg-black opacity-60 w-20 h-20'}>
                                    <View className={' absolute top-7 left-1 -rotate-45'}>
                                        <PencilIcon color={'white'}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                }

                {/* Company or User Name*/}
                <Text
                    style={{ fontFamily: 'MotivaMedium' }}
                    className={'text-white my-5 text-3xl'}>
                    {AuthStore.getRawState().user?.displayName}
                </Text>

                {
                    /*Company Description or About me*/
                    AuthStore.getRawState().data?.isCompany ?
                        <View className={'w-full mb-5'}>
                            <Text
                                style={{ fontFamily: 'MotivaRegular' }}
                                className={'mb-4 text-left text-bold text-xl'}>
                                Company Description:
                            </Text>
                            <Description />
                        </View>
                        :
                        <View className={'w-full mb-5'}>
                            <Text
                                style={{ fontFamily: 'MotivaRegular' }}
                                className={'mb-4 text-left text-bold text-xl'}>
                                About Me:
                            </Text>
                            <Description />
                        </View>
                }

                {
                    /* Shows company set up or user resume*/
                    !AuthStore.getRawState().data?.isCompany ?
                        <Resume />
                        :
                        <PreviousPosts />
                }
            </View>
        </View>
    )
}

export default Index;