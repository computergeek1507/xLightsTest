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

import { getVersion } from '../api/xLightsServer';

const StartScreen = ({ route, navigation }) => {

    const [xLightsVersion, setxLightsVersion] = useState("");
    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
                          >
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
          //console.log("setting state with: ", items);
          setxLightsVersion(data);
        });
      }, []);

return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View>
          <Button
            style={styles.buttons}
            title="Controllers"
            onPress={() =>
                 navigation.navigate("Controllers")
            }
          />
        </View>
        <View>
          <Button
            style={styles.buttons}
            title="Models"
            onPress={() =>
                 navigation.navigate("Models")
            }
          />
        </View>
        <View>
        <Text>{xLightsVersion}</Text>
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
