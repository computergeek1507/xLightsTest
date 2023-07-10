import {
    FlatList,
    StyleSheet,
    Text,
    View,
  } from "react-native";
const ModelGroupDisplay = ( {model } ) => {
    //const { modelData } = props;

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
  
    const renderModel = ({ index, item }) => {
        return (
            <View >
                <Text style={styles.resultsGrid} >{item}</Text>  

            </View>
        );
        };

return (
<View>
      <View style={styles.viewRowTop}>
      <Text style={styles.resultsGrid}>Name</Text>
      <Text style={styles.resultsGrid}>{model.name}</Text>
        </View>       
        <View style={styles.viewRow}>
        <Text style={styles.resultsGrid}>LayoutGroup</Text>
        <Text style={styles.resultsGrid}>{model.LayoutGroup}</Text>
        </View>
        <View style={styles.viewRow}>
        <Text style={styles.resultsGrid}>Layout</Text>
        <Text style={styles.resultsGrid}>{model.layout}</Text>
        </View>
        <View style={styles.viewRowBot}>
        <Text style={styles.resultsGrid}>Models</Text>
        </View>
        <View style={styles.viewRowBotList}>
        <FlatList 
      data={model.models.split(',')}
      //keyExtractor={item => item.name}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderModel}
     />
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
    countContainer: {
      //alignItems: 'center',
      padding: 10,
    },
    resultsGrid: {
      // borderColor: "#000",
       //borderWidth: 1,  
       fontSize: 16,
       padding: 10,  
       flex:.5
     },
     resultsRow: {
       //flexDirection: "row",
      // borderColor: "#000",
       //borderBottomWidth: 1,
       fontSize: 16,
       padding: 10,
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
        borderBottomWidth: 3,
      // padding: 10,
     },
     viewRowBotList: {
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


  export default ModelGroupDisplay;