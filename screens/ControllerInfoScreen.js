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

import { uploadController} from '../api/xLightsServer';
import Toast from 'react-native-root-toast';

const ControllerInfoScreen = ({ route, navigation }) => {

    const controllerData = route.params.item;
    console.log("setting controller data ", controllerData);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Controllers")}>
                    <Text style={styles.headerButton}>Controllers</Text>
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
        <Text>Name: {controllerData.name}</Text>
        <Text>Vendor: {controllerData.vendor}</Text>
        <Text>Model: {controllerData.model}</Text>
        <Text>Type: {controllerData.type}</Text>
        <Text>Protocol: {controllerData.protocol}</Text>
        </View>
        <View>
          <Button
            style={styles.buttons}
            title="Upload Outputs"
            onPress={() =>
                uploadController(controllerData.ip)
            }
          />
        </View>
        <View>
          <Button
            style={styles.buttons}
            title="Open Controller"
            onPress={() =>
                Linking.openURL(`http:\\${controllerData.ip}`)
            }
          />
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

export default ControllerInfoScreen;
