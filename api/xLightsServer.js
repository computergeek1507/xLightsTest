import axios from "axios";

const xLightsServer = axios.create({
    baseURL: 'http://127.0.0.1:49913',
});

export const getVersion = async (callback) => {
    const response = await xLightsServer.get(
        `/getVersion`
        );
        //console.log("received: ", response.data);
        callback(response.data);  
      };

export const getShowFolder = async (callback) => {
        const response = await xLightsServer.get(
            `/getShowFolder`
            );
            //console.log("received: ", response.data);
            callback(response.data);  
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

export const uploadController = async (values, callback) => {
    console.log("sent: ", values);
    const response = await xLightsServer.get(
        `/uploadController?ip=${values}`
        );
        console.log("received: ", response.data);
        callback(response.data);  
        };

        

export default xLightsServer;