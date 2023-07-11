import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";

  import React, { useEffect, useRef, useMemo, useState } from "react";

  import { setModelControllerPort, 
    setModelController,
    setModelControllerProtocol,
    setModelModelChain,
    setModelSmartRemote,
    setModelSmartRemoteType
  } from '../api/xLightsServer';

  import DialogInput from 'react-native-dialog-input';
  //import { Picker, onOpen } from 'react-native-actions-sheet-picker';

  //import {Picker} from '@react-native-picker/picker';

  import SelectDropdown from 'react-native-select-dropdown'

  import { getControllers} from '../api/xLightsServer';

const ModelDisplay = ( {model,callback} ) => {
    //const { modelData } = model;
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [controllers, setControllers] = useState([]);

    useEffect(() => {
        getControllers((data) => {
            setControllers(data);

          });
      }, []);
 
    const sendInput = (inputText) =>{
      console.log(inputText);

      setModelControllerPort({model:model.name,port:inputText },callback)
      setIsDialogVisible(false);
      //callback();
    };

    const setController = (itemValue, itemIndex) =>{
      //console.log(itemValue);
      console.log(itemIndex);
      var idx = itemIndex;
      console.log(idx);
      setModelController({model:model.name,controller:idx },callback);                  
    };
    const setProtocol = (itemValue, itemIndex) =>{
      //console.log(itemValue);
      console.log(itemIndex);
      //var idx = itemIndex + 2;
      //console.log(idx);
      setModelControllerProtocol({model:model.name,protocol:itemIndex },callback);                  
    };

    const getProtocols = ( controlName ) => {
      const isObjectPresent = controllers.find((o) => o.name === controlName);
      //const isElementPresent = controllers.some((o) => o.name === controlName);
      //console.log(isObjectPresent);
      if (isObjectPresent) {                 
        const arr1 =isObjectPresent.controllercap?.pixelprotocols;
        const arr2 =isObjectPresent.controllercap?.serialprotocols;
        return arr1.concat(arr2);
      }
      return [];
  };

  const getAutoControllers = ( ) => {
    var arr = ["Use Start Channel", "No Controller"];
    for (var item of controllers) {
        if(item.autolayout)
        {
          arr.push(item.name);
        }      
    }
    return arr;
};


return (
    <View>
      <View style={styles.viewRowTop}>
        <Text style={styles.resultsGrid}>Name</Text>
        <Text style={styles.resultsGrid}>{model.name}</Text>
        </View>
        <View style={styles.viewRow}>
        <Text style={styles.resultsGrid}>Type</Text>
        <Text style={styles.resultsGrid}>{model.DisplayAs}</Text>
        </View>
        <View style={styles.viewRow}>
        <Text style={styles.resultsGrid}>StartChannel</Text>
        <Text style={styles.resultsGrid}>{model.StartChannel}</Text>
        </View>
        <View style={styles.viewRow}>
        <Text style={styles.resultsGrid}>LayoutGroup</Text>
        <Text style={styles.resultsGrid}>{model.LayoutGroup}</Text>
        </View>
        <View style={styles.viewRow}>
        <View style={{flex:.5}}>
          <Text style={styles.resultsGridController}>Controller</Text>
          </View>
          <View style={{flex:.5}}>
          <SelectDropdown
              data={getAutoControllers()}
              defaultButtonText={model.Controller == null ? "Use Start Channel" : model.Controller}
              defaultValue={model.Controller == null ? "Use Start Channel" : model.Controller}
              onSelect={setController}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              
          />
          </View>
        </View>
        <View style={styles.viewRow}>
        <DialogInput isDialogVisible={isDialogVisible}   
                    message={"Set Controller Port"}
                    hintInput ={"1-48"}
                    autoCorrect={false}
                    keyboardType='number-pad'
                    textInputProps={{autoCorrect:false,keyboardType:'number-pad'}} 
                    initValueTextInput =  {model.ControllerConnection?.Port}
                    submitInput={ (inputText) => {sendInput(inputText)} }
                    closeDialog={ () => {setIsDialogVisible(false)}}>
        </DialogInput>
        <TouchableOpacity style={styles.viewRowController}
          onPress={() =>{setIsDialogVisible(true)}
          }>
            <Text style={styles.resultsGrid}>Controller Port</Text>
            <Text style={styles.resultsGrid}>{model.ControllerConnection?.Port}</Text>
        </TouchableOpacity>        
        </View>
        <View style={styles.viewRow}>
        <Text style={styles.resultsGrid}>Model Chain</Text>
        <Text style={styles.resultsGrid}>{model.ModelChain == null ? "Beginning" : model.ModelChain}</Text>
        
        </View>
        <View style={styles.viewRow}>
        <View style={{flex:.5}}>
        <Text style={styles.resultsGridController}>Controller Protocol</Text>
        </View>
        <View style={{flex:.5}}>
        <SelectDropdown
        
              data={getProtocols(model?.Controller)}
              defaultButtonText={model.ControllerConnection?.Protocol}
              defaultValue={model.ControllerConnection?.Protocol}
              onSelect={setProtocol}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              
          />
          </View>
        </View>
        <View style={styles.viewRowBot}>
        <Text style={styles.resultsGrid}>StringType</Text>
        <Text style={styles.resultsGrid}>{model.StringType}</Text>
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
     // borderColor: "#000",
      //borderWidth: 1,  
      fontSize: 16,
      padding: 10,  
      flex:.5
    },
    resultsGridController: {
      //borderColor: "#000",
      //borderWidth: 1,  
      fontSize: 16,
      padding: 10,  
    },
    resultsRow: {
      //flexDirection: "row",
     // borderColor: "#000",
      //borderBottomWidth: 1,
      padding: 10,
    },
    viewRowController: {
      flexDirection: "row",
      alignItems: 'center',

     // padding: 10,
    },
    viewRow: {
      flexDirection: "row",
      alignItems: 'center',
      borderColor: "#000",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0.5,
       borderBottomWidth: 0.5,
     // padding: 10,
    },
    viewRowTop: {
      flexDirection: "row",
      alignItems: 'center',
      borderColor: "#000",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
       borderBottomWidth: 0.5,
     // padding: 10,
    },
    viewRowBot: {
      flexDirection: "row",
      alignItems: 'center',
      borderColor: "#000",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0.5,
       borderBottomWidth: 1,
     // padding: 10,
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