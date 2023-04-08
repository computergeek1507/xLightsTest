import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
const ModelDisplay = ( {model } ) => {
    //const { modelData } = props;

return (
    <View>
      <View>
        <Text>Name: {model.name}</Text>
        </View>
        <View>
        <Text>Type: {model.DisplayAs}</Text>
        </View>
        <View>
        <Text>StartChannel: {model.StartChannel}</Text>
        </View>
        <View>
        <Text>LayoutGroup: {model.LayoutGroup}</Text>
        </View>
        <View>
        <Text>Controller: {model.Controller}</Text>
        </View>
        <View>
        <Text>Controller Port: {model.ControllerConnection?.Port}</Text>
        </View>
        <View>
        <Text>Controller Protocol: {model.ControllerConnection?.Protocol}</Text>
        </View>
        <View>
        <Text>StringType: {model.StringType}</Text>
        </View>
    </View>
  );
};


  export default ModelDisplay;