import { Alert } from 'react-native';
import axios, { AxiosRequestConfig } from 'axios';
// constants
import { BASE_URL } from 'src/services/api/constants';
import { debounce } from 'lodash';
// services
import { getAuthToken } from 'src/services/storage/auth';

export const handlerEnabled = (config: AxiosRequestConfig): boolean => {
  return config?.params?.handlerEnabled || true;
};

export const showErrorAlert = debounce((title: string, message?: string) => {
  Alert.alert(title, message, [{ text: 'OK' }], {
    cancelable: false,
  });
}, 500);

// create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

/* request interceptor */
axiosInstance.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig> => {
    if (handlerEnabled(config)) {
      const authToken = await getAuthToken();

      config.headers.authorization = `Bearer ${authToken || ''}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* response interceptor */
axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (responseData = {}) => {
    const { response, message } = responseData;
    const data = response?.data;
    const status = response?.status as number;

    if (status >= 500) {
      showErrorAlert(
        'Server error',
        `Status code: ${status.toString() || 'N/A'}`,
      );
    }

    return Promise.reject({
      data,
      message,
      status,
    });
  },
);

export default axiosInstance;
