import {
  Theme as NavigationTheme,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

/*
 * Theming is based on react navigation themes.
 * It can be overrided or exrended in types and schemas
 * By default, only colors from react navigation themes are provided.
 * But any custom color properties can be defined here
 * and used in UI via useThemeSchema hook.
 *
 * React navigation thems doc: https://reactnavigation.org/docs/themes/
 */

// types

type ThemeSchemaColors = NavigationTheme['colors'] & {
  // Custom color properties can be defined here
};

export type ThemeSchema = {
  dark: boolean;
  colors: ThemeSchemaColors;
};

// schemas

export const darkTheme: ThemeSchema = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
};

export const lightTheme: ThemeSchema = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};