import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";

  import React, { useEffect, useRef, useMemo, useState } from "react";

  import { setModelControllerPort, setModelController,setModelModelChain,setModelSmartRemote,setModelSmartRemoteType} from '../api/xLightsServer';

  import DialogInput from 'react-native-dialog-input';
  import { Picker, onOpen } from 'react-native-actions-sheet-picker';

  import { getControllers} from '../api/xLightsServer';

const ModelDisplay = ( {model,callback} ) => {
    //const { modelData } = props;
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const [selected, setSelected] = React.useState("");

    const [controllers, setControllers] = useState([]);

    useEffect(() => {

        getControllers((data) => {
            setControllers(data);
          });
      }, []);

      const filteredData = useMemo(() => {
        if (controllers && controllers.length > 0) {
          return controllers.filter((item) =>
            item.autolayout
          );
        }
      });
  
    const sendInput = (inputText) =>{
      console.log(inputText);
      setModelControllerPort({model:model.name,port:inputText },callback)
      setIsDialogVisible(false);
      //callback();
    };


return (
    <View>
      <View>
        <Text style={styles.resultsGrid}>Name: {model.name}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>Type: {model.DisplayAs}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>StartChannel: {model.StartChannel}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>LayoutGroup: {model.LayoutGroup}</Text>
        </View>
        <View>
        <TouchableOpacity 
          onPress={() =>{onOpen('controller');}
          }>
          <Text style={styles.resultsGrid}>Controller: {model.Controller}</Text>
          <Picker
        id="controller"
        data={controllers}
        inputValue={model.Controller}
        searchable={false}
        label="Select Controller"
        setSelected={(inputText) => 
          {
            console.log("gggg: ", inputText.name);
            //const idx = controllers.indexOf(inputText.name);
            var idx = controllers.findIndex(x => x.name ===inputText.name);
            console.log("gggg: ", idx);
            if(idx === "-1")
              return;
            idx = idx +2;
            console.log("gggg: ", idx);
            setModelController({model:model.name, controller:idx },callback);

          }}
      />
        </TouchableOpacity>
        </View>
        <View>
        <DialogInput isDialogVisible={isDialogVisible}   
                    message={"Set Controller Port"}
                    hintInput ={"1-48"}
                    autoCorrect={false}
                    keyboardtype='numeric'
                    initValueTextInput =  {model.ControllerConnection?.Port}
                    submitInput={ (inputText) => {sendInput(inputText)} }
                    closeDialog={ () => {setIsDialogVisible(false)}}>
        </DialogInput>
        <TouchableOpacity 
          onPress={() =>{setIsDialogVisible(true)}
          }>
            <Text style={styles.resultsGrid}>Controller Port: {model.ControllerConnection?.Port}</Text>
        </TouchableOpacity>        
        </View>
        <View>
        <Text style={styles.resultsGrid}>Model Chain: {model.ModelChain == null ? "Beginning" : model.ModelChain}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>Controller Protocol: {model.ControllerConnection?.Protocol}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>StringType: {model.StringType}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: "#E8EAF6",
      flex: 1,
    },
    buttonDisable: {
      alignItems: 'center',
      backgroundColor: '#a40000',
      padding: 10,
      opacity: 0.4
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
    touch: {
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
      padding: 10,  
    },
    resultsRow: {
      //flexDirection: "row",
     // borderColor: "#000",
      //borderBottomWidth: 1,
      padding: 10,
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


  export default ModelDisplay;