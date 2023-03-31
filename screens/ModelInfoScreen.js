import { Button, Input } from '@rneui/themed';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Linking,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";

import Toast from 'react-native-root-toast';

const ModelInfoScreen = ({ route, navigation }) => {

    const modelData = route.params.item;
    console.log("setting model data ", modelData);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Models")}>
                    <Text style={styles.headerButton}>Models</Text>
                </TouchableOpacity>
                ),
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                <Text style={styles.headerButton}>Main Screen</Text>
            </TouchableOpacity>
            ),
        });
    });

    

return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
      <View>
        <Text>Name: {modelData}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#E8EAF6",
    flex: 1,
  },
  buttons: {
    padding: 10,
  },
  headerButton: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default ModelInfoScreen;
