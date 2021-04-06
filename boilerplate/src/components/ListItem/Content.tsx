import React, { FC, memo, PropsWithChildren } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export type ListItemContentProps = ViewProps;

const ListItemContent: FC<PropsWithChildren<ListItemContentProps>> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(ListItemContent);
