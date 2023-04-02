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

import React, {useEffect,useState} from "react";


const SettingScreen = ({ route, navigation }) => {
    //const { history } = route.params;
    //console.log("setting history with: ", route.params);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
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
    return (
       <View>
        <View style={styles.textHeader}>
        <Text style={styles.text}>xLight Connection Settings</Text>
        </View>
        <Input
          style={styles.input}
          placeholder="IP"
          autoCorrect={false}
          //onChangeText={(val) => updateStateObject({ lon2: val })}
        />
        <Input
          style={styles.input}
          placeholder="Port"

          autoCorrect={false}
          //onChangeText={(val) => updateStateObject({ lon2: val })}
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
