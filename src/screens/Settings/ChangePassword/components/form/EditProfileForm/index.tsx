import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useForm, UseFormReturn } from 'react-hook-form';
// types
import { ProfileUpdatePasswordDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from './validation';
// components
import Input from 'src/components/FormAdapters/HookForm/Input';
import AppBarAction from 'src/components/AppBar/Action';
// navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsNavigationStackParamsList } from 'src/navigation/navigators/SettingsStack/types';
import { Routes } from 'src/navigation';
// localization
import { useTranslation } from 'react-i18next';
// hooks
import { useUnsavedFormChangesAlert } from 'src/hooks/useUnsavedFormChangesAlert';

type ChangePasswordFormProps = {
  onSubmit: (
    setError: UseFormReturn<ProfileUpdatePasswordDto>['setError'],
  ) => (data: ProfileUpdatePasswordDto) => Promise<void>;
};

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const navigation = useNavigation<
    StackNavigationProp<
      SettingsNavigationStackParamsList,
      Routes.SettingsChangePassword
    >
  >();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileUpdatePasswordDto>({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const { handleUnsavedFormChangesCancellation } = useUnsavedFormChangesAlert(
    isDirty,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppBarAction
          testID="closeEditPasswordButton"
          icon="close-outline"
          onPress={handleUnsavedFormChangesCancellation}
        />
      ),
      headerRight: () => (
        <AppBarAction
          testID="submitEditPasswordButton"
          isLoading={isSubmitting}
          icon="checkmark-outline"
          onPress={handleSubmit(onSubmit(setError))}
          disabled={!isDirty}
        />
      ),
    });
  }, [
    navigation,
    isDirty,
    isSubmitting,
    handleUnsavedFormChangesCancellation,
    handleSubmit,
    onSubmit,
    setError,
  ]);

  return (
    <View>
      <Input
        testID="editOldPassword"
        label={t('settings:currentPassword')}
        control={control}
        name="oldPassword"
        defaultValue=""
        textContentType="oneTimeCode"
        clearTextOnFocus={false}
        secureTextEntry
        error={errors?.oldPassword?.message}
      />
      <Input
        testID="editNewPassword"
        label={t('settings:newPassword')}
        control={control}
        name="password"
        defaultValue=""
        textContentType="oneTimeCode"
        secureTextEntry
        clearTextOnFocus={false}
        error={errors?.password?.message}
      />
      <Input
        testID="editNewPasswordConfirmation"
        label={t('settings:confirmPassword')}
        control={control}
        name="passwordConfirmation"
        defaultValue=""
        textContentType="oneTimeCode"
        secureTextEntry
        clearTextOnFocus={false}
        error={errors?.passwordConfirmation?.message}
      />
    </View>
  );
};

export default ChangePasswordForm;
