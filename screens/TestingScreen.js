import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect,useState} from "react";

import { AntDesign } from '@expo/vector-icons'; 

const TestingScreen = ({ route, navigation }) => {
    const [ printData, setPrintData ] = useState([]);
    //console.log("setting printData with: ", printData);

   const getControllers = async (callback) => {
      try {
        var conNames = [];
        const value = await AsyncStorage.getItem("storedControllers");
        if(value !== null) {
          // value previously stored
          conNames = JSON.parse(value);
          
        }
        callback(conNames);  
      } catch(e) {
        console.log(e);
      }
    }

    useEffect(() => {
      getControllers((data) => {
        setPrintData(data);
        });
    });

    useEffect(() =>{
      const focusHandler = navigation.addListener('focus', () => {
        //Alert.alert('Refreshed');
        getControllers((data) => {
          setPrintData(data);
          });
    });
    return focusHandler;
  }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                <AntDesign name="back" size={36} padding={10} color="white" />
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
                    <Text>Controller: {item}</Text>  
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
