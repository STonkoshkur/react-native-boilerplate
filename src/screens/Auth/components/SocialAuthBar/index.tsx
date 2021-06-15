import React, { FC, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
// api
import api from 'src/services/api';
// store
import { useDispatch } from 'react-redux';
import { updateAuthToken } from 'src/store/modules/auth';
// components
import Icon from 'src/components/Icon';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import {
  appleAuthAndroid,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
// utils
import { v4 as uuid } from 'uuid';
import EnvConfig from 'react-native-config';
// styling
import { Colors } from 'src/styles';
import { useThemeSchema } from 'src/hooks/useThemeShema';

/*
 * Google sign-in configuration
 *
 * Docs: https://github.com/react-native-google-signin/google-signin#configureoptions
 */
GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: EnvConfig.GOOGLE_AUTH_WEB_CLIENT_ID,
  offlineAccess: true,
});

type SocialAuthBarProps = {
  buttonSize?: number;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
};

const SocialAuthBar: FC<SocialAuthBarProps> = ({
  buttonSize = 50,
  iconSize,
  style,
  buttonStyle,
}) => {
  const dispatch = useDispatch();
  const { dark: isDarkTheme } = useThemeSchema();

  /*
   * Sign in with Google
   *
   * Docs: https://github.com/react-native-google-signin/google-signin
   */
  const onSignInWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        // Need to catch revokeAccess() because in some cases
        // it causes 'RNGoogleSignInError: Error when revoking access' error
        // https://github.com/react-native-google-signin/google-signin/issues/914
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        } catch {}
      }

      await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      const loginData = await api.auth.googleSignIn({
        idToken,
      });

      dispatch(updateAuthToken(loginData.token));
    } catch (error) {
      if (
        !error.code ||
        ![
          statusCodes.SIGN_IN_CANCELLED,
          statusCodes.IN_PROGRESS,
          statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
        ].includes(error.code)
      ) {
        // TODO: add alerts for error cases
      }
    }
  }, [dispatch]);

  /*
   * Sign in with Facebook
   *
   * Docs: https://github.com/facebook/react-native-fbsdk
   */
  const onSignInWithFacebook = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (!result.isCancelled) {
        const accessData = await AccessToken.getCurrentAccessToken();

        if (accessData) {
          const loginData = await api.auth.facebookSignIn({
            accessToken: accessData.accessToken,
          });

          dispatch(updateAuthToken(loginData.token));
        }
      }
    } catch {}
  }, [dispatch]);

  /*
   * Sign in via AppleID for iOS
   *
   * Docs: https://github.com/invertase/react-native-apple-authentication
   */
  const onSignInWithApple = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // ! This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { identityToken, fullName } = appleAuthRequestResponse;

        const loginData = await api.auth.appleSignIn({
          idToken: identityToken,
          firstName: fullName?.givenName ?? null,
          lastName: fullName?.familyName ?? null,
        });

        dispatch(updateAuthToken(loginData.token));
      }
    } catch {}
  }, [dispatch]);

  /*
   * Sign in via AppleID for Android
   *
   * Docs: https://github.com/invertase/react-native-apple-authentication#android
   */
  const onSignInWithAppleForAndroid = useCallback(async () => {
    try {
      if (Platform.OS === 'android' && appleAuthAndroid.isSupported) {
        const rawNonce = uuid();
        const state = uuid();

        // Configure the request
        appleAuthAndroid.configure({
          // The Service ID from Apple console. Configurate it in .env file.
          clientId: EnvConfig.APPLE_WEB_AUTH_CLIENT_ID,
          // Return URL from Apple Servise ID. Configurate it in .env file.
          redirectUri: EnvConfig.APPLE_WEB_AUTH_REDIRECT_URI,
          responseType: appleAuthAndroid.ResponseType.ALL,
          scope: appleAuthAndroid.Scope.ALL,
          // Random nonce value that will be SHA256 hashed before sending to Apple.
          nonce: rawNonce,
          // Unique state value used to prevent CSRF attacks.
          state,
        });

        // Open the browser window for user sign in
        const authResponse = await appleAuthAndroid.signIn();

        if (authResponse.id_token) {
          const loginData = await api.auth.appleSignIn({
            idToken: authResponse.id_token,
            firstName: authResponse.user?.name?.firstName ?? null,
            lastName: authResponse.user?.name?.lastName ?? null,
          });

          dispatch(updateAuthToken(loginData.token));
        }
      }
    } catch {}
  }, [dispatch]);

  const socials = useMemo(
    () => [
      {
        testID: 'googleSignInButton',
        name: 'google',
        icon: 'logo-google',
        backgroundColor: Colors.google,
        action: onSignInWithGoogle,
      },
      {
        testID: 'facebookSignInButton',
        name: 'facebook',
        icon: 'logo-facebook',
        backgroundColor: Colors.facebook,
        action: onSignInWithFacebook,
      },
      // {
      //   testID: 'twitterSignInButton',
      //   name: 'twitter',
      //   icon: 'logo-twitter',
      //   backgroundColor: Colors.twitter,
      // },
      {
        testID: 'appleSignInButton',
        name: 'apple',
        icon: 'ios-logo-apple',
        backgroundColor: isDarkTheme ? Colors.white : Colors.apple,
        color: isDarkTheme ? Colors.apple : Colors.white,
        // need to handle different actions for android and ios
        action:
          Platform.OS === 'android'
            ? onSignInWithAppleForAndroid
            : onSignInWithApple,
        disabled:
          (Platform.OS === 'android' && !appleAuthAndroid.isSupported) ||
          !appleAuth.isSupported,
      },
    ],
    [
      isDarkTheme,
      onSignInWithGoogle,
      onSignInWithAppleForAndroid,
      onSignInWithFacebook,
      onSignInWithApple,
    ],
  );

  return (
    <View style={[styles.container, style]}>
      {socials.map(({ testID, name, icon, backgroundColor, color, action }) => (
        <TouchableOpacity
          testID={testID}
          key={name}
          activeOpacity={0.7}
          onPress={action}
          style={[
            styles.socialButton,
            !action && styles.disabledButton,
            buttonStyle,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
              backgroundColor,
            },
          ]}
          disabled={!action}>
          <Icon
            name={icon}
            color={color ?? Colors.white}
            size={iconSize ?? buttonSize * 0.5}
            fontFamily="Ionicons"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
  },
  socialButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 8,
    width: 40,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default SocialAuthBar;
