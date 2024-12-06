import { apiBaseUrl } from "./utils/constants";

interface ConfigProps {
  api: string;
}

let config: ConfigProps | null = null;

export const getConfigValue = async (
  key: keyof ConfigProps
): Promise<string> => {
  const c = await getConfigData();

  return (c && c[key]) || "";
};

const getConfigData = async (): Promise<Partial<ConfigProps>> => {
  if (config) {
    return config;
  }

  try {
    config = {
      api: process.env.REACT_APP_API_URL || '',
    };

  } catch (e) {
    console.error("Config data is not defined");
  }

  return config || {};
};

export const getApiUrl = async (): Promise<string> => {
  try {
    return (await getConfigValue("api")) || apiBaseUrl;
  } catch (e) {
    return apiBaseUrl;
  }
};

export default getApiUrl;