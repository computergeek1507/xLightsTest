import { Button, Input } from '@rneui/themed';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";

import { getModelsOnController} from '../api/xLightsServer';
import Toast from 'react-native-root-toast';

import { AntDesign } from '@expo/vector-icons'; 

import {
  storePrintItem
} from "../helpers/fb-saved";

const ControllerModelScreen = ({ route, navigation }) => {

  const controllerInfo = route.params.controllerData;

  const [models, setModels] = useState([]);

  //console.log("setting controller data ", controllerInfo);

  useEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Controller Info",{"item":controllerInfo})}>
            <AntDesign name="back" size={36} padding={10} color="white" />
        </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => storePrintItem({name :controllerInfo.ip,models:models})}>
              <AntDesign name="addfile" size={36} padding={10} color="white" />
          </TouchableOpacity>
          ),
        //headerRight: () => (
        //  <TouchableOpacity onPress={() => navigation.navigate("Controllers")}>
        //      <Text style={styles.headerButton}>Controllers</Text>
        //  </TouchableOpacity>
         // ),
    });
    });

    useEffect(() => {

      getModelsOnController(controllerInfo.ip, (data) => {
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
      return (
          <View  style={styles.resultsRow} >
              <Text style={styles.resultsLabelText}>Pixel Port {item.port}: </Text>  
                            <FlatList
                  data={item.models}
                  renderItem={renderModels}
             />
          </View>
      );
      };
      const renderSerialPort = ({ index, item }) => {
        return (
            <View  style={styles.resultsRow} >
                <Text style={styles.resultsLabelText}>Serial Port {item.port}: </Text>  
                              <FlatList
                    data={item.models}
                    renderItem={renderModels}
               />
            </View>
        );
        };

        const renderMatrix = ({ index, item }) => {
          return (
              <View  style={styles.resultsRow} >
                  <Text style={styles.resultsLabelText}>Matrix Port {item.port}: </Text>  
                                <FlatList
                      data={item.models}
                      renderItem={renderModels}
                 />
              </View>
          );
          };
    const renderModels = ({ index, item }) => {
        return (            
            <View >
                <Text style={styles.resultsLabelText}>{item.name} {item.smartremote}</Text>               
            </View>  
        );
        };

    return (
      <View >
      <FlatList
      data={models.pixelports}
      //keyExtractor={item => item.name}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderPixelPort}
    />
    <FlatList
      data={models.serialports}
      //keyExtractor={item => item.name}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderSerialPort}
    />
    <FlatList
      data={models.ledpanelmatrixports}
      //keyExtractor={item => item.name}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderMatrix}
    /><FlatList
    data={models.virtualmatrixports}
    //keyExtractor={item => item.name}
    ItemSeparatorComponent={renderSeparator}
    renderItem={renderMatrix}
  />
    </View>  
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
