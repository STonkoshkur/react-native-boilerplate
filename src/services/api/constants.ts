import { Platform } from 'react-native';
// Base url constants.
// For iOS local server available on locahost.
// For Android local server available on 10.0.2.2
export const BASE_URL =
  Platform.OS === 'android'
    ? `http://10.0.2.2:3000/api/v1`
    : `http://localhost:3000/api/v1`;

// headers constants
export const HEADER_LOCALIZATION_KEY = 'x-localization';
