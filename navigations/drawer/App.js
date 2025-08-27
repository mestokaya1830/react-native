import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { useWindowDimensions } from "react-native";

const Drawer = createDrawerNavigator();

import Home from "./pages/Home";
import Settings from "./pages/Settings";

export default function App(){
  const isLargeScreen = useWindowDimensions().width > 600;
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          // headerShown: false,
          drawerStyle: {
            backgroundColor: "#c6cbef",
            width: 250,
          },
          drawerType: isLargeScreen ? "permanent" : "back",
          drawerStyle: isLargeScreen ? null : { width: "100%" },
          overlayColor: "transparent",
          drawerActiveBackgroundColor: "#ddd",
          drawerActiveTintColor: "#000",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: { fontSize: 15 },
          drawerItemStyle: {
            backgroundColor: "#f0f0f0",
            width: 240,
            borderRadius: 5,
            marginLeft: 10,
            marginVertical: 5,
            paddingLeft: 10,
          },
          headerStyle: {
            backgroundColor: "red",
            height: 80,
            borderRadius: 1,
            shadowColor: "#000",
          },
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          // drawerType: 'front',
          // drawerType: 'back',
          // drawerType: 'slide',
          // drawerType: 'permanent',
          // overlayColor: 'transparent',
          // drawerIconStyle: { marginLeft: 10 },
          // drawerPosition: 'left',
          // drawerItemStyle: { marginVertical: 5 },
          // drawerContentContainerStyle: { paddingVertical: 10 }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
