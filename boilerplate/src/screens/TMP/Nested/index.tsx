import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// Navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// Assets
import DetailsInfoIcon from 'src/assets/vector/DetailsInfo';
// Styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type TmpNestedScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackChild
>;

const TmpNestedScreen: FC<TmpNestedScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeSchema();

  return (
    <SafeAreaView style={styles.container}>
      <DetailsInfoIcon color={colors.primary} size={80} />

      <Text style={[styles.title, { color: colors.text }]}>Nested Screen</Text>
      <Text style={{ color: colors.text }}>{route.params.payload}</Text>

      <Button
        title="Go back"
        onPress={(): void => {
          navigation.goBack();
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
  title: {
    marginTop: 16,
  },
});

export default TmpNestedScreen;
