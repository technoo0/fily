import axios from "axios";
import info from "./utils/info";
const axiosInstance = axios.create({
  baseURL: info.BackendUrl,
});
export default axiosInstance;
