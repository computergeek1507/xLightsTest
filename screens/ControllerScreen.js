import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from "react-native";

import React, {useEffect,useState} from "react";

const ControllerScreen = ({ route, navigation }) => {
    //const { history } = route.params;
    //console.log("setting history with: ", route.params);


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                <Text style={styles.headerButton}>Main Screen</Text>
            </TouchableOpacity>
            ),
        });
        });

    return (
        <View>
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
});

export default ControllerScreen;

