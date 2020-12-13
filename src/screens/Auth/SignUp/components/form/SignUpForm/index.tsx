import React, { FC } from 'react';
import { View } from 'react-native';
import { useForm, UseFormMethods } from 'react-hook-form';
// types
import { AuthRegistrationDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from './validation';
// components
import Button from 'src/components/Button';
import Input from 'src/components/FormAdapters/HookForm/Input';
// localization
import { useTranslation } from 'react-i18next';

type SignUpFormProps = {
  onSubmit: (
    setError: UseFormMethods<AuthRegistrationDto>['setError'],
  ) => (data: AuthRegistrationDto) => Promise<void>;
};

const SignUpForm: FC<SignUpFormProps> = (props) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setError } = useForm<
    AuthRegistrationDto
  >({
    resolver: yupResolver(schemaValidation),
  });

  return (
    <View>
      <Input
        testID="signUpEmail"
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

      <Input
        testID="signUpPassword"
        label={t('common:password')}
        control={control}
        name="password"
        defaultValue=""
        secureTextEntry={true}
        textContentType="oneTimeCode"
        clearTextOnFocus={false}
        error={errors?.password?.message}
      />

      <Input
        testID="signUpFirstName"
        label={t('common:firstName')}
        control={control}
        name="firstName"
        defaultValue=""
        error={errors?.firstName?.message}
      />

      <Input
        testID="signUpLastName"
        label={t('common:lastName')}
        control={control}
        name="lastName"
        defaultValue=""
        error={errors?.lastName?.message}
      />

      <Button
        testID="signUpButton"
        title={t('common:signUp')}
        onPress={handleSubmit(props.onSubmit(setError))}
      />
    </View>
  );
};

export default SignUpForm;
