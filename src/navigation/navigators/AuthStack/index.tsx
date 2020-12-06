import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// navigation
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// screens
import SignInScreen from 'src/screens/Auth/SignIn';
import SignUpScreen from 'src/screens/Auth/SignUp';

/*
 * Stack navigator
 * Guide: https://reactnavigation.org/docs/hello-react-navigation
 * Docs: https://reactnavigation.org/docs/stack-navigator
 */
const Stack = createStackNavigator<RootNavigationStackParamsList>();

const AuthStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
