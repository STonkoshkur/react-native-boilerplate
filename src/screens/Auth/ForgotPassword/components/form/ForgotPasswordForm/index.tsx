import React, { FC } from 'react';
import { View } from 'react-native';
import { useForm, UseFormReturn } from 'react-hook-form';
// types
import { AuthForgotPasswordDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from './validation';
// components
import Input from 'src/components/FormAdapters/HookForm/Input';
import Button from 'src/components/Button';
// localization
import { useTranslation } from 'react-i18next';

type ForgotPasswordFormProps = {
  onSubmit: (
    setError: UseFormReturn<AuthForgotPasswordDto>['setError'],
  ) => (data: AuthForgotPasswordDto) => Promise<void>;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthForgotPasswordDto>({
    resolver: yupResolver(schemaValidation),
  });

  return (
    <View>
      <Input
        testID="forgotPasswordEmail"
        label={t('common:email')}
        control={control}
        name="email"
        defaultValue=""
        autoCapitalize="none"
        autoCompleteType="email"
        autoCorrect={false}
        keyboardType="email-address"
        error={errors?.email?.message}
      />

      <Button
        testID="forgotPasswordButton"
        title={t('common:submit')}
        onPress={handleSubmit(props.onSubmit(setError))}
      />
    </View>
  );
};

export default ForgotPasswordForm;
