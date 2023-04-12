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

import React, { useEffect, useRef, useState } from "react";

import Toast from 'react-native-root-toast';

import { AntDesign } from '@expo/vector-icons'; 

import {
    deletePrintData
} from "../helpers/fb-saved";

const SavedControllerModelScreen = ({ route, navigation }) => {

  const models = route.params.item.models;
  const item = route.params.item;
  //console.log("setting printData with: ", models);

  //console.log("setting controller data ", controllerInfo);

  const objectToHTML = (ports, type) =>{
    //console.log('ports:', ports);
    if(ports == null){
      return "";
    }
    var html = '<table style="width:100%"><tr><th>Port</th><th>Models</th></tr>';
    Object.keys(ports).map((key,i)=>{
      html += `<tr><td> ${type} Port${ports[key].port}</td><td>`
      //console.log('oneKey:',ports[key]);
      //for (let i = 0; i < ports[key].models.length; i++) {
      //  console.log(ports[key].models[i].name);
      //  html += `<th>${ports[key].models[i].name}</th>`
      if(ports[key].models != null){
      Object.keys(ports[key].models).map((twoKey,j)=>{
        console.log('modelname:',ports[key].models[twoKey].name);
        html += `${ports[key].models[twoKey].name},`
      })}
      //}

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
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
            <AntDesign name="back" size={36} padding={10} color="white" />
        </TouchableOpacity>
        ),
        headerRight: () => (
        
          <View style={{flexDirection: "row"}}>
           <TouchableOpacity style={{padding: 10}} onPress={() => {
            var html = objectToHTML(models.pixelports, "Pixel");
            html += objectToHTML(models.serialports, "Serial");
             html += objectToHTML(models.ledpanelmatrixports, "Panel");
             html += objectToHTML(models.virtualmatrixports, "VR Matrix");
            printToFile(html);

          }}>
             <AntDesign name="printer" size={36} color="white" />
         </TouchableOpacity>
         <TouchableOpacity style={{padding: 10}} onPress={() => {
            deletePrintData(item);
            navigation.navigate("Start Screen");
          }}>
             <AntDesign name="delete" size={36} color="white" />
         </TouchableOpacity>
          </View>
        )  ,
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

export default SavedControllerModelScreen;
