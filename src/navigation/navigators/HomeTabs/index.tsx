import React, { FC, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// components
import Icon from 'src/components/Icon';
import AppBarAction from 'src/components/AppBar/Action';
// navigation
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
import SettingsStackNavigator from 'src/navigation/navigators/SettingsStack';
import ExmapleStackNavigator from 'src/navigation/navigators/ExampleStack';
// screens
import EditProfile from 'src/screens/Settings/EditProfile';
import ChangePasswordScreen from 'src/screens/Settings/ChangePassword';
// localization
import { useTranslation } from 'react-i18next';

/*
 * Bottom Tabs navigator
 *
 * Guide: https://reactnavigation.org/docs/tab-based-navigation
 * Docs: https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Tab = createBottomTabNavigator<RootNavigationStackParamsList>();

/*
 * Root stack navigator
 * Used to create full-screen modal pages
 *
 * Guide: https://reactnavigation.org/docs/modal
 * Docs: https://reactnavigation.org/docs/stack-navigator
 */
const Stack = createStackNavigator<RootNavigationStackParamsList>();

const HomeTabsNavigator: FC = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.Tab1}
        component={ExmapleStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              fontFamily="Ionicons"
              {...props}
            />
          ),
          tabBarLabel: t('common:home'),
        }}
      />
      <Tab.Screen
        name={Routes.Tab2}
        component={ExmapleStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon
              name={focused ? 'planet' : 'planet-outline'}
              fontFamily="Ionicons"
              {...props}
            />
          ),
          tabBarLabel: 'WoW',
        }}
      />
      <Tab.Screen
        name={Routes.SettingsTab}
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, ...props }): ReactNode => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              fontFamily="Ionicons"
              {...props}
            />
          ),
          tabBarLabel: t('common:settings'),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
      }}>
      <Stack.Screen
        name={Routes.Main}
        component={HomeTabsNavigator}
        options={{ headerShown: false }}
      />

      {/* Settings forms screens */}
      <Stack.Screen
        name={Routes.SettingsProfile}
        component={EditProfile}
        options={({ navigation }) => ({
          title: t('settings:editProfile'),
          gestureEnabled: false,
          headerLeft: () => (
            <AppBarAction icon="close-outline" onPress={navigation.goBack} />
          ),
        })}
      />
      <Stack.Screen
        name={Routes.SettingsChangePassword}
        component={ChangePasswordScreen}
        options={() => ({
          title: t('settings:changePassword'),
          gestureEnabled: false,
        })}
      />

      {/* Add screens that should open as full-screen modal here */}
    </Stack.Navigator>
  );
};

export default MainStack;
