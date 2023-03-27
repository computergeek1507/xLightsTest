import axios from "axios";

const xLightsServer = axios.create({
    baseURL: 'http://127.0.0.1:49913',
});

export const getVersion = async (callback) => {
    const response = await xLightsServer.get(
        `/getVersion`
        );
        console.log("received: ", response.data);
        callback(response.data);  
      };

export const getControllers = async (callback) => {
const response = await xLightsServer.get(
    `/getControllerIPs`
    );
    console.log("received: ", response.data);
    callback(response.data);  
    };

export const getModels = async (callback) => {
    const response = await xLightsServer.get(
        `/getModels`
        );
        console.log("received: ", response.data);
        callback(response.data);  
        };

export default xLightsServer;