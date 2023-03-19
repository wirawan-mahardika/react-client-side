import axios from "axios";
import jwtDecode from "jwt-decode";

export const axiosJwtGet = async (url) => {
  const axiosJwt = axios.create();
  const token = localStorage.getItem("token");
  const { exp } = jwtDecode(token);

  axiosJwt.interceptors.request.use(
    async (req) => {
      const now = Date.now().valueOf();
      if (now > exp * 1000) {
        const response = await axios.get(
          "http://localhost:1000/api/user/refreshToken",
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.token);
        req.headers.Authorization = "Bearer " + response.data.token;
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const response = await axiosJwt.get(
      "http://localhost:1000/api/resources/" + url,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const axiosJwtPost = async (url, data) => {
  const axiosJwt = axios.create();
  const token = localStorage.getItem("token");
  const { exp } = jwtDecode(token);

  axiosJwt.interceptors.request.use(
    async (req) => {
      const now = Date.now().valueOf();
      if (now > exp * 1000) {
        const response = await axios.get(
          "http://localhost:1000/api/user/refreshToken",
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.token);
        req.headers.Authorization = "Bearer " + response.data.token;
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const response = await axiosJwt.post(
      "http://localhost:1000/api/resources/" + url,
      {
        search: data,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};