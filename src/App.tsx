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
import { AppearanceProvider } from 'react-native-appearance';
import { AppNavigationContainer } from './navigation';

const App: FC = () => {
  return (
    <>
      <AppearanceProvider>
        <AppNavigationContainer />
      </AppearanceProvider>
    </>
  );
};

export default App;
