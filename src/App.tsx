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
import { I18nextProvider } from 'react-i18next';
import { AppNavigationContainer } from './navigation';
import i18n from './services/localization';

const App: FC = () => {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AppNavigationContainer />
      </I18nextProvider>
    </>
  );
};

export default App;
