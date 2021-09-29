import React, { FC, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { UseFormReturn } from 'react-hook-form';
import axios from 'axios';
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
import KeyboardView from 'src/components/KeyboardView';
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
    <T extends AuthRegistrationDto>(setError: UseFormReturn<T>['setError']) =>
      async (data: T): Promise<void> => {
        try {
          await api.auth.signUp(data);
          const loginData = await api.auth.signIn(data);

          dispatch(updateAuthToken(loginData.token));
        } catch (e) {
          if (axios.isAxiosError(e)) {
            if (e.response?.status === 422) {
              transformErrors<T>(e.response.data.errors).forEach(
                (formError) => {
                  setError(formError.name, formError.error);
                },
              );
            }
          }
        }
      },
    [dispatch],
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.card }]}>
      <KeyboardView>
        <ScrollView testID="signUpScroll" keyboardShouldPersistTaps="handled">
          <SignUpForm onSubmit={onSubmit} />
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
