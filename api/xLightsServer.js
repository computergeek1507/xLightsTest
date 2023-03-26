import axios from "axios";

const xLightsServer = axios.create({
    baseURL: 'http://127.0.0.1:49913',
});

export const getVersion = async (callback) => {
    const response = await OWMServer.get(
        `/getVersion`
        );
        console.log("received: ", response);
        callback(response.data);  
      };

export default xLightsServer;