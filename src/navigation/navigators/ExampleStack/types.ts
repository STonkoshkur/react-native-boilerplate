import Routes from '../../routes';

export type ExampleNavigationStackParamsList = {
  [Routes.ExampleStackIndex]: undefined;
  [Routes.ExampleStackChild]: {
    payload: string;
  };
};
