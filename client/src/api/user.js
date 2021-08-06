import axios from "./axios.js";

const login = async ({ username, password }) => {
  try {
    const result = await axios.post("/user/login", { username, password });

    const { err, user } = result.data;
    if (!err) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  try {
    const result = await axios.post("/user/logout");

    const { success, err } = result.data;
    if (!err) {
      return success;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const userApi = {
  login,
  logout,
};

export default userApi;
