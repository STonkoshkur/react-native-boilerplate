import React, { FC, memo, PropsWithChildren } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
import { Colors, Spacing } from 'src/styles';

type CardProps = ViewProps;

const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useThemeSchema();

  return (
    <View
      {...props}
      style={[styles.cardWrapper, { backgroundColor: colors.card }, style]}>
      <>{children}</>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.base,
    overflow: 'hidden',
  },
});

export default memo(Card);
