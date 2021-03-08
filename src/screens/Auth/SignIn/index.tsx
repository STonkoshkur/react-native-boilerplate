import React, { FC, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { UseFormMethods } from 'react-hook-form';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// localization
import { useTranslation } from 'react-i18next';
// api
import api from 'src/services/api';
// store
import { useDispatch } from 'react-redux';
import { updateAuthToken } from 'src/store/modules/auth';
// components
import SignInForm from './components/form/SignInForm';
import Button, { ButtonTypes } from 'src/components/Button';
import KeyboardView from 'src/components/KeyboardView';
// services
import transformErrors from 'src/services/utils/transformErrors';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
// types
import { AuthEmailSignInDto } from 'src/services/api/dtos/Auth';

type SignInScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.SignIn
>;

const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { colors } = useThemeSchema();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSignUp = useCallback(() => {
    navigation.navigate(Routes.SignUp);
  }, [navigation]);

  const onForgotPassword = useCallback(() => {
    navigation.navigate(Routes.ForgotPassword);
  }, [navigation]);

  const onSubmit = useCallback(
    <T extends AuthEmailSignInDto>(
      setError: UseFormMethods<T>['setError'],
    ) => async (data: T): Promise<void> => {
      try {
        const loginData = await api.auth.signIn(data);

        dispatch(updateAuthToken(loginData.token));
      } catch (e) {
        if (e.status === 422) {
          transformErrors<T>(e.data.errors).forEach((formError) => {
            setError(formError.name, formError.error);
          });
        }
      }
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <KeyboardView>
        <ScrollView testID="signInScroll" keyboardShouldPersistTaps="handled">
          <SignInForm onSubmit={onSubmit} />
          <Button
            testID="signUpButtonScreen"
            title={t('common:signUp')}
            onPress={onSignUp}
            type={ButtonTypes.link}
          />
          <Button
            testID="forgotPasswordButtonScreen"
            title={t('common:forgotPassword')}
            onPress={onForgotPassword}
            type={ButtonTypes.link}
          />
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

export default SignInScreen;
