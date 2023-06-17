import axios from "axios";
import Configuration from "../utils/Configuration";

const AxiosInstance = axios.create({
    baseURL : Configuration.BASE_URL,
    timeout : 15000
});

export default AxiosInstance;