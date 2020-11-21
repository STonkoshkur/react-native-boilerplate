import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// Styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type TmpIndexScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackIndex
>;

const TmpIndexScreen: FC<TmpIndexScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeSchema();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: colors.text }}>Example Index Screen</Text>
      <Button
        title="Show nested screen"
        onPress={(): void => {
          navigation.push(Routes.ExampleStackChild, {
            payload: `Opened from ${route.name as string}`,
          });
        }}
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
