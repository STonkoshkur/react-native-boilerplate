import React, { FC, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { UseFormMethods } from 'react-hook-form';
// navigation
import { StackScreenProps } from '@react-navigation/stack';
import { Routes, RootNavigationStackParamsList } from 'src/navigation';
// api
import api from 'src/services/api';
// store
import { useDispatch } from 'react-redux';
import { updateAuthToken } from 'src/store/modules/auth';
// components
import SignUpForm from './components/form/SignUpForm';
// services
import transformErrors from 'src/services/utils/transformErrors';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
// types
import { AuthRegistrationDto } from 'src/services/api/dtos/Auth';

type SignInScreenProps = StackScreenProps<
  RootNavigationStackParamsList,
  Routes.SignIn
>;

const SignInScreen: FC<SignInScreenProps> = () => {
  const { colors } = useThemeSchema();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    <T extends AuthRegistrationDto>(
      setError: UseFormMethods<T>['setError'],
    ) => async (data: T): Promise<void> => {
      try {
        await api.auth.signUp(data);
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
      <ScrollView testID="signUpScroll" keyboardShouldPersistTaps="handled">
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

export default SignInScreen;
