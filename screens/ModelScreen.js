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
import { getModels} from '../api/xLightsServer';


const ModelScreen = ({ route, navigation }) => {
    //const { history } = route.params;
    //console.log("setting history with: ", route.params);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModels((data) => {
            //console.log("setting state with: ", data);
            setModels(data);
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
                    height: 0.5,
                }}
            />
        );
    };

    const renderModels = ({ index, item }) => {
        return (
            
            <TouchableHighlight onPress={() => {
                navigation.navigate("Model Info", { item });
                }}>
            <View style={styles.controllerButton}>
                <Text style={styles.mainLabelText}>{item}</Text>                    
            </View>
            </TouchableHighlight>
        );
    };          
    return (
        <FlatList
        data={models}
        //keyExtractor={item => item}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderModels}
      />
    );

};

const styles = StyleSheet.create({
    headerButton: {
        color: "#fff",
        fontWeight: "bold",
      },
      historyLabelText: {
          fontSize: 16,
        padding: 4,
      },
      timeLabelText: {
        color: "#808080",
        fontSize: 8,
        textAlign: 'right'
      },
      mainLabelText: {
        //alignItems: 'center',
        padding: 10,
      },
      mainLabelText: {
        //alignItems: 'center',
        padding: 10,
      },
});

export default ModelScreen;

