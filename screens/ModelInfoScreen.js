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

import { AntDesign } from '@expo/vector-icons'; 

import { getModel } from '../api/xLightsServer';
import ModelDisplay from '../components/ModelDisplay';
import ModelGroupDisplay from '../components/ModelGroupDisplay';

import Toast from 'react-native-root-toast';

const ModelInfoScreen = ({ route, navigation }) => {

    const modelData = route.params.item;
    const [modelParm, setModelParm] = useState([]);
    //console.log("setting model data ", modelData);

    useEffect(() => {
        navigation.setOptions({
          title: modelParm.models == null ? "Model Info" : "Model Group Info",
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Models")}>
                    <AntDesign name="back" size={36} padding={10} color="white" />
                </TouchableOpacity>
                ),
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                <AntDesign name="home" size={36} padding={10} color="white" />
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
      {modelParm.models == null
        ? <ModelDisplay model = {modelParm}/>
        : <ModelGroupDisplay model = {modelParm}/>
      }
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
