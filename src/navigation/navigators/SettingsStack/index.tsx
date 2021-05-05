import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// navigation
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// screens
import SettingsIndexScreen from 'src/screens/Settings/Index';
// localization
import { useTranslation } from 'react-i18next';

/*
 * Stack navigator
 *
 * Guide: https://reactnavigation.org/docs/hello-react-navigation
 * Docs: https://reactnavigation.org/docs/stack-navigator
 */
const Stack = createStackNavigator<RootNavigationStackParamsList>();

const SettingsStackNavigator: FC = () => {
  const { t } = useTranslation(['common', 'settings']);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.SettingsIndex}
        component={SettingsIndexScreen}
        options={() => ({
          title: t('settings:settings'),
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
