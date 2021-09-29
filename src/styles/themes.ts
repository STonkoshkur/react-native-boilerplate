import {
  Theme as NavigationTheme,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import Colors from './colors';

/*
 * Theming is based on react navigation themes.
 * It can be overrided or exrended in types and schemas
 * By default, only colors from react navigation themes are provided.
 * But any custom color properties can be defined here
 * and used in UI via useThemeSchema hook.
 *
 * React navigation themes doc: https://reactnavigation.org/docs/themes/
 */

// types

/**
 * Additional theme colors properties used to extend react-navigation themes.
 * Another custom color can be added here.
 */
type ExtendedThemeSchemaColorsKeys =
  | 'error'
  | 'input'
  | 'mutedText'
  | 'alternativeText';

type ThemeSchemaColors = NavigationTheme['colors'] & {
  [k in ExtendedThemeSchemaColorsKeys]: string;
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
    error: Colors.coralRed,
    input: Colors.charcoalGray,
    mutedText: Colors.suitGray,
    alternativeText: Colors.black,
  },
};

export const lightTheme: ThemeSchema = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    error: Colors.orangeRed,
    input: Colors.white,
    mutedText: Colors.suitGray,
    alternativeText: Colors.white,
  },
};
