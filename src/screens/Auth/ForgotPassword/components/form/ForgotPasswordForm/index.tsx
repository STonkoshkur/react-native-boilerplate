import React, { FC } from 'react';
import { View } from 'react-native';
import { useForm, UseFormMethods } from 'react-hook-form';
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
    setError: UseFormMethods<AuthForgotPasswordDto>['setError'],
  ) => (data: AuthForgotPasswordDto) => Promise<void>;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = (props) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setError } = useForm<
    AuthForgotPasswordDto
  >({
    resolver: yupResolver(schemaValidation),
  });

  return (
    <View>
      <Input
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
        title={t('common:submit')}
        onPress={handleSubmit(props.onSubmit(setError))}
      />
    </View>
  );
};

export default ForgotPasswordForm;
