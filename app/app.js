import {View, SafeAreaView} from "react-native";
import  { Stack, useRouter } from 'expo-router'

import SignIn from '../components/landing/SignIn';

function App() {
  return (
      <SafeAreaView className='flex-1 bg-secondary justify-center'>
          <Stack.Screen
              options={{
                  headerShown: false,
              }}
          />
         <View className='px-12'>
            <SignIn/>
         </View>
      </SafeAreaView>
  );
}
export default App;


