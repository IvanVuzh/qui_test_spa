import axios from "axios";
import getApiUrl from "./env.services";
import { getCookie } from "./utils/cookieUtils"; // Ensure you have the cookie utility file

let baseUrl = '';

const client = axios.create({});

client.interceptors.request.use(
  async function (config) {
    if (!config.headers) {
      return config;
    }

    if (!baseUrl) {
      baseUrl = await getApiUrl();
    }

    config.baseURL = baseUrl;

    // Get the user identifier from the cookie
    const userIdentifier = getCookie('userIdentifier');
    if (userIdentifier) {
      config.headers['User-Identifier'] = userIdentifier;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
