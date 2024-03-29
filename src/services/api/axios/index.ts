import { Alert } from 'react-native';
import axios, { AxiosRequestConfig } from 'axios';
// constants
import { BASE_URL } from 'src/services/api/constants';
import debounce from 'lodash/debounce';
// services
import { getAuthToken } from 'src/services/storage/auth';
// localization
import i18n from 'src/services/localization';

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
  (config): AxiosRequestConfig => {
    if (handlerEnabled(config)) {
      const authToken = getAuthToken();

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
    const { response } = responseData;
    const status = Number(response?.status);

    if (status >= 500) {
      showErrorAlert(
        i18n.t('errors:serverError'),
        i18n.t('errors:statusCode', {
          code: status.toString() || 'N/A',
        }),
      );
    }

    return Promise.reject(responseData);
  },
);

export default axiosInstance;
