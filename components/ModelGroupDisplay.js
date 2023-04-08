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
            <View  style={styles.resultsRow} >
                <Text>{item}</Text>  

            </View>
        );
        };

return (
<View>
      <View>
      <Text style={styles.resultsGrid}>Name: {model.name}</Text>
        </View>       
        <View>
        <Text style={styles.resultsGrid}>LayoutGroup: {model.LayoutGroup}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>Layout: {model.layout}</Text>
        </View>
        <View>
        <Text style={styles.resultsGrid}>Models:</Text>
        </View>
        <FlatList style={styles.resultsGrid}
      data={model.models.split(',')}
      //keyExtractor={item => item.name}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderModel}
    />
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
      borderColor: "#000",
      borderWidth: 1,
    },
    resultsRow: {
      flexDirection: "row",
      paddingLeft: 20,
     //borderColor: "#000",
      //borderBottomWidth: 1,
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