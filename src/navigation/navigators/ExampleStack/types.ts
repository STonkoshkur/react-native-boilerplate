import Routes from 'src/navigation/routes';

export type ExampleNavigationStackParamsList = {
  [Routes.ExampleStackIndex]: undefined;
  [Routes.ExampleStackChild]: {
    payload: string;
  };
};
