import React, { FC } from 'react';
import { View } from 'react-native';
import { useForm, UseFormMethods } from 'react-hook-form';
// types
import { AuthEmailSignInDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from './validation';
// components
import SocialAuthBar from 'src/screens/Auth/components/SocialAuthBar';
import Input from 'src/components/FormAdapters/HookForm/Input';
import Button from 'src/components/Button';
// localization
import { useTranslation } from 'react-i18next';

type SignInFormProps = {
  onSubmit: (
    setError: UseFormMethods<AuthEmailSignInDto>['setError'],
  ) => (data: AuthEmailSignInDto) => Promise<void>;
};

const SignInForm: FC<SignInFormProps> = (props) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setError } = useForm<
    AuthEmailSignInDto
  >({
    resolver: yupResolver(schemaValidation),
  });

  return (
    <View>
      <SocialAuthBar />

      <Input
        testID="signInEmail"
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
        testID="signInPassword"
        label={t('common:password')}
        control={control}
        name="password"
        defaultValue=""
        secureTextEntry={true}
        textContentType="oneTimeCode"
        clearTextOnFocus={false}
        error={errors?.password?.message}
      />

      <Button
        testID="signInButton"
        title={t('common:signIn')}
        onPress={handleSubmit(props.onSubmit(setError))}
      />
    </View>
  );
};

export default SignInForm;
