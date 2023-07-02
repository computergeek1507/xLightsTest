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
                        height: 1.0,
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
          fontSize: 18,
        padding: 5,
      },
      subLabelText: {
        color: "#808080",
        fontSize: 12,
        textAlign: 'left',
        padding: 5,
      },
});

export default ControllerScreen;

