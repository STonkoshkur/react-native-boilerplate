import { useTheme } from '@react-navigation/native';
import { ThemeSchema } from 'src/styles';

/*
 * Wrapper for react-navigation useTheme hook
 * Provide TS support for additional theme colors,
 * that are not provided by react-navigation theme schemas
 */
export const useThemeSchema = (): ThemeSchema => {
  const schema = useTheme();

  return schema as ThemeSchema;
};
