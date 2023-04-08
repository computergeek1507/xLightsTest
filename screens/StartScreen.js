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
} from "react-native";

import React, { useEffect, useRef, useState } from "react";

import { Feather } from "@expo/vector-icons";

import { getVersion, getShowFolder} from '../api/xLightsServer';

const StartScreen = ({ route, navigation }) => {

    const [xLightsVersion, setxLightsVersion] = useState("");
    const [showFolder, setShowFolder] = useState("");
    const [offline, setOffline] = useState(true);
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Feather
                style={{ marginRight: 10 }}
                name="settings"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        });
      });

      useEffect(() => {

        getVersion((data) => {
          setOffline(false);
          //console.log("setting state with: ", items);
          setxLightsVersion(data);
        },(data) => {
          setOffline(true);
        });
        getShowFolder((data) => {
          //console.log("setting state with: ", data);
          setShowFolder(data);
        });
      }, []);

return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.countContainer}>
        <TouchableOpacity style={offline ? styles.buttonDisable :styles.button} 
             disabled={offline} 
        onPress={() =>
                 navigation.navigate("Controllers")}>
            <Text style={styles.buttonText}>Controllers</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.countContainer}>
          <TouchableOpacity style={offline ? styles.buttonDisable :styles.button} 
             disabled={offline} 
          onPress={() =>
                  navigation.navigate("Models")}>
              <Text style={styles.buttonText}>Models</Text>
          </TouchableOpacity>          
        </View>
        <View style={styles.countContainer}>
          <TouchableOpacity style={offline ? styles.buttonDisable :styles.button} 
             disabled={offline} 
           onPress={() =>
                  navigation.navigate("Testing")}>
              <Text style={styles.buttonText}>Testing</Text>
          </TouchableOpacity>          
        </View>
        <View>
        { offline && 
  <Text style={styles.inputError}>Failed to Connect to xLights, Check IP Address Settings</Text>
}
        <Text>Show Folder: {showFolder}</Text>
        <Text>xLights Version: {xLightsVersion}</Text>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#a40000',
    padding: 10,
  },
  buttonDisable: {
    alignItems: 'center',
    backgroundColor: '#a40000',
    padding: 10,
    opacity: 0.4
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  countContainer: {
    //alignItems: 'center',
    padding: 10,
  },
  inputError: {
    color: "red",
  },
  input: {
    padding: 10,
  },
  resultsGrid: {
    borderColor: "#000",
    borderWidth: 1,
  },
  resultsRow: {
    flexDirection: "row",
    borderColor: "#000",
    borderBottomWidth: 1,
  },
  resultsLabelContainer: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    flex: 1,
  },
  resultsLabelText: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  resultsValueText: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    padding: 10,
  },
  headerButton: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default StartScreen;
