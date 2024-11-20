import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calculator" : "calculator-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="desingCalc"
        options={{
          title: "Design",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calculator" : "calculator-sharp"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recent"
        options={{
          title: "recent",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "sync-circle" : "sync-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
