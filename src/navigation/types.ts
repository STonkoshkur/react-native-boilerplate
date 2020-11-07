import { HomeNavigationParamsList } from 'src/navigation/navigators/HomeTabs/types';
import { ExampleNavigationStackParamsList } from 'src/navigation/navigators/ExampleStack/types';

export type RootNavigationStackParamsList = HomeNavigationParamsList &
  ExampleNavigationStackParamsList;
