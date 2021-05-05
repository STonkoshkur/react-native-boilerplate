import Routes from 'src/navigation/routes';

type TabNavigationParams = undefined;

export type HomeNavigationParamsList = {
  [Routes.Main]: undefined;
  [Routes.SettingsTab]: TabNavigationParams;
  // Example tabs
  [Routes.Tab1]: TabNavigationParams;
  [Routes.Tab2]: TabNavigationParams;
};
