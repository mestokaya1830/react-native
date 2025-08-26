import "react-native-gesture-handler";// Must be at the top for React Navigation
import React from "react";
import { StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./pages/home.js";
import AboutScreen from "./pages/about.js";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{//global header styles
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#000"
              />
            ),
          }}
          // options={{ //for each screen different header
          //   title: "Home Page",
          //   headerStyle: {
          //     backgroundColor: "#1e74f4ff",
          //   },
          //   headerTitleAlign: "center",
          //   headerTintColor: "#fff",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //   },
          // }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          // options={{ //for each screen different header
          //   title: "About Page",
          //   headerStyle: {
          //     backgroundColor: "#f4511e",
          //   },
          //   headerTitleAlign: "center",
          //   headerTintColor: "#fff",
          //   headerTitleStyle: {
          //     fontWeight: "bold",
          //   },
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
