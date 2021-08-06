import axios from "./axios.js";

const register = async (username, password) => {
    const result = await axios.post("/user/register", { username, password });
  
    const { user, err } = result.data;
    if (!err) {
      return user;
    } else {
      return null;
    }
};
const login = async (username, password) => {
    const result = await axios.post("/user/logiin", { username, password });
  
    const { user, err } = result.data;
    if (!err) {
      return user;
    } else {
      return null;
    }
};

const usersApi = {
  register,
  login
};
  
export default usersApi;
  