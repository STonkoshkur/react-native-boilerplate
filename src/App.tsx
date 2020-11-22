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

const App: FC = () => {
  return (
    <>
      <StoreProvider store={store}>
        <AppNavigationContainer />
      </StoreProvider>
    </>
  );
};

export default App;
