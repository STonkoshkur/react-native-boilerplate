import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
import DetailsInfoIcon from 'src/assets/vector/DetailsInfo';

type TmpNestedScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackChild
>;

const TmpNestedScreen: FC<TmpNestedScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <DetailsInfoIcon color="#8E8E93" size={80} />

      <Text style={styles.title}>Nested Screen</Text>
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
  title: {
    marginTop: 16,
  },
});

export default TmpNestedScreen;
