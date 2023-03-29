import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View
} from "react-native";

import React, {useEffect,useState} from "react";

import { getControllers} from '../api/xLightsServer';

const ControllerScreen = ({ route, navigation }) => {
    const [controllers, setControllers] = useState([]);

    useEffect(() => {

        getControllers((data) => {
            //console.log("setting state with: ", data);
            setControllers(data);
          });
      }, []);


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Start Screen")}>
                <Text style={styles.headerButton}>Main Screen</Text>
            </TouchableOpacity>
            ),
        });
        });

        const renderController = ({ index, item }) => {
            //console.log("setting controller ", item);
            return (
                
                <TouchableHighlight onPress={() => {
                    navigation.navigate("Controller Info", { item });
                    }}>
                <View style={styles.button}>
                    <Text style={styles.mainLabelText}>Name: {item.name}</Text>
                    <Text style={styles.mainLabelText}>IP: {item.ip}</Text>
                    <Text style={styles.mainLabelText}>Protocol: {item.protocol}</Text>
                    <Text style={styles.subLabelText}>{item.vendor} {item.model} {item.variant}</Text>
                </View>
                </TouchableHighlight>
            );
            };

    return (
        <FlatList
        data={controllers}
        //keyExtractor={item => item.name}
        renderItem={renderController}
      />
    );

};

const styles = StyleSheet.create({
    headerButton: {
        color: "#fff",
        fontWeight: "bold",
      },
      mainLabelText: {
          fontSize: 12,
        padding: 2,
      },
      subLabelText: {
        color: "#808080",
        fontSize: 10,
        textAlign: 'left'
      },
});

export default ControllerScreen;

