import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
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
import { useColorScheme } from 'react-native-appearance';
import { darkTheme, lightTheme } from 'src/styles';

const RootStack = createStackNavigator();

const AppNavigationContainer: FC = props => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const token = useSelector(getAuthTokenSelector);
  const user = useSelector(getAuthUserSelector);

  const [isLoading, setIsLoading] = useState(true);

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
    bootstrap();
  }, [bootstrap]);

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
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
          ) : (
            <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigationContainer;
