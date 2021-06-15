import React, { FC, memo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// components
import Icon from 'src/components/Icon';
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
        style,
      ]}
      activeOpacity={activeOpacity}
      disabled={!!disabled}>
      {!!isLoading && (
        <View style={styles.loadingIndicatorWrapper}>
          <ActivityIndicator size="small" color={defaultColor} />
        </View>
      )}

      <Icon
        name={icon}
        size={size}
        color={defaultColor}
        fontFamily="Ionicons"
        style={[
          !!disabled && styles.disabledOpacity,
          !!isLoading && styles.iconWhileLoading,
        ]}
      />
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
  loadingIndicatorWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWhileLoading: {
    opacity: 0,
  },
  disabledOpacity: {
    opacity: 0.4,
  },
});

export default memo(AppBarAction);
