import { Button, Input } from '@rneui/themed';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";

import * as Linking from 'expo-linking';

import React, { useEffect, useRef, useState } from "react";

import { uploadController} from '../api/xLightsServer';

const ControllerInfoScreen = ({ route, navigation }) => {

    const controllerData = route.params.item;
    //console.log("setting controller data ", controllerData);

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

    const uploadDisabled = () => !controllerData.managed;
    const openDisabled = () => controllerData.type !== 'Ethernet';

return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
      <View style={styles.resultsGrid}>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Name: </Text>
            <Text style={styles.resultsLabelText}>{controllerData.name}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Vendor:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.vendor}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Model:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.model}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Type:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.type}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>ID:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.id}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Start Channel:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.startchannel}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Channels:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.channels}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Protocol:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.protocol}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Active:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.active.toString()}</Text>
        </View>
        <View style={styles.resultsRow}>
            <Text style={styles.resultsLabelText}>Managed:</Text>
            <Text style={styles.resultsLabelText}>{controllerData.managed.toString()}</Text>
        </View>
        </View>
        <View style={styles.touch}>
        <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate("Controller Models", { controllerData })}>
              <Text style={styles.buttonText}>Visualize</Text>
          </TouchableOpacity>          
        </View>
        <View style={styles.touch}>
          <TouchableOpacity style={uploadDisabled() ? styles.buttonDisable :styles.button} 
           disabled={uploadDisabled()} 
           onPress={() =>
                  uploadController(controllerData.ip)}>
              <Text style={styles.buttonText}>Upload Outputs</Text>
          </TouchableOpacity>          
        </View>
        <View style={styles.touch}>
        <TouchableOpacity style={openDisabled() ? styles.buttonDisable :styles.button} 
             disabled={openDisabled()} 
             onPress={() =>
                  Linking.openURL(`http:\\${controllerData.ip}`)}>
              <Text style={styles.buttonText}>Open Controller</Text>
          </TouchableOpacity>          
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
  buttonDisable: {
    alignItems: 'center',
    backgroundColor: '#a40000',
    padding: 10,
    opacity: 0.4
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#a40000',
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  touch: {
    //alignItems: 'center',
    padding: 10,
  },
  headerButton: {
    color: "#fff",
    fontWeight: "bold",
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
    //fontWeight: "bold",
    fontSize: 14,
    padding: 5,
  },

});

export default ControllerInfoScreen;
