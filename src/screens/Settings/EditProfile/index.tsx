import React, { FC, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { UseFormReturn } from 'react-hook-form';
// components
import SignUpForm from './components/form/EditProfileForm';
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
// hooks
import { useToast } from 'src/hooks/useToast';
// services
import transformErrors from 'src/services/utils/transformErrors';
// types
import { ProfileUpdateDto } from 'src/services/api/dtos/Auth';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type ProfileEditScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.SettingsProfile
>;

const ProfileEditScreen: FC<ProfileEditScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['settings']);
  const { colors } = useThemeSchema();
  const { showToast } = useToast();

  const onSubmit = useCallback(
    <T extends ProfileUpdateDto>(setError: UseFormReturn<T>['setError']) =>
      async (data: T): Promise<void> => {
        try {
          const updatedProfile = await api.auth.updateProfile(data);

          dispatch(updateAuthUser(updatedProfile));
          showToast(t('settings:profileUpdated'), {
            type: 'success',
          });

          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        } catch (e) {
          showToast(t('settings:profileUpdatingError'), {
            type: 'error',
          });

          if (e.status === 422) {
            transformErrors<T>(e.data.errors).forEach((formError) => {
              setError(formError.name, formError.error);
            });
          }
        }
      },
    [showToast, navigation, t],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <ScrollView
        testID="editProfileScroll"
        keyboardShouldPersistTaps="handled">
        <SignUpForm onSubmit={onSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileEditScreen;
