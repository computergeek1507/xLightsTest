import { Button, Input } from '@rneui/themed';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useRef, useState } from "react";

import Toast from 'react-native-root-toast';

import { AntDesign } from '@expo/vector-icons'; 

const SavedControllerModelScreen = ({ route, navigation }) => {

  //const models = route.params.item.models;
  const [models, setModels] = useState([]);
  const item = route.params.item;

  const getControllers = async (name, callback) => {
    try {
      var conNames = [];
      console.log("item data ", name);
      const value = await AsyncStorage.getItem(`@${name}_models`);
      //console.log("item data ", value);
      if(value !== null) {
        // value previously stored
        conNames = JSON.parse(value);
        callback(conNames);  
      }
    } catch(e) {
      console.log(e);
    }
  }

  const deleteControllers = async (name) => {
    try {
      var conNames = [];

      console.log("TEST: ", name);
      const arr = await (AsyncStorage.getItem("storedControllers"));
      if (arr !== null) {
        // value previously stored
        conNames = JSON.parse(arr);
        const index = conNames.indexOf(name);
        console.log("TEST: ", conNames);
        console.log("TEST: ", index);
        var yy = conNames.splice(index, 1);
        console.log("TEST: ", conNames);
      }
      await AsyncStorage.setItem('storedControllers', JSON.stringify(conNames));

      console.log("TEST: ", name);
      await AsyncStorage.removeItem(`@${name}_models`);
      //console.log("item data ", value);
    } catch(e) {
      console.log(e);
    }
  }

  const objectToHTML = (ports, type) =>{
    //console.log('ports:', ports);
    if(ports == null){
      return "";
    }
    if(ports.length == 0){
      return "";
    }
    var html = '<table style="width:100%"><tr><th>Port</th><th>Models</th></tr>';
    Object.keys(ports).map((key,i)=>{
      html += `<tr><td> ${type} Port${ports[key].port}</td><td>`
      if(ports[key].models != null){
      Object.keys(ports[key].models).map((twoKey,j)=>{
        html += `${ports[key].models[twoKey].name}, `
      })}
      html += "</td></tr>"
    })
    html += "</table>"
    return html;
  }

  const printToFile = async (html) => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  useEffect(() => {
    navigation.setOptions({
      title: item.name,
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Saved Wiring Lists")}>
            <AntDesign name="back" size={36} padding={10} color="white" />
        </TouchableOpacity>
        ),
        headerRight: () => (
        
          <View style={{flexDirection: "row"}}>
           <TouchableOpacity style={{padding: 10}} onPress={() => {
            var html = `<h3>${item.name}<\h3>`; 
            html += objectToHTML(models.pixelports, "Pixel");
            html += objectToHTML(models.serialports, "Serial");
             html += objectToHTML(models.ledpanelmatrixports, "Panel");
             html += objectToHTML(models.virtualmatrixports, "VR Matrix");
            printToFile(html);

          }}>
             <AntDesign name="printer" size={36} color="white" />
         </TouchableOpacity>
         <TouchableOpacity style={{padding: 10}} onPress={() => {
            deleteControllers(item);
            navigation.navigate("Saved Wiring Lists");
          }}>
             <AntDesign name="delete" size={36} color="white" />
         </TouchableOpacity>
          </View>
        ),
       // headerRight: () => (
        //  <TouchableOpacity onPress={() => {
       //     deletePrintData(item);
       //     navigation.navigate("Start Screen");
        //  }}>
        //      <AntDesign name="delete" size={36} color="white" />
        //  </TouchableOpacity>
        //  )

    });
    });

    onFocus = () => {
      console.log("item data ", item);
      getControllers(item, (data) => {
        setModels(data);
        //console.log("setting data ", data);
        });
     }

    useEffect(() => {
      console.log("item data ", item);
      getControllers(item, (data) => {
        setModels(data);
        //console.log("setting data ", data);
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
                <Text style={styles.resultsLabelText}>{item.name} {String.fromCharCode(item.smartremote)}</Text>               
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

export default SavedControllerModelScreen;
