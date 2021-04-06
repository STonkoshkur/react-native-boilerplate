import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
// components
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

export type ListItemIconProps = IconProps;

const ListItemIcon: FC<ListItemIconProps> = ({
  style,
  color,
  size = 22,
  ...props
}) => {
  const { colors } = useThemeSchema();

  return (
    <Icon
      {...props}
      size={size}
      color={color ?? colors.mutedText}
      style={[styles.container, style]}
    />
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default memo(ListItemIcon);
