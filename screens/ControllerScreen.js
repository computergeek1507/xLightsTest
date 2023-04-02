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

        const renderController = ({ index, item }) => {
            return (
                
                <TouchableHighlight onPress={() => {
                    navigation.navigate("Controller Info", { item });
                    }}>
                        <View >
                <View style={styles.controllerButton}>
                    <Text style={styles.mainLabelText}>Name: {item.name}</Text>
                    <Text style={styles.mainLabelText}>IP: {item.ip}</Text>
                    <Text style={styles.mainLabelText}>Protocol: {item.protocol}</Text>
                    
                </View>
                <View>
                    <Text style={styles.subLabelText}>{item.vendor} {item.model} {item.variant}</Text>
                    </View>
                </View>
                </TouchableHighlight>
            );
            };      
    return (
        <FlatList
        data={controllers}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderController}
      />
    );
};

const styles = StyleSheet.create({
    headerButton: {
        color: "#fff",
        fontWeight: "bold",
      },
      controllerButton: {
        flexDirection: 'row',
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
        textAlign: 'left',
        padding: 2,
      },
});

export default ControllerScreen;

