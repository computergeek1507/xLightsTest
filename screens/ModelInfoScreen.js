import { Button, Input } from '@rneui/themed';
import {
  FlatList,
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

import { getModel} from '../api/xLightsServer';

import Toast from 'react-native-root-toast';

const ModelInfoScreen = ({ route, navigation }) => {

    const modelData = route.params.item;
    const [modelParm, setModelParm] = useState([]);
    //console.log("setting model data ", modelData);

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

    useEffect(() => {

      getModel(modelData, (data) => {
        setModelParm(data);
        console.log("setting data ", data);
        });
    }, []);

    

return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
      <View>
        <Text>Name: {modelData}</Text>
        </View>
        <View>
        <Text>Type: {modelParm.DisplayAs}</Text>
        </View>
        <View>
        <Text>StartChannel: {modelParm.StartChannel}</Text>
        </View>
        <View>
        <Text>LayoutGroup: {modelParm.LayoutGroup}</Text>
        </View>
        <View>
        <Text>Controller: {modelParm.Controller}</Text>
        </View>
        <View>
        <Text>Controller Port: {modelParm.ControllerConnection?.Port}</Text>
        </View>
        <View>
        <Text>Controller Protocol: {modelParm.ControllerConnection?.Protocol}</Text>
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

export default ModelInfoScreen;
