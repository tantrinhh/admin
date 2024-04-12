import axios from "axios";
import BASE_URL_STRAPI from "./constants";

const fetchApi = axios.create({
  baseURL: `${BASE_URL_STRAPI}`,
});

fetchApi.interceptors.response.use(
  (response: { data: any }) => {
    return response.data;
  },
  (error: any) => {
    // alert("!23")
    return Promise.reject(error);
  }
);
export default fetchApi;
