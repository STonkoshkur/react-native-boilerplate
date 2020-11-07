import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// navigation
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// screens
import TmpIndexScreen from 'src/screens/TMP/Index';
import TmpNestedScreen from 'src/screens/TMP/Nested';

/*
 * Stack navigator
 * Guide: https://reactnavigation.org/docs/hello-react-navigation
 * Docs: https://reactnavigation.org/docs/stack-navigator
 */
const Stack = createStackNavigator<RootNavigationStackParamsList>();

const ExmapleStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.ExampleStackIndex}
        component={TmpIndexScreen}
      />
      <Stack.Screen
        name={Routes.ExampleStackChild}
        component={TmpNestedScreen}
        initialParams={{
          payload: 'Initial payload',
        }}
      />
    </Stack.Navigator>
  );
};

export default ExmapleStackNavigator;
