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
    const [tooOld, setTooOld] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Feather
                style={{ marginRight: 10 }}
                name="settings"
                size={36}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        });
      });

      const loadData = () => {
        getVersion((data) => {
          setOffline(false);
          
          console.log("setting state with: ", data);
          setxLightsVersion(data);
          //VersionCheck(data);
          getShowFolder((data) => {
            //console.log("setting state with: ", data);
            setShowFolder(data);
            setTooOld(false);
          },
          (data) => {
            setTooOld(true);
            //setxLightsVersion("");
            setShowFolder("");
          });

        },(data) => {
          setOffline(true);
          setxLightsVersion("");
          setShowFolder("");
        });
        
    };

      useEffect(() => {
        //console.log("route.params ", route.params);
        //if (route?.params?.ip) {
          //console.log("route.params ", route.params);
          loadData();
        //}
      }, [route.params]);

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
          <TouchableOpacity style={styles.button} 
           onPress={() =>
                  navigation.navigate("Saved Wiring Lists")}>
              <Text style={styles.buttonText}>Saved Wiring Lists</Text>
          </TouchableOpacity>          
        </View>
        <View>
        { offline && 
          <Text style={styles.inputError}>Failed to Connect to xLights, Check IP Address Settings</Text>
        }
        { tooOld && 
          <Text style={styles.inputError}>Please Update xLights to 2023.06 to use this App</Text>
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
