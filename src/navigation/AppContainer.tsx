import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, Platform, useColorScheme } from 'react-native';
import ToastProvider from 'src/components/Toast/Context';
// components
import Toast from 'src/components/Toast';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from 'src/navigation/navigators/HomeTabs';
import AuthNavigator from 'src/navigation/navigators/AuthStack';
// api
import api from 'src/services/api';
// store
import { useSelector, useDispatch } from 'react-redux';
import {
  getAuthUserSelector,
  getAuthTokenSelector,
} from 'src/store/modules/auth/selectors';
import { updateAuthUser, clearAuth } from 'src/store/modules/auth';
// styling
import { darkTheme, lightTheme } from 'src/styles';
import { getPersistRehydratedSelector } from 'src/store/modules/persist/selectors';

const RootStack = createStackNavigator();

const AppNavigationContainer: FC = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(getAuthTokenSelector);
  const user = useSelector(getAuthUserSelector);
  const isRehydrated = useSelector(getPersistRehydratedSelector);

  /*
   * getColorScheme() will always return light when debugging with Chrome
   *
   * https://reactnative.dev/docs/appearance#getcolorscheme
   */
  const colorScheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(true);

  const isDarkModeEnabled = useMemo(
    () => colorScheme === 'dark',
    [colorScheme],
  );

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

  const bootstrap = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    if (token) {
      try {
        const userProfile = await api.auth.getProfile();

        if (userProfile) {
          dispatch(updateAuthUser(userProfile));
        }
      } catch (e) {
        dispatch(clearAuth());
      }
    }

    setIsLoading(false);
  }, [token, dispatch]);

  useEffect(() => {
    if (isRehydrated) {
      bootstrap();
    }
  }, [isRehydrated, bootstrap]);

  if (isLoading) {
    return <></>;
  }

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
        <ToastProvider>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <RootStack.Screen
                name="HomeNavigator"
                component={HomeNavigator}
              />
            ) : (
              <RootStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
              />
            )}
          </RootStack.Navigator>

          <Toast />
        </ToastProvider>
      </NavigationContainer>
    </>
  );
};

export default AppNavigationContainer;
