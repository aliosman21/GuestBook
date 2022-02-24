import axios from "axios";

const login = async (credentials) => {
    try {
        let response = await axios.post("http://localhost:5000/api/user/login", credentials);
        return response.data;
    } catch(e){
        console.error("Failed to login", e)
    }
}

export { login };