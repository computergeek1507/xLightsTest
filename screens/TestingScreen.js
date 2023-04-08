import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from "react-native";

import React, {useEffect,useState} from "react";

import { AntDesign } from '@expo/vector-icons'; 

const TestingScreen = ({ route, navigation }) => {
    const { printData } = route.params;
    //console.log("setting printData with: ", route.params);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                <AntDesign name="back" size={24} padding={10} color="white" />
            </TouchableOpacity>
            ),
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
      
        const renderEntry = ({ index, item }) => {
            //console.log("setting item with: ", item);
            return (
                <TouchableHighlight onPress={() => {
                    navigation.navigate("Saved Controller Models", { item });
                    }}>
                <View  style={styles.resultsRow} >
                    <Text>Controller: {item.name}</Text>  
                </View>
                </TouchableHighlight>
            );
            };

    return (
       <View>
              <FlatList
      data={printData}
      //keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderEntry}
    />
        </View>
    );

};

const styles = StyleSheet.create({
    headerButton: {
        color: "#fff",
        fontWeight: "bold",
      },
      historyLabelText: {
          fontSize: 16,
        padding: 2,
      },
      timeLabelText: {
        color: "#808080",
        fontSize: 8,
        textAlign: 'right'
      },
    container: {
      padding: 10,
      backgroundColor: "#E8EAF6",
      flex: 1,
    },
    countContainer: {
      //alignItems: 'center',
      padding: 10,
    },
    resultsGrid: {
      borderColor: "#000",
      borderWidth: 1,
      padding: 10,
    },
    resultsRow: {
      flexDirection: "row",
      paddingLeft: 20,
      padding: 10,
     //borderColor: "#000",
      //borderBottomWidth: 1,
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

export default TestingScreen;
