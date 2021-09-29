import React, { FC } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// navigation
import { useHeaderHeight } from '@react-navigation/elements';

const KeyboardView: FC = (props) => {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      enabled={Platform.select({
        ios: true,
        android: false,
      })}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardView;
