import { Stack } from "expo-router";
import { View, Button } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ 
        // headerShown: false,
        title: "Home",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerRight: () => (
          <View style={{borderRadius: 5, marginRight: 10}}>
            <Button
            onPress={() => alert("This is a button!")}
              title="Info"
              color="#000"
            />
          </View>
        ),
       }} />
      <Stack.Screen name="users" options={{ 
        // headerShown: true,
        title: "Users",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#f4511e" },
      }} />
      <Stack.Screen name="about" options={{
        title: "About",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#f4511e" },
      }} />
    </Stack>
  );
}
