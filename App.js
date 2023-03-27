import { StatusBar } from 'expo-status-bar';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import StartScreen from "./screens/StartScreen";
import ModelScreen from "./screens/ModelScreen";
import ControllerScreen from "./screens/ControllerScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navStyling}>
        <Stack.Screen name="Start Screen" component={StartScreen} />
        <Stack.Screen name="Models" component={ModelScreen} />
        <Stack.Screen name="Controllers" component={ControllerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navStyling = {
  headerStyle: {
    backgroundColor: "#0065A4",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 20,
    flex: 1,
  },
});

