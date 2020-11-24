import AsyncStorage from '@react-native-community/async-storage';

// store
import { persistConfig } from 'src/store';

export const getAuthToken = async (): Promise<string | null | undefined> => {
  return JSON.parse(
    JSON.parse(
      (await AsyncStorage.getItem(
        persistConfig.keyPrefix + persistConfig.key,
      )) || '{}',
    )?.auth || '{}',
  ).token;
};
