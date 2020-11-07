import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';

type TmpIndexScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackIndex
>;

const TmpIndexScreen: FC<TmpIndexScreenProps> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Example Index Screen</Text>
      <Button
        title="Show nested screen"
        onPress={() =>
          navigation.push(Routes.ExampleStackChild, {
            payload: `Opened from ${route.name as string}`,
          })
        }
      />
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

export default TmpIndexScreen;
