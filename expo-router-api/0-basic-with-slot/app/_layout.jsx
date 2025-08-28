import { Slot } from "expo-router";
import { SafeAreaView, View, Text } from "react-native";


export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "plum" }}>
        <Text>Header</Text>
      </View>
        <Slot />
      <View style={{ height: 50, backgroundColor: "plum" }}>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
}


//install
//npx create-expo-app@latest  expo-router-api
//then remove example project
//npm run reset-project

