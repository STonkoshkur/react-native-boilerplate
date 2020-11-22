import React, { FC } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// localization
import { useTranslation } from 'react-i18next';

type TmpIndexScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackIndex
>;

const TmpIndexScreen: FC<TmpIndexScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('common:welcome')}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});

export default TmpIndexScreen;
