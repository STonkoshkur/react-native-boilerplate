import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';

type TmpNestedScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackChild
>;

const TmpNestedScreen: FC<TmpNestedScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Nested Screen</Text>
      <Text>{route.params.payload}</Text>
      <Button title="Go back" onPress={navigation.goBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default TmpNestedScreen;
