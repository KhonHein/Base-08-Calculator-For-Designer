import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet } from "react-native";

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
              //color={color}
              style={focused?styles.warningIcon:{}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="desingCalc"
        options={{
          title: "Design",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
            name="design-services" size={27} 
            color={focused?"red":color} 
            style={focused?styles.warningIcon:{}}
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
              //color={color}
              style={focused?styles.warningIcon:{}}
            />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  warningIcon:{
    flex:1,
     justifyContent:'center',
     alignItems:'center',
     margin:.5,
  }
})
