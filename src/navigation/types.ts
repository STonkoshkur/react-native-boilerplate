import { HomeNavigationParamsList } from 'src/navigation/navigators/HomeTabs/types';
import { ExampleNavigationStackParamsList } from 'src/navigation/navigators/ExampleStack/types';
import { AuthNavigationStackParamsList } from 'src/navigation/navigators/AuthStack/types';
import { SettingsNavigationStackParamsList } from 'src/navigation/navigators/SettingsStack/types';

export type RootNavigationStackParamsList = HomeNavigationParamsList &
  AuthNavigationStackParamsList &
  SettingsNavigationStackParamsList &
  ExampleNavigationStackParamsList;
