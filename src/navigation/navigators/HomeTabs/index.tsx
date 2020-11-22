import React, { FC, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// navigation
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
import ExmapleStackNavigator from '../ExampleStack';
// localization
import { useTranslation } from 'react-i18next';

/*
 * Bottom Tabs navigator
 * Guide: https://reactnavigation.org/docs/tab-based-navigation
 * Docs: https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Tab = createBottomTabNavigator<RootNavigationStackParamsList>();

const HomeTabsNavigator: FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.Tab1}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon name={focused ? 'home' : 'home-outline'} {...props} />
          ),
          tabBarLabel: t('common:home'),
        }}
      />
      <Tab.Screen
        name={Routes.Tab2}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon name={focused ? 'planet' : 'planet-outline'} {...props} />
          ),
          tabBarLabel: 'WoW',
        }}
      />
      <Tab.Screen
        name={Routes.Tab3}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon name={focused ? 'settings' : 'settings-outline'} {...props} />
          ),
          tabBarLabel: t('common:settings'),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;
