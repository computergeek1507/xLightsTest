import { Button, Input } from '@rneui/themed';
import {
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    InputAccessoryViewProperties,
    View
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect,useState} from "react";

const SettingScreen = ({ route, navigation }) => {
    //const { history } = route.params;
    //console.log("setting history with: ", route.params);
    const [ipAddress, setIPAddress] = useState("127.0.0.1");
    const [port, setPort] = useState("49913");

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <TouchableOpacity onPress={() => 
                {
                    storeData('ip', ipAddress);
                    storeData('port', port);
                  navigation.navigate("Start Screen",{ip: ipAddress})
                }}>
                <Text style={styles.headerButton}>Save</Text>
            </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                    <Text style={styles.headerButton}>Back</Text>
                </TouchableOpacity>
                ),
        });
        });

        useEffect(() => {
            getData("ip",(data) => {
                setIPAddress(data);
              });
              getData("port",(data) => {
                setPort(data);
              }); 
          }, []);

        const storeData = async (key,value) => {
            try {
                await AsyncStorage.setItem(`@${key}`, value)
            } catch (e) {
              // saving error
            }
          }
          const getData = async (key, callback) => {
            try {
              const value = await AsyncStorage.getItem(`@${key}`)
              if(value !== null) {
                // value previously stored
                callback(value);  
              }
            } catch(e) {
              // error reading value
            }
          }

    return (
       <View>
        <View style={styles.textHeader}>
        <Text style={styles.text}>xLight Connection Settings</Text>
        </View>
        <Input
          style={styles.input}
          placeholder="IP"
          value = {ipAddress}
          autoCorrect={false}
          onChangeText={(val) => setIPAddress(val)}
        />
        <Input
          style={styles.input}
          placeholder="Port"
          value = {port}
          autoCorrect={false}
          onChangeText={(val) => setPort(val)}
        />
        </View>
    );

};

const styles = StyleSheet.create({
    inputError: {
        color: "red",
    },
    textHeader: {
        padding: 2,
        alignItems:'center'
    },
    text: {
        padding: 2,
        alignContent: 'center'
    },
    input: {
        padding: 2,
        fontSize: 12,
    },
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
});

export default SettingScreen;
