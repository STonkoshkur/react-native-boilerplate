// redux
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// root reducer
import rootReducer from 'src/store/rootReducer';
// services
import AsyncStorage from '@react-native-community/async-storage';

export const persistConfig = {
  key: 'persist-data',
  keyPrefix: 'persist-data-prefix-',
  storage: AsyncStorage,
};

export type RootState = ReturnType<typeof rootReducer>;
export type MiddlewareOptions = { serializableCheck: boolean };

export const store = configureStore({
  reducer: persistReducer<RootState>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => [
    // default middleware
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  devTools: !!__DEV__,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store.getState();
