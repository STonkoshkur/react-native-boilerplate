import React, { FC, memo } from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// components
import Icon from 'react-native-vector-icons/Ionicons';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
import { Spacing } from 'src/styles';

export type AppBarActionProps = {
  testID?: string;
  icon: string;
  size?: number;
  color?: string;
  disabled?: boolean;
  activeOpacity?: number;
  horizontalSpacing?: number;
  isLoading?: boolean;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
};

const AppBarAction: FC<AppBarActionProps> = ({
  testID,
  size = 28,
  activeOpacity = 0.8,
  horizontalSpacing = Spacing.double,
  isLoading,
  disabled,
  onPress,
  icon,
  color,
  style,
}) => {
  const { colors } = useThemeSchema();

  const defaultColor = color ?? colors.primary;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={[
        styles.container,
        !!horizontalSpacing && { paddingHorizontal: horizontalSpacing },
        { minWidth: size + horizontalSpacing * 2 },
        style,
      ]}
      activeOpacity={activeOpacity}
      disabled={!!disabled}>
      {isLoading ? (
        <ActivityIndicator size="small" color={defaultColor} />
      ) : (
        <Icon name={icon} size={size} color={defaultColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: Spacing.double,
    paddingVertical: Spacing.tiny,
  },
});

export default memo(AppBarAction);
