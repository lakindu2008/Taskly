import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <StatusBar barStyle="light-content" />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#ffffffff",
            tabBarInactiveTintColor: "#aca2a2ff",
            tabBarStyle: {
              position: "absolute",
              height: 70,
              width:'90%',
              backgroundColor: "rgba(14, 14, 13, 0.62)",
              borderTopWidth: 0,
              elevation: 0,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius:30,
              borderBottomRightRadius:30,
              paddingTop: 8, 
              top:'90%',
              marginLeft:"5%"
             },
          }}
        >
          <Tabs.Screen
          
            name="index"
            options={{
              tabBarLabel: "Focus Mode",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="flame-outline" size={size ?? 20} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="times"
            options={{
              tabBarLabel: "My Plans",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="layers-outline" size={size ?? 20} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="about"
            options={{
              tabBarLabel: "About",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size ?? 20} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
