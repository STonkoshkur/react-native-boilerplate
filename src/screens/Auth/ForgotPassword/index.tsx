import React, { FC, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { UseFormMethods } from 'react-hook-form';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// api
import api from 'src/services/api';
// components
import ForgotPasswordForm from './components/form/ForgotPasswordForm';
import KeyboardView from 'src/components/KeyboardView';
// services
import transformErrors from 'src/services/utils/transformErrors';
// localization
import { useTranslation } from 'react-i18next';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
// types
import { AuthForgotPasswordDto } from 'src/services/api/dtos/Auth';

type ForgotPaaswordScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.ForgotPassword
>;

const ForgotPasswordScreen: FC<ForgotPaaswordScreenProps> = ({
  navigation,
}) => {
  const { colors } = useThemeSchema();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    <T extends AuthForgotPasswordDto>(
      setError: UseFormMethods<T>['setError'],
    ) => async (data: T): Promise<void> => {
      try {
        await api.auth.forgotPassword(data);

        Alert.alert(
          t('common:forgotPasswordSuccessTitle'),
          t('common:forgotPasswordSuccessMessage'),
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );

        navigation.goBack();
      } catch (e) {
        if (e.status === 422) {
          transformErrors<T>(e.data.errors).forEach((formError) => {
            setError(formError.name, formError.error);
          });
        }
      }
    },
    [t, navigation],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <KeyboardView>
        <ScrollView
          testID="forgotPasswordScroll"
          keyboardShouldPersistTaps="handled">
          <ForgotPasswordForm onSubmit={onSubmit} />
        </ScrollView>
      </KeyboardView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ForgotPasswordScreen;
