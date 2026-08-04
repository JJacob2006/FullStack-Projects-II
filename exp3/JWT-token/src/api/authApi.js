import axios from "axios";

const API="http://localhost:5000";

export const loginUser=(userData)=>{
    return axios.post(`${API}/login`,userData);
}