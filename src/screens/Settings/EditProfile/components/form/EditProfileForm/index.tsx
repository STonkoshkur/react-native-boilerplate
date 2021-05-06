import React, { FC, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, UseFormReturn } from 'react-hook-form';
// types
import { ProfileUpdateDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
// components
import Avatar from 'src/components/Avatar';
import Input from 'src/components/FormAdapters/HookForm/Input';
import MediaPicker from 'src/components/FormAdapters/HookForm/MediaPicker';
import AppBarAction from 'src/components/AppBar/Action';
// navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsNavigationStackParamsList } from 'src/navigation/navigators/SettingsStack/types';
import { Routes } from 'src/navigation';
// localization
import { useTranslation } from 'react-i18next';
// store
import { useSelector } from 'react-redux';
import { getAuthUserSelector } from 'src/store/modules/auth/selectors';
// hooks
import { useUnsavedFormChangesAlert } from 'src/hooks/useUnsavedFormChangesAlert';
// types
import { MediaPickerFileEntity } from 'src/components/Form/MediaPicker';

export type EditProfileFormProps = {
  onSubmit: (
    setError: UseFormReturn<ProfileUpdateDto>['setError'],
  ) => (data: ProfileUpdateDto) => Promise<void>;
};

const EditProfileForm: FC<EditProfileFormProps> = ({ onSubmit }) => {
  const navigation = useNavigation<
    StackNavigationProp<
      SettingsNavigationStackParamsList,
      Routes.SettingsProfile
    >
  >();
  const { t } = useTranslation(['common', 'settings']);
  const authProfile = useSelector(getAuthUserSelector);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileUpdateDto & { email?: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      photo: authProfile?.photo,
      firstName: authProfile?.firstName,
      lastName: authProfile?.lastName,
    },
  });

  const { handleUnsavedFormChangesCancellation } = useUnsavedFormChangesAlert(
    isDirty,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppBarAction
          testID="closeEditProfileButton"
          icon="close-outline"
          onPress={handleUnsavedFormChangesCancellation}
        />
      ),
      headerRight: () => (
        <AppBarAction
          testID="submitEditProfileButton"
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
      <MediaPicker
        name="photo"
        control={control}
        defaultValue={authProfile?.photo ?? null}
        options={{
          cropperCircleOverlay: true,
        }}>
        {({ value, pickMediaFiles }) => (
          <TouchableOpacity
            testID="editProfileMediaPicker"
            activeOpacity={0.8}
            onPress={pickMediaFiles}
            style={styles.photoPickerWrapper}>
            <Avatar
              size="large"
              label={authProfile?.initials ?? ''}
              source={{ uri: (value as MediaPickerFileEntity)?.path }}
            />
          </TouchableOpacity>
        )}
      </MediaPicker>

      <Input
        testID="editProfileEmail"
        label={t('common:email')}
        control={control}
        name="email"
        defaultValue={authProfile?.email ?? ''}
        editable={false}
      />

      <Input
        testID="editProfileFirstName"
        label={t('common:firstName')}
        control={control}
        name="firstName"
        defaultValue=""
        error={errors?.firstName?.message}
      />

      <Input
        testID="editProfileLastName"
        label={t('common:lastName')}
        control={control}
        name="lastName"
        defaultValue=""
        error={errors?.lastName?.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photoPickerWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 32,
  },
});

export default EditProfileForm;
