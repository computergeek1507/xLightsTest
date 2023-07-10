import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

const xLightsServer = axios.create({
   baseURL: `http://127.0.0.1:49913`,
});

export async  function getBaseUrl() {
    const ip = await AsyncStorage.getItem('@ip');
    const port = await AsyncStorage.getItem('@port');
    var url = `http://${ip}:${port}`;
    return url;
  }

  xLightsServer.interceptors.request.use( async config => { 
    config.baseURL=await getBaseUrl(); 
    return config; 
}, error => Promise.reject(error) );

export const getVersion = async (callback, failcallback) => {
    try {
    const response = await xLightsServer.get(
        `/getVersion`
        );
        console.log("received: ", response.data);
        callback(response.data);  
    } catch (err) {
        failcallback(err)
    }
};

export const getShowFolder = async (callback, failcallback) => {
    try {
        const response = await xLightsServer.get(
            `/getShowFolder`
            );
            //console.log("received: ", response.data);
            callback(response.data);  
        } catch (err) {
            failcallback(err)
        }
 };

export const getControllers = async (callback) => {
const response = await xLightsServer.get(
    `/getControllers`
    );
    //console.log("received: ", response.data);
    callback(response.data);  
    };

export const getModelsOnController = async (values, callback) => {
    const response = await xLightsServer.get(
        `/getControllerPortMap?ip=${values}`
        );
        //console.log("received: ", response.data);
        callback(response.data);  
        };

export const getModels = async (callback) => {
    const response = await xLightsServer.get(
        `/getModels`
        );
        //console.log("received: ", response.data);
        callback(response.data);  
        };

export const getModel = async (values, callback) => {
    const response = await xLightsServer.get(
        `/getModel?model=${values}`
        );
        //console.log("received: ", response.data);
        callback(response.data);  
        };

export const uploadController = async (values, callback) => {
    console.log("sent: ", values);
    const response = await xLightsServer.get(
        `/uploadController?ip=${values}`
        );
        console.log("received: ", response.data);
        callback(response.data);  
        };

    export const setModelControllerPort = async (values, callback) => {
        try {
            console.log(values);  
            const response = await xLightsServer.get(
                `/setModelProperty?model=${values.model}&key=ModelControllerConnectionPort&data=${values.port}`
                );
                console.log("received: ", response.data);
                callback();
                
            } catch (err) {
                console.log(err);
            }
        //console.log("sent: ", values);
    };

    export const setModelController = async (values, callback) => {
        try {
            const response = await xLightsServer.get(
                `/setModelProperty?model=${values.model}&key=Controller&data=${values.controller}`
                );
                callback();
                
            } catch (err) {
                console.log(err);
            }
        console.log("sent: ", values);
    };

    export const setModelModelChain = async (values, callback, failcallback) => {
        try {
            const response = await xLightsServer.get(
                `/setModelProperty?model=${values.model}&key=ModelChain&data=${values.modelchanin}`
                );
                console.log("received: ", response.data);
                callback(response.data);  
                
            } catch (err) {
                failcallback(err)
            }
        console.log("sent: ", values);
    };

    export const setModelSmartRemote = async (values, callback, failcallback) => {
        try {
            const response = await xLightsServer.get(
                `/setModelProperty?model=${values.model}&key=SmartRemote&data=${values.smartremote}`
                );
                console.log("received: ", response.data);
                callback(response.data);  
                
            } catch (err) {
                failcallback(err)
            }
        console.log("sent: ", values);
    };

    export const setModelSmartRemoteType = async (values, callback, failcallback) => {
        try {
            const response = await xLightsServer.get(
                `/setModelProperty?model=${values.model}&key=SmartRemoteType&data=${values.smartremotetype}`
                );
                console.log("received: ", response.data);
                callback(response.data);  
                
            } catch (err) {
                failcallback(err)
            }
        console.log("sent: ", values);
    };

        

export default xLightsServer;