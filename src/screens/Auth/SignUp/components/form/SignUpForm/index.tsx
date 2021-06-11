import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, UseFormReturn } from 'react-hook-form';
// types
import { AuthRegistrationDto } from 'src/services/api/dtos/Auth';
// validation
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidation } from './validation';
// components
import Button from 'src/components/Button';
import Input from 'src/components/FormAdapters/HookForm/Input';
import CheckBox from '@react-native-community/checkbox';
// localization
import { useTranslation, Trans } from 'react-i18next';
// utils
import { useAgreementsModals } from 'src/hooks/useAgreementsModals';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type SignUpFormProps = {
  onSubmit: (
    setError: UseFormReturn<AuthRegistrationDto>['setError'],
  ) => (data: AuthRegistrationDto) => Promise<void>;
};

const SignUpForm: FC<SignUpFormProps> = (props) => {
  const { t } = useTranslation();
  const { colors } = useThemeSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthRegistrationDto>({
    resolver: yupResolver(schemaValidation),
  });
  const { showPrivacyPolicyModal, showTermsAndConditionsModal } =
    useAgreementsModals();

  const [isAgreed, setIsAgreed] = useState(false);

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

      <View style={styles.agreementWrapper}>
        <CheckBox
          testID="signUpIsAgreed"
          value={isAgreed}
          onValueChange={setIsAgreed}
          tintColors={{
            true: colors.primary,
          }}
          animationDuration={0.25}
        />

        <Text style={[styles.agreementLabel, { color: colors.text }]}>
          {/* <Trans /> component from i18n library. Doc: https://react.i18next.com/latest/trans-component */}
          <Trans
            i18nKey="common:authAgreements"
            defaults="I agree with the <0>Terms of Conditions</0> and <1>Privacy Policy</1>>"
            components={[
              <Text
                key="termsConditions"
                style={{ color: colors.primary }}
                onPress={showTermsAndConditionsModal}
              />,
              <Text
                key="privacyPolicy"
                style={{ color: colors.primary }}
                onPress={showPrivacyPolicyModal}
              />,
            ]}
          />
        </Text>
      </View>

      <Button
        testID="signUpButton"
        title={t('common:signUp')}
        onPress={handleSubmit(props.onSubmit(setError))}
        style={styles.button}
        disabled={!isAgreed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  agreementWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  agreementLabel: {
    flex: 1,
    marginLeft: 8,
  },
  button: {
    marginBottom: 16,
  },
});

export default SignUpForm;
