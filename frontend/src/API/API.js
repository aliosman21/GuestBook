import axios from "axios";
import { store } from "../Redux/Store";
const serverURL = "http://localhost:5000/api";

const login = async (credentials) => {
    try {
        let response = await axios.post(`${serverURL}/user/login`, credentials);
        return response.data;
    } catch(e){
        console.error("Failed to login", e)
    }
}
const getUsers = async (limit, offset) => {
   try {
      let response = await axios.get(`${serverURL}/user`, { params: { limit, offset} });
      return response.data.data;
   } catch (e) {
      console.error("Failed to get users", e);
   }
};
axios.interceptors.request.use(
   (config) => {
      const state = store.getState();
      config.headers.Authorization = `Bearer ${state.tokenStore.token}`;
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export { login, getUsers };