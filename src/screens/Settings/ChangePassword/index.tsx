import React, { FC, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { UseFormReturn } from 'react-hook-form';
import axios from 'axios';
// components
import SignUpForm from './components/form/EditProfileForm';
import KeyboardView from 'src/components/KeyboardView';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// localization
import { useTranslation } from 'react-i18next';
// api
import api from 'src/services/api';
// store
import { useDispatch } from 'react-redux';
import { updateAuthUser } from 'src/store/modules/auth';
// types
import { ProfileUpdatePasswordDto } from 'src/services/api/dtos/Auth';
// hooks
import { useToast } from 'src/hooks/useToast';
// services
import transformErrors from 'src/services/utils/transformErrors';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type ChangePasswordScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.SettingsChangePassword
>;

const ChangePasswordScreen: FC<ChangePasswordScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { colors } = useThemeSchema();
  const { t } = useTranslation(['settings']);

  const onSubmit = useCallback(
    <T extends ProfileUpdatePasswordDto>(
        setError: UseFormReturn<T>['setError'],
      ) =>
      async (data: T): Promise<void> => {
        try {
          const updatedProfile = await api.auth.updateProfile(data);

          dispatch(updateAuthUser(updatedProfile));
          showToast(t('settings:passwordUpdated'), {
            type: 'success',
          });

          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        } catch (e) {
          showToast(t('settings:passwordUpdatingError'), {
            type: 'error',
          });

          if (axios.isAxiosError(e)) {
            if (e.response?.status === 422) {
              transformErrors<T>(e.response?.data.errors).forEach(
                (formError) => {
                  setError(formError.name, formError.error);
                },
              );
            }
          }
        }
      },
    [showToast, navigation, t, dispatch],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <KeyboardView>
        <ScrollView
          testID="changePasswordScroll"
          keyboardShouldPersistTaps="handled">
          <SignUpForm onSubmit={onSubmit} />
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

export default ChangePasswordScreen;
