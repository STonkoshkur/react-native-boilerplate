import React, { FC, useCallback } from 'react';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// store
import { useDispatch } from 'react-redux';
import { clearAuth } from 'src/store/modules/auth';
// localization
import { useTranslation } from 'react-i18next';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type TmpIndexScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ExampleStackIndex
>;

const TmpIndexScreen: FC<TmpIndexScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { colors } = useThemeSchema();
  const dispatch = useDispatch();

  const onLogout = useCallback((): void => {
    dispatch(clearAuth());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('common:welcome')}
      </Text>

      <Text style={{ color: colors.text }}>Example Index Screen</Text>
      <Button
        title="Show nested screen"
        onPress={(): void => {
          navigation.push(Routes.ExampleStackChild, {
            payload: `Opened from ${route.name as string}`,
          });
        }}
      />
      <Button title="Logout" onPress={onLogout} />
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
