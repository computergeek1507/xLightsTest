import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Camera, CameraType } from 'expo-camera';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreen = ({ route, navigation }) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);

    const modelData = route.params.modelData;
    console.log(modelData);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
      }
    
      if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }

      const storeData = async (value) => {
        try {
            await AsyncStorage.setItem(`@${modelData}_pict`, value)
        } catch (e) {
          // saving error
        }
      }

      const takePicture = async () => {
        if (camera) {
          const data = await camera.takePictureAsync();
          console.log(data.uri);
          storeData(data.uri);
            navigation.navigate("Model Info", { item : modelData });
          //setImageUri(data.uri);
        }
      };
    
      function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    
      return (
        <View style={styles.container}>
          <Camera 
          ref={(ref) => setCamera(ref)}
          style={styles.camera} 
          type={type}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
    });

export default CameraScreen;