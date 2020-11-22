import React, { FC, useMemo } from 'react';
import { StatusBar, Platform } from 'react-native';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './navigators/HomeTabs';
// Styling
import { useColorScheme } from 'react-native-appearance';
import { darkTheme, lightTheme } from 'src/styles';

const AppNavigationContainer: FC = (props) => {
  const colorScheme = useColorScheme();

  const isDarkModeEnabled = useMemo(() => colorScheme === 'dark', [
    colorScheme,
  ]);

  const barStyle = useMemo(() => {
    /*
     * Android StatusBar colors are needed to be inverted to the 'default' barStyle value.
     * By default, dark-content is enabled for dark mode, and light-content for light mode in Android
     * There is transparent background for StatusBar in RN boilerplate, so it's needed to invert colors.
     */
    const androidBarStyle = isDarkModeEnabled
      ? 'light-content'
      : 'dark-content';

    return Platform.OS === 'android' ? androidBarStyle : 'default';
  }, [isDarkModeEnabled]);

  return (
    <>
      <StatusBar
        barStyle={barStyle}
        backgroundColor="transparent"
        networkActivityIndicatorVisible
        translucent
      />

      <NavigationContainer
        {...props}
        theme={isDarkModeEnabled ? darkTheme : lightTheme}>
        <HomeNavigator />
      </NavigationContainer>
    </>
  );
};

export default AppNavigationContainer;
