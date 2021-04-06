import { HomeNavigationParamsList } from 'src/navigation/navigators/HomeTabs/types';
import { ExampleNavigationStackParamsList } from 'src/navigation/navigators/ExampleStack/types';
import { AuthNavigationStackParamsList } from 'src/navigation/navigators/AuthStack/types';

export type RootNavigationStackParamsList = HomeNavigationParamsList &
  AuthNavigationStackParamsList &
  ExampleNavigationStackParamsList;
