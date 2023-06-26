import {View, SafeAreaView} from "react-native";
import  { Stack, useRouter } from 'expo-router'

import SignIn from './landing/SignIn';

function App() {
  return (
      <SafeAreaView className='flex-1 bg-secondary justify-center'>
          <Stack.Screen
              options={{
                  headerShown: false,
              }}
          />
          {/* TODO: Check if the user is already logged-in.*/}
         <View className='px-12'>
            <SignIn/>
         </View>
      </SafeAreaView>
  );
}
export default App;


