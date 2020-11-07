import React, { FC, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// navigation
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
import ExmapleStackNavigator from '../ExampleStack';

/*
 * Bottom Tabs navigator
 * Guide: https://reactnavigation.org/docs/tab-based-navigation
 * Docs: https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Tab = createBottomTabNavigator<RootNavigationStackParamsList>();

const HomeTabsNavigator: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.Tab1}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon name={focused ? 'home' : 'home-outline'} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Tab2}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon name={focused ? 'planet' : 'planet-outline'} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Tab3}
        component={ExmapleStackNavigator}
        options={{
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon name={focused ? 'settings' : 'settings-outline'} {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;
