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
        <Text style={styles.resultsGrid}>Controller: {model.Controller}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>Controller Port: {model.ControllerConnection?.Port}</Text>
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
    },
    resultsRow: {
      flexDirection: "row",
      borderColor: "#000",
      borderBottomWidth: 1,
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