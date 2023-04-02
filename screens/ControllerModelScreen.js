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
} from "react-native";

import React, { useEffect, useRef, useState } from "react";

import { getModelsOnController} from '../api/xLightsServer';
import Toast from 'react-native-root-toast';

const ControllerModelScreen = ({ route, navigation }) => {

  const controllerInfo = route.params.controllerData;

  const [models, setModels] = useState([]);

  console.log("setting controller data ", controllerInfo);



  //getModelsOnController
  useEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Controller Info",{"item":controllerInfo})}>
            <Text style={styles.headerButton}>Controller</Text>
        </TouchableOpacity>
        ),
    });
    });

    useEffect(() => {

      getModelsOnController(controllerInfo.ip, (data) => {
          console.log("setting model with: ", data);
          setModels(data);
        });
    }, []);

    const renderSeparator = ({ index, item }) => {
      return (
          <View
              style={{
                  backgroundColor: 'black',
                  height: 0.5,
              }}
          />
      );
      };

  const renderPixelPort = ({ index, item }) => {
      //console.log("setting controller ", item);
      return (
          

          <View style={styles.resultsRow} >
              <Text>Pixel Port {item.port}</Text>
              <Text>Pixels: {item.pixels}</Text>
              <Text>Start Channel: {item.startchannel}</Text>
              
          </View>

      );
      };
      const renderModels = ({ index, item }) => {
        //console.log("setting controller ", item);
        return (
            
  
            <View style={styles.resultsRow} >
                <Text>Pixel Port {item.port}</Text>
                <Text>Pixels: {item.pixels}</Text>
                <Text>Start Channel: {item.startchannel}</Text>
                
            </View>
  
        );
        };

    return (
      <FlatList
      data={models.pixelports}
      //keyExtractor={item => item.name}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderPixelPort}
    />
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  countContainer: {
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

export default ControllerModelScreen;
