import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://f1ly.herokuapp.com",
});
export default axiosInstance;
