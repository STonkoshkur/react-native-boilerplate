/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC } from 'react';
import { AppNavigationContainer } from 'src/navigation';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'src/store';
import { I18nextProvider } from 'react-i18next';
import { AppearanceProvider } from 'react-native-appearance';
import i18n from './services/localization';

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppearanceProvider>
          <AppNavigationContainer />
        </AppearanceProvider>
      </I18nextProvider>
    </StoreProvider>
  );
};

export default App;
