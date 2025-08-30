import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
            drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "settings",
            drawerIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "profile",
            drawerIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: "about",
            drawerIcon: ({ color }) => <MaterialIcons name="info" size={24} color={color} />
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
