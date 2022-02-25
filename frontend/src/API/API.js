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
const createUser = async (credentials) => {
    try {
        let response = await axios.post(`${serverURL}/user`, credentials);
        return response.data
      } catch(e){
       console.error("Failed to register", e)
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
const getMessages = async (limit, offset, id) => {
   try {
      let response = await axios.get(`${serverURL}/message/${id}`, { params: { limit, offset} });
      return response.data.data;
   } catch (e) {
      console.error("Failed to get messages", e);
   }
};
const sendMessage = async (userId, content) => {
   try {
      await axios.post(`${serverURL}/message/${userId}`, {content});
   } catch (e) {
      console.error("Failed to create messages", e);
   }
};
const editMessage = async (messageId, content) => {
   try {
      await axios.put(`${serverURL}/message/${messageId}`, { content });
   } catch (e) {
      console.error("Failed to create messages", e);
   }
};
const deleteMessage = async (messageId) => {
   try {
      await axios.delete(`${serverURL}/message/${messageId}`);
   } catch (e) {
      console.error("Failed to delete messages", e);
   }
};

const getReplies = async (limit, offset, id) => {
   try {
      const response = await axios.get(`${serverURL}/message/${id}/reply`, { params: { limit, offset } });
      return response.data.data;
   } catch (e) {
      console.error("Failed to get message replies", e);
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

export {
   login,
   getUsers,
   getMessages,
   deleteMessage,
   sendMessage,
   editMessage,
   getReplies,
   createUser,
};