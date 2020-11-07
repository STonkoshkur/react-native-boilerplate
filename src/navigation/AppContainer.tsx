import React, { FC } from 'react';
import { StatusBar } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './navigators/HomeTabs';

const AppNavigationContainer: FC = (props) => {
  return (
    <>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />

      <NavigationContainer {...props}>
        <HomeNavigator />
      </NavigationContainer>
    </>
  );
};

export default AppNavigationContainer;
