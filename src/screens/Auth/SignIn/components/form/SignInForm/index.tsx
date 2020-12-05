import React, { FC } from 'react';
import { View } from 'react-native';
import { useForm, Controller, UseFormMethods } from 'react-hook-form';
// types
import { AuthEmailSignInDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from './validation';
// components
import Input from 'src/components/Form/Input';
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
      <Controller
        control={control}
        render={({ onChange, onBlur, value }): JSX.Element => (
          <Input
            label={t('common:email')}
            onBlur={onBlur}
            onChangeText={(textValue): void => onChange(textValue)}
            value={value}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            error={errors?.email?.message}
          />
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }): JSX.Element => (
          <Input
            label={t('common:password')}
            onBlur={onBlur}
            onChangeText={(textValue): void => onChange(textValue)}
            value={value}
            secureTextEntry={true}
            clearTextOnFocus={false}
            error={errors?.password?.message}
          />
        )}
        name="password"
        defaultValue=""
      />

      <Button
        title={t('common:signIn')}
        onPress={handleSubmit(props.onSubmit(setError))}
      />
    </View>
  );
};

export default SignInForm;
